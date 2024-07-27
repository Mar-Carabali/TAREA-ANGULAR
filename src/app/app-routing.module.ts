import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAutosComponent } from './autos/lista-autos/lista-autos.component';
import { HomeComponent } from './autos/Home/Home.component';
import { PageNotFoundComponent } from './autos/PageNotFound/PageNotFound.component';
import { PagAutoComponent } from './autos/PagAuto/PagAuto.component';
import { PagRegistroComponent } from './autos/PagRegistro/PagRegistro.component';
import { ClientesComponent } from './autos/clientes/clientes.component';


const routes: Routes = [
  { 
    path: "home",
    component: HomeComponent
  },
  {
    path: "vehiculos",
    component: ListaAutosComponent
  },
  {
    path: "vehiculo",
    component: PagRegistroComponent,
  },
  { path: "clientes", 
  component: ClientesComponent
 },
  {
    path: "vehiculo/:codigo",
    component: PagAutoComponent
  },
  { 
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  { 
    path: "**",
    component: PageNotFoundComponent,
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
