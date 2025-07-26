export default function bubbleSort(unsortedArray, sortingDirection) {
  const dataBoundary = unsortedArray.length - 1;
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  for (let i = 0; i < dataBoundary; i++) {
    for (let j = 0; j < dataBoundary - i; j++) {
      let sortingCondition;
      if (sortingDirection) {
        sortingCondition = unsortedArray[j] > unsortedArray[j + 1];
      } else {
        sortingCondition = unsortedArray[j] < unsortedArray[j + 1];
      }

      if (sortingCondition) {
        [unsortedArray[j], unsortedArray[j + 1]] = [
          unsortedArray[j + 1],
          unsortedArray[j],
        ];

        returnSelectors.intermediateNodeChanges.push([
          { nodeData: unsortedArray[j], nodeIndex: j },
          { nodeData: unsortedArray[j + 1], nodeIndex: j + 1 },
        ]);

        returnSelectors.selectedNodes.push([j, j + 1]);
      }
    }
  }

  return returnSelectors;
}
