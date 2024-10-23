import './index.css';
import "./graph.tsx";

// @ts-ignore
import {graph, NodeStatus, stencil} from './graph.tsx';

// @ts-ignore
import ToolBar from './ToolBar';
// @ts-ignore
import ReactDOM from 'react-dom';

// @ts-ignore
import * as nodes from './nodes.tsx';
// @ts-ignore
import SettingBar from "./SettingBar";

import Modal from "./Modal"

// @ts-ignore
import {onOpen, onNew, onSave, runPipeline, runSelected, runToSelected, savePipelineInSession} from './functions.jsx';
// @ts-ignore
import {toggleModal} from './functions.jsx';


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

window.addEventListener('beforeunload', savePipelineInSession)

// Save pipeline to session storage automatically every 5 seconds
setInterval(() => {
    savePipelineInSession(graph)
}, 30*1000)

// 显示节点状态
const showNodeStatus = async (statusList: NodeStatus[][]) => {
  const status = statusList.shift()
  status?.forEach((item) => {
    const { id, status } = item
    const node = graph.getCellById(id)
    const data = node.getData()
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

// Function to open/close modal based on isOpen value
const checkPipelineInSession = () => {
    const pipeline = sessionStorage.getItem('pipeline')
    if (pipeline) {
        graph.fromJSON(JSON.parse(pipeline))
        console.log("Loaded pipeline from session")
    }else{
        console.log("No pipeline in session")
    }

    var modal = document.getElementById('myModal');
    let projName = sessionStorage.getItem('projName')
    if (projName){
        console.log("projName in session")
        if(projName.includes("Error")){
            console.log("projName Error")
            toggleModal(modal,true);
        }else{
            document.getElementById('projName').innerText = projName
            toggleModal(modal,false);
        }
    }else{
        console.log("projName not in session")
        toggleModal(modal,true);
    }

}

window.onload = () => {
    checkPipelineInSession()
    // showNodeStatus(statusList)
}

// ========================================
const selectedNode = null;

ReactDOM.render(<ToolBar onRunPipeline={runPipeline} onRunSelected={runSelected} onRunToSelected={runToSelected} onNew={()=>onNew(graph)} onSave={()=>onSave(graph)} onOpen={()=>onOpen(graph)} />, document.getElementById('right-top'));
ReactDOM.render(<SettingBar selectedNode={selectedNode} />, document.getElementById('settingBar'));
ReactDOM.render( <Modal isOpen={true} />, document.getElementById('modalWin'));




