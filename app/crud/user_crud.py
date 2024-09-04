from datetime import datetime 
from app.db.session import get_db
from app.schemas.user_schema import UserCreate 
from app.core.security import get_password_hash 
 
class User: 
  def __init__(self, id, email, username, hashed_password, created_at, updated_at): 
    self.id = id 
    self.email = email 
    self.username = username 
    self.hashed_password = hashed_password 
    self.created_at = created_at 
    self.updated_at = updated_at 
 
def create_user(user: UserCreate): 
  hashed_password = get_password_hash(user.password) 
  created_at = datetime.utcnow() 
  updated_at = datetime.utcnow() 
   
  with get_db() as cursor: 
    cursor.execute(""" 
      INSERT INTO Users (email, username, password, createdate, updatedate) 
      VALUES (?, ?, ?, ?, ?) 
    """, (user.email, user.username, hashed_password, created_at, updated_at)) 
    cursor.execute("SELECT @@IDENTITY AS id") # Get the last inserted ID 
    user_id = cursor.fetchone()[0] 
     
  return User(user_id, user.email, user.username, hashed_password, created_at, updated_at) 
 
def get_user_by_email(email: str): 
  with get_db() as cursor: 
    cursor.execute("SELECT * FROM Users WHERE email = ?", (email,)) 
    row = cursor.fetchone() 
     
  if row: 
    return User(*row) 
  return None 
 
def get_user_by_username(username: str): 
  with get_db() as cursor: 
    cursor.execute("SELECT * FROM Users WHERE username = ?", (username,)) 
    row = cursor.fetchone() 
     
  if row: 
    return User(*row) 
  return None 

def get_user_by_id(id: int): 
  with get_db() as cursor: 
    cursor.execute("SELECT * FROM Users WHERE id = ?", (id,)) 
    row = cursor.fetchone() 
     
  if row: 
    return User(*row) 
  return None 