from typing import Union, List
from fastapi import FastAPI, HTTPException
from .config import settings
from .database import connect_to_mongo, close_mongo_connection, get_database
from .models import Requirement, RequirementCreate
import google.generativeai as genai
from bson import ObjectId

app = FastAPI()

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel(settings.GEMINI_MODEL)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
def read_root():
    return {"Hello" : "World"}

@app.get("/model")
def get_response():
    response = model.generate_content("Explain how AI works in a few words")
    return {"response": response.text}

@app.post("/requirements", response_model=Requirement)
async def create_requirement(requirement: RequirementCreate):
    db = get_database()
    requirement_dict = requirement.dict()
    result = await db.requirements.insert_one(requirement_dict)
    created_requirement = await db.requirements.find_one({"_id": result.inserted_id})
    return created_requirement

@app.get("/requirements", response_model=List[Requirement])
async def get_requirements():
    db = get_database()
    requirements = []
    async for requirement in db.requirements.find():
        requirements.append(requirement)
    return requirements

@app.get("/requirements/{requirement_id}", response_model=Requirement)
async def get_requirement(requirement_id: str):
    db = get_database()
    if not ObjectId.is_valid(requirement_id):
        raise HTTPException(status_code=400, detail="Invalid requirement ID")
    
    requirement = await db.requirements.find_one({"_id": ObjectId(requirement_id)})
    if requirement is None:
        raise HTTPException(status_code=404, detail="Requirement not found")
    return requirement