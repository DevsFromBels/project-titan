import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-sidebar.component.html',
  styleUrl: './my-sidebar.component.css'
})
export class MySidebarComponent {

}
