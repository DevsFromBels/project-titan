import { Component } from '@angular/core';
import { MySidebarComponent } from '../../components/my-sidebar/my-sidebar.component';

@Component({
  selector: 'app-moderation',
  standalone: true,
  imports: [MySidebarComponent],
  templateUrl: './moderation.component.html',
})
export class ModerationComponent {

}
