from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server_apis import api

app = FastAPI(
    title="DataPipes API",
    description="The backend APIs for the running data processing pipeline.",
    version="0.0.1",
)

# add router endpoints
app.include_router(api.router)


# set up middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8099)