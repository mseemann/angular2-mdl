import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const flyInOutTrigger = trigger("flyInOut", [
  state("*", style({})),
  transition(":enter", [
    style({ transform: "translateX(-100%)" }),
    animate(300),
  ]),
  transition(":leave", animate(300, style({ transform: "translateX(100%)" }))),
]);
