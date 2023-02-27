const chai = require('chai');
const diff = require('./main');

describe("diff function", () => {
    it("should return the difference between two objects", () => {
        const first = {
            "foo": {
                "bar": "baz",
                "biz": "foo"
            },
            "fiz": {
                "foo": "baz"
            },
            "bar": "baz",
            "baz": [
                "foo",
                "bar"
            ],
            "miss": 123
        };
        
        const second = {
            "foo": {
                "bar": "baz1",
                "biz": "foo"
            },
            "fiz": {
                "foo": "baz"
            },
            "bar": "baz",
            "baz": [
                "foo1"
            ],
            "new_value": 1
        };
        
        const expected = {
            "foo": {
                "bar": "baz1"
            },
            "baz": [
                "foo1"
            ],
            "new_value": 1,
            "miss": undefined
        };
        
        const actual = diff(first, second);
        chai.expect(actual).to.deep.equal(expected);
    });

    it("Should return no difference between two same objects", () => {
        const first = {
            "foo": {
                "bar": "baz",
                "biz": "foo"
            },
            "fiz": {
                "foo": "baz"
            },
            "bar": "baz",
            "baz": [
                "foo",
                "bar"
            ],
            "miss": 123
        };
        
        const second = {
            "foo": {
                "bar": "baz",
                "biz": "foo"
            },
            "fiz": {
                "foo": "baz"
            },
            "bar": "baz",
            "baz": [
                "foo",
                "bar"
            ],
            "miss": 123
        };
        
        const expected = {};
        
        const actual = diff(first, second);
        chai.expect(actual).to.deep.equal(expected);
    })
});