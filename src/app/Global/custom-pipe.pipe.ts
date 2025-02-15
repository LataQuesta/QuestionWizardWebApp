import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: string ): string {
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }

}
