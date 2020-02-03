import { FormControl } from '@angular/forms';

import * as _moment from 'moment';
const moment = _moment;

export interface Filter {
    control: FormControl,
    field: string,
    compare: any
}

export const FUNCTION_FILTERING = {
    indexOf: (fieldValue: string, conditionValue: string) => {
        let _fieldValue = String(fieldValue).trim().toUpperCase();
        let _conditionValue = String(conditionValue).trim().toUpperCase()

        if(_fieldValue.indexOf(_conditionValue) == -1) {
        return false; 
        }
        return true;
    },
    startsWith: (fieldValue: string, conditionValue: string) => {
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