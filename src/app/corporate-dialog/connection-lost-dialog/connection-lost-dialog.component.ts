import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-connection-lost-dialog',
  templateUrl: './connection-lost-dialog.component.html',
  styleUrls: ['./connection-lost-dialog.component.css']
})
export class ConnectionLostDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    message: string,
    src :  string,
    IsOkBtn : boolean
  }, private mdDialogRef: MatDialogRef<ConnectionLostDialogComponent>) { }

  ngOnInit(): void {
  }
  public cancel() {
    this.mdDialogRef.close(false);
  }
}
