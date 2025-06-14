import { useState, useEffect, useRef } from "react";
import "../styles/SortingVisualizer.css";
import { algorithmInfo } from "../data/algorithmInfo";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from "../algorithms/sortingAlgorithms";
import {
  FiCopy,
  FiMinimize2,
  FiMaximize2,
  FiTrash2,
  FiInfo,
  FiCode,
} from "react-icons/fi";
import AlgorithmInfo from "./AlgorithmInfo";

// Color constants for visualization
const UNSORTED = "#9CB4CC";
const SORTED = "mediumspringgreen";
const COMPARE = "crimson";
const SELECTED = "blueviolet";
const LEFT = "gold";
const RIGHT = "orangered";

// Configuration constants
const MIN_SIZE = 2;
const MAX_SIZE = 13;
const DEFAULT_SIZE = 8;
const MIN_SPEED = 1;
const MAX_SPEED = 5;
const DEFAULT_SPEED = 3;
const WAITING_TIME = 100; // Base delay for animations

// Mapping from display names to AlgorithmInfo keys
const ALGO_KEY_MAP = {
  "Bubble Sort": "bubbleSort",
  "Selection Sort": "selectionSort",
  "Insertion Sort": "insertionSort",
  "Merge Sort": "mergeSort",
  "Quicksort": "quickSort",
  "Heapsort": "heapSort",
};

const SortingVisualizer = () => {
  // State for the main array and its visualization
  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]); // Second array for comparison mode
  const [colorStates, setColorStates] = useState([]);
  const [colorStates2, setColorStates2] = useState([]);

  // Configuration state
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  // Algorithm selection state
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [isSorting, setIsSorting] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [algo1, setAlgo1] = useState("Bubble Sort");
  const [algo2, setAlgo2] = useState("Selection Sort");
  const [metrics, setMetrics] = useState({
    swaps: 0,
    comparisons: 0,
    comparisonSwaps: 0,
    comparisonComparisons: 0,
  });

  // UI state
  const [activeTab, setActiveTab] = useState("js");
  const [showWarning, setShowWarning] = useState(false);

  // Code highlighting
  const [currentLine, setCurrentLine] = useState(-1); // For code highlighting

  const delay = useRef(WAITING_TIME * Math.pow(2, MAX_SPEED - speed));

  // Generates a new random array and resets all states
  const generateArray = () => {
    const newArray = [];
    const newColorStates = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 99) + 1);
      newColorStates.push("unsorted");
    }
    setArray(newArray);
    setArray2([...newArray]); // Keep both arrays in sync
    setColorStates(newColorStates);
    setColorStates2([...newColorStates]);
    setShowWarning(false);
    setCurrentLine(-1);
  };

  // Initialize array on mount and when size changes
  useEffect(() => {
    generateArray();
  }, [size]);

  // Update animation speed when speed changes
  useEffect(() => {
    delay.current = WAITING_TIME * Math.pow(2, MAX_SPEED - speed);
  }, [speed]);

  // Updates the visualization of the main array
  const updateVisual = (
    newArray,
    newColorStates,
    comparisonMade = false,
    swapMade = false,
    swappedIndices = [],
    lineNumber = -1
  ) => {
    setArray([...newArray]);
    setColorStates([...newColorStates]);

    if (lineNumber >= 0) {
      setCurrentLine(lineNumber);
    }
  };

  // Updates the visualization of the comparison array
  const updateVisual2 = (
    newArray,
    newColorStates,
    comparisonMade = false,
    swapMade = false
  ) => {
    setArray2([...newArray]);
    setColorStates2([...newColorStates]);
  };

  // Handles array size changes
  const handleSizeChange = (increment) => {
    if (isSorting) return;

    const newSize = increment
      ? Math.min(size + 1, MAX_SIZE)
      : Math.max(size - 1, MIN_SIZE);

    setSize(newSize);
  };

  // Handles speed changes
  const handleSpeedChange = (increment) => {
    const newSpeed = increment
      ? Math.min(speed + 1, MAX_SPEED)
      : Math.max(speed - 1, MIN_SPEED);

    setSpeed(newSpeed);
  };

  // Main sorting function
  const handleSort = async () => {
    if (isSorting) return;

    if (!selectedAlgorithm) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    setIsSorting(true);
    setShowWarning(false);
    setMetrics({
      swaps: 0,
      comparisons: 0,
      comparisonSwaps: 0,
      comparisonComparisons: 0,
    });

    const arrayCopy = [...array];
    const colorStatesCopy = Array(array.length).fill("unsorted");

    try {
      // Execute the selected algorithm
      switch (selectedAlgorithm) {
        case "Bubble Sort":
          await bubbleSort(
            arrayCopy,
            updateVisual,
            delay.current,
            (comparisons, swaps) => {
              setMetrics((prev) => ({ ...prev, comparisons, swaps }));
            }
          );
          break;
        case "Selection Sort":
          await selectionSort(
            arrayCopy,
            updateVisual,
            delay.current,
            (comparisons, swaps) => {
              setMetrics((prev) => ({ ...prev, comparisons, swaps }));
            }
          );
          break;
        case "Insertion Sort":
          await insertionSort(
            arrayCopy,
            updateVisual,
            delay.current,
            (comparisons, swaps) => {
              setMetrics((prev) => ({ ...prev, comparisons, swaps }));
            }
          );
          break;
        case "Merge Sort":
          await mergeSort(
            arrayCopy,
            0,
            arrayCopy.length - 1,
            updateVisual,
            delay.current,
            (comparisons, swaps) => {
              setMetrics((prev) => ({ ...prev, comparisons, swaps }));
            }
          );
          break;
        case "Quicksort":
          await quickSort(
            arrayCopy,
            0,
            arrayCopy.length - 1,
            updateVisual,
            delay.current,
            (comparisons, swaps) => {
              setMetrics((prev) => ({ ...prev, comparisons, swaps }));
            }
          );
          break;
        case "Heapsort":
          await heapSort(
            arrayCopy,
            updateVisual,
            delay.current,
            (comparisons, swaps) => {
              setMetrics((prev) => ({ ...prev, comparisons, swaps }));
            }
          );
          break;
        default:
          break;
      }

      // Mark all elements as sorted when complete
      setColorStates(Array(array.length).fill("sorted"));
    } catch (error) {
      console.error("Sorting error:", error);
    } finally {
      setIsSorting(false);
    }
  };

  // Toggles comparison mode
  const handleCompareToggle = () => {
    if (isSorting) return;
    setCompareMode(!compareMode);
    if (!compareMode) {
      setAlgo1(selectedAlgorithm || "");
      setAlgo2("Selection Sort");
    }
  };

  // Runs comparison between two algorithms
  const handleCompare = async () => {
    if (isSorting || !algo1 || !algo2) return;

    setIsSorting(true);
    setMetrics({
      swaps: 0,
      comparisons: 0,
      comparisonSwaps: 0,
      comparisonComparisons: 0,
    });

    const arrayCopy1 = [...array];
    const arrayCopy2 = [...array];

    try {
      // Run both algorithms in parallel
      await Promise.all([
        runAlgorithm(algo1, arrayCopy1, updateVisual, (comparisons, swaps) => {
          setMetrics((prev) => ({ ...prev, comparisons, swaps }));
        }),
        runAlgorithm(algo2, arrayCopy2, updateVisual2, (comparisons, swaps) => {
          setMetrics((prev) => ({
            ...prev,
            comparisonComparisons: comparisons,
            comparisonSwaps: swaps,
          }));
        }),
      ]);

      // Mark both arrays as sorted when complete
      setColorStates(Array(array.length).fill("sorted"));
      setColorStates2(Array(array.length).fill("sorted"));
    } catch (error) {
      console.error("Comparison error:", error);
    } finally {
      setIsSorting(false);
    }
  };

  // Helper function to run a specific algorithm
  const runAlgorithm = async (
    algorithm,
    arr,
    updateFunction,
    onMetricsUpdate
  ) => {
    switch (algorithm) {
      case "Bubble Sort":
        return await bubbleSort(
          arr,
          updateFunction,
          delay.current,
          onMetricsUpdate
        );
      case "Selection Sort":
        return await selectionSort(
          arr,
          updateFunction,
          delay.current,
          onMetricsUpdate
        );
      case "Insertion Sort":
        return await insertionSort(
          arr,
          updateFunction,
          delay.current,
          onMetricsUpdate
        );
      case "Merge Sort":
        return await mergeSort(
          arr,
          0,
          arr.length - 1,
          updateFunction,
          delay.current,
          onMetricsUpdate
        );
      case "Quicksort":
        return await quickSort(
          arr,
          0,
          arr.length - 1,
          updateFunction,
          delay.current,
          onMetricsUpdate
        );
      case "Heapsort":
        return await heapSort(
          arr,
          updateFunction,
          delay.current,
          onMetricsUpdate
        );
      default:
        return arr;
    }
  };

  // Returns CSS class based on element state
  const getElementClass = (state) => {
    switch (state) {
      case "sorted":
        return "element-sorted";
      case "compare":
        return "element-compare";
      case "selected":
        return "element-selected";
      case "left":
        return "element-left";
      case "right":
        return "element-right";
      default:
        return "element-unsorted";
    }
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h1 className="visualizer-title">Sorting Visualizer</h1>
      </div>

      <div className="bento-grid">
        {/* Array Visualization Section */}
        <div className="bento-section array-section">
          {compareMode ? (
            <div className="split-array-container">
              <div className="array-container-half">
                <div className="array-label">{algo1}</div>
                {array.map((value, idx) => (
                  <div
                    key={idx}
                    className={`array-element ${getElementClass(
                      colorStates[idx]
                    )}`}
                  >
                    {value}
                  </div>
                ))}
              </div>
              <div className="array-container-half">
                <div className="array-label">{algo2}</div>
                {array2.map((value, idx) => (
                  <div
                    key={idx}
                    className={`array-element ${getElementClass(
                      colorStates2[idx]
                    )}`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="array-container">
              {array.map((value, idx) => (
                <div
                  key={idx}
                  className={`array-element ${getElementClass(
                    colorStates[idx]
                  )}`}
                >
                  {value}
                </div>
              ))}
            </div>
          )}

          {/* Color Legend */}
          <div className="color-legend">
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: UNSORTED }}
              ></div>
              <span>Unsorted</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: SORTED }}
              ></div>
              <span>Sorted</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: COMPARE }}
              ></div>
              <span>Comparing</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: SELECTED }}
              ></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: LEFT }}
              ></div>
              <span>Left</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: RIGHT }}
              ></div>
              <span>Right</span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bento-section controls-section">
          <div className="controls-panel">
            <div className="algorithm-selectors">
              <div className="algorithm-selector">
                <select
                  value={compareMode ? algo1 : selectedAlgorithm}
                  onChange={(e) =>
                    compareMode
                      ? setAlgo1(e.target.value)
                      : setSelectedAlgorithm(e.target.value)
                  }
                  disabled={isSorting}
                >
                  <option value="Bubble Sort">Bubble Sort</option>
                  <option value="Selection Sort">Selection Sort</option>
                  <option value="Insertion Sort">Insertion Sort</option>
                  <option value="Merge Sort">Merge Sort</option>
                  <option value="Quicksort">Quicksort</option>
                  <option value="Heapsort">Heapsort</option>
                </select>
              </div>

              {compareMode && (
                <div
                  className="algorithm-selector"
                  style={{ marginTop: "10px" }}
                >
                  <select
                    value={algo2}
                    onChange={(e) => setAlgo2(e.target.value)}
                    disabled={isSorting}
                  >
                    <option value="Bubble Sort">Bubble Sort</option>
                    <option value="Selection Sort">Selection Sort</option>
                    <option value="Insertion Sort">Insertion Sort</option>
                    <option value="Merge Sort">Merge Sort</option>
                    <option value="Quicksort">Quicksort</option>
                    <option value="Heapsort">Heapsort</option>
                  </select>
                </div>
              )}
            </div>

            <div className="controls-right">
              <div className="action-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={compareMode ? handleCompare : handleSort}
                  disabled={isSorting || (compareMode && (!algo1 || !algo2))}
                >
                  {compareMode ? "Compare" : "Sort"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={generateArray}
                  disabled={isSorting}
                >
                  Randomize
                </button>
                <button
                  className={`btn ${
                    compareMode ? "btn-compare active" : "btn-compare"
                  }`}
                  onClick={handleCompareToggle}
                  disabled={isSorting}
                >
                  Compare Mode
                </button>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                {/* Size Control */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={{ fontWeight: "600", margin: "2px" }}>Size:</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      className="btn-control"
                      onClick={() => handleSizeChange(false)}
                      disabled={isSorting || size <= MIN_SIZE}
                    >
                      -
                    </button>
                    <div
                      style={{
                        fontWeight: "600",
                        width: "30px",
                        textAlign: "center",
                      }}
                    >
                      {size}
                    </div>
                    <button
                      className="btn-control"
                      onClick={() => handleSizeChange(true)}
                      disabled={isSorting || size >= MAX_SIZE}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Speed Control */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={{ fontWeight: "600", margin: "2px" }}>Speed:</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      className="btn-control"
                      onClick={() => handleSpeedChange(false)}
                      disabled={speed <= MIN_SPEED}
                    >
                      -
                    </button>
                    <div
                      style={{
                        fontWeight: "600",
                        width: "30px",
                        textAlign: "center",
                      }}
                    >
                      {speed}
                    </div>
                    <button
                      className="btn-control"
                      onClick={() => handleSpeedChange(true)}
                      disabled={speed >= MAX_SPEED}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showWarning && (
            <div className="warning-message">
              Please select an algorithm first!
            </div>
          )}
        </div>

        {/* Algorithm Info Section */}
        <div className="bento-section info-section">
          <AlgorithmInfo
            selectedAlgorithm={ALGO_KEY_MAP[compareMode ? algo1 : selectedAlgorithm]}
            comparisonAlgorithm={ALGO_KEY_MAP[algo2]}
            comparisonMode={compareMode}
            metrics={metrics}
          />
        </div>

        {/* Code Implementation Section */}
        <div className="bento-section code-section">
          <div className="section-header">
            <div className="code-title">
              <h2 className="section-title">Algorithm Implementation</h2>
            </div>
          </div>

          {compareMode && algo1 && algo2 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* First Algorithm */}
              <div>
                <h3 className="algorithm-title">{algo1}</h3>
                <div className="procedure">
                  <ol className="procedure-steps">
                    {algorithmInfo[algo1]?.procedure.map((step, idx) => (
                      <li key={idx} className="procedure-step">{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="code-tabs">
                  <button
                    className={`code-tab ${activeTab === "js" ? "active" : ""}`}
                    onClick={() => setActiveTab("js")}
                  >
                    js
                  </button>
                  <button
                    className={`code-tab ${activeTab === "cpp" ? "active" : ""}`}
                    onClick={() => setActiveTab("cpp")}
                  >
                    c++
                  </button>
                  <button
                    className={`code-tab ${activeTab === "py" ? "active" : ""}`}
                    onClick={() => setActiveTab("py")}
                  >
                    py
                  </button>
                </div>
                <div className="code-content" style={{ height: "auto", overflow: "visible" }}>
                  <div className="code-block" style={{ height: "auto", minHeight: "350px" }}>
                    <div className="code-block-header">
                      <div className="code-block-dots">
                        <div className="code-block-dot"></div>
                        <div className="code-block-dot"></div>
                        <div className="code-block-dot"></div>
                      </div>
                      <div className="code-block-title">
                        {algo1}.{activeTab === "js" ? "js" : activeTab === "cpp" ? "cpp" : "py"}
                      </div>
                    </div>
                    <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(algorithmInfo[algo1]?.code[activeTab] || ""); }}>
                      <FiCopy className="copy-tooltip" />
                    </button>
                    <pre style={{ height: "auto" }}>
                      {(algorithmInfo[algo1]?.code[activeTab] || "").split("\n").map((line, idx) => (
                        <div key={idx} className={`code-line ${currentLine === idx ? "highlighted" : ""}`}>
                          <span className="code-line-number">{idx + 1}</span>
                          <span className="code-line-content">{line}</span>
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Second Algorithm */}
              <div>
                <h3 className="algorithm-title">{algo2}</h3>
                <div className="procedure">
                  <ol className="procedure-steps">
                    {algorithmInfo[algo2]?.procedure.map((step, idx) => (
                      <li key={idx} className="procedure-step">{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="code-tabs">
                  <button
                    className={`code-tab ${activeTab === "js" ? "active" : ""}`}
                    onClick={() => setActiveTab("js")}
                  >
                    js
                  </button>
                  <button
                    className={`code-tab ${activeTab === "cpp" ? "active" : ""}`}
                    onClick={() => setActiveTab("cpp")}
                  >
                    c++
                  </button>
                  <button
                    className={`code-tab ${activeTab === "py" ? "active" : ""}`}
                    onClick={() => setActiveTab("py")}
                  >
                    py
                  </button>
                </div>
                <div className="code-content" style={{ height: "auto", overflow: "visible" }}>
                  <div className="code-block" style={{ height: "auto", minHeight: "350px" }}>
                    <div className="code-block-header">
                      <div className="code-block-dots">
                        <div className="code-block-dot"></div>
                        <div className="code-block-dot"></div>
                        <div className="code-block-dot"></div>
                      </div>
                      <div className="code-block-title">
                        {algo2}.{activeTab === "js" ? "js" : activeTab === "cpp" ? "cpp" : "py"}
                      </div>
                    </div>
                    <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(algorithmInfo[algo2]?.code[activeTab] || ""); }}>
                      <FiCopy className="copy-tooltip"/>
                    </button>
                    <pre style={{ height: "auto" }}>
                      {(algorithmInfo[algo2]?.code[activeTab] || "").split("\n").map((line, idx) => (
                        <div key={idx} className="code-line">
                          <span className="code-line-number">{idx + 1}</span>
                          <span className="code-line-content">{line}</span>
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedAlgorithm ? (
            <>
              <div className="procedure">
                <h3 className="procedure-title">Steps</h3>
                <ol className="procedure-steps">
                  {algorithmInfo[selectedAlgorithm]?.procedure.map(
                    (step, idx) => (
                      <li key={idx} className="procedure-step">
                        {step}
                      </li>
                    )
                  )}
                </ol>
              </div>

              <div className="code-tabs">
                <button
                  className={`code-tab ${activeTab === "js" ? "active" : ""}`}
                  onClick={() => setActiveTab("js")}
                >
                  js
                </button>
                <button
                  className={`code-tab ${activeTab === "cpp" ? "active" : ""}`}
                  onClick={() => setActiveTab("cpp")}
                >
                  c++
                </button>
                <button
                  className={`code-tab ${activeTab === "py" ? "active" : ""}`}
                  onClick={() => setActiveTab("py")}
                >
                  py
                </button>
              </div>

              <div className="code-content" style={{ height: "auto", overflow: "visible" }}>
                <div className="code-block" style={{ height: "auto", minHeight: "350px" }}>
                  <div className="code-block-header">
                    <div className="code-block-dots">
                      <div className="code-block-dot"></div>
                      <div className="code-block-dot"></div>
                      <div className="code-block-dot"></div>
                    </div>
                    <div className="code-block-title">
                      {selectedAlgorithm}.
                      {activeTab === "js"
                        ? "js"
                        : activeTab === "cpp"
                        ? "cpp"
                        : "py"}
                    </div>
                  </div>
                  <button
                    className="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        algorithmInfo[selectedAlgorithm]?.code[activeTab] || ""
                      );
                    }}
                  >
                    <FiCopy className="copy-tooltip" />
                  </button>
                  <pre style={{ height: "auto" }}>
                    {(algorithmInfo[selectedAlgorithm]?.code[activeTab] || "")
                      .split("\n")
                      .map((line, idx) => (
                        <div
                          key={idx}
                          className={`code-line ${
                            currentLine === idx ? "highlighted" : ""
                          }`}
                        >
                          <span className="code-line-number">{idx + 1}</span>
                          <span className="code-line-content">{line}</span>
                        </div>
                      ))}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <p>Select an algorithm to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
