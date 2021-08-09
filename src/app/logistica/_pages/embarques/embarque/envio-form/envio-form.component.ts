import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
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
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import { PartidasEnvioDialogComponent } from './selector/partidas-envio-dialog.component';
import { Envio } from 'app/logistica/models/envio';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-envio-form',
  templateUrl: './envio-form.component.html',
  styleUrls: ['./envio-form.component.scss']
})
export class EnvioFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Output() save = new EventEmitter<any>();

  @Input() embarque: Embarque;

  @Input() readonly = false;

  @Output() print = new EventEmitter<Embarque>();

  @Output() deleteEnvio = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.embarque && !changes.embarque.isFirstChange()) {
      const embarque: Embarque = changes.embarque.currentValue;
      this.form.patchValue(embarque);
      embarque.partidas.forEach(item => this.agregarEnvio(item));
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
    return {
      ...this.form.getRawValue()
    };
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onDelete(index) {
    // this.partidas.removeAt(index);
    this.dialogService
      .openConfirm({
        title: 'Quitar partida',
        message: 'Quitar la partida del embarque?',
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          // const item = this.partidas.controls[index].value;
          // this.deleteEnvio.emit(item);
          this.partidas.removeAt(index);
        }
      });
  }

  insertar() {
    let dialogRef = this.dialog.open(PartidasEnvioDialogComponent, {
      data: { embarque: this.embarque }
    });
    dialogRef.afterClosed().subscribe(envio => {
      if (envio) {
        console.log('Agregando:....', envio);
        this.agregarEnvio(envio);
      }
    });
  }

  agregarEnvio(envio: Envio) {
    this.partidas.push(new FormControl(envio));
    this.cd.detectChanges();
  }

  // editarPartida($event) {
  //   const {row, cantidad} = $event;
  //   this.partidas.controls[row].patchValue({cantidad: cantidad});
  // }

  // onDelete(index: number) {
  //   this.removePartida(index);
  //   this.cd.detectChanges();
  // }

  get title() {
    return ' Mantenimiento de embarque';
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
