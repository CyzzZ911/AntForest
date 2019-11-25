let { DelayLevel } = require('./constants');


/**
 * 等待某个页面
 * @param {Number} pageType 页面类型
 * @param {Boolean} block 是否阻塞，默认为 true
 * @param {Number} delay 如果是非阻塞，最长等待时间，默认3000ms
 */
function waitForPage (pageType, block, delay) {
    block = block === undefined ? true : block;
    delay = delay === undefined ? 3000 : delay;

    uiSelector = text(PageText[pageType]);
    uiObject = block ? uiSelector.findOne() : uiSelector.findOne(delay);
    sleep(DelayLevel.LOW);
    return uiObject;
}

module.exports = {
    waitForPage: waitForPage,
};
