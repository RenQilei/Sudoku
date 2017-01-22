/**
 * 游戏数据
 */
var Data = (function () {
    function Data() {
    }
    var d = __define,c=Data,p=c.prototype;
    /**
     * 整体数据
     */
    Data._paddingTop = 100;
    Data._paddingRight = 100;
    Data._paddingBottom = 100;
    Data._paddingLeft = 100;
    /**
     * 数独区域数据
     */
    // private static _quizPanelLength = egret.MainContext.instance.stage.stageWidth - Layout._paddingLeft - Layout._paddingRight;
    // private static _quizCeilLength = Layout._quizPanelLength / QuizPanel.totalCeilInLine;
    // 方格总数
    Data.quizTotalCeil = 81;
    // 方格一行数量
    Data.quizCeilInLine = 9;
    // 方格边长
    Data.quizCeilLength = 90;
    // 方格内提示文本边长
    Data.quizHintLength = Data.quizCeilLength / 3;
    // 方格默认背景颜色
    Data.quizCeilBgColorDefault = 0xffffff;
    // 方格选中背景颜色
    Data.quizCeilBgColorFocused = 0xaaaaaa;
    // 方格边框宽度
    Data.quizCeilBdBorder = 5;
    // 方格边框颜色
    Data.quizCeilBdColor = 0x333333;
    // 方格中内容默认颜色
    Data.quizCeilTextColorDefault = 0x000000;
    // 方格中内容确认答案颜色
    Data.quizCeilTextColorFocused = 0xffffff;
    // 方格中内容作为答案时字号
    Data.quizCeilAnswerTextSize = 50;
    // 方格中内容作为提示时字号
    Data.quizCeilHintTextSize = 20;
    // 方格行列间线条宽度
    Data.quizInnerCeilBorder = 10;
    /**
     * 数字区域数据
     */
    Data.numCeilLength = 100;
    // 方格背景默认颜色
    Data.numCeilBgColorDefault = 0xffffff;
    // 方格背景确认答案颜色
    Data.numCeilBgColorAnswer = 0x00a381;
    // 方格背景提示状态颜色
    Data.numCeilBgColorHint = 0xffec47;
    Data.numCeilBdBorder = 5;
    Data.numCeilBdColor = 0x333333;
    // 方格中内容默认颜色
    Data.numCeilTextColorDefault = 0x000000;
    // 方格中内容确认答案颜色
    Data.numCeilTextColorAnswer = 0xffffff;
    // 方格中内容作为提示颜色
    Data.numCeilTextColorHint = 0xffffff;
    Data.numCeilTextSize = 50;
    return Data;
}());
egret.registerClass(Data,'Data');
//# sourceMappingURL=Data.js.map