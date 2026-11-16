// Safety net for: "TypeError: this.isZero is not a function"
//
// protobufjs-generated toObject() calls `util.Long.prototype.toString.call(value)`.
// When `value` is a string / number / bigint / plain {low, high} object (instead of a real
// Long instance) this throws, which breaks JSON.stringify(message) / message.toJSON() and
// makes the bot stop answering. This makes Long#toString tolerant of those values.
// It is applied automatically when the library is imported - no code needed in the bot.
import protobuf from 'protobufjs/minimal.js';
const Long = protobuf.util.Long;
if (Long && Long.prototype && !Long.prototype.__safeLongToStringPatched) {
    const originalToString = Long.prototype.toString;
    const safeToString = function toString(radix) {
        // normal case: a real Long instance
        if (this !== null && this !== undefined && typeof this.isZero === 'function') {
            return originalToString.call(this, radix);
        }
        const value = this instanceof String || this instanceof Number ? this.valueOf() : this;
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
            return String(value);
        }
        if (value && typeof value.low === 'number' && typeof value.high === 'number') {
            const combined = (BigInt(value.high >>> 0) << 32n) | BigInt(value.low >>> 0);
            if (!value.unsigned && value.high < 0) {
                return (combined - (1n << 64n)).toString();
            }
            return combined.toString();
        }
        return String(value);
    };
    Object.defineProperty(safeToString, '__safeLongToStringPatched', { value: true });
    Long.prototype.toString = safeToString;
    Object.defineProperty(Long.prototype, '__safeLongToStringPatched', { value: true });
}
