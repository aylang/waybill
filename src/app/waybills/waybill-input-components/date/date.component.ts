import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['DD.MM.YYYY', 'D.MM.YYYY', 'DD MMMM YYYY'],
        },
        display: {
          dateInput: 'DD MMMM YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'DD.MM.YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    }
  ]
})
export class DateComponent implements OnInit {
  @Input() set value(date: string) {
    this.date.setValue(moment(date, ["DD.MM.YYYY", "D.MM.YYYY"]))
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  date = new FormControl(moment());
  
  constructor() { }

  ngOnInit() {
    this.date.valueChanges.subscribe(
      (newValue: _moment.Moment) => {
        this.valueChange.emit(newValue.format("DD.MM.YYYY"));
      }
    )
  }
}
