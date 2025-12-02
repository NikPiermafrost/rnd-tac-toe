import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';


@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule,
        GameComponent
    ]
})
export class GameModule { }
