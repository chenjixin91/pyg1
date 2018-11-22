$(function () {
    init()



    //  初始化
    function init() {
        // 轮播图
        getSwiperdata()
        // 首页分页
        getCatitems()
       //商品类表
       getGoodslist()

    }
    // 轮播图
    function getSwiperdata() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata", function (result) {
            if (result.meta.status == 200) {
                var html = template('swiperdataTp', { data: result.data })
                $('.pyg_bannner').html(html)
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                })
            } else {
                //失败
            }
        })
    }
    //分页结构
    function getCatitems(){
        $.get('http://api.pyg.ak48.xyz/api/public/v1/home/catitems',function(result){
            if(result.meta.status==200){
               var html=template('catitemsTp',{
                   data:result.data
                  })
                  $('.pyg_nav').html(html);
            }else{
                //失败
            }
        })
    }
    // 商品类表
    function getGoodslist(){
        $.get('http://api.pyg.ak48.xyz/api/public/v1/home/goodslist',function(result){
            var html=template('goodslistTp',{data:result.data})
            $('.product').html(html);
        })
    }
    
})