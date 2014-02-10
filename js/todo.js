/**
 * Creates a new to-do list
 * @constructor
 * @param items Array items to start with
 */
function ToDo() {
  this.items = JSON.parse(sessionStorage.getItem('toDoItems'));
}

/** handles serializing data to sessionStorage */
ToDo.prototype.save = function() {
  sessionStorage.setItem('toDoItems', JSON.stringify(this.items));
};

/** clears current DOM and re-renders */
ToDo.prototype.render = function() {
  var container = document.getElementsByClassName('app-container')[0],
      list = document.createElement('ul');

  // clear all
  container.innerHTML = '';

  for (var i in this.items) {
    var itemEl = document.createElement('li');

    itemEl.className = 'todo-item';
    if (this.items[i].isCompleted)
      itemEl.className += ' complete';

    itemEl.innerHTML = this.items[i].value;
    itemEl.setAttribute('data-id', this.items[i].id);
    list.appendChild(itemEl);
  }

  return container.appendChild(list); 
};

/**
 * @param {String} item value to give to-do item
 */
ToDo.prototype.addItem = function(itemValue) {
  var uid = Math.floor(Math.random() * 1000),
      newItem = {
    value: itemValue,
    isCompleted: false,
    id: uid 
  };

  this.items.push(newItem); 
  this.save();
  return this.render();
};

/**
 * @param {Number} uid id of item to be removed
 */
ToDo.prototype.removeItem = function(uid) {
  for (var i in this.items) {
    if (this.items[i].id === uid) {
      this.items.splice(i, 1);
      this.save();

      return this.render();
    }
  }
};

window.onload = function() {
  if (!sessionStorage.getItem('toDoItems')) {
    var exampleItems = [{
      value: 'example item',
      isCompleted: false,
      id: 0
    }];

    sessionStorage.setItem('toDoItems', JSON.stringify(exampleItems));
  }

  window.myToDo = new ToDo();
  window.myToDo.render();
};
