import { Component, EventEmitter, Input , input, Output } from '@angular/core';
//import { TaskComponent } from './task/task.component';
import { TaskComponent } from './task/task.component';



@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

//@Input({required: true}) selectedUserId!: string;
@Input() name?: string;


}

//  onSelectUser() {

//    this.select.emit(this.name);;

//  }
// }

