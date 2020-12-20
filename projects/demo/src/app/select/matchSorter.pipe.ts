import {Pipe, PipeTransform} from '@angular/core';
import matchSorter from 'match-sorter';

@Pipe({
  name: 'matchSorter',
})
export class MatchSorterPipe implements PipeTransform {
  // eslint-disable-next-line
  transform(input: any[] = [], options: unknown | string, value: string): any {
    return matchSorter(
      input,
      value,
      typeof options === 'string' ? {keys: [options]} : options,
    );
  }
}
