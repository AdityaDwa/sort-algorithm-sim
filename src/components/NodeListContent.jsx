export default function NodeListContent({
  dataArray,
  currentIndex,
  selectedData,
  hoveredNode,
  sortingAnimationSelectors,
  handleNodeClick,
  handleNodeHover,
}) {
  return (
    <section
      className="sorting-contain"
      style={{ gap: `${12.5 / dataArray.length + 0.05}rem` }}
    >
      {dataArray.map((eachData, index) => {
        let cssClasses = "node-contain";

        const selectedNode =
          sortingAnimationSelectors.selectedNodes[currentIndex];
        if (selectedNode) {
          if (selectedNode.includes(index)) {
            cssClasses += " selected-node-contain";
          }
        }

        if (sortingAnimationSelectors.pivotedNode) {
          if (index === sortingAnimationSelectors.pivotedNode[currentIndex]) {
            cssClasses += " pivot-node";
          }
        }

        if (selectedData === index) {
          cssClasses += " selected-node-contain";
        }
        if (hoveredNode === index) {
          cssClasses += " selected-node-contain";
        }

        return (
          <span
            key={index}
            className={cssClasses}
            style={{
              height: `${eachData * 0.38}rem`,
              borderTopLeftRadius: `${dataArray.length <= 45 ? 0.2 : 0.15}rem`,
              borderTopRightRadius: `${dataArray.length <= 45 ? 0.2 : 0.15}rem`,
            }}
            onClick={() => handleNodeClick(index)}
            onMouseEnter={() => handleNodeHover(index)}
            onMouseLeave={() => handleNodeHover(null)}
          >
            {dataArray.length <= 20 ? (
              <span className="node-data">{eachData}</span>
            ) : (
              ""
            )}
          </span>
        );
      })}
    </section>
  );
}
