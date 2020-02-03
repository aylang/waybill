import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { switchAll, map, skip, takeLast, startWith, distinctUntilChanged, switchMap, debounceTime, filter } from 'rxjs/operators';

import { WaybillService } from '../waybill.service';
import { Waybill, nullWB, nullFuel } from '../waybill';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-waybill-detail',
  templateUrl: './waybill-detail.component.html',
  styleUrls: ['./waybill-detail.component.css']
})
export class WaybillDetailComponent implements OnInit {
  id;
  waybill = nullWB;
  saving = false;
  customers$ = this.service.getField('customer');
  customerValue$: Subject<string> = new Subject<string>()  
  loading$: Observable<string[]> = this.getField('loading');  
  unloading$: Observable<string[]> = this.getField('unloading');
  isFuel = false;
  
  constructor(
    public service: WaybillService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initID();
    this.initWaybill();
  }
  ngAfterViewInit() {
    this.customerValue$.next(this.waybill.customer)
  }
  initID(){
    this.route.params.subscribe(params => {
      this.id=params['id'];
    });
  }
  initWaybill(){       
    this.service.getWaybill(this.id).subscribe((waybill: Waybill) => {
      this.waybill = waybill;
    })
  }
  log(msg: string) {
    console.log(msg);
  }
  setCustomerValue(value: string) {
    this.customerValue$.next(value)
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

  save() {
    this.saving = true;
    this.service.update(this.waybill).subscribe(() => {
        this.back();
    },
    () => {this.saving = false;}
    );
  }

  delete() {
    this.service.delete(this.waybill).subscribe(() => {
        this.service.loading()
        this.back();
    },
    () => {}
    );
  }

  back() {
    this.router.navigate(['../']);
  }

  addFuel() {
    this.waybill.fuel.push(nullFuel)
  }
}
