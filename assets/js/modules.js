// assets/js/modules.js
const VantaModules = {
    detectEncoding(text) {
        if (!text || text.trim() === "") return "EMPTY";
        const clean = text.trim();
        if (/^[01\s]+$/.test(clean) && clean.length > 4) return "BINARY";
        if (/^[0-9A-Fa-f\s:]+$/.test(clean) && clean.length >= 2) return "HEXADECIMAL";
        if (/%[0-9A-Fa-f]{2}/.test(clean)) return "URL_ENCODED";
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(clean)) return "BASE64";
        return "PLAIN_TEXT";
    },

    base64: {
        encode: (str) => btoa(unescape(encodeURIComponent(str))),
        decode: (str) => decodeURIComponent(escape(atob(str)))
    },
    hex: {
        encode: (str) => str.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '),
        decode: (hex) => {
            hex = hex.replace(/[\s:]/g, '');
            return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        }
    },
    binary: {
        encode: (str) => str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
        decode: (bin) => bin.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('')
    },
    url: {
        encode: (str) => encodeURIComponent(str),
        decode: (str) => decodeURIComponent(str)
    },
    rot13: {
        encode: (str) => str.replace(/[a-zA-Z]/g, (c) => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)),
        decode: (str) => VantaModules.rot13.encode(str)
    },
    html: {
        encode: (str) => str.replace(/./gm, (s) => `&#${s.charCodeAt(0)};`),
        decode: (str) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = str;
            return txt.value;
        }
    },
    // SİBER GÜVENLİK ÖZEL MODÜLLERİ
    defang: {
        encode: (str) => str.replace(/\./g, "[.]").replace(/http/gi, "hxxp"),
        decode: (str) => str.replace(/\[\.\]/g, ".").replace(/hxxp/gi, "http")
    },
    charcode: {
        encode: (str) => "String.fromCharCode(" + str.split('').map(c => c.charCodeAt(0)).join(',') + ")",
        decode: (str) => {
            const matches = str.match(/\d+/g);
            return matches ? matches.map(c => String.fromCharCode(c)).join('') : "INVALID_CHARCODE";
        }
    },
    sha256: {
        encode: async (str) => {
            const msgBuffer = new TextEncoder().encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        },
        decode: () => "SHA-256 IS ONE-WAY HASH (CANNOT DECODE)"
    }
};
