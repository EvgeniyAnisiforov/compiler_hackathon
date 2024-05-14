from fastapi import FastAPI
# from routes.compiler_routes import router as compiler_router
# from routes.user_routes import router as user_router

app = FastAPI()

# app.include_router(compiler_router, prefix="/compile")
# app.include_router(user_router, prefix="/users")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
