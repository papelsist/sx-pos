import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-selector-fecha',
  templateUrl: './selector-fecha.component.html',
  styleUrls: ['./selector-fecha.component.scss']
})
export class SelectorFechaComponent implements OnInit {

  control: FormControl;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<SelectorFechaComponent>,
  ) {
    this.control = new FormControl(data.fecha ? data.fecha : new Date());
   }

  ngOnInit() {
    
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  aceptar() {
    this.dialogRef.close(this.control.value);
  }

}
