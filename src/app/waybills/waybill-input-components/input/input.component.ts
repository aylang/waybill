import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  @Input() set value(value: string) {
    this.input.setValue(value)
  }
  @Input() placeholder: string;
  @Input() appearance: string = "standard";
  @Input() width1: string = "auto";
  @Input() autocompleteObservable: Observable<string[]>;
  @Input() autocomplete: string[];
  @Output() valueChange = new EventEmitter<string>();
  input = new FormControl();  
  options: string[];
  filteredOptions = new Observable<string[]>();

  constructor( ) {
  }

  ngOnInit() {  
    if (this.autocompleteObservable) {
      this.autocompleteObservable.subscribe(
        (options: string[]) => {
          this.options = options;
          this.initialAutocomplete();          
        }
      );
    } 
    if (this.autocomplete) {
      this.options = this.autocomplete;
      this.initialAutocomplete();
    }
    //of(this.value).subscribe(value=> this.input.setValue(value))    
    this.input.valueChanges.subscribe(
      value => {
                //this.value = value;
                this.valueChange.emit(value);
               }
    );
  }
  ngAfterViewInit() {
  }

  initialAutocomplete() {
    this.filteredOptions = this.input.valueChanges
      .pipe(
        startWith(''),
        map(name => this.find(name))
      );
  }

  find(value: string): string[]{
    if(typeof value != 'string') value = String(value)
    const filterValue = value.toLowerCase();  
    if(!this.options) return [];  
    return this.options.filter(option => option.toLowerCase().includes(filterValue));    
  }
  
  isFilled(): boolean {
    if(this.input && this.input.value && this.input.value.length > 0) return true;
    return false;
  }

  clear() {
    this.input.setValue('');    
  }
}