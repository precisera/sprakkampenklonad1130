import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimerFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timerFormat',
})
export class TimerFormatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
	transform(value: number): string {
		const minutes: any = ('0'+ Math.floor(value/60)).slice(-1);
		return minutes + ':' + ('00'+Math.floor(value-minutes * 60)).slice(-2);
	}
}
