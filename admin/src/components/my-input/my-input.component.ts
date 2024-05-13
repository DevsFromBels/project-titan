import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'my-input',
  standalone: true,
  imports: [],
  templateUrl: './my-input.component.html',
  styleUrl: './my-input.component.css',
})
export class MyInputComponent {
  @Input() placeholder?: string;
  @Input() type?: string;
  @Output() inputChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputChange.emit(target.value);
  }
}
