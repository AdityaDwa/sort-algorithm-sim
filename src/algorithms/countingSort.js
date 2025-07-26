export default function countingSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  const maxElement = Math.max(...unsortedArray);

  const countArray = new Array(maxElement + 1).fill(0);
  const sortedArray = new Array(unsortedArray.length).fill(0);

  for (let i = 0; i < countArray.length; i++) {
    returnSelectors.intermediateNodeChanges.push([
      { nodeData: 0, nodeIndex: i },
    ]);
  }

  for (let i = 0; i < unsortedArray.length; i++) {
    countArray[unsortedArray[i]]++;

    returnSelectors.intermediateNodeChanges.push([
      { nodeData: countArray[unsortedArray[i]], nodeIndex: unsortedArray[i] },
    ]);
  }

  if (sortingDirection) {
    for (let i = 1; i < countArray.length; i++) {
      countArray[i] = countArray[i] + countArray[i - 1];

      returnSelectors.intermediateNodeChanges.push([
        { nodeData: countArray[i], nodeIndex: i },
      ]);
    }
  } else {
    for (let i = countArray.length - 2; i >= 0; i--) {
      countArray[i] = countArray[i] + countArray[i + 1];

      returnSelectors.intermediateNodeChanges.push([
        { nodeData: countArray[i], nodeIndex: i },
      ]);
    }
  }

  for (let i = unsortedArray.length - 1; i >= 0; i--) {
    sortedArray[--countArray[unsortedArray[i]]] = unsortedArray[i];

    returnSelectors.intermediateNodeChanges.push([
      {
        nodeData: sortedArray[countArray[unsortedArray[i]]],
        nodeIndex: countArray[unsortedArray[i]],
      },
    ]);
  }

  return returnSelectors;
}
