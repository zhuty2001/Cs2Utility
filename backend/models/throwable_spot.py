from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum

class ThrowableType(str, Enum):
    SMOKE = "smoke"
    FLASH = "flash"
    MOLOTOV = "molotov"
    GRENADE = "grenade"

class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class ThrowableSpot(BaseModel):
    id: str = Field(..., description="唯一标识符")
    map: str = Field(..., description="地图名称")
    location: str = Field(..., description="投掷位置")
    throwable_type: ThrowableType = Field(..., description="投掷物类型")
    description: str = Field(..., description="投掷方法描述")
    image_path: str = Field(..., description="示意图路径")
    tags: List[str] = Field(default_factory=list, description="关键词标签")
    difficulty: Difficulty = Field(..., description="难度等级")
    success_rate: float = Field(..., ge=0, le=1, description="成功率")
    created_at: str = Field(..., description="创建时间")
    updated_at: str = Field(..., description="更新时间")

    class Config:
        schema_extra = {
            "example": {
                "id": "mirage_a_smoke_1",
                "map": "mirage",
                "location": "A点",
                "throwable_type": "smoke",
                "description": "从A1位置向A点投掷烟雾弹...",
                "image_path": "/images/throwables/mirage/a_smoke_1.png",
                "tags": ["A点", "烟雾弹", "A1", "进攻"],
                "difficulty": "medium",
                "success_rate": 0.85,
                "created_at": "2024-03-21T10:00:00Z",
                "updated_at": "2024-03-21T10:00:00Z"
            }
        } 