"ui";

const config = storages.create('CyzzZ911:AntForest');

function configView() {
    ui.layout(
        <ScrollView>
            <vertical id="viewport">
                <frame>
                    <appbar>
                        <toolbar id="toolbar" title="蚂蚁森林"/>
                    </appbar>
                </frame>
                <vertical w="*" gravity="left" layout_gravity="left" margin="10">
                    <text text="图案解锁密码：" textColor="#666666" textSize="14sp"/>
                    <input id="password" inputType="textPassword" text="{{config.get('password', '')}}"/>
                </vertical>
            </vertical>
        </ScrollView>
    );
}

configView();

// 退出配置界面
ui.emitter.on("pause", () => {
    config.put('password', ui.password.getText().toString())
});
