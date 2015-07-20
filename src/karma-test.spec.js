'use strict';

describe("Karma Jasmine Unit Test", function(){
    var aValue;

    beforeEach(function(){
        aValue = 1;
    });

    it("a variable which value 1 should be 1", function(){
        expect(aValue).toEqual(1);
    });
});