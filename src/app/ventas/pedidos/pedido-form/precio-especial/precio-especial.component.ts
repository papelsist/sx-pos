import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sx-precio-especial',
  templateUrl: './precio-especial.component.html',
  styleUrls: ['./precio-especial.component.scss']
})
export class PrecioEspecialComponent implements OnInit {

  precio = 0.0;
  control: FormControl;

  constructor(
    public dialogRef: MdDialogRef<PrecioEspecialComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.precio = data.precio;
  }

  ngOnInit() {
    this.control = new FormControl(this.precio, [Validators.min(1)]);
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.control.valid) {
      this.dialogRef.close(this.control.value);
    }
  }

}
