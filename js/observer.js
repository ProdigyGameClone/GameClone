class EventObserver {  
  constructor() {
  	this.observers = [];
  }

  subscribe(fn) {
  	this.observers.push(fn);
  }

  broadcast(data) {
  	this.observers.forEach(subscriber => subscriber(data));
  }
}