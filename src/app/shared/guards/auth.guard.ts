import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TipService } from 'src/app/services/tip.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.tipServices.isAuthenticated()
    if(!isAuthenticated) {
				this.router.navigate(['/login']);
        return false
    } else {
      return true
    }
  }
  constructor(private tipServices: TipService, private router: Router) {}
}
