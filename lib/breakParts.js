const LinkedChunk = require('./linkedChunk')

const EQUAL_STATE = 0
const INCREMENT_STATE = 1
const DECREMENT_STATE = 2

function breakSortedParts(list) {
  let currentStartIndex = 0

  let state = EQUAL_STATE;

  let parts = []

  for (let i = 1; i < list.length; i++) {
    switch (state) {
      case INCREMENT_STATE:
        if (list[i] < list[i - 1]) {
          parts.push(
            new LinkedChunk(list.slice(currentStartIndex, i))
          )

          currentStartIndex = i
          state = EQUAL_STATE
        }

        break
      case DECREMENT_STATE:
        if (list[i] > list[i - 1]) {
          let part = list.slice(currentStartIndex, i)
          part.reverse()

          parts.push(
            new LinkedChunk(part)
          )

          currentStartIndex = i
          state = EQUAL_STATE
        }

        break
      case EQUAL_STATE:
        if (list[i] > list[i - 1]) {
          state = INCREMENT_STATE
        }

        if (list[i] < list[i - 1]) {
          state = DECREMENT_STATE
        }

        break
    }
  }

  if (state === DECREMENT_STATE) {
    let part = list.slice(currentStartIndex, list.length)
    part.reverse()

    parts.push(
      new LinkedChunk(part)
    )
  } else {
    parts.push(
      new LinkedChunk(list.slice(currentStartIndex, list.length))
    )
  }

  return parts
}

module.exports = breakSortedParts
