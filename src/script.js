const allButtons = document.querySelectorAll(".colors-container > button")

allButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        if(button.classList.contains("active")){
            button.classList.remove("active")
        }
        else{
            removeAllClasses()
            button.classList.add("active")
            changeHighlightColor(button.dataset.color)
        }
    })
})

function removeAllClasses(){
    allButtons.forEach((button)=>{
        button.classList.remove("active")
    })
}

async function changeHighlightColor(color){
    try{
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
        await chrome.tabs.sendMessage(tab.id, {
            color: color
        })
        console.log("color changed")
    }
    catch(err){
        console.log(err)
    }
}