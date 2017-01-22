class SudokuCore {
    public fullSudokuArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        4, 5, 6, 7, 8, 9, 1, 2, 3,
        7, 8, 9, 1, 2, 3, 4, 5, 6,
        2, 3, 4, 5, 6, 7, 8, 9, 1,
        5, 6, 7, 8, 9, 1, 2, 3, 4,
        8, 9, 1, 2, 3, 4, 5, 6, 7,
        3, 4, 5, 6, 7, 8, 9, 1, 2,
        6, 7, 8, 9, 1, 2, 3, 4, 5,
        9, 1, 2, 3, 4, 5, 6, 7, 8,
    ];
    public quizSudokuArray = [];
    // 全部正确标记，0 为有错误，1 为全部正确，默认为 0
    totalCorrectness = 0;
    // 错误记录，记录方式为两个错位位置的数组
    errors = [];
    // 待扣除数字数量
    toEarseAmount = 50;

    public constructor() {
        this.sudokuGenerator();
    }

    private sudokuGenerator() {
        // print console log before swap
        this.printSudokuInConsole(this.fullSudokuArray);

        for(let i = 0; i < this.randomNumber(0,20); i++) {
            switch(this.randomNumber(0,6)) {
                case 0:
                    // swapping two rows in same group
                    this.swapTwoRows(this.randomNumber(0,3), this.randomNumber(0,3), this.randomNumber(0,3));
                    break;
                case 1:
                    // swapping two columns in same group
                    this.swapTwoCols(this.randomNumber(0,3), this.randomNumber(0,3), this.randomNumber(0,3));
                    break;
                case 2:
                    // swapping two groups of rows
                    this.swapTwoRowGroups(this.randomNumber(0,3), this.randomNumber(0,3));
                    break;
                case 3:
                    // swapping two groups of columns
                    this.swapTwoColGroups(this.randomNumber(0,3), this.randomNumber(0,3));
                    break;
                case 4:
                    // transposing the whole grid
                    this.transposeMatrix();
                    break;
                case 5:
                    break;
            }
        }

        // print console log after swap
        this.printSudokuInConsole(this.fullSudokuArray);

        // evaluate sudoku
        this.sudokuEvaluator();
        console.log(this.totalCorrectness);

        // 验证完成，数独正确
        // 则开始擦除部分数字，形成题目
        this.earseToPuzzle();
        // print
        this.printSudokuInConsole(this.quizSudokuArray);

    }

    /**
     * 生成随机数
     * @return int Returns a random number between min (inclusive) and max (exclusive)
     */
    private randomNumber(start, end) {
        // let timestampArray = (new Date()).valueOf().toString().split("");
        // let timestampSplitSum = 0;

        // for(let i = 0; i < timestampArray.length; i++) {
        //     timestampSplitSum += parseInt(timestampArray[i]);
        // }
        
        // return (timestampSplitSum % (end + 1)) + start;

        return Math.floor(Math.random() * (end - start) + start);
    }

    /**
     * swapping two rows in same group
     * @param group 所在组号[0,2]
     * @param fisrtRow 第一行[0,2]
     * @param secondRow 第二行[0,2]
     */
    private swapTwoRows(group, firstRow, secondRow) {
        // group 0 —— (0-8)(9-17)(18-26)
        // group 1 —— (27-35)(36-44)(45-53)
        // group 2 —— (54-62)(63-71)(72-80)

        // tempRow
        let tempRow = [];
        // firstRow to tempRow
        for(let i = 0; i < 9; i++) {
            tempRow[i] = this.fullSudokuArray[group * 27 + firstRow * 9 + i];
        }
        // secondRow to fisrtRow
        for(let i = 0; i < 9; i++) {
            this.fullSudokuArray[group * 27 + firstRow * 9 + i] = this.fullSudokuArray[group * 27 + secondRow * 9 + i];
        }
        // tempRow to secondRow
        for(let i = 0; i < 9; i++) {
            this.fullSudokuArray[group * 27 + secondRow * 9 + i] = tempRow[i];
        }
    }

    /**
     * swapping two cols in same group
     * @param group 所在组号[0,2]
     * @param fisrtCol 第一列[0,2]
     * @param secondCol 第二列[0,2]
     */
    private swapTwoCols(group, firstCol, secondCol) {
        // tempCol
        let tempCol = [];
        // firstCol to tempCol
        for(let i = 0; i < 9; i ++) {
            tempCol[i] = this.fullSudokuArray[i * 9 + group * 3 + firstCol];
        }
        // secondCol to firstCol
        for(let i = 0; i < 9; i ++) {
            this.fullSudokuArray[i * 9 + group * 3 + firstCol] = this.fullSudokuArray[i * 9 + group * 3 + secondCol];
        }
        // tempCol to secondCol
        for(let i = 0; i < 9; i ++) {
            this.fullSudokuArray[i * 9 + group * 3 + secondCol] = tempCol[i];
        }
    }

    /**
     * swapping two groups of rows
     * @param firstGroup 第一组
     * @param secondGroup 第二组
     */
    private swapTwoRowGroups(firstGroup, secondGroup) {
        // Group 0 —— 0,9,18
        // Group 1 —— 27,36,45
        // Group 2 —— 54,63,72

        // tempRow
        let tempRow = [];
        // loop for 1-3 row of group
        for(let row = 0; row < 3; row++) {
            for(let i = 0; i < 9; i++) {
                // fisrtRow to tempRow
                tempRow[i] = this.fullSudokuArray[firstGroup * 27 + row * 9 + i];
                // secondRow to firstRow
                this.fullSudokuArray[firstGroup * 27 + row * 9 + i] = this.fullSudokuArray[secondGroup * 27 + row * 9 + i];
                // tempRow to secondRow
                this.fullSudokuArray[secondGroup * 27 + row * 9 + i] = tempRow[i];
            }
        }
    }

    /**
     * swapping two groups of cols
     * @param firstGroup 第一组
     * @param secondGroup 第二组
     */
    private swapTwoColGroups(firstGroup, secondGroup) {
        // tempCol
        let tempCol = [];
        // loop for 1-3 col of group
        for(let col = 0; col < 3; col++) {
            for(let i = 0; i < 9; i++) {
                // firstCol to tempCol
                tempCol[i] = this.fullSudokuArray[i * 9 + firstGroup * 3 + col];
                // secondCol to fisrtCol
                this.fullSudokuArray[i * 9 + firstGroup * 3 + col] = this.fullSudokuArray[i * 9 + secondGroup * 3 + col];
                // tempCol to secondCol
                this.fullSudokuArray[i * 9 + secondGroup * 3 + col] = tempCol[i];
            }
        }
    }

    /**
     * transposing the whole grid
     */
    private transposeMatrix() {
        let temp = 0;
        for(let i = 0; i < 9; i++) { // row
            for(let j = 0; j < 9; j++) { // col
                if(i < j) {
                    // right top to temp
                    temp = this.fullSudokuArray[i * 9 + j];
                    // left bottom to right top
                    this.fullSudokuArray[i * 9 + j] = this.fullSudokuArray[j * 9 + i];
                    // temp to left bottom
                    this.fullSudokuArray[j * 9 + i] = temp;
                }
            }
        }
    }

    private sudokuEvaluator() {

        // 0-9 数组位暂存器
        let register = [0,0,0,0,0,0,0,0,0];

        // 检查九横
        for(let row = 0; row < 9; row++) {
            // 遍历一行，存于 temp[] 中
            for(let col = 0; col < 9; col++) {
                // 判断 register[this.fullSudokuArray[row * 9 + col]] 是否不为 0
                // 为 0 则表示该位置代表数字第一次出现，记录 row * 9 + col
                // 不为 0 则表示该位置代表数字已出现过，答案出现错误
                // console.log("Number " + this.fullSudokuArray[row * 9 + col] + " in register is " + register[this.fullSudokuArray[row * 9 + col] - 1]);
                if(register[this.fullSudokuArray[row * 9 + col] - 1] == 0) {
                    // this.fullSudokuArray[row * 9 + col] 置 1，表示 0-9 已出现
                    register[this.fullSudokuArray[row * 9 + col] - 1] = row * 9 + col;
                }
                else {
                    // 出现错误，保存错误信息
                    this.errors.push([register[this.fullSudokuArray[row * 9 + col] - 1], (row * 9 + col)]);

                }
            }
            // 重置：0-9 数组位暂存器
            register = [0,0,0,0,0,0,0,0,0];
        }
        // 重置：0-9 数组位暂存器
        register = [0,0,0,0,0,0,0,0,0];
        // 检查九纵
        for(let col = 0; col < 9; col++) {
            for(let row = 0; row < 9; row++) {
                // console.log("Number " + this.fullSudokuArray[row * 9 + col] + " in register is " + register[this.fullSudokuArray[row * 9 + col] - 1]);
                if(register[this.fullSudokuArray[row * 9 + col] - 1] == 0) {
                    // this.fullSudokuArray[row * 9 + col] 置 1，表示 0-9 已出现
                    register[this.fullSudokuArray[row * 9 + col] - 1] = row * 9 + col;
                }
                else {
                    // 出现错误，保存错误信息
                    this.errors.push([register[this.fullSudokuArray[row * 9 + col] - 1], (row * 9 + col)]);
                }
            }
            // 重置：0-9 数组位暂存器
            register = [0,0,0,0,0,0,0,0,0];
        }
        // 重置：0-9 数组位暂存器
        register = [0,0,0,0,0,0,0,0,0];
        // 检查九宫格
        // 0,1,2,9,10,11,18,19,20
        // 3,4,5,12,13,14,21,22,23
        // 6,7,8,15,16,17,24,25,26
        // 27,28,29,36,37,38,45,46,47
        // 30,31,32,39,40,41,48,49,50
        // 33,34,35,42,43,44,51,52,53
        // 54,55,56,63,64,65,72,73,74
        // 57,58,59,66,67,68,75,76,77
        // 60,61,62,69,70,71,78,79,80
        for(let spRow = 0; spRow < 9; spRow = spRow + 3) {
            for(let spCol = 0; spCol < 9; spCol = spCol + 3) {
                for(let blockRow = 0; blockRow < 3; blockRow++) {
                    for(let blockCol = 0; blockCol < 3; blockCol++) {
                        let tempIndex = spRow * 9 + spCol + blockRow * 9 + blockCol;
                        // console.log("Number " + this.fullSudokuArray[tempIndex] + " in register is " + register[this.fullSudokuArray[tempIndex] - 1]);
                        if(register[this.fullSudokuArray[tempIndex] - 1] == 0) {
                            // this.fullSudokuArray[row * 9 + col] 置 1，表示 0-9 已出现
                            register[this.fullSudokuArray[tempIndex] - 1] = tempIndex;
                        }
                        else {
                            // 出现错误，保存错误信息
                            this.errors.push([register[this.fullSudokuArray[tempIndex] - 1], tempIndex]);
                        }
                    }
                }
                // 重置：0-9 数组位暂存器
                register = [0,0,0,0,0,0,0,0,0];
            }
        }

        // 赋值 totalCorrectness
        this.errors.length > 0 ? this.totalCorrectness = 0 : this.totalCorrectness = 1;
    }

    private earseToPuzzle() {

        // 初始化 quizSudokuArray
        this.quizSudokuArray = this.fullSudokuArray;

        // 已擦除统计
        let hasEarsedAmount = 0;

        while(hasEarsedAmount < this.toEarseAmount) {
            // 按横擦除，每行擦除 0-3 个
            if(hasEarsedAmount < this.toEarseAmount) {
                for(let row = 0; row < 9; row++) {
                    for(let times = 0; times < this.randomNumber(0,3); times++) {
                        // [0,9]，大于9意为不擦除
                        let col = this.randomNumber(0, 9);
                        if(hasEarsedAmount < this.toEarseAmount) {
                            this.quizSudokuArray[row * 9 + col] = 0;
                            hasEarsedAmount++;
                        }
                        else {
                            break;
                        }
                    }
                    if(hasEarsedAmount >= this.toEarseAmount) {
                        break;
                    }
                }
            }
            // 按纵擦除，每纵擦除 0-3 个
            if(hasEarsedAmount < this.toEarseAmount) {
                for(let col = 0; col < 9; col++) {
                    for(let times = 0; times < this.randomNumber(0,3); times++) {
                        let row = this.randomNumber(0,9);
                        if(hasEarsedAmount < this.toEarseAmount) {
                            this.quizSudokuArray[row * 9 + col] = 0;
                            hasEarsedAmount++;
                        }
                        else {
                            break;
                        }
                    }
                    if(hasEarsedAmount >= this.toEarseAmount) {
                        break;
                    }
                }
            }
        }
    }

    private printSudokuInConsole(sudokuArray) {
        for(let row = 0; row < 9; row++) {
            console.log(sudokuArray[row * 9 + 0] + " "
                + sudokuArray[row * 9 + 1] + " " + sudokuArray[row * 9 + 2] + " "
                + sudokuArray[row * 9 + 3] + " " + sudokuArray[row * 9 + 4] + " "
                + sudokuArray[row * 9 + 5] + " " + sudokuArray[row * 9 + 6] + " "
                + sudokuArray[row * 9 + 7] + " " + sudokuArray[row * 9 + 8]);
        }
        console.log("\n");
    }
}