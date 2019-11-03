import { assert } from 'chai'
import * as plugin from '../src'

describe('plugin module', () => {
  it('should contains rules', () => {
    assert.isNotEmpty(plugin.rules)
  })
})
