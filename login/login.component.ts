import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { UsersService } from '../users.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  msg: string | any;

  constructor(public userSer: UsersService, private router: Router, private pdtSer: ProductsService) {
    
  }

  ngOnInit(): void {
    $('.toggle').click(()=>{
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });

    this.loginForm = new FormGroup({
      'Username': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required)
    });
    
  }

  doLogin() {
    this.userSer.userLogin(this.loginForm.value).subscribe({
      next: (data: string) => {
        if(data.length === 0) {
          this.msg = "Invalid Username / Password";
          this.loginForm.reset();
        } else if(data.length > 0){
          localStorage.setItem("loggeduser", data);
          this.pdtSer.updateCart.next('After login get my cart count');
          this.router.navigateByUrl('/');
        }
      }, 
      error: (error: any) => {
        console.log(error);
        this.msg = "Something went wrong!";
      }
    })
  }

  doRegister(form: NgForm) {
    this.userSer.userRegister(form.value).subscribe({
      next: (data: string) => {
        this.msg = data;
        form.reset();
      },
      error: (error: any) => {
        console.log(error);
        this.msg = "Something went wrong!"
      },
      complete: ()=>{
        console.log('Completed');
      }
    })
  }
  
}
