import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
// import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [  
  //  CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    MatGridListModule
    // FlexLayoutModule
],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  editingId?: number;
  teamMembers = [
    {id:1, label:'Lakshmi'}, 
    {id:2, label:'Devi'},
    {id:3, label: 'Santhosh'},
    {id:4, label: 'Sri'}, 
    {id:5, label: 'John'}
  ];
  statusOptions = [
    {id:1, label:'InProgress'}, 
    {id:2, label:'Completed'},
    {id:3, label: 'Confirmed'},
    {id:4, label: 'Overdue'}
  ];
  priorityOptions = [
    {id:1, label:'P1'}, 
    {id:2, label:'P2'},
    {id:3, label: 'P3'},
    {id:4, label: 'Bucket'}
  ];

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService, 
    private route: Router,
    private routes: ActivatedRoute) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignTo: ['', Validators.required],
      team: [[]],
      dueDate: [null, Validators.required],
      status: ['InProgress', Validators.required],
      taskType: [''],
      menuName: [''],
      developer: [''],
      duration: [5, [Validators.required, Validators.min(5), Validators.max(100)]],
      priority: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    if(id) {
      this.editingId = Number(id);
         const task = this.taskService.getTaskById(Number(id));
        if(task) {
          this.taskForm.patchValue(task);
        } 
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if(this.editingId) {
        this.taskService.updateTask(this.editingId, this.taskForm.value);
        confirm('Updated successfully!');
      } else {
        this.taskService.saveTask({... this.taskForm.value, id: Date.now()});
        confirm('Added successfully!');
      }
    }
    this.taskForm.markAsPristine();
    this.onCancel();
  }
  
  onDelete(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id);
      this.taskService.getTasks();
    }
}

  onCancel() {
    this.route.navigate(['/dashboard']);
  }

  canDeactivate(): boolean {
    if(this.taskForm.dirty && !this.taskForm.pristine) {
      return confirm('You have unsaved changes! Are you sure you want to leave?');
    }
    return true;
  }
}
