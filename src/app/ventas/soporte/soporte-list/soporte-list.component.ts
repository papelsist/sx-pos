import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import {MdDialog} from '@angular/material';
import { SoporteShowComponent } from '../soporte-show/soporte-show.component';

@Component({
  selector: 'sx-soporte-list',
  templateUrl: './soporte-list.component.html',
  styleUrls: ['./soporte-list.component.scss']
})
export class SoporteListComponent implements OnInit {

  @Input() solicitudes: any;

  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', width: 30 },
    { name: 'usuario', label: 'Solicita', width: 100 },
    { name: 'fecha', label: 'Fecha', width: 120 },
    { name: 'modulo', label: 'Modulo', width: 50 },
    { name: 'solicitud', label: 'Modificado', width: 100 },
    { name: 'autorizo', label: 'Autorizó', width: 100 },
    { name: 'comentarioAutorizacion', label: 'Com. Aut.', width: 400 },
    { name: 'atendio', label: 'Atendió', width: 100 },
    { name: 'comentarioAtencion', label: 'Com. Ate.', width: 100 },
    { name: 'estado', label: 'Estado', width: 120 },
  ]
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }
  showSolicitud(solicitud){
    const id = solicitud.id
    const dialogRef = this.dialog.open(SoporteShowComponent, {data: {solicitud}});
  }
}
