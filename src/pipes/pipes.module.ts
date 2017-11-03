import { NgModule } from '@angular/core';
import { TimerFormatPipe } from './../pipes/timer-format/timer-format';
@NgModule({
	declarations: [TimerFormatPipe],
	imports: [],
	exports: [TimerFormatPipe]
})
export class PipesModule {}
