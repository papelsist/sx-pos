import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AnticiposService } from '../services/anticipos.service';
import { Cobro } from 'app/models/cobro';

@Injectable()
export class AnticipoResolver implements Resolve<Cobro> {
  constructor(private service: AnticiposService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Cobro> {
    const anticipo = this.service.get(route.paramMap.get('id'));
    return anticipo;
  }
}
