//箭头图形文件
function Arrow(){
    this.x = 0;//初始位置
    this.y = 0;
    this.rotation = 0;//初始旋转角度
    this.color = 'crimson';
}

Arrow.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);//设置旋转角度
    ctx.lineWidth = 5;//设置线宽
    ctx.fillStyle = this.color;//设置填充颜色
    ctx.beginPath();//路径开始
    ctx.moveTo(-50, -25);//起始点
    ctx.lineTo(0, -25);//终止点
    ctx.lineTo(0, -50);
    ctx.lineTo(50, 0);
    ctx.lineTo(0,  50);
    ctx.lineTo(0,  25);
    ctx.lineTo(-50, 25);
    ctx.closePath();//路径闭合
    ctx.stroke();//描边
    ctx.fill();//填充
    ctx.restore();
}