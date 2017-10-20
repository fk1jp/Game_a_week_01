
var HelloWorldLayer = cc.Layer.extend({
  _sprite:null,
  _enemy:null,
  _boxes:[],
  _red:  cc.color(255, 0, 0),
  _green:cc.color(0, 255, 0),
  _blue: cc.color(0, 0, 255),
  _clear:cc.color(0, 0, 0, 0),
  _point:0,
  _helloLabel:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    _point=0;
    _helloLabel = new cc.LabelTTF("point is " + _point , "Arial", 38);
    // position the label on the center of the screen
    _helloLabel.x = size.width / 2;
    _helloLabel.y = size.height / 2 + 200;
    this.addChild(_helloLabel, 5);

    this._sprite = new cc.Sprite(res.HelloWorld_png);
    this._sprite.attr({
        x: size.width / 2,
        y: size.height / 2
    });
    this.addChild(this._sprite, 0);

    var N = 3;
    for (var i = 0 ; i < 6 ; i++ ){
      for (var j = 0 ; j < 3; j++ ){
        this._boxes[i * N + j] = new cc.DrawNode();
        var origin = cc.p(i*size.width/6 + 10 ,(j+1)*size.height/10 );
        this._boxes[i * N + j].drawRect(cc.p(0,0), cc.p(size.width/6 -20 ,size.height/11),this._clear , 5, this._green);
        this._boxes[i * N + j].setContentSize(size.width/6 -5 ,size.height/11);
        this._boxes[i * N + j].setPosition(origin);
        cc.log("hello", i, j, this._boxes[i * N + j].getContentSize().width, this._boxes[i * N + j].getPosition().x );
        this._boxes[i * N + j].setTag("square" + i + j);
        this.addChild(this._boxes[i * N + j], 0);
        cc.eventManager.addListener(listener.clone(), this._boxes[i * N + j]);
      }
    }
    this._enemy = new Enemy(100, cc.color(128, 255, 128, 100));
    this._enemy.setPosition(cc.p(size.width / 2, size.height * 3 / 4));
    this.addChild(this._enemy);
    cc.log(this._enemy.getPosition().x);

    this.scheduleUpdate();
    return true;
  },
  update:function(time){
    for ( var block of this._boxes ){
      if(this._intersectCircleSquare(this._enemy,block)){
        cc.log('hit');
        _helloLabel.setString("point is " + ++_point);
      }
    }
  },
  _intersectCircleSquare: function(circle,s) {
    p=circle.getPosition();
    length=circle.getRadius();
    // p in s
    if(s.getPosition().x < p.x && s.getPosition().x + s.getContentSize().width > p.x ){
      if(s.getPosition().y < p.y && s.getPosition().y + s.getContentSize().height > p.y ){
        return true
      }else{
        if(Math.abs(s.getPosition().y - p.y) < length || Math.abs(s.getPosition().y + s.getContentSize().height - p.y) < length ){
          return true
        }else{
          return false
        }
      }
    }else if(s.getPosition().y < p.y && s.getPosition().y + s.getContentSize().height > p.y){
      if(Math.abs(s.getPosition().x - p.x) < length || Math.abs(s.getPosition().x + s.getContentSize().width - p.x) < length){
        return true
      }else{
        return false
      }
    }else{
      return false
      if(Math.pow(s.getPosition().x - p.x , 2) + Math.pow(s.getPosition().y - p.y , 2) < length*length){
        return true
      }else if(Math.pow(s.getPosition().x + s.getContentSize().width - p.x , 2) + Math.pow(s.getPosition().y - p.y , 2) < length*length){
        return true
      }else if(Math.pow(s.getPosition().x - p.x , 2) + Math.pow(s.getPosition().y + s.getContentSize().height - p.y , 2) < length*length){
        return true
      }else if(Math.pow(s.getPosition().x + s.getContentSize().width - p.x , 2) + Math.pow(s.getPosition().y + s.getContentSize().height - p.y , 2) < length*length){
        return true
      }else{
        return false
      }
    }
    return false
  }
});

var Enemy = cc.DrawNode.extend({
  _radius:0, 
  _color:null, 
  _Bcolor:null, 
  _Rcolor:null, 
  _time:0,
  _flg:true,
  _sec:0,
  _radiusMax:0, 
  
  ctor:function(radius, color){ 
    this._super(); 
    this._radius = radius; 
    this._color = color;
    this._Bcolor = color;
    this._Rcolor = cc.color(255 , 255 , 255, 100  );
    this._radiusMax = radius; 
    this.draw(); 
    this.scheduleUpdate(); 
  },
  
  update:function(dt){
    this._time += dt; 
    if(this._time >= 0.5){
      this._sec ++; 
      this._time = 0;
      this._flg = !this._flg; 
    }
    
    if (this._flg) {
      this._radius = this._radiusMax - this._radiusMax * this._time * 1.6; 
    } else {
      this._radius = this._radiusMax * this._time * 1.6 + this._radiusMax * 0.2; 
    }
    this.draw(); 
  },
  
  draw:function(){
    this.clear(); 
    this.drawDot( 
      cc.p(0, 0), 
      this._radius, 
      this._color 
    ); 
  },
  changeColor:function(flag){
    if(flag === "in"){
      this._color = this._Rcolor;
    }else{
      this._color = this._Bcolor;
    }
  },
  getRadius:function(){
    return this._radius;
  }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    start_position: {x:0 , y:0},
    end_position: {x:0 , y:0},
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        this.start_position = touch.getLocation();
        this.end_position = this.start_position;
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
            x: 2000 * diff.x / Math.sqrt( 0.1 + Math.pow(diff.x,2) + Math.pow(diff.y,2)),
            y: 2000 * diff.y / Math.sqrt( 0.1 + Math.pow(diff.x,2) + Math.pow(diff.y,2))
        };
        var moves = cc.MoveBy.create(1,vector);
        target.runAction(cc.Sequence.create(moves));
        timerflg = setInterval(function() {
            cc.log(target.getPosition());
            target.removeFromParent();
            clearInterval(timerflg);
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

