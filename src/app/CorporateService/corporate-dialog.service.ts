import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConnectionLostDialogComponent } from '../corporate-dialog/connection-lost-dialog/connection-lost-dialog.component';
import { CorporateDialogComponent } from '../corporate-dialog/corporate-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class CorporateDialogService {


  dialogRef: MatDialogRef<CorporateDialogComponent>;

  dialogConnRef: MatDialogRef<ConnectionLostDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options) {
    this.dialogRef = this.dialog.open(CorporateDialogComponent, {
      disableClose: true,
      id: options.id,
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        IsInstrucation: options.IsInstrucation
      }
    });
  }

  public confirmed(): Observable<any> {

    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }


  public OpenCloseConnection(options) {
  //  const matDialogRef = this.dialog.open(ConnectionLostDialogComponent);
    
this.dialog.closeAll();
  //  let dialogRef = this.dialog.open(ConnectionLostDialogComponent);
//dialogRef.close();
    this.dialogConnRef = this.dialog.open(ConnectionLostDialogComponent, {
      disableClose: true,
      data: {
        src: options.src,
        message: options.message,
        IsOkBtn : options.IsOkBtn
      }
    });


    
  }



}
