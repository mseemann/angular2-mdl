

export interface AnimationPlayer {
  onDone(fn: () => void): void;
  play(): void;
}

export class NativeWebAnimationPlayer implements AnimationPlayer {

  private onDoneCallback: (() => void )[] = [];

  constructor(private element: any,
              private keyframes: {[key: string]: string | number}[],
              private duration: number,
              private easing: string){}

  public onDone(fn: () => void) {
    this.onDoneCallback.push(fn);
  }

  public play() {

    let animation = this.element['animate'](
      this.keyframes,
      {duration: this.duration,
        easing: this.easing});

    animation.addEventListener('finish', () => this.onDoneCallback.forEach( fn => fn()));
  }
}

export abstract class Animations {
  abstract animate (
    element: any, keyframes: {[key: string]: string | number}[], duration: number,
    easing: string): AnimationPlayer;
}

export class NativeWebAnimations implements Animations {

  public animate (
    element: any, keyframes: {[key: string]: string | number}[], duration: number,
    easing: string): AnimationPlayer {
    return new NativeWebAnimationPlayer(element, keyframes, duration, easing);
  }
}

export class NoopWebAnimations implements Animations {

  public animate (
    element: any, keyframes: {[key: string]: string | number}[], duration: number,
    easing: string): AnimationPlayer {
      return {
        onDone: (fn:any) => {},
        play: () => {}
      }
  }
}
