import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-waybill',
  templateUrl: './store-waybill.component.html',
  styleUrls: ['./store-waybill.component.css']
})
export class StoreWaybillComponent implements OnInit {

  constructor(
    public storeService: StoreService,
  ) { }

  ngOnInit() {
  }

}
