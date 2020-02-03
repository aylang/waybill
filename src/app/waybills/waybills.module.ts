import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./waybill-input-components/material.module";

import { WaybillsRouting, WaybillsComponents, WaybillsServices } from "./waybills.routing";
import { DateSaturnModule } from '../module/date-saturn/date-saturn.module';
import { DataSourceForTableModule } from '../module/data-source-for-table/data-source-for-table.module';
import { DataSourceForTableService } from './waybill-list/data-source-for-table.service';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MaterialModule, 
    WaybillsRouting,
    DateSaturnModule,
    DataSourceForTableModule  
  ],
  declarations: [WaybillsComponents],
  providers: [WaybillsServices, DataSourceForTableService]
})
export class WaybillsModule { }
