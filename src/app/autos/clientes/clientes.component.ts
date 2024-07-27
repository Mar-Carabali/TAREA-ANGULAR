import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/Cliente.service';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clienteForm: FormGroup | any;
  quiereContacto: boolean = false;
  tituloPagina = "REGISTRO DEL CLIENTE";
  clientes: Cliente[] | any = [];

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      pass: ['', [Validators.required]],
      quiereContacto: [false],
      mail: [''],
      telefono: ['', [Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    console.log(this.quiereContacto);
    if (this.clienteForm.value) {
      console.log('invalid form');
      return;
    }
    console.log(this.clienteForm.value);
    const cliente = {
      nombre: this.clienteForm.nombre,
      apellido: this.clienteForm.apellido,
      pass: this.clienteForm.contraseña,
      mail: this.clienteForm.mail,
      telefono: this.clienteForm.telefono,
    };
  }
  ngOnInit(): void {
  }

  

  toggleContacto(): void {
    this.quiereContacto = !this.quiereContacto;
  }

  goInicio(): void {
    this._router.navigate(['/home']);
  }

  guardarCliente(): void {
    if (this.clienteForm.valid) {
      this.clienteService.crearCliente({ ...this.clienteForm.value }).subscribe(
        cliente => {
          if (cliente.codigo == '1') {
            Swal.fire({
              icon: 'success',
              title: 'Cliente creado',
              text: 'El cliente se ha creado correctamente.',
              confirmButtonText: 'OK'
            }).then(_res => {
              this.clienteForm.reset();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, completa correctamente el formulario antes de enviarlo.',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    }
  }
}