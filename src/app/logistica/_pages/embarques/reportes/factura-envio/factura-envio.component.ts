import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import { EmbarqueService } from '../../../../services/embarque/embarque.service';
import { Venta } from 'app/models';



@Component({
  selector: 'sx-factura-envio',
  templateUrl: './factura-envio.component.html',
  styleUrls: ['./factura-envio.component.scss']
})
export class FacturaEnvioComponent implements OnInit {

  form: FormGroup;
  loading = false;
  error: any;
  tipos = ['VENTA'];
  venta: Venta;

  constructor( public dialogRef: MdDialogRef<FacturaEnvioComponent>,
    private fb: FormBuilder, private service: EmbarqueService) { }

  ngOnInit() {
    this.form = this.fb.group({
      tipo: ['VENTA', Validators.required],
      documento: [null, Validators.required],
      fecha: [new Date(), Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.venta);
   
  }

  buscarDocumento() {
    const docto = this.form.value;
    //console.log("Buscando documento", this.form.value);
    if(Object.prototype.toString.call(docto.fecha) === '[object Date]'){
      // console.log('Tipo de fecha: ', typeof docto.fecha);
      // console.log('Fecha: ', date.toISOString())
      const date: Date = docto.fecha
      docto.fecha = date.toISOString();
    }
    this.buscar(docto);
  }

  buscar(docto) {
    console.log('Buscando documento: ', docto);
    if(this.form.valid) {
      this.loading = true;

     this.service.buscarVenta(this.service.sucursal.id, docto.tipo, docto.documento, docto.fecha)
      .delay(1000)
      .subscribe(
        venta => this.selectVenta(venta),
        response => this.handleError(response));  
    }
  }

  selectVenta(venta) {
    console.log('Envio selecionado: ', venta);
    this.venta = venta;
    this.error = null;
    this.loading = false;
  }

  handleError(response) {
    console.error('Error buscando documento ', response);
    if(response.status === 404) {
      this.error = 'Documento no localizada';
    } else if (response.message !== null) {
      this.error = response.message;
    }
    this.loading = false;
  }

}
