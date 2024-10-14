
import {Graph} from "@antv/x6";

import {Snapline} from "@antv/x6-plugin-snapline";
import { Selection } from '@antv/x6-plugin-selection'
import {Keyboard} from "@antv/x6-plugin-keyboard";
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'

import { Stencil } from '@antv/x6-plugin-stencil'

// ========================================
export interface NodeStatus {
    id: string
    status: 'default' | 'success' | 'failed' | 'running'
    label?: string
    info_url?: string
    description?: string
    params?: Array<{ name: string, value: string }>
}

// ========================================
// #region 初始化画布
  export const graph = new Graph({
    container: document.getElementById('graph'),
    grid: true,
    panning: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      snap: {radius: 100,},
      connector: 'algo-connector',
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      validateMagnet({ magnet }) {
        return magnet.getAttribute('port-group') !== 'top'
      },
      validateConnection({targetMagnet}) {
        return !!targetMagnet
      },
      createEdge() {
        return graph.createEdge({
          shape: 'dag-edge',
          attrs: {
            line: {
              strokeDasharray: '5 5',
            },
          },
          zIndex: -1,
        })
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4,
          },
        },
      },
    },
  })
// #endregion

// #region 使用插件
// graph.use(
//   new Transform({
//     resizing: true,
//     rotating: true,
//   }),
// )
graph.use(
    new Selection({
      multiple: true,
      rubberEdge: true,
      rubberNode: true,
      modifiers: 'shift',
      rubberband: true,
    }),
)
graph.use(new Snapline())
graph.use(new Keyboard())
graph.use(new Clipboard())
graph.use(new History())

graph.on('edge:connected', ({ edge }) => {
  edge.attr({
    line: {
      strokeDasharray: '',
    },
  })
})


graph.on('node:click', ({ e, x, y, node, view }) => {
    // console.log('node:click', node
    const selectedNode = node.getData() as NodeStatus
  console.log(selectedNode)
  // ReactDOM.render(<SettingBar selectedNode={selectedNode} />, document.getElementById('settingBar'));

})

graph.on('node:change:data', ({ node }) => {
  const edges = graph.getIncomingEdges(node)
  const { status } = node.getData() as NodeStatus
  edges?.forEach((edge) => {
    if (status === 'running') {
      edge.attr('line/strokeDasharray', 5)
      edge.attr('line/style/animation', 'running-line 30s infinite linear')
    } else {
      edge.attr('line/strokeDasharray', '')
      edge.attr('line/style/animation', '')
    }
  })
})
// #endregion

// ========================================
// #region 初始化 stencil
export const stencil = new Stencil({
  title: 'Processors',
  target: graph,
  stencilGraphHeight: 0,
  search(cell, keyword) {
    return (cell.getData().label.indexOf(keyword) !== -1)
  },
  placeholder: 'Search by processor name',
  notFoundText: 'Not Found',
  collapsable: true,
  groups: [
      {name: 'inout', title: 'Input/Output', collapsable: true,},
      {name: 'manipulate', title: 'Data Manipulation', collapsable: true,},
      {name: 'plotting', title: 'Plotting', collapsable: true,},
      {name: 'mlmodels', title: 'ML Models', collapsable: true,},
      {name: 'mlmetrics', title: 'ML Metrics', collapsable: true,},
      {name: 'mlvisual', title: 'ML Visualizations', collapsable: true,},
  ],
  layoutOptions: {
    columns: 2,
    columnWidth: 160,
    dx: 10,
    center: true,
    rowHeight: 50,
  },
})
document.getElementById('left').appendChild(stencil.container)

// ========================================
// #region 快捷键与事件
graph.bindKey(['meta+c', 'ctrl+c'], () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.copy(cells)
  }
  return false
})
graph.bindKey(['meta+x', 'ctrl+x'], () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.cut(cells)
  }
  return false
})
graph.bindKey(['meta+v', 'ctrl+v'], () => {
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste({ offset: 32 })
    graph.cleanSelection()
    graph.select(cells)
  }
  return false
})

// undo redo
graph.bindKey(['meta+z', 'ctrl+z'], () => {
  if (graph.canUndo()) {
    graph.undo()
  }
  return false
})
graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
  if (graph.canRedo()) {
    graph.redo()
  }
  return false
})

// select all
graph.bindKey(['meta+a', 'ctrl+a'], () => {
  const nodes = graph.getNodes()
  if (nodes) {
    graph.select(nodes)
  }
})

// delete
graph.bindKey('delete', () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.removeCells(cells)
  }
})

// zoom
graph.bindKey(['ctrl+1', 'meta+1'], () => {
  const zoom = graph.zoom()
  if (zoom < 1.5) {
    graph.zoom(0.1)
  }
})
graph.bindKey(['ctrl+2', 'meta+2'], () => {
  const zoom = graph.zoom()
  if (zoom > 0.5) {
    graph.zoom(-0.1)
  }
})

// ========================================
// 控制连接桩显示/隐藏
const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}
graph.on('node:mouseenter', () => {
  const container = document.getElementById('graph-container')!
  const ports = container.querySelectorAll('.x6-port-body',) as NodeListOf<SVGElement>
  showPorts(ports, true)
})
graph.on('node:mouseleave', () => {
  const container = document.getElementById('graph-container')!
  const ports = container.querySelectorAll('.x6-port-body',) as NodeListOf<SVGElement>
  showPorts(ports, false)
})
// #endregion


// #region 初始化图形
export const ports = {
  groups: {
    top: { position: 'top', attrs: {circle: {r: 4, magnet: true, stroke: '#5F95FF', strokeWidth: 1, fill: '#fff', style: {visibility: 'hidden',},},},},
    right: {position: 'right', attrs: {circle: {r: 4, magnet: true, stroke: '#5F95FF', strokeWidth: 1, fill: '#fff', style: {visibility: 'hidden',},},},},
    bottom: {position: 'bottom', attrs: {circle: {r: 4, magnet: true, stroke: '#5F95FF', strokeWidth: 1, fill: '#fff', style: {visibility: 'hidden',},},},},
    left:   { position: 'left', attrs: { circle: {r: 4, magnet: true, stroke: '#5F95FF', strokeWidth: 1, fill: '#fff', style: {visibility: 'hidden',},},},},
  },
  items: [{group: 'top',}, {group: 'right',}, {group: 'bottom',}, {group: 'left',},],
}

Graph.registerNode('custom-image',
  {
    inherit: 'rect',
    width: 52,
    height: 52,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#5F95FF',
        fill: '#5F95FF',
      },
      image: {
        width: 26,
        height: 26,
        refX: 13,
        refY: 16,
      },
      label: {
        refX: 3,
        refY: 2,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: { ...ports },
  },
  true,
)

// #endregion
