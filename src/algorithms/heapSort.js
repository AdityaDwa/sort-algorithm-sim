export default function heapSort(unsortedArray, sortingDirection) {
  const returnSelectors = {
    intermediateNodeChanges: [],
    selectedNodes: [],
    pivotedNode: [],
  };

  for (
    let maxIndexedNonLeafNode = Math.floor(unsortedArray.length / 2) - 1;
    maxIndexedNonLeafNode >= 0;
    maxIndexedNonLeafNode--
  ) {
    if (sortingDirection) {
      maxHeapify(
        unsortedArray,
        unsortedArray.length - 1,
        maxIndexedNonLeafNode,
        returnSelectors
      );
    } else {
      minHeapify(
        unsortedArray,
        unsortedArray.length - 1,
        maxIndexedNonLeafNode,
        returnSelectors
      );
    }
  }

  for (let i = unsortedArray.length - 1; i >= 0; i--) {
    [unsortedArray[0], unsortedArray[i]] = [unsortedArray[i], unsortedArray[0]];

    returnSelectors.intermediateNodeChanges.push([
      { nodeData: unsortedArray[0], nodeIndex: 0 },
      { nodeData: unsortedArray[i], nodeIndex: i },
    ]);

    returnSelectors.selectedNodes.push([0, i]);

    if (sortingDirection) {
      maxHeapify(unsortedArray, i - 1, 0, returnSelectors);
    } else {
      minHeapify(unsortedArray, i - 1, 0, returnSelectors);
    }
  }

  return returnSelectors;
}

function maxHeapify(
  heapifiedArray,
  heapSize,
  selectedNodeIndex,
  returnSelectors
) {
  let largestNodeValueIndex = selectedNodeIndex;
  const immediateLeftChildIndex = 2 * selectedNodeIndex + 1;
  const immediateRightChildIndex = 2 * selectedNodeIndex + 2;

  if (
    immediateLeftChildIndex <= heapSize &&
    heapifiedArray[immediateLeftChildIndex] >
      heapifiedArray[largestNodeValueIndex]
  ) {
    largestNodeValueIndex = immediateLeftChildIndex;
  }

  if (
    immediateRightChildIndex <= heapSize &&
    heapifiedArray[immediateRightChildIndex] >
      heapifiedArray[largestNodeValueIndex]
  ) {
    largestNodeValueIndex = immediateRightChildIndex;
  }

  if (largestNodeValueIndex != selectedNodeIndex) {
    [heapifiedArray[largestNodeValueIndex], heapifiedArray[selectedNodeIndex]] =
      [
        heapifiedArray[selectedNodeIndex],
        heapifiedArray[largestNodeValueIndex],
      ];

    returnSelectors.intermediateNodeChanges.push([
      {
        nodeData: heapifiedArray[largestNodeValueIndex],
        nodeIndex: largestNodeValueIndex,
      },
      {
        nodeData: heapifiedArray[selectedNodeIndex],
        nodeIndex: selectedNodeIndex,
      },
    ]);

    returnSelectors.selectedNodes.push([-1, -1]);

    maxHeapify(
      heapifiedArray,
      heapSize,
      largestNodeValueIndex,
      returnSelectors
    );
  }
}

function minHeapify(
  heapifiedArray,
  heapSize,
  selectedNodeIndex,
  returnSelectors
) {
  let smallestNodeValueIndex = selectedNodeIndex;
  const immediateLeftChildIndex = 2 * selectedNodeIndex + 1;
  const immediateRightChildIndex = 2 * selectedNodeIndex + 2;

  if (
    immediateLeftChildIndex <= heapSize &&
    heapifiedArray[immediateLeftChildIndex] <
      heapifiedArray[smallestNodeValueIndex]
  ) {
    smallestNodeValueIndex = immediateLeftChildIndex;
  }

  if (
    immediateRightChildIndex <= heapSize &&
    heapifiedArray[immediateRightChildIndex] <
      heapifiedArray[smallestNodeValueIndex]
  ) {
    smallestNodeValueIndex = immediateRightChildIndex;
  }

  if (smallestNodeValueIndex != selectedNodeIndex) {
    [
      heapifiedArray[smallestNodeValueIndex],
      heapifiedArray[selectedNodeIndex],
    ] = [
      heapifiedArray[selectedNodeIndex],
      heapifiedArray[smallestNodeValueIndex],
    ];

    returnSelectors.intermediateNodeChanges.push([
      {
        nodeData: heapifiedArray[smallestNodeValueIndex],
        nodeIndex: smallestNodeValueIndex,
      },
      {
        nodeData: heapifiedArray[selectedNodeIndex],
        nodeIndex: selectedNodeIndex,
      },
    ]);

    returnSelectors.selectedNodes.push([-1, -1]);

    minHeapify(
      heapifiedArray,
      heapSize,
      smallestNodeValueIndex,
      returnSelectors
    );
  }
}
