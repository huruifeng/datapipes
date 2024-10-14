// @ts-ignore
import {graph, NodeStatus} from './graph.tsx';
// @ts-ignore
import React from "react";
import { Graph, Path } from '@antv/x6'

import { register } from '@antv/x6-react-shape'
// @ts-ignore
import ReactDOM from "react-dom";

// @ts-ignore
import SettingBar from "./SettingBar/index.tsx";

const imageShapes = [
  {label: 'Client', image: './images/computer-solid.svg',},
  {label: 'Http', image:'./images/cloud-solid.svg',},
  {label: 'Api', image:'./images/server-solid.svg',},
  {label: 'SQL', image:'./images/computer-solid.svg',},
  {label: 'Clound', image:'./images/computer-solid.svg',},
  {label: 'Mq', image:'./images/computer-solid.svg',},
]
export const imageNodes = imageShapes.map((item) =>
  graph.createNode({
    shape: 'custom-image',
    label: item.label,
    attrs: {
      image: {
        'xlink:href': item.image,
      },
    },
  }),
)


// ========================================
const image = {
  logo: './images/setting.png',
  success: './images/success.png',
  default: './images/play.png',
  failed: './images/failed.png',
  running: './images/running.png',
}

const AlgoNode = (props) => {
  const { node } = props
  const data = node?.getData() as NodeStatus
  const { label, status = 'default', info_url = "https://pandas.pydata.org/docs/reference/index.html", description="" } = data

  return (
    <div className={`node ${status}`} >
      <img src={image.logo} alt="logo" onClick={() => showSetting(node)}  />
      <span className="label">{label}</span>
        <span className="status">
        {status === 'default' && <img src={image.default} alt="default" />}
        {status === 'success' && <img src={image.success} alt="success" />}
        {status === 'failed' && <img src={image.failed} alt="failed" />}
        {status === 'running' && <img src={image.running} alt="running" />}
      </span>
    </div>
  )
}

register({
  shape: 'dag-node',
  width: 150,
  height: 36,
  component: AlgoNode,
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
  },
})

Graph.registerEdge('dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 2,
        targetMarker: "classic",
      },
    },
  },
  true,
)

Graph.registerConnector('algo-connector',
  (s, e) => {
    const offset = 4
    const deltaY = Math.abs(e.y - s.y)
    const control = Math.floor((deltaY / 3) * 2)

    const v1 = { x: s.x, y: s.y + offset + control }
    const v2 = { x: e.x, y: e.y - offset - control }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
    )
  },
  true,
)

const showSetting = (node)=>{
    // console.log('node:click', node
    const selectedNode = node.getData() as NodeStatus
    console.log(selectedNode)
  ReactDOM.render(<SettingBar selectedNode={selectedNode} />, document.getElementById('settingBar'));

}

// ========================================
export const panda_df_read_csv = graph.createNode({
    id: "panda_df_read_csv",
    shape: "dag-node",
    data: {label: "read_csv", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html", description:"Read a comma-separated values (csv) file into DataFrame",
        params: [
            {name:"filepath", value:"", type:"file"}, {name: "sep", value:",",type:"text"}, {name:"header",valur:'infer',type:"text"}, {name:"index_col", value: "None",type:"text"},
            {name:"usecols", value:"None",type:"text"}, {name:"dtype", value:"None",type:"text"}, {name:"engine", value:"None",type:"select", options:["None","C"]}, {name:"converters", value:"None",type:"text"},
            {name:"true_values", value:"None",type:"text"}, {name:"false_values", value:"None",type:"text"}, {name:"skipinitialspace", value:"False",type:"text"}, {name:"skiprows", value:"None",type:"text"},
            {name:"skipfooter", value:"0",type:"text"}, {name:"nrows", value:"None",type:"text"}, {name:"na_values", value:"None",type:"text"}, {name:"keep_default_na", value:"True",type:"checkbox"}, {name:"na_filter", value:"True",type:"checkbox"},
            {name:"skip_blank_lines", value:"True",type:"checkbox"}, {name:"parse_dates", value:"None", type:"checkbox"}, {name:"infer_datetime_format", value:"False",type:"checkbox"}, {name:"keep_date_col", value:"<no_default>",type:"text"},
            {name:"date_format", value:"None",type:"text"}, {name:"dayfirst", value:"False",type:"checkbox"}, {name:"cache_dates", value:"True",type:"checkbox"}, {name:"iterator", value:"False",type:"checkbox"},
            {name:"chunksize", value:"None",type:"text"}, {name:"compression", value:"infer",type:"text"}, {name:"thousands", value:"None",type:"text"}, {name:"decimal", value:".",type:"text"},
            {name:"lineterminator", value:"None",type:"text"}, {name:"quotechar", value:"\"",type:"text"}, {name:"quoting", value:"0",type:"text"}, {name:"doublequote", value:"True",type:"text"},
            {name:"escapechar", value:"None",type:"text"}, {name:"comment", value:"None",type:"text"}, {name:"encoding", value:"None",type:"text"}, {name:"encoding_errors", value:"strict",type:"text"},
            {name:"dialect", value:"None",type:"text"}, {name:"on_bad_lines", value:"error",type:"text"}, {name:"delim_whitespace", value:"<no_default>",type:"text"}, {name:"low_memory", value:"True",type:"checkbox"},
            {name:"memory_map", value:"False",type:"checkbox"}, {name:"float_precision", value:"None",type:"text"}, {name:"storage_options", value:"None",type:"text"}
        ]
    },
    ports: [{id: "panda_df_read_csv_b", group: "bottom"}],

  },
)

export const panda_df_to_csv = graph.createNode({
    id: "panda_df_to_csv",
    shape: "dag-node",
    data: {label: "to_csv", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.to_csv.html", description:"Write object to a comma-separated values (csv) file",
        params: [
            {name:"path_or_buf", value:"None"}, {name: "sep", value:","}, {name:"na_rep",valur:''}, {name:"float_format", value: "None"},
            {name:"columns", value:"None"}, {name:"header", value:"True"}, {name:"index", value:"True"}, {name:"index_label", value:"None"},
            {name:"mode", value:"w"}, {name:"encoding", value:"None"}, {name:"compression", value:"infer"}, {name:"quoting", value:"None"},
            {name:"quotechar", value:"\""}, {name:"lineterminator", value:"None"}, {name:"chunksize", value:"None"}, {name:"date_format", value:"None"},
            {name:"doublequote", value:"True"}, {name:"escapechar", value:"None"}, {name:"decimal", value:"."}, {name:"errors", value:"strict"},
            {name:"storage_options", value:"None"}
        ]
    },
    ports: [{id: "panda_df_to_csv_t", group: "top"}],

  },
)

// ========================================
export const panda_df_drop_duplicates = graph.createNode({
    id: "panda_df_drop_duplicates",
    shape: "dag-node",
    data: {label: "drop_dup", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html", description:"Return DataFrame with duplicate rows removed",
        params: [
            {name:"subset", value:"None"}, {name: "keep", value:"first"}, {name:"inplace",valur:'False'}, {name:"ignore_index", value: "False"},
        ]
    },
    ports: [{id: "panda_df_drop_duplicates_t", group: "top"}, {id: "panda_df_drop_duplicates_b", group: "bottom"}]
  },
)
export const panda_df_melt = graph.createNode({
    id: "panda_df_melt",
    shape: "dag-node",
    data: {label: "melt", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.melt.html", description:"Write object to a comma-separated values (csv) file",
        params: [
            {name:"id_vars", value:"None"}, {name: "value_vars", value:"None"}, {name:"var_name",valur:'None'}, {name:"value_name", value: "value"},
            {name:"col_level", value:"None"}, {name:"ignore_index", value:"True"}, {name:"var_name", value:"None"}, {name:"value_name", value:"value"},
            {name:"col_level", value:"None"}, {name:"ignore_index", value:"True"},
        ]
    },
    ports: [{id: "panda_df_melt_t", group: "top"}, {id: "panda_df_melt_b", group: "bottom"}]
  },
)

export const panda_df_pivot = graph.createNode({
    id: "panda_df_pivot",
    shape: "dag-node",
    data: {label: "pivot", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.melt.html", description:"Write object to a comma-separated values (csv) file",
        params: [
            {name:"index", value:"None"}, {name: "columns", value:"None"}, {name:"values",valur:'None'}, {name:"aggfunc", value: "None"},
            {name:"fill_value", value:"None"}, {name:"margins", value:"False"}, {name:"dropna", value:"True"}, {name:"margins_name", value:"All"},
        ]
    },
    ports: [{id: "panda_df_pivot_t", group: "top"}, {id: "panda_df_pivot_b", group: "bottom"}]
  },
)

export const panda_df_merge = graph.createNode({
    id: "panda_df_merge",
    shape: "dag-node",
    data: {label: "merge", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.merge.html", description:"Merge DataFrame or named Series objects with a database-style join",
        params: [
            {name:"right", value:"None"}, {name: "how", value:"inner"}, {name:"on",valur:'None'}, {name:"left_on", value: "None"},
            {name:"right_on", value:"None"}, {name:"left_index", value:"False"}, {name:"right_index", value:"False"}, {name:"sort", value:"False"},
            {name:"suffixes", value:"('_x', '_y')"}, {name:"copy", value:"True"}, {name:"indicator", value:"False"}, {name:"validate", value:"None"},
        ]
    },
    ports: [{id: "panda_df_merge_t", group: "top"}, {id: "panda_df_merge_b", group: "bottom"}]
  },
)

export const panda_df_concat = graph.createNode({
    id: "panda_df_concat",
    shape: "dag-node",
    data: {label: "concat", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.concat.html", description:"Concatenate pandas objects along a particular axis with optional set logic along the other axes",
        params: [
            {name:"objs", value:"None"}, {name: "axis", value:"0"}, {name:"join",valur:'outer'}, {name:"ignore_index", value: "False"},
            {name:"keys", value:"None"}, {name:"levels", value:"None"}, {name:"names", value:"None"}, {name:"verify_integrity", value:"False"},
            {name:"sort", value:"False"}, {name:"copy", value:"True"}, {name:"indicator", value:"False"}, {name:"validate", value:"None"},
        ]
    },
    ports: [{id: "panda_df_concat_t", group: "top"}, {id: "panda_df_concat_b", group: "bottom"}]
  },
)

export const panda_df_dropna = graph.createNode({
    id: "panda_df_dropna",
    shape: "dag-node",
    data: {label: "dropna", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dropna.html", description:"Remove missing values",
        params: [
            {name:"axis", value:"0"}, {name: "how", value:"any"}, {name:"thresh",valur:'None'}, {name:"subset", value: "None"},
            {name:"inplace", value:"False"}, {name:"errors", value:"raise"},
        ]
    },
    ports: [{id: "panda_df_dropna_t", group: "top"}, {id: "panda_df_dropna_b", group: "bottom"}]
  },
)

export const panda_df_fillna = graph.createNode({
    id: "panda_df_fillna",
    shape: "dag-node",
    data: {label: "fillna", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html", description:"Fill NA/NaN values using the specified method",
        params: [
            {name:"value", value:"None"}, {name: "method", value:"None"}, {name:"axis",valur:'None'}, {name:"inplace", value: "False"},
            {name:"limit", value:"None"}, {name:"downcast", value:"None"},
        ]
    },
    ports: [{id: "panda_df_fillna_t", group: "top"}, {id: "panda_df_fillna_b", group: "bottom"}]
  },
)

export const panda_df_drop = graph.createNode({
    id: "panda_df_drop",
    shape: "dag-node",
    data: {label: "drop", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html", description:"Drop specified labels from rows or columns",
        params: [
            {name:"labels", value:"None"}, {name: "axis", value:"0"}, {name:"index",valur:'None'}, {name:"columns", value: "None"},
            {name:"level", value:"None"}, {name:"inplace", value:"False"}, {name:"errors", value:"raise"},
        ]
    },
    ports: [{id: "panda_df_drop_t", group: "top"}, {id: "panda_df_drop_b", group: "bottom"}]
  },
)

export const panda_df_filter_row = graph.createNode({
    id: "panda_df_filter_row",
    shape: "dag-node",
    data: {label: "filter_row", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html", description:"Drop specified labels from rows or columns",
        params: [
            {name:"labels", value:"None"}, {name: "axis", value:"0"}, {name:"index",valur:'None'}, {name:"columns", value: "None"},
            {name:"level", value:"None"}, {name:"inplace", value:"False"}, {name:"errors", value:"raise"},
        ]
    },
    ports: [{id: "panda_df_filter_row_t", group: "top"}, {id: "panda_df_filter_row_b", group: "bottom"}]
  },
)

export const panda_df_filter_col = graph.createNode({
    id: "panda_df_filter_col",
    shape: "dag-node",
    data: {label: "filter_col", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html", description:"Drop specified labels from rows or columns",
        params: [
            {name:"labels", value:"None"}, {name: "axis", value:"0"}, {name:"index",valur:'None'}, {name:"columns", value: "None"},
            {name:"level", value:"None"}, {name:"inplace", value:"False"}, {name:"errors", value:"raise"},
        ]
    },
    ports: [{id: "panda_df_filter_col_t", group: "top"}, {id: "panda_df_filter_col_b", group: "bottom"}]
  },
)

// ========================================
export const panda_df_plot_bar = graph.createNode({
    id: "panda_df_plot_bar",
    shape: "dag-node",
    data: {label: "plot_bar", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.bar.htm", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"x", value:"None"}, {name: "y", value:"None"}, {name:"kind",valur:'bar'}, {name:"ax", value: "None"},
            {name:"subplots", value:"False"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"}, {name:"layout", value:"None"},
            {name:"figsize", value:"None"}, {name:"use_index", value:"True"}, {name:"title", value:"None"}, {name:"grid", value:"None"},
            {name:"legend", value:"True"}, {name:"style", value:"None"}, {name:"logx", value:"False"}, {name:"logy", value:"False"},
            {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"}, {name:"xlim", value:"None"},
            {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"}, {name:"colormap", value:"None"},
            {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"}, {name:"stacked", value:"False"},
            {name:"sort_columns", value:"False"}, {name:"secondary_y", value:"False"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"},
            {name:"backend", value:"None"}, {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_bar_t", group: "top"}, {id: "panda_df_plot_bar_b", group: "bottom"}]
  },
)

export const panda_df_plot_line = graph.createNode({
    id: "panda_df_plot_line",
    shape: "dag-node",
    data: {label: "plot_line", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.line.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"x", value:"None"}, {name: "y", value:"None"}, {name:"kind",valur:'line'}, {name:"ax", value: "None"},
            {name:"subplots", value:"False"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"}, {name:"layout", value:"None"},
            {name:"figsize", value:"None"}, {name:"use_index", value:"True"}, {name:"title", value:"None"}, {name:"grid", value:"None"},
            {name:"legend", value:"True"}, {name:"style", value:"None"}, {name:"logx", value:"False"}, {name:"logy", value:"False"},
            {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"}, {name:"xlim", value:"None"},
            {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"}, {name:"colormap", value:"None"},
            {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"}, {name:"stacked", value:"False"},
            {name:"sort_columns", value:"False"}, {name:"secondary_y", value:"False"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"},
            {name:"backend", value:"None"}, {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_line_t", group: "top"}, {id: "panda_df_plot_line_b", group: "bottom"}]
  },
)

export const panda_df_plot_pie = graph.createNode({
    id: "panda_df_plot_pie",
    shape: "dag-node",
    data: {label: "plot_pie", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.pie.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"y", value:"None"}, {name: "figsize", value:"None"}, {name:"ax",valur:'None'}, {name:"subplots", value: "False"},
            {name:"autopct", value:"None"}, {name:"pctdistance", value:"0.6"}, {name:"colors", value:"None"}, {name:"startangle", value:"None"},
            {name:"counterclock", value:"True"}, {name:"labels", value:"None"}, {name:"labeldistance", value:"1.1"}, {name:"radius", value:"None"},
            {name:"rotatelabels", value:"False"}, {name:"center", value:"None"}, {name:"frame", value:"False"}, {name:"title", value:"None"},
            {name:"legend", value:"False"}, {name:"fontsize", value:"None"}, {name:"colormap", value:"None"}, {name:"table", value:"False"},
            {name:"yerr", value:"None"}, {name:"xerr", value:"None"}, {name:"stacked", value:"False"}, {name:"sort_columns", value:"False"},
            {name:"secondary_y", value:"False"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"}, {name:"backend", value:"None"},
            {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_pie_t", group: "top"}, {id: "panda_df_plot_pie_b", group: "bottom"}]
  },
)

export const panda_df_plot_hist = graph.createNode({
    id: "panda_df_plot_hist",
    shape: "dag-node",
    data: {label: "plot_hist", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.hist.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"by", value:"None"}, {name: "bins", value:"10"}, {name:"**kwargs",valur:'None'}, {name:"ax", value: "None"},
            {name:"grid", value:"True"}, {name:"xlabelsize", value:"None"}, {name:"xrot", value:"None"}, {name:"ylabelsize", value:"None"},
            {name:"yrot", value:"None"}, {name:"figsize", value:"None"}, {name:"layout", value:"None"}, {name:"bins", value:"None"},
            {name:"backend", value:"None"}, {name:"legend", value:"False"}, {name:"title", value:"None"}, {name:"density", value:"False"},
            {name:"xlim", value:"None"}, {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"},
            {name:"colormap", value:"None"}, {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"},
            {name:"stacked", value:"False"}, {name:"align", value:"right"}, {name:"orientation", value:"vertical"}, {name:"log", value:"False"},
            {name:"color", value:"None"}, {name:"position", value:"0"}, {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_hist_t", group: "top"}, {id: "panda_df_plot_hist_b", group: "bottom"}]
  },
)

export const panda_df_plot_scatter = graph.createNode({
    id: "panda_df_plot_scatter",
    shape: "dag-node",
    data: {label: "plot_scatter", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.scatter.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"x", value:"None"}, {name: "y", value:"None"}, {name:"s",valur:'None'}, {name:"c", value: "None"},
            {name:"**kwargs", value:"None"}, {name:"ax", value:"None"}, {name:"subplots", value:"False"}, {name:"sharex", value:"None"},
            {name:"sharey", value:"False"}, {name:"layout", value:"None"}, {name:"figsize", value:"None"}, {name:"use_index", value:"True"},
            {name:"title", value:"None"}, {name:"grid", value:"None"}, {name:"legend", value:"True"}, {name:"style", value:"None"},
            {name:"logx", value:"False"}, {name:"logy", value:"False"}, {name:"loglog", value:"False"}, {name:"xticks", value:"None"},
            {name:"yticks", value:"None"}, {name:"xlim", value:"None"}, {name:"ylim", value:"None"}, {name:"rot", value:"None"},
            {name:"fontsize", value:"None"}, {name:"colormap", value:"None"}, {name:"colorbar", value:"None"}, {name:"position", value:"None"},
            {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"}, {name:"secondary_y", value:"False"}, {name:"sort_columns", value:"False"},
            {name:"backend", value:"None"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"},
        ]
    },
    ports: [{id: "panda_df_plot_scatter_t", group: "top"}, {id: "panda_df_plot_scatter_b", group: "bottom"}]
  },
)

export const panda_df_plot_box = graph.createNode({
    id: "panda_df_plot_box",
    shape: "dag-node",
    data: {label: "plot_box", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.box.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"by", value:"None"}, {name: "subplots", value:"False"}, {name:"figsize",valur:'None'}, {name:"grid", value: "True"},
            {name:"layout", value:"None"}, {name:"ax", value:"None"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"},
            {name:"title", value:"None"}, {name:"fontsize", value:"None"}, {name:"rot", value:"None"}, {name:"ax", value:"None"},
            {name:"backend", value:"None"}, {name:"legend", value:"False"}, {name:"style", value:"None"}, {name:"logx", value:"False"},
            {name:"logy", value:"False"}, {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"},
            {name:"xlim", value:"None"}, {name:"ylim", value:"None"}, {name:"fontsize", value:"None"}, {name:"colormap", value:"None"},
            {name:"position", value:"0"}, {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"},
            {name:"secondary_y", value:"False"}, {name:"sort_columns", value:"False"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"},
            {name:"boxprops", value:"None"}, {name:"whiskerprops", value:"None"}, {name:"capprops", value:"None"}, {name:"flierprops", value:"None"},
            {name:"medianprops", value:"None"}, {name:"meanprops", value:"None"}, {name:"meanline", value:"False"}, {name:"showmeans", value:"False"},
            {name:"showcaps", value:"True"}, {name:"showbox", value:"True"}, {name:"showfliers", value:"True"}, {name:"notch", value:"False"},
            {name:"bootstrap", value:"None"}, {name:"patch_artist", value:"False"}, {name:"positions", value:"None"}, {name:"widths", value:"None"},
            {name:"manage_ticks", value:"True"}, {name:"zorder", value:"None"}, {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_box_t", group: "top"}, {id: "panda_df_plot_box_b", group: "bottom"}]
  },
)

export const panda_df_plot_area = graph.createNode({
    id: "panda_df_plot_area",
    shape: "dag-node",
    data: {label: "plot_area", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.area.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"x", value:"None"}, {name: "y", value:"None"}, {name:"stacked",valur:'False'}, {name:"**kwargs", value: "None"},
            {name:"ax", value:"None"}, {name:"subplots", value:"False"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"},
            {name:"layout", value:"None"}, {name:"figsize", value:"None"}, {name:"use_index", value:"True"}, {name:"title", value:"None"},
            {name:"grid", value:"None"}, {name:"legend", value:"True"}, {name:"style", value:"None"}, {name:"logx", value:"False"},
            {name:"logy", value:"False"}, {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"},
            {name:"xlim", value:"None"}, {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"},
            {name:"colormap", value:"None"}, {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"},
            {name:"secondary_y", value:"False"}, {name:"sort_columns", value:"False"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"},
            {name:"backend", value:"None"}, {name:"fill", value:"True"}, {name:"step", value:"None"}, {name:"stacked", value:"False"},
            {name:"data", value:"None"}, {name:"where", value:"None"}, {name:"bottom", value:"None"}, {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_area_t", group: "top"}, {id: "panda_df_plot_area_b", group: "bottom"}]
  },
)

export const panda_df_plot_kde = graph.createNode({
    id: "panda_df_plot_kde",
    shape: "dag-node",
    data: {label: "plot_kde", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.kde.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"bw_method", value:"None"}, {name: "ind", value:"None"}, {name:"**kwargs",valur:'None'}, {name:"ax", value: "None"},
            {name:"figsize", value:"None"}, {name:"use_index", value:"True"}, {name:"title", value:"None"}, {name:"grid", value:"None"},
            {name:"legend", value:"True"}, {name:"style", value:"None"}, {name:"logx", value:"False"}, {name:"logy", value:"False"},
            {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"}, {name:"xlim", value:"None"},
            {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"}, {name:"colormap", value:"None"},
            {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"}, {name:"stacked", value:"False"},
            {name:"sort_columns", value:"False"}, {name:"secondary_y", value:"False"}, {name:"mark_right", value:"True"}, {name:"include_bool", value:"True"},
            {name:"backend", value:"None"}, {name:"fill", value:"True"}, {name:"position", value:"0"}, {name:"legend", value:"False"},
            {name:"weights", value:"None"}, {name:"bw_method", value:"None"}, {name:"ind", value:"None"}, {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_kde_t", group: "top"}, {id: "panda_df_plot_kde_b", group: "bottom"}]
  },
)

export const panda_df_plot_hexbin = graph.createNode({
    id: "panda_df_plot_hexbin",
    shape: "dag-node",
    data: {label: "plot_hexbin", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.hexbin.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"x", value:"None"}, {name: "y", value:"None"}, {name:"C",valur:'None'}, {name:"reduce_C_function", value: "None"},
            {name:"gridsize", value:"100"}, {name:"colormap", value:"None"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"},
            {name:"figsize", value:"None"}, {name:"title", value:"None"}, {name:"fontsize", value:"None"}, {name:"legend", value:"True"},
            {name:"style", value:"None"}, {name:"logx", value:"False"}, {name:"logy", value:"False"}, {name:"loglog", value:"False"},
            {name:"xticks", value:"None"}, {name:"yticks", value:"None"}, {name:"xlim", value:"None"}, {name:"ylim", value:"None"},
            {name:"grid", value:"True"}, {name:"colorbar", value:"True"}, {name:"ax", value:"None"}, {name:"subplots", value:"False"},
            {name:"layout", value:"None"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"}, {name:"title", value:"None"},
            {name:"fontsize", value:"None"}, {name:"legend", value:"True"}, {name:"style", value:"None"}, {name:"logx", value:"False"},
            {name:"logy", value:"False"}, {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"},
            {name:"xlim", value:"None"}, {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"},
            {name:"colormap", value:"None"}, {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"},
            {name:"stacked", value:"False"}, {name:"sort_columns", value:"False"}, {name:"secondary_y", value:"False"}, {name:"mark_right", value:"True"},
            {name:"include_bool", value:"True"}, {name:"backend", value:"None"}, {name:"fill", value:"True"}, {name:"position", value:"0"},
            {name:"legend", value:"False"}, {name:"weights", value:"None"}, {name:"bw_method", value:"None"}, {name:"ind", value:"None"},
            {name:"**kwargs", value:"None"},
        ]
    },
    ports: [ {id: "panda_df_plot_hexbin_t", group: "top"}, {id: "panda_df_plot_hexbin_b", group: "bottom"}]
  },
)

export const panda_df_plot_show = graph.createNode({
    id: "panda_df_plot_show",
    shape: "dag-node",
    data: {label: "Show plot", status: "default", url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.hexbin.html", description:"Make plots of DataFrame using matplotlib / pylab",
        params: [
            {name:"x", value:"None"}, {name: "y", value:"None"}, {name:"C",valur:'None'}, {name:"reduce_C_function", value: "None"},
            {name:"gridsize", value:"100"}, {name:"colormap", value:"None"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"},
            {name:"figsize", value:"None"}, {name:"title", value:"None"}, {name:"fontsize", value:"None"}, {name:"legend", value:"True"},
            {name:"style", value:"None"}, {name:"logx", value:"False"}, {name:"logy", value:"False"}, {name:"loglog", value:"False"},
            {name:"xticks", value:"None"}, {name:"yticks", value:"None"}, {name:"xlim", value:"None"}, {name:"ylim", value:"None"},
            {name:"grid", value:"True"}, {name:"colorbar", value:"True"}, {name:"ax", value:"None"}, {name:"subplots", value:"False"},
            {name:"layout", value:"None"}, {name:"sharex", value:"None"}, {name:"sharey", value:"False"}, {name:"title", value:"None"},
            {name:"fontsize", value:"None"}, {name:"legend", value:"True"}, {name:"style", value:"None"}, {name:"logx", value:"False"},
            {name:"logy", value:"False"}, {name:"loglog", value:"False"}, {name:"xticks", value:"None"}, {name:"yticks", value:"None"},
            {name:"xlim", value:"None"}, {name:"ylim", value:"None"}, {name:"rot", value:"None"}, {name:"fontsize", value:"None"},
            {name:"colormap", value:"None"}, {name:"table", value:"False"}, {name:"yerr", value:"None"}, {name:"xerr", value:"None"},
            {name:"stacked", value:"False"}, {name:"sort_columns", value:"False"}, {name:"secondary_y", value:"False"}, {name:"mark_right", value:"True"},
            {name:"include_bool", value:"True"}, {name:"backend", value:"None"}, {name:"fill", value:"True"}, {name:"position", value:"0"},
            {name:"legend", value:"False"}, {name:"weights", value:"None"}, {name:"bw_method", value:"None"}, {name:"ind", value:"None"},
            {name:"**kwargs", value:"None"},
        ]
    },
    ports: [{id: "panda_df_plot_show_t", group: "top"},]
  },
)






export const n2 = graph.createNode(  {
    id: "2",
    shape: "dag-node",
    data: {label: "逻辑回归", status: "default",url:"https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html"},
    ports: [
      {id: "2-1", group: "top"},
      {id: "2-2", group: "bottom"},
      {id: "2-3", group: "bottom"}
    ]
  },
)

export const n3 = graph.createNode(  {
    id: "3",
    shape: "dag-node",
    data: {label: "模型预测", status: "default",url:"https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html"},
    ports: [
        {id: "3-1", group: "top"},
        {id: "3-2", group: "bottom"}
    ]
  },
)



