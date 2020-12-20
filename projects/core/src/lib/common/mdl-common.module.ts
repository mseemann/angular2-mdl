import { NgModule } from "@angular/core";
import { AppendViewContainerRefDirective } from "./append-view-container-ref-directive";
import {
  Animations,
  NativeWebAnimations,
  NoopWebAnimations,
} from "./animations";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function isWebAnimationsSupported() {
  return (
    typeof Element !== "undefined" &&
    typeof Element.prototype.animate === "function"
  );
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function instantiateSupportedAnimationDriver(): Animations {
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
    { provide: Animations, useFactory: instantiateSupportedAnimationDriver },
  ],
})
export class MdlCommonsModule {}

export * from "./animations";
export * from "./boolean-property";
export * from "./mdl-error";
export * from "./append-view-container-ref-directive";
export * from "./native-support";
export * from "./noop";
export * from "./number.property";
