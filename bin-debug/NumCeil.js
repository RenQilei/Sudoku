var NumCeil = (function (_super) {
    __extends(NumCeil, _super);
    function NumCeil(content) {
        _super.call(this);
        // 方格边框宽度 —— 默认值：Data.numCeilBdBorder
        this._bdBorder = Data.numCeilBdBorder;
        // 方格边框颜色 —— 默认值：Data.numCeilBdColor
        this._bdColor = Data.numCeilBdColor;
        // 方格背景颜色 —— 默认值：Data.numCeilBgColorDefault
        this._bgColor = Data.numCeilBgColorDefault;
        // 方格文字颜色 —— 默认值：Data.numCeilTextColorDefault
        this._textColor = Data.numCeilTextColorDefault;
        // 方格文字大小 —— 默认值：Data.numCeilTextSize
        this._textSize = Data.numCeilTextSize;
        // 方格长度 —— 默认值：Data.numCeilLength
        this._height = Data.numCeilLength;
        // 方格宽度 —— 默认值：Data.numCeilLength
        this._width = Data.numCeilLength;
        this.ceilText = new egret.TextField();
        this.drawCeil(content);
    }
    var d = __define,c=NumCeil,p=c.prototype;
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
    d(p, "textSize"
        ,function () {
            return this._textSize;
        }
        ,function (_textSize) {
            this._textSize = _textSize;
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
    // 绘制答案状态方格
    p.drawAnswerCeil = function (content) {
        // 设置背景颜色
        this.bgColor = Data.numCeilBgColorAnswer;
        // 设置文字颜色
        this.textColor = Data.numCeilTextColorAnswer;
        // 重新绘制方格
        this.drawCeil(content);
    };
    // 绘制提示状态方格
    p.drawHintCeil = function (content) {
        // 设置背景颜色
        this.bgColor = Data.numCeilBgColorHint;
        // 设置文字颜色
        this.textColor = Data.numCeilTextColorHint;
        // 重新绘制方格
        this.drawCeil(content);
    };
    // 绘制初始状态方格
    p.drawDefaultCeil = function (content) {
        // 设置背景颜色
        this.bgColor = Data.numCeilBgColorDefault;
        // 设置文字颜色
        this.textColor = Data.numCeilTextColorDefault;
        // 重新绘制方格
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
    p.drawText = function (content) {
        this.ceilText.width = this.width;
        this.ceilText.height = this.height;
        this.ceilText.text = content.toString();
        this.ceilText.textColor = this.textColor;
        this.ceilText.size = this.textSize;
        this.ceilText.textAlign = egret.HorizontalAlign.CENTER;
        this.ceilText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.ceilText);
    };
    return NumCeil;
}(egret.Sprite));
egret.registerClass(NumCeil,'NumCeil');
//# sourceMappingURL=NumCeil.js.map