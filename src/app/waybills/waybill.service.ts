import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { map, distinct, switchMap } from 'rxjs/operators';

import { Waybill, nullWBList } from './waybill';

@Injectable({
  providedIn: 'root'
})
export class WaybillService {

  private url = 'http://waybillapi.herokuapp.com/api/waybilllist';  
  private loaded: BehaviorSubject<Waybill[]> = new BehaviorSubject<Waybill[]>(nullWBList);

  constructor(
    private http: HttpClient
  ) { 
    this.loading();
  }


  loading() {
    this.http.get<Waybill[]>(this.url).subscribe(data => this.loaded.next(data));
  }
  loadingMock() {
    this.loaded.next(nullWBList)
  }

  getWaybills(): Observable<Waybill[]> {
    return this.loaded.asObservable();
  }
  
  getWaybill(id: number | string): Observable<Waybill> {
    return this.getWaybills().pipe(
      map((data: Waybill[]) => { return data.find(waybill => waybill._id === id); })
    )
  }
  
  getField(field: string): Observable<string[]> {
    return this.getWaybills().pipe(
      map((data: Waybill[]) => { 
        var result = [];
        for(let i in data){ result.push(data[i][field]); } // берем только записи этого поля
        return result;
      }),
      map((data: string[]) => {
        var result = data;
        result = Array.from(new Set(result)); // уникальные записи удаляем
        result =  result.filter(n => n); // пустые записи удаляем
        return result.sort(); // сортировка
      })
    )
  }

  update(waybill: Waybill) {    
    return this.http.put(this.url, waybill);
  }

  insert(waybill: Waybill): Observable<any> {
    const streamInsert: Observable<any> = this.http.post(this.url, waybill);
    return streamInsert;
  }

  delete(waybill: Waybill) {
    let streamDelete: Observable<any> = this.http.delete(this.url + "/" + waybill._id);
    return streamDelete;
  }
}
