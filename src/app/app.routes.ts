import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskComponent } from './pages/task/task.component';
import { NoteComponent } from './pages/note/note.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NoteComponent, canActivate: [AuthGuard] },
];
