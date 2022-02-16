import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BassFixedHeaderDirective } from './fixedHeader/BassFixedHeader.directive';
import { FixedHeaderComponent } from './fixedHeader/fixedHeader.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, FixedHeaderComponent, BassFixedHeaderDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
