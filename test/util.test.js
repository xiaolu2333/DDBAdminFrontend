import {expect, test} from 'vitest'
import {showMmyPctInTableItem2} from "./util.js";

// // linux 环境正常值
// test('111', () => {
//   const total = 1024 ** 3
//   const used = 1024 ** 3 / 2
//   expect(showMmyPctInTableItem2(total + 'KB', used + 'KB')).toBe('50.00%')
// })

// win 环境正常值
test('111', () => {
    const total = 1024 ** 3
    const used = 1024 ** 3 / 2
    expect(showMmyPctInTableItem2(total, used)).toEqual({
        rate: '50.000',
        used: 1024 ** 3 / 2 + '',
        total: 1024 ** 3 + ''
    })
})