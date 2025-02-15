import asyncio
from database import database

async def test_connection():
    try:
        # Ping the database
        await database.command("ping")
        print("✅ MongoDB connection successful!")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")

# Run test
asyncio.run(test_connection())
