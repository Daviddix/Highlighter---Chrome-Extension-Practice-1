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

function addActiveToSpecificButton(buttonUniqueColorName){
    removeAllClasses()
    allButtons.forEach((button)=>{
        if(button.dataset.color == buttonUniqueColorName){
            button.classList.add("active")
        }
    })
}

async function checkStorageForCurrentColor(){
    try{
        const colorInStorage = await chrome.storage.local.get(["color"])
        if(Object.entries(colorInStorage).length !== 0){
            addActiveToSpecificButton(colorInStorage.color)
        }
    }catch(err){
        console.error(err)
    }
}

checkStorageForCurrentColor()