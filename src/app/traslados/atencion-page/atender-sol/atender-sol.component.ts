import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'sx-atender-sol',
  templateUrl: './atender-sol.component.html',
  styles: [`
  .atencion-dialog {
    min-height: 200px;
    width: 400px;
  }
  
  `]
})
export class AtenderSolComponent implements OnInit {

  form: FormGroup
  choferes: Array<any> = [];

  constructor(
    public dialogRef: MdDialogRef<AtenderSolComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.choferes = data.choferes;
  }

  ngOnInit() {
    this.form = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(100)]],
      chofer: [null, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
