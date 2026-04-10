import { Component, EventEmitter, Input , input, Output } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { DUMMY_USERS } from '../dummy-users';


@Component({
  selector: 'app-task',
  standalone: true,
  //imports: [ UserComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

//@Input({required: true}) selectedUserId!: string;
@Input({required: true}) name!: string;
@Output() select = new EventEmitter<string>();



onSelectUser() {

  this.select.emit(this.name);;

}
}
