import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userSer: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log("App req on its way!!");
    
    // Get the token and ensure it's a string, providing an empty string if it's null
    const authToken: string = this.userSer.getMyToken() || '';

    // Clone the request and set the headers with the token
    const tokenizedReq = req.clone({
      setHeaders: {
        'myauthtoken': authToken
      }
    });

    return next.handle(tokenizedReq);
  }
}
