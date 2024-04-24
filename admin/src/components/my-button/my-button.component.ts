import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'my-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-button.component.html',
})
export class MyButtonComponent {
 @Input() link?: string;
 @Input() text?: string;
}
