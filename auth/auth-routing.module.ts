import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductsComponent } from '../Products/addproducts/addproducts.component';
import { MycartComponent } from '../Products/mycart/mycart.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
 {path: '', children: [
  {path: 'mycart', component: MycartComponent, canActivate: [AuthGuard]},
  {path: 'addproducts', component: AddproductsComponent, canActivate: [AuthGuard]}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
