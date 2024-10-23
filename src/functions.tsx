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
  // Add your logic for running up to the selected step
    //clear the graph and reset the file name
    graph.clearCells()
    onOpen(graph);
};

// ========================================
// save pipeline to session storage when the page is closed
export function savePipelineInSession (graph){
    // Save pipeline to session storage
    // show spinner
    document.getElementById('savingSpinner')!.style.display = ''
    const pipeline = graph.toJSON()
    sessionStorage.setItem('pipeline', JSON.stringify(pipeline))
    sessionStorage.setItem('projName', document.getElementById('projName')!.innerText)

    // delay 1 second to show spinner
    delay(1000).then(() => {
        // hide spinner
        document.getElementById('savingSpinner')!.style.display = 'none'
    })
}

export function saveFileA(graph) {
    let projName = document.getElementById('projName')!.innerText
    if (projName.includes("Error")) {}

    let graphJson = graph.toJSON()
    let graphString = JSON.stringify(graphJson, null, 2);
    let blob = new Blob([graphString], { type: 'application/json' })
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.download = "pipeline.json"
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
    savePipelineInSession(graph)

    const dirHandle = (window as any).showDirectoryPicker();
    console.log(dirHandle)

    document.getElementById('projName')!.innerText = projName;

}

export const onSave = (graph) => {
  console.log('Saving the pipeline...');
  // Add your logic for running up to the selected step
    saveFileA(graph);
};


export const onOpen = async (graph) => {
  console.log('Opening a folder...');

  try {
      const dirHandle = await (window as any).showDirectoryPicker();
      console.log(dirHandle)

      // Loop through the directory entries
        for await (const [name, handle] of dirHandle) {
            if (handle.kind === 'file' && name === "pipeline.json") {

                const file = await handle.getFile();
                let reader = new FileReader()
                reader.onload = (e) => {
                    let graphString = e.target?.result as string
                    let graphJson = JSON.parse(graphString)
                    graph.fromJSON(graphJson)
                }
                reader.readAsText(file)
            }
        }
        // Update the label to show the folder's name (or path if available)
        const projName = document.getElementById('projName');
        projName!.textContent = `Project: ${dirHandle.name}`;
  } catch (e){

  }

};
