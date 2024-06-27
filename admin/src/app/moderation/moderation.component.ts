import { Component } from '@angular/core';
import { MySidebarComponent } from '../../components/my-sidebar/my-sidebar.component';
import { ModerationService } from './moderation.service';

export interface ModerationData {
  moderation_id: string;
  photo: string;
  text: string;
  link: string;
  user_id: string;
  price_for_show: number;
  category: string;
  total_shows: number;
  region: string;
}

@Component({
  selector: 'app-moderation',
  standalone: true,
  imports: [MySidebarComponent],
  templateUrl: './moderation.component.html',
})
export class ModerationComponent {
  public moderationData!: ModerationData[];

  constructor(private moderationService: ModerationService) { }

  ngOnInit(): void {
    this.moderationService.getModerationData().subscribe(data => {
      this.moderationData = data;
    });
  }
}
