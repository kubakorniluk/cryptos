// Caesar cipher implementation
const CAESAR = {
    // Charset which we will be shifting
    charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    // Function takes a string parameter which will be encoded, and a shift number
    Encrypt(string, shift) {
        // Create new charset that will be shifted by number given in function parameter
        let encrypted_charset = this.charset.slice(shift, this.charset.indexOf("a")) 
        + this.charset.slice(0, shift) 
        + this.charset.slice(this.charset.indexOf("a") + shift, this.charset.length)
        + this.charset.slice(this.charset.indexOf("a"), this.charset.indexOf("a") + shift)
        // map every letter from string that charset contains and replace with the corresponding encrypted charset letter
            return (
                string.split("")
                    .map(char =>(char.match(/[a-z]/gi)) ? encrypted_charset[this.charset.indexOf(char)] : char)
                .join("")
            )
    }
}
console.log(CAESAR.Encrypt("test string", 2))