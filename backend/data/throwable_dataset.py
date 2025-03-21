import os
import json
from typing import List, Dict, Any
from dassl.data.datasets import DatasetBase
from dassl.data.transforms import build_transform

class ThrowableDataset(DatasetBase):
    """投掷物点位数据集"""
    
    dataset_dir = "throwable_spots"
    
    def __init__(self, cfg):
        root = os.path.abspath(os.path.expanduser(cfg.DATASET.ROOT))
        self.dataset_dir = os.path.join(root, self.dataset_dir)
        self.image_dir = os.path.join(self.dataset_dir, "images")
        self.split_dir = os.path.join(self.dataset_dir, "splits")
        
        # 加载数据
        self.load_data()
        
        # 构建数据转换
        self.transform = build_transform(cfg, is_train=True)
        
    def load_data(self):
        """加载数据集"""
        # 加载所有投掷物点位数据
        data_file = os.path.join(self.dataset_dir, "spots.json")
        with open(data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        self.data = data['spots']
        self.num_classes = len(set(spot['throwable_type'] for spot in self.data))
        
        # 加载训练集和测试集划分
        train_file = os.path.join(self.split_dir, "train.json")
        test_file = os.path.join(self.split_dir, "test.json")
        
        with open(train_file, 'r', encoding='utf-8') as f:
            self.train_data = json.load(f)
        with open(test_file, 'r', encoding='utf-8') as f:
            self.test_data = json.load(f)
            
    def __getitem__(self, index):
        """获取数据项"""
        spot = self.data[index]
        
        # 加载图像
        image_path = os.path.join(self.image_dir, spot['image_path'])
        image = self.load_image(image_path)
        
        # 应用数据转换
        if self.transform is not None:
            image = self.transform(image)
            
        # 构建标签
        label = self.get_label(spot['throwable_type'])
        
        return {
            'image': image,
            'label': label,
            'spot': spot
        }
        
    def __len__(self):
        """返回数据集大小"""
        return len(self.data)
        
    def get_label(self, throwable_type: str) -> int:
        """获取投掷物类型的标签索引"""
        type_to_label = {
            'SMOKE': 0,
            'FLASH': 1,
            'MOLOTOV': 2,
            'GRENADE': 3
        }
        return type_to_label[throwable_type]
        
    def load_image(self, image_path: str):
        """加载图像"""
        from PIL import Image
        return Image.open(image_path).convert('RGB') 