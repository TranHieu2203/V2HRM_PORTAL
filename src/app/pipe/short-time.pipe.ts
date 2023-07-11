import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime'
})
export class ShortTimePipe implements PipeTransform {

  transform(value: Date): string {

    let hours: string | number = value.getHours();
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;
    const surfix = hours > 12 ? "PM" : "AM";
    let minutes: string | number = value.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const ret = `${hours}:${minutes} ${surfix}`
    return ret;
  }

}
