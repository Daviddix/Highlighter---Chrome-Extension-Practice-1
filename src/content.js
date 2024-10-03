document.addEventListener("mouseup",async ()=>{
    highlightText()
})

chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse){
        if(request.color){
            document.documentElement.setAttribute("style", `--highlighter-color: ${request.color}`)

            await chrome.storage.local.set({color: request.color})

        }else if(request.elementsArray){
            const array = request.elementsArray
            if(array.length !== 0){
                array.forEach((element)=>{
                    const realElement = document.querySelector(element.uniqueSelector)

                    realElement.outerHTML = element.outerHTML
                })
            }            
        }else{
            console.log("not " + request)

        }

        sendResponse({
            status : "seen"
        })
    }
)

async function highlightText(){
    const selection = document.getSelection()
    
    if (selection.toString().trim() !== "") {
        const range = selection.getRangeAt(0)
        const selectedText = selection.toString()

        const span = document.createElement("span")
        span.classList.add("highlight");
        span.textContent = selectedText

        range.deleteContents()
        range.insertNode(span)


        const containerElement = range.commonAncestorContainer.nodeType === 3 
                                  ? range.commonAncestorContainer.parentNode 
                                  : range.commonAncestorContainer;



        function getCssSelector(el) {
        names = [];
        do {
            index = 0;
            var cursorElement = el;
            while (cursorElement !== null) {
            ++index;
            cursorElement =
                cursorElement.previousElementSibling;
            }
            names.unshift(
            el.tagName + ":nth-child(" + index + ")"
            );
            el = el.parentElement;
        } while (el !== null);

        return names.join(" > ");
        }

        const serializedElement = {
            outerHTML: containerElement.outerHTML,
            uniqueSelector : getCssSelector(containerElement) 
        }


        const highlightedElementsInStorage = await chrome.storage.local.get(["highlightedElements"])

        const previousElementsArray = highlightedElementsInStorage.highlightedElements || []


        previousElementsArray.push(serializedElement)


        await chrome.storage.local.set({ highlightedElements: previousElementsArray })

        console.log('Elements in storage:', previousElementsArray)
    }
}