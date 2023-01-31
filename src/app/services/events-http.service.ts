import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnimalEvent, EditEventPayload, ListResponse } from "../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsHttpService {
  private readonly apiPrefix = '/events';

  constructor(private readonly http: HttpClient) {
  }

  getList(): Observable<ListResponse<AnimalEvent>> {
    return this.http.get<ListResponse<AnimalEvent>>(this.apiPrefix)
  }

  addEvent(event: AnimalEvent): Observable<AnimalEvent> {
    return this.http.post<AnimalEvent>('/events', event)
  }

  deleteEvent(id: number): Observable<AnimalEvent> {
    return this.http.delete<AnimalEvent>(`/events/${id}`)
  }

  editEvent(id: number, payload: EditEventPayload): Observable<AnimalEvent> {
    return this.http.patch<AnimalEvent>(`/events/${id}`, payload)
  }
}
