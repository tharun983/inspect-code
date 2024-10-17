document.getElementById('downloadCode').addEventListener('click', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: downloadPageSource
        }
      );
    });
  });
  
  function downloadPageSource() {
    const htmlContent = document.documentElement.outerHTML;
    const cssLinks = Array.from(document.styleSheets).map(sheet => sheet.href);
    
    chrome.runtime.sendMessage({ html: htmlContent, css: cssLinks });
  }
  