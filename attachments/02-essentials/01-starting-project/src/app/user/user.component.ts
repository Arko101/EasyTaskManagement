import { Component, computed, Input , input} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
// @Input({required: true}) avatar!: string;
// @Input({required: true}) name!: string;

avatar = input.required<string>();
name = input.required<string>();

onSelectUser() {}
 
 imagePath = computed(() => {
  return 'assets/users/' + this.avatar();
});
}