import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../utilitarios/modelos/Cliente';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Respuesta } from '../utilitarios/modelos/Vehiculo';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private http: HttpClient
  ) { }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 

  crearCliente(cliente:Cliente) {
    return this.http.post<Respuesta>(this.baseUrl+"cliente/",  cliente, this.httpOptions);
  }

 

}

export interface cliente {
  id: string;
  mensaje: string;
  data:Array<Cliente>|Cliente|any;
}