export default function quickSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  quickSortHelper(
    unsortedArray,
    0,
    unsortedArray.length - 1,
    returnSelectors,
    sortingDirection
  );

  return returnSelectors;
}

function quickSortHelper(
  quickSortedArray,
  lowerBound,
  upperBound,
  returnSelectors,
  sortingDirection
) {
  if (lowerBound < upperBound) {
    const position = partition(
      quickSortedArray,
      lowerBound,
      upperBound,
      returnSelectors,
      sortingDirection
    );

    quickSortHelper(
      quickSortedArray,
      lowerBound,
      position - 1,
      returnSelectors,
      sortingDirection
    );
    quickSortHelper(
      quickSortedArray,
      position + 1,
      upperBound,
      returnSelectors,
      sortingDirection
    );
  }
}

function partition(
  partifiedArray,
  lowerBound,
  upperBound,
  returnSelectors,
  sortingDirection
) {
  const pivotNode = partifiedArray[lowerBound];
  let startPointer = lowerBound;
  let endPointer = upperBound;

  while (startPointer < endPointer) {
    if (sortingDirection) {
      while (partifiedArray[startPointer] <= pivotNode) {
        startPointer++;
      }

      while (partifiedArray[endPointer] > pivotNode) {
        endPointer--;
      }
    } else {
      while (partifiedArray[startPointer] >= pivotNode) {
        startPointer++;
      }

      while (partifiedArray[endPointer] < pivotNode) {
        endPointer--;
      }
    }

    if (startPointer < endPointer) {
      [partifiedArray[startPointer], partifiedArray[endPointer]] = [
        partifiedArray[endPointer],
        partifiedArray[startPointer],
      ];

      returnSelectors.intermediateNodeChanges.push([
        { nodeData: partifiedArray[startPointer], nodeIndex: startPointer },
        { nodeData: partifiedArray[endPointer], nodeIndex: endPointer },
      ]);

      returnSelectors.selectedNodes.push([startPointer, endPointer]);
    }
  }

  [partifiedArray[lowerBound], partifiedArray[endPointer]] = [
    partifiedArray[endPointer],
    partifiedArray[lowerBound],
  ];

  returnSelectors.intermediateNodeChanges.push([
    { nodeData: partifiedArray[lowerBound], nodeIndex: lowerBound },
    { nodeData: partifiedArray[endPointer], nodeIndex: endPointer },
  ]);

  returnSelectors.selectedNodes.push([lowerBound, endPointer]);

  return endPointer;
}
