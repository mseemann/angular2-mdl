
import { NoopWebAnimations } from './animations';
describe('Animations', () => {

  it('should  be safe to call the mock animations api', () => {

    let noopAnim = new NoopWebAnimations();

    let animation = noopAnim.animate(null, null, null, null);

    expect(animation).toBeDefined();

    // should not throw
    animation.onDone( () => {});

  });

  it('should call the animation done callback even if there is no web animation polyfill', (done) => {

    let noopAnim = new NoopWebAnimations();

    let animation = noopAnim.animate(null, null, null, null);

    animation.onDone( () => {
      // test would timeout if the done callback isn#t called
      done();
    });

    animation.play();
  });

});
