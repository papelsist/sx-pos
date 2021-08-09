import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MovimientosService } from "app/logistica/services/movimientos/movimientos.service";
import { Movimiento } from "app/logistica/models/movimiento";


@Component({
  selector: 'app-movimientos-create',
  templateUrl: './movimientos-create.component.html',
  styleUrls: ['./movimientos-create.component.scss']
})
export class MovimientosCreateComponent implements OnInit {

  constructor(
    private service: MovimientosService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  onSave(mov: Movimiento){
    console.log('Salvando mov: ', mov);
    this.service
    .save(mov)
    .subscribe(res => {
      this.router.navigate(['/logistica/inventarios/movimientos']);
    }, response => {
      console.log('Error salvando  ', mov);
    })
  }

}
