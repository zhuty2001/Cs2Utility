import os
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertModel
import json
import random

class ThrowableSpotDataset(Dataset):
    def __init__(self, data_dir="data/throwable_spots", is_training=True):
        self.data_dir = data_dir
        self.spots = self._load_spots()
        self.is_training = is_training
        
        # 加载训练集和测试集划分
        if is_training:
            with open(os.path.join(data_dir, "train.json"), "r", encoding="utf-8") as f:
                self.spot_ids = json.load(f)
        else:
            with open(os.path.join(data_dir, "test.json"), "r", encoding="utf-8") as f:
                self.spot_ids = json.load(f)
    
    def _load_spots(self):
        """加载所有投掷物点位数据"""
        with open(os.path.join(self.data_dir, "spots.json"), "r", encoding="utf-8") as f:
            return json.load(f)
    
    def _generate_query_variations(self, spot):
        """生成查询语句的变体"""
        variations = []
        
        # 基本变体
        variations.append(f"从{spot['location']}投掷{spot['throwable_type']}到{spot['target']}")
        variations.append(f"在{spot['location']}扔{spot['throwable_type']}到{spot['target']}")
        variations.append(f"{spot['location']}{spot['throwable_type']}{spot['target']}")
        
        # 添加描述
        for var in variations:
            variations.append(var + f"，{spot['description']}")
        
        return variations
    
    def __len__(self):
        return len(self.spot_ids)
    
    def __getitem__(self, idx):
        spot_id = self.spot_ids[idx]
        spot = next(spot for spot in self.spots if spot['id'] == spot_id)
        
        # 生成查询变体
        query_variations = self._generate_query_variations(spot)
        query = random.choice(query_variations)
        
        return {
            'id': spot['id'],
            'query': query,
            'spot': spot
        }

class ThrowableSpotClassifier(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.bert = BertModel.from_pretrained("bert-base-chinese").to(self.device)
        self.tokenizer = BertTokenizer.from_pretrained("bert-base-chinese")
        
        # 分类头
        self.classifier = nn.Sequential(
            nn.Linear(768, 512),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(512, num_classes)
        ).to(self.device)
        
    def forward(self, texts):
        # 处理文本
        inputs = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors="pt"
        ).to(self.device)
        
        # 获取BERT输出
        outputs = self.bert(**inputs)
        text_features = outputs.last_hidden_state[:, 0, :]  # 使用[CLS]标记的输出
        
        # 分类
        logits = self.classifier(text_features)
        return logits

def train_model(model, train_dataset, num_epochs=10):
    """训练模型"""
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)
    criterion = nn.CrossEntropyLoss()
    
    model.train()
    for epoch in range(num_epochs):
        total_loss = 0
        correct = 0
        total = 0
        
        for batch in train_loader:
            # 获取查询和标签
            queries = batch['query']
            labels = torch.tensor([spot['id'] for spot in batch['spot']]).to(model.device)
            
            # 前向传播
            logits = model(queries)
            loss = criterion(logits, labels)
            
            # 反向传播
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            # 计算准确率
            _, predicted = torch.max(logits.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            
            total_loss += loss.item()
        
        avg_loss = total_loss / len(train_loader)
        accuracy = 100 * correct / total
        print(f"Epoch {epoch+1}/{num_epochs}, Loss: {avg_loss:.4f}, Accuracy: {accuracy:.2f}%")
    
    # 保存模型
    torch.save(model.state_dict(), "models/throwable_classifier.pth")
    print("模型训练完成并保存")

def main():
    # 创建数据集
    train_dataset = ThrowableSpotDataset(is_training=True)
    test_dataset = ThrowableSpotDataset(is_training=False)
    
    # 创建模型
    num_classes = len(train_dataset.spots)  # 50个投掷物点位
    model = ThrowableSpotClassifier(num_classes)
    
    # 训练模型
    train_model(model, train_dataset)
    
    # 测试分类
    model.eval()
    with torch.no_grad():
        query = "从A点投掷烟雾弹到A门"
        logits = model(query)
        _, predicted = torch.max(logits.data, 1)
        
        # 获取预测的点位
        predicted_spot = next(spot for spot in test_dataset.spots if spot['id'] == predicted.item())
        
        # 打印结果
        print(f"\n查询: {query}")
        print("\n预测的投掷物点位:")
        print(f"ID: {predicted_spot['id']}")
        print(f"位置: {predicted_spot['location']}")
        print(f"目标: {predicted_spot['target']}")
        print(f"类型: {predicted_spot['throwable_type']}")
        print(f"描述: {predicted_spot['description']}")

if __name__ == "__main__":
    main() 