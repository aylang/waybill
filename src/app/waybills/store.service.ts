import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public page: BehaviorSubject<number> = new BehaviorSubject(0);
  public size: BehaviorSubject<number> = new BehaviorSubject(15);
  public selectedId: BehaviorSubject<string> = new BehaviorSubject('-1');  
  public markedId: BehaviorSubject<string> = new BehaviorSubject('-1');  
  public conditions: BehaviorSubject<any> = new BehaviorSubject({}); 
  public condition(field: string): Observable<any> {
    return this.conditions.asObservable().pipe(
      map(conditions => {
        let result = "";
        if (conditions[field]) {
          if (conditions[field]._value) {
            result = conditions[field]._value
          }
        }         
        return result;
      })
    )
  } 
  public view: BehaviorSubject<string> = new BehaviorSubject('revise');
}
