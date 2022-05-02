// $roots keeps previous parent properties as they will be added as a prefix for each prop.
// $sep is just a preference if you want to separate nested paths other than dot.
/**
 * @param {{}} obj - the object to be flattened
 * @param {string[]} roots - the array of keys which should prepend the keys of obj in the final output
 * @param {string} sep - the separator to be used in the keys of the output object
 * 
 * @return {{}} flattenedObj - the flattened object in the form {key.subkey.subkey2: valueOfSubkey2, ...}
 */
export const flattenObj = (obj, roots = [], sep = '.') => Object
    // find props of given object
    .keys(obj)
    // return an object by iterating props
    .reduce((memo, prop) => Object.assign(
        // create a new object
        {},
        // include previously returned object
        memo,
        Object.prototype.toString.call(obj[prop]) === '[object Object]'
            // keep working if value is an object
            ? flattenObj(obj[prop], roots.concat([prop]), sep)
            // include current prop and value and prefix prop with the roots
            : {[roots.concat([prop]).join(sep)]: obj[prop]}
    ), {});