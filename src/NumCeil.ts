class NumCeil extends egret.Sprite {

    public constructor(content:number) {
        super();
        this.drawCeil(content);
    }

    // 方格边框宽度 —— 默认值：Data.numCeilBdBorder
    private _bdBorder:number = Data.numCeilBdBorder;
    public get bdBorder():number {
        return this._bdBorder;
    }
    public set bdBorder(_bdBorder:number) {
        this._bdBorder = _bdBorder;
    }

    // 方格边框颜色 —— 默认值：Data.numCeilBdColor
    private _bdColor:number = Data.numCeilBdColor;
    public get bdColor():number {
        return this._bdColor;
    }
    public set bdColor(_bdColor:number) {
        this._bdColor = _bdColor;
    }

    // 方格背景颜色 —— 默认值：Data.numCeilBgColorDefault
    private _bgColor = Data.numCeilBgColorDefault;
    public set bgColor(_bgColor) {
        this._bgColor = _bgColor;
    }
    public get bgColor() {
        return this._bgColor;
    }
    
    // 方格文字颜色 —— 默认值：Data.numCeilTextColorDefault
    private _textColor = Data.numCeilTextColorDefault;
    public set textColor(_textColor) {
        this._textColor = _textColor;
    }
    public get textColor() {
        return this._textColor;
    }

    // 方格文字大小 —— 默认值：Data.numCeilTextSize
    private _textSize = Data.numCeilTextSize;
    public set textSize(_textSize) {
        this._textSize = _textSize;
    }
    public get textSize() {
        return this._textSize;
    }

    // 方格长度 —— 默认值：Data.numCeilLength
    private _height = Data.numCeilLength;
    public get height():number {
        return this._height;
    }
    public set height(_height:number) {
        this._height = _height;
    }

    // 方格宽度 —— 默认值：Data.numCeilLength
    private _width = Data.numCeilLength;
    public get width():number {
        return this._width;
    }
    public set width(_width:number) {
        this._width = _width;
    }

    // 方格在 numCeilArray 中的 index
    private _index;
    public set index(_index) {
        this._index = _index;
    }
    public get index() {
        return this._index;
    }

    // 绘制答案状态方格
    public drawAnswerCeil(content:number) {
        // 设置背景颜色
        this.bgColor = Data.numCeilBgColorAnswer;
        // 设置文字颜色
        this.textColor = Data.numCeilTextColorAnswer;
        // 重新绘制方格
        this.drawCeil(content);
    }

    // 绘制提示状态方格
    public drawHintCeil(content:number) {
        // 设置背景颜色
        this.bgColor = Data.numCeilBgColorHint;
        // 设置文字颜色
        this.textColor = Data.numCeilTextColorHint;
        // 重新绘制方格
        this.drawCeil(content);
    }

    // 绘制初始状态方格
    public drawDefaultCeil(content:number) {
        // 设置背景颜色
        this.bgColor = Data.numCeilBgColorDefault;
        // 设置文字颜色
        this.textColor = Data.numCeilTextColorDefault;
        // 重新绘制方格
        this.drawCeil(content);
    }

    // 绘制方格
    private drawCeil(content:number) {
        // 绘制矩形
        this.drawRect();
        // 绘制文本框
        this.drawText(content);
    }

    // 绘制矩形
    private drawRect() {
        this.graphics.lineStyle(this.bdBorder, this.bdColor);
        this.graphics.beginFill(this.bgColor);
        this.graphics.drawRect(0, 0, this.height, this.width);
        this.graphics.endFill();
    }

    private ceilText:egret.TextField = new egret.TextField();
    
    // 绘制文本框
    private drawText(content:number) {
        this.ceilText.width = this.width;
        this.ceilText.height = this.height;
        this.ceilText.text = content.toString();
        this.ceilText.textColor = this.textColor;
        this.ceilText.size = this.textSize;
        this.ceilText.textAlign = egret.HorizontalAlign.CENTER;
        this.ceilText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.ceilText);
    }

}