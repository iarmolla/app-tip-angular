import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/interfaces/order';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  data: Order
  orderForm: FormGroup
  constructor(public dialogRef: MatDialogRef<EditComponent>, private tipServices: TipService) {
    let data: any = dialogRef
    data = data._ref.config.data
    this.data = data.user
    this.orderForm = new FormGroup({
      orderNumber: new FormControl(this.data.orderNumber,Validators.required),
      address: new FormControl(this.data.address,Validators.required),
      amount: new FormControl(this.data.amount, [ Validators.pattern('^[0-9]+$'), Validators.required]),
      tip: new FormControl(this.data.tip, [ Validators.pattern('^[0-9]+$'), Validators.required]),
      paymentMethod: new FormControl(this.data.paymentMethod, [Validators.required]),
      date: new FormControl(this.data.date),
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async onSubmit() {
    const id = window.localStorage.getItem('auth')
    await this.tipServices.update(id, this.orderForm.value)
  }
}
