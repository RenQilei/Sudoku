/**
 * 游戏数据
 */

class Data {
    /**
     * 整体数据
     */
    private static _paddingTop = 100;
    private static _paddingRight = 100;
    private static _paddingBottom = 100;
    private static _paddingLeft = 100;

    /**
     * 数独区域数据
     */
    // private static _quizPanelLength = egret.MainContext.instance.stage.stageWidth - Layout._paddingLeft - Layout._paddingRight;
    // private static _quizCeilLength = Layout._quizPanelLength / QuizPanel.totalCeilInLine;
    // 方格总数
    public static quizTotalCeil = 81;
    // 方格一行数量
    public static quizCeilInLine = 9;
    // 方格边长
    public static quizCeilLength = 90;
    // 方格内提示文本边长
    public static quizHintLength = Data.quizCeilLength / 3;
    // 方格默认背景颜色
    public static quizCeilBgColorDefault = 0xffffff;
    // 方格选中背景颜色
    public static quizCeilBgColorFocused = 0xaaaaaa;
    // 方格边框宽度
    public static quizCeilBdBorder = 5;
    // 方格边框颜色
    public static quizCeilBdColor = 0x333333;
    // 方格中内容默认颜色
    public static quizCeilTextColorDefault = 0x000000;
    // 方格中内容确认答案颜色
    public static quizCeilTextColorFocused = 0xffffff;
    // 方格中内容作为答案时字号
    public static quizCeilAnswerTextSize = 50;
    // 方格中内容作为提示时字号
    public static quizCeilHintTextSize = 20;
    // 方格行列间线条宽度
    public static quizInnerCeilBorder = 10;

    /**
     * 数字区域数据
     */
    public static numCeilLength = 100;
    // 方格背景默认颜色
    public static numCeilBgColorDefault = 0xffffff;
    // 方格背景确认答案颜色
    public static numCeilBgColorAnswer = 0x00a381;
    // 方格背景提示状态颜色
    public static numCeilBgColorHint = 0xffec47;
    public static numCeilBdBorder = 5;
    public static numCeilBdColor = 0x333333;
    // 方格中内容默认颜色
    public static numCeilTextColorDefault = 0x000000;
    // 方格中内容确认答案颜色
    public static numCeilTextColorAnswer = 0xffffff;
    // 方格中内容作为提示颜色
    public static numCeilTextColorHint = 0xffffff;
    public static numCeilTextSize = 50;

}