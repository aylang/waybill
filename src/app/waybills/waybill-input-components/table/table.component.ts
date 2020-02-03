import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { WaybillService } from '../../waybill.service';
import { Waybill, nullWB } from '../../waybill';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {
  dataSource = new MatTableDataSource<Waybill>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['customer', 'date', 'shift', 'dump', 'driver', 'loading', 'unloading', 'distance', 
                                'ton', 'cube', 'hour', 'rides', 'price', 'revenue', 'fuelLitres', 'fuelCost', 'fuelStation'];
    
  constructor(
    private service: WaybillService
  ) { }

  ngOnInit() {
    this.service.getWaybills().subscribe((data: Waybill[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}