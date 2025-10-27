import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, maxLen = 120): string {
    if (!value) { return ''; }
    if (value.length <= maxLen) return value;
    return value.slice(0, maxLen).trim() + '…';
  }
}
