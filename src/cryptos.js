// class with usefull functions and parameters that can be inherited by ciphers
class CipherUtils {
    constructor() {
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
        this.matchLetters = /[a-z]/gi
    }
    shiftUppercase = (shift) => this.uppercase.substr(shift) + this.uppercase.substr(0, shift)
    shiftLowercase = (shift) => this.lowercase.substr(shift) + this.lowercase.substr (0, shift)
    mapCharset = (string, charset, mappedCharset, split="", ifNotLetter=String.fromCharCode(32)) => {
        return (
            string.split(split)
            .map(char => (char.match(this.matchLetters)) ? charset[mappedCharset.indexOf(char)] : char)
            .join("")
        )
    }

}
/* -------------------------------------------------------------------------- */
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
    encrypt = (string, shift) => this.mapCharset(string, this.shiftedCharset(shift), this.charset)
    // reverse encryption
    decrypt = (string, shift) => this.mapCharset(string, this.charset, this.shiftedCharset(shift))
}
/* -------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------- */
/* 

I AM STILL WORKING ON THE VERSION WITH 24 AS AN OPTIONAL ARGUMENT        
        
*/
class Bacon extends CipherUtils {
    constructor() {
        super()
        // latin alphabet (without V and J)
        this.latin = "ABCDEFGHIKLMNOPQRSTUWXYZ"
        // codes for every letter in the alphabet(26 one)
        this.codes = [
            "AAAAA", "AAAAB",
            "AAABA", "AAABB", "AABAA", "AABAB", 
            "AABBA", "AABBB", "ABAAA", "ABAAB", 
            "ABABA", "ABABB", "ABBAA", "ABBAB",
            "ABBBA", "ABBBB", "BAAAA", "BAAAB", 
            "BAABA", "BAABB", "BABAA", "BABAB", 
            "BABBA", "BABBB", "BBAAA", "BBAAB"
        ]
        // codes without V and J (24 alphabet)
        this.latinCodes = this.codes.filter(dontInclude => dontInclude !== "BABBA" && dontInclude !== "ABAAB")
    }
    // default alphabet in this function includes 26 letters
    encrypt = (string, charsetLength = 26) => {
        let convertString = string.toUpperCase().trim();
        return (
                // map every letter to te corresponding code
            this.mapCharset(convertString, this.codes, this.uppercase)
        )
    }
    decrypt = (string, charsetLength = 26) => {
        // add space every 5 chars to isolate the codes
        let convertString = string.toUpperCase().trim().split(" ")
                               .map(onlyLetters => onlyLetters.replace(/[^a-z]|\s+/gi, ""))
                               .map(char => (char.match(this.matchLetters)) ? 
                               char.replace(/(.{5})/g, '$1 ').slice(0, -1) : String.fromCharCode(32))
                               .join("  ")
        return (
                // map every code to the letter
            this.mapCharset(convertString, this.uppercase, this.codes, " ")
        )
    }
}
/* -------------------------------------------------------------------------- */
// main object
const cryptos = {
    rot13: new Rot13(),
    caesar: new Caesar(),
    bacon: new Bacon()
}