import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private firestore: AngularFirestore) {} 

    agregarPersonal(persona: any): Promise<any>
    {
      return this.firestore.collection('personal').add(persona);
    }
  
}
