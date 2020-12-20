export interface AnimationPlayer {
  onDone(fn: () => void): void;

  play(): void;
}

export class NativeWebAnimationPlayer implements AnimationPlayer {

  private onDoneCallback: (() => void)[] = [];

  constructor(private element: HTMLElement,
              private keyframes: { [key: string]: string | number }[],
              private duration: number,
              private easing: string) {
  }

  onDone(fn: () => void): void {
    this.onDoneCallback.push(fn);
  }

  play(): void {

    const animation = this.element.animate(
      this.keyframes,
      {
        duration: this.duration,
        easing: this.easing,
        fill: 'forwards'
      });

    animation.addEventListener('finish', () => this.onDoneCallback.forEach(fn => fn()));
  }
}

export class NoopAnimationPlayer implements AnimationPlayer {

  private onDoneCallback: (() => void)[] = [];

  onDone(fn: () => void): void {
    this.onDoneCallback.push(fn);
  }

  play(): void {
    this.onDoneCallback.forEach(fn => fn());
  }
}

export abstract class Animations {
  abstract animate(
    element: HTMLElement, keyframes: { [key: string]: string | number }[], duration: number,
    easing: string): AnimationPlayer;
}

export class NativeWebAnimations implements Animations {

  public animate(
    element: HTMLElement, keyframes: { [key: string]: string | number }[], duration: number,
    easing: string): AnimationPlayer {
    return new NativeWebAnimationPlayer(element, keyframes, duration, easing);
  }
}

export class NoopWebAnimations implements Animations {

  public animate(): AnimationPlayer {
    return new NoopAnimationPlayer();
  }
}
