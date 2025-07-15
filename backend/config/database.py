from motor.motor_asyncio import AsyncIOMotorClient
from .settings import settings

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

mongodb = MongoDB()

async def connect_to_mongo():
    mongodb.client = AsyncIOMotorClient(settings.MONGODB_URL)
    mongodb.database = mongodb.client[settings.DATABASE_NAME]

async def close_mongo_connection():
    mongodb.client.close()

def get_database():
    return mongodb.database
