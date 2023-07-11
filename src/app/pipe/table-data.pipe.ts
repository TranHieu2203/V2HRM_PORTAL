import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableData'
})
export class TableDataPipe implements PipeTransform {

  transform(value: any, type: string | undefined): unknown {
    switch (type) {
      case 'string':
        return value;
      case 'number':
        return value;
      case 'date':
        if (!value) return value;
        if (typeof value === 'string') {
          return formatDate(new Date(value), 'dd/MM/yyyy', 'en-US');
        }
        if (typeof value.getMonth === 'function') {
          return formatDate(value, 'dd-MM-yyyy', 'en-US');
        }
        return value;
      case 'boolean':
        return value;
      default:
        return value;
    }
    
  }

}
