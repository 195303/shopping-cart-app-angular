import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit, OnDestroy {

  products: any[] = [];
  isLoading = true;
  msg: string = '';
  activeSubscription: Subscription | any;

  constructor(private pdtSer: ProductsService, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log("List products initated");
   this.activeSubscription = this.activeRoute.params.subscribe({
      next: (param: Params) => {
        console.log(param); // {}
        if(param["catid"]) {
          this.getProductsCatwise(param["catid"]);
        } else {
          this.getProductLists();
        }
      }, 
      error: (error: any) => {

      }, 
      complete: () => {
        console.log("Active params subscription completed");
      }
    })
      
  }

  getProductsCatwise(catId: string) {
    this.isLoading = true;
    const catid = Number(catId);
    this.pdtSer.getProductsByCatwise(catid).subscribe({
      next: (data: any[]) => {
        console.log(data);
        this.isLoading = false;
        this.products = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getProductLists() {
    this.pdtSer.getAllProducts().subscribe({
      next: (data: any[]) => {
        console.log(data);
        this.isLoading = false;
        this.products = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  addToCart(pdtId: number, pdtPrice: number) {
    this.pdtSer.addToMyCart(pdtId, pdtPrice).subscribe({
      next: (data: string) => {
        this.msg = data;
        this.pdtSer.updateCart.next(data);
      }, 
      error: (error: any) => {
        console.log(error);
        this.msg = 'Something went wrong!';
      }
    })
  }

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
  }
}
