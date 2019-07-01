import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInputComponent } from './view/add-input/add-input.component';

const routes: Routes = [{ path: 'addItem', component: AddInputComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
