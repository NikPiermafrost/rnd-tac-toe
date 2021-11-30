import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonUtilsModule } from './common-utils/common-utils.module';
import { GameHelperService } from './services/game-helper.service';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './pages/index/components/new-game/new-game.component';
import { JoinGameComponent } from './pages/index/components/join-game/join-game.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NewGameComponent,
    JoinGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUtilsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    GameHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
