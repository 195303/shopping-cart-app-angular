import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  cartProducts: any[] = [];
  cartFinalPrice: number = 0;
  msg: string = '';

  constructor(public pdtSer: ProductsService, private router: Router) {

  }

  ngOnInit(): void {
      this.pdtSer.getMyCartItems().subscribe({
        next: (data: any[]) => {
          console.log(data);
          this.cartProducts = data;

          for(let cartData of this.cartProducts) {
            this.cartFinalPrice += cartData.cartPdtPrice; // a += b => a = a+b;
          }
        },
        error: (error: any) => {
          console.log(error);
          if(error.status === 401) {
            localStorage.clear();
            this.router.navigateByUrl('/login');
          }
        }
      })
  }

  updateCart(cartId: number, cartQty: number, pdtPrice: number) {
    this.pdtSer.updateCartItems(cartId, cartQty, pdtPrice).subscribe({
      next: (data: string) => {
        this.msg = data;

        let index = this.cartProducts.findIndex((obj) => {
          return obj._id === cartId;
        });

        this.cartProducts[index].cartPdtQty = cartQty;
        this.cartProducts[index].cartPdtPrice = pdtPrice*cartQty;

        this.cartFinalPrice = 0;
        for(let cartData of this.cartProducts) {
          this.cartFinalPrice += cartData.cartPdtPrice; // a += b => a = a+b;
        }
      }, error: (error: any) => {
        console.log(error);
        this.msg = 'Something went wrong!';
      }
    })
  }

  removeCart(cartId: number) {
    this.pdtSer.removeMycartItems(cartId).subscribe({
      next: (data: string) => {
        this.msg = data;
        this.pdtSer.updateCart.next('After removed cart items');

        this.cartProducts = this.cartProducts.filter((obj) => {
          return obj._id != cartId;
        });

        this.cartFinalPrice = 0;
        for(let cartData of this.cartProducts) {
          this.cartFinalPrice += cartData.cartPdtPrice; // a += b => a = a+b;
        }

      }, 
      error: (error: any) => {
        console.log(error);
        this.msg = 'Something went wrong!';
      }
    })
  }

}
