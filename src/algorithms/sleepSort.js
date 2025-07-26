export default function sleepSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  const sleepSortedArray = [];

  for (let i = 0; i < unsortedArray.length; i++) {
    returnSelectors.intermediateNodeChanges.push([
      { nodeData: 0, nodeIndex: i },
    ]);
  }

  for (let i = 0; i < unsortedArray.length; i++) {
    setTimeout(() => {
      sleepSortedArray.push(unsortedArray[i]);
    }, unsortedArray[i] * 10);
  }

  setTimeout(() => {
    for (let i = 0; i < sleepSortedArray.length; i++) {
      returnSelectors.intermediateNodeChanges.push([
        { nodeData: sleepSortedArray[i], nodeIndex: i },
      ]);
    }

    return returnSelectors;
  }, Math.max(...unsortedArray) * 10 + 10);
}
