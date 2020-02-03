import { Waybill, nullWBList } from '../../waybill';
import { Subject } from 'rxjs';

import * as _moment from 'moment';
const moment = _moment;

export const FilterLogic: {} = {
    indexOf: (fieldValue: Waybill, conditionValue: string) => {
      let _fieldValue = String(fieldValue).trim().toUpperCase();
      let _conditionValue = String(conditionValue).trim().toUpperCase()

      if(_fieldValue.indexOf(_conditionValue) == -1) {
        return false; 
      }
      return true;
    },
    startsWith: (fieldValue: Waybill, conditionValue: string) => {
      let _fieldValue = String(fieldValue).trim().toUpperCase();
      let _conditionValue = String(conditionValue).trim().toUpperCase()

      return _fieldValue.startsWith(_conditionValue);
    },
    range: (fieldValue: string, conditionValue) => {
      let verifiable = moment(fieldValue, ["DD.MM.YYYY", "D.MM.YYYY"]);
      let begin = conditionValue.begin;
      let end = conditionValue.end;
      if(verifiable.isBefore(begin) || verifiable.isAfter(end)) return false; 
      return true;      
    }
}

export class Condition {
  private _value: string;
  private _field: string;
  private _logicName: string = 'indexOf';

  constructor(value: string, field: string, logicName?: string) {
    this._value = value;
    this._field = field;
    logicName? this._logicName = logicName : this._logicName = 'indexOf';
  }

  check(waybill: Waybill) {    
    //console.log(waybill[this._field] + " " + this._logicName + " " + this._value + " = " + 
    //  FilterLogic[this._logicName](waybill[this._field], this._value)
    //)
    if(FilterLogic[this._logicName](waybill[this._field], this._value)) return true;
    return false;
  }
}

export class DataTableDatasourceFilter {
    
    public conditions: {};
    public changed = new Subject<Object>();

    constructor() {
      //this.addCondition({begin:moment('01.12.2019', ["DD.MM.YYYY", "D.MM.YYYY"]), end:moment('29.12.2019', ["DD.MM.YYYY", "D.MM.YYYY"])}, 'date')
      /*this.viewService.conditions.subscribe(conditions => {
        this.conditions = conditions
        this.changed.next(conditions);
      })*/
    }

    public addCondition(value: any, field: string, logicName?: string): any {
      //console.log(value)
      if(!logicName) logicName = 'indexOf';

      let newConditions = {
        ...this.conditions,
        [field]: new Condition(value, field, logicName)
      }
      if(!value) delete newConditions[field];
            
      this.addConditions(newConditions);

      return newConditions;
    }

    public addConditions(newConditions: any) {
      this.conditions = newConditions
      this.changed.next(newConditions);
    }
    
    public filtering(data: Waybill[]) {
      if(this.notData(data)) return nullWBList;
      if(this.notConditions()) { return data; }
      
      let result: Waybill[] = [];    
      data.forEach(waybill => {
        if(this.fitByConditions(waybill)) {
          result.push(waybill)
        }
      })
      
      return result;
    }

    private fitByConditions(waybill) {
      let result = true;
      Object.keys(this.conditions).some(key => {
        if(!this.conditions[key].check(waybill)) { result = false; return true; } 
      })
      return result;
    }

    private notData(data: Waybill[]) {
      if(!data || !data.length || data.length == 0) return true;
      return false;
    }
    private notConditions() {
      if(!this.conditions || Object.keys(this.conditions).length == 0) return true;
    }
}
