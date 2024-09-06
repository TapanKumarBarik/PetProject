export interface Note {
  id: number; // Optional for creation
  title: string;
  content: string;
  user_id?: number; // Optional, returned from backend
  created_at?: string; // Optional, returned from backend
  updated_at?: string; // Optional, returned from backend
}
