from fastapi import APIRouter, HTTPException
from ..models.Compiler import CodeRequest
from ..services.Compiler import Compiler

router = APIRouter()
compiler = Compiler()

@router.post("/")
async def compile_code_route(request: CodeRequest):
    result = compiler.compile_code(request.language, request.code)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["message"])
    return result