import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { WaybillService } from '../waybill.service';
import { Waybill, nullWB } from '../waybill';
import { Subject, Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-waybill-new',
  templateUrl: './waybill-new.component.html',
  styleUrls: ['./waybill-new.component.css']
})
export class WaybillNewComponent implements OnInit {

  public waybill: Waybill = new Waybill();
  saving = false;
  customers$ = this.service.getField('customer');
  customerValue$: Subject<string> = new Subject<string>()  
  loading$: Observable<string[]> = this.getField('loading');  
  unloading$: Observable<string[]> = this.getField('unloading');
  
  constructor(
    public service: WaybillService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  
  getField(field:string): Observable<string[]> {
    return this.customerValue$.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((customer: string) => {
        return this.service.getWaybills().pipe(
          map((data: Waybill[]) => { 
            var result = [];
            for(let i in data){ if(data[i].customer == customer) result.push(data[i][field]); } // берем только записи этого поля
            return result;
          }),
          map((data: string[]) => {
            var result = data;
            result = Array.from(new Set(result)); // уникальные записи оставляем
            result =  result.filter(n => n); // пустые записи удаляем
            return result.sort(); // сортировка
          })
        )
      })
    )
  }
  
  setCustomerValue(value: string) {
    this.customerValue$.next(value)
  }

  save() {
    this.saving = true;
    this.service.insert(this.waybill).subscribe(() => {
        this.service.loading()
        this.back();
    },
    () => {this.saving = false;}
    );
  }

  back() {
    this.router.navigate(['../']);
  }
}
