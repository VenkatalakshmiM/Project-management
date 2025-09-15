import { Injectable } from '@angular/core';

export interface Task {
  id: number,
  title: string,
  description: string;
  assignTo: string;
  team: string[];
  dueDate: Date;
  status: string;
  taskType: string;
  menuName: string;
  developer: string;
  duration: number;
  priority: string;
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private storageKey = 'tasks';

  getTasks(): Task[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  getTaskById(id: number): Task | undefined {
    return this.getTasks().find(t => t.id === id);
  }

  updateTask(id: number, task: Task): boolean {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if(index !== -1) {
      tasks[index] = {...task, id};
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    } else {
      console.warn("Task with ${id} id is not found.");
    }
    return true;
  }
}
