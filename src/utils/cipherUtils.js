// class with usefull functions and parameters that can be inherited by ciphers
export const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const latinCharset = 'ABCDEFGHIKLMNOPQRSTUWXYZabcdefghiklmnopqrstuwxyz';
export const matchLetters = /[a-z]/gi;
export const shiftCharset = shift => charset.substr(shift) + charset.substr(0, shift);

export const mapCharset = (string, charset, mappedCharset, split="", ifNotLetter="") => {

}
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
export default CipherUtils;