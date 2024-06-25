import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MyButtonComponent } from '../../components/my-button/my-button.component';
import { MySidebarComponent } from '../../components/my-sidebar/my-sidebar.component';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NgOptimizedImage, MyButtonComponent, MySidebarComponent],
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {

}
