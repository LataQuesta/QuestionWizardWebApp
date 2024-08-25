import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-corporate-dialog',
  templateUrl: './corporate-dialog.component.html',
  styleUrls: ['./corporate-dialog.component.css']
})
export class CorporateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string,
    IsInstrucation:boolean
  }, private mdDialogRef: MatDialogRef<CorporateDialogComponent>,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
   // this.mdDialogRef.close(false);
  }
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }


}
