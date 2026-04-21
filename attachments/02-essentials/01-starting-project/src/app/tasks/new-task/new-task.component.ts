import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Output() cancelAddTask = new EventEmitter<void>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal ('');

  onClickCancel() {
    this.cancelAddTask.emit();
  }
}
