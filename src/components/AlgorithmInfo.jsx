import React from 'react';
import '../styles/SortingVisualizer.css';

// Algorithm definitions with improved clarity and accuracy
const ALGORITHMS = {
  bubbleSort: {
    name: "Bubble Sort",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description: "Repeatedly compares adjacent elements and swaps them if they are in the wrong order. The process repeats until the list is fully sorted.",
    link: "https://www.geeksforgeeks.org/bubble-sort/",
    category: "Simple",
    advantages: [
      "Easy to implement",
      "Efficient on nearly sorted or small datasets",
      "Stable sorting algorithm"
    ],
    disadvantages: [
      "Very inefficient on large lists",
      "Performs poorly compared to more advanced algorithms"
    ]
  },
  selectionSort: {
    name: "Selection Sort",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    description: "Selects the smallest element from the unsorted portion and swaps it with the first unsorted element, expanding the sorted portion step by step.",
    link: "https://www.geeksforgeeks.org/selection-sort/",
    category: "Simple",
    advantages: [
      "Simple to understand and implement",
      "Minimizes the number of swaps",
      "Good for small datasets"
    ],
    disadvantages: [
      "Always performs O(n²) comparisons",
      "Not stable (may change the order of equal elements)",
      "Inefficient on large datasets"
    ]
  },
  insertionSort: {
    name: "Insertion Sort",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description: "Builds the sorted array one element at a time by inserting each element into its correct position among previously sorted elements.",
    link: "https://www.geeksforgeeks.org/insertion-sort/",
    category: "Simple",
    advantages: [
      "Simple and intuitive",
      "Efficient for small or nearly sorted datasets",
      "Adaptive — performs well if data is partially sorted",
      "Stable sorting algorithm"
    ],
    disadvantages: [
      "Inefficient for large datasets",
      "Requires shifting elements during insertion"
    ]
  },
  mergeSort: {
    name: "Merge Sort",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    description: "Divides the array into halves recursively, sorts each half, and merges them to produce a sorted array. Offers consistent O(n log n) performance.",
    link: "https://www.geeksforgeeks.org/merge-sort/",
    category: "Efficient",
    advantages: [
      "Guaranteed O(n log n) time complexity",
      "Stable sorting algorithm",
      "Works well on linked lists and large datasets"
    ],
    disadvantages: [
      "Requires extra memory proportional to input size",
      "Slower than some algorithms for small datasets"
    ]
  },
  quickSort: {
    name: "Quick Sort",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    description: "Selects a pivot and partitions the array so elements less than the pivot come before it and those greater come after. Recursively applies the process to partitions.",
    link: "https://www.geeksforgeeks.org/quick-sort/",
    category: "Efficient",
    advantages: [
      "Very fast on average for large datasets",
      "In-place sorting, requires little extra memory",
      "Cache-friendly due to locality of reference"
    ],
    disadvantages: [
      "Unstable — does not preserve order of equal elements",
      "Worst-case time is O(n²), depending on pivot selection",
      "Poor pivot choice can degrade performance"
    ]
  },
  heapSort: {
    name: "Heap Sort",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
    description: "Builds a binary heap from the input data, then repeatedly extracts the maximum element to build the sorted array in place.",
    link: "https://www.geeksforgeeks.org/heap-sort/",
    category: "Efficient",
    advantages: [
      "In-place algorithm with O(1) extra space",
      "Consistent O(n log n) time complexity",
      "No worst-case performance degradation"
    ],
    disadvantages: [
      "Unstable sorting algorithm",
      "Slower than quicksort on average",
      "Less cache-friendly"
    ]
  }
};

// Helper to compare algorithms and provide user-friendly reasons
const compareAlgorithms = (algo1, algo2) => {
  const timeRank = {
    "O(n)": 1,
    "O(n log n)": 2,
    "O(n log² n)": 3,
    "O(n²)": 4,
    "O(n+k)": 1.5,
    "O(nk)": 1.5
  };

  const spaceRank = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(n)": 3,
    "O(n+k)": 3.5
  };

  const categoryRank = {
    "Linear": 1,
    "Efficient": 2,
    "Simple": 3
  };

  const a1 = ALGORITHMS[algo1];
  const a2 = ALGORITHMS[algo2];

  const score1 = timeRank[a1.timeComplexity.average] * 2 + spaceRank[a1.spaceComplexity] + categoryRank[a1.category];
  const score2 = timeRank[a2.timeComplexity.average] * 2 + spaceRank[a2.spaceComplexity] + categoryRank[a2.category];

  if (score1 < score2) {
    return {
      better: algo1,
      reasons: generateReasons(algo1, algo2)
    };
  } else if (score2 < score1) {
    return {
      better: algo2,
      reasons: generateReasons(algo2, algo1)
    };
  } else {
    return {
      better: null,
      reasons: [
        "Both algorithms have similar overall efficiency.",
        `${a1.name} is better suited for: ${getBetterScenarios(algo1)}.`,
        `${a2.name} is better suited for: ${getBetterScenarios(algo2)}.`
      ]
    };
  }
};

const generateReasons = (better, worse) => {
  const b = ALGORITHMS[better];
  const w = ALGORITHMS[worse];
  const reasons = [];

  if (b.timeComplexity.average !== w.timeComplexity.average) {
    reasons.push(`${b.name} has better average time complexity (${b.timeComplexity.average} vs ${w.timeComplexity.average}).`);
  }
  if (b.spaceComplexity !== w.spaceComplexity) {
    reasons.push(`${b.name} uses less memory (${b.spaceComplexity} vs ${w.spaceComplexity}).`);
  }
  if (b.stable && !w.stable) {
    reasons.push(`${b.name} is stable and preserves order of equal elements.`);
  }
  reasons.push(`${b.name} performs well on ${getBetterScenarios(better)}.`);

  return reasons;
};

const getBetterScenarios = (algo) => {
  switch (algo) {
    case "bubbleSort": return "small or nearly sorted datasets";
    case "selectionSort": return "small datasets where minimizing swaps matters";
    case "insertionSort": return "small or partially sorted datasets";
    case "mergeSort": return "large datasets where stable sorting is needed";
    case "quickSort": return "large datasets where average performance matters";
    case "heapSort": return "large datasets where worst-case guarantees are required";
    default: return "specific use cases";
  }
};

const AlgorithmInfo = ({
  selectedAlgorithm,
  comparisonAlgorithm,
  comparisonMode,
  metrics,
  currentStep,
  comparisonStep,
  onViewPseudocode
}) => {
  const comparison = comparisonMode ? compareAlgorithms(selectedAlgorithm, comparisonAlgorithm) : null;

  return (
    <div className="algorithm-info-content">
      <header className="algorithm-info-header">
        <h3>Algorithm Metrics</h3>
      </header>

      <div className={`metrics-grid ${!comparisonMode ? 'single-column' : ''}`}>
        {/* Selected Algorithm Metrics */}
        <section className={!comparisonMode ? 'full-width' : ''}>
          <div className="algorithm-label">
            <a
              href={ALGORITHMS[selectedAlgorithm].link}
              target="_blank"
              rel="noopener noreferrer"
              className="algorithm-name-link"
            >
              {ALGORITHMS[selectedAlgorithm].name}
            </a>
          </div>
          <div className="metrics-container">
            <div className="metric">
              <span className="metric-value">{metrics.comparisons}</span>
              <span className="metric-label">Comparisons</span>
            </div>
            <div className="metric">
              <span className="metric-value">{metrics.swaps}</span>
              <span className="metric-label">Swaps</span>
            </div>
          </div>
          {currentStep && (
            <div className="current-step">
              <p>{currentStep}</p>
            </div>
          )}
        </section>

        {/* Comparison Algorithm Metrics */}
        {comparisonMode && (
          <section>
            <div className="algorithm-label">
              <a
                href={ALGORITHMS[comparisonAlgorithm].link}
                target="_blank"
                rel="noopener noreferrer"
                className="algorithm-name-link"
              >
                {ALGORITHMS[comparisonAlgorithm].name}
              </a>
            </div>
            <div className="metrics-container">
              <div className="metric">
                <span className="metric-value">{metrics.comparisonComparisons}</span>
                <span className="metric-label">Comparisons</span>
              </div>
              <div className="metric">
                <span className="metric-value">{metrics.comparisonSwaps}</span>
                <span className="metric-label">Swaps</span>
              </div>
            </div>
            {comparisonStep && (
              <div className="current-step">
                <p>{comparisonStep}</p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Algorithm Description & Advantages/Disadvantages */}
      <section className="algorithm-details">
        {!comparisonMode && (
          <>
            <h4>Description</h4>
            <p className="algorithm-description">{ALGORITHMS[selectedAlgorithm].description}</p>

            <h4>Advantages</h4>
            <ul className="algorithm-list">
              {ALGORITHMS[selectedAlgorithm].advantages.map((adv, i) => <li key={i}>{adv}</li>)}
            </ul>

            <h4>Disadvantages</h4>
            <ul className="algorithm-list">
              {ALGORITHMS[selectedAlgorithm].disadvantages.map((disadv, i) => <li key={i}>{disadv}</li>)}
            </ul>
          </>
        )}

        {/* Comparison Results */}
        {comparisonMode && comparison && (
          <>
            <h4>Algorithm Comparison</h4>
            {comparison.better ? (
              <div className="comparison-result">
                <p className="algorithm-description">
                  <strong>{ALGORITHMS[comparison.better].name}</strong> is generally better than {comparison.better === selectedAlgorithm ? ALGORITHMS[comparisonAlgorithm].name : ALGORITHMS[selectedAlgorithm].name}.
                </p>
                <ul className="algorithm-list">
                  {comparison.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                </ul>
              </div>
            ) : (
              <div className="comparison-result">
                <p className="algorithm-description">{comparison.reasons[0]}</p>
                <ul className="algorithm-list">
                  <li>{comparison.reasons[1]}</li>
                  <li>{comparison.reasons[2]}</li>
                </ul>
              </div>
            )}
          </>
        )}
      </section>

      {/* Time and Space Complexity Table */}
      <table className="complexity-table">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Best Time</th>
            <th>Average Time</th>
            <th>Worst Time</th>
            <th>Space</th>
            <th>Stable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ALGORITHMS[selectedAlgorithm].name}</td>
            <td>{ALGORITHMS[selectedAlgorithm].timeComplexity.best}</td>
            <td>{ALGORITHMS[selectedAlgorithm].timeComplexity.average}</td>
            <td>{ALGORITHMS[selectedAlgorithm].timeComplexity.worst}</td>
            <td>{ALGORITHMS[selectedAlgorithm].spaceComplexity}</td>
            <td>{ALGORITHMS[selectedAlgorithm].stable ? "Yes" : "No"}</td>
          </tr>
          {comparisonMode && (
            <tr>
              <td>{ALGORITHMS[comparisonAlgorithm].name}</td>
              <td>{ALGORITHMS[comparisonAlgorithm].timeComplexity.best}</td>
              <td>{ALGORITHMS[comparisonAlgorithm].timeComplexity.average}</td>
              <td>{ALGORITHMS[comparisonAlgorithm].timeComplexity.worst}</td>
              <td>{ALGORITHMS[comparisonAlgorithm].spaceComplexity}</td>
              <td>{ALGORITHMS[comparisonAlgorithm].stable ? "Yes" : "No"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlgorithmInfo;
export { ALGORITHMS };
