# cryptos
JavaScript tool for encrypting/decrypting classical ciphers

## Instalation
Simply include cryptos.js (or minified version) to your html document.
```html
<script src="path/to/cryptos.js" type="text/javascript"></script>
```

## Usage
You can use cryptos methods by accessing cryptos object. Then, you must provide cipher name, and method with arguments.
Each cipher contains only two methods - ```encrypt()``` and ```decrypt()```, but the arguments are different.
```javascript
cryptos.cipherName.methodName(arguments)
```
Example:
```javascript
cryptos.caesar.encode("Hello world!", 4)
//outputs Lipps asvph!
cryptos.caesar.decode("Lipps asvph!", 4)
//outputs Hello world!
```

## Ciphers
* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [ROT13](https://en.wikipedia.org/wiki/ROT13)
* [Bacon's cipher](https://en.wikipedia.org/wiki/Bacon%27s_cipher)
