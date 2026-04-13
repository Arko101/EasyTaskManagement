import { Component, EventEmitter, Input , input, Output } from '@angular/core';



@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TaskComponent {

//@Input({required: true}) selectedUserId!: string;
@Input() name?: string;

}


// onSelectUser() {

//   this.select.emit(this.name);;

// }
// }
