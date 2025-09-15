import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'tasks', 
    component: AddTaskComponent,
    canDeactivate: [unsavedChangesGuard]
   },
   {
      path: 'tasks/edit/:id', component: AddTaskComponent,
      canDeactivate: [unsavedChangesGuard]
   }
];
