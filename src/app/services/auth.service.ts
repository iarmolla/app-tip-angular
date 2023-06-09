import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updatePassword, sendPasswordResetEmail } from '@angular/fire/auth'

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
  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }
  async updatePassword(newPassword: string) {
    const currentUser = this.auth.currentUser
    console.log(currentUser);
    if (currentUser != null) {
      try {
        return await updatePassword(currentUser, newPassword)
      } catch {
        const error = 'Ocurrió un error al cambiar al actualizar la contraseña'
        return error
      }
    }
  }
}
