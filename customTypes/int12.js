module.exports = function (mongoose) {
    function Int12(key, options) {
        mongoose.SchemaType.call(this, key, options, 'Int12');
    };

    Int12.prototype = Object.create(mongoose.SchemaType.prototype);

    Int12.prototype.cast = function (val) {
        let _val = Number(val);

        if (isNaN(_val)) {
            throw new Error('Int12: ' + val + ' is not a number');
        }
        _val = Math.round(_val);
        if (_val > -0x800 && _val < 0x7FF) {
            throw new Error('Int12: ' + val +
                ' is outside of the range of valid 12-bit ints');
        }
        return _val;
    };

    mongoose.Schema.Types.Int12 = Int12;
};
