import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MyButtonComponent } from '../../components/my-button/my-button.component';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NgOptimizedImage, MyButtonComponent],
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {

}
