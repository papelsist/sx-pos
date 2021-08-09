import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {Authenticate} from '../models/user';

@Component({
  selector: 'sx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  subscription: Subscription;

  @Output() login = new EventEmitter<Authenticate>()

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required':      'Se requiere le nombre de usuario para accesar al sistema',
      'minlength':     'Longitud minima es de 4',
      'maxlength':     'Longitud maxima es de 30'
    },
    'password': {
      'required': 'Se requiere el password para accesar al sistema',
      'minlength':     'Longitud minima es de 4',
      'maxlength':     'Longitud maxima es de 30'
    }
  };


  constructor(private  fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(4)]]
    });
    this.subscription = this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  doLogin() {
    this.login.emit(this.loginForm.value);
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field of Object.keys(this.formErrors)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }



}
