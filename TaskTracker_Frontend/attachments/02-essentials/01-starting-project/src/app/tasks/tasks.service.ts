import { Inject, Injectable } from '@angular/core';
import { NewTaskData } from './new-task/new-task-model';
import { TaskItem } from '../models/task-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private dummyTasks = [
    {
      id: 1,
      userId: 1,
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 2,
      userId: 3,
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 3,
      userId: 3,
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  constructor(private http: HttpClient) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.dummyTasks = JSON.parse(storedTasks);
    }
  }

  getAsssignedTasks(userId: number) {
    return this.dummyTasks.filter((task) => task.userId === userId);
  }

  // removeTask(id: number) {
  //   this.dummyTasks = this.dummyTasks.filter((task) => task.id !== id);
  //   this.saveTasks();
  // }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.dummyTasks));
  }

  private apiUrl = 'http://localhost:5067/api/tasks';

  getTasks(userId: number) {
    // This method will return an Observable of TaskItem array, not the task items themselves. The component that calls this method will subscribe to the Observable to get the task items.
    console.log(`${this.apiUrl}?userId=${userId}`);
    return this.http.get<TaskItem[]>(`${this.apiUrl}/${userId}`);
    //console.log('${this.apiUrl}?userId=${userId}') // This will make a GET request to the API endpoint with the userId as a query parameter, and it will expect an array of TaskItem objects in response.
  }

  removeTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addTask(userId: number, newTaskData: NewTaskData) {
    return this.http.post(`${this.apiUrl}/${userId}`, newTaskData);
    this.saveTasks();

    // this.dummyTasks.push({
    //   id: new Date().getTime(),
    //   userId: userId,
    //   title: newTaskData.title,
    //   summary: newTaskData.summary,
    //   dueDate: newTaskData.dueDate,
    // });
  }
}
