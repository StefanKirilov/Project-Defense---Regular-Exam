import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AppEmailDirective } from './validators/app-email.directive';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    AppEmailDirective,
    ElapsedTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    AppEmailDirective,
    ElapsedTimePipe
  ]
})
export class SharedModule { }
