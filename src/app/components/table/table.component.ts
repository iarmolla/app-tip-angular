import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  NgZone
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { TipService } from 'src/app/services/tip.service';
import { EditComponent } from '../dialogs/edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { Order } from 'src/app/interfaces/order';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'table-app',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<Order[]>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // dataObs$!: Observable<any>;
  dataObs$ = new BehaviorSubject<any>(false)

  constructor(private _changeDetectorRef: ChangeDetectorRef, private tipServices: TipService, public dialog: MatDialog, private ngZone: NgZone) { }
  async ngOnInit() {
    this.tipServices.miSubject.subscribe((data) => {
      console.log(data)
      this.setPagination(data);
    })
  }
  setPagination(tableData: any) {
    this.dataSource = new MatTableDataSource<any>(tableData);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
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
  addOrder(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
