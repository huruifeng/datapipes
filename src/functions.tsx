// ========================================
const delay = ms => new Promise(res => setTimeout(res, ms));

// Define the pipeline control functions
export const runPipeline = () => {
  console.log('Running current pipeline step...');
  // Add your logic for running the current pipeline step
};

export const runSelected = (node) => {
  console.log('Running selected pipeline step...');
  // Add your logic for running the selected step
};

export const runToSelected = () => {
  console.log('Running pipeline up to selected step...');
  // Add your logic for running up to the selected step
};

export const onNew = (graph) => {
  console.log('Saving the pipeline...');
  // Add your logic for running up to the selected step
    //clear the graph and reset the file name
    graph.clearCells()
    document.getElementById('fileName')!.innerText = 'Unsaved pipeline'
};

// ========================================
// save pipeline to session storage when the page is closed
export function savePipelineInSession (graph){
    // Save pipeline to session storage
    // show spinner
    document.getElementById('savingSpinner')!.style.display = ''
    const pipeline = graph.toJSON()
    sessionStorage.setItem('pipeline', JSON.stringify(pipeline))

    // delay 1 second to show spinner
    delay(1000).then(() => {
        // hide spinner
        document.getElementById('savingSpinner')!.style.display = 'none'
    })
}

export function saveFileA(graph) {
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
    savePipelineInSession(graph)

    document.getElementById('fileName')!.innerText = "Remember to save"

}

export const onSave = (graph) => {
  console.log('Saving the pipeline...');
  // Add your logic for running up to the selected step
    saveFileA(graph);
};


export const onFileOpen = (graph) => {
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
