import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updatePassword } from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }
  logout() {
    return signOut(this.auth)
  }
  updatePassword(user: any, newPassword: any) {
    // console.log(user)
    // console.log(newPassword)
    // return updatePassword(user, newPassword)
    return updatePassword(user, newPassword)
  }
}
