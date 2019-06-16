import {Pipe, PipeTransform} from '@angular/core';
import matchSorter from 'match-sorter';

@Pipe({
  name: 'matchSorter',
})
export class MatchSorterPipe implements PipeTransform {
  transform(input: any[] = [], options: object | string, value: string): any {
    return matchSorter(
      input,
      value,
      typeof options === 'string' ? {keys: [options]} : options,
    );
  }
}
