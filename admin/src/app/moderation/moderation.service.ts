import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModerationData } from './moderation.component';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {
  private apiUrl = 'https://market-api.titanproject.top/moderations';

  constructor(private http: HttpClient) { }

  getModerationData(): Observable<ModerationData[]> {
    return this.http.get<ModerationData[]>(this.apiUrl);
  }
}
