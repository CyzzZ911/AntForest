auto();
const WIDTH = Math.min(device.width, device.height);
const HEIGHT = Math.max(device.width, device.height);
setScreenMetrics(WIDTH, HEIGHT);

/**
 * 检查设备是否锁定
 * @returns {Boolean} true=>已锁定; false=>已解锁
 */
function checkIsLocked() {
    return context.getSystemService(context.KEYGUARD_SERVICE).inKeyguardRestrictedInputMode();
}

/**
 * 获取图案解锁所有点坐标，例如9宫格解锁依次对应的key为1~9
 * @return {Object} {1: [x, y], ...}
 */
function getPatterPoints() {
    let patternView = id("com.android.systemui:id/lockPatternView").findOne(2000);
    if (!patternView) {
        log('没有找到图形密码组件');
        exit();
    }
    let patternViewRect = patternView.bounds();

    let patternSize = 3,
        width = (patternViewRect.right - patternViewRect.left) / patternSize,
        height = (patternViewRect.bottom - patternViewRect.top) / patternSize,
        points = {};

    for (let i = 0; i < 9; i++) {
        points[i + 1] = [patternViewRect.left + (i % 3 + 0.5) * width, patternViewRect.top + (Math.floor(i / 3) + 0.5) * height];
    }

    return points
}

/**
 * 图案解锁
 * @param password 密码，9宫格位置，各点依次由1~9表示
 */
function patternUnlock(password) {
    let points = getPatterPoints();
    let gestureParams = [];
    for (let i = 0; i < password.length; i++) {
        gestureParams.push(points[password[i]]);
    }

    gesture(500, gestureParams);
}

/**
 * 解锁
 */
function unlock(password) {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(500);

        if (device.brand === 'Xiaomi') {
            // 由于MIUI的解锁有变速检测(不用默认主题好像不会检测)，因此要点开时间以进入密码界面
            swipe(WIDTH / 2, 0, WIDTH / 2, HEIGHT, 1000);

            // 点击时间位置
            click(100, 150);
        } else {
            swipe(WIDTH / 2, HEIGHT, WIDTH / 2, 0, 1000);
        }

        if (password) {
            patternUnlock(password);

            for (let i = 0; i < 3; i++) {
                sleep(1000);
                if (!checkIsLocked()) {
                    return;
                }
            }
            toastLog('解锁失败');
        }
    }
}


module.exports = {
    unlock: unlock,
};
