import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker'

import { WaybillService } from '../waybill.service';
import { Waybill, nullWB } from '../waybill';
import { View } from '../waybill-input-components/data-table/view';
import { FUNCTION_SORTING } from 'src/app/module/data-source-for-table/sort';
import { FUNCTION_FILTERING } from 'src/app/module/data-source-for-table/filter';
import { DataSourceForTableService } from './data-source-for-table.service';

@Component({
  selector: 'app-waybill-list',
  templateUrl: './waybill-list.component.html',
  styleUrls: ['./waybill-list.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['DD.MM.YYYY', 'D.MM.YYYY', 'DD MMMM YYYY'],
        },
        display: {
          dateInput: 'DD.MM',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'DD.MM.YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    }
  ]
})
export class WaybillListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  view = View('revise');  
  public viewState: BehaviorSubject<string> = new BehaviorSubject('revise');

  @ViewChild(MatPaginator, {static: true}) set matPaginator(paginator: MatPaginator) { 
    this.dataSource.paginator = paginator;
  }

  sort: MatSort;
  @ViewChild(MatSort, {static: true}) set matSort(sort: MatSort) { 
    this.dataSource.sort = sort; 
    this.sort = sort;
    this.dataSource.sortRules = [ {field: 'date',     compare: FUNCTION_SORTING.date,   sequence: 1},
                                  {field: 'customer', compare: FUNCTION_SORTING.string, sequence: 2},
                                  {field: 'shift',    compare: FUNCTION_SORTING.string, sequence: 3}, 
                                  {field: 'dump',     compare: FUNCTION_SORTING.string, sequence: 4},
                                  {field: 'driver',   compare: FUNCTION_SORTING.string, sequence: 5},
                                  {field: 'loading',  compare: FUNCTION_SORTING.string, sequence: 6},
                                  {field: 'unloading',compare: FUNCTION_SORTING.string, sequence: 7}]
  }

  dateControl     = new FormControl();
  customerControl = new FormControl();
  dumpControl     = new FormControl();
  loadingControl   = new FormControl();  
  unloadingControl = new FormControl();  
  driverControl   = new FormControl();  

  customers$: Observable<string[]> = this.dataSource.distinctItemsByField('customer');
  dump$: Observable<string[]>      = this.dataSource.distinctItemsByField('dump');
  loading$: Observable<string[]>   = this.dataSource.distinctItemsByField('loading');
  unloading$: Observable<string[]> = this.dataSource.distinctItemsByField('unloading');
  driver$: Observable<string[]>    = this.dataSource.distinctItemsByField('driver');
  
  dataSource$: Observable<Waybill[]> = this.dataSource.data$;

  constructor(
    public dataSource: DataSourceForTableService,
    private router: Router
    ) { }
    
  ngOnInit() {
    this.dataSource.filters = [ {control: this.dateControl,     field: 'date',      compare: FUNCTION_FILTERING.range},
                                {control: this.customerControl, field: 'customer',  compare: FUNCTION_FILTERING.indexOf},
                                {control: this.dumpControl,     field: 'dump',      compare: FUNCTION_FILTERING.indexOf},
                                {control: this.loadingControl,  field: 'loading',   compare: FUNCTION_FILTERING.indexOf},
                                {control: this.unloadingControl,field: 'unloading', compare: FUNCTION_FILTERING.indexOf},
                                {control: this.driverControl,   field: 'driver',    compare: FUNCTION_FILTERING.indexOf}];
  }

  ngAfterViewInit(): void {
  }
  
  ngAfterViewChecked(): void {
  }

  goDetail(wb: Waybill) {
    this.dataSource.marked = wb._id;
    this.router.navigate(['/waybill', wb._id])
  }
  setMarked(wb: Waybill) {
    if(this.isMarked(wb)) {
      this.dataSource.marked = "-1";
    } else {
      this.dataSource.marked = wb._id;
    }
  }
  isMarked(wb: Waybill) {
    return this.dataSource.marked == wb._id;
  }
  isSorted(columnName: string) {
    let result = false;
    result = (this.sort && this.sort.active) ? this.sort.active == columnName : false    
    return result;
  }
  
  previousDate = null;
  zebra = false;
  isChangedDate(wb: Waybill, index) {
    if(index == 0) {this.zebra = false; this.previousDate = null}
    if(wb.date != this.previousDate) {
      this.previousDate = wb.date
      this.zebra = !this.zebra
    } 
    return this.zebra
  }
  previousSortValue = null;
  isChangeSortedValue(wb: Waybill, index) {
    let sort = this.sort.active;   
     
    if(index == 0) {
      this.previousSortValue = wb[sort]
      return false
    }

    if(wb[sort] != this.previousSortValue) {
      this.previousSortValue = wb[sort]
      return true
    } 
    return false
    
  }
  setView(view) {
    switch(view) { 
      case 0: { 
        this.view.set('revise');
        this.viewState.next('revise');
      break; 
      } 
      case 1: { 
        this.view.set('finantial');
        this.viewState.next('finantial');
      break; 
      } 
      case 2: { 
        this.view.set('driver');
        this.viewState.next('driver');
      break; 
      } 
    } 
  }










  getTotalTon() {
    return 0;
  }
  getTotalCube() {
    return 0;
  }
  getTotalWageDriver() {
    return 0;
  }
  getTotalDistance() {
    return 0;
  }
  getTotalHour() {
    return 0;
  }
}
