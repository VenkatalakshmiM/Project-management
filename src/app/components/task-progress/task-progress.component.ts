import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-progress',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatInputModule, CommonModule],
  templateUrl: './task-progress.component.html',
  styleUrl: './task-progress.component.scss'
})
export class TaskProgressComponent implements OnInit {

  tasks: Task[] = [];
   displayedColumns: string[] = [
      'title', 'assignTo', 'dueDate', 'status', 'priority', 'actions'
    ];
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks().filter(t => t.status === "InProgress");
  }


}
