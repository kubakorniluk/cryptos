import CipherUtils from '../utils/cipherUtils';

class Atbash extends CipherUtils {
    constructor() {
        super();
        this.reversedCharset = this.uppercase.split("").reverse().join("") 
                               + this.lowercase.split("").reverse().join("");
    }
    encrypt = (string) => this.mapCharset(string, this.charset, this.reversedCharset)
    decrypt = (string) => this.mapCharset(string, this.reversedCharset, this.charset)
}

export default Atbash;