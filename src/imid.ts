export default function(domain: string, path: string) {
    const cookie: string = ` ${document.cookie}`;

    const imidExp: RegExp = /\simid=([A-Za-z0-9\-_]{22})/;
    const imidCreatedExp: RegExp = /\simid_created=(\d+)/;

    const imidMatched: RegExpMatchArray = cookie.match(imidExp);
    const imidCreatedMatch: RegExpMatchArray = cookie.match(imidCreatedExp);

    let imid: string;
    let imidCreated: string;
    let expire: number = 63072000000;

    if (imidMatched) {
        imid = imidMatched[1];
        if (imid === 'THISISOPTEDOUTCOOKIEID') {
            expire = 315360000000;
        }
    } else {
        const keywords: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
        do {
            imid = '';
            if ('crypto' in window && 'Uint8Array' in window) {
              const array: Uint8Array = new Uint8Array(22);
              crypto.getRandomValues(array);
              array.forEach(function(value) {
                imid += keywords[value & 63];
              });
            } else {
              for (let i: number = 22; i > 0; i-- ) imid += keywords[keywords.length * Math.random() << 0];
            }
        } while (imid.charAt(0) === '-');
    }

    if (imidCreatedMatch) {
        imidCreated = imidCreatedMatch[1];
    } else {
        imidCreated = (new Date().getTime() / 1000 << 0) + '';
    }

    const sufix: string = `expires=${new Date(new Date().getTime() + expire).toUTCString()};` + (domain ? ` domain=${domain};` : '') + (path ? ` path=${path};` : '');

    document.cookie = `imid=${imid}; ${sufix}`;
    document.cookie = `imid_created=${imidCreated}; ${sufix}`;
};