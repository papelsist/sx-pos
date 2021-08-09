import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Transformacion } from "app/logistica/models/transformacion";
import { TransformacionesService } from "app/logistica/services/transformaciones/transformaciones.service";
import { ITdDataTableColumn } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;

@Component({
  selector: 'sx-transformaciones-edit-page',
  template: `
    <div layout>
      <ng-container *ngIf="transformacion$ | async; let trs">
        <md-card class="will-load">
          <md-card-title-group>
            <md-card-title>Transformacion {{ trs.tipo }} - {{trs.documento}} Fecha: {{trs.fecha | date: 'dd/MM/yyyy'}}</md-card-title>
            <md-card-subtitle>{{trs.comentario}}</md-card-subtitle>
          </md-card-title-group>
          <md-divider></md-divider>
          <md-card-content>
            <td-data-table [data]="trs.partidas" [columns]="columns">
            </td-data-table>
          </md-card-content>
          <md-card-actions>
            <a md-button [routerLink]="['../../']" ><md-icon>keyboard_backspace</md-icon> Regresar </a>
            <button md-icon-button mdTooltip="Imprimir documento"><md-icon>print</md-icon></button>
          </md-card-actions>
        </md-card>
      </ng-container>
    </div>
    
  `
})
export class TransformacionesEditPageComponent implements OnInit {

  transformacion$: Observable<Transformacion>;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 300 },
    { name: 'producto.descripcion', label: 'Descripcion', width: { min: 300, max: 450 }},
    { name: 'cantidad', label: 'Cantidad', numeric: true, format: DECIMAL_FORMAT},
    { name: 'cortes', label: 'Cortes', numeric: true, format: NUMBER_FORMAT},
    { name: 'cortesInstruccion', label: 'Instrucción'},
    { name: 'comentario', label: 'Comentario'}
  ];

  constructor(
    private service: TransformacionesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit() {
    this.transformacion$ = this.route.paramMap
      .map( params => params.get('id'))
      .switchMap( id => this.service.get(id));
  }

  onSave(transformacion: Transformacion){
    
  }

  onCancel() {
    this.router.navigate(['../'])
  }

}
