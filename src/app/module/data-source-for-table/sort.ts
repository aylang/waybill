import * as _moment from 'moment';
const moment = _moment;

export interface SortRule {
    field: string,
    compare: any,
    sequence?: number
}  

export const FUNCTION_SORTING = {
    string: (a, b, isAsc) => {  let result = 0
                                if(a < b) return -1 * (isAsc ? 1 : -1);
                                if(a > b) return 1 * (isAsc ? 1 : -1); 
                                return result;
                             },
    date:   (a, b, isAsc) => {
                                let aDate = moment(a, ["DD.MM.YYYY", "D.MM.YYYY"]); //console.log("a="+a+" | aDate="+aDate);
                                let bDate = moment(b, ["DD.MM.YYYY", "D.MM.YYYY"]); //console.log("b="+b+" | bDate="+bDate);
                                return (aDate < bDate ? -1 : 1) * (isAsc ? 1 : -1);
                             }
}


