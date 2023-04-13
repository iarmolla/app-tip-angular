import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipService } from 'src/app/services/tip.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  orderForm: FormGroup

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private tipService: TipService) {
    this.orderForm = new FormGroup({
      orderNumber: new FormControl('', [Validators.pattern('^[0-9]+$'), Validators.required]),
      address: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.pattern('^[0-9]+$'), Validators.required]),
      tip: new FormControl('', [Validators.pattern('^[0-9]+$'), Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.tipService.addOrder(this.orderForm.value)
      this.dialogRef.close();
    }
  }
}
