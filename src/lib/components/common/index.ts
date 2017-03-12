import { NgModule } from '@angular/core';
import { AppendViewContainerRefDirective } from './append-view-container-ref-directive';
import { Animations, NativeWebAnimations, NoopWebAnimations } from './animations';

function isWebAnimationsSupported() {
  return typeof Element !== 'undefined' && typeof(<any>Element).prototype['animate'] === 'function';
}

export function instantiateSupportedAnimationDriver() {
  /* istanbul ignore next */
  if (isWebAnimationsSupported()) {
    return new NativeWebAnimations();
  }
  /* istanbul ignore next */
  return new NoopWebAnimations();
}


@NgModule({
  imports: [],
  exports: [AppendViewContainerRefDirective],
  declarations: [AppendViewContainerRefDirective],
  providers: [
    {provide: Animations, useFactory: instantiateSupportedAnimationDriver}
  ]
})
export class MdlCommonsModule {}
