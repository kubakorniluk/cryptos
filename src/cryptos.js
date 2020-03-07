// class with usefull functions and parameters that can be inherited by ciphers
class CipherUtils {
    constructor() {
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
    }
    shiftUppercase = (shift) => this.uppercase.substr(shift) + this.uppercase.substr(0, shift)
    shiftLowercase = (shift) => this.lowercase.substr(shift) + this.lowercase.substr (0, shift) 
}
class Caesar extends CipherUtils {
    // inherit charset and ability to shift it
    constructor () {
        super()
        // join uppercase with lowercase
        this.charset = this.uppercase + this.lowercase;
        // shift joined charset
        this.shiftedCharset = (shift) => this.shiftUppercase(shift) + this.shiftLowercase(shift)
    }
    
    // map every string character index in charset to corresponding index in shifted charset
    encrypt = (string, shift) => {
        return (
            string.split("")
            .map(char => 
                (char.match(/[a-z]/gi)) ? this.shiftedCharset(shift)[this.charset.indexOf(char)] : char)
            .join("")
        )
    }
    // reverse encryption
    decrypt = (string, shift) => {
        return (
            string.split("")
            .map(char => 
                (char.match(/[a-z]/gi)) ? this.charset[this.shiftedCharset(shift).indexOf(char)] : char)
            .join("")
        )
    }
}
// rot13 is basically caesar cipher shifted by 13, so why not to return caesar class shifted by 13?
class Rot13 extends Caesar {
    constructor() {
        super()
        // instatiate the class
        this.caesar = new Caesar();
    }
    encrypt = (string) => this.caesar.encrypt(string, 13)
    decrypt = (string) => this.caesar.decrypt(string, 13)
}
// main object
var cryptos = {
    rot13: new Rot13(),
    caesar: new Caesar()
}