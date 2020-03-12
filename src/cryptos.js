// class with usefull functions and parameters that can be inherited by ciphers
class CipherUtils {
    constructor() {
        this.latinUppercase = "ABCDEFGHIKLMNOPQRSTUWXYZ";
        this.latinLowercase = "abcdefghiklmnopqrstuwxyz";
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
        this.charset = this.uppercase + this.lowercase;
        this.matchLetters = /[a-z]/gi;
    }
    shiftUppercase = (shift) => this.uppercase.substr(shift) + this.uppercase.substr(0, shift);
    shiftLowercase = (shift) => this.lowercase.substr(shift) + this.lowercase.substr (0, shift);
    mapCharset = (string, charset, mappedCharset, split="", ifNotLetter="") => {
        return (
            string.split(split)
            .map(char => (char.match(this.matchLetters)) ? charset[mappedCharset.indexOf(char)] : 
            (ifNotLetter != "") ? ifNotLetter : char)
            .join("")
        )
    }
    onlyLetters = (string) => {
        return (
            string.toUpperCase().split("")
            .map(char => char.replace(/[^a-z|\^\s+]/gi, ""))
            .join("")
        )
    }

}
/* -------------------------------------------------------------------------- */
class Caesar extends CipherUtils {
    // inherit charset and ability to shift it
    constructor () {
        super();
        // shift joined charset
        this.shiftedCharset = (shift) => this.shiftUppercase(shift) + this.shiftLowercase(shift);
    }
    // map every string character index in charset to corresponding index in shifted charset
    encrypt = (string, shift) => this.mapCharset(string, this.shiftedCharset(shift), this.charset);
    // reverse encryption
    decrypt = (string, shift) => this.mapCharset(string, this.charset, this.shiftedCharset(shift));
}
/* -------------------------------------------------------------------------- */
// rot13 is basically caesar cipher shifted by 13, so why not to return caesar class methods shifted by 13?
class Rot13 extends Caesar {
    constructor() {
        super();
    }
    encrypt = (string) => cryptos.caesar.encrypt(string, 13);
    decrypt = (string) => cryptos.caesar.decrypt(string, 13);
}
/* -------------------------------------------------------------------------- */
class Atbash extends CipherUtils {
    constructor() {
        super();
        this.reversedCharset = this.uppercase.split("").reverse().join("") 
                               + this.lowercase.split("").reverse().join("");
    }
    encrypt = (string) => this.mapCharset(string, this.charset, this.reversedCharset)
    decrypt = (string) => this.mapCharset(string, this.reversedCharset, this.charset)
}
/* -------------------------------------------------------------------------- */
class Bacon extends CipherUtils {
    constructor() {
        super();
        // codes for every letter in the alphabet(26 one)
        this.codes = [
            "AAAAA", "AAAAB",
            "AAABA", "AAABB", "AABAA", "AABAB", 
            "AABBA", "AABBB", "ABAAA", "ABAAB", 
            "ABABA", "ABABB", "ABBAA", "ABBAB",
            "ABBBA", "ABBBB", "BAAAA", "BAAAB", 
            "BAABA", "BAABB", "BABAA", "BABAB", 
            "BABBA", "BABBB", "BBAAA", "BBAAB"
        ];
        // codes without V and J (24 alphabet)
        this.latinCodes = this.codes.filter(dontInclude => dontInclude != "BABBA" || dontInclude != "ABAAB");
    }
    // default alphabet in this function includes 26 letters
    // map every letter to the corresponging code, and delete or non-alphabetic chars
    encrypt = (string, charsetLength = 26) => {
        let latinString = string.replace(/V/g, "U").replace(/J/g, "I")
        return (
            (charsetLength == 26) ? this.mapCharset(this.onlyLetters(string), this.codes, this.uppercase) 
            : (charsetLength == 24) ? this.mapCharset(this.onlyLetters(latinString), this.latinCodes, this.latinUppercase)
            : console.warn("cryptos.bacon: The second argument cannot be other than 26 or 24")
        )
        // this works fine for now
    }
    
    decrypt = (string, charsetLength = 26) => {
        // add space every 5 chars to isolate the codes
        let convertString = this.onlyLetters(string).split(" ").map(char => char.replace(/(.{5})/g, '$1 ').slice(0, -1)).join("  ")
        return (
            // map every code to the letter
            (charsetLength == 26) ? this.mapCharset(convertString, this.uppercase, this.codes, " ", " ") 
            : (charsetLength == 24) ? this.mapCharset(convertString, this.latinUppercase, this.latinCodes, " ", " ")
            : console.warn("cryptos.bacon: The second argument cannot be other than 26 or 24")
        )
    }
}
/* -------------------------------------------------------------------------- */
// main object
const cryptos = {
    caesar: new Caesar(),
    rot13: new Rot13(),
    atbash: new Atbash(),
    bacon: new Bacon()
}