// class with usefull functions and parameters that can be inherited by ciphers
class CipherUtils {
    constructor() {
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
        this.matchLetters = /[a-z]/gi
    }
    shiftUppercase = (shift) => this.uppercase.substr(shift) + this.uppercase.substr(0, shift)
    shiftLowercase = (shift) => this.lowercase.substr(shift) + this.lowercase.substr (0, shift)
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
    encrypt = (string, shift) => {
        return (
            string.split("")
            .map(char => 
                (char.match(this.matchLetters)) ? this.shiftedCharset(shift)[this.charset.indexOf(char)] : char)
            .join("")
        )
    }
    // reverse encryption
    decrypt = (string, shift) => {
        return (
            string.split("")
            .map(char => 
                (char.match(this.matchLetters)) ? this.charset[this.shiftedCharset(shift).indexOf(char)] : char)
            .join("")
        )
    }
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
        // deleting codes of V and J
        this.latinCodes = this.codes.filter(dontInclude => dontInclude !== "BABBA" && dontInclude !== "ABAAB")
    }
    // default alphabet in this function includes 26 letters
    encrypt = (string, charsetLength = 26) => {
        // 24 is the one without V and J
        if (charsetLength === 24) {
            string.toUpperCase().replace(/V/g, "U").replace(/J/g, "I").split("")
                .map(char => {
                    return (
                        (char.match(this.matchLetters)) ? this.latinCodes[this.latin.indexOf(char)] : 
                        (char !== String.fromCharCode(32)) ? "" : String.fromCharCode(32)
                    )
                })
                .join("")

        } else if (charsetLength === 26) {
            return (
                // map every letter to te corresponding code
                string.toUpperCase().split("")
                .map(char => {
                    return (
                        (char.match(this.matchLetters)) ? this.codes[this.uppercase.indexOf(char)] : 
                        (char !== String.fromCharCode(32)) ? "" : String.fromCharCode(32)
                    )
                })
                .join("").trim()
            )
        } else {
            // warn if the optional argument is wrong
            console.warn("cryptos.bacon: Alphabet can be only 24 or 26 digits long.")   
        }
    }
    decrypt = (string, charsetLength = 26) => {
        // add space every 5 chars to isolate the codes
        let stringWithSpaces = string.split(" ")
                               .map(char => (char.match(this.matchLetters)) ? 
                               char.replace(/(.{5})/g, '$1 ').slice(0, -1) : String.fromCharCode(32))
                               .join("  ")
        if (charsetLength === 24) {
            return (
                stringWithSpaces.toUpperCase().split(" ")
                .map(char => 
                    (char.match(this.matchLetters)) ? this.latin[this.latinCodes.indexOf(char)] : String.fromCharCode(32))
                .join("")
            )
        } else if (charsetLength === 26) {
            return (
                // map every code to the letter
                stringWithSpaces.toUpperCase().split(" ")
                .map(char => 
                    (char.match(this.matchLetters)) ? this.uppercase[this.codes.indexOf(char)] : String.fromCharCode(32))
                .join("").trim()
            )
        } else {
            console.warn("cryptos.bacon: Alphabet can be only 24 or 26 digits long.")   
        }
    }
}
/* -------------------------------------------------------------------------- */
// main object
const cryptos = {
    rot13: new Rot13(),
    caesar: new Caesar(),
    bacon: new Bacon()
}