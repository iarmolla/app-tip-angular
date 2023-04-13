import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private tipServices: TipService) {
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
    }
  }
}
