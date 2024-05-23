from fastapi import APIRouter, HTTPException
from models.Compiler import CodeRequest
from compilers.CompilerExec import Compiler
import time

router = APIRouter()
compiler = Compiler()


@router.post(
    "/",
    description="Метод компиляции кода",
    tags=["compiler"]
)
async def compile_code_route(request: CodeRequest):
    try:
        start_time = time.time()
        result = compiler.sort(request.language.value, request.code)
        execution_time = time.time() - start_time
        return {"result": result, "time": execution_time}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка компиляции: {str(e)}")





