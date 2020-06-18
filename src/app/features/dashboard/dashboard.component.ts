import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  title = 'task';

  model = {
    createdDate: '11/26/2018',
    accountNumber: '001077019304',
    chargeDate: '1 of the month ',
    status: 'Montly Charge',
    invAmount: '30,000',
    aInvMoney: '5,000',
    marketVal: '4,718',
  };
  isAdmin = false;
  constructor(public dialog: MatDialog, public loginService: AuthenticationService) {}

  ngOnInit() {
   
  }

  open() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      data: { acc: this.model.accountNumber },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.model.accountNumber = result;
      }     
    });
  }
}
