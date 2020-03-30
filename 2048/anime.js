//将新更新的数字的样式产生变化，并且做一个动画效果
function showNumberWithAnimation(i,j,data){
    var gridcell = $("#number-"+i+"-"+j);
    
    gridcell.css("color",getNumberColor(data));
    gridcell.css("background-color",getBackgroundColor(data));
                //把数字放进新创建的格子
    gridcell.text(data);
    gridcell.animate({
        "width":"100px",
        "height":"100px",
        "left":getPosLeft(i,j),
        "top":getPosTop(i,j)
    },50)
}


function  showMoveAnimation(fromx,fromy,tox,toy){
    var gridcell = $("#number-"+fromx+"-"+fromy);
    gridcell.animate({
        "width":"100px",
        "height":"100px",
        "left":getPosLeft(tox,toy),
        "top":getPosTop(tox,toy)
    },200)
}