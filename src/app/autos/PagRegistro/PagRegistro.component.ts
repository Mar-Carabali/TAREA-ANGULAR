import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagRegistro',
  templateUrl: './PagRegistro.component.html',
  styleUrls: ['./PagRegistro.component.css']
})
export class PagRegistroComponent implements OnInit {


  formulario: FormGroup;
  constructor(
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder
  ) {
    
    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, validadorCodigo()]],
      "codigo_confirm": [],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required]],
      "precio": [],
      "calificacion": ['', [Validators.required]]

    },{
      validators: validarCodigoComparativo()
    }
    
    );

  }

  ngOnInit() {

  }

  guardar() {

    let vehiculo: Vehiculo = { ...this.formulario.value };
    
    if (this.formulario.valid) {
      this.vehiculoServicio.insertVehiculo(vehiculo).subscribe(
        respuesta=>{
          if(respuesta.codigo=="1"){
            Swal.fire({
              title: "Mensaje",
              text: "Se grabó con éxito!",
              icon: "info"
            }).then(()=>this.formulario.reset())}
          
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

export function validadorCodigo(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const codigoV = /^[A-Z]\d{4}$/;
    let value = control.value;
    if (codigoV.test(value)) {
      return null;
    }
    return { 'codigoValidate': true };
  }
}

export function validarCodigoComparativo() {
  return (formulario: FormGroup): ValidationErrors | null => {
    let valor = formulario.controls['codigo'].value;
    let valor2 = formulario.controls['codigo_confirm'].value;
    if (valor === valor2) {
      return null;
    }
    return { 'codigocomparativo': true };
  }

}