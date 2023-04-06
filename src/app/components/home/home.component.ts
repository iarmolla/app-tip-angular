import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TipService } from 'src/app/services/tip.service';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['address','amount','orderNumber','paymentMethod','tip','date','actions-'];
  dataSource:any
  /**
   *
   */
  constructor(private tipServices: TipService, public dialog: MatDialog) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, user: User): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        user
      }
    });

  }
  ngOnInit(): void {
    this.tipServices.getOrders().subscribe((data: any) => {
      console.log(data)
      this.dataSource = data
      this.dataSource = this.dataSource[0]?.orders
    })
  }
  delete(any: any) {
    console.log(any)
  }
}
