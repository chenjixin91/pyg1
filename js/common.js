$(function(){
    $.ajaxSettings.beforeSend=function(xhr, ajaxobj){
        ajaxobj.url='http://api.pyg.ak48.xyz/api/public/v1/'+ajaxobj.url
        $('body').addClass('loadding')
    }
    $.ajaxSettings.complete=function(){
        $('body').removeClass('loadding')
    }
})