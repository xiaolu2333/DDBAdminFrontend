function getOSTypeUtils() {
    const userAgent = navigator.userAgent;
    console.log('userAgent:', userAgent)
    return userAgent
}

// linux 环境下，total 和 used 都是带有单位的字符串，如 100KB 100MB 100GB 100TB 等
function calculatePercentage(total, used) {
    // Check if the input parameters are valid strings
    if (total !== '' || used !== '') {
        // 判断是否包含单位 KB MB GB TB PB
        const totalRegex = total.match(/KB|MB|GB|TB|PB/)
        const usedRegex = used.match(/KB|MB|GB|TB|PB/)
        if (totalRegex || usedRegex) {
            // Convert the input parameters to numbers
            let totalNumber = Number(total.slice(0, -2))
            let usedNumber = Number(used.slice(0, -2))

            // Check if the input parameters are valid numbers
            if (isNaN(totalNumber) || isNaN(usedNumber)) {
                return {
                    total,
                    used,
                    rate: -1
                };
            }

            // Convert the input parameters to MB
            if (total.includes('KB')) {
                totalNumber /= 1024;
            } else if (total.includes('GB')) {
                totalNumber *= 1024;
            } else if (total.includes('TB')) {
                totalNumber *= 1024 * 1024;
            } else if (total.includes('PB')) {
                totalNumber *= 1024 * 1024 * 1024;
            }

            if (used.includes('KB')) {
                usedNumber /= 1024;
            } else if (used.includes('GB')) {
                usedNumber *= 1024;
            } else if (used.includes('TB')) {
                usedNumber *= 1024 * 1024;
            } else if (used.includes('PB')) {
                usedNumber *= 1024 * 1024 * 1024;
            }

            return calculatePercentage2(totalNumber, usedNumber)
        } else {
            return calculatePercentage2(total, used)
        }
    } else {
        return {
            total: -1,
            used: -1,
            rate: -1,
            msg: '使用情况未知'
        };
    }
}


// win 环境下
function calculatePercentage2(total, used) {
    let rate = -1

    if (isNaN(Number(total)) || isNaN(Number(used))) {
        return {
            total: Number(total),
            used: Number(used),
            rate,
        };
    } else {
        rate = ((Number(used) / Number(total)) * 100).toFixed(3);

        return {
            total: Number(total),
            used: Number(used),
            rate: Number.isFinite(Number(rate)) ? Number(rate) : -1,
        };
    }
}

// console.log(calculatePercentage('45', ''));
// console.log(calculatePercentage2('100', ''));