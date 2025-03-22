from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.api.endpoints import throwable_spots

app = FastAPI(title="CS2 Utility API")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 获取当前文件所在目录的上级目录（backend目录）
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMAGES_DIR = os.path.join(BASE_DIR, "backend", "data", "throwable_spots", "images")

# 挂载静态文件目录
app.mount("/api/images", StaticFiles(directory=IMAGES_DIR), name="images")

# 注册路由
app.include_router(throwable_spots.router, prefix="/api/throwable-spots", tags=["throwable-spots"])

@app.get("/")
async def root():
    return {"message": "Welcome to CS2 Utility API"} 