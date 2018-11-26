$(function () {
    var objPa = {
        query: "",
        cid: getQueryString('cid'),
        pagenum: 1,
        pagesize: 10
    }
    var pageCount = 1;
    init()
    enentList()
    // 初始化
    function init() {
        // getGoodsSearch()
        mui.init({
            pullRefresh: {
                container: ".pyg_view",
                down: {
                    auto: true,
                    //  触发下拉刷新时自动触发
                    callback: function () {
                        objPa.pagenum=1;
                        getGoodsSearch(function (goods) {
                            var html = template('goods_listTp', { data: goods })
                            console.log(goods);
                            $('.goods_list').html(html)
                            mui('.pyg_view').pullRefresh().endPulldownToRefresh()
                            mui('.pyg_view').pullRefresh().refresh(true)
                        })
                    }
                },
                up: {
                    //  触发上拉刷新时自动触发
                    callback: function () {
                        if (objPa.pagenum >= pageCount) {
                            // 没有下一页
                            mui('.pyg_view').pullRefresh().endPullupToRefresh(true)
                        } else {
                            // 有下一页
                            objPa.pagenum++;
                            getGoodsSearch(function(goods){
                                var html = template('goods_listTp', { data: goods })
                                $('.goods_list').append(html) 
                                mui('.pyg_view').pullRefresh().endPullupToRefresh(false)
                            })
                        }
                    }
                }
            }
        });
        enentList()
    }
    function enentList(){
        $('.goods_list  ').on('tap','a',function(){
         href=this.href;
        location.href=href;
            
        })
    }
      
    function getGoodsSearch(callback) {
        $.get('goods/search', objPa, function (result) {
            if (result.meta.status == 200) {
                pageCount = Math.ceil(result.data.total / objPa.pagesize)
                callback(result.data.goods)
                
            }

        })
    }








    // 截取ID
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

})