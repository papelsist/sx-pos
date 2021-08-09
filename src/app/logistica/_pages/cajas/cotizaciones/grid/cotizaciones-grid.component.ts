import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CotizacionCaja } from '../../../../../models/cotizacionCaja';
import { CajasService } from '../../../../services/cajas/cajas.service';


@Component({
  selector: 'sx-cotizaciones-grid',
  templateUrl: './cotizaciones-grid.component.html',
  styleUrls: ['./cotizaciones-grid.component.scss']
})
export class CotizacionesGridComponent implements OnInit {

  @Input() cotizaciones: CotizacionCaja[] = [];

  @Output() print = new EventEmitter();

  @Output() load = new EventEmitter();

  constructor(
    private service: CajasService
  ) { }

  ngOnInit() {
  }

  cerrar(row) {
    const res = {row};
    this.service.cerrar(row).subscribe(producto => {
      this.load.emit();
    });
  }


}
