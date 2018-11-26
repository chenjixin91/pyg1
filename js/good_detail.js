$(function () {
    init()
    // 初始化
    function init() {
        getGoodsDetai()
    }
    
    // 获取ID
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    // 渲染数据
     function getGoodsDetai() {
        $.get("goods/detail", {goods_id: getQueryString("goods_id")}, function (result) {
       if(result.meta.status==200){
           var html=template('goods_detailTp',result.data)
          $('.pyg_view').html(html)
          var gallery = mui('.mui-slider');
          gallery.slider({
          interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
       }

        })
    }
   
})