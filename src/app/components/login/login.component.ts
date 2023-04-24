import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm: FormGroup;
  submitted = false;
  error: string = ''
  message: string = '';
  constructor(private tipServices: TipService, private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('',  [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),Validators.required]),
      password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/), Validators.required]),
    })
  }
  get f() { return this.registerForm.controls; }
  async onSubmit(): Promise<void> {
    this.submitted = true;
    if(this.registerForm.valid) {
      this.message = await this.tipServices.signIn(this.registerForm.value)
      this.authService.login(this.registerForm.value).then((res) => {
        this.message = ''
        this.router.navigate(['/'])
      }).catch((error) => {
        this.message = 'Ocurrio un error al iniciar sesión'
      })
    }
  }
  async loginWithGoogle() {
    // this.message = await this.tipServices.signIn(this.registerForm.value)
    this.authService.loginWithGoogle().then((res) => {
      console.log(res.user)
      this.message = ''
      this.tipServices.getUser(res.user).then(() => this.router.navigate(['/']))
    }).catch((error) => {
      this.message = 'Ocurrio un error al iniciar sesión con Google'
    })
  }
}
