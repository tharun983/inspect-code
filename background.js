chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.html) {
      console.log("HTML content received for download");
  
      // Convert HTML content to a Data URL
      const htmlDataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(message.html);
      
      // Download HTML file
      chrome.downloads.download({
        url: htmlDataUrl,
        filename: 'page.html'
      });
  
      // Fetch and download CSS files
      message.css.forEach((cssUrl, index) => {
        console.log(`Fetching CSS file: ${cssUrl}`);
        fetch(cssUrl)
          .then(response => response.text())
          .then(cssContent => {
            // Convert CSS content to a Data URL
            const cssDataUrl = 'data:text/css;charset=utf-8,' + encodeURIComponent(cssContent);
            
            // Download CSS file
            chrome.downloads.download({
              url: cssDataUrl,
              filename: `style${index + 1}.css`
            });
          })
          .catch(err => console.error(`Failed to fetch CSS file: ${err}`));
      });
    } else {
      console.error("No HTML content received");
    }
  });
  