import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewHouseComponent } from './new-house/new-house.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { HouseRoutingModule } from './house-routing.module';
import { FormsModule } from '@angular/forms';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NewHouseComponent,
    HouseDetailComponent,
    HouseEditComponent,
  ],
  imports: [
    CommonModule,
    HouseRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    NewHouseComponent,
    HouseDetailComponent,
    HouseEditComponent,
  ]
})
export class HouseModule { }
