import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public _darkMode = new BehaviorSubject<boolean>(false);

  get darkMode() {
    return this._darkMode.getValue();
  }

  set darkMode(value: boolean) {
    this._darkMode.next(value);
    const hostClass = value ? 'dark-theme' : 'light-theme';
    const body = document.querySelector('body');
    if (body) {
      body.classList.add(hostClass);
    }
  }
  
  constructor() { 
      this._darkMode.subscribe((value) => {
        console.log(value)
        const hostClass = value ? 'dark-theme' : 'light-theme';
        const body = document.querySelector('body');
        if (body) {
          body.classList.remove('dark-theme', 'light-theme');
          body.classList.add(hostClass);
        }
      });
    
  }
}
