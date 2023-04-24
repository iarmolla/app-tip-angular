import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  message: string = ''
  constructor(private tipServices: TipService, private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required]),
      password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/), Validators.required]),
    })
  }
  async ngOnInit() {

  }
  get f() { return this.registerForm.controls; }
  async onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).then((res: any) => {
        this.tipServices.signUp(this.registerForm.value).then(() => {
          this.message = ''
          this.router.navigate(['/login'])
        })
      }).catch((error: any) => {
        console.log(error)
        this.message = 'Ocurrio un error al registrarse'
      })
    }
  }


}
