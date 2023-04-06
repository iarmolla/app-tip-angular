import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipService } from 'src/app/services/tip.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  orderForm: FormGroup
  
  constructor(private tipServices: TipService) {
    this.orderForm = new FormGroup({
      orderNumber: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      amount: new FormControl('', [ Validators.pattern('^[0-9]+$'), Validators.required]),
      tip: new FormControl('', [ Validators.pattern('^[0-9]+$'), Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.orderForm.valid) {
      this.tipServices.addOrder(this.orderForm.value)
    }
  }
}
