class LinkedChunk {
  constructor(list) {
    this.length = list.length

    this.firstNode = {
      value: list[this.length - 1],
      next: null,
      prev: null
    }

    this.lastNode = this.firstNode

    for (let i = this.length - 2; i >= 0; i--) {
      let currentNode = this.firstNode

      this.firstNode = {
        value: list[i],
        next: currentNode,
        prev: null
      }

      currentNode.prev = this.firstNode
    }
  }
}

module.exports = LinkedChunk
