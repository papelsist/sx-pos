import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit {

  // Esta variable se puede colocar en el store relacionado con contabilidad ui
  navigation = [
    {path: '', nombre: 'Inicio', descripcion: 'Inicio del sistema', icon: 'home'},
    {path: 'home', nombre: 'Dashboard', descripcion: 'Contabilidad main sashboard', icon: 'dashboard'},
    {path: 'clientes', nombre: 'Cuentas', descripcion: 'Clientes dashboard', icon: 'account_circle'},
    {path: 'campañas', nombre: 'Campañas', descripcion: 'Campañas y prompociones', icon: 'shopping_basket'},
    {path: 'lealtad', nombre: 'Programa de lealtad', descripcion: 'Programa de lealtad', icon: 'loyalty'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
