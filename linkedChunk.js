const LinkedChunkNode = require('./linkedChunkNode')

class LinkedChunk {
  constructor(list) {
    if (!list || list.length === 0) {
      this.length = 0
      
      return
    }
    
    this.length = list.length

    this.firstNode = new LinkedChunkNode(list[this.length - 1])

    this.lastNode = this.firstNode

    for (let i = this.length - 2; i >= 0; i--) {
      let currentNode = this.firstNode
      
      this.firstNode = new LinkedChunkNode(list[i], null, currentNode)

      currentNode.prev = this.firstNode
    }
  }
  
  /**
   * this method works with sorted chunks. 
   * it returns merge of these chunks. (this and otherChunk)
   * as in MergeSort
   *
   * // NOTE: after merge this chunk and otherChunk are destroyed
   * @param  {LinkedChunk} otherChunk [description]
   * @return {LinkedChunk}            merged sorted linkedChunk
   */
  merge(otherChunk) {
    let resultChunk = new LinkedChunk();
    
    let currentThisNode = this.firstNode;
    let currentOtherNode = otherChunk.firstNode;
    
    while (currentThisNode && currentOtherNode) {
      if (currentThisNode.value > currentOtherNode.value) {
        resultChunk.pushNode(currentThisNode)
        
        currentThisNode = currentThisNode.next
      } else {
        resultChunk.pushNode(currentOtherNode)
        
        currentOtherNode = currentOtherNode.next
      }
    }
    
    let node;

    if (currentThisNode) {
      node = currentThisNode
    }
    
    if (currentOtherNode) {
      node = currentOtherNode
    }
    
    while (node) {
      resultChunk.pushNode(node)
      
      node = node.next
    }
    
    this.destroy()
    otherChunk.destroy()
    
    return resultChunk
  }
  
  /**
   * append item to the end of this chunk
   * @param  {any} item any item to add in this chunk
   */
  push(item) {
    this.pushNode(new LinkedChunkNode(item));
  }
  
  /**
   * append LinkedChunk node to the end of this chunk
   * @param  {LinkedChunkNode} node 
   */
  pushNode(node) {
    if (this.length === 0) {
      this.firstNode = node
      this.lastNode = node
      this.length++
      
      return;
    }
    
    this.lastNode.linkNext(node)
    
    this.lastNode = node
    
    this.length++
  }
  
  [Symbol.iterator]() {
    return {
      current: this.firstNode,
      next() {
        if (!this.current) return {done: true}
        
        let result = this.current
        
        this.current = this.current.next
        
        return result.value
      }
    }
  }
  
  destroy() {
    this.firstNode = null
    this.lastNode = null
    this.length = 0
  }
}

module.exports = LinkedChunk
