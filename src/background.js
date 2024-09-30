async function getColorOnInitialPageLoad(tabId) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['./src/content.js']
        });

        const response = await chrome.tabs.sendMessage(tabId, {
            color: "yellow"
        });
        console.log(response);
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