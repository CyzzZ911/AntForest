let { Image, PageType, PageText, DelayLevel } = require('./Modules/constants');
let { waitForPage } = require('./Modules/functions')


/**
 * 初始化
 */
!function init() {
    auto.waitFor();

    setScreenMetrics(1080, 2248);

    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }
    if (!launchApp("支付宝")) {
        toastLog('未找到支付宝应用');
        exit();
    }
    text('首页').selected(true).findOne();
    log('进入了支付宝首页');
}();


/**
 * 进入蚂蚁森林
 */
function enterForest() {
    className('TextView').text('蚂蚁森林').findOne().parent().parent().click();
    waitForPage(PageType.MY_HOME);
    log('进入了蚂蚁森林首页');
}


/**
 * 退出蚂蚁森林
 */
function exitForest() {
    closeForestButton = desc('关闭').clickable(true).findOne(DelayLevel.MEDIUM);
    if (!closeForestButton) {
        console.warn('没有找到关闭蚂蚁森林按钮');
        return;
    }
    click(closeForestButton.bounds().centerX(), closeForestButton.bounds().centerY());
    sleep(DelayLevel.MEDIUM);
}


/**
 * 获取可收取的好友坐标
 * @return {Array/null} 可点击坐标
 */
function getCanCollFriends() {
    log('获取可收取的好友坐标')

    let img = captureScreen();
    let coordinate = findImage(img, Image.COLL_IMG);
    return coordinate ? [coordinate.x, coordinate.y + 60] : null
}


/**
 * 收取单个用户主页所有能量
 * @param {Boolean} block 是否阻塞，默认为 false
 */
function collectEnergy(block) {
    log('收取单个用户主页所有能量')
    block = block === undefined ? false : block;

    while (true) {
        energyBallSelector = textMatches(/^收集能量\d+克$/);
        energyBallColl = block ? energyBallSelector.untilFind() : energyBallSelector.find()
        if (energyBallColl.empty()) {
            return;
        }

        energyBallColl.forEach(energyBall => {
            energyBounds = energyBall.bounds();
            console.info('自动' + energyBall.text());
            // 只能通过坐标点击收集（控件是可点击的，但是调用点击方法没有效果）
            click(energyBounds.centerX(), energyBounds.centerY());
        });

        sleep(DelayLevel.LOW);
    }
}

/**
 * 收集单页好友的能量
 */
function collOnePageFriendsEnergy() {
    log('收集单页好友的能量')

    while (true) {
        coordinate = getCanCollFriends()
        if (!coordinate) {
            return
        }
        click(coordinate[0], coordinate[1]);
        waitForPage(PageType.FRIEND_HOME);
        sleep(DelayLevel.LOW);
        collectEnergy();
        back();
        sleep(DelayLevel.LOW);
    }
}

/**
 * 收集所有好友能量
 */
function collAllFriendsEnergy() {
    log('收集所有好友能量');
    let scrollObj = scrollable().findOne(DelayLevel.MEDIUM);
    if (!scrollObj) {
        toastLog('当前页面不是蚂蚁森林');
        return;
    }
    let scrollRet = true;
    let layer = PageType.HOMEPAGE;
    if (waitForPage(PageType.MY_HOME, false)) {
        log('当前处于我的蚂蚁森林页面');
        layer = PageType.HOMEPAGE;
    } else if (waitForPage(PageType.FRIENDS_LIST, false)) {
        log('当前处于好友排行榜页面')
        layer = PageType.FRIENDS_LIST;
    } else {
        toastLog('当前页面不是蚂蚁森林');
        return;
    }

    while (true) {
        collOnePageFriendsEnergy(layer)
        scrollRet = scrollObj.scrollForward();
        if (!scrollRet) {
            if (layer === PageType.HOMEPAGE) {
                let moreFriends = text('查看更多好友').findOne(DelayLevel.HIGH);
                if (!moreFriends) {
                    log('没有找到查看更多好友按钮，退出循环')
                    break;
                }
                moreFriends.click();
                waitForPage(PageType.FRIENDS_LIST, false);
                sleep(DelayLevel.LOW);
                layer = PageType.FRIENDS_LIST;
            } else {
                if (text('没有更多了').exists()) {
                    log('收取所有好友能量完成');
                    break;
                }
                let moreFriends = text('查看更多').findOne(DelayLevel.HIGH)
                if (!moreFriends) {
                    log('收取所有好友能量完成');
                    break;
                }
                moreFriends.click();
            }

            scrollObj = scrollable().findOne();
        }
        sleep(DelayLevel.LOW)
    }


}


/**
 * 入口程序
 */

function main() {
    enterForest();

    collectEnergy()

    collAllFriendsEnergy();

    exitForest();
}

while (true) {
    main();
    sleep(10000);
}
