import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TipService } from 'src/app/services/tip.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/interfaces/order';
import { DeleteComponent } from 'src/app/components/dialogs/delete/delete.component';
import { EditComponent } from 'src/app/components/dialogs/edit/edit.component';
import { RegisterComponent } from 'src/app/components/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  query: any = ''
  lado: string = ''
  message: string = ''
  displayedColumns: string[] = ['address', 'amount', 'orderNumber', 'paymentMethod', 'tip', 'date', 'actions-'];
  dataSource = new MatTableDataSource<Order>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private tipServices: TipService, public dialog: MatDialog) {
    this.tipServices.getOrders().subscribe((data: any) => {
      this.dataSource.data = data.orders;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, user: any): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        user
      }
    });
  }
  edit(enterAnimationDuration: string, exitAnimationDuration: string, user: any): void {
    this.dialog.open(EditComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        user
      }
    });
  }
  addOrder(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  async search() {
    const data = this.dataSource.data
    const res = await this.tipServices.search(this.query, data)
    if (res.message != '') {
      this.message = res.message
    } else {
      this.tipServices.miSubject.next(res.data)
      this.dataSource.data = res.data
      this.message = ''
    }
  }
}
