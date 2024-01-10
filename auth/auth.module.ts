import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AddproductsComponent } from '../Products/addproducts/addproducts.component';
import { MycartComponent } from '../Products/mycart/mycart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MycartComponent,
    AddproductsComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
