class Main extends egret.DisplayObjectContainer {

    private quizPanel:QuizPanel = new QuizPanel();
    private numPanel:NumPanel = new NumPanel();

    private keyboard:KeyBoard = new KeyBoard();

    public constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // 添加键盘监听事件
        this.keyboard.addEventListener(KeyBoard.onkeydown, this.onKeyDown, this);
    }

    private onAddToStage() {

        this.addChild(this.quizPanel);
        this.quizPanel.addEventListener("onTouchTapQuizCeil", this.onTouchTapQuizCeil, this);

        this.addChild(this.numPanel);
        this.numPanel.addEventListener("onTouchTapNumCeil", this.onTouchTapNumCeil, this);
    }

    /**
     * 触摸数独面板中方格事件
     */
    private onTouchTapQuizCeil(event:egret.Event) {
        
        // 根据传递进的内容（当前点击方格中已填写的数字），修改数字面板中相应数字方格的背景颜色/文字颜色
        let content:number[] = event.data;
        this.numPanel.drawHighlightCeil(content);

    }

    /**
     * 点击数字面板中方格事件
     */
    private onTouchTapNumCeil(event:egret.Event) {

        // 当数独面板中已选中方格，则激活对数独面板的更新
        if(this.quizPanel.prevFocusedIndex > -1) {
            // 通过传递进的 numIndex，更新数独面板已选中方格的填写内容
            let content:number[] = event.data;
            this.quizPanel.onTouchTapNumCeil(content);

            // 重新绘制数字面板
            this.numPanel.updateAllCeil();
        }
        
    }

    /**
     * 键盘监听事件
     */
    private onKeyDown(event) {
        let kbContent:number;

        // 监听上箭头 —— kbContent = -1
        if(this.keyboard.isContain(event.data, KeyBoard.UpArrow)) {
            kbContent = -1;
        }
        // 监听右箭头 —— kbContent = -2
        if(this.keyboard.isContain(event.data, KeyBoard.RightArrow)) {
            kbContent = -2;
        }
        // 监听下箭头 —— kbContent = -3
        if(this.keyboard.isContain(event.data, KeyBoard.DownArrow)) {
            kbContent = -3;
        }
        // 监听左箭头 —— kbContent = -4
        if(this.keyboard.isContain(event.data, KeyBoard.keyArrow)) {
            kbContent = -4;
        }
        // 1
        if(this.keyboard.isContain(event.data, KeyBoard.Num_1) || this.keyboard.isContain(event.data, KeyBoard.key_1)) {
            kbContent = 1;
        }
        // 2
        if(this.keyboard.isContain(event.data, KeyBoard.Num_2) || this.keyboard.isContain(event.data, KeyBoard.key_2)) {
            kbContent = 2;
        }
        // 3
        if(this.keyboard.isContain(event.data, KeyBoard.Num_3) || this.keyboard.isContain(event.data, KeyBoard.key_3)) {
            kbContent = 3;
        }
        // 4
        if(this.keyboard.isContain(event.data, KeyBoard.Num_4) || this.keyboard.isContain(event.data, KeyBoard.key_4)) {
            kbContent = 4;
        }
        // 5
        if(this.keyboard.isContain(event.data, KeyBoard.Num_5) || this.keyboard.isContain(event.data, KeyBoard.key_5)) {
            kbContent = 5;
        }
        // 6
        if(this.keyboard.isContain(event.data, KeyBoard.Num_6) || this.keyboard.isContain(event.data, KeyBoard.key_6)) {
            kbContent = 6;
        }
        // 7
        if(this.keyboard.isContain(event.data, KeyBoard.Num_7) || this.keyboard.isContain(event.data, KeyBoard.key_7)) {
            kbContent = 7;
        }
        // 8
        if(this.keyboard.isContain(event.data, KeyBoard.Num_8) || this.keyboard.isContain(event.data, KeyBoard.key_8)) {
            kbContent = 8;
        }
        // 9
        if(this.keyboard.isContain(event.data, KeyBoard.Num_9) || this.keyboard.isContain(event.data, KeyBoard.key_9)) {
            kbContent = 9;
        }

        // 方向键，会触发 quizPanel
        if(kbContent < 0) {
            this.quizPanel.onKeyDownForQuizCeil(kbContent);
        }
        // 数字键，会触发 numPanel
        if(kbContent > 0) {
            this.numPanel.onKeyDownForNumCeil(kbContent);
        }
    }
}