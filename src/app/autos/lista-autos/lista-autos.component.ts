import { Component, Input, OnInit } from "@angular/core"
import { VehiculoService } from "../../servicios/Vehiculo.service";

import Swal from "sweetalert2";

@Component({
    selector: "lista-autos",
    templateUrl: "./lista-autos.component.html" 
})
export class ListaAutosComponent implements OnInit{
   
    listavehiculo = "Lista de automóviles";
    
    muestraImagen: boolean =false;
    anchoimagen = 100;
    margenImagen = 3;
    public rows:number=10;
    public page:number=1;
    public filtro:string="";
    public pages:number=0;

   //@Input() valor: string = ' ';
   arregloAutos: Array <any> =[];
   constructor(
    private vehiculoService: VehiculoService,
    
   ){
    
   }
   ngOnInit() {
    this.consultaVehiculos();
  }
    toggleImage(): void {
        this.muestraImagen = !this.muestraImagen;
    }

   consultaVehiculos(){
    this.vehiculoService.getVehiculos(this.filtro,this.rows,this.page).subscribe(respuesta => {
      if(respuesta.codigo=="1"){
        this.arregloAutos=respuesta.data;
        this.pages=respuesta.pages;
        this.paginar(respuesta.pages)
      }
  });
    }

    siguiente(){
      if(this.page<this.pages){
        this.page++;
        this.consultaVehiculos();
      }
    }

    anterior(){
      if(this.page>this.pages){
        this.page++;
        this.consultaVehiculos();
      }
    }

    recepcion(dato:number){
      console.log('Dato:', dato)
    }

    cambiarPagina(pagina:number){
      this.page=pagina;
      this.consultaVehiculos();
    }

    listaPaginas:Array<number>=[];
    paginar(pages:number){
      this.listaPaginas=[];
      for(let i=1;i<=pages;i++){
        this.listaPaginas.push(i);
      }
    }

    eliminar(codigo:string){
      Swal.fire({
          title: "Estás seguro que deseas eliminar este registro?",
          showCancelButton: true,
          confirmButtonText: "Si",
          cancelButtonText: "No",
          icon: "question"
      }).then((res)=>{
          if(res.isConfirmed){
            this.vehiculoService.eliminarVehiculo(codigo).subscribe( data =>{
            if(data.codigo == '1'){
              this.consultaVehiculos();
              Swal.fire({
              title: "Mensaje",
              text: "vehiculo eliminado con Exito",
              icon: "success"
              });
            }
            else{
              Swal.fire({
                title: "Mensaje de Alerta",
                text: "No se pudo eliminar el vehículo",
                icon: "error"
            })
            }
          })}
        })
      }
    
    
  
}