// assets/js/modules.js

const VantaModules = {
    // GELİŞMİŞ OTOMATİK ALGILAMA MOTORU
    detectEncoding(text) {
        if (!text || text.trim() === "") return "Empty";
        
        const cleanText = text.trim();

        // Binary kontrolü
        if (/^[01\s]+$/.test(cleanText) && cleanText.length > 4) return "Binary";
        
        // Hex kontrolü
        if (/^[0-9A-Fa-f\s:]+$/.test(cleanText) && cleanText.length >= 2) return "Hexadecimal";
        
        // URL Encode kontrolü (İçinde % karakteri ve hex kodu varsa)
        if (/%[0-9A-Fa-f]{2}/.test(cleanText)) return "URL Encoded";

        // Base64 kontrolü
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(cleanText) && cleanText.length > 3) return "Base64";
        
        return "Plain Text";
    },

    // BASE64: UTF-8 DESTEKLİ
    base64: {
        encode: (str) => btoa(unescape(encodeURIComponent(str))),
        decode: (str) => decodeURIComponent(escape(atob(str)))
    },
    
    // HEXADECIMAL
    hex: {
        encode: (str) => str.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '),
        decode: (hex) => {
            hex = hex.replace(/[\s:]/g, '');
            return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        }
    },

    // BINARY (0101)
    binary: {
        encode: (str) => str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
        decode: (bin) => bin.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('')
    },

    // URL ENCODE/DECODE
    url: {
        encode: (str) => encodeURIComponent(str),
        decode: (str) => decodeURIComponent(str)
    }
};
