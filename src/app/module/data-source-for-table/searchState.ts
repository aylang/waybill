import { MatSortable, PageEvent } from '@angular/material';

export class SearchState {
    isChanged: boolean = false;
    sort: MatSortable = {
        id: 'date',
        start: "asc",
        disableClear: false
    }
    paginator: PageEvent = {
        length: 0,
        pageSize: 0,
        pageIndex: 0
    }
    filters: StateFilter[] = [];
}

export interface StateFilter {
    field: string;
    value: string;
    compare: any
}
