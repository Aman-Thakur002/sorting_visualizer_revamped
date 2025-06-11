{compareMode && algo1 && algo2 ? (
  <div
    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
  >
    {/* First Algorithm */}
    <div>
      <h3 className="algorithm-title">{algo1}</h3>
      {algorithmInfo[algo1]?.description && (
        <div className="algorithm-description" style={{ marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          {algorithmInfo[algo1].description}
        </div>
      )}
      <div className="procedure">
        <h4 className="procedure-title">Implementation Steps</h4>
        <ol className="procedure-steps">
          {algorithmInfo[algo1]?.procedure.map((step, idx) => (
            <li key={idx} className="procedure-step">
              <strong>Step {idx + 1}:</strong> {step}
              {algorithmInfo[algo1]?.stepDetails && algorithmInfo[algo1].stepDetails[idx] && (
                <div className="step-details" style={{ marginLeft: "1.5rem", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {algorithmInfo[algo1].stepDetails[idx]}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      {algorithmInfo[algo1]?.implementationNotes && (
        <div className="implementation-notes" style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "var(--bg-box)", borderRadius: "8px", border: "1px solid var(--border)" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>Implementation Notes</h4>
          <ul style={{ listStyle: "disc", marginLeft: "1.5rem", color: "var(--text-secondary)" }}>
            {algorithmInfo[algo1].implementationNotes.map((note, idx) => (
              <li key={idx} style={{ marginBottom: "0.3rem" }}>{note}</li>
            ))}
          </ul>
        </div>
      )}
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
      {algorithmInfo[algo2]?.description && (
        <div className="algorithm-description" style={{ marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          {algorithmInfo[algo2].description}
        </div>
      )}
      <div className="procedure">
        <h4 className="procedure-title">Implementation Steps</h4>
        <ol className="procedure-steps">
          {algorithmInfo[algo2]?.procedure.map((step, idx) => (
            <li key={idx} className="procedure-step">
              <strong>Step {idx + 1}:</strong> {step}
              {algorithmInfo[algo2]?.stepDetails && algorithmInfo[algo2].stepDetails[idx] && (
                <div className="step-details" style={{ marginLeft: "1.5rem", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {algorithmInfo[algo2].stepDetails[idx]}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      {algorithmInfo[algo2]?.implementationNotes && (
        <div className="implementation-notes" style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "var(--bg-box)", borderRadius: "8px", border: "1px solid var(--border)" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>Implementation Notes</h4>
          <ul style={{ listStyle: "disc", marginLeft: "1.5rem", color: "var(--text-secondary)" }}>
            {algorithmInfo[algo2].implementationNotes.map((note, idx) => (
              <li key={idx} style={{ marginBottom: "0.3rem" }}>{note}</li>
            ))}
          </ul>
        </div>
      )}
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
    <h3 className="algorithm-title">{selectedAlgorithm}</h3>
    {algorithmInfo[selectedAlgorithm]?.description && (
      <div className="algorithm-description" style={{ marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
        {algorithmInfo[selectedAlgorithm].description}
      </div>
    )}
    <div className="procedure">
      <h4 className="procedure-title">Implementation Steps</h4>
      <ol className="procedure-steps">
        {algorithmInfo[selectedAlgorithm]?.procedure.map(
          (step, idx) => (
            <li key={idx} className="procedure-step">
              <strong>Step {idx + 1}:</strong> {step}
              {algorithmInfo[selectedAlgorithm]?.stepDetails && algorithmInfo[selectedAlgorithm].stepDetails[idx] && (
                <div className="step-details" style={{ marginLeft: "1.5rem", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {algorithmInfo[selectedAlgorithm].stepDetails[idx]}
                </div>
              )}
            </li>
          )
        )}
      </ol>
    </div>
    {algorithmInfo[selectedAlgorithm]?.implementationNotes && (
      <div className="implementation-notes" style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "var(--bg-box)", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <h4 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>Implementation Notes</h4>
        <ul style={{ listStyle: "disc", marginLeft: "1.5rem", color: "var(--text-secondary)" }}>
          {algorithmInfo[selectedAlgorithm].implementationNotes.map((note, idx) => (
            <li key={idx} style={{ marginBottom: "0.3rem" }}>{note}</li>
          ))}
        </ul>
      </div>
    )}
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
) 