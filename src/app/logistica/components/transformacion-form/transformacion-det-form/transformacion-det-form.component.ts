import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'sx-transformacion-det-form',
  templateUrl: './transformacion-det-form.component.html',
  styleUrls: ['./transformacion-det-form.component.scss']
})
export class TransformacionDetFormComponent implements OnInit {

  form: FormGroup;
  @Output() insert = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.form = this.fb.group({
      origen:[null, Validators.required],
      existenciaOrigen: [{value: 0, disabled: true}, [Validators.required, Validators.min(1)]],
      salen: [0, [Validators.required, Validators.min(1)]],
      destino: [null, Validators.required],
      entran: [0, [Validators.required, Validators.min(1)]],
      comentario: ['', Validators.maxLength(100)]
    })
  }

  onInsert() {
    if(this.form.valid) {
      this.insert.emit(this.form.getRawValue());
    }
  }

}
