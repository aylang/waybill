import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject, BehaviorSubject, from } from 'rxjs';
import { EventEmitter } from 'protractor';

import { WaybillService } from '../../waybill.service';
import { Waybill, nullWB, nullWBList } from '../../waybill';
import { ModuleWithComponentFactories } from '@angular/core';
import { DataTableDatasourceFilter } from './data-table-datasource-filter';

import { MomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
const moment = _moment;


/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Waybill> {
  paginator: MatPaginator;
  sort: MatSort;
  filter: DataTableDatasourceFilter = new DataTableDatasourceFilter();
  data: BehaviorSubject<Waybill[]> = new BehaviorSubject<Waybill[]>(nullWBList);
  totalTon: number = 0;
  totalCube: number = 0;

  constructor( private service:WaybillService ) {    
    super();
    this.service.getWaybills().subscribe(data => this.data.next(data));     
    this.filter.changed.subscribe(() => {
      this.paginator.firstPage();
    })
  }
  
  getField(field: string): Observable<string[]>  {
    return merge(this.data, this.filter.changed).pipe(map(() => {
      let result = this.filter.filtering(this.data.value).map(function(elem) {
        return elem[field]
      })
      result = Array.from(new Set(result)); // уникальные записи удаляем
      result = result.filter(n => n); // пустые записи удаляем
      result = result.sort(); // сортировка
      return result;
    }));    
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Waybill[]> {
    const dataMutations = [
      this.data,
      this.filter.changed,
      this.paginator.page,
      this.sort.sortChange
    ];  

    return merge(...dataMutations).pipe(map(() => {
      let filteredData = this.filter.filtering([...this.data.value]);  
      this.paginator.length = filteredData.length;

      let sortedData = this.getSortedData(filteredData);

      let pagedData = this.getPagedData(sortedData);   
      return pagedData;
    }));    
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Waybill[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
  
  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Waybill[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'customer': return compare(a.customer, b.customer, isAsc);
        case 'date': return compareDate(a.date, b.date, isAsc);        
        case 'loading': return compare(a.loading, b.loading, isAsc);   
        case 'unloading': return compare(a.unloading, b.unloading, isAsc);   
        case 'dump': return compare(a.dump, b.dump, isAsc);
        case 'driver': return compare(a.driver, b.driver, isAsc);
        default: return 0;
      }
    });
  }
  
  
  getTotalTon() {
    return this.filter.filtering(this.data.value).reduce((acc, wb) => acc + this.tonSum(wb), 0);    
  }
              tonSum(wb: Waybill) {
                return this.ton(wb)*this.rides(wb);
              }
              ton(wb: Waybill) {
                return +(wb.ton?wb.ton.replace(",","."):0);
              }
              rides(wb: Waybill) {
                if(!wb.rides) return 0;
                if(!parseInt(wb.rides)) return 0;
                return +wb.rides;
              }
  getTotalCube() {
    return this.filter.filtering(this.data.value).reduce((acc, val) => acc + +(val.cube?val.cube:0)*+(val.rides?val.rides:1), 0);    
  }
  getTotalWageDriver() {
    return this.filter.filtering(this.data.value).reduce((acc, val) => acc + +(val.wageDriver?val.wageDriver:0), 0);    
  }
  getTotalDistance() {
    //return this.filter.filtering(this.data.value).reduce((acc, val) => acc + +(val.rides?val.rides:0)*+(val.distance?val.distance:0), 0);    
    return this.filter.filtering(this.data.value).reduce((acc, val) => acc + ((val.rides && val.distance)?+val.rides*+val.distance:0), 0);    
  }
  getTotalHour() {
    return this.filter.filtering(this.data.value).reduce((acc, val) => acc + +(val.hour?val.hour:0), 0);    
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function compareDate(a, b, isAsc) {
  let aDate = moment(a, ["DD.MM.YYYY", "D.MM.YYYY"]); //console.log("a="+a+" | aDate="+aDate);
  let bDate = moment(b, ["DD.MM.YYYY", "D.MM.YYYY"]); //console.log("b="+b+" | bDate="+bDate);
  return (aDate < bDate ? -1 : 1) * (isAsc ? 1 : -1);
}