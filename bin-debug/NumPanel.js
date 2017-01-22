var NumPanel = (function (_super) {
    __extends(NumPanel, _super);
    function NumPanel() {
        _super.call(this);
        this.numCeilArray = [];
        // 记录已选中数字方格信息 —— 选中的为1，未选中的为0
        this._numIndex = [];
        this.initNumIndex();
        this.drawPanel();
    }
    var d = __define,c=NumPanel,p=c.prototype;
    // 绘制数字面板
    p.drawPanel = function () {
        for (var i = 0; i < 9; i++) {
            var x = i % 9 * Data.numCeilLength;
            var y = Math.floor(i / 9) * Data.numCeilLength + Data.quizCeilLength * 9 + 100;
            var ceil = new NumCeil(i + 1);
            ceil.x = x;
            ceil.y = y;
            this.numCeilArray.push(ceil);
            this.addChild(ceil);
            // 记录ceil的index
            ceil.index = i;
            this.numCeilArray[i].touchEnabled = true;
            this.numCeilArray[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapNumCeil, this);
        }
    };
    p.initNumIndex = function () {
        for (var i = 0; i < 9; i++) {
            this._numIndex[i] = 0;
        }
    };
    d(p, "numIndex"
        ,function () {
            return this._numIndex;
        }
    );
    // 绘制答案状态/提示状态方格 —— 根据数独面板已选中方格已填写数字绘制
    p.drawHighlightCeil = function (contentArray) {
        // 恢复已绘制的方格 —— numIndex 中为1的恢复为defaultCeil，并还原为0
        for (var i = 0; i < 9; i++) {
            if (this.numIndex[i] == 1) {
                this.numCeilArray[i].drawDefaultCeil(i + 1);
                this.numIndex[i] = 0;
            }
        }
        // 答案状态 —— 仅一个数字且大于0
        if ((contentArray.length == 1) && (contentArray[0] > 0)) {
            var index = contentArray[0] - 1;
            var content = contentArray[0];
            this.numCeilArray[index].drawAnswerCeil(content);
            this.addChild(this.numCeilArray[index]);
            // numIndex中对应方格置为1
            this.numIndex[index] = 1;
        }
        // 提示状态 —— 多于一个数字
        if (contentArray.length > 1) {
            for (var i = 0; i < contentArray.length; i++) {
                var index = contentArray[i] - 1;
                var content = contentArray[i];
                this.numCeilArray[index].drawHintCeil(content);
                this.addChild(this.numCeilArray[index]);
                // numIndex中对应方格置为1
                this.numIndex[index] = 1;
            }
        }
    };
    /**
     * 点击数字面板方格时激活
     */
    p.onTouchTapNumCeil = function (event) {
        // 点击的数字方格，检查是否为已选中方格
        // 1.1. 如果未选中，则添加入 numIndex，并根据 numIndex 重新绘制数字面板
        // 1.2. 根据 numIndex，更新数独面板已选中方格的填写内容（通过 Main 实现）
        // 2.1. 如果已选中，则从 numIndex 中删除，并重新绘制数字面板
        // 2.2. 根据 numIndex，更新数独面板已选中方格的填写内容（通过 Main 实现）
        var index = event.target.index;
        // 未选中
        if (this.numIndex[index] == 0) {
            // 将 numIndex[index] 置为 1，标记为选中
            this.numIndex[index] = 1;
        }
        else if (this.numIndex[index] == 1) {
            // 将 numIndex[index] 置为 0，标记为未选中
            this.numIndex[index] = 0;
        }
        // 重新绘制数字面板
        // this.updateAllCeil();
        // 将 numIndex 传给 Main 并更新数独面板方格内容
        this.dispatchEventWith("onTouchTapNumCeil", false, this.numIndex2QuizContent(), false);
    };
    p.onKeyDownForNumCeil = function (kbContent) {
        console.log(kbContent);
        var index = kbContent - 1;
        // 未选中
        if (this.numIndex[index] == 0) {
            // 将 numIndex[index] 置为 1，标记为选中
            this.numIndex[index] = 1;
        }
        else if (this.numIndex[index] == 1) {
            // 将 numIndex[index] 置为 0，标记为未选中
            this.numIndex[index] = 0;
        }
        // 重新绘制数字面板
        // this.updateAllCeil();
        // 将 numIndex 传给 Main 并更新数独面板方格内容
        this.dispatchEventWith("onTouchTapNumCeil", false, this.numIndex2QuizContent(), false);
    };
    p.updateAllCeil = function () {
        // 状态 —— 0：无选中，空白状态，1：选中1个，答案状态，2：选中2个以上，提示状态
        var status = 0;
        for (var i = 0; i < 9; i++) {
            if (this.numIndex[i] == 1) {
                status++;
            }
        }
        // 空白状态
        if (status == 0) {
            for (var i = 0; i < 9; i++) {
                // 未选中
                if (this.numIndex[i] == 0) {
                    this.numCeilArray[i].drawDefaultCeil(i + 1);
                    this.addChild(this.numCeilArray[i]);
                }
            }
        }
        // 答案状态
        if (status == 1) {
            for (var i = 0; i < 9; i++) {
                // 未选中
                if (this.numIndex[i] == 0) {
                    this.numCeilArray[i].drawDefaultCeil(i + 1);
                    this.addChild(this.numCeilArray[i]);
                }
                // 选中
                if (this.numIndex[i] == 1) {
                    this.numCeilArray[i].drawAnswerCeil(i + 1);
                    this.addChild(this.numCeilArray[i]);
                }
            }
        }
        // 提示状态
        if (status > 1) {
            for (var i = 0; i < 9; i++) {
                // 未选中
                if (this.numIndex[i] == 0) {
                    this.numCeilArray[i].drawDefaultCeil(i + 1);
                    this.addChild(this.numCeilArray[i]);
                }
                // 选中
                if (this.numIndex[i] == 1) {
                    this.numCeilArray[i].drawHintCeil(i + 1);
                    this.addChild(this.numCeilArray[i]);
                }
            }
        }
    };
    p.numIndex2QuizContent = function () {
        var content = [];
        for (var i = 0; i < 9; i++) {
            if (this.numIndex[i] == 1) {
                content.push(i + 1);
            }
        }
        return content ? content : [0];
    };
    return NumPanel;
}(egret.Sprite));
egret.registerClass(NumPanel,'NumPanel');
//# sourceMappingURL=NumPanel.js.map