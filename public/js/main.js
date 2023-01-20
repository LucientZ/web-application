function handleNavResize(){
    if(window.innerWidth > 900){
        $('#login-btn').show();
        $('#more-btn').hide();
        $('#main-search-bar').show();
    }
    else if(window.innerWidth > 600){
        $('#more-btn').show();
        $('#login-btn').show();
        $('#main-search-bar').hide();
    }
    else{
        $('#more-btn').show();
        $('#login-btn').hide();
        $('#main-search-bar').hide();
    }
}

// JQuery resize listener
$(window).resize(function(){
    handleNavResize();
});

// Called once when page is loaded
$(document).ready(function(){
    console.log(window.innerWidth);
    handleNavResize();
});
