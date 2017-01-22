var QuizCeil = (function (_super) {
    __extends(QuizCeil, _super);
    function QuizCeil(content) {
        _super.call(this);
        // 方格边框宽度 —— 默认值：Data.quizCeilBdBorder
        this._bdBorder = Data.quizCeilBdBorder;
        // 方格边框颜色 —— 默认值：Data.quizCeilBdColor
        this._bdColor = Data.quizCeilBdColor;
        // 方格背景颜色 —— 默认值：Data.quizCeilBgColorDefault
        this._bgColor = Data.quizCeilBgColorDefault;
        // 方格文字颜色 —— 默认值：Data.quizCeilTextColorDefault
        this._textColor = Data.quizCeilTextColorDefault;
        // 方格长度 —— 默认值：Data.quizCeilLength
        this._height = Data.quizCeilLength;
        // 方格宽度 —— 默认值：Data.quizCeilLength
        this._width = Data.quizCeilLength;
        this.textArray = [];
        // 绘制默认方格（包括绘制文本框）
        this.drawCeil(content);
    }
    var d = __define,c=QuizCeil,p=c.prototype;
    d(p, "bdBorder"
        ,function () {
            return this._bdBorder;
        }
        ,function (_bdBorder) {
            this._bdBorder = _bdBorder;
        }
    );
    d(p, "bdColor"
        ,function () {
            return this._bdColor;
        }
        ,function (_bdColor) {
            this._bdColor = _bdColor;
        }
    );
    d(p, "bgColor"
        ,function () {
            return this._bgColor;
        }
        ,function (_bgColor) {
            this._bgColor = _bgColor;
        }
    );
    d(p, "textColor"
        ,function () {
            return this._textColor;
        }
        ,function (_textColor) {
            this._textColor = _textColor;
        }
    );
    d(p, "height"
        ,function () {
            return this._height;
        }
        ,function (_height) {
            this._height = _height;
        }
    );
    d(p, "width"
        ,function () {
            return this._width;
        }
        ,function (_width) {
            this._width = _width;
        }
    );
    d(p, "index"
        ,function () {
            return this._index;
        }
        ,function (_index) {
            this._index = _index;
        }
    );
    // 绘制点击数独面板中方格 —— 方格背景/文字颜色改变
    p.touchTapCeil = function (content) {
        this._bgColor = Data.quizCeilBgColorFocused;
        this._textColor = Data.quizCeilTextColorFocused;
        this.drawCeil(content);
    };
    // 绘制取消点击数独面板中的方格 —— 方格背景/文字颜色改变
    p.resumeCeil = function (content) {
        this._bgColor = Data.quizCeilBgColorDefault;
        this._textColor = Data.quizCeilTextColorDefault;
        this.drawCeil(content);
    };
    // 绘制方格
    p.drawCeil = function (content) {
        // 绘制矩形
        this.drawRect();
        // 绘制文本框
        this.drawText(content);
    };
    // 绘制矩形
    p.drawRect = function () {
        this.graphics.lineStyle(this.bdBorder, this.bdColor);
        this.graphics.beginFill(this.bgColor);
        this.graphics.drawRect(0, 0, this.height, this.width);
        this.graphics.endFill();
    };
    // 绘制文本框
    p.drawText = function (contentArray) {
        // 移除已绘制的文本框，并清除 textArray
        for (var i = 0; i < this.textArray.length; i++) {
            this.removeChild(this.textArray[i]);
        }
        this.textArray.splice(0, this.textArray.length);
        // 确认答案或空缺状态
        if (contentArray.length == 1) {
            var content = void 0;
            if (contentArray[0] == 0) {
                content = "";
            }
            else {
                content = contentArray[0].toString();
            }
            var text = new egret.TextField();
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
        else if (contentArray.length > 1) {
            var content = [];
            for (var i = 0; i < contentArray.length; i++) {
                content[i] = contentArray[i].toString();
            }
            for (var i = 0; i < content.length; i++) {
                var text = new egret.TextField();
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
        for (var i = 0; i < this.textArray.length; i++) {
            this.addChild(this.textArray[i]);
        }
    };
    return QuizCeil;
}(egret.Sprite));
egret.registerClass(QuizCeil,'QuizCeil');
//# sourceMappingURL=QuizCeil.js.map