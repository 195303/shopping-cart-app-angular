import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiServer: string = environment.server;

  updateCart = new Subject();

  constructor(private http: HttpClient, private userSer: UsersService) { }

  getCategories() {
     return this.http.get<any[]>("http://localhost:3000/getcategories");
    // return this.http.get<any[]>(`${apiServer}getcategories`);
  }

 /* getMyCartItems() {
    return this.http.get<any[]>("http://localhost:3000/mycart", {
      headers: new HttpHeaders({
        'myauthtoken': this.userSer.getMyToken()
      })
    });
  }*/ 

  getMyCartItems() {
    return this.http.get<any[]>("http://localhost:3000/mycart");
  }

  addProducts(data: any) {
    return this.http.post<string>("http://localhost:3000/addproducts", data);
  }

  getAllProducts() {
    return this.http.get<any[]>("http://localhost:3000/listproducts");
  }

  getProductsByCatwise(catid: number) {
    return this.http.get<any[]>("http://localhost:3000/getpdtcatwise/"+catid);
  }

  addToMyCart(pdtId: number, pdtPrice: number) {
    return this.http.post<string>("http://localhost:3000/addtocart", {cartPdtId: pdtId, cartPdtPrice: pdtPrice});
  }

  getMyCartCount() {
    return this.http.get<number>("http://localhost:3000/cartcount");
  }

  updateCartItems(cartId: number, cartQty: number, pdtPrice: number) {
    return this.http.put<string>("http://localhost:3000/updatecart", {cartId, cartPdtQty: cartQty, pdtPrice});
  }

  removeMycartItems(cartId: number) {
    return this.http.delete<string>("http://localhost:3000/removecart/"+cartId);
  }
}
