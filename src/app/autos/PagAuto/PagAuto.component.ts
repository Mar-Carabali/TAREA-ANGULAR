import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { ActivatedRoute, Router } from '@angular/router';

import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagAuto',
  templateUrl: './PagAuto.component.html',
  styleUrls: ['./PagAuto.component.css']
})
export class PagAutoComponent implements OnInit {
  vehiculo?: Vehiculo;
        formulario: FormGroup;
        constructor(private activatedRoute: ActivatedRoute,
        private vehiculoService: VehiculoService,
        private formBuilder: FormBuilder,
        private router: Router
        ) {
            this.formulario = this.formBuilder.group({
            "codigo": ['', Validators.required],
            "marca": ['', [Validators.required]],
            "modelo": ['', [Validators.required]],
            "anio": ['', [Validators.required]],
            "kilometraje": ['', [Validators.required]],
            "precio": [],
            "calificacion": ['', [Validators.required]]
        });
        this.formulario.controls["codigo"].disable();
        }
        ngOnInit() {
            this.activatedRoute.params.subscribe( params =>{
            this.vehiculoService.getVehiculo(params["codigo"]).subscribe( data => {
                if(data.codigo=='1'){
                  this.vehiculo = data.data;

                  this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
                  this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
                  this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
                  this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
                  this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
                  this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
                  this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
                  this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
                }
                else{
                  Swal.fire({
                    title: "Mensaje de Alerta",
                    text: "No se pudo cargar la información",
                    icon: "error"
                })
                }
                
            });

            })
        }

        guardar(){
          if (this.formulario.valid) {
            let vehiculoActualizar: Vehiculo = { ...this.formulario.getRawValue() };
            this.vehiculoService.actualizarVehiculo(vehiculoActualizar,vehiculoActualizar.codigo).subscribe(
              respuesta=>{
                if(respuesta.codigo=="1"){
                  Swal.fire({
                    title: "Mensaje",
                    text: "Se grabó con éxito!",
                    icon: "info"
                  }).then(()=>{
                    this.formulario.reset();
                    this.router.navigate(['/vehiculos']);
                  })
                }
                else{
                  Swal.fire({
                    title: "Mensaje",
                    text: "No se pudo registrar el vehículo: "+respuesta.mensaje,
                    icon: "error"
                  });
                }
              }
            )
            
          } else {
            Swal.fire({
              title: "Mensaje",
              text: "Te falta llenar campos",
              icon: "info"
            });
          }
        }

  
}
