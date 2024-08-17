import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: number, digits: number = 2): string {
    if (isNaN(value)) return '';
    return value.toFixed(digits);
  }
}