
from fastapi import APIRouter, Response
from fastapi import HTTPException
from fastapi.responses import JSONResponse


router = APIRouter()

@router.get("/node/{node_name}")
async def run_node(node_name: str):
    
    return {"node_name": node_name}