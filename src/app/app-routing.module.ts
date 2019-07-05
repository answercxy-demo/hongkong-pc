import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanListComponent } from './view/plan-list/plan-list.component';
import { HomeComponent } from './view/home/home.component';
import { ComeOnStageComponent } from './view/come-on-stage/come-on-stage.component';
import { ResultComponent } from './view/result/result.component';
import { PhoneQueryComponent } from './view/phone-query/phone-query.component';
import { OrderQueryComponent } from './view/order-query/order-query.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'planList', component: PlanListComponent },
  { path: 'comeOnStage', component: ComeOnStageComponent },
  { path: 'result', component: ResultComponent },
  { path: 'phoneQuery', component: PhoneQueryComponent },
  { path: 'orderQuery', component: OrderQueryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
