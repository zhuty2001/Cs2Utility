from fastapi import APIRouter

router = APIRouter()

@router.get("/query")
async def query_throwable_spots(query: str):
    """查询投掷物点位"""
    try:
        # 暂时返回固定的投掷点位数据
        return {
            "status": "success",
            "data": {
                "spots": [
                    {
                        "id": "1",
                        "map": "dust2",
                        "location": "A门外",
                        "target": "A大",
                        "throwable_type": "FLASH",
                        "description": "在A门外靠墙站，瞄准树的左下角，在队友进门时站立跳投，帮助队友A大对枪",
                        "image_paths": [
                            "backend/data/throwable_spots/images/dust2/1/position.jpg",
                            "backend/data/throwable_spots/images/dust2/1/crosshair.jpg"
                        ],
                        "tags": [
                            "A门",
                            "A大",
                            "闪光弹",
                            "掩护"
                        ]
                    }
                ]
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)} 