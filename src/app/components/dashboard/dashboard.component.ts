import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TaskDisplayComponent } from '../task-display/task-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskProgressComponent } from '../task-progress/task-progress.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatInputModule,  TaskDisplayComponent, MatToolbarModule, TaskProgressComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filterString = '';
  inProgressCount = 0;
  completedCount = 0;
  confirmedCount = 0;
  overdueCount = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.updateCounts();
  }

  updateCounts() {
    this.inProgressCount = this.tasks.filter(t => t.status === 'InProgress').length;
    this.completedCount = this.tasks.filter(t => t.status === 'Completed').length;
    this.confirmedCount = this.tasks.filter(t => t.status === 'Confirmed').length;
    this.overdueCount = this.tasks.filter(t => t.status === 'Overdue').length;
  }

  applyFilter(event: Event) {
     this.filterString = (event.target as HTMLInputElement).value;
  }

}
