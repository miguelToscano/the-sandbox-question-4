const isObject = (value) => {
    return value && typeof value === 'object' && value.constructor === Object;
}

const diffObjects = (obj1, obj2) => {
    let result = {};
    for (const key in obj1) {
        if (obj1[key] !== obj2[key] && !areEqualObjects(obj1[key], obj2[key])) {
            if (isObject(obj1[key])) {
                result[key] = diffObjects(obj1[key], obj2[key]);
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

const diffArrays = (arr1, arr2) => {
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i] && arr2[i] && arr2[i] !== undefined) {
            result.push(arr2[i]);
        }
    }
    return result;
}

const areEqualObjects = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const diff = (first, second) => {
    const result = {};
    for (const key in first) {
        if (!areEqualObjects(first[key], second[key])) {
            if (isObject(first[key])) {
                result[key] = diffObjects(first[key], second[key]);
            }
            else if (isArray(first[key])) {
                result[key] = diffArrays(first[key], second[key]);
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