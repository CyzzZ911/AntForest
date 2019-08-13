let Image = {
    COLL_IMG: images.read('./Images/coll_icon.png'),  // 可收取好友手型图标
};

let PageType = {
    MY_HOME: 'MY_HOME',  // 我的蚂蚁森林主页
    FRIEND_HOME: 'FRIEND_HOME',  // 好友主页
    FRIENDS_LIST: 'FRIENDS_LIST',  // 好友排行榜页面
};

let PageText = {
    MY_HOME: '背包',
    FRIEND_HOME: '发消息',
    FRIENDS_LIST: '好友排行榜',
};

let DelayLevel = {
    LOW: 500,
    MEDIUM: 1000,
    HIGH: 3000,
};


module.exports = {
    Image: Image,
    PageType: PageType,
    PageText: PageText,
    DelayLevel: DelayLevel,
}
