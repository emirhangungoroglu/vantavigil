// assets/js/modules.js

const VantaModules = {
    // OTOMATİK ALGILAMA MOTORU
    detectEncoding(text) {
        if (!text) return "Empty";
        
        // Binary kontrolü (Sadece 0, 1 ve boşluk)
        if (/^[01\s]+$/.test(text) && text.length > 4) return "Binary";
        
        // Hex kontrolü (0-9, A-F)
        if (/^[0-9A-Fa-f\s]+$/.test(text) && text.length % 2 === 0) return "Hexadecimal";
        
        // Base64 kontrolü
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(text)) return "Base64";
        
        // URL Encode kontrolü
        if (/%[0-9A-Fa-f]{2}/.test(text)) return "URL Encoded";

        return "Plain Text / Unknown";
    },

    // DÖNÜŞTÜRÜCÜLER
    base64: {
        encode: (str) => btoa(str),
        decode: (str) => atob(str)
    },
    
    hex: {
        encode: (str) => {
            return str.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
        },
        decode: (hex) => {
            hex = hex.replace(/\s/g, '');
            return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        }
    }
};
