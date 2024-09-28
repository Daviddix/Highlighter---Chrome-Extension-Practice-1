const allButtons = document.querySelectorAll(".colors-container > button")

allButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        if(button.classList.contains("active")){
            button.classList.remove("active")
        }
        else{
            removeAllClasses()
            button.classList.add("active")
        }
    })
})

function removeAllClasses(){
    allButtons.forEach((button)=>{
        button.classList.remove("active")
    })
}