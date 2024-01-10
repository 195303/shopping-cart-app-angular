import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;

  constructor(public userSer: UsersService, private router: Router, private pdtSer: ProductsService) {

  }

  ngOnInit(): void {
    this.pdtSer.updateCart.subscribe({
      next: (data?: any) => {
        console.log('Subject emitted', data);
        this.getCartCount();
      }
    });

    this.getCartCount();
  }

  getCartCount() {
    this.pdtSer.getMyCartCount().subscribe({
      next: (data: number) => {
        this.cartCount = data;
      }
    })
  }

  doLogout() {
    this.cartCount = 0;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
