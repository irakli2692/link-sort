const breakSortedParts = require('./breakParts')
const LinkedChunk = require('./linkedChunk')
const Heap = require('./heap')

function lengthComparator(item1, item2) {
  if (item1.length === item2.length) return 0

  return item1.length < item2.length ? -1 : 1
}

function sort(list) {
  if (list.length < 2) return list;
  
  let parts = breakSortedParts(list)
  
  let heap = new Heap(parts, lengthComparator)
  
  while (heap.heapSize > 1) {
    let first = heap.extractMin()
    let second = heap.extractMin()
    
    let merged = first.merge(second)
    
    heap.insert(merged)
  }
  
  return heap.min()
}

module.exports = sort;