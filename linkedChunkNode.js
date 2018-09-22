class LinkedChunkNode {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
  
  /**
   * link node to next pointer
   * @param  {LinkedChunkNode} node
   */
  linkNext(node) {
    node.prev = this;
    
    this.next = node;
  }
  
  /**
   * link node to prev pointer
   * @param  {LinkedChunkNode} node
   */
  linkPrevious(node) {
    node.next = this;
    
    this.prev = node;
  }
}

module.exports = LinkedChunkNode;