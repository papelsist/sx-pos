import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';

@Component({
  selector: 'sx-factura-search-dialog',
  templateUrl: './factura-search-dialog.component.html',
  styleUrls: ['./factura-search-dialog.component.scss']
})
export class FacturaSearchDialogComponent implements OnInit {

  form: FormGroup

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<FacturaSearchDialogComponent>,
    private fb: FormBuilder,
    private service: PedidosService
  ) { 
    
    this.form = fb.group({
      fecha: [new Date(), Validators.required],
      documento: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      ... this.form.value,
      fecha: fecha.toISOString().slice(0, 10),
    };
    this.dialogRef.close(res);
  }

}
