import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  spinner : boolean = false;
  quienSoy : boolean = false;
  logueado : boolean = false;
  juegos : boolean = false;

  

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("usuarioLogueado") != null){//si hay usuario logueado en local storage
      this.juegos = true;
      this.logueado = true;
    }
  }

  confirmarLogueo ($event : boolean) {
    console.log ($event);
    this.logueado = $event;
    this.juegos = true;
  }

  activarSpinner( $event: boolean ) {
    this.spinner = $event;
  }

  mostrarQuienSoy() : void {
    this.juegos = false;
    this.quienSoy = true;

  }

  mostrarJuegos() : void {
    this.quienSoy = false;
    this.juegos = true;
  }




}
