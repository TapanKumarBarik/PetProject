from datetime import datetime 
from app.db.session import get_db 
from app.schemas.task_schema import TaskCreate 
from app.models.task_model import Task 
 
class Task: 
  def __init__(self, id, title, description, owner_id, is_completed, completed_at, created_at, updated_at): 
    self.id = id 
    self.title = title 
    self.description = description 
    self.owner_id = owner_id 
    self.is_completed = is_completed 
    self.completed_at = completed_at 
    self.created_at = created_at 
    self.updated_at = updated_at 


def row_to_task(row): 
  return Task( 
    id=row[0], 
    title=row[1], 
    description=row[2], 
    owner_id=row[3], 
    is_completed=row[4], 
    completed_at=row[5], 
    created_at=row[6], 
    updated_at=row[7] 
  ) 
def create_task(task: TaskCreate, user_id: int): 
  created_at = datetime.utcnow() 
  updated_at = datetime.utcnow() 
 
  with get_db() as cursor: 
    try: 
      cursor.execute(""" 
        INSERT INTO tasks (title, description, owner_id, is_completed, completed_at, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?) 
      """, (task.title, task.description, user_id, task.is_completed, task.completed_at, created_at, updated_at)) 
      cursor.connection.commit() 
       
      cursor.execute("SELECT @@IDENTITY AS id") # Get the last inserted ID 
      task_id = cursor.fetchone()[0] 
    except Exception as e: 
      cursor.connection.rollback() 
      raise e 
 
  return Task(task_id, task.title, task.description, user_id, task.is_completed, task.completed_at, created_at, updated_at) 
 
def get_task(task_id: int): 
  with get_db() as cursor: 
    cursor.execute("SELECT id,title, description, owner_id, is_completed, completed_at, created_at, updated_at FROM tasks WHERE id = ?", (task_id,)) 
    row = cursor.fetchone() 
 
  if row: 
    return row_to_task(row)  
  return None 
 
def get_tasks(skip: int = 0, limit: int = 10): 
  with get_db() as cursor: 
    cursor.execute("SELECT id,title, description, owner_id, is_completed, completed_at, created_at, updated_at FROM tasks ORDER BY id OFFSET ? ROWS FETCH NEXT ? ROWS ONLY", (skip, limit)) 
    rows = cursor.fetchall() 
 
  return [row_to_task(row) for row in rows] 
 
def delete_task(task_id: int): 
  with get_db() as cursor: 
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,)) 
    cursor.connection.commit() 
 
def update_task(task_id: int, task: TaskCreate): 
  updated_at = datetime.utcnow() 
 
  with get_db() as cursor: 
    cursor.execute(""" 
      UPDATE tasks 
      SET title = ?, description = ?, is_completed = ?, completed_at = ?, updated_at = ? 
      WHERE id = ? 
    """, (task.title, task.description, task.is_completed, task.completed_at, updated_at, task_id)) 
    cursor.connection.commit() 
 
  return get_task(task_id)