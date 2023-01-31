import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from "./components";
import { HttpClientModule } from "@angular/common/http";
import { backendInterceptorProvider } from "./interceptors";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [backendInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
