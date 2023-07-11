import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnDate'
})
export class VnDatePipe implements PipeTransform {

  transform(value: Date): string {

    let date: string | number = value.getDate();
    date = date < 10 ? '0' + date : date;
    let month: string | number = value.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    const year = value.getFullYear();

    const ret = `${date}/${month}/${year}`
    return ret;
  }

}
