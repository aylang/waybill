 /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

export const View = function(viewName: string): ViewColumnDisplayed {
    return new ViewColumnDisplayed(viewName);
}

export class ViewColumnDisplayed {
    _viewName = 'revise';    
    _view = { 
        'revise':   [
                        {column: 'customer', filter: true}, 
                        {column: 'date', filter: true}, 
                        {column: 'dump', filter: true}, 
                        {column: 'result', filter: false}, 
                        {column: 'loading', filter: true}, 
                        {column: 'unloading', filter: true}, 
                        {column: 'driver', filter: true}, 
                        {column: 'showDetail', filter: false}                        
                    ],
        'finantial':[
                        {column: 'customer', filter: true}, 
                        {column: 'date', filter: true}, 
                        {column: 'dump', filter: true}, 
                        //{column: 'result', filter: false}, 
                        {column: 'price', filter: false}, 
                        {column: 'revenue', filter: false}, 
                        {column: 'fuelLitres', filter: false}, 
                        {column: 'fuelStation', filter: false}, 
                        {column: 'fuelCost', filter: false}, 
                        {column: 'driver', filter: true},
                        {column: 'resultDriver', filter: false}, 
                        {column: 'rateDriver', filter: false}, 
                        {column: 'wageDriver', filter: false}, 
                        {column: 'showDetail', filter: false},
                    ],
        'driver':   [
                        {column: 'driver', filter: true},
                        {column: 'date', filter: true}, 
                        //{column: 'rides', filter: false}, 
                        //{column: 'distance', filter: false}, 
                        //{column: 'hour', filter: false}, 
                        {column: 'resultDriver', filter: false}, 
                        {column: 'rateDriver', filter: false}, 
                        {column: 'wageDriver', filter: false}, 
                        {column: 'loading', filter: true}, 
                        {column: 'unloading', filter: true}, 
                        {column: 'dump', filter: true}, 
                        {column: 'customer', filter: true}, 
                        {column: 'showDetail', filter: false}
                    ]
    };
    constructor(viewName: string) {
        this._viewName = viewName;
    }
    log() {
        console.log(this._viewName + " | " + this._view['revise'] + " | " + this.getDisplayedColumns());
    }
    getDisplayedColumns() {
        return this._view[this._viewName].map(el => el.column);
    }
    getDisplayedFilterColumns() {
        return this._view[this._viewName].map(el => el.filter?'filter_'+el.column:'filter_empty');
    }
    set(viewName: string) {
        this._viewName = viewName;
    }
}
