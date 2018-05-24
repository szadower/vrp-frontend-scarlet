import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteComponent } from './route/route.component';
import { RouteEditComponent } from './route-edit/route-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/route/1', pathMatch: 'full' },
  { path: 'route/:id', component: RouteComponent },
  { path: 'route/generate/:id', component: RouteEditComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
