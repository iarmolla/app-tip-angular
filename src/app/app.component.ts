import { Component, OnInit } from '@angular/core';
import { TipService } from './services/tip.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tippit';
  isLoggedIn: boolean = false;
  /**
   *
   */
  constructor(private tipService: TipService, private router: Router) {
    this.tipService.isAuthenticated$.subscribe()
  }
  ngOnInit(): void {
    if (localStorage.getItem('auth') !== null) {
      this.isLoggedIn = true
    } else {
      this.tipService.isAuthenticated$.subscribe((data) => {
        this.isLoggedIn = data
        if (!this.isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    }
  }

}
