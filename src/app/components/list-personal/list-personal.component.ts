import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-list-personal',
  templateUrl: './list-personal.component.html',
  styleUrls: ['./list-personal.component.css']
})
export class ListPersonalComponent implements OnInit {
  
  empleados: any[] =[];
  constructor(private _personalService: PersonalService,
    private toastr: ToastrService) {
  
   }

  ngOnInit(): void {
    this.getPersonal()
  }

  getPersonal(){
    this._personalService.getPersonal().subscribe(data => {
     this.empleados=[];
      data.forEach((element:any) => {

       // console.log(element.payload.doc.id);
       this.empleados.push ({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
       })
     });
       console.log(this.empleados);
    });

  }

  eliminarEmpleado(id: string){
    this._personalService.eliminarEmpleado(id).then(()=>{
      console.log('Empleado eliminado con exito');
      this.toastr.error('El empelado fue eliminado', 'Registro eliminado') 
    }).catch(error =>{
      console.log(error);
    })
  }
}
