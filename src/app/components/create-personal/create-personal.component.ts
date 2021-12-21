import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonalService } from 'src/app/services/personal.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-personal',
  templateUrl: './create-personal.component.html',
  styleUrls: ['./create-personal.component.css']
})
export class CreatePersonalComponent implements OnInit {

  createPersonal: FormGroup;
  submitted =  false;

  constructor(private fb: FormBuilder,   
             private _personalService : PersonalService,
             private router: Router,
             private toastr: ToastrService) {
    this.createPersonal = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      identificacion: ['', Validators.required],
      profesion: ['', Validators.required],
      salario: ['', Validators.required]
    }
     

    )
   }

  ngOnInit(): void {

   
  }

  agregarPersonal(){
    this.submitted = true;

    if(this.createPersonal.invalid)
    {
      return;
    }

    const personal: any ={
      nombres: this.createPersonal.value.nombres,
      apellidos: this.createPersonal.value.apellidos,
      identificacion: this.createPersonal.value.identificacion,
      profesion: this.createPersonal.value.profesion,
      salario: this.createPersonal.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()

    }

    this._personalService.agregarPersonal(personal).then(() =>{
     this.toastr.success('Empleado registrado con exito', 'Registro exitoso');
      this.router.navigate(['/list-personal'])
    }).catch (error =>{
      console.log(error);
    })
    
  }
}
