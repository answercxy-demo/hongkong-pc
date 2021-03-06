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
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PhoneQueryComponent } from './components/phone-query/phone-query.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { OrderQueryComponent } from './view/order-query/order-query.component';
import { SignatureCanvasComponent } from './components/signature-canvas/signature-canvas.component';
import { ResultComponent } from './view/result/result.component';
import { PackageListComponent } from './view/package-list/package-list.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ComeOnStageComponent,
    CarouselComponent,
    ConfirmComponent,
    PhoneQueryComponent,
    ActivityDetailComponent,
    OrderQueryComponent,
    SignatureCanvasComponent,
    ResultComponent,
    PackageListComponent
  ],
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
  entryComponents: [PhoneQueryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
