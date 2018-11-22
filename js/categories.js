$(function(){
    getCategories()   

    function getCategories(){
     $.get('http://api.pyg.ak48.xyz/api/public/v1/categories',function(result){
         if(result.meta.status==200){
             var html =template('categoriesTp',{data:result.data})
             $('.product_left').html(html);
         }
     })
    }
})