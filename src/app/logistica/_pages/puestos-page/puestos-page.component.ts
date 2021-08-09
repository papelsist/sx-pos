import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { Observable } from 'rxjs/Observable';

import { PuestosService } from '../../services/puestos.service';
import { VentaDet } from 'app/models';
import { Periodo } from 'app/models/periodo';


@Component({
  selector: 'sx-puestos-page',
  templateUrl: './puestos-page.component.html',
  styleUrls: ['./puestos-page.component.scss']
})
export class PuestosPageComponent implements OnInit {


  filtro: any = { periodo: Periodo.fromNow(3) };
  puestos: VentaDet[];
  term = '';
  procesando = false;

  constructor(
    private service: PuestosService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.procesando = true;
     this.service.list(this.term, this.filtro).subscribe(data =>{
       this.puestos=data;
       this.procesando=false;
      });
  }

  search(term){
    this.term = term;
    this.load();
  }

  handleError(err) {
    console.log(err);
    return Observable.empty();
  }

  cambiarPeriodo(periodo: Periodo) {
    this.filtro.periodo = periodo;
    this.load();
  }


}
