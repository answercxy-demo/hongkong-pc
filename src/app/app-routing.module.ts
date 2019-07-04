import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ComeOnStageComponent } from './view/come-on-stage/come-on-stage.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PaySuccessComponent } from './view/pay-success/pay-success.component';
import { PhoneQueryComponent } from './view/phone-query/phone-query.component';
import { OrderQueryComponent } from './view/order-query/order-query.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'comeOnStage', component: ComeOnStageComponent },
  { path: 'paySuccess', component: PaySuccessComponent },
  { path: 'phoneQuery', component: PhoneQueryComponent },
  { path: 'orderQuery', component: OrderQueryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
