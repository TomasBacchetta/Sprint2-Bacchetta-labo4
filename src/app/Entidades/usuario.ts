import { AngularFirestore } from "@angular/fire/compat/firestore";
import { setTokenAutoRefreshEnabled } from "@firebase/app-check";

export class Usuario {
    correo:string = "";
    clave:string = "";
    nombre:string = "";

   
  

    existeCorreo(listaUsuarios : Usuario[]):Boolean{
        let retorno:boolean = false;
        listaUsuarios.forEach(element =>{
            console.log(element.correo);
            console.log(this.correo);
            if (element.correo == this.correo){
                retorno = true;
            }
        })
        
        return retorno;
    }

    correspondeClave(listaUsuarios: Usuario[]):Boolean{
        let retorno:Boolean = false;
        listaUsuarios.forEach(element => {
            if (element.correo == this.correo){
                if (element.clave == this.clave){
                    retorno = true;
                }
            }
        } )
        return retorno;
    }

    equals(usuario: Usuario):boolean{
        return this.correo == usuario.correo;
    }

    static toUsuario(obj : any):Usuario{
        let nuevoUsuario = new Usuario();
        nuevoUsuario.correo = obj.correo;
        nuevoUsuario.clave = obj.clave;
        nuevoUsuario.nombre = obj.nombre;

        return nuevoUsuario;
    }


    validarCorreo()  : boolean {
        var  serchfind:boolean;

        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(this.correo);

        
        return serchfind;
        
    }

    validarNombre () : boolean {
        if (this.nombre == null ||
            this.nombre == '' ||
            this.nombre == ' ' ||
            this.nombre.length > 20){
                return false;
            }
        
        return true;
    }

    validarClave () : boolean {
        if (this.clave == null ||
            this.clave == '' ||
            this.clave == ' '){
                return false;
            }
            return true;
    }


   
}
