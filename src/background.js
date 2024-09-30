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


chrome.tabs.onActivated.addListener(async (activeInfo) => {
            const tab = await chrome.tabs.get(activeInfo.tabId);

            if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
                getColorOnInitialPageLoad(activeInfo.tabId)
            } else {
                console.log("Cannot run on internal Chrome pages.");
            }
})