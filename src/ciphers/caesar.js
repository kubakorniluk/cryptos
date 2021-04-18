import CipherUtils from '../utils/cipherUtils';

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

export default Caesar;