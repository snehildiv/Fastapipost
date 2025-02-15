from fastapi import FastAPI
from database import users_collection

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to Amazon Clone Backend"}

@app.post("/add_user/")
async def add_user(user: dict):
    result = await users_collection.insert_one(user)
    return {"message": "User added successfully!", "user_id": str(result.inserted_id)}
