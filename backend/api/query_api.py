from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import os
from models.query_processor import QueryProcessor

app = FastAPI()

# 初始化查询处理器
data_path = os.path.join("data", "throwable_spots", "spots.json")
query_processor = QueryProcessor(data_path)

class QueryRequest(BaseModel):
    query: str
    top_k: int = 1

class QueryResponse(BaseModel):
    results: List[Dict[str, Any]]

@app.post("/api/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    try:
        results = query_processor.process_query(request.query, request.top_k)
        return QueryResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 