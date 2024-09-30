document.addEventListener("mouseup", ()=>{
    const selection = document.getSelection()
    
    
    if (selection.toString().trim() !== "") {
        const range = selection.getRangeAt(0)
        const selectedText = selection.toString()
        
        
        const span = document.createElement("span")
        span.classList.add("highlight")
        span.textContent = selectedText
        
        
        range.deleteContents()
        range.insertNode(span)
        
        console.log("You Selected: " + selectedText)
    }
    

})

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse){

        if(Object.entries(request.color).length !== 0){
            console.log(request.color)

            document.documentElement.setAttribute("style", `--highlighter-color: ${request.color}`)

            await chrome.storage.local.set({color: request.color})

        }else{
            
            console.log("not " + request)

        }

        sendResponse({
            status : "seen"
        })
    }
)