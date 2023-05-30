import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addEvent(eventData: any): Observable<any> {
    const url = `${this.apiUrl}/addEvent`;
    return this.http.post<any>(url, eventData);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}`;
    return this.http.put<any>(url, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}`;
    return this.http.delete<any>(url);
  }

  getEvents(): Observable<any[]> {
    const url = `${this.apiUrl}/events`;
    return this.http.get<any[]>(url);
  }
}
