import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipService } from 'src/app/services/tip.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  email: string = ''
  isHandset$
  isLoggedIn: boolean = false;
  help: boolean = false
  img = '../../../assets/user.jpg'
  public darkMode = false;
  profilePicture: any;
  constructor(private authService: AuthService, private imageService: ImageService, private tipService: TipService, private breakpointObserver: BreakpointObserver, private themeService: ThemeService, public dialog: MatDialog, private router: Router) {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .pipe(
        map(result => result.matches)
      );
    const email = window.localStorage.getItem('email')
    if (email != null) {
      this.email = email
    }
  }
  ngOnInit() {
    const id = window.localStorage.getItem('auth')
    if (id) {
      this.tipService.getUserById(id).subscribe((user: any) => {
        this.profilePicture = user.profileImage || this.imageService.getImage
      })
    }
    this.themeService._darkMode.subscribe((value) => {
      this.darkMode = value;
    });
  }
  profile(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ProfileComponent, {
      width: '70%',
      height: '70vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  logout() {
    window.localStorage.clear()
    this.tipService.isAuthenticated$.next(false)
    this.authService.logout().then(() => {
      window.location.href = '/login'
    })
  }
  toggleDarkMode(): void {
    this.themeService.darkMode = !this.darkMode;
  }
}
