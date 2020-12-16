/*
    script.js
    - running a Review on Spotlights system.
*/

/* onSpotlight */
var onSpotlight = function(height, totalHeight, top, speed){
    $("#spotlightPanel").show();

    var viewHeight = speed * 500;
    var middle = top + height / 2;
    var rangeTop = middle - viewHeight / 2;
    if(rangeTop < 0) rangeTop = 0;
    var rangeBottom = middle + viewHeight / 2;
    if(rangeBottom > totalHeight) rangeBottom = totalHeight;

    // for Headings
    headings = []
    for(h = 1; h < 7; h++){
        for(i = 0; i < $(`h${h}`).index(); i++){
            var y = $(`h${h}:nth-of-type(${i+1})`).position().top;
            if(y < rangeTop) continue;
            if(y > rangeBottom) break;

            // add selected heading
            headings.push([h, y, $(`h${h}:nth-of-type(${i+1})`).text(), y > top && y < (top + height)]);
        }
    }

    // sort with y
    for(i = 0; i < headings.length; i++){
        for(j = i+1; j < headings.length; j++){
            if(headings[i][1] > headings[j][1]){
                temp = headings[i];
                headings[i] = headings[j];
                headings[j] = temp;
            }
        }
    }

    code = ''
    headings.forEach(heading => {
        code += `<div class="innerbox" style="margin-left: ${heading[0]-1}em; color: ${heading[3] ? "red" : "black"}">`;
        code += `<h${heading[0]}>${heading[2]}</h${heading[0]}></div>`
    });

    $("#spotlightPanel").html(code);
}

var offSpotlight = function(){
    // $("#spotlightPanel").hide();
}

/* On Page Loaded */
$(function(){
    /* some constant variables */
    const WINDOW_HEIGHT = $(window).height();
    const SCROLLABLE_HEIGHT = $(document).height();
    const CRITERIA_SPEED = WINDOW_HEIGHT / 500; // 500ms rule

    console.log(CRITERIA_SPEED);

    var time_last_scrolled = Date.now();
    var top_last_scrolled = 0;

    var spotlight_on = false;

    $("#spotlightPanel").hide();

    /* On Body Scrolled */
    $(document).scroll(function(){
        var top = $(document).scrollTop();
        var now = Date.now();

        var speed = Math.abs(top - top_last_scrolled) / (now - time_last_scrolled);

        if(spotlight_on){
            if(speed < CRITERIA_SPEED){
                spotlight_on = false;
            }
        }
        else{
            if(speed > CRITERIA_SPEED){
                spotlight_on = true;
            }
        }

        if(spotlight_on) onSpotlight(WINDOW_HEIGHT, SCROLLABLE_HEIGHT, top, speed);
        else offSpotlight();

        top_last_scrolled = top;
        time_last_scrolled = now;
    })
});