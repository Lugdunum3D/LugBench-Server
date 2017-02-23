module.exports = function (mongoose) {
    function Int10(key, options) {
        mongoose.SchemaType.call(this, key, options, 'Int10');
    };

    Int10.prototype = Object.create(mongoose.SchemaType.prototype);

    Int10.prototype.cast = function (val) {
        let _val = Number(val);

        if (isNaN(_val)) {
            throw new Error('Int10: ' + val + ' is not a number');
        }
        _val = Math.round(_val);
        if (_val < 0 || _val > 0x3FF) {
            throw new Error('Int10: ' + val +
                ' is outside of the range of valid 10-bit ints');
        }
        return _val;
    };

    mongoose.Schema.Types.Int10 = Int10;
};
