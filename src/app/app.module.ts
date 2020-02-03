import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, AppComponents, AppServices } from './app-routing.module';
import { WaybillsModule } from "./waybills/waybills.module";

import { AppComponent } from './app.component';

@NgModule({
   declarations: [
      AppComponents
   ],  
   imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule,
      FormsModule, ReactiveFormsModule,
      HttpClientModule,
      WaybillsModule
   ],
   providers: [AppServices],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
