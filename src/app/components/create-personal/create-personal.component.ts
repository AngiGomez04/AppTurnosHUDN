import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading = false;
  id: string | null;
  titulo = 'Agregar empleado';

  constructor(private fb: FormBuilder,   
             private _personalService : PersonalService,
             private router: Router,
             private toastr: ToastrService,
             private aRoute: ActivatedRoute) {
    this.createPersonal = this.fb.group({
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      profesion: ['', Validators.required],
      contrato: ['', Validators.required],
      servicio: ['', Validators.required],
      salario: ['', Validators.required]
     
    }
)

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {

    this.esEditar();
  }


  agregarPersonal(){
    this.submitted = true;
    
    if(this.createPersonal.invalid)
    {
      return;
    }

    if(this.id === null)
    {
      this. titulo;
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
   
  }

  agregarEmpleado()
  {
    
    const personal: any ={
      identificacion: this.createPersonal.value.identificacion,
      nombres: this.createPersonal.value.nombres,
      apellidos: this.createPersonal.value.apellidos,
      profesion: this.createPersonal.value.profesion,
      contrato: this.createPersonal.value.contrato,
      servicio: this.createPersonal.value.servicio,
      salario: this.createPersonal.value.salario,
      
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()

    }
    
    this.loading=true;
    this._personalService.agregarPersonal(personal).then(() =>{
     this.toastr.success('Empleado registrado con exito', 'Registro exitoso');
      this.loading =false;
      this.router.navigate(['/dashboard']);
    }).catch (error =>{
      console.log(error);
      this.loading =false;
    })
    
    
  }

  editarEmpleado(id: string){

    const personal: any ={
      identificacion: this.createPersonal.value.identificacion,
      nombres: this.createPersonal.value.nombres,
      apellidos: this.createPersonal.value.apellidos,
      profesion: this.createPersonal.value.profesion,
      contrato: this.createPersonal.value.contrato,
      servicio: this.createPersonal.value.servicio,
      salario: this.createPersonal.value.salario,
      fechaActualizacion: new Date()

  }
  this.loading=true;

  this._personalService.actualizarEmpleado(id, personal).then(()=>
  {
      this.loading=false;
      this.toastr.info('El empleado fue modificado', 'Información actualizada');
      this.router.navigate(['/dashboard']);
  });
  
}

  esEditar()
  {
    this.titulo = 'Editar persona';
    if(this.id !== null)
    {
      this.loading= true;
      this._personalService.getEmpleado(this.id).subscribe(data =>
        {
          this.loading= false;
          console.log(data.payload.data()['nombres']);
          this.createPersonal.setValue({
            identificacion: data.payload.data()['identificacion'],
            nombres: data.payload.data()['nombres'],
            apellidos: data.payload.data()['apellidos'],
            contrato: data.payload.data()['contrato'],
            servicio: data.payload.data()['servicio'],
            profesion: data.payload.data()['profesion'],
            salario: data.payload.data()['salario'],
            

          })
        });
    }
  }
  
}


