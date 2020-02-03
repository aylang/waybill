import { Injectable } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Filter } from 'src/app/module/data-source-for-table/filter';
import { SortRule } from 'src/app/module/data-source-for-table/sort';
import { WaybillService } from '../waybill.service';
import { DataSource } from 'src/app/module/data-source-for-table/data-source.service';
import { Waybill } from '../waybill';
import { Observable } from 'rxjs';

@Injectable()
export class DataSourceForTableService {
  public get data$ () {
    return this.dataSource.data$
  }
  public set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  public set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  public set filters(filters: Filter[]) {
    this.dataSource.filters = filters;
  }  
  public set sortRules(sortRules: SortRule[]) {
    this.dataSource.sortRules = sortRules;
  }
  public marked: string = "-1";

  constructor(
    private service: WaybillService,
    private dataSource: DataSource   
  ) {
    this.service.getWaybills().subscribe((data:Waybill[]) => {
      this.dataSource.dataFull$.next(data)});     
  }
  
  public distinctItemsByField(field: string): Observable<string[]> {
    return this.dataSource.distinctItemsByField(field);
  }
}
