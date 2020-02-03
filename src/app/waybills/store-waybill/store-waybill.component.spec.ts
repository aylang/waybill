/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StoreWaybillComponent } from './store-waybill.component';

describe('StoreWaybillComponent', () => {
  let component: StoreWaybillComponent;
  let fixture: ComponentFixture<StoreWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
