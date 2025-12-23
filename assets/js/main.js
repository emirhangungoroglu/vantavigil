// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('userInput');
    const outputArea = document.getElementById('outputData');
    const detectLabel = document.getElementById('detectedFormat');
    const operationType = document.getElementById('operationType');

    inputArea.addEventListener('input', () => {
        detectLabel.innerText = "DETECTED: " + VantaModules.detectEncoding(inputArea.value);
    });

    document.getElementById('encodeBtn').addEventListener('click', async () => {
        const type = operationType.value;
        if(!inputArea.value) return;
        try {
            const result = await VantaModules[type].encode(inputArea.value);
            outputArea.value = result;
        } catch (e) { outputArea.value = "ERROR: ENCODING_FAILED"; }
    });

    document.getElementById('decodeBtn').addEventListener('click', () => {
        const type = operationType.value;
        if(!inputArea.value) return;
        try { outputArea.value = VantaModules[type].decode(inputArea.value); }
        catch (e) { outputArea.value = "ERROR: INVALID_FORMAT"; }
    });

    document.getElementById('copyBtn').addEventListener('click', () => {
        if(!outputArea.value) return;
        navigator.clipboard.writeText(outputArea.value).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.innerText = "COPIED_SUCCESSFULLY";
            setTimeout(() => { btn.innerText = "COPY_TO_CLIPBOARD"; }, 2000);
        });
    });
});
