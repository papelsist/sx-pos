import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Sucursal } from 'app/models/sucursal';
import { environment} from 'environments/environment';
import { ConfigService } from 'app/core/services/config.service';

@Component({
  selector: 'sx-almacenes-field',
  templateUrl: './almacenes-field.component.html',
  styleUrls: ['./almacenes-field.component.scss']
})
export class AlmacenesFieldComponent implements OnInit , OnDestroy {

  
  readonly endpoint = 'sucursales/otrosAlmacenes';

  private apiUrl

  @Input() parent: FormGroup;

  @Input() sucursalProperty = 'sucursal';

  @Input() placeholder = 'Almacén';

  sucursales: Sucursal[];

  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { 
    this.apiUrl = config.buildApiUrl(this.endpoint)
  }

  ngOnInit() {
    this.subscription = this.buscarSucursales()
    .subscribe( sucursales => this.sucursales = sucursales)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buscarSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.apiUrl)
  }

}




