import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private firestore: AngularFirestore) {} 

    agregarPersonal(persona: any): Promise<any>
    {
      return this.firestore.collection('personal').add(persona);
    }
  
    getPersonal(): Observable<any>{
      return this.firestore.collection('personal', 
                                        ref => ref.orderBy ('fechaCreacion', 'desc') ).snapshotChanges();
    }

    eliminarEmpleado(id : string): Promise<any>
    {
      return this.firestore.collection('personal').doc(id).delete();
    }

    getEmpleado(id: string): Observable<any>
    {
      return this.firestore.collection('personal').doc(id).snapshotChanges();
        }

        actualizarEmpleado(id: string, data:any): Promise<any>{
          return this.firestore.collection('personal').doc(id).update(data)
        }
}
