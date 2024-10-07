
export const ParamFrom = ({ selectedNode }) => {
  return (
    <div className="params">
        <div>
          <h3>{selectedNode.label}</h3>
          <p>{selectedNode.description}</p>
        </div>
        <div>
          <h4>Parameters</h4>
          <form>
            {selectedNode.params.map((param, index) => (
              <div key={index}>
                <label>{param.name}: </label>
                <input type="text" value={param.value} />
              </div>
            ))}
          </form>
        </div>
    </div>
  );
};

