import CipherUtils from '../utils/cipherUtils';

class Bacon extends CipherUtils {
    constructor() {
        super();
        // codes for every letter in the alphabet(26)
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
    // map every letter to the corresponding code, and delete non-alphabetic chars
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

export default Bacon;