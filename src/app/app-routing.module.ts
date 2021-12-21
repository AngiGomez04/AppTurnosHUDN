import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonalComponent } from './components/create-personal/create-personal.component';
import { ListPersonalComponent } from './components/list-personal/list-personal.component';


const routes: Routes = [
  {path: '', redirectTo: 'list-personal', pathMatch: 'full'},
  {path: 'create-personal', component: CreatePersonalComponent},
  {path: 'list-personal', component: ListPersonalComponent },
  {path: '**', redirectTo: 'list-personal', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
