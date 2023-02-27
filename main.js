const isObject = (value) => {
    return value && typeof value === 'object' && value.constructor === Object;
}

const diff_objects = (obj1, obj2) => {
    let result = {};
    for (const key in obj1) {
        if (obj1[key] !== obj2[key] && JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
            if (isObject(obj1[key])) {
                result[key] = diff_objects(obj1[key], obj2[key]);
            } else {
                result[key] = obj2[key];
            }
        }
    }

    for (const key in obj2) {
        if (obj1[key] === undefined) {
        result[key] = obj2[key];
        }
    }
    
    return result;
}

const isArray = (value) => {
    return value && typeof value === 'object' && value.constructor === Array;
}

const diff_arrays = (arr1, arr2) => {
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i] && arr2[i] && arr2[i] !== undefined) {
            result.push(arr2[i]);
        }
    }
    return result;
}

// Check if 2 object are equal
const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const diff = (first, second) => {
    const result = {};
    for (const key in first) {
        if (JSON.stringify(first[key]) !== JSON.stringify(second[key])) {
            if (isObject(first[key])) {
                result[key] = diff_objects(first[key], second[key]);
            }
            else if (isArray(first[key])) {
                result[key] = diff_arrays(first[key], second[key]);
            }
            else {
                result[key] = second[key];
            }
        }
    }

    for (const key in second) {
        if (first[key] === undefined) {
        result[key] = second[key];
        }
    }
    
    return result;
}

module.exports = diff;