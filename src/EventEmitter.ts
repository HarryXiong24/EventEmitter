export type ListenerFunc = (...args: any[]) => void;

export interface Listener {
  listener: ListenerFunc;
  once: boolean;
}

export interface Event {
  [propName: string]: Listener[];
}

/**
 * 判断是否为合法的 listener
 */
function isValidListener(listener: ListenerFunc) {
  if (typeof listener === 'function') {
    return true;
  } else {
    return false;
  }
}

/**
 * 根据 listener name 查找并返回对应的 listener
 */
function indexOfListener(listener_list: Listener[], listener: ListenerFunc): number {
  let result: number = -1;

  for (let i = 0; i < listener_list.length; i++) {
    if (listener_list[i].listener === listener) {
      result = i;
      break;
    }
  }

  return result;
}

export default class EventEmitter {
  // 存放所有的监听时间
  private _events: Event;

  constructor() {
    this._events = {};
  }

  /**
   * 查看所有事件
   * @return {Object} 返回所有的事件
   */
  get getEvents() {
    return this._events;
  }

  /**
   * 添加事件
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  on(eventName: string, listener: ListenerFunc) {
    if (!isValidListener(listener)) {
      throw new TypeError('Listener must be a function!');
    }

    const listeners = this._events[eventName] || [];

    // 不重复添加事件
    if (indexOfListener(listeners, listener) === -1) {
      listeners.push({
        listener: listener,
        once: false,
      });
    } else {
      throw new TypeError('Cannot add the same function repeatedly!');
    }

    // 将 listeners 数组归还到 this._events[eventName]
    this._events[eventName] = listeners;

    return this;
  }

  /**
   * 添加事件，该事件只能被执行一次
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  once(eventName: string, listener: ListenerFunc) {
    if (!isValidListener(listener)) {
      throw new TypeError('Listener must be a function!');
    }

    const listeners = this._events[eventName] || [];

    // 不重复添加事件
    if (indexOfListener(listeners, listener) === -1) {
      listeners.push({
        listener: listener,
        once: true,
      });
    } else {
      throw new TypeError('Cannot add the same function repeatedly!');
    }

    // 将 listeners 数组归还到 this._events[eventName]
    this._events[eventName] = listeners;

    return this;
  }

  /**
   * 删除某一个类型的所有事件或者所有事件
   * @param  {String[]} eventName 事件名称
   * @return {Object} 可链式调用
   */
  off(eventName: string) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return this;
    }

    Reflect.deleteProperty(this._events, eventName);

    return this;
  }

  /**
   * 删除指定的事件
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  offItem(eventName: string, listener: ListenerFunc) {
    if (!isValidListener(listener)) {
      throw new TypeError('Listener must be a function!');
    }

    const listeners = this._events[eventName];
    if (!listeners) {
      return this;
    }

    let index: number = indexOfListener(listeners, listener);

    if (index !== -1) {
      // 处理 listeners
      listeners.splice(index, 1);
    }

    return this;
  }

  /**
   * 触发事件
   * @param  {String} eventName 事件名称
   * @param  {Array} args 传入监听器函数的参数，使用逗号分隔形式依次传入
   * @return {Object} 可链式调用
   */
  emit(eventName: string, ...args: any) {
    const listeners = this._events[eventName];
    if (!listeners) {
      return this;
    }

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args);
        if (listener.once) {
          this.offItem(eventName, listener.listener);
        }
      }
    }
  }

  /**
   * 清空所有事件，重新初始化
   * @return {Object} 可链式调用
   */
  clear() {
    this._events = {};
    return this;
  }
}
