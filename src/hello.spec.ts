import { Hello } from './hello';

describe('hello', () => {
  let hello: Hello;

  beforeEach(() => {
    hello = new Hello();
  });

  test('greetings', () => {
    expect(hello.getGreetings()).toBe('Greetings');
  });
});
