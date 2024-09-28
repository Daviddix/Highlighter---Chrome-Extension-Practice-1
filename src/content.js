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