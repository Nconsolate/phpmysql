class Send{
	constructor(){
		this.cont = document.getElementById("cont");
		this.which = document.getElementById("which");
		this.idea = document.getElementById("idea");
		this.btn = document.getElementById("send");
		this.insertUrl ="http://localhost/ctrl/insert.php";
		this.showUrl ="http://localhost/ctrl/show.php";
		this.deleteUrl="http://localhost/ctrl/delete.php";
        this.changeUrl="http://localhost/ctrl/change.php";
		this.tbody = document.querySelector("tbody");
		this.insert = document.getElementById("insert");
		this.pageUl=document.getElementsByClassName("pagination pagination-sm justify-content-center")[0];
		this.type = 1;
		this.n=1;
		this.currentPage=1;
		this.pageNum=5;
		this.init();
		this.load();
        this.changeType();
	}
	//存在点击事件时做出变化
	init() {
        let that = this;
        //模态框按钮点击事件
        this.btn.onclick = function (){
            //若点击的是添加
            if (that.type === 1) {
                //交换数据 PHP做相应处理操作数据库
                //ajax.js  执行ajax 传数据
                getAjax(that.insertUrl, {
                    cont: that.cont.value,
                    which: that.which.value,
                    idea: that.idea.value
                }).then(function (res) {
                    //执行完成 接收数据
                    that.res = JSON.parse(res);
                    //若数据条数大于 当前页最后一个的序号，就将页码移到最后 （添加数据，跳到添加的数据所在页）
                    if(that.res.length>that.currentPage*that.pageNum)that.currentPage=that.n+1;
                    // 更新渲染
                    that.createPage();
                    that.display();
                })
            //    修改数据 渲染
            } else {
                getAjax(that.changeUrl, {
                    cont: that.cont.value,
                    which: that.which.value,
                    idea: that.idea.value,
					id:that.id
                }).then(function (res) {
                    that.res = JSON.parse(res);
                    that.display();
                })
            }
        };
        //点击删除 数据
        this.tbody.onclick = function (eve) {
            let e = eve || window.event;
            let target = e.target || e.srcElement;
            if (target.className ==="btn btn-danger")
            {
            	getAjax(that.deleteUrl,{
                  id:that.res[target.rindex].id
            }).then(function(res){
                that.res = JSON.parse(res);
                // 若当前页数据删完了，跳到上一页  渲染更新
                if(that.res.length===(that.currentPage-1)*that.pageNum)that.currentPage--;
                if(that.currentPage<=1) that.currentPage=1;
                that.display();
            })
            }
        };
        //点击设置页码的样式 更改页码
        this.pageUl.onclick=function (eve) {
            let e = eve || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName==="A")
            {
                if(target.textContent==="上一页")that.currentPage>1?that.currentPage--:that.currentPage=1;
                else if (target.textContent==="下一页") that.currentPage<that.n&&that.currentPage>=1?that.currentPage++:that.currentPage=that.n;
                else  that.currentPage=parseInt(target.textContent);
                that.createPage();
                that.display();
            }
        };

    }
    //首次加载
	load(){
		let that = this;
		getAjax(this.showUrl).then(function(res){
			that.res=JSON.parse(res);
            that.createPage();
			that.display();
			that.createTit();
		});
	}
	//更新渲染数据信息
	display(){
     this.createPage();
		let str = "";
		//给接收的数据添加序号并 全部渲染结构（不显示）
		for(let i=0;i<this.res.length;i++){
            this.res[i].index=i+1;
			str +=`<tr style="display:none">
						<td>${this.res[i].index}</td>
						<td>${this.res[i].cont}</td>
						<td>${this.res[i].which}</td>
						<td>${this.res[i].idea}</td>
						<td><button class="btn btn-danger" >删除</button></td>
						<td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">修改</button></td>
					</tr>`;
		}
		if (str==="")   this.createTit();
        else this.tbody.innerHTML= str;
        //根据结构 获取按钮数组 并给 按钮添加编号
        let del=document.getElementsByClassName("btn-danger");
        let changes=this.tbody.querySelectorAll(".btn-outline-primary");
        for(let j=0;j<this.res.length;j++) del[j].rindex=changes[j].rindex=j;
        let trs=this.tbody.querySelectorAll("tr");
     //   获取数据 数组对应结构  根据页码进行显示对应序号的数据
     for(let p=(this.currentPage-1)*this.pageNum;p<this.currentPage*this.pageNum;p++)
        //如果数据不能够显示到 每页最大条数  当页能显示多少就显示多少
        if(p<this.res.length) trs[p].style.display="";  //设置display是清空之前结构的display:none 不能用block等显示 ，会破坏原有样式

	}
	//区分模态框按钮点击和修改事件
	changeType(){
		let that = this;
        this.insert.onclick=function(){that.type = 1;};
        //点击修改按钮时，将对应该条数据的id进行存储
		this.tbody.addEventListener("click",function(eve){
			let e = eve || window.event;
			let target = e.target || e.srcElement;
			if(target.textContent === "修改")
            {that.type = 2;
            // console.log(that.res);
             that.id=that.res[target.rindex].id;
            }
		});
	}
	//更新渲染分页
	createPage(){
        // 更新页码最大数
        this.n=Math.ceil(this.res.length/this.pageNum);
        if(this.n===0)this.n=1;
        //渲染 分页   将a的锚点设置为 不跳(无需跳转)
        let lis="";
        for(let k=1;k<=this.n;k++)
            lis+=`<li class="page-item"><a class="page-link" href="javascript:void(0)">${k}</a></li>`;

        lis=`<li class="page-item"><a class="page-link " href="javascript:void(0)">上一页</a></li>`+
            lis+`<li class="page-item"><a class="page-link" href="javascript:void(0)">下一页</a></li>`;
        this.pageUl.innerHTML=lis;
        //清空上一次页码的样式  设置上下页及页码的样式
        this.pageUl.children[this.currentPage].children[0].id="";
        switch (this.currentPage){
            case 1: this.pageUl.firstElementChild.className="page-item disabled";
               this.pageUl.lastElementChild.className= this.n===1?"page-item disabled":"page-item";break;
            case this.n: this.pageUl.lastElementChild.className="page-item disabled";
                this.pageUl.firstElementChild.className= this.n===1?"page-item disabled":"page-item";break;
            default: this.pageUl.firstElementChild.className="page-item";
                this.pageUl.lastElementChild.className="page-item";
        }
        this.pageUl.children[this.currentPage].children[0].id="current";
	}
	createTit(){
	    if (!this.res.length)
    {this.tbody.innerHTML =`<tr id="tit" ><td>请输入内容：<br/>样板</td>
 <td>什么都易错</td><td>哪里都错</td><td>太难了</td>
 <td><button class="btn btn-danger" >点这里可以删除数据哦</button></td>
<td><button class="btn btn-outline-primary" >点这里可以修改哦</button></tr>`;}
	}
}
new Send();
