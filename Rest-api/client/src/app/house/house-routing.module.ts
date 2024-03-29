import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseListComponent } from '../house-list/house-list.component';
import { NewHouseComponent } from './new-house/new-house.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { HouseEditComponent } from './house-edit/house-edit.component';


const routes: Routes = [
    {
        path: 'houses',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HouseListComponent,
            },
            {
                path: ':houseId',
                component: HouseDetailComponent,
            },
            {
                path: ':houseId/edit',
                component: HouseEditComponent,
                canActivate: [AuthActivate],
            },
        ]
    },
    {
        path: 'new-house',
        component: NewHouseComponent,
        canActivate: [AuthActivate],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HouseRoutingModule { }