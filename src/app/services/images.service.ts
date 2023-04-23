import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  public image$ = new BehaviorSubject<any>("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

  constructor() { 
    const storedValue = window.localStorage.getItem('profilePicture');
    if (storedValue) {
      this.image$.next(storedValue);
    }
  }
}
