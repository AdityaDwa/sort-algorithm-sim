export default function insertionSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  for (let i = 1; i < unsortedArray.length; i++) {
    const currentSelectedNode = unsortedArray[i];
    let j = i - 1;

    if (sortingDirection) {
      while (j >= 0 && unsortedArray[j] > currentSelectedNode) {
        unsortedArray[j + 1] = unsortedArray[j];

        returnSelectors.intermediateNodeChanges.push([
          { nodeData: unsortedArray[j + 1], nodeIndex: j + 1 },
        ]);

        returnSelectors.selectedNodes.push([j, j + 1]);

        j--;
      }
    } else {
      while (j >= 0 && unsortedArray[j] < currentSelectedNode) {
        unsortedArray[j + 1] = unsortedArray[j];

        returnSelectors.intermediateNodeChanges.push([
          { nodeData: unsortedArray[j + 1], nodeIndex: j + 1 },
        ]);

        returnSelectors.selectedNodes.push([j, j + 1]);

        j--;
      }
    }

    unsortedArray[j + 1] = currentSelectedNode;

    returnSelectors.intermediateNodeChanges.push([
      { nodeData: unsortedArray[j + 1], nodeIndex: j + 1 },
    ]);

    returnSelectors.selectedNodes.push([j + 1, j + 2]);
  }

  return returnSelectors;
}
