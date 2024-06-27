import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModerationData } from './moderation.component';

@Injectable({
  providedIn: 'root',
})
export class ModerationService {
  private apiUrl = 'https://market-api.titanproject.top/moderations';
  private baseUrl = 'https://market-api.titanproject.top';

  constructor(private http: HttpClient) {}

  getModerationData(): Observable<ModerationData[]> {
    return this.http.get<ModerationData[]>(this.apiUrl);
  }

  acceptProduct(contentId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/accept?contentId=${contentId}`, {});
  }

  rejectProduct(contentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reject?contentId=${contentId}`);
  }
}
