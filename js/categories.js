$(function () {
    init()

    //   设置全局变量
    var cateDates;
    var leftScroll;
    //初始化
    function init() {
        setFont();
        renderCategories()
        eventList()
       
    }
    //    渲染的数据
    function renderCategories() {
        // 定义一个key cates
        if (localStorage.getItem('cates')) {

            // var catesStr =localStorage.getItem('cates')
            //  cateDates =JSON.parse(catesStr);
            //  console.log(cateDates)
            //
            var catesStr = localStorage.getItem('cates')
            var localData = JSON.parse(catesStr);
            if (Date.now() - localData.time > 1000 * 1000) {
                categories()
            } else {
                cateDates = localData.data
                renserLeft()
                renderRight(0)
            }

        } else {
            categories()
        }

    }
    // 发送请求数据
    function categories() {
        $.get('categories', function (result) {
            if (result.meta.status == 200) {
                result.time = Date.now()
                // console.log(result)
                cateDates = result.data
                var obj = {
                    time: Date.now(),
                    data: cateDates
                }
                catesStr = JSON.stringify(obj)
                // console.log( catesStr)
                localStorage.setItem('cates', catesStr)
                renserLeft()
                renderRight(0)


            }
        })
    }
    // 处理左边的样式
    function eventList() {
        $('.product_left').on('tap', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
           
            index = $(this).index();
            renderRight(index)
            leftScroll.scrollToElement(this);
         
        })
        window.onresize=function(){
            setFont()
        }
    }
    // 封装渲染右边的函数
    function renderRight(index) {
        childrens = cateDates[index].children
        var html = template('rightTp', {
            data: childrens
        })
        $('.product_right').html(html)
        var index = $('.product_right img').length
        $('.product_right img').on('load', function () {
            index--;
            if (index == 0) {
                 var rightScroll = new IScroll('.product_right')
            }
        })




    }
    //封装渲染左边的的函数
    function renserLeft() {
        var html = template('categoriesTp', { data: cateDates })
        $('.product_left').html(html);
        leftScroll = new IScroll('.product_left')

    }

    function setFont() {
        // 基础值
        var baseVal = 100;
        // 样稿的宽度
        var pageWidth = 320
        // 要适配的屏幕=当前屏幕的宽度
        var screenWidth = document.querySelector('html').offsetWidth;
        var fz = baseVal * screenWidth / pageWidth
        document.querySelector('html').style.fontSize=fz+"px"
    }

})