import { Injectable } from "@angular/core";


@Injectable()
export class GenericService {
    
    constructor(){}

    public validarForcaSenha(senha): number{
        let forca = 0;

        if(senha.length > 0 && senha.length < 4) forca += 1;
        else if (senha.length >= 4) forca += 10;
        if(senha.math(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) forca += 10; // Letras Maiusculas e minusculas
        if(senha.math(/([0-9])/)) forca += 10; // Numeros
        if(senha.math(/\W/)) //Caracteres especiais
        if((senha.math(/([0-9])/)) && (senha.math(/\W/)) && (senha.math(/([A-Z])/)) && (senha.length >=7)) forca += 60;

        return forca;
    }
}