import {Component, Input, OnInit, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {TdDialogService} from '@covalent/core';
import {ConfigService} from 'app/core/services/config.service';

import { User } from 'app/_auth/models/user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'sx-usuario-sec-field',
  template: `
  <md-form-field  class="fill">
    <input type="password" mdInput (keydown.enter)="search(input.value)"
      [placeholder]="placeholder" [disabled]="disabled" #input>
    <md-error>
      Usuario
    </md-error>
  </md-form-field>
   `,
  styles: ['.fill { width: 100%; }'],
})
export class UsuarioSecFieldComponent implements OnInit {

  @Input() placeholder = 'Usuario';

  @Input() disabled = false;

  @Output() usuarioFound = new EventEmitter<User>();

  private procesando = false;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  search(val) {
    // console.log('Localizando usuario: ', val);
    const url = this.config.buildApiUrl('security/users/findByNip/');
    const params = new HttpParams()
      .set('nip', val)
    return this.http.get<User>(url, {params: params})
      .finally( () => this.procesando = false)
      .subscribe( res => {
        //console.log('Found: ', res);
        this.usuarioFound.emit(res)
      }, error2 => this.handleError(error2))
  }


  handleError(error) {
    window.alert('Usuario no localizado');
    /*
    this._dialogService.openAlert({
      message: ' Usuario no localizado',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: 'Aviso',
      closeButton: 'Cerrar',
    });
    */
  }

}
