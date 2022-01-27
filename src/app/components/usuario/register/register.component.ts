import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, FormControl, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { group } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private router: Router,
              private toastr: ToastrService,
              private _errorService: ErrorService) { 
    this.registerForm = this.fb.group ({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      repetirPassword : ['', Validators.required]
     
    }, {validator: this.checkPassword})
    
    
  }

  ngOnInit(): void {
  }

  register()
  {
    
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;
    

    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(usuario,password).then(rta => {
     rta.user?.sendEmailVerification();


      this.toastr.success('Se ha enviado un correo de verificación', 'Registro exitoso');
      this.router.navigate(['/usuario'])
    }).catch(error =>
      {
        this.registerForm.reset();
        console.log(error);
        this.loading = false;
        this.toastr.error(this._errorService.error(error.code), 'Error');
      })
   
  }

/**
 * error(code: string): string
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

          default:
        return 'Error desconocido';
    }
}
 * 
 */


  checkPassword(group: FormGroup): any {

    
      const pass= group.controls["password"]?.value;
      const confirmarPassword = group.controls["repetirPassword"]?.value;

      return pass === confirmarPassword
    ? null
    : { notSame: true }

  }
}
