import os
import json
import random
from typing import List, Dict, Any
from dassl.data.datasets import DatasetBase
from dassl.data.transforms import build_transform
from PIL import Image
import torch
from torch.utils.data import Dataset

class ThrowableDataset(Dataset):
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
            self.spots = json.load(f)
        self.num_classes = len(set(spot['throwable_type'] for spot in self.spots))
        
        # 加载训练集和测试集划分
        train_file = os.path.join(self.split_dir, "train.json")
        test_file = os.path.join(self.split_dir, "test.json")
        
        with open(train_file, 'r', encoding='utf-8') as f:
            self.train_data = json.load(f)
        with open(test_file, 'r', encoding='utf-8') as f:
            self.test_data = json.load(f)
            
    def _get_negative_sample(self, current_spot):
        """获取负样本（不同投掷物类型的描述）"""
        # 过滤出不同类型的投掷物
        negative_spots = [spot for spot in self.spots 
                         if spot['throwable_type'] != current_spot['throwable_type']]
        if negative_spots:
            return random.choice(negative_spots)['description']
        return current_spot['description']  # 如果没有负样本，返回当前描述
    
    def __getitem__(self, idx):
        spot = self.spots[idx]
        
        # 构建描述文本
        description = f"从{spot['location']}投掷{spot['throwable_type']}到{spot['target']}，{spot['description']}"
        
        # 获取负样本
        negative_description = self._get_negative_sample(spot)
        
        return {
            'description': description,
            'negative_description': negative_description
        }
        
    def __len__(self):
        """返回数据集大小"""
        return len(self.spots)
        
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
        return Image.open(image_path).convert('RGB') 