from pydantic import BaseModel

class Product(BaseModel):
    id: str
    name: str
    price: float
    image: str

class CartItem(BaseModel):
    product_id: str
    quantity: int
