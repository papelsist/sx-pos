import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ITdDataTableColumn } from '@covalent/core';
import { MdDialog } from '@angular/material';
import * as _ from 'lodash';

import { Existencia2Service } from 'app/logistica/services/existencias2.service';
import { Existencia } from 'app/models';
import { ExistenciaFormComponent } from '@siipapx/logistica/components/existencia-form/existencia-form.component';


@Component({
  selector: 'sx-existencia-edit',
  templateUrl: './existencia-edit.component.html',
  styles: []
})
export class ExistenciaEditComponent implements OnInit {

  existencia: Existencia

  existencias$: Observable<Existencia[]>;

  total = 0;

  columns: ITdDataTableColumn[] = [
    { name: 'sucursal.nombre', label: 'Sucursal'},
    { name: 'cantidad', label: 'Cantidad', width: 150},
    { name: 'recorte', label: 'Recorte', width: 150},
    { name: 'recorteComentario', label: 'Rec Com', width: 150},
    { name: 'disponible', label: 'Disponible', width: 150},
    { name: 'lastUpdated', label: 'Modificado'},
  ];

  constructor(
    private route: ActivatedRoute,
    private service: Existencia2Service,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    this.existencia = this.route.snapshot.data.existencia;
    this.existencias$ = this.service.buscarExistenciasRemotas(this.existencia)
    this.existencias$.subscribe( exis => {
      this.total = _.sumBy(exis, item => item.disponible);
    })
  }

  editRecorte(){
    const dialogRef = this.dialog.open(ExistenciaFormComponent, {
      data: {recorte: this.existencia.recorte, recorteComentaio: this.existencia.recorteComentario}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Salvando recorte: ', result);
        this.existencia.recorte = result.recorte
        this.existencia.recorteComentario = result.recorteComentario
        this.existencia.recorteFecha = new Date().toISOString()
        console.log('Salvando exis: ', this.existencia);
        this.service.update(this.existencia)
        .subscribe( res => {
          console.log('Exis acutalizada: ', res);
        }, err => console.log(err))
        
       
      }
    });
  }

}
