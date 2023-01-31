import { Injectable } from '@angular/core';
import { EventsStoreService } from "./events-store.service";
import { EventsHttpService } from "./events-http.service";
import { AnimalEvent, EditEventPayload } from "../models";
import { switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsFacadeService {
  events$ = this.store.events$;
  isLoading$ = this.store.isLoading$;

  constructor(private readonly store: EventsStoreService, private readonly http: EventsHttpService) {
  }

  getList(): void {
    this.store.setIsLoading(true);
    this.http.getList().subscribe(({ result }) => {
      this.store.setEvents(result);
      this.store.setIsLoading(false);
    })
  }

  addEvent(event: AnimalEvent): void {
    this.store.setIsLoading(true);
    this.http.addEvent(event)
      .pipe(
        switchMap(() => this.http.getList())
      )
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }

  editEvent(id: number, payload: EditEventPayload): void {
    this.store.setIsLoading(true);

    this.http.editEvent(id, payload)
      .pipe(
        switchMap(() => this.http.getList())
      )
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }

  deleteEvent(id: number): void {
    this.store.setIsLoading(true);

    this.http.deleteEvent(id)
      .pipe(
        switchMap(() => this.http.getList())
      )
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }
}
