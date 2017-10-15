var MyLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        var sprite = cc.Sprite.create(res.HelloWorld_png);
        sprite.setPosition(size.width / 2, size.height / 2 + 200);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);

        var label = cc.LabelTTF.create("Hello World", "Arial", 60);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);


        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan:function(touch, event) {
        return true;
    },

    onTouchMoved:function(touch, event) {
    },

    onTouchEnded:function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new NextScene());
    },
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }
});
