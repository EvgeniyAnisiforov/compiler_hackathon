from fastapi import APIRouter, HTTPException
from backend.models.Compiler import CodeRequest
from backend.compilers.CompilerExec import Compiler


router = APIRouter()
compiler = Compiler()

@router.post(
    "/",
    description="Метод компиляции кода",
    tags=["compiler"]
)
async def compile_code_route(request: CodeRequest):
    try:
        result = compiler.sort(request.language.value, request.code)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка компиляции: {str(e)}")
