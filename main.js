if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

setScreenMetrics(1080, 2248)

const Constants = {
    // 可收取好友手型图标
    COLL_IMG: images.fromBase64('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'),
    HOMEPAGE: 1, // 我的蚂蚁森林主页
    FRIENDS_LIST: 2,  // 好友排行榜页面
}

/**
 * 进入蚂蚁森林
 */
function enterForest() {
    text('首页').findOne();
    log('进入了支付宝首页');
    className('TextView').text('蚂蚁森林').findOne().parent().parent().click();
    text('背包').findOne();
    log('进入了蚂蚁森林首页');
}

/**
 * 退出蚂蚁森林
 */
function exitForest() {
    closeForestButton = desc('关闭').clickable(true).findOne(1000);
    if (!closeForestButton) {
        console.warn('没有找到关闭蚂蚁森林按钮');
        return;
    }
    click(closeForestButton.bounds().centerX(), closeForestButton.bounds().centerY());
    sleep(1000);
}

/**
 * 获取可收取的好友坐标
 * @param {Number} layer 0=>更多好友外层; 1=>更多好友内层 默认为0
 * @return {Array/null} 可点击坐标
 */
function getCanCollFriends(layer) {
    log('Enter function [getCanCollFriends]')
    // layer = layer === undefined ? Constants.HOMEPAGE : layer;
    layer = Constants.FRIENDS_LIST
    if (layer === Constants.HOMEPAGE) {
        let collectible = text('可收取').findOnce();
        if (collectible) {
            let bounds = collectible.bounds()
            return [bounds.left, bounds.bottom]
        }
        else {
            return null;
        }
    } else {
        let img = captureScreen();
        let coordinate = findImage(img, Constants.COLL_IMG);
        return coordinate ? [coordinate.x, coordinate.y + 60] : null
    }
}


/**
 * 收取单个用户主页所有能量
 * @param {Boolean} block 是否阻塞，默认为 false
 */
function collectEnergy(block) {
    log('【collectEnergy】: 开始收集能量')
    block = block === undefined ? false : block;

    while (true) {
        energyBallSele = textMatches(/^收集能量\d+克$/);
        energyBallColl = block ? energyBallSele.untilFind() : energyBallSele.find()
        if (energyBallColl.empty()) {
            return;
        }

        energyBallColl.forEach(energyBall => {
            energyBounds = energyBall.bounds();
            console.info('自动' + energyBall.text());
            // 只能通过坐标点击收集（控件是可点击的，但是调用点击方法没有效果）
            click(energyBounds.centerX(), energyBounds.centerY());
        });
        sleep(500);
    }
}

/**
 * 收集单页好友的能量
 * @param {Number} layer 0=>更多好友外层; 1=>更多好友内层 默认为0
 */
function collOnePageFriendsEnergy(layer) {
    log('Enter function [collOnePageFriendsEnergy]')
    layer = layer === undefined ? Constants.HOMEPAGE : layer;

    while (true) {
        coordinate = getCanCollFriends(layer)
        if (!coordinate) {
            return
        }
        click(coordinate[0], coordinate[1]);
        textEndsWith('发消息').findOne(3000);
        sleep(500);
        collectEnergy();
        back();
        sleep(500);
        (layer === Constants.HOMEPAGE ? textEndsWith('查看更多好友') : textEndsWith('好友排行榜')).findOne(3000);
        sleep(500);
    }
}

/**
 * 收集所有好友能量
 */
function collAllFriendsEnergy() {
    log('进入函数【collAllFriendsEnergy】，开始收集所有好友能量')
    let scrollObj = scrollable().findOne(1000);
    if (!scrollObj) {
        toast('当前页面不是蚂蚁森林，退出函数【collAllFriendsEnergy】')
        return;
    }
    let scrollRet = true;
    let layer = Constants.HOMEPAGE;
    if (text('种树').findOne(1000)) {
        log('当前处于我的蚂蚁森林页面')
        layer = Constants.HOMEPAGE
    } else if (text('好友排行榜').findOne(1000)) {
        log('当前处于好友排行榜页面')
        layer = Constants.FRIENDS_LIST
    } else {
        toast('当前页面不是蚂蚁森林')
        console.warn('当前页面不是蚂蚁森林，退出函数【collAllFriendsEnergy】')
        return;
    }

    while (true) {
        collOnePageFriendsEnergy(layer)
        scrollRet = scrollObj.scrollForward();
        if (!scrollRet) {
            if (layer === Constants.HOMEPAGE) {
                let moreFriends = textStartsWith('查看更多好友').findOne(3000);
                if (!moreFriends) {
                    log('没有找到查看更多好友按钮，退出循环')
                    break;
                }
                log(moreFriends)
                moreFriends.click();
                text('好友排行榜').findOne(3000);
                sleep(500);
                layer = Constants.FRIENDS_LIST;
            } else {
                if (text('没有更多了').exists()) {
                    log('收取所有好友能量完成');
                    break;
                }
                let moreFriends = text('查看更多').findOne(3000)
                if (!moreFriends) {
                    log('收取所有好友能量完成');
                    break;
                }
                moreFriends.click();
            }
            
            scrollObj = scrollable().findOne();
        }
        sleep(500)
    }

    
}


function main () {
    launchApp("支付宝");

    enterForest();

    collectEnergy()

    collAllFriendsEnergy();

    exitForest();
}

while (true) {
    main();
    sleep(10000);
}
