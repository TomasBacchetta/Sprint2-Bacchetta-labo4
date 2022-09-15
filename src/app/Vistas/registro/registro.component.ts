import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario = new Usuario();
  claveConfirmada : string = "";
  nombreInvalido : boolean = false;
  correoInvalido : boolean = false;
  claveInvalida : boolean = false;
  claveNoConcuerda : boolean = false;
  
  alerta : boolean = false;
  existeUsuario : boolean = false;

  spinner : boolean = false;

  constructor(private firebase : AngularFirestore) { }

  ngOnInit(): void {
  }

  cerrarAlerta() : void {
    this.alerta = false;
  }

  registrar() : void {
    let okRegistro = true;
    this.claveNoConcuerda = false;
    this.nombreInvalido = false;
    this.correoInvalido = false;
    this.claveInvalida = false;
    this.existeUsuario = false;
    

    if (this.usuario.clave != this.claveConfirmada){
      okRegistro = false;
      this.claveNoConcuerda = true;

    }

    if (!this.usuario.validarNombre()){
      okRegistro = false;
      this.nombreInvalido = true;
      

    } 

    if (!this.usuario.validarCorreo()){
      okRegistro = false;
      this.correoInvalido = true;

    }

    if (!this.usuario.validarClave()){
      okRegistro = false;
      this.claveInvalida = true;

    }

   
    let listaUsuarios : Usuario[] = [];
    this.spinner = true;
    this.firebase.collection('usuarios').snapshotChanges().subscribe(doc => {
      listaUsuarios = [];
      doc.forEach((element: any) => {
        listaUsuarios.push(Usuario.toUsuario(element.payload.doc.data()));
      });
      
      if (this.usuario.existeCorreo(listaUsuarios)){
        okRegistro = false;
        this.existeUsuario = true;
      }

      if (okRegistro){
        this.firebase.collection('usuarios').add(Object.assign({}, this.usuario));
        this.alerta = true;
        localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuario));
      }
      this.spinner = false;
    });
    
    
    
    
  }

}
