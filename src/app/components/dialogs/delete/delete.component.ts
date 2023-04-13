import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  orders: any
  data: User
  constructor(public dialogRef: MatDialogRef<DeleteComponent>, private tipServices: TipService) {
    let data: any = dialogRef
    data = data._ref.config.data
    this.data = data.user
  }
  async deleteOrder() {
    await this.tipServices.deleteOrder(this.data)
  }
}
