const dropableArea = document.querySelectorAll('.js-droppable-wrapper')
const addItem = document.querySelectorAll('.js-add-item');
const inputValue = document.querySelectorAll('.js-input-value');

// let wrapperIndex = 0;
let dataIndex = 0;
let draggedItem = null;
let dragStartIndex;
// let columnDragging = true;

function dragStart() {
  // for some reason div is empty after drop inside columns
  // div is no more contained paragraph inside ???????
  dragStartIndex = +this.closest('div').dataset.number;
  console.log(dragStartIndex);
  console.log('radi drag start unutar kolone');
}

function dragEnd() {
  console.log('radi drag end unutar kolone');
}

function dragEnter(e) {
  e.preventDefault();
  console.log('moze da se predje preko diva u koloni');
}

function dragLeave() {
  console.log('moze da se izadje iz diva u koloni');
}

function dragOver(e) {
  e.preventDefault();
  // console.log('dragstart');
}

function swapPlaces(fromIndex, toIndex) {
  let arr = Array.from(document.querySelectorAll('.draggable'));
  console.log(arr);
  const itemOne = arr[fromIndex - 1];
  const itemTwo = arr[toIndex - 1];
  console.log(itemOne, itemTwo);

  arr[fromIndex - 1].insertAdjacentElement(itemTwo);
  arr[toIndex - 1].appendChild(itemOne);
}

function drop() {
  const dragEndIndex = +this.dataset.number;
  console.log(dragEndIndex);
  swapPlaces(dragStartIndex, dragEndIndex);

}

// FUNCTIONALITY OF DRAG N DROP INSIDE OF THE COLUMNS
function dragNDropInsideColumns() {
  const items = document.querySelectorAll('.items');
  const draggables = document.querySelectorAll('.draggable');

  items.forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
  })

  draggables.forEach(draggable => {
    // draggable.setAttribute('draggable', false);
    draggable.addEventListener('dragenter', dragEnter);
    draggable.addEventListener('dragleave', dragLeave);
    draggable.addEventListener('dragover', dragOver);
    draggable.addEventListener('drop', drop);
  });
};


// FUNCTIONALTY TO DRAG N DROP BETWEEN COLUMNS
function dragNDropBetweenColumns() {
  let allItems = document.querySelectorAll('.items');

  allItems.forEach(item => {
    item.addEventListener('dragstart', function() {
      draggedItem = item;
      item.classList.add('hold');
    })
    
    item.addEventListener('dragend', function() {
      item.classList.remove('hold');
    })
  })

  dropableArea.forEach(area => {
    area.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    area.addEventListener('dragenter', function(e) {
      e.preventDefault();
    });
    area.addEventListener('drop', function() {
      this.appendChild(draggedItem);
    })
  });
}

// make item with input value and append it to droppableArea
const displayItem = (val, index) => {
  dataIndex += 1;

  const html = `<div class="draggable" draggable="true" data-number="${dataIndex}">
                  <p class="items" draggable="true">${val}</p>
                </div>`;

  dropableArea[index].insertAdjacentHTML('beforeend', html);
  
  inputValue.forEach(input => {
    input.value = '';
  });

  dragNDropBetweenColumns();
  // dragNDropInsideColumns();
};

// add event listener for evey "add item" button
addItem.forEach((btn, index) => {
  btn.addEventListener('click', function() {
    let value = inputValue[index].value;
    if (!value) {
      return;
    } else {
      displayItem(value, index);
    }
  });
});



