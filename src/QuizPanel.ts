class QuizPanel extends egret.Sprite {

    public constructor() {
        super();
        // 初始化数独答案数组
        this.initSudokuOutcome();
        // 绘制数独面板
        this.drawPanel();
    }

    // 数独内容实例 —— 数独核心内容
    private sudokuCore:SudokuCore = new SudokuCore();

    // 用户最终生成的结果 —— 81个方格，每个方格均可填写多个数字
    private sudokuOutcome:number[][] = [];
    // 初始化数独答案数组
    private initSudokuOutcome() {
        for(let i = 0; i < Data.quizTotalCeil; i++) {
            this.sudokuOutcome[i] = [this.sudokuCore.quizSudokuArray[i]];
        }
    }
    // 获取数独面板中某方格已填写的数字
    public getSudokuOutcomeInCeil(index:number):number[] {
        return this.sudokuOutcome[index];
    }
    // 删除数独面板中某方格中已填写的数字
    public deleteSudokuOutcomeInCeil(index:number) {
        this.sudokuOutcome[index].splice(0, this.getSudokuOutcomeInCeil(index).length);
    }
    // 向数独面板中某方格填写新的数字
    public addSudokuOutcomeInCeil(index:number, addingNumber:number) {
        // this.getSudokuOutcomeInCeil(index).splice(0, 0, addingNumber);
        this.sudokuOutcome[index].push(addingNumber);
    }
    // 根据 NumPanel 的 numIndex 更新 sudokuOutcome
    public updateSudokuOutcomeInCeil(index:number, content:number[]) {
        // 初始化当前 sudokuOutcome[index] 的内容
        this.deleteSudokuOutcomeInCeil(index);
        // 遍历 numIndex
        for(let i = 0; i < content.length; i++) {
            this.addSudokuOutcomeInCeil(index, content[i]);
        }
    }

    // 响应点击数字面板方格事件，该方法由 Main 调用，用于封装
    public onTouchTapNumCeil(content:number[]) {
        let index = this.prevFocusedIndex;
        this.updateSudokuOutcomeInCeil(index, content);
        this.quizCeilArray[index].touchTapCeil(content);
    }

    // 数独方格数组
    private quizCeilArray:QuizCeil[] = [];
    // 判断字段：是否有已选中方格，初始化默认为 -1，有则记录其在 quizCeilArray 中的 index
    private _prevFocusedIndex = -1;
    public set prevFocusedIndex(_prevFocusedIndex) {
        this._prevFocusedIndex = _prevFocusedIndex;
    }
    public get prevFocusedIndex() {
        return this._prevFocusedIndex;
    }

    // 绘制数独面板
    private drawPanel() {
        // 绘制横边框
        for(let i = 0; i < 4; i++) {
            let startX = 0;
            let startY = i * Data.quizCeilLength * 3 + Math.floor(Data.quizInnerCeilBorder / 2) + i * Data.quizInnerCeilBorder;
            let endX = Data.quizCeilLength * Data.quizCeilInLine + Data.quizInnerCeilBorder * 3;
            let endY = i * Data.quizCeilLength * 3 + Math.floor(Data.quizInnerCeilBorder / 2) + i * Data.quizInnerCeilBorder;

            this.drawBorder(startX, startY, endX, endY);
        }

        // 绘制竖边框
        for(let i = 0; i < 4; i++) {
            let startX = i * Data.quizCeilLength * 3 + Math.floor(Data.quizInnerCeilBorder / 2) + i * Data.quizInnerCeilBorder;
            let startY = 0;
            let endX = i * Data.quizCeilLength * 3 + Math.floor(Data.quizInnerCeilBorder / 2) + i * Data.quizInnerCeilBorder;
            let endY = Data.quizCeilLength * Data.quizCeilInLine + Data.quizInnerCeilBorder * 3;

            this.drawBorder(startX, startY, endX, endY);
        }

        // 绘制方格
        for(let i = 0; i < Data.quizTotalCeil; i++) {
            let x = i % 9 * Data.quizCeilLength;
            let y = Math.floor(i / 9) * Data.quizCeilLength;
            // 此处使用 this.sudokuContent.quizSudokuArray[i] 进行判断，确保所有数据为生成的原始数据
            let content:number[] = [this.sudokuCore.quizSudokuArray[i]];
            let ceil:QuizCeil = new QuizCeil(content);
            ceil.x = x + (Math.floor(i % 9 / 3) + 1) * Data.quizInnerCeilBorder;
            ceil.y = y + (Math.floor(i / 27) + 1) * Data.quizInnerCeilBorder;
            // 将 ceil 放入方格数组中
            this.quizCeilArray.push(ceil);
            // 添加 ceil 到界面中
            this.addChild(ceil);
            // 记录ceil的index
            ceil.index = i;
            
            // 为空方格添加点击监听
            if(this.sudokuCore.quizSudokuArray[i] == 0) {
                this.quizCeilArray[i].touchEnabled = true;
                this.quizCeilArray[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapQuizCeil, this);
            }
        }
    }

    // 绘制粗边框
    private drawBorder(startX, startY, endX, endY) {
        
        var border:egret.Shape = new egret.Shape();
        border.graphics.lineStyle(Data.quizInnerCeilBorder, Data.quizCeilBdColor);
        border.graphics.moveTo(startX, startY);
        border.graphics.lineTo(endX, endY);
        border.graphics.endFill();
        this.addChild(border);
    }

    
    // 点击数独方格事件
    private onTouchTapQuizCeil(event:egret.TouchEvent) {

        // 根据 _preFocusedIndex，恢复已选中方格的背景颜色/文字颜色 —— quizCeil.resumeCeil()
        // 更新 _preFocusedIndex，新点击的方格为当前 _prevFocusedIndex
        // 根据更新后 _preFocusedIndex，更新新选中的背景颜色/文字颜色 —— quizCeil.touchTapCeil()
        // 根据方格内已填写内容，修改数字面板中相应数字方格的背景颜色/文字颜色（通过 Main 实现）

        let currentIndex:number = event.target.index;

        let content:number[];

        // 检查是否有已选中的方格，如果有则先将选中方格恢复
        if(this.prevFocusedIndex > -1) {
            content = this.sudokuOutcome[this.prevFocusedIndex];
            console.log(content);
            this.quizCeilArray[this.prevFocusedIndex].resumeCeil(content);
        }

        // 将当前被触摸方格的index赋值给_prevFocusedIndex
        this.prevFocusedIndex = currentIndex;

        // 将新选中的方格切换为选中状态
        content = this.sudokuOutcome[this.prevFocusedIndex];
        this.quizCeilArray[this.prevFocusedIndex].touchTapCeil(content);

        // 数字面板修改需要通过 Main 来实现
        // 传递参数：content:number[]
        this.dispatchEventWith("onTouchTapQuizCeil", false, content, false);
    }

    // 响应键盘按键
    public onKeyDownForQuizCeil(kbContent:number) {

        let currentIndex:number;

        // 根据 content 获得当前选中的方格的 index
        // 当前没有选中的方格，则选中第一行左向右可选中的第一个
        if(this.prevFocusedIndex == -1) {
            for(let i = 0; i < Data.quizTotalCeil; i++) {
                if(this.sudokuCore.quizSudokuArray[i] == 0) {
                    currentIndex = i;
                    break;
                }
            }
        }
        else {
            // 初始化，如果基于 kbContent 计算的 index 不存在，则使用初始化
            currentIndex = this.prevFocusedIndex;

            // 根据方向键获取当前准备选中的 index
            if(kbContent == -1) {
                let i = 1;
                while(true) {
                    let index = this.prevFocusedIndex - i * 9;
                    if(index < 0) {
                        // 超过达上边界
                        break;
                    }
                    if(this.sudokuCore.quizSudokuArray[index] == 0) {
                        currentIndex = index;
                        break;
                    }
                    i++;
                }
            }
            else if(kbContent == -2) {
                let i = 1;
                while(true) {
                    let index = this.prevFocusedIndex + i;
                    if(Math.floor(index / 9) > Math.floor(currentIndex / 9)) {
                        // 超过右边界
                        break;
                    }
                    if(this.sudokuCore.quizSudokuArray[index] == 0) {
                        currentIndex = index;
                        break;
                    }
                    i++;
                }
            }
            else if(kbContent == -3) {
                let i = 1;
                while(true) {
                    let index = this.prevFocusedIndex + i * 9;
                    if(index > 80) {
                        // 超过下边界边界
                        break;
                    }
                    if(this.sudokuCore.quizSudokuArray[index] == 0) {
                        currentIndex = index;
                        break;
                    }
                    i++;
                }
            }
            else if(kbContent == -4) {
                let i = 1;
                while(true) {
                    let index = this.prevFocusedIndex - i;
                    if(Math.floor(index / 9) < Math.floor(currentIndex / 9)) {
                        // 超过左边界
                        break;
                    }
                    if(this.sudokuCore.quizSudokuArray[index] == 0) {
                        currentIndex = index;
                        break;
                    }
                    i++;
                }
            }
        }
        console.log("currentIndex:" + currentIndex);

        let content:number[];

        // 检查是否有已选中的方格，如果有则先将选中方格恢复
        if(this.prevFocusedIndex > -1) {
            content = this.sudokuOutcome[this.prevFocusedIndex];
            console.log(content);
            this.quizCeilArray[this.prevFocusedIndex].resumeCeil(content);
        }

        // 将当前被触摸方格的index赋值给_prevFocusedIndex
        this.prevFocusedIndex = currentIndex;

        // 将新选中的方格切换为选中状态
        content = this.sudokuOutcome[this.prevFocusedIndex];
        this.quizCeilArray[this.prevFocusedIndex].touchTapCeil(content);

        // 数字面板修改需要通过 Main 来实现
        // 传递参数：content:number[]
        this.dispatchEventWith("onTouchTapQuizCeil", false, content, false);       
    }

}