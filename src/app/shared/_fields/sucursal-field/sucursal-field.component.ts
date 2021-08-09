import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Sucursal } from '../../../models/sucursal';
import { ConfigService } from 'app/core/services/config.service';

@Component({
  selector: 'sx-sucursal-field',
  templateUrl: './sucursal-field.component.html',
  styleUrls: ['./sucursal-field.component.scss']
})
export class SucursalFieldComponent implements OnInit, OnDestroy {

  // readonly apiUrl = environment.apiUrl + '/sucursales';
  apiUrl: string;

  @Input() parent: FormGroup;

  @Input() sucursalProperty = 'sucursal';

  @Input() placeholder = 'Sucursal';

  sucursales: Sucursal[];

  private subscription: Subscription;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('sucursales');
   }

  ngOnInit() {
    this.subscription = this.buscarSucursales()
    .subscribe( sucursales => this.sucursales = sucursales)

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  buscarSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.apiUrl,
      {params: new HttpParams().set('activas', 'activas')})
  }

}




