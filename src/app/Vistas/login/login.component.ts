import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Log } from 'src/app/Entidades/registro';
import { Usuario } from 'src/app/Entidades/usuario';
import { Output, EventEmitter } from '@angular/core';
import { onLog } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorCorreo : boolean = false;
  errorClave : boolean = false;
  usuario : Usuario = new Usuario();
  listaUsuarios : Usuario[] = [];
  botonPresionado : boolean = false;
  logueado : boolean = false;

 

  @Output() eventoSpinner = new EventEmitter<boolean>();
  @Output() eventoLogueado = new EventEmitter<boolean>();

  constructor(
    private firebase : AngularFirestore
    ) { }

  ngOnInit(): void {
    if (localStorage.getItem("usuarioLogueado") != null){
      let usuarioJson = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
      this.usuario.correo = usuarioJson.correo;
      this.usuario.clave = usuarioJson.clave;
      this.logueado = true;
    }
  }
  
  enviarAvisoSpinner(value : boolean) {
    this.eventoSpinner.emit(value);
  }

  enviarAvisoLogueado (value : boolean){
    this.eventoLogueado.emit(value);
  }

  desloguearse() : void {
    this.logueado = false;
    localStorage.removeItem("usuarioLogueado");
    this.enviarAvisoLogueado(false);
  }

  loguearse() : void {
    this.botonPresionado = true;
    this.errorCorreo = false;
    this.errorClave = false;
    this.enviarAvisoSpinner(true);
    this.firebase.collection('usuarios').snapshotChanges().subscribe(doc => {
      this.enviarAvisoSpinner(false);
      this.listaUsuarios = [];
      doc.forEach((element: any) => {
        this.listaUsuarios.push(Usuario.toUsuario(element.payload.doc.data()));
      });
      if (this.botonPresionado){
        if (this.usuario.existeCorreo(this.listaUsuarios)){
          if (this.usuario.correspondeClave(this.listaUsuarios)){
            localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuario));
            let registro : Log = new Log(this.usuario.correo?.toString());
            this.firebase.collection('registros').add(Object.assign({}, registro));
            this.enviarAvisoLogueado(true);
            this.logueado = true;
            
          } else {
            this.errorClave = true;
          }
          
        } else {
          this.errorCorreo = true;
        }
      }
      this.botonPresionado = false;
      
    });
    
  }

  pruebaLogin1() : void {
    this.usuario.correo = "pedro@gmail.com";
    this.usuario.clave = "1234";
    this.loguearse();
  }

  pruebaLogin2() : void {
    this.usuario.correo = "pedro@gmail.com";
    this.usuario.clave = "123";
    this.loguearse();
  }

  pruebaLogin3() : void {
    this.usuario.correo = "petete@gmail.com";
    this.usuario.clave = "1234";
    this.loguearse();
  }

}
