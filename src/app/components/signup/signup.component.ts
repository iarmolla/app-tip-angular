import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  registerForm: FormGroup;
  submitted = false;
  constructor(private tipServices: TipService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/), Validators.required]),
    })
  }
  async ngOnInit() {
    
  }
  get f() { return this.registerForm.controls; }
  async onSubmit() {
    this.submitted = true;
    // enviar a servicio
    if (this.registerForm.valid) {
      this.tipServices.signUp(this.registerForm.value)
    }
  }


}
