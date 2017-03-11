
import { NoopWebAnimations } from './animations';
describe('Animations', () => {

  it('should  be safe to call the mock animations api', () => {

    let noopAnim = new NoopWebAnimations();

    let animation = noopAnim.animate(null, null, null, null);

    expect(animation).toBeDefined();

    // should not throw
    animation.onDone( () => {});

  });

});
