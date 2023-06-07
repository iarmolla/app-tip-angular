import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPassword: string = ''
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = ''
  constructor(private tipServices: TipService, private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required]),
    })
  }
  get f() { return this.registerForm.controls; }
  async resetPassword() {
    try {
      if (this.registerForm.valid) {
        this.errorMessage = ''
        await this.authService.forgotPassword(this.f.email.value)
        this.forgotPassword = `Se acaba de enviar un correo electrónico con un código de verificación a ${this.f.email.value}`
        setTimeout(() => {
          this.router.navigate(['/login'])
        },4000)
      } else {
        this.errorMessage = 'Completar el campo email'
      }
    } catch {
      this.errorMessage = 'Algo salio mal espere unos minutos y vuelva a intentar'
    }
  }
}
