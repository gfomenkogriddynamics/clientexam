import { Injectable } from '@angular/core';
import { EventsStoreService } from "./events-store.service";
import { EventsHttpService } from "./events-http.service";

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
}
