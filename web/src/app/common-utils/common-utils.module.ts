import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class CommonUtilsModule { }
