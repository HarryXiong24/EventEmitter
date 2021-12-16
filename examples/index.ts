import EventEmitter from '../src/EventEmitter';

const emitter = new EventEmitter();

const func1 = () => {};
const func2 = (a: number, b: number, c: number) => {
  console.log('func2', a, b, c);
};

emitter.on('num1', func1);

emitter.on('num2', () => {});
emitter
  .once('num2', func2)
  ?.on('num2', () => {})
  ?.once('num2', () => {})
  ?.on('num3', () => {});

emitter.offItem('num1', func1)?.off('num4')?.off('num3');

emitter.emit('num2', 1, 2, 3);

console.log(emitter.getEvents);

emitter.clear();
console.log(emitter.getEvents);
