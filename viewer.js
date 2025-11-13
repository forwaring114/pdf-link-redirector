<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Viewer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="viewer-container">
        <header class="viewer-header">
            <button id="redirectBtn" class="redirect-button">Visit Our Website</button>
        </header>
        
        <div class="pdf-container">
            <iframe id="pdfViewer" width="100%" height="600px" frameborder="0"></iframe>
        </div>
    </div>
    
    <script src="viewer.js"></script>
</body>
</html>
