const allButtons = document.querySelectorAll(".colors-container > button")
const activateButton = document.querySelector("button.switch")

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

activateButton.addEventListener("click", async (e)=>{

    const btn = e.target

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

    if(btn.classList.contains("active")){

        await chrome.tabs.sendMessage(tab.id, {
            switch: "off"
        })

        btn.classList.remove("active")

        chrome.action.setIcon( {
            path : 
            {32 : "./assets/images/inactive-icon.png"}
        }
    )

        btn.innerText = "Activate Highlighting"

    }else{

        await chrome.tabs.sendMessage(tab.id, {
            switch: "on"
        })

        btn.classList.add("active")

        chrome.action.setIcon( {
            path : 
            {32 : "./assets/images/icon-32.png"}
        }
    )

         btn.innerText = "Deactivate Highlighting"
    }
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

async function checkStorageForActiveStatus(){
    try{
        const statusInStorage = await chrome.storage.local.get(["switch"])

        const switchValue = statusInStorage.switch

        if(switchValue == "on"){

            activateButton.classList.add("active")
            activateButton.innerText = "Deactivate Highlighting"
            
        }else if(switchValue == "off"){

            activateButton.classList.remove("active")
            activateButton.innerText = "Activate Highlighting"

        }else{
            alert("Wrong Switch Value Passed")
        }
        
    }catch(err){
        console.error(err)
    }
}

checkStorageForActiveStatus()

checkStorageForCurrentColor()