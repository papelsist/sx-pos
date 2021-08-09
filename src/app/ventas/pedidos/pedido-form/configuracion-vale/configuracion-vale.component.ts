import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'sx-configuracion-vale',
  templateUrl: './configuracion-vale.component.html',
  styleUrls: ['./configuracion-vale.component.scss']
})
export class ConfiguracionValeComponent implements OnInit {

  @Input() parent: FormGroup;

  tipos =  ['SIN_VALE','ENVIA_SUCURSAL','RECOGE_CLIENTE','EXISTENCIA_VENTA','PASA_CAMIONETA'];

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  
  
  get disabled() {
    const partidas = this.parent.get('partidas').value;
    const found = partidas.find( item => item.conVale);
    return found === null;
  }
  

}
