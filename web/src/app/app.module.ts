import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonUtilsModule} from './common-utils/common-utils.module';
import {GameHelperService} from './services/game-helper.service';
import {IndexComponent} from './pages/index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUtilsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GameHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
