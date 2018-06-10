function numberComparator(a, b) {
  if (a === b) return 0;

  return a < b ? -1 : 1;
}

function numberIncrease(number, increment) {
  return number + increment;
}

function MinHeap(array, comparator, increase) {
  this.array = array;
  this.heapSize = array.length;

  this.comparator = comparator || numberComparator;
  this.increase = increase || numberIncrease;

  this.buildHeap();
}

MinHeap.prototype.parentIndex = function(index) {
  if (index === 0) return index;

  return (index - 1) >> 1; //same as Math.floor((index - 1) / 2)
};

MinHeap.prototype.leftChildIndex = function(index) {
  var left = (index << 1) + 1; //index * 2 + 1

  if (left >= this.heapSize) return -1;

  return left;
};

MinHeap.prototype.rightChildIndex = function(index) {
  var right = (index << 1) + 2; //index * 2 + 2

  if (right >= this.heapSize) return -1;

  return right;
};

MinHeap.prototype.parent = function(index) {
  return this.array[this.parentIndex(index)];
};

MinHeap.prototype.leftChild = function(index) {
  return this.array[this.leftChildIndex(index)];
};

MinHeap.prototype.rightChild = function(index) {
  return this.array[this.rightChildIndex(index)];
};

MinHeap.prototype.heapify = function(index) {
  if (index >= this.heapSize || index < 0) return;

  var leftIndex = this.leftChildIndex(index);
  var rightIndex = this.rightChildIndex(index);
  var indexToSwap = index;

  if (leftIndex > -1 && this.comparator(this.array[leftIndex], this.array[indexToSwap]) === -1) {
    indexToSwap = leftIndex;
  }

  if (rightIndex > -1 && this.comparator(this.array[rightIndex], this.array[indexToSwap]) === -1) {
    indexToSwap = rightIndex;
  }

  if (indexToSwap === index) return;

  this.swap(indexToSwap, index);

  this.heapify(indexToSwap);
};

MinHeap.prototype.swap = function(oneIndex, towIndex) {
  var temp;

  temp = this.array[oneIndex];
  this.array[oneIndex] = this.array[towIndex];
  this.array[towIndex] = temp;
};

MinHeap.prototype.buildHeap = function() {
  var lastNonLeafIndex = (this.heapSize >> 1) - 1;

  for (var i = lastNonLeafIndex; i >= 0; i--) {
    this.heapify(i);
  }
};

MinHeap.prototype.min = function() {
  return this.heapSize ? this.array[0] : null;
};

MinHeap.prototype.minIndex = function() {
  return this.heapSize ? 0 : -1;
};

MinHeap.prototype.isEmpty = function() {
  return this.heapSize === 0;
};

MinHeap.prototype.extractMin = function() {
  var min = this.min();

  if (!this.heapSize) return min;

  this.swap(0, this.heapSize - 1);

  this.heapSize--;

  this.heapify(0);
};

MinHeap.prototype.increaseWith = function(index, increment) {
  if (index >= this.heapSize || index < 0) return;

  this.array[index] = this.increase(this.array[index], increment);

  this.heapify(index);
};
