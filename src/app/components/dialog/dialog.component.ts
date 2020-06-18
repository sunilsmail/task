import { Component, Inject } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  
  Currency: any[] = [
    {value: 'US', viewValue: 'US'},
    {value: 'UK', viewValue: 'UK'},
    {value: 'IND', viewValue: 'IND'}
  ];

  account: any[] = [
    {value: '001077019304', viewValue: '001077019304'},
    {value: '121077013404', viewValue: '121077013404'},
    {value: '331077019304', viewValue: '331077019304'}
  ];

  selectedValue= this.Currency[0].value;
  selectedAcc: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedAcc = data.acc;
  }

  onNoClick(from): void {
    if(from ===1){
      this.dialogRef.close(this.selectedAcc);
    }else{
      this.dialogRef.close(null);
    }
    
  }
}
