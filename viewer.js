// Enhanced viewer script with better error handling
class PDFViewer {
    constructor() {
        this.params = this.getUrlParams();
        this.init();
    }
    
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            pdf: decodeURIComponent(params.get('pdf') || ''),
            redirect: decodeURIComponent(params.get('redirect') || 'https://example.com'),
            text: decodeURIComponent(params.get('text') || 'Visit Our Website'),
            color: '#' + (params.get('color') || 'e74c3c')
        };
    }
    
    init() {
        this.setupRedirectButton();
        this.loadPDF();
        this.setupErrorHandling();
    }
    
    setupRedirectButton() {
        const redirectBtn = document.getElementById('redirectBtn');
        if (redirectBtn) {
            redirectBtn.textContent = this.params.text;
            redirectBtn.style.background = this.params.color;
            redirectBtn.onclick = () => {
                // Add click tracking (optional)
                this.trackRedirect();
                window.location.href = this.params.redirect;
            };
        }
    }
    
    loadPDF() {
        const pdfViewer = document.getElementById('pdfViewer');
        if (!pdfViewer) return;
        
        if (!this.params.pdf) {
            this.showError('No PDF URL provided');
            return;
        }
        
        // Use Google Docs viewer as fallback for better compatibility
        const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(this.params.pdf)}&embedded=true`;
        pdfViewer.src = googleViewerUrl;
        
        pdfViewer.onload = () => {
            console.log('PDF loaded successfully');
        };
        
        pdfViewer.onerror = () => {
            console.warn('Google Docs viewer failed, trying direct PDF');
            pdfViewer.src = this.params.pdf;
            
            pdfViewer.onerror = () => {
                this.showFallback();
            };
        };
    }
    
    showError(message) {
        document.body.innerHTML = `
            <div class="error">
                <h2>⚠️ Error</h2>
                <p>${message}</p>
                <button onclick="history.back()" style="
                    background: #3498db; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 5px; 
                    cursor: pointer;
                    margin-top: 1rem;
                ">Go Back</button>
            </div>
        `;
    }
    
    showFallback() {
        const pdfContainer = document.querySelector('.pdf-container');
        if (pdfContainer) {
            pdfContainer.innerHTML = `
                <div class="pdf-fallback">
                    <h3>📄 PDF Viewer</h3>
                    <p>Unable to display PDF directly. You can:</p>
                    <div style="margin: 1rem 0;">
                        <a href="${this.params.pdf}" target="_blank" style="
                            background: #3498db;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 5px;
                            text-decoration: none;
                            display: inline-block;
                            margin: 0.5rem;
                        ">📥 Download PDF</a>
                        <a href="${this.params.redirect}" style="
                            background: ${this.params.color};
                            color: white;
                            padding: 10px 20px;
                            border-radius: 5px;
                            text-decoration: none;
                            display: inline-block;
                            margin: 0.5rem;
                        ">${this.params.text}</a>
                    </div>
                </div>
            `;
        }
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e);
        });
    }
    
    trackRedirect() {
        // Optional: Add analytics here
        console.log('Redirect clicked to:', this.params.redirect);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PDFViewer();
});
