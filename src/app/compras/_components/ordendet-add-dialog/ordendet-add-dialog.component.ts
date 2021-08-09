import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Proveedor } from '@siipapx/models';

@Component({
  selector: 'sx-ordendet-add-dialog',
  templateUrl: './ordendet-add-dialog.component.html',
  styleUrls: ['./ordendet-add-dialog.component.scss']
})
export class OrdendetAddDialogComponent implements OnInit {
  form: FormGroup;

  proveedor: Proveedor;

  selected: Array<string>;
  partida: any;

  constructor(
    public dialogRef: MdDialogRef<OrdendetAddDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.proveedor = data.proveedor;
    this.selected = data.selected;
    this.partida = data.partida;
  }

  ngOnInit() {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      solicitado: [0, [Validators.min(1), Validators.required]],
      comentario: ['', Validators.maxLength(100)]
    });
    if (this.partida) {
      this.form
        .get('producto')
        .setValue({
          proveedor: this.proveedor,
          producto: this.partida.producto
        });
      this.form.get('solicitado').setValue(this.partida.solicitado);
      this.form.get('comentario').setValue(this.partida.comentario);
    }
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const res = this.form.value;
      this.dialogRef.close(res);
    }
  }

  displayFn(provProd) {
    return provProd ? provProd.producto.clave : '';
  }
}
