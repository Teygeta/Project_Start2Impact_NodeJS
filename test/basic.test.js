const assert = require('assert');

describe('BasicTest', function () {

  describe('multiply', function () {

    it('uguale a 10 quando moltiplico 5 * 2', function () {

      const result = 5 * 2

      assert.equal(result, 10)
    })

  })

  describe('divide', function () {

    it('non uguale a 2 quando divido 15 / 5', function () {

      const value = 2

      const result = 15 / 5

      assert.notEqual(result, value)

    })

  })

})
