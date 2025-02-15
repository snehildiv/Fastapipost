from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB Connection URI
MONGO_URI = "mongodb+srv://Divyanshi:divyanshi1@cluster0.in2ur.mongodb.net/"

# Database Name
DB_NAME = "amazon_clone"

# Initialize MongoDB Client
client = AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]

# Example Collections
users_collection = database.get_collection("users")
products_collection = database.get_collection("products")
