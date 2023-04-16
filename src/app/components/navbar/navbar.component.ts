import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = ''
  isHandset$
  isLoggedIn: boolean = false;
  help: boolean = false
  public darkMode = false;
  constructor(private tipService: TipService, private breakpointObserver: BreakpointObserver, private themeService: ThemeService, public dialog: MatDialog, private router: Router) {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .pipe(
        map(result => result.matches)
      );
    const username = window.localStorage.getItem('username')
    if (username != null) {
      this.username = username
    }
  }
  ngOnInit() {
    this.themeService._darkMode.subscribe((value) => {
      this.darkMode = value;
    });
  }
  profile(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ProfileComponent, {
      width: '40%',
      height: '70vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  logout() {
    window.localStorage.clear()
    this.tipService.isAuthenticated$.next(false)
    this.router.navigate(['/login']);
  }
  toggleDarkMode(): void {
    this.themeService.darkMode = !this.darkMode;
  }
}
