import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from "./components";
import { HttpClientModule } from "@angular/common/http";
import { backendInterceptorProvider } from "./interceptors";
import { FocusOnRenderDirective } from './directives';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FocusOnRenderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [backendInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
