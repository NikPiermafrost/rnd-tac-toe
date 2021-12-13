import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UiService } from '../services/ui.service';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    UiService
  ]
})
export class CommonUtilsModule { }
