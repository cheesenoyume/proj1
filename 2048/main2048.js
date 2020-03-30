var board = new Array();
var score = 0;
var hasconflicted = new Array();

// 设为二维数组

//为了测试写的测试代码
// board=[[2,2,2,2],[2,2,2,2],[2,2,128,2],[2,2048,2,0]];
// board=[[256,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

// $(function(){
//     newgame();
// });不知道为什么不运行就干脆写js了
window.onload=function(){
        newgame();
         //按下按键控制上下左右移动
$(document).keydown(
    function(event){
        var key = event.keyCode;
        switch(key){
            case 37:
                if(moveLeft()){
                    generateOneNumber();
                    isGameOver();
                }
                break;
            case 38:
                if(moveUp()){
                    generateOneNumber();
                    isGameOver();
                }
                break;
            case 39:
                if(moveRight()){
                    generateOneNumber();
                    isGameOver();
                }
                break;
            case 40:
                if(moveDown()){
                    generateOneNumber();
                    isGameOver();
                }
                break;
            default:
                break;
        }
    }
)

}
function newgame(){
    //初始化
    init();
    //产生两个随机数
    generateOneNumber();
    generateOneNumber();
}


// 初始化，排列16个格子，并且把board里面的数字提到格子里
function init(){
    scrore = 0;
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            //错误：-和-中文英文形式写错，有空格
            var cell = $("#grid-"+i+"-"+j);
            cell.css("left",getPosLeft(i,j));
            cell.css("top",getPosTop(i,j));
        }
    }
    for(i=0;i<4;i++){
        board[i]= new Array(0,0,0,0);
        hasconflicted[i]= new Array(false,false,false,false);
    }
updateBoardNumber();
}


 function updateBoardNumber(){
     //首先把原来带有number-cell的都删除
     $(".number-cell").remove();
    //  再加入number-cell
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            //对grid-container进行添加格子
           // alert(board[i][j]+"dcfsd");
           //错误：j+'“拼字符串时出错
            $(".grid-container").append('<div class="number-cell" id="number-'+i+'-'+j+'"></div>');
            //获取单个格子，然后进行样式的改变
            var gridcell = $("#number-"+i+"-"+j);
            //如果数字是0，那么不显示出来
            if(board[i][j]==0){
                gridcell.css("width","0px");
                gridcell.css("height","0px");
                gridcell.css("left",getPosLeft(i,j));
                gridcell.css("top",getPosTop(i,j));
            }else{
                gridcell.css("width","100px");
                gridcell.css("height","100px");
                gridcell.css("color",getNumberColor(board[i][j]));
                gridcell.css("background-color",getBackgroundColor(board[i][j]));
                gridcell.css("left",getPosLeft(i,j));
                gridcell.css("top",getPosTop(i,j));
                //把数字放进新创建的格子
                gridcell.text(board[i][j]);
            }
         hasconflicted[i][j] = false;
        }
    }
 }


 function generateOneNumber(){
//先判断是否还有格子可以用
if(nospace(board)==true){
    return false;
    //不需要执行了
}
    //生成随机两个格子，横坐标纵坐标各选出一个，0-3之内
    //错误：Math.floor()要加math,Math.random()里面不用写范围
    var randomx = parseInt(Math.floor(4*Math.random()));
    var randomy= parseInt(Math.floor(4*Math.random()));
    //只有在格子里的数字是0时才可以操作，否则一直在循环。如果设while(true)效率特别慢
    var times = 0 ;
    while(times<50){
        if(board[randomx][randomy]==0){
            break;
        }
            randomx = parseInt(Math.floor(Math.random()));
            randomy= parseInt(Math.floor(Math.random()));
            times++;
    }
    //猜了50次还是没找出正确位置
    if (times == 50){
        for(i=0;i<4;i++){
            for(j=0;j<4;j++){
                if(board[i][j]==0){
                    randomx = i;
                    randomy = j;
                }
            }
        }
    }
    //生成随机数2或者4
    var data = (Math.random()<0.5) ? 2:4;
    //将随机数填到随机格子里
    board[randomx][randomy] = data;  
    showNumberWithAnimation(randomx,randomy,data);
    return true;
 }



function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //可以动的情况
    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            if(board[i][j] != 0){
                //遍历(i,j)左边的所有格子是否可以落脚
               for(k=0;k<j;k++){
                    if(board[i][k] == 0 && noHorizontalBlock(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j] ;
                        board[i][j] = 0;
                        //找到最左侧的0就可以移动
                        continue;
                    }
                    if(board[i][k] == board[i][j] && noHorizontalBlock(i,k,j,board) && !hasconflicted[i][k] ){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = 2*board[i][j] ;
                        board[i][j] = 0;
                        //add
                        score += board[i][k];
                        updateScore(score);
                        hasconflicted[i][k] = true;
                        continue;
                    }
               }
            }
        }
    }
    setTimeout("updateBoardNumber()",200);
    return true;
}
//右移的情况
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //可以动的情况
    for(i=0;i<4;i++){
        for(j=2;j>=0;j--){
            if(board[i][j] != 0){
               for(k=3;k>j;k--){
                    if(board[i][k] == 0 && noHorizontalBlock(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j] ;
                        board[i][j] = 0;
                        //找到最左侧的0就可以移动
                        continue;
                    }
                    if(board[i][k] == board[i][j] && noHorizontalBlock(i,j,k,board) && !hasconflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = 2*board[i][j] ;
                        board[i][j] = 0;
                        //add
                        score += board[i][k];
                        updateScore(score);
                        hasconflicted[i][k] = true;
                        continue;
                    }
               }
            }
        }
    }
    setTimeout("updateBoardNumber()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //可以动的情况
    for(j=0;j<4;j++){
        for(i=1;i<4;i++){
            if(board[i][j] != 0){
               for(k=0;k<i;k++){
                    if(board[k][j] == 0  && noVerticalBlock(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j] ;
                        board[i][j] = 0;
                        continue;
                    }
                    if(board[k][j] == board[i][j] && noVerticalBlock(j,k,i,board) && !hasconflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = 2*board[i][j] ;
                        board[i][j] = 0;
                        //add
                        score +=board[k][j];
                        updateScore(score);
                        hasconflicted[k][j] = true;
                        continue;
                    }
               }
            }
        }
    }
    setTimeout("updateBoardNumber()",200);
    return true;
}
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    //可以动的情况
    for(j=0;j<4;j++){
        for(i=2;i>=0;i--){
            if(board[i][j] != 0){
               for(k=3;k>i;k--){
                    if(board[k][j] == 0  && noVerticalBlock(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j] ;
                        board[i][j] = 0;
                        continue;
                    }
                    if(board[k][j] == board[i][j] && noVerticalBlock(j,i,k,board) && !hasconflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = 2*board[i][j] ;
                        board[i][j] = 0;
                        //add
                        score += board[k][j];
                        updateScore(score);
                        hasconflicted[k][j] = true;
                        continue;
                    }
               }
            }
        }
    }
    setTimeout("updateBoardNumber()",200);
    return true;
}

function isGameOver(){
    if(nospace(board) && nomove(board)){
        alert("gameover！");
    }
}