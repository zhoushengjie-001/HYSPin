// 获取面包屑导航区
var crubs = document.querySelector('.crumb')
// 获取蒙版外面的盒子
var indexbox = document.querySelector('.indexbox')
// 获取蒙版
var mask = document.querySelector('.mask')
// 获取大盒子
var zoom = document.querySelector('.zoom')
// 获取大盒子下面的img
var bigPic = document.querySelector('.zoom img')
// 获取小盒子里面的图片
var smallPic = document.querySelector('.smallPic')
// 获取移动图片列表标签
var listqueue = document.querySelector('.listqueue')
// 获取prev
var prev = document.querySelector('.prev')
// 获取next
var next = document.querySelector('.next')
// 获取outer
var outer = document.querySelector('.outer')
// 获取第一部分数据的盒子
var topLatestedData = document.querySelector('.topLatestedData')
// 获取选中的内容
var choosed = document.querySelector('.choosed')
// 获取左侧边栏的两个标签
var brolist = document.querySelectorAll('.bro span')
// 获取左侧边栏
var bro = document.querySelectorAll('.bro')
// 获取商品种类
var goodstyle = document.querySelector('.goodstyle')
// 获取推荐内容
var recommend = document.querySelector('.recommend')
// 获取商品介绍区列表
var zonelist = document.querySelectorAll('.zonelist li')
// 获取商品介绍区列表对应的内容区
var selectzone = document.querySelectorAll('.selectzone div')
// 获取内容详情区
var activezone = document.querySelector('.diffzone+.active')
// 获取商品选择框
var labels = document.querySelectorAll('.checkgoodslist label input')
// 获取商品总价
var totalPrice = document.querySelector('.totalPrice')
// 获取加号
var add = document.querySelector('.add')
// 获取减号
var reduce = document.querySelector('.reduce')
// 获取数值
var num = document.querySelector('.control input')



// 右侧的侧边栏效果
// 点击按钮折叠边框
var logo = document.querySelector('#wrap .rightAside .logo')
var rightAside = document.querySelector('#wrap .rightAside')
var custlist = document.querySelectorAll('#wrap .listitem .icon')
var custlistspan = document.querySelectorAll('.vip')
var flag = false
logo.onclick = function () {
    flag = !flag
    if (flag) {
        rightAside.className = 'rightAside fadein'
        this.className = 'logo logoin'
    } else {
        rightAside.className = 'rightAside fadeout'
        this.className = 'logo logoout'
    }
}
// 尚品会员
custlist.forEach((item, index) => {
    item.onmouseenter = function () {
        custlistspan[index].classList.remove('hidden')
        custlistspan[index].classList.add('show')
    }
    item.onmouseleave = function () {
        custlistspan[index].classList.remove('show')
        custlistspan[index].classList.add('hidden')
    }
});


// 调用函数获取实时数据渲染面包屑导航区
crubs.innerHTML = getLastedStr(goodData, 'a')

// 蒙版随着鼠标移动
indexbox.onmouseenter = function () {
    // 鼠标移入盒子蒙版显示，大盒子显示
    mask.style.display = 'block'
    zoom.style.display = 'block'
    // 蒙版移动的最大距离
    var fixedX = indexbox.offsetWidth - mask.offsetWidth
    var fixedY = indexbox.offsetHeight - mask.offsetHeight
    indexbox.onmousemove = function (e) {
        // 获取鼠标相对于顶级盒子的距离
        var mouseX = e.offsetX
        var mouseY = e.offsetY
        // 获取蒙版移动的距离
        var endX = mouseX - mask.offsetWidth / 2
        var endY = mouseY - mask.offsetHeight / 2
        if (endX <= 0 || endX >= fixedX) endX = endX <= 0 ? 0 : fixedX
        if (endY <= 0 || endY >= fixedY) endY = endY <= 0 ? 0 : fixedY
        // 蒙版移动的距离
        mask.style.left = endX + 'px'
        mask.style.top = endY + 'px'
        // 大图片移动-2倍的距离
        bigPic.style.left = -2 * endX + 'px'
        bigPic.style.top = -2 * endY + 'px'
    }
}

// 鼠标移出盒子蒙版隐藏，大盒子隐藏
indexbox.onmouseleave = function () {
    mask.style.display = 'none'
    zoom.style.display = 'none'
}

// 调用函数获取实时数据获取图片列表数据
listqueue.innerHTML = getLastedStr(goodData, 'li')

// 给父级添加事件委托
listqueue.onclick = function (e) {
    try {
        var str = e.target.src
        var temp = str.match(/[0-9]/g)
        temp = temp[temp.length - 1]
        smallPic.src = e.target.src
        bigPic.src = `./images/b${temp}.png`
    } catch (e) {}
}

// 点击移动轮播图列表
prev.onclick = function () {
    move(false)
}
next.onclick = function () {
    move(true)
}

// 给商品数据添加属性来判断是否是第一个要渲染的标签
// 初始化数据，只调用一次
initdata()

// 创建点击选择标签
createLabel();

// 点击加号减号更新购物车数据
add.onclick = function () {
    num.textContent = ++num.value
}
reduce.onclick = function () {
    num.textContent = num.value <= 1 ? 1 : --num.value
}


// 底部
// 点击左侧边栏换内容
brolist[0].onclick = function () {
    this.className = 'active'
    brolist[1].className = 'hidden'
    recommend.style.display = 'none'
    goodstyle.style.display = 'block'
}
brolist[1].onclick = function () {
    this.className = 'active'
    brolist[0].className = 'hidden'
    recommend.style.display = 'block'
    goodstyle.style.display = 'none'
}

// 点击选择框自动计算商品
labels.forEach(item => {
    item.addEventListener('click', () => {
        var sum = 5299
        labels.forEach(val => {
            val.checked ? sum = sum - 0 + 50 : sum = sum - 0 - 50
        })
        totalPrice.textContent = sum
    })
})

// 点击商品介绍区切换内容
zonelist.forEach((item, index) => {
    item.onclick = function () {
        activezone.style.display = 'none'
        selectzone.forEach(val => {
            val.style.display = 'none'
        })
        if (index === 0) {
            activezone.style.display = 'block'
        } else {
            selectzone[index - 1].style.display = 'block'
        }
        zonelist.forEach(v => v.removeAttribute('class'))
        item.className = 'active'
    }
})