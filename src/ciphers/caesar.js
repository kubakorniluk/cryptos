const CAESAR = {
    charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    encrypted_charset(shift) {
        return (
            this.charset.slice(shift, this.charset.indexOf("a")) 
            + this.charset.slice(0, shift) 
            + this.charset.slice(this.charset.indexOf("a") + shift, this.charset.length)
            + this.charset.slice(this.charset.indexOf("a"), this.charset.indexOf("a") + shift)
        )
    },
    Encrypt(string, shift) {
        return (
             string.split("")
                .map(char => (char.match(/[a-z]/gi)) ? this.encrypted_charset(shift)[this.charset.indexOf(char)] : char)
            .join("")
        )
    },
    Decrypt(string, shift) {
        return (
            string.split("")
                .map(char => (char.match(/[a-z]/gi)) ? this.charset[this.encrypted_charset(shift).indexOf(char)] : char)
            .join("")
        )
    },
}