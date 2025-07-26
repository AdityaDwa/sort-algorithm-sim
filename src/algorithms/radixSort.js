export default function radixSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  const maxElement = Math.max(...unsortedArray);

  for (
    let position = 1;
    Math.floor(maxElement / position) > 0;
    position = position * 10
  ) {
    countSort(
      unsortedArray,
      position,
      returnSelectors.intermediateNodeChanges,
      sortingDirection
    );
  }

  return returnSelectors;
}

function countSort(
  radixSortedArray,
  position,
  intermediateNodeChanges,
  sortingDirection
) {
  const countArray = new Array(10).fill(0);
  const sortedArray = new Array(radixSortedArray.length).fill(0);

  const dataBoundary =
    radixSortedArray.length < 10 ? 10 : radixSortedArray.length;

  for (let i = 0; i < dataBoundary; i++) {
    intermediateNodeChanges.push([{ nodeData: 0, nodeIndex: i }]);
  }

  for (let i = 0; i < radixSortedArray.length; i++) {
    countArray[Math.floor(radixSortedArray[i] / position) % 10]++;

    const currentNodeIndex = Math.floor(radixSortedArray[i] / position) % 10;
    intermediateNodeChanges.push([
      {
        nodeData: countArray[currentNodeIndex],
        nodeIndex: currentNodeIndex,
      },
    ]);
  }

  if (sortingDirection) {
    for (let i = 1; i <= 9; i++) {
      countArray[i] = countArray[i] + countArray[i - 1];

      intermediateNodeChanges.push([{ nodeData: countArray[i], nodeIndex: i }]);
    }
  } else {
    for (let i = 8; i >= 0; i--) {
      countArray[i] = countArray[i] + countArray[i + 1];

      intermediateNodeChanges.push([{ nodeData: countArray[i], nodeIndex: i }]);
    }
  }

  for (let i = radixSortedArray.length - 1; i >= 0; i--) {
    sortedArray[--countArray[Math.floor(radixSortedArray[i] / position) % 10]] =
      radixSortedArray[i];

    const currentNodeIndex =
      countArray[Math.floor(radixSortedArray[i] / position) % 10];
    intermediateNodeChanges.push([
      {
        nodeData: sortedArray[currentNodeIndex],
        nodeIndex: currentNodeIndex,
      },
    ]);
  }

  for (let i = 0; i < radixSortedArray.length; i++) {
    radixSortedArray[i] = sortedArray[i];
  }
}
