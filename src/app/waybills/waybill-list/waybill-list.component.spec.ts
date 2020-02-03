/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaybillListComponent } from './waybill-list.component';

describe('WaybillListComponent', () => {
  let component: WaybillListComponent;
  let fixture: ComponentFixture<WaybillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
