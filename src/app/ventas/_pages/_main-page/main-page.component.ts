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
    {path: 'home', nombre: 'Tablero', descripcion: 'Tablero de control ventas', icon: 'local_grocery_store'},
    {path: 'pedidos', nombre: 'Pedidos', descripcion: 'Alta y mantenimiento de pedidos', icon: 'shopping_basket'},
    // {path: 'solicitudes', nombre: 'Solicitud de deposito', descripcion: 'Solicitud de autorizacion de deposito', icon: 'verified_user'},
    {path: 'lealtad', nombre: 'Programa de lealtad', descripcion: 'Programa de lealtad', icon: 'loyalty'},
    {path: 'clientes', nombre: 'Clientes', descripcion: 'Catálogo de clientes', icon: 'account_circle'},
    {path: '/traslados', nombre: 'Traslados', descripcion: 'Traslados de mercancía', icon:  'local_shipping'},
  ];

  constructor() { }

  ngOnInit() {}

}
