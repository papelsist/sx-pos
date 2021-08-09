import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import {MdDialog} from '@angular/material';
import { SectoresService } from '@siipapx/logistica/services/sectores/sectores.service';
import { RecPorLineaComponent } from '@siipapx/logistica/_pages/almacen/reportes/rec-por-linea/rec-por-linea.component';
import { ConteosService } from '../../../services/conteos/conteos.service';


@Component({
  selector: 'sx-captura-mostrador-page',
  templateUrl: './captura-mostrador-page-component.html',
})
export class CapturaMostradorPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'captura', title: 'Captura de conteo', icon: 'swap_horiz'},
  ];

  reportes = [

  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SectoresService,
    private conteosService: ConteosService,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }



}
