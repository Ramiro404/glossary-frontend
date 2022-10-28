import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsitePageComponent } from './pages/website-page/website-page.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [
    WebsitePageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
