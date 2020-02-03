import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker'

@Component({
  selector: 'app-date-saturn',
  templateUrl: './date-saturn.component.html',
  styleUrls: ['./date-saturn.component.css'],
  providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
      {
        provide: MAT_DATE_FORMATS,
        useValue: {
          parse: {
            dateInput: ['DD.MM.YYYY', 'D.MM.YYYY', 'DD MMMM YYYY'],
          },
          display: {
            dateInput: 'DD.MM.YYYY',
            monthYearLabel: 'MMMM YYYY',
            dateA11yLabel: 'DD.MM.YYYY',
            monthYearA11yLabel: 'MMMM YYYY',
          },
        },
      }
  ]
})
export class DateSaturnComponent implements OnInit {
  @Output() formControl = new FormControl();
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() value: string;

  constructor() { }  

  ngOnInit() {
    this.formControl.valueChanges.subscribe(
      (newValue) => {
        this.valueChange.emit(newValue);
      }
    )
  }
}
