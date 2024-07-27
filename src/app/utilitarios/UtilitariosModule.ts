import { NgModule } from "@angular/core";
import { AEspacioPipe } from "./pipes/a-espacio.pipe";
import { CommonModule } from "@angular/common";
import { CalificacionComponent } from "./componentes/calificacion/calificacion.component";




@NgModule({
    declarations:[
        AEspacioPipe,
        CalificacionComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AEspacioPipe,
        CalificacionComponent
    ]
})
export class UtilitariosModule{

}