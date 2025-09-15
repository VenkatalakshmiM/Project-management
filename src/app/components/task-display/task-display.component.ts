import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskService } from '../../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule, MatInputModule, CommonModule],
  templateUrl: './task-display.component.html',
  styleUrl: './task-display.component.scss'
})
export class TaskDisplayComponent {
    tasks: Task[] = [];
    originaltasks: Task[] = [];
    @Input() filteredTasks: string = '';
    displayedColumns: string[] = [
      'title', 'assignTo', 'dueDate', 'status', 'priority', 'actions'
    ];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.originaltasks = this.taskService.getTasks();
    this.tasks = [... this.originaltasks];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filteredTasks']) {
      this.getTaskDetails(changes['filteredTasks'].currentValue);
    }
    // this.tasks = this.getTaskDetails();
  }
  
  getTaskDetails(filterValue: string): Task[] {
    if (!filterValue || filterValue.trim() === '') { 
      this.tasks = [...this.originaltasks];
     }
    const fv = this.filteredTasks.toLowerCase();
    return this.tasks.filter(task =>
      (task.status || '').toLowerCase().includes(fv) ||
      (task.title|| '').toLowerCase().includes(fv) ||
      (task.description|| '').toLowerCase().includes(fv) 
    );
   }

  onEdit(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  onDelete(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id);
      this.originaltasks = this.taskService.getTasks();
      this.getTaskDetails(this.filteredTasks);
    }
  }

}
