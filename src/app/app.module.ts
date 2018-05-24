import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouteComponent } from './route/route.component';

import { AppRoutingModule } from './app-routing.module';
import { RouteEditComponent } from './route-edit/route-edit.component';
import { RouteListComponent } from './route-list/route-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    RouteEditComponent,
    RouteListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
