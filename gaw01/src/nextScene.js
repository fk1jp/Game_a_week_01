var NextLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("This is Next Scene!!", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        return true;
    },
});

var NextScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new NextLayer();
        this.addChild(layer);
    }
});
