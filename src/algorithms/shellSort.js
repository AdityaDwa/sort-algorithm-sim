export default function shellSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  for (
    let gap = Math.floor(unsortedArray.length / 2);
    gap >= 1;
    gap = Math.floor(gap / 2)
  ) {
    for (let j = gap; j < unsortedArray.length; j++) {
      for (let i = j - gap; i >= 0; i = i - gap) {
        if (sortingDirection) {
          if (unsortedArray[i + gap] > unsortedArray[i]) {
            break;
          } else {
            [unsortedArray[i], unsortedArray[i + gap]] = [
              unsortedArray[i + gap],
              unsortedArray[i],
            ];

            returnSelectors.intermediateNodeChanges.push([
              { nodeData: unsortedArray[i], nodeIndex: i },
              { nodeData: unsortedArray[i + gap], nodeIndex: i + gap },
            ]);

            returnSelectors.selectedNodes.push([i, i + gap]);
          }
        } else {
          if (unsortedArray[i + gap] < unsortedArray[i]) {
            break;
          } else {
            [unsortedArray[i], unsortedArray[i + gap]] = [
              unsortedArray[i + gap],
              unsortedArray[i],
            ];

            returnSelectors.intermediateNodeChanges.push([
              { nodeData: unsortedArray[i], nodeIndex: i },
              { nodeData: unsortedArray[i + gap], nodeIndex: i + gap },
            ]);

            returnSelectors.selectedNodes.push([i, i + gap]);
          }
        }
      }
    }
  }

  return returnSelectors;
}
