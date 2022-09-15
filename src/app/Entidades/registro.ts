
export class Log {
    fecha : string;
    correo : string;
    

    constructor(correo : string){
        this.fecha = Date.now().toString();
        this.correo = correo;
       

    }
}
