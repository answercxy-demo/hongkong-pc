import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageListComponent } from './view/package-list/package-list.component';
import { HomeComponent } from './view/home/home.component';
import { ComeOnStageComponent } from './view/come-on-stage/come-on-stage.component';
import { ResultComponent } from './view/result/result.component';
import { OrderQueryComponent } from './view/order-query/order-query.component';

const routes: Routes = [
  { path: '', redirectTo: '/packageList', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'packageList', component: PackageListComponent },
  { path: 'comeOnStage', component: ComeOnStageComponent },
  { path: 'result', component: ResultComponent },
  { path: 'orderQuery', component: OrderQueryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
