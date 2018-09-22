const mocha = require('mocha');
const chai = require('chai');
const rewire = require('rewire');
const expect = chai.expect;

function ChunkMock(list) {
  this.list = list;
}

describe('breakParts()', function () {
  const breakParts = rewire('../lib/breakParts');
  breakParts.__set__('LinkedChunk', ChunkMock);
  
  it('should return one part on sorted array', function () {
    let array = [1, 2, 3, 4, 5, 5, 5, 5, 6, 6, 7, 100, 405];
    
    let parts = breakParts(array);
    
    expect(parts.length).to.equal(1);
    
    let list = parts[0].list;

    expect(list.length).to.equal(array.length);
    
    list.forEach((item, index) => {
      expect(item).to.equal(array[index]);
    });
  });
  
  it('should return one sorted part on reverse sorted array', function () {
    let array = [-5, 1, 1, 2, 3, 4, 5, 6, 7, 7, 7, 28, 1000];
    array.reverse();
    
    let parts = breakParts(array);
    
    expect(parts.length).to.equal(1);
    
    let list = parts[0].list;

    expect(list.length).to.equal(array.length);
    
    list.reverse();
    
    list.forEach((item, index) => {
      expect(item).to.equal(array[index]);
    });
  });
  
  it('should return two parts on concat of sorted and reverse sorted array. sorted\'s last > reversed\'s first', function () {
    let sortedArr = [-7, -4, -4, 1, 5, 7, 8, 8, 8, 8, 10, 56, 78, 300];
    let reverseSorted = [289, 217, 203, 105, 100, 97, 85, 84, 84, -3, -7, -7, -99];
    
    let array = sortedArr.concat(reverseSorted);
    
    let parts = breakParts(array);
    
    expect(parts.length).to.equal(2);
    
    let first = parts[0].list;
    let second = parts[1].list;

    expect(first.length).to.equal(sortedArr.length);
    expect(second.length).to.equal(reverseSorted.length);
    
    first.forEach((item, index) => {
      expect(item).to.equal(sortedArr[index]);
    });
    
    second.reverse();
    second.forEach((item, index) => {
      expect(item).to.equal(reverseSorted[index]);
    });
  });
  
  it('should return length/2 parts on saw like array', function () {
    let array = [5, 1, 4, 2, 7, 2, 8, 3, 9, 1, 7, 2, 4, 0, 9, 0, 4, -1, 18, 1];
    
    let parts = breakParts(array);
    
    expect(parts.length).to.equal(array.length / 2);
    
    parts.forEach(part => {
      expect(part.list.length).to.equal(2);
      expect(part.list[0]).to.be.at.most(part.list[1]);
    });
  });
});