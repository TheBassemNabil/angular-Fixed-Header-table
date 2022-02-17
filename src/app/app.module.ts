import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgFixedHeaderModule } from 'angular-fixed-header-table';

import { AppComponent } from './app.component';
import { FixedHeaderComponent } from './fixedHeader/fixedHeader.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, NgFixedHeaderModule],
  declarations: [AppComponent, FixedHeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
