import { NgModule } from '@angular/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [    
    MatMomentDateModule,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule, 
    MatAutocompleteModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    MatTabsModule,
    SatDatepickerModule, 
    SatNativeDateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  exports: [
    MatMomentDateModule,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule, 
    MatAutocompleteModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    MatTabsModule,
    SatDatepickerModule, 
    SatNativeDateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  providers: [
    
  ]
})
export class MaterialModule { }
