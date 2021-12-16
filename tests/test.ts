import { EventEmitter } from './easy-version';

let myEvent = new EventEmitter();

myEvent.addListener('logA', () => {
  console.log('A');
});
myEvent.emit('logA');

myEvent.addListener('logB', () => {
  console.log('B');
});
myEvent.emit('logB');

console.log(myEvent._events);
console.log(myEvent._count);

myEvent.removeListener('logB', () => {
  console.log('Remove succeed!');
});
myEvent.removeListener('logC', () => {
  console.log('Remove succeed!');
});

console.log(myEvent._events);
console.log(myEvent._count);
