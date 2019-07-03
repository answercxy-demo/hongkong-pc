import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_TW } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  registerLocaleData,
  HashLocationStrategy,
  LocationStrategy
} from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HomeComponent } from './view/home/home.component';
import { CardComponent } from './components/card/card.component';
import { ComeOnStageComponent } from './view/come-on-stage/come-on-stage.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ConfirmComponent } from './view/confirm/confirm.component';
import { PaySuccessComponent } from './view/pay-success/pay-success.component';
import { PhoneQueryComponent } from './view/phone-query/phone-query.component';
import { MessageComponent } from './components/message/message.component';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, HomeComponent, CardComponent, ComeOnStageComponent, CarouselComponent, ConfirmComponent, PaySuccessComponent, PhoneQueryComponent, MessageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_TW },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
