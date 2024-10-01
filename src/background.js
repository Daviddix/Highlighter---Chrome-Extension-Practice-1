async function getColorOnInitialPageLoad(tabId) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['./src/content.js']
        })

        const {color} = await chrome.storage.local.get(["color"])
        if(color){
             await chrome.tabs.sendMessage(tabId, {color})
        }else{
         await chrome.tabs.sendMessage(tabId, {
            color: "yellow"
        })
    }
    } catch (error) {
        console.error("Error sending message: ", error);
    }
}


chrome.tabs.onUpdated.addListener(async (tabId,tab, changeInfo) => {
           if (tab.status == "complete") {
             if (!changeInfo.url.startsWith('chrome://') && !changeInfo.url.startsWith('chrome-extension://')) {
                 getColorOnInitialPageLoad(tabId)
             } else {
                 console.log("Cannot run on internal Chrome pages.");
             }
           }
})