import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { HttpMethods } from "../models";
import { MOCK_DATA } from "../mocks/data";

const HTTP_CALL_DELAY = 300;

// /events - GET
// /events/eventId - PATCH
// /events - POST
// /events/eventId - DELETE

@Injectable()
class BackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = req;

    if (url.endsWith('/events')) {
      if (method === HttpMethods.Get) {
        return this.getEvents();
      }

      if (method === HttpMethods.Post) {
        return this.addEvent();
      }
    }

    if (url.match(/\/events\/\d+$/)) {
      if (method === HttpMethods.Patch) {
        return this.editEvent();
      }

      if (method === HttpMethods.Delete) {
        return this.deleteEvent();
      }
    }

    return next.handle(req);
  }

  private getEvents(): Observable<HttpEvent<any>> {
    return this.returnResult(MOCK_DATA);
  }

  private addEvent(): Observable<HttpEvent<any>> {
    return this.returnResult(null);
  }

  private deleteEvent(): Observable<HttpEvent<any>> {
    return this.returnResult(null);
  }

  private editEvent(): Observable<HttpEvent<any>> {
    return this.returnResult(null);
  }

  private returnResult(body: any) {
    return of(new HttpResponse({ status: 200, body }))
      .pipe(delay(HTTP_CALL_DELAY));
  }
}

export const backendInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};
