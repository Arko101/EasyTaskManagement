import {
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './new-task/new-task-model';
import { TasksService } from './tasks.service';
import { TaskItem } from '../models/task-item.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnChanges {
  @Input({ required: true }) selectedUserId!: number;
  @Input({ required: true }) name?: string;
  isAddingTask = false;
  //private tasksService = new TasksService(); -> bad approch, we should not create service instances manually, instead we should use dependency injection, which is a core concept in Angular and allows us to manage dependencies in a more efficient and scalable way. By using dependency injection, we can easily swap out implementations of services, which is especially useful for testing and for managing different environments (e.g., development vs production).

  constructor(private tasksService: TasksService) {}

  onCompleteTask(id: number): void {
    this.tasksService.removeTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onClickAddTask() {
    this.isAddingTask = true;
  }

  onClickCancelAddTask() {
    this.isAddingTask = false;
  }

  onClickCreateTask(newTaskData: NewTaskData) {
    this.tasksService
      .addTask(this.selectedUserId, newTaskData)
      .subscribe(() => {
        this.loadTasks();
      });
    this.isAddingTask = false;
  }

  assignedTasks: TaskItem[] = [];

  ngOnChanges(): void {
    console.log('TaskComponent loaded');
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService
      .getTasks(this.selectedUserId)
      .subscribe((tasksFromApi) => {
        console.log(tasksFromApi);
        this.assignedTasks = tasksFromApi;
      });
  }
}
