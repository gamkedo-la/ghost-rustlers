// downloadString

// turns any string into a text file that gets downloaded
// handy for saving level editor data to a .js file

// example:
// downloadString("var cool = true;\nvar string = 'careful about quotes';", "text/javascript", "myFilename.js")

// text is the data with \n for newlines etc
// fileType is a MIME type string (eg "text/html" or "text/plain")
// fileName is the suggested download filename
function downloadString(text, fileType, fileName) {

    // encode the data
    var blob = new Blob([text], { type: fileType });
    // create an invisible link
    var a = document.createElement('a');
    a.download = fileName;
    // fill it with data
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
	
    // add to the document temporarily and click it
    document.body.appendChild(a);
    a.click();
    // clean up
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);

}