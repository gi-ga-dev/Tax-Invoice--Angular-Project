import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error404-routing.module';
import { Error404Page } from './error404.page';


@NgModule({
  declarations: [
    Error404Page
  ],
  imports: [
    CommonModule,
    Error404RoutingModule
  ]
})
export class Error404Module { }
