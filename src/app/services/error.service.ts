import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {}

    error(code: string): string
{
    switch(code)
    {
      

        //email registrado previamente
        case 'auth/email-already-in-use':
        return 'El correo electrónico ya se encuentra registrado'

        //email invalido
        case 'auth/invalid-email':
        return 'El correo electrónico es invalido'

         //contraseña débil
         case 'auth/weak-password':
          return 'La contraseña es débil'

          case 'auth/user-not-found':
            return 'Usuario inválido'

          case 'auth/wrong-password':
          return 'Contraseña equivocada'


          default:
        return 'Error desconocido';
    }
  }
  
  
}
