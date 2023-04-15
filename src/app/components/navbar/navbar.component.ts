import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(private breakpointObserver: BreakpointObserver, private themeService: ThemeService, public dialog: MatDialog) {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .pipe(
        map(result => result.matches)
      );
    const email = window.localStorage.getItem('email')
    if (email != null) {
      this.username = email
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
  toggleDarkMode(): void {
    this.themeService.darkMode = !this.darkMode;
  }
}
