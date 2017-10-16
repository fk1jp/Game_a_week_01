
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    boxes:[],
    red:  cc.color(255, 0, 0),
    green:cc.color(0, 255, 0),
    blue: cc.color(0, 0, 255),
    clear:cc.color(0, 0, 0, 0),
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("tap icons!", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);

        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        //var boxes = new Array();
        for (var i = 0 ; i < 6 ; i++ ){
        this.boxes[i] = new Array();
        for (var j = 0 ; j < 9 ; j++ ){
            this.boxes[i][j] = new cc.DrawNode();
            var origin = cc.p(i*size.width/6 + 10 ,(j+1)*size.height/10 );
            this.boxes[i][j].drawRect(cc.p(0,0), cc.p(size.width/6 -20 ,size.height/11),this.clear , 5, this.green);
            this.boxes[i][j].setContentSize(size.width/6 -5 ,size.height/11);
            this.boxes[i][j].setPosition(origin);
            cc.log("hello", i);
            this.boxes[i][j].setTag("square" + i + j);
            this.addChild(this.boxes[i][j], 0);
            cc.eventManager.addListener(listener.clone(), this.boxes[i][j]);
        }
        }


        return true;
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    start_position: {x:0 , y:0},
    end_position: {x:0 , y:0},
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        this.start_position = touch.getLocation();
        var location = target.convertToNodeSpace(touch.getLocation());
        var spriteSize = target.getContentSize();
        var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);
        if (cc.rectContainsPoint(spriteRect, location)) {
            cc.log(this.start_position);
            var tag = target.getTag();
            
            cc.log("onTouchBegan ", tag);
            return true;
        }
        return false;
    },
 
    onTouchMoved: function (touch, event) {
        this.end_position = touch.getLocation();
        cc.log("onTouchMoved");
    },
 
    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded",this.end_position);
        var target = event.getCurrentTarget();
        var tag = target.getTag();
        var diff = { 
            x: this.end_position.x - this.start_position.x,
            y: this.end_position.y - this.start_position.y
        };
        var vector = {
            x: 2000 * diff.x / Math.sqrt( Math.pow(diff.x,2) + Math.pow(diff.y,2)),
            y: 2000 * diff.y / Math.sqrt( Math.pow(diff.x,2) + Math.pow(diff.y,2))
        };
        vector.x += this.start_position.x;
        vector.y += this.start_position.y;
        var moves = cc.MoveTo.create(1,vector);
        target.runAction(cc.Sequence.create(moves));
        setInterval(function() {
            target.removeFromParent();
        }, 1000);
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

