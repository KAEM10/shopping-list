import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddshoppinglistPageRoutingModule } from './addshoppinglist-routing.module';

import { AddshoppinglistPage } from './addshoppinglist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddshoppinglistPageRoutingModule
  ],
  declarations: [AddshoppinglistPage]
})
export class AddshoppinglistPageModule {}
