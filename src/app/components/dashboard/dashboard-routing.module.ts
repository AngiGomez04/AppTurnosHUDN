import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonalComponent } from '../create-personal/create-personal.component';
import { ListPersonalComponent } from '../list-personal/list-personal.component';

const routes: Routes = [
  {path: '', component: ListPersonalComponent },
  {path: 'create-personal', component: CreatePersonalComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
