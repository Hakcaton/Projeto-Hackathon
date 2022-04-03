import { Injectable } from "@angular/core";


@Injectable()
export class GenericService {
    
    constructor(){}

    public validarForcaSenha(senha: string): number{
        let forca = 0;

        if(senha.length > 0 && senha.length < 4) forca += 1;
        else if (senha.length >= 4) forca += 10;
        if(senha.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) forca += 10; // Letras Maiusculas e minusculas
        if(senha.match(/([0-9])/)) forca += 10; // Numeros
        if(senha.match(/\W/)) //Caracteres especiais
        if((senha.match(/([0-9])/)) && (senha.match(/\W/)) && (senha.match(/([A-Z])/)) && (senha.length >=7)) forca += 60;

        return forca;
    }
}