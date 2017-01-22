class QuizCeil extends egret.Sprite {

    public constructor(content:number[]) {
        super();
        // 绘制默认方格（包括绘制文本框）
        this.drawCeil(content);
    }

    // 方格边框宽度 —— 默认值：Data.quizCeilBdBorder
    private _bdBorder:number = Data.quizCeilBdBorder;
    public get bdBorder():number {
        return this._bdBorder;
    }
    public set bdBorder(_bdBorder:number) {
        this._bdBorder = _bdBorder;
    }

    // 方格边框颜色 —— 默认值：Data.quizCeilBdColor
    private _bdColor:number = Data.quizCeilBdColor;
    public get bdColor():number {
        return this._bdColor;
    }
    public set bdColor(_bdColor:number) {
        this._bdColor = _bdColor;
    }

    // 方格背景颜色 —— 默认值：Data.quizCeilBgColorDefault
    private _bgColor:number = Data.quizCeilBgColorDefault;
    public get bgColor():number {
        return this._bgColor;
    }
    public set bgColor(_bgColor:number) {
        this._bgColor = _bgColor;
    }

    // 方格文字颜色 —— 默认值：Data.quizCeilTextColorDefault
    private _textColor:number = Data.quizCeilTextColorDefault;
    public get textColor():number {
        return this._textColor;
    }
    public set textColor(_textColor:number) {
        this._textColor = _textColor;
    }

    // 方格长度 —— 默认值：Data.quizCeilLength
    private _height = Data.quizCeilLength;
    public get height():number {
        return this._height;
    }
    public set height(_height:number) {
        this._height = _height;
    }

    // 方格宽度 —— 默认值：Data.quizCeilLength
    private _width = Data.quizCeilLength;
    public get width():number {
        return this._width;
    }
    public set width(_width:number) {
        this._width = _width;
    }

    // 方格在 quizCeilArray 中的 index
    private _index:number;
    public get index():number {
        return this._index;
    }
    public set index(_index:number) {
        this._index = _index;
    }

    // 绘制点击数独面板中方格 —— 方格背景/文字颜色改变
    public touchTapCeil(content:number[]) {
        this._bgColor = Data.quizCeilBgColorFocused;
        this._textColor = Data.quizCeilTextColorFocused;
        this.drawCeil(content);
    }

    // 绘制取消点击数独面板中的方格 —— 方格背景/文字颜色改变
    public resumeCeil(content:number[]) {
        this._bgColor = Data.quizCeilBgColorDefault;
        this._textColor = Data.quizCeilTextColorDefault;
        this.drawCeil(content);
    }

    // 绘制方格
    private drawCeil(content:number[]) {
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

    private textArray:egret.TextField[] = [];

    // 绘制文本框
    private drawText(contentArray:number[]) {
        // 移除已绘制的文本框，并清除 textArray
        for(let i = 0; i < this.textArray.length; i++) {
            this.removeChild(this.textArray[i]);
        }
        this.textArray.splice(0, this.textArray.length);

        // 确认答案或空缺状态
        if(contentArray.length == 1) {
            let content:string;
            if(contentArray[0] == 0) {
                content = "";
            }
            else {
                content = contentArray[0].toString();
            }

            let text:egret.TextField = new egret.TextField();

            // 设置文本框长宽和颜色
            text.width = this.width;
            text.height = this.height;
            text.textColor = this.textColor;

            // 设置文本框中的文字内容、字号和排列样式
            text.text = content;
            text.size = Data.quizCeilAnswerTextSize;
            text.textAlign = egret.HorizontalAlign.CENTER;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            
            this.textArray.push(text);
        }
        // 提示状态
        else if(contentArray.length > 1) {
            let content:string[] = [];
            for(let i = 0; i < contentArray.length; i++) {
                content[i] = contentArray[i].toString();
            }

            for(let i = 0; i < content.length; i++) {
                let text:egret.TextField = new egret.TextField(); 

                // 设置文本框长宽和颜色
                text.width = this.width / 3;
                text.height = this.height / 3;
                text.textColor = this.textColor;

                // 左上角坐标
                text.x = ((contentArray[i] - 1) % 3) * text.width;
                text.y = Math.floor((contentArray[i] - 1) / 3) * text.height;

                // 设置文本框中的文字内容、字号和排列样式
                text.text = content[i];
                text.size = Data.quizCeilHintTextSize;
                text.textAlign = egret.HorizontalAlign.CENTER;
                text.verticalAlign = egret.VerticalAlign.MIDDLE;
                
                this.textArray.push(text);
            }
        }

        // 将文本框添加进界面
        for(let i = 0; i < this.textArray.length; i++) {
            this.addChild(this.textArray[i]);
        }

    }

}