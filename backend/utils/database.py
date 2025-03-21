from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None

    @classmethod
    async def connect(cls):
        """连接到MongoDB数据库"""
        if cls.client is None:
            # 从环境变量获取数据库URL，如果没有则使用默认值
            mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
            cls.client = AsyncIOMotorClient(mongodb_url)
            # 测试连接
            await cls.client.admin.command('ping')

    @classmethod
    async def close(cls):
        """关闭数据库连接"""
        if cls.client is not None:
            cls.client.close()
            cls.client = None

    @classmethod
    def get_database(cls):
        """获取数据库实例"""
        if cls.client is None:
            raise Exception("Database not connected")
        return cls.client.cs2_utility 