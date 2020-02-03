import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from, of, Observable } from 'rxjs';
import { map, take, mergeMap } from 'rxjs/operators';

import { WaybillService } from '../waybills/waybill.service';
import { Waybill, nullWBList } from '../waybills/waybill';
import { StoreService } from '../waybills/store.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Путевки';
  waybills$;

  constructor(private service:WaybillService,
              public storeService:StoreService) { }

  ngOnInit() {
    this.waybills$ = this.service.getWaybills()
    .pipe(
      map(data => data.slice(0, 3))
    );
  }
  mainMenu = [
    {path: 'waybill', name: 'Реестр'},
    {path: 'new', name: 'Новый'},
    //{path: 'experiment', name: 'Эксперимент'}
  ]

  loadMock() {
    this.service.loadingMock()
  }
  load() {
    this.service.loading()
  }
}

