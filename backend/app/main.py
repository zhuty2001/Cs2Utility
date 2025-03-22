from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# 注册路由
app.include_router(throwable_spots.router, prefix="/api/throwable-spots", tags=["throwable-spots"])

@app.get("/")
async def root():
    return {"message": "Welcome to CS2 Utility API"} 