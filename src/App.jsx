import { useEffect, useRef, useState } from "react";

import DataConfigMenu from "./components/DataConfigMenu.jsx";
import NodeListContent from "./components/NodeListContent.jsx";

import { sortingAlgorithms } from "./utils/data.js";

let sortingAnimationSelectors = {
  intermediateNodeChanges: [],
  selectedNodes: [],
  pivotedNode: [],
};

export default function App() {
  const dataTableRef = useRef();

  const [selectedData, setSelectedData] = useState();
  const [hoveredNode, setHoveredNode] = useState();

  const [dataArray, setDataArray] = useState([]);
  const [dataSetSize, setDataSetSize] = useState(75);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationInterval, setAnimationInterval] = useState(20);
  const [isSorted, setIsSorted] = useState(false);
  const [animateArray, setAnimateArray] = useState(false);

  useEffect(() => {
    if (animateArray) {
      if (
        currentIndex < sortingAnimationSelectors.intermediateNodeChanges.length
      ) {
        const nodeChangeTimer = setInterval(() => {
          const updatingArray = [...dataArray];

          sortingAnimationSelectors.intermediateNodeChanges[
            currentIndex
          ].forEach((changeInfo) => {
            updatingArray[changeInfo.nodeIndex] = changeInfo.nodeData;
          });

          setDataArray(updatingArray);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, animationInterval);

        // Cleanup interval when component unmounts or when we're at the last index
        return () => {
          clearInterval(nodeChangeTimer);
        };
      } else {
        if (dataArray.length !== dataSetSize) {
          const cleanUpArray = [...dataArray];

          while (cleanUpArray.length > dataSetSize) {
            cleanUpArray.pop();
          }

          const cleanupTimer = setInterval(() => {
            setDataArray(cleanUpArray);
          }, 1000);

          return () => {
            clearInterval(cleanupTimer);
          };
        }

        sortingAnimationSelectors = {
          intermediateNodeChanges: [],
          selectedNodes: [],
          pivotedNode: [],
        };
        setAnimateArray(false);
      }
    }
  }, [currentIndex, isSorted]);

  useEffect(() => {
    genRandomElements();
  }, [dataSetSize]);

  function algorithmIdentifier(identifier) {
    const unsortedArray = [...dataArray];

    sortingAnimationSelectors = sortingAlgorithms[identifier](
      unsortedArray,
      false
    );

    setIsSorted(true);
    setAnimateArray(true);
  }

  function genRandomElements(sortingDirection = 0, shufflePercentage = 0) {
    const elementArray = Array.from({ length: dataSetSize }, () =>
      Math.floor(Math.random() * 100)
    );

    // const elementArray = [19, 36, 54, 12, 15];

    if (sortingDirection === 1) {
      elementArray.sort((a, b) => a - b);
    }

    if (sortingDirection === -1) {
      elementArray.sort((a, b) => b - a);
    }

    if (shufflePercentage !== 0) {
      for (let i = 0; i < Math.floor(dataSetSize * shufflePercentage); i++) {
        let index1 = Math.floor(Math.random() * dataSetSize);
        let index2 = Math.floor(Math.random() * dataSetSize);
        [elementArray[index1], elementArray[index2]] = [
          elementArray[index2],
          elementArray[index1],
        ];
      }
    }

    setDataArray(elementArray);
    setCurrentIndex(0);
    setAnimateArray(false);
    setIsSorted(false);
    sortingAnimationSelectors = {
      intermediateNodeChanges: [],
      selectedNodes: [],
      pivotedNode: [],
    };
  }

  function handleNodeClick(nodeIndex) {
    handleScroll(nodeIndex);
    setSelectedData((prevNodeIndex) => {
      return nodeIndex !== prevNodeIndex ? nodeIndex : null;
    });
  }

  function handleDataSetSizeChange(size) {
    setDataSetSize(size);
  }

  function handleNodeHover(nodeIndex) {
    setHoveredNode(nodeIndex);
  }

  function handleScroll(nodeIndex) {
    dataTableRef.current.scrollTo(0, 43.2 * (nodeIndex - 7));
  }

  return (
    <>
      <aside className="data-info-section">
        <h2>Data Table</h2>
        <div className="data-contain" ref={dataTableRef}>
          {dataArray.map((eachData, index) => (
            <div
              key={index + 1}
              className={`data-info${
                selectedData === index ? " selected-data-info" : ""
              }${hoveredNode === index ? " hovered-data-info" : ""}`}
              onClick={() => handleNodeClick(index)}
              onMouseEnter={() => handleNodeHover(index)}
              onMouseLeave={() => handleNodeHover(null)}
            >
              <span className="serial-number">{index + 1}.</span>
              <span>{eachData}</span>
            </div>
          ))}
        </div>
      </aside>
      <h1 className="title">Algorithm Sim</h1>
      <main className="webpage-contain">
        <NodeListContent
          dataArray={dataArray}
          currentIndex={currentIndex}
          selectedData={selectedData}
          hoveredNode={hoveredNode}
          sortingAnimationSelectors={sortingAnimationSelectors}
          handleNodeClick={handleNodeClick}
          handleNodeHover={handleNodeHover}
        />
        <DataConfigMenu
          dataSetSize={dataSetSize}
          algorithmIdentifier={algorithmIdentifier}
          genRandomElements={genRandomElements}
          handleDataSetSizeChange={handleDataSetSizeChange}
        />
      </main>
    </>
  );
}
