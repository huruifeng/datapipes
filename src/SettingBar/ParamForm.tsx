
export const ParamFrom = ({ selectedNode }) => {
    let label_style = {
        display: 'inline-block',
        width: '180px',
    }
    let input_style = {
        width: '100px',
    }
    let form_str =
    selectedNode.params.map((param, index) => (
        <div key={index}>
            <label style={label_style}>{param.name}: </label>
            {/*<input style={input_style} type="text" name={param.name} defaultValue={param.value}/>*/}
            {param.type === 'text' && <input style={input_style} type="text" defaultValue={param.value}/> }
            {param.type === 'int' && <input style={input_style} type="range" min="0" max="100" step="1" defaultValue={param.value}/> }
            {param.type === 'color' && <input style={input_style} type="color" defaultValue={param.value}/> }
            {param.type === 'checkbox' && <input style={input_style} type="checkbox" defaultChecked={param.value=="True"}/> }
            {param.type === 'select' && <select style={input_style}> {param.options.map((option, index) => (<option key={index} value={option}>{option}</option>))} </select> }
            {param.type === 'file' && <input style={input_style} type="file"/> }
            {param.type === 'date' && <input style={input_style} type="date" defaultValue={param.value}/> }


        </div>
    ))


    return (
        <div className="params">
            <div>
                <h3>{selectedNode.label}</h3>
                <p>{selectedNode.description}</p>
            </div>
            <div>
                <h4>Parameters</h4>
                <form>{form_str}</form>
            </div>
        </div>
    );
};

