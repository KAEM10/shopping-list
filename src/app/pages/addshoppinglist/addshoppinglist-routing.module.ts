import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddshoppinglistPage } from './addshoppinglist.page';

const routes: Routes = [
  {
    path: '',
    component: AddshoppinglistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddshoppinglistPageRoutingModule {}
