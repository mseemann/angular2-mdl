import {NoopWebAnimations} from './animations';

describe('Animations', () => {

  it('should  be safe to call the mock animations api', () => {

    const noopAnim = new NoopWebAnimations();

    const animation = noopAnim.animate();

    expect(animation).toBeDefined();

    // should not throw
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    animation.onDone(() => {
    });

  });

  it('should call the animation done callback even if there is no web animation polyfill', (done) => {

    const noopAnim = new NoopWebAnimations();

    const animation = noopAnim.animate();

    animation.onDone(() => {
      // test would timeout if the done callback isn#t called
      done();
    });

    animation.play();
  });

});
