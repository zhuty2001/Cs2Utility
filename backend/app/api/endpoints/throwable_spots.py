from fastapi import APIRouter
import os

router = APIRouter()

def get_image_urls(image_paths):
    """将本地图片路径转换为可访问的URL"""
    # 根据环境设置基础URL
    base_url = os.getenv("API_BASE_URL", "http://127.0.0.1:8000/api")
    return [f"{base_url}/images/{path}" for path in image_paths]

@router.get("/query")
async def query_throwable_spots(query: str):
    """查询投掷物点位"""
    try:
        # 返回示例回答
        spots = [
            {
                "id": "1",
                "location": "A门外",
                "target": "A大",
                "throwable_type": "FLASH",
                "description": "在A门外靠墙站，瞄准树的左下角，在队友进门时站立跳投，帮助队友A大对枪",
                "image_paths": [
                    "dust2/1/p.jpg",
                    "dust2/1/c.jpg",
                    "dust2/1/r.jpg"
                ],
                "tags": [
                    "A门",
                    "A大",
                    "闪光弹",
                    "掩护"
                ]
            }
        ]
        
        # 转换图片路径为URL
        for spot in spots:
            spot["image_paths"] = get_image_urls(spot["image_paths"])
        
        return {
            "status": "success",
            "data": {
                "spots": spots
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)} 