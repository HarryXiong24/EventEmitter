import EventEmitter from '../src/EventEmitter';

const emitter = new EventEmitter();

const click = (eventName: string) => {
  alert(eventName + ' 触发了！');
};

const showMore = () => {
  alert('我是链式调用出来的！');
};

const showOnce = () => {
  alert('我是链式调用出来的！但我只会显示一次！');
};

emitter.on('event1', click);
emitter.on('event2', click).on('event2', showMore).once('event2', showOnce);

const emit1 = document.getElementById('emit1');
const emit2 = document.getElementById('emit2');
const remove1 = document.getElementById('remove1');
const remove2 = document.getElementById('remove2');
const clear = document.getElementById('clear');

emit1?.addEventListener('click', () => {
  emitter.emit('event1', 'event1');
});

remove1?.addEventListener('click', () => {
  emitter.off('event1');
  alert('event1 事件移除成功！');
});

emit2?.addEventListener('click', () => {
  emitter.emit('event2', 'event2');
});

remove2?.addEventListener('click', () => {
  emitter.off('event2');
  alert('event1 事件移除成功！');
});

clear?.addEventListener('click', () => {
  emitter.clear();
  alert('事件列表已全部清空！');
});

console.log(emitter.getEvents);
