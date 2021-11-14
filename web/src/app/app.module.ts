import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonUtilsModule} from './common-utils/common-utils.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
