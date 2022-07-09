// 实时获取面包屑导航区
getLastedStr = (goodData, type) => {
    if (type === 'a') {
        return goodData.path.reduce((pre, cur, index) => {
            if (index === goodData.path.length - 1) return pre + `<a>${cur.title}</a>`
            return pre + `<a href="${cur.url}">${cur.title}</a> / `
        }, '')
    } else if (type === 'li') {
        return goodData.imagessrc.reduce((pre, cur) => pre + `<li class="listitem"><img src="${cur.s}"></li>`, '')
    }

}

// 轮播图移动
move = (flag) => {
    // 获取距离差
    var disX = flag ? -74 : 74
    // 获取起始位置
    var startX = listqueue.offsetLeft
    // 获取终止位置 终止位置 = 起始位置 + 距离差
    var endX = startX + disX
    listqueue.style.left = endX + 'px'
    if (endX >= 0) {
        listqueue.style.left = 0
    } else if (endX <= -(listqueue.offsetWidth - outer.offsetWidth)) {
        listqueue.style.left = -(listqueue.offsetWidth - outer.offsetWidth) + 'px'
    }
}

// 动态返回商品第一部分信息
firstSectionData = (goodData, price) => {
    var data = goodData.goodsDetail
    var topGoodsList =
        `
    <h3>${data.title}</h3>
<p class="discount">${data.recommend}</p>
<!-- 价格栏 -->
<div class="colorbox">
    <!-- 独立的一行内容 -->
    <div class="boxitem">
        <!-- 属性名 -->
        <span class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格 </span>
        <!-- 属性内容 -->
        <span class="content">
            <span class="price_font">¥</span>
            <span class="price">${data.price+price}</span>
            <span class="price_after">降价通知</span>
        </span>
    </div>
    <!-- 独立的一行内容 -->
    <div class="boxitem">
        <!-- 属性名 -->
        <span class="title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销 </span>
        <!-- 属性内容 -->
        <span class="content">
            <span class="add_price">${data.promoteSales.type}</span>
            <span
                style="padding-right: 60px;color: #999;">${data.promoteSales.content}</span>
        </span>
    </div>
</div>
<div class="boxitem">

    <!-- 属性名 -->
    <span class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持 </span>
    <!-- 属性内容 -->
    <span class="content">
        <span style="color: #999;">${data.support}</span>
    </span>

</div>
<div class="boxitem">

    <!-- 属性名 -->
    <span class="title">配&nbsp;送&nbsp;至</span>
    <!-- 属性内容 -->
    <span class="content">
        <span style="color: #999;">${data.address}</span>
    </span>

</div>`

    return topGoodsList
}

// 初始化商品数据
initdata = () => {
    var data = goodData.goodsDetail.crumbData
    data.forEach(item => [
        item.data.forEach((val, index) => {
            index === 0 ? val.active = true : val.active = false
        })
    ])
}

// 渲染标签
goodsAttrRender = () => {
    // 创建文档碎片
    var data = goodData.goodsDetail.crumbData
    var con = document.createDocumentFragment()
    choosed.innerHTML = ''
    data.forEach((item, index) => {
        // 获取active为true的对象
        var firstchoosed = item.data.find(val => val.active)
        // 获取active为true的下标
        var idx = item.data.findIndex(val => val.active)
        var mark = document.createElement('mark')
        mark.textContent = firstchoosed ? firstchoosed.type : ''
        var span = document.createElement('span')
        span.className = 'delete'
        span.innerText = '×'
        // 点击×删除标签
        span.onclick = function () {
            data[index].data[idx].active = false
            console.log(idx);
            createLabel()
        }
        // 如果内容为空则不添加标签
        if (firstchoosed) {
            mark.appendChild(span)
            // 将创建的标签添加到文档碎片中
            con.appendChild(mark)
        }
    })
    // 将创建的文档碎片添加到父节点中
    choosed.appendChild(con)
}

// 创建点击选择标签
createLabel = () => {
    var label = document.querySelector('.labels')
    label.innerHTML = ''
    var crumbData = goodData.goodsDetail.crumbData
    var price = 0;
    crumbData.forEach((dataItem, index) => {
        // 创建整个盒子
        var boxitem = document.createElement('div')
        boxitem.className = 'boxitem'
        // 创建title
        var title = document.createElement('span')
        title.className = 'title'
        title.textContent = dataItem.title
        // 创建content(包裹下面的三个标签)
        var content = document.createElement('span')
        content.className = 'content'
        // 创建三个标签
        dataItem.data.forEach((item, idx) => {
            var span = document.createElement('span')
            span.textContent = item.type
            if (item.active) {
                span.className = 'btn active'
                price += item.changePrice
            } else {
                span.className = 'btn'
            }
            span.onclick = function () {
                crumbData[index].data.forEach(val => val.active = false)
                crumbData[index].data[idx].active = true
                createLabel()
            }
            content.appendChild(span)
        })
        boxitem.appendChild(title)
        boxitem.appendChild(content)
        label.appendChild(boxitem)
    })
    // 价格栏
    topLatestedData.innerHTML = firstSectionData(goodData, price)
    // 价格改变后重新渲染选中后的标签
    goodsAttrRender()

}