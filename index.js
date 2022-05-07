var http = require('http');
var url = require('url');
const CryptoJS = require('crypto-js');

function hex_to_ascii(str1) {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
};

var E = {
    m: 256,
    d: function(r, t) {
        var e = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(r))),
            o = CryptoJS.enc.Hex.parse(e.salt),
            p = CryptoJS.enc.Hex.parse(e.iv),
            a = e.ciphertext,
            S = parseInt(e.iterations);
        S <= 0 && (S = 999);
        var i = this.m / 4,
            n = CryptoJS.PBKDF2(t, o, {
                hasher: CryptoJS.algo.SHA512,
                keySize: i / 8,
                iterations: S
            });
        return CryptoJS.AES.decrypt(a, n, {
            mode: CryptoJS.mode.CBC,
            iv: p
        })
    }
};

function main(base64_json, arr1, arr2, arr3, arr4) {
    var _0x19b4 = _0x1bc7f6 => {
        _0xc053 = arr1;
        _0xd516 = arr2;
        _0x52946 = arr3;
        _0x4921 = arr4;
        _0xc053 = _0xc053.concat(_0xd516);
        _0xc053 = _0xc053.concat(_0x52946);
        _0x1bc7f6 = _0xc053.concat(_0x4921);
        return _0x1bc7f6.map(e => String.fromCharCode(e)).reverse().join('');
    };
    var _0xea57b = _0x8c0e37 => {
        const _0x473f51 = E['d'](base64_json, _0x19b4());
        return hex_to_ascii(_0x473f51);
    };
    return _0xea57b();

};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  try {
    var q = url.parse(req.url, true).query;
    var base64json = q.json;
    var all = atob(q.all);
    var arrs = all.split("|");
    var arr1 = arrs[0].split(",");
    var arr2 = arrs[1].split(",");
    var arr3 = arrs[2].split(",");
    var arr4 = arrs[3].split(",");
    res.end(main(base64json, arr1, arr2, arr3, arr4));
  } catch (e) {
    res.end("Failed to decrypt");
  };
}).listen(5000);
console.log('Server running!');