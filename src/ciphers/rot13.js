import Caesar from './caesar';

// rot13 is basically caesar cipher shifted by 13, so why not to return caesar class methods shifted by 13?
class Rot13 extends Caesar {
    constructor() {
        super();
    }
    encrypt = (string) => cryptos.caesar.encrypt(string, 13);
    decrypt = (string) => cryptos.caesar.decrypt(string, 13);
}

export default Rot13;