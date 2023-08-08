import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import { Envio } from 'app/logistica/models/envio';

import { AuthService } from 'app/_auth/services/auth.service';
import { User } from '@siipapx/_auth/models/user';

@Component({
  selector: 'sx-transito-form',
  templateUrl: './transito-form.component.html',
  styleUrls: ['./transito-form.component.scss']
})
export class TransitoFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Output() save = new EventEmitter<any>();

  @Input() embarque: Embarque;

  @Input() readonly = false;

  @Output() print = new EventEmitter<Embarque>();

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.embarque && !changes.embarque.isFirstChange()) {
      const embarque: Embarque = changes.embarque.currentValue;
      this.form.patchValue(embarque);
      embarque.partidas.forEach(item => {
        this.agregarEnvio(item);
      });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [null, Validators.required],
      fecha: [new Date(), Validators.required],
      chofer: [null, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      partidas: this.fb.array([])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    /** Ajusta las fechas al formato adecuado ISO */
    const partidas = this.partidas.value.forEach(item => {
      if (item.arribo) {
        item.arribo = moment(item.arribo).toISOString();
      }
      if (item.recepcion) {
        item.recepcion = moment(item.recepcion).toISOString();
      }
    });
    /*** End fix */
    return {
      ...this.form.getRawValue()
    };
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onDelete(index: number) {
    this.partidas.removeAt(index);
  }

  onArribo(index: number) {
    const envio = this.partidas.at(index).value;
    envio.arribo = new Date().toISOString();
    this.cd.detectChanges();
  }

  onCompleto(index: number) {
    const auth = this.authService.getAuthentication()
    const envio = this.partidas.at(index).value;
    envio.completo = true
    envio.reportoNombre = auth.username
    this.cd.detectChanges();
  }

  onRecepcion(index: number) {
    const envio = this.partidas.at(index).value;
    // envio.recepcion = new Date().toISOString()

    this.cd.detectChanges();
    const dialogRef = this._dialogService.openPrompt({
      message: 'Nombre:',
      title: 'Receptor del material',
      value: '',
      viewContainerRef: this._viewContainerRef,
      acceptButton: 'Aceptar',
      cancelButton: 'Cancelar'
    });

    dialogRef
      .afterClosed()
      .delay(500)
      .subscribe(
        (message: string) => {
          envio.recepcion = new Date().toISOString();
          envio.recibio = message;
          this.cd.detectChanges();
          console.log('Registrando recepcion de envio: ', envio);
          console.log(message);
        },
        () => {},
        () => this.cd.detectChanges()
      );
  }

  agregarEnvio(envio: Envio) {
    this.partidas.push(new FormControl(envio));
    this.cd.detectChanges();
  }

  get title() {
    return ' Mantenimiento de embarque en transito';
  }

  get id() {
    return this.form.get('id').value;
  }

  get fecha() {
    return this.form.get('fecha').value;
  }

  onPrint() {
    this.print.emit(this.embarque);
  }
}
