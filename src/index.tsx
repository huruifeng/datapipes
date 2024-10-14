import './index.css';
import "./graph.tsx";

// @ts-ignore
import {graph, NodeStatus, stencil} from './graph.tsx';

// @ts-ignore
import ToolBar from './ToolBar/index.tsx';
// @ts-ignore
import ReactDOM from 'react-dom';

// @ts-ignore
import * as nodes from './nodes.tsx';
// @ts-ignore
import SettingBar from "./SettingBar/index.tsx";


// ========================================
stencil.load([nodes.panda_df_read_csv,nodes.panda_df_to_csv], 'inout')

const manipulate_nodes = [
  nodes.panda_df_dropna,nodes.panda_df_fillna,nodes.panda_df_drop,nodes.panda_df_drop_duplicates,
  nodes.panda_df_melt,nodes.panda_df_merge,nodes.panda_df_pivot,nodes.panda_df_concat,
  nodes.panda_df_filter_col,nodes.panda_df_filter_row]
stencil.load(manipulate_nodes, 'manipulate')

const plot_nodes = [
  nodes.panda_df_plot_bar,nodes.panda_df_plot_line,nodes.panda_df_plot_pie, nodes.panda_df_plot_scatter,
  nodes.panda_df_plot_hist,nodes.panda_df_plot_box,nodes.panda_df_plot_area, nodes.panda_df_plot_kde,
  nodes.panda_df_plot_hexbin,]
stencil.load(plot_nodes, 'plotting')

stencil.load([nodes.n2,nodes.n3], 'mlmodels')

// ========================================
const delay = ms => new Promise(res => setTimeout(res, ms));

// 显示节点状态
const showNodeStatus = async (statusList: NodeStatus[][]) => {
  const status = statusList.shift()
  status?.forEach((item) => {
    const { id, status } = item
    const node = graph.getCellById(id)
    const data = node.getData() as NodeStatus
    node.setData({
      ...data,
      status,
    })
  })
  setTimeout(() => {
    showNodeStatus(statusList)
  }, 5000)
}

// ========================================
const checkPipelineInSession = () => {
    const pipeline = sessionStorage.getItem('pipeline')
    if (pipeline) {
        graph.fromJSON(JSON.parse(pipeline))
    }
}

window.onload = () => {
    checkPipelineInSession()
    document.getElementById('fileName')!.innerText = "Remember to save"
    // showNodeStatus(statusList)
}

// ========================================
// save pipeline to session storage when the page is closed
const savePipelineInSession = async () => {
    // Save pipeline to session storage
    // show spinner
    document.getElementById('savingSpinner')!.style.display = ''
    const pipeline = graph.toJSON()
    sessionStorage.setItem('pipeline', JSON.stringify(pipeline))

    // delay 1 second to show spinner
    await delay(2000)
    // hide spinner
    document.getElementById('savingSpinner')!.style.display = 'none'
}
window.addEventListener('beforeunload', savePipelineInSession)

// Save pipeline to session storage automatically every 5 seconds
setInterval(() => {
    savePipelineInSession()
}, 30*1000)

// ========================================
// Define the pipeline control functions
const runCurrent = () => {
  console.log('Running current pipeline step...');
  // Add your logic for running the current pipeline step
};

const runSelected = () => {
  console.log('Running selected pipeline step...');
  // Add your logic for running the selected step
};

const runToSelected = () => {
  console.log('Running pipeline up to selected step...');
  // Add your logic for running up to the selected step
};

const onNew = () => {
  console.log('Saving the pipeline...');
  // Add your logic for running up to the selected step
    //clear the graph and reset the file name
    graph.clearCells()
    document.getElementById('fileName')!.innerText = 'Unsaved pipeline'
};

// ========================================
function saveFileA() {
    let fileName = document.getElementById('fileName')!.innerText
    if (fileName === 'Unsaved pipeline' || fileName === 'Remember to save') {
        fileName = 'pipeline.json'
    }
    let graphJson = graph.toJSON()
    let graphString = JSON.stringify(graphJson, null, 2);
    let blob = new Blob([graphString], { type: 'application/json' })
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.download = fileName
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
    savePipelineInSession()

    document.getElementById('fileName')!.innerText = "Remember to save"

}

const onSave = () => {
  console.log('Saving the pipeline...');
  // Add your logic for running up to the selected step
    saveFileA();
};


const onFileOpen = () => {
  console.log('Open a pipeline from file...');
  // Add your logic for running up to the selected step
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
        let file = (e.target as HTMLInputElement).files![0]
        let reader = new FileReader()
        reader.onload = (e) => {
            let graphString = e.target?.result as string
            let graphJson = JSON.parse(graphString)
            graph.fromJSON(graphJson)

            let fileName = file.name
            document.getElementById('fileName')!.innerText = fileName
        }
        reader.readAsText(file)
    }
    input.click()
};

// ========================================
const selectedNode = null;
ReactDOM.render(<ToolBar onRunCurrent={runCurrent} onRunSelected={runSelected} onRunToSelected={runToSelected} onNew={onNew} onSave={onSave} onFileOpen={onFileOpen} />, document.getElementById('right-top'));
ReactDOM.render(<SettingBar selectedNode={selectedNode} />, document.getElementById('settingBar'));




