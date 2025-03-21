from typing import Dict, Any, List
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import openai
from config.openai_config import OPENAI_API_KEY, OPENAI_MODEL, PROMPT_TEMPLATE

class QueryProcessor:
    def __init__(self, data_path: str):
        """初始化查询处理器"""
        self.data_path = data_path
        self.spots = self._load_data()
        self.vectorizer = TfidfVectorizer(
            analyzer='char_wb',
            ngram_range=(2, 3),
            min_df=2
        )
        self._prepare_vectors()
        
        # 初始化OpenAI
        openai.api_key = OPENAI_API_KEY
        
    def _load_data(self) -> List[Dict[str, Any]]:
        """加载数据"""
        with open(self.data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data['spots']
    
    def _prepare_vectors(self):
        """准备文本向量"""
        # 构建查询文本
        texts = []
        for spot in self.spots:
            # 组合所有相关文本用于匹配
            text = f"{spot['map']} {spot['location']} {spot['throwable_type']} {' '.join(spot['tags'])} {' '.join(spot['query_patterns'])}"
            texts.append(text)
        
        # 训练TF-IDF向量化器
        self.vectors = self.vectorizer.fit_transform(texts)
    
    async def _get_ai_recommendation(self, query: str) -> Dict[str, Any]:
        """使用OpenAI API获取推荐"""
        # 准备数据
        spots_data = json.dumps(self.spots, ensure_ascii=False, indent=2)
        prompt = PROMPT_TEMPLATE.format(query=query, spots_data=spots_data)
        
        try:
            # 调用OpenAI API
            response = await openai.ChatCompletion.acreate(
                model=OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "你是一个CS2投掷物专家，请帮助用户找到最合适的投掷物点位。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            # 解析响应
            result = json.loads(response.choices[0].message.content)
            return result
            
        except Exception as e:
            print(f"OpenAI API调用失败: {str(e)}")
            return None
    
    async def process_query(self, query: str, top_k: int = 1) -> List[Dict[str, Any]]:
        """处理用户查询"""
        # 1. 使用TF-IDF进行初步匹配
        query_vector = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, self.vectors).flatten()
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        
        # 2. 使用OpenAI API进行智能推荐
        ai_recommendation = await self._get_ai_recommendation(query)
        
        # 3. 整合结果
        results = []
        for idx in top_indices:
            spot = self.spots[idx].copy()
            spot['similarity'] = float(similarities[idx])
            
            # 添加AI推荐信息
            if ai_recommendation and ai_recommendation['spot_id'] == spot['id']:
                spot['ai_recommendation'] = {
                    'score': ai_recommendation['relevance_score'],
                    'explanation': ai_recommendation['explanation']
                }
            
            # 构建详细的投掷说明
            spot['detailed_description'] = f"""
            投掷方式：{spot['throw_type']}
            
            {spot.get('ai_recommendation', {}).get('explanation', '')}
            """
            
            results.append(spot)
        
        return results 