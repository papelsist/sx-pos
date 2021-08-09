import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from 'app/core/services/config.service';

import * as _ from 'lodash';

@Component({
  selector: 'sx-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.scss']
})
export class DireccionFormComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;

  @Input() colonias: string[] = [];

  subscription: Subscription;
  apiUrl: string;

  url: string;

  constructor(private http: HttpClient,
    private configService: ConfigService) {
      this.apiUrl = `${configService.getApiUrl()}`
    }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  buscarDatos(event) {
   
    const zip = this.parent.get('codigoPostal').value;
    const params = new HttpParams().set('zip_code', zip);
    this.url=`${this.apiUrl}/embarques/codigos`
    this.http
      .get(this.url, {
        params: params
      }).subscribe(resultado =>{
        const estado: string =resultado['estado'];
        if (estado) {
          this.parent.get('estado').setValue(estado.toUpperCase());
        }
        const municipio: string= resultado['municipio'];
        if (municipio) {
          this.parent.get('municipio').setValue(municipio.toUpperCase());
        }
        const colonias =resultado['colonias'];
        this.colonias = colonias;
      });
  }

  buscarDatos1(event) {
    const zip = this.parent.get('codigoPostal').value;
    const params = new HttpParams().set('zip_code', zip);
    this.http
      .get('http://sepomex.icalialabs.com/api/v1/zip_codes', {
        params: params
      })
      .map((response: any) => response.zip_codes)
      .subscribe((registros: any[]) => {
        const estado: string = _.map(registros, item => item.d_estado)[0];
        const municipio: string = _.map(registros, item => item.d_mnpio)[0];
        if (estado) {
          this.parent.get('estado').setValue(estado.toUpperCase());
        }
        if (municipio) {
          this.parent.get('municipio').setValue(municipio.toUpperCase());
        }
        const colonias = _.map(registros, item => item.d_asenta.toUpperCase());
        this.colonias = colonias;
      });
  }

}
