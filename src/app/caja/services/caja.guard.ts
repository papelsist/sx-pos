import { Injectable } from '@angular/core'; 
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable'

import { AuthService } from 'app/_auth/services/auth.service';
import { User } from 'app/_auth/models/user';

@Injectable()
export class CajaGuard implements CanActivate {

  role: string;

  constructor( private authService: AuthService) {
    this.role = 'ROLE_CAJA';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authService.getCurrentUser().map( (user: User) => {
      // console.log('Evaluando role en usuario: ', user);
      const found = user.roles.find( item => item === this.role);
      // console.log('Role: ', found)
      return !!found;
    });
  }
}