// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('userInput');
    const outputArea = document.getElementById('outputData');
    const detectLabel = document.getElementById('detectedFormat');
    const operationType = document.getElementById('operationType');

    // DİNAMİK ALGILAMA (Yazarken çalışır)
    inputArea.addEventListener('input', () => {
        const text = inputArea.value;
        const format = VantaModules.detectEncoding(text);
        detectLabel.innerText = "Detected: " + format;
        
        // Eğer bir format algılanırsa otomatik olarak seçimi değiştir
        if(format !== "Plain Text" && format !== "Empty") {
            const mappedValue = format.toLowerCase().split(' ')[0];
            if(operationType.querySelector(`option[value="${mappedValue}"]`)) {
                operationType.value = mappedValue;
            }
        }
    });

    // ENCODE BUTONU
    document.getElementById('encodeBtn').addEventListener('click', () => {
        const type = operationType.value;
        const data = inputArea.value;
        if(!data) return;
        try {
            outputArea.value = VantaModules[type].encode(data);
        } catch (e) {
            outputArea.value = "ERROR: Encoding failed! Check your input format.";
        }
    });

    // DECODE BUTONU
    document.getElementById('decodeBtn').addEventListener('click', () => {
        const type = operationType.value;
        const data = inputArea.value;
        if(!data) return;
        try {
            outputArea.value = VantaModules[type].decode(data);
        } catch (e) {
            outputArea.value = "ERROR: Decoding failed! The data is not a valid " + type + " string.";
        }
    });

    // KOPYALAMA
    document.getElementById('copyBtn').addEventListener('click', () => {
        if(!outputArea.value) return;
        navigator.clipboard.writeText(outputArea.value).then(() => {
            const originalText = document.getElementById('copyBtn').innerText;
            document.getElementById('copyBtn').innerText = "COPIED!";
            setTimeout(() => {
                document.getElementById('copyBtn').innerText = originalText;
            }, 2000);
        });
    });
});
