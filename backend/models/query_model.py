from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict, Any
import json
import os

class QueryModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            analyzer='char_wb',
            ngram_range=(2, 3),
            min_df=2
        )
        self.vectors = None
        self.spots = None

    def train(self, spots: List[Dict[str, Any]]):
        """
        训练模型
        :param spots: 投掷物点位数据列表
        """
        self.spots = spots
        # 构建查询文本
        texts = []
        for spot in spots:
            # 组合所有相关文本用于匹配
            text = f"{spot['map']} {spot['location']} {spot['throwable_type']} {' '.join(spot['tags'])}"
            texts.append(text)
        
        # 训练TF-IDF向量化器
        self.vectors = self.vectorizer.fit_transform(texts)

    def predict(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        预测最相关的投掷物点位
        :param query: 用户查询文本
        :param top_k: 返回结果数量
        :return: 最相关的投掷物点位列表
        """
        if self.vectors is None or self.spots is None:
            raise Exception("Model not trained")

        # 将查询文本转换为向量
        query_vector = self.vectorizer.transform([query])
        
        # 计算相似度
        similarities = cosine_similarity(query_vector, self.vectors).flatten()
        
        # 获取最相关的索引
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        
        # 返回最相关的投掷物点位
        results = []
        for idx in top_indices:
            spot = self.spots[idx].copy()
            spot['similarity'] = float(similarities[idx])
            results.append(spot)
        
        return results

    def save(self, model_path: str):
        """
        保存模型
        :param model_path: 模型保存路径
        """
        if self.vectors is None or self.spots is None:
            raise Exception("Model not trained")

        # 保存向量化器
        vectorizer_data = {
            'vocabulary_': self.vectorizer.vocabulary_,
            'idf_': self.vectorizer.idf_.tolist(),
            'max_features': self.vectorizer.max_features
        }
        
        # 保存向量和投掷物数据
        model_data = {
            'vectorizer': vectorizer_data,
            'vectors': self.vectors.toarray().tolist(),
            'spots': self.spots
        }
        
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        with open(model_path, 'w', encoding='utf-8') as f:
            json.dump(model_data, f, ensure_ascii=False, indent=2)

    def load(self, model_path: str):
        """
        加载模型
        :param model_path: 模型加载路径
        """
        with open(model_path, 'r', encoding='utf-8') as f:
            model_data = json.load(f)
        
        # 恢复向量化器
        self.vectorizer = TfidfVectorizer(
            analyzer='char_wb',
            ngram_range=(2, 3),
            min_df=2
        )
        self.vectorizer.vocabulary_ = model_data['vectorizer']['vocabulary_']
        self.vectorizer.idf_ = np.array(model_data['vectorizer']['idf_'])
        self.vectorizer.max_features = model_data['vectorizer']['max_features']
        
        # 恢复向量和投掷物数据
        self.vectors = np.array(model_data['vectors'])
        self.spots = model_data['spots'] 