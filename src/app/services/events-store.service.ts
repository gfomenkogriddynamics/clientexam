import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AnimalEvent } from "../models";

@Injectable({
  providedIn: 'root'
})
export class EventsStoreService {
  private readonly _events = new BehaviorSubject<AnimalEvent[]>([]);
  private readonly _isLoading = new BehaviorSubject<boolean>(false);

  readonly events$ = this._events.asObservable();
  readonly isLoading$ = this._isLoading.asObservable();

  setEvents(events: AnimalEvent[]): void {
    this._events.next(events);
  }

  setIsLoading(isLoading: boolean): void {
    this._isLoading.next(isLoading);
  }
}
