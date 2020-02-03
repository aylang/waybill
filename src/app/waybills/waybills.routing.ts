import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaybillListComponent } from "./waybill-list/waybill-list.component";
import { WaybillDetailComponent } from "./waybill-detail/waybill-detail.component";
import { WaybillNewComponent } from "./waybill-new/waybill-new.component";
import { InputComponent } from './waybill-input-components/input/input.component';
import { DateComponent } from './waybill-input-components/date/date.component';
import { TableComponent } from './waybill-input-components/table/table.component';
import { DataTableComponent } from './waybill-input-components/data-table/data-table.component';
import { StoreWaybillComponent } from './store-waybill/store-waybill.component'
import { ExperimentComponent } from './experiment/experiment.component';

import { WaybillService } from './waybill.service';
import { StoreService } from './store.service';

const routes: Routes = [
  { path: '', redirectTo: 'waybill', pathMatch: 'full' },
  { path: 'waybill', component: WaybillListComponent },
  { path: 'waybill/:id', component: WaybillDetailComponent },
  { path: 'new', component: WaybillNewComponent },
  { path: 'experiment', component: ExperimentComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: []
})
export class WaybillsRouting { }

export const WaybillsComponents = [
                                    WaybillListComponent,
                                    WaybillDetailComponent,
                                    WaybillNewComponent,
                                    InputComponent,
                                    DateComponent,
                                    TableComponent,
                                    DataTableComponent,
                                    StoreWaybillComponent,
                                    ExperimentComponent
                                  ]
                                  
export const WaybillsServices = [
                                    WaybillService,
                                    StoreService
                                  ]