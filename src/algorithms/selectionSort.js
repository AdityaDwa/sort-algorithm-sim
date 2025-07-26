export default function selectionSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  for (let i = 0; i < unsortedArray.length - 1; i++) {
    let pivotElementIndex = i;
    returnSelectors.pivotedNode.push(pivotElementIndex);

    for (let j = i + 1; j < unsortedArray.length; j++) {
      if (sortingDirection) {
        if (unsortedArray[j] < unsortedArray[pivotElementIndex]) {
          pivotElementIndex = j;
        }
      } else {
        if (unsortedArray[j] > unsortedArray[pivotElementIndex]) {
          pivotElementIndex = j;
        }
      }
    }

    if (pivotElementIndex != i) {
      [unsortedArray[i], unsortedArray[pivotElementIndex]] = [
        unsortedArray[pivotElementIndex],
        unsortedArray[i],
      ];

      returnSelectors.intermediateNodeChanges.push([
        { nodeData: unsortedArray[i], nodeIndex: i },
        {
          nodeData: unsortedArray[pivotElementIndex],
          nodeIndex: pivotElementIndex,
        },
      ]);

      returnSelectors.selectedNodes.push([i, pivotElementIndex]);
    }
  }

  return returnSelectors;
}
