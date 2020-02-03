import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { MatSort, MatPaginator, Sort, PageEvent } from '@angular/material';

import { SearchState, StateFilter } from './searchState';
import { Filter } from './filter';
import { SortRule } from './sort';

@Injectable({
  providedIn: 'root'
})
export class DataSource {
  public state = new SearchState();
  public marked: string = "-1";
  public sortRules: SortRule[] = [];
  public set sort(sort: MatSort) {
    if(this.isChanged()) { //Если состояние менялось
      console.log('%c State ', 'color: white; background-color: gray', 'Задаем сортировке данные из состояния', this.state.sort)
      setTimeout(() => {
        sort.direction = this.state.sort.start
        sort.active = this.state.sort.id
      }, 0);
    } else {
      setTimeout(() => {
        let sortInit = {active: sort.active, direction: sort.direction};
        console.log('%c Init ', 'color: white; background-color: gray', 'Инициализация сортировки', sortInit)
        this.updateState_Sort(sort.active, sort.direction) // При изменении сортировки пользователем сохраняем выбранные значения.
        this.sortChange$.next(sortInit) // При первом присваивании испускаем в поток. Первичные данные сортировки указанные в html 
      }, 0);
    }
    
    sort.sortChange.subscribe((action: Sort)=>{ // Клапан. Чтобы при присваивании сортировки не вызывать повторной фильтрации данных.
      console.log('%c Действие ', 'color: white; background-color: #2274A5', 'Таблица отсортирована', action)
      this.updateState_Sort(action.active, action.direction) // При изменении сортировки пользователем сохраняем выбранные значения.
      this.updateState_isChanged(true); // Мы изменили выводимые данные
      this.sortChange$.next(action)
    }); 
  }
  public set paginator(paginator: MatPaginator) { 
    if(this.isChanged()) { //Если состояние менялось
      console.log('%c State ', 'color: white; background-color: gray', 'Задаем пагинатору данные из состояния', this.state.paginator)
      paginator.length = this.state.paginator.length;
      paginator.pageSize = this.state.paginator.pageSize;
      paginator.pageIndex = this.state.paginator.pageIndex;
    } else {
      setTimeout(() => {
        let paginatorInit = {pageIndex: paginator.pageIndex, pageSize: paginator.pageSize};
        console.log('%c Init ', 'color: white; background-color: gray', 'Инициализация пагинатора', paginatorInit)
        this.updateState_Paginator(paginator.length, paginator.pageSize, paginator.pageIndex)
        this.paginatorChange$.next(paginatorInit) 
      }, 0);
    }

    this.dataFiltered$.subscribe((dataFiltered: any[]) => {
      paginator.length = dataFiltered.length;
      this.updateState_Paginator(dataFiltered.length)
    })
    this.filtersChange$.subscribe(() => paginator.firstPage())
    
    paginator.page.subscribe((action: PageEvent) => {
      console.log('%c Действие ', 'color: white; background-color: #2274A5', 'Пагинировали', action)
      this.updateState_Paginator(action.length, action.pageSize, action.pageIndex)
      this.updateState_isChanged(true); // Мы изменили выводимые данные  
      this.paginatorChange$.next(action)       
    })
  }
  
  public set filters(filters: Filter[]) {
      if(this.isChanged()) { //Если состояние менялось
        filters.forEach((filter: Filter) => {
          console.log('%c State ', 'color: white; background-color: gray', `Заполняем input.${filter.field} из состояния`, this.getValue(filter))
          filter.control.patchValue(this.getValue(filter)) // Задаем input значение из состояния
        })
      } else {     
        filters.forEach((filter: Filter) => {   
          setTimeout(() => {
            let inputInit = filter.control.value;
            console.log('%c Init ', 'color: white; background-color: gray', `Инициализация input.${filter.field}=${inputInit}`)
            this.setValue(filter) // При изменении input пользователем сохраняем выбранные значения.
          }, 0);          
        })
        setTimeout(() => {
          this.filtersChange$.next(true) // При первом присваивании испускаем в поток. Первичные данные сортировки указанные в html 
        }, 1);
      }

      filters.forEach((filter: Filter) => {
        filter.control.valueChanges.subscribe((action: string)=>{ // Клапан. Чтобы при присваивании input не вызывать повторной фильтрации данных.
          console.log('%c Действие ', 'color: white; background-color: #2274A5', `Применен фильтр input.${filter.field}=${action}`)
          this.setValue(filter) // При изменении input пользователем сохраняем выбранные значения.
          this.updateState_isChanged(true); // Мы изменили выводимые данные
          this.filtersChange$.next(true)
        }); 
      })
  }

  public dataFull$: Subject<any[]> = new Subject<any[]>();
  private dataFiltered$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private paginatorChange$: Subject<any> = new Subject<any>();
  private sortChange$: Subject<any> = new Subject<any>();
  private filtersChange$: Subject<any> = new Subject<any>();

  constructor() {
    this.sortChange$.subscribe(() => {
      console.log('%c Поток ', 'color: white; background-color: green', 'sortChange')
    })
    this.paginatorChange$.subscribe(() => {
      console.log('%c Поток ', 'color: white; background-color: green', 'paginatorChange')
    })
    this.filtersChange$.subscribe(() => {
      console.log('%c Поток ', 'color: white; background-color: green', 'filtersChange')
    })
    this.dataFull$.subscribe((dataFull: any[]) => {
      console.log('%c Поток ', 'color: white; background-color: green', 'dataFull', {dataFull})
    })
    this.dataFiltered$.subscribe((dataFiltered: any[]) => {
      console.log('%c Поток ', 'color: white; background-color: green', 'dataFiltered', {dataFiltered})
    })
    this.data$.subscribe((data: any[]) => {
      console.log('%c Поток ', 'color: white; background-color: green', 'data', {data})
    })

    combineLatest(this.dataFull$, 
                  this.filtersChange$.pipe(debounceTime(350)), 
                  this.sortChange$).pipe(
      tap(([dataFull, filtersChange, sortChange]) => console.log('%c Узел ', 'color: black; background-color: green', 'Фильтрация', {dataFull, filtersChange, sortChange})),
      map(([dataFull]) => { // Фильтрация
        let result = dataFull;
        this.state.filters.forEach((filter: StateFilter) => {          
          if(filter.value) {         
            result = result.filter((item: any) => {             
              return filter.compare(item[filter.field], filter.value)
            })
          }
        })
        return result;
      }),
      map((dataFiltered: any[]) => {
        return this.getSortedData(dataFiltered)
      })
    )
    .subscribe((dataFilteredSorted: any[]) => {
      this.dataFiltered$.next(dataFilteredSorted)
    })

    combineLatest(this.dataFiltered$, this.paginatorChange$).pipe(
      tap(([dataFiltered, paginatorChange]) => console.log('%c Узел ', 'color: black; background-color: green', 'Пагинатор', {dataFiltered, paginatorChange})),
      map(([dataFiltered, paginatorChange]) => {
        return this.getPagedData(dataFiltered, paginatorChange);
      })
    )
    .subscribe((dataFiltered) => this.data$.next(dataFiltered))
    
  }

  private getSortedData(data: any[]): any[] {
    let sortState = this.state.sort
    if (!sortState.id || sortState.id == '') {
      return data;
    }
    const isAsc = sortState.start === "asc";
    
    let selectedSortRule = this.sortRules.find((rule:SortRule) => rule.field == sortState.id)
    let sequence = this.sortRules.filter((rule:SortRule) => rule.sequence).sort((a, b) => a.sequence-b.sequence)  
    
    return data.sort((a, b) => {
      let result = 0
      result = selectedSortRule.compare(a[selectedSortRule.field], b[selectedSortRule.field], isAsc)
      
      // если равны то фильтруем по дополнительному столбцу
      if(result == 0) {
        sequence.forEach((rule: SortRule) => {
          if(result == 0){
            result = rule.compare(a[rule.field], b[rule.field], true)
          }
        })
      }
                                
      return result
    })

  }

  private getPagedData(data: any[], paginator): any[] {
    if(!paginator) return data;  
    const startIndex = paginator.pageIndex * paginator.pageSize; 
    const endIndex = startIndex + paginator.pageSize;
    return data.slice(startIndex, endIndex);
  }

  public distinctItemsByField(field: string): Observable<string[]> {
    return this.dataFiltered$.pipe(
      map((dataFiltered: any[]) => {
        return dataFiltered.map(item => item[field]) // выбираем поле - заказчики
                           .reduce(removeDuplicate, []) // группируем повтояющиеся записи
                           .filter(n => n) // пустые записи удаляем
                           .sort() // сортировка
      })
    )
  }












  
  updateState_Paginator(length: number, pageSize?: number, pageIndex?: number) {
    const paginator = {...this.state.paginator, length, pageSize, pageIndex};
    this.state = {...this.state, paginator}
  }
  updateState_Sort(id: string, start: any) {
    const sort = {...this.state.sort, id, start};
    this.state = {...this.state, sort};
  }
  updateState_isChanged(isChanged: boolean) {
    this.state = {...this.state, isChanged};
  }
  getValue(filter: Filter): string {
      let result = "";      
      result = this.state.filters.find((f: StateFilter) => f.field == filter.field).value
      return result;
  }
  setValue(filter: Filter) {
    let field = filter.field
    let value = filter.control.value
    let compare = filter.compare
    let changedFilter = this.state.filters.find((f: StateFilter) => f.field == field)
    if(changedFilter) {
        changedFilter.value = value
    } else {
        this.state.filters.push({field: field, value: value, compare: compare})
    }
  }
  isChanged() {
    return this.state.isChanged;
  }
}

const removeDuplicate = function (notDuplicate, currentWB) {
  if (notDuplicate.indexOf(currentWB) === -1) {
    notDuplicate.push(currentWB)
  }
  return notDuplicate
}