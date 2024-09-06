export interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  owner_id: number;
  created_at: string;
  updated_at: string;
}
