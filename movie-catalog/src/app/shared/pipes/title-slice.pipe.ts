import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSlice',
})
export class TitleSlicePipe implements PipeTransform {
  transform(title: string, maxLength = 15): string {
    if (!title) {
      return '';
    }
    if (title.length <= maxLength) {
      return title;
    }

    return title.slice(0, maxLength) + '...';
  }
}
