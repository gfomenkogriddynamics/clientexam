import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnimalEvent, ListResponse } from "../models";
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

  addEvent(): Observable<ListResponse<AnimalEvent>> {
    return this.http.get<ListResponse<AnimalEvent>>('/events')
  }

  deleteEvent(): Observable<ListResponse<AnimalEvent>> {
    return this.http.get<ListResponse<AnimalEvent>>('/events')
  }

  editEvent(): Observable<ListResponse<AnimalEvent>> {
    return this.http.get<ListResponse<AnimalEvent>>('/events')
  }
}
