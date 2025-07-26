import { algorithmTitles, randomizeConfiguration } from "../utils/data.js";

export default function DataConfigMenu({
  dataSetSize,
  algorithmIdentifier,
  genRandomElements,
  handleDataSetSizeChange,
}) {
  return (
    <section className="data-configure-section">
      {algorithmTitles.map((eachTitle) => {
        const formattedTitle = eachTitle.split("-").join(" ");
        return (
          <button
            key={eachTitle}
            onClick={() => algorithmIdentifier(eachTitle)}
          >
            {formattedTitle}
          </button>
        );
      })}

      {randomizeConfiguration.map((eachConfig) => (
        <button
          key={eachConfig.title}
          onClick={() =>
            genRandomElements(eachConfig.direction, eachConfig.shuffle)
          }
        >
          {eachConfig.title}
        </button>
      ))}

      <input
        type="number"
        value={dataSetSize}
        onChange={(event) => handleDataSetSizeChange(event.target.value)}
      />
      {/* <input
        type="number"
        value={animationInterval}
        onChange={(event) => setAnimationInterval(event.target.value)}
      /> */}
    </section>
  );
}
