import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Existencia } from "app/models";
import { Existencia2Service } from "@siipapx/logistica/services/existencias2.service";


@Injectable()
export class ExistenciaResolve implements Resolve<Existencia> {

  constructor(private service: Existencia2Service){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Existencia>  {
    return this.service.get(route.paramMap.get('id'));
  }
}