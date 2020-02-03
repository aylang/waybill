import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { DateSaturnComponent } from './date-saturn.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SatDatepickerModule, 
    SatNativeDateModule
  ],
  declarations: [DateSaturnComponent],
  exports: [DateSaturnComponent]
})
export class DateSaturnModule { }
