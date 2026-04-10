import { Component, computed, EventEmitter, Input , input, Output, output} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
@Input({required: true}) id!: string;
@Input({required: true}) avatar!: string;
@Input({required: true}) name!: string;

@Output() select = new EventEmitter<string>();

//select = output<string>();   -->better altenative to above, less verbose and more readable, also works with type inference, so we can omit the type argument if we want to.

// avatar = input.required<string>();
// name = input.required<string>();


 
get imagePath() {
  return 'assets/users/' + this.avatar;
}

//  imagePath = computed(() => {
//   return 'assets/users/' + this.avatar();
// });

onSelectUser() {
  this.select.emit(this.id);
}
}