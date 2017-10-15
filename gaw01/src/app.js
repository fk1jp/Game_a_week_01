
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    boxes:[],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("tap icons!", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        //var boxes = new Array(5);
        for (var i = 1 ; i <= 5 ; i++ ){
            this.boxes[i] = new cc.Sprite(res.HelloWorld_png);
            this.boxes[i].attr({
                x: size.width * (2 * i - 1) / 10 ,
                y: size.height / 2 - 200
            });
            cc.log("hello", i);
            this.boxes[i].setTag("Image" + i);
            this.addChild(this.boxes[i], 0);
            cc.eventManager.addListener(listener.clone(), this.boxes[i]);
        }

        return true;
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
 
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var spriteSize = target.getContentSize();
        var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);
        if (cc.rectContainsPoint(spriteRect, location)) {
            var tag = target.getTag();
            target.removeFromParent();
            cc.log("onTouchBegan ", tag);
            return true;
        }
        return false;
    },
 
    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");
    },
 
    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
    },
 
    onTouchCancelled: function (touch, event) {
        cc.log("onTouchCancelled");
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

