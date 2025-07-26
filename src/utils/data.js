import bubbleSort from "../algorithms/bubbleSort.js";
import countingSort from "../algorithms/countingSort.js";
import heapSort from "../algorithms/heapSort.js";
import insertionSort from "../algorithms/insertionSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import quickSort from "../algorithms/quickSort.js";
import radixSort from "../algorithms/radixSort.js";
import selectionSort from "../algorithms/selectionSort.js";
import shellSort from "../algorithms/shellSort.js";
import sleepSort from "../algorithms/sleepSort.js";

export const algorithmTitles = [
  "bubble-sort",
  "counting-sort",
  "heap-sort",
  "insertion-sort",
  "merge-sort",
  "quick-sort",
  "radix-sort",
  "selection-sort",
  "shell-sort",
  "sleep-sort",
];

export const randomizeConfiguration = [
  { title: "Randomize", direction: 0, shuffle: 0 },
  { title: "Ascending", direction: 1, shuffle: 0 },
  { title: "Descending", direction: -1, shuffle: 0 },
  { title: "Almost Ascending", direction: 1, shuffle: 0.2 },
  { title: "Almost Descending", direction: -1, shuffle: 0.2 },
];

export const sortingAlgorithms = {
  "bubble-sort": bubbleSort,
  "counting-sort": countingSort,
  "heap-sort": heapSort,
  "insertion-sort": insertionSort,
  "merge-sort": mergeSort,
  "quick-sort": quickSort,
  "radix-sort": radixSort,
  "selection-sort": selectionSort,
  "shell-sort": shellSort,
  //   "sleep-sort": sleepSort,
};
