import { Component, OnInit, Input,Inject } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { VentaDet } from '@siipapx/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef,MD_DIALOG_DATA} from '@angular/material';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'sx-partidas-dialog',
  templateUrl: './partidas-dialog.component.html',
 
})
export class PartidasDialogComponent implements OnInit {

  partidas$: Observable<any>;

  pedido: any;

  partidasColumns: ITdDataTableColumn[] = [
    { name: 'noIdentificacion',  label: 'Clave', sortable: true, width: 30 },
    { name: 'descripcion', label: 'Producto', filter: true, width: 350 },
    { name: 'unidad', label: 'Unidad', filter: true, width: 20 },
    { name: 'cantidad', label: 'Cantidad', hidden: false, width: 70},
    { name: 'comentario', label: 'Comentario', hidden: false, width: 70},
    { name: 'instruccion', label: 'Corte', hidden: false, width: 70},
    
  ];
  form: FormGroup;
  loading = false;
  error: any;

  constructor( 
    public dialogRef: MdDialogRef<PartidasDialogComponent>,  
    @Inject(MD_DIALOG_DATA  ) public data: any,
    private service:PedidosService
  ) { 
  }

  ngOnInit() {

    this.pedido=this.data.pedido;
    
    this.partidas$ = this.service
    .getPartidas(this.data.pedido.id)
    .catch(err => Observable.of([]));
      
    this.partidas$.forEach(partida => console.log(partida));

    
  }

  close() {
    this.dialogRef.close();
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
