import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, of as observableOf, merge, Subject, interval } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';

import { WaybillService } from '../../waybill.service';
import { Waybill, nullWB } from '../../waybill';
import { View } from './view';
import { StoreService } from '../../store.service';
import { DataTableDatasourceFilter } from './data-table-datasource-filter';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild("dateHeaderCell", {static: false}) dateHeaderCell: SortDirection;
  @ViewChild(MatTable, {static: false}) table: MatTable<Waybill>;
  @ViewChild(MatTabGroup, {static: false}) tabGroup: MatTabGroup;
  dataSource: DataTableDataSource;
  view = View('revise');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: WaybillService,
    public storeService: StoreService,
    private cdRef : ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.service);
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey) {
        if (event.keyCode == 37) {
            this.dataSource.paginator.previousPage();
        }
        if (event.keyCode == 39) {
          this.dataSource.paginator.nextPage();
        }
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.storeService.page.subscribe(page => {
      this.dataSource.paginator.pageIndex = page;
    })
    this.storeService.size.subscribe(size => {
      this.dataSource.paginator.pageSize = size;
    })
    this.storeService.conditions.subscribe(conditions => {
      this.dataSource.filter.addConditions(conditions);
    })
    this.storeService.view.subscribe(viewName => {
      this.view = View(viewName);
      this.setView1(viewName);
    })
    this.table.dataSource = this.dataSource;
    this.cdRef.detectChanges();

    // При перемещении по страницам сохраняем наше положение.
    this.dataSource.paginator.page.subscribe(pageInfo => {
      let index = pageInfo.pageIndex;
      this.storeService.page.next(index)

      let size = pageInfo.pageSize;
      this.storeService.size.next(size)
    })
  }

  applyFilter(value: string, column: string, logicName?: string) {
    //console.log(column+"="+value)
    let newConditions = this.dataSource.filter.addCondition(value, column, logicName)
    this.storeService.conditions.next(newConditions);
  }

  isSorted(columnName: string) {
      if(!this.dataSource || !this.dataSource.sort || !this.dataSource.sort.active) return false;
      return this.dataSource.sort.active == columnName;  
  }
  
  selectWB(waybill: Waybill) {
    this.storeService.selectedId.next(waybill._id)
    this.router.navigate(['/waybill', waybill._id])
  }
  marked(waybill: Waybill) {
    this.storeService.markedId.next(waybill._id)
  }  
  
  isSelected(id: string): boolean {
    return this.storeService.selectedId.value == id;
  }
  isMarked(id: string): boolean {
    return this.storeService.markedId.value == id;
  }

  setView(view) {
    switch(view) { 
      case 0: { 
        this.view.set('revise');
        this.storeService.view.next('revise');
      break; 
      } 
      case 1: { 
        this.view.set('finantial');
        this.storeService.view.next('finantial');
      break; 
      } 
      case 2: { 
        this.view.set('driver');
        this.storeService.view.next('driver');
      break; 
      } 
    } 
  }
  setView1(viewName: string) {
    let result = 0;
    switch(viewName) { 
      case 'revise': { 
        result = 0;
      break; 
      } 
      case 'finantial': { 
        result = 1;
      break; 
      } 
      case 'driver': { 
        result = 2;
      break; 
      } 
    } 
    this.tabGroup.selectedIndex = result;
  }
}