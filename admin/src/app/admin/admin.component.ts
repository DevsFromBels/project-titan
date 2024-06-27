import { Component } from '@angular/core';
import { MySidebarComponent } from '../../components/my-sidebar/my-sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MySidebarComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent {

}
