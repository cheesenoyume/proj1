//每个小方格离原点的位置
function getPosLeft(i,j){
    return 20+j*120;
}

function getPosTop(i,j){
    return 20+i*120;
}
//不同数字他们的背景颜色和字体颜色也不同
function getNumberColor(i){
    if(i<=4){
        return "brown";
    }else{
        return "black";
    }
}


function getBackgroundColor(i){
    switch (i){
        case 2:return "#eee4da";break;
        case 4:return "#f2b143";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67e5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#fdef72";break;
        case 256:return "#edee61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}

//判断是否还有格子可以用
function nospace(board){
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}


//遍历后三列的数字，如果单个格子上数字不为0，判断左边一个的数字是否为0或者等于自身，是就可以动
function canMoveLeft(board){
    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            if(board[i][j] != 0){
                if((board[i][j-1] == 0) || (board[i][j] == board[i][j-1])){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(i=0;i<4;i++){
        for(j=0;j<3;j++){
            if(board[i][j] != 0){
                if((board[i][j+1] == 0) || (board[i][j] == board[i][j+1])){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board){
    for(j=0;j<4;j++){
        for(i=1;i<4;i++){
            if(board[i][j] != 0){
                if((board[i-1][j] == 0) || (board[i][j] == board[i-1][j])){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board){
    for(j=0;j<4;j++){
        for(i=0;i<3;i++){
            if(board[i][j] != 0){
                if((board[i+1][j] == 0) || (board[i][j] == board[i+1][j])){
                    return true;
                }
            }
        }
    }
    return false;
}
//横向无阻碍
function noHorizontalBlock(row,col1,col2,board){
    for(var i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}

function noVerticalBlock(col,row1,row2,board){
    for(var j=row1+1;j<row2;j++){
        if(board[j][col]!=0){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if(!canMoveLeft(board) &&! canMoveRight(board) && !canMoveDown(board) && !canMoveUp(board)){
        return true;
    }
    return false;
}

function updateScore(score){
    $("#score").text(score);
}