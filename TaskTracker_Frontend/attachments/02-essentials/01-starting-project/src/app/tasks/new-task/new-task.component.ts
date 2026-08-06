import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from './new-task-model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() cancelAddTask = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<NewTaskData>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  onClickCancel() {
    this.cancelAddTask.emit();
  }

  onSubmit() {
    this.addTask.emit({
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDueDate(),
    });
    //clear form fields after submission
    this.enteredTitle.set('');
    this.enteredSummary.set('');
    this.enteredDueDate.set('');
  }
}
