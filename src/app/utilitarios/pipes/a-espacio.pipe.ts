import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aEspacio'
})
export class AEspacioPipe implements PipeTransform {

  transform(valorInicial: string, aBuscar : string): unknown {
    const reemplazar = " ";
    return valorInicial.replace(aBuscar, reemplazar);
    
  }

}
