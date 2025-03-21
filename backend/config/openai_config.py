import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# OpenAI配置
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = "gpt-3.5-turbo"  # 或 "gpt-4"

# 提示词模板
PROMPT_TEMPLATE = """
你是一个CS2投掷物专家。请根据用户的查询，从以下投掷物点位数据中找到最相关的结果：

用户查询：{query}

可用的投掷物点位数据：
{spots_data}

请分析用户查询，并返回最相关的投掷物点位信息。返回格式如下：
{
    "spot_id": "最相关的点位ID",
    "relevance_score": 0.0-1.0的相似度分数,
    "explanation": "为什么这个点位最相关的解释"
}
""" 