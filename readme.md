### 路由

baseUrl localhost:3000

```
/goods/getDetailGoodsInfo  获取商品的详情
method   POST 
params
	goodsId (Number)
result 
	{
		code,
		message
	}
/goods/getCategoryList  获取商品 一级分类
method  GET
params  null

/goods/getCategorySubList  获取商品 二级分类
method  POST
params  
		categoryId  一级分类id

/goods/getGoodsListByCategorySubID  获取商品列表 二级分类
method  POST
params  
		categorySubId  一级分类id



```

###  this.setData是异步的

```
this.setData({},()=>{数据改变后触发})


react
this.setState(()=>{
    return {

    }
},(newState)=>{
	
})
```

### 跳转路由传参


  