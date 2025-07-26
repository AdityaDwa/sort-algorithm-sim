export default function mergeSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  mergeSortHelper(
    unsortedArray,
    0,
    unsortedArray.length - 1,
    returnSelectors,
    sortingDirection
  );

  return returnSelectors;
}

function mergeSortHelper(
  mergeSortedArray,
  lowerBound,
  upperBound,
  returnSelectors,
  sortingDirection
) {
  if (lowerBound < upperBound) {
    const midPoint = Math.floor((upperBound + lowerBound) / 2);

    mergeSortHelper(
      mergeSortedArray,
      lowerBound,
      midPoint,
      returnSelectors,
      sortingDirection
    ); // left half
    mergeSortHelper(
      mergeSortedArray,
      midPoint + 1,
      upperBound,
      returnSelectors,
      sortingDirection
    ); // right half

    merge(
      mergeSortedArray,
      lowerBound,
      midPoint,
      upperBound,
      returnSelectors,
      sortingDirection
    );
  }
}

function merge(
  mergedArray,
  lowerBound,
  midPoint,
  upperBound,
  returnSelectors,
  sortingDirection
) {
  let tempMergedArray = [];
  let i = lowerBound;
  let j = midPoint + 1;

  while (i <= midPoint && j <= upperBound) {
    if (sortingDirection) {
      if (mergedArray[i] <= mergedArray[j]) {
        tempMergedArray.push(mergedArray[i]);
        i++;
      } else {
        tempMergedArray.push(mergedArray[j]);
        j++;
      }
    } else {
      if (mergedArray[i] >= mergedArray[j]) {
        tempMergedArray.push(mergedArray[i]);
        i++;
      } else {
        tempMergedArray.push(mergedArray[j]);
        j++;
      }
    }
  }

  while (i <= midPoint) {
    tempMergedArray.push(mergedArray[i]);
    i++;
  }

  while (j <= upperBound) {
    tempMergedArray.push(mergedArray[j]);
    j++;
  }

  for (let index = 0; index < tempMergedArray.length; index++) {
    mergedArray[index + lowerBound] = tempMergedArray[index];

    returnSelectors.intermediateNodeChanges.push([
      {
        nodeData: mergedArray[index + lowerBound],
        nodeIndex: index + lowerBound,
      },
    ]);

    returnSelectors.selectedNodes.push([-1, index + lowerBound]);
  }
}
