// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('userInput');
    const outputArea = document.getElementById('outputData');
    const detectBtn = document.getElementById('detectBtn');
    const detectLabel = document.getElementById('detectedFormat');
    const operationType = document.getElementById('operationType');

    // 1. OTOMATİK ALGILAMA BUTONU
    detectBtn.addEventListener('click', () => {
        const text = inputArea.value;
        const format = VantaModules.detectEncoding(text);
        detectLabel.innerText = "Detected: " + format;
        
        // Eğer formatı tanıdıysa otomatik olarak select kutusunu değiştir
        if(format !== "Plain Text / Unknown" && format !== "Empty") {
            operationType.value = format.toLowerCase().split(' ')[0];
        }
    });

    // 2. ENCODE BUTONU
    document.getElementById('encodeBtn').addEventListener('click', () => {
        const type = operationType.value;
        const data = inputArea.value;
        try {
            outputArea.value = VantaModules[type].encode(data);
        } catch (e) {
            outputArea.value = "ERROR: Encoding failed!";
        }
    });

    // 3. DECODE BUTONU
    document.getElementById('decodeBtn').addEventListener('click', () => {
        const type = operationType.value;
        const data = inputArea.value;
        try {
            outputArea.value = VantaModules[type].decode(data);
        } catch (e) {
            outputArea.value = "ERROR: Invalid format for decoding!";
        }
    });

    // 4. KOPYALAMA BUTONU
    document.getElementById('copyBtn').addEventListener('click', () => {
        outputArea.select();
        document.execCommand('copy');
        alert('Copied to clipboard!');
    });
});
