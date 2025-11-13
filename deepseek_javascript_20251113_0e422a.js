// Enhanced main script with QR code functionality
function generateViewerLink() {
    const pdfUrl = document.getElementById('pdfUrl').value;
    const redirectUrl = document.getElementById('redirectUrl').value;
    const buttonText = document.getElementById('buttonText').value || 'Visit Our Website';
    const buttonColor = document.getElementById('buttonColor').value;
    
    if (!pdfUrl || !redirectUrl) {
        alert('Please fill in both PDF URL and Redirect URL');
        return;
    }
    
    // Validate URLs
    try {
        new URL(pdfUrl);
        new URL(redirectUrl);
    } catch (e) {
        alert('Please enter valid URLs including http:// or https://');
        return;
    }
    
    // Encode parameters for URL
    const params = new URLSearchParams({
        pdf: encodeURIComponent(pdfUrl),
        redirect: encodeURIComponent(redirectUrl),
        text: encodeURIComponent(buttonText),
        color: encodeURIComponent(buttonColor.replace('#', ''))
    });
    
    // Generate the viewer link
    const baseUrl = window.location.href.replace('/index.html', '');
    const viewerLink = `${baseUrl}/viewer.html?${params}`;
    
    // Display the result
    document.getElementById('generatedLink').value = viewerLink;
    document.getElementById('result').style.display = 'block';
    
    // Hide QR code container if it was shown
    document.getElementById('qrcode-container').style.display = 'none';
}

function copyLink() {
    const linkInput = document.getElementById('generatedLink');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(linkInput.value)
        .then(() => {
            // Show temporary feedback
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✅ Copied!';
            btn.style.background = '#27ae60';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy link. Please copy it manually.');
        });
}

function testViewer() {
    const link = document.getElementById('generatedLink').value;
    window.open(link, '_blank');
}

function createQRCode() {
    const link = document.getElementById('generatedLink').value;
    const qrcodeContainer = document.getElementById('qrcode-container');
    const canvas = document.getElementById('qrcode');
    
    // Clear previous QR code
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate new QR code
    QRCode.toCanvas(canvas, link, {
        width: 200,
        margin: 2,
        color: {
            dark: '#2c3e50',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error(error);
            alert('Failed to generate QR code');
            return;
        }
        
        qrcodeContainer.style.display = 'block';
        qrcodeContainer.scrollIntoView({ behavior: 'smooth' });
    });
}

function downloadQRCode() {
    const canvas = document.getElementById('qrcode');
    const link = document.createElement('a');
    
    link.download = 'pdf-viewer-qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Add input validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="url"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !this.value.startsWith('http')) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '';
            }
        });
    });
    
    // Add example data for testing
    document.getElementById('pdfUrl').value = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    document.getElementById('redirectUrl').value = 'https://example.com';
});