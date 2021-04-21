# cryptos
JavaScript tool for encrypting and decrypting classical ciphers.

## Instalation
For now, you must clone this repository, install all dependencies (```npm install```) and run ```npm run build``` in the command line. 
Then include the cryptos.js file from build folder to your document.
```html
<script src="path/to/cryptos.js" type="text/javascript"></script>
```
In the near future there will be an npm package and CDN version of this library.

## Usage
You can use cryptos methods by accessing cryptos object. Then, you must provide cipher name, and method with arguments.
Each cipher contains only two methods - ```encrypt()``` and ```decrypt()```, but the arguments are different.
```javascript
cryptos.cipherName.methodName(arguments)
```
Example:
```javascript
//encrypt string with Caesar cipher with the shift of 4
cryptos.caesar.encrypt("Hello world!", 4)
//outputs Lipps asvph!
cryptos.caesar.decrypt("Lipps asvph!", 4)
//outputs Hello world!
```
## Planned features
* Library documentation
* Vigenère cipher
* Polybius square cipher
* Importing ciphers directly from cryptos package e.g. ```import Caesar from 'cryptos'```

## Available ciphers
* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [ROT13](https://en.wikipedia.org/wiki/ROT13)
* [Bacon's cipher](https://en.wikipedia.org/wiki/Bacon%27s_cipher)
* [Atbash](https://en.wikipedia.org/wiki/Atbash)
