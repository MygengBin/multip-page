function toLineString(obj){
    return Object.entries(obj).map(i=>`${i[0]}:${i[1]}`).join(';')
}
window.multipPage = class{
    dom=null;
    pageSize=10;
    currentPage=1;
    allPage=1;
    total=1;
    mainColor='#e96d30';
    pageSizeInputEnterFunction=function ({value}) {console.log(value)};
    goPageEnterFunction=function ({value}) {console.log(value)};
    constructor({
        currentPage=1,
        allPage=1,
        dom,pageSize=10,total=1,mainColor='#e96d30',
        pageSizeInputEnterFunction=async function ({value}) {console.log(value)}},
        goPageEnterFunction=async function ({value}) {console.log(value)}){        
        this.dom=dom;
        this.currentPage = currentPage;
        this.allPage = allPage;
        this.pageSize=pageSize;
        this.total=total;
        this.mainColor=mainColor;
        this.pageSizeInputEnterFunction = pageSizeInputEnterFunction;
        this.goPageEnterFunction = goPageEnterFunction;
        this.render();
    }
    render(){
        const buttonStyle = toLineString({
            width: '47px',
            height: '25px',
            border: 'none',
            cursor: 'pointer',
            background: 'rgb(226, 108, 36)',
            'border-radius': '3px',
            color: '#fff',
            'font-size': '14px',
            'line-height': '25px',
        });
        const listLineNob = toLineString({
            'border-collapse': 'collapse',
            'font-size':'12px',
            'text-align':'center', 
            'background-color':'#fff',
            border:0
        });
        const listLineNobTr = toLineString({
            'height': '22px',
            'background-color': '#F0F0F0', 
            'font-size':'12px',
            'font-weight':'boild',
        });
        this.dom.innerHTML='';
        this.dom.innerHTML+=(function style(){
            let str = '<style>';
            str+=`#${this.dom.id} { --mainColor:${this.mainColor} }`;
            str+=`#${this.dom.id} td{border-bottom:1px solid #d0d0d0}`;
            str+=`#${this.dom.id} .list-line{border-collapse: collapse; font-size:12px; text-align:center; background-color:#d0d0d0; border:0;display:flex; height: 42px; align-items: center; justify-content: space-between; padding: 0 10px}`;
            str+=`#${this.dom.id} .button{ width:47px; height:25px; border:none; cursor:pointer; background: var(--mainColor); border-radius:3px; color: #fff; font-size:14px; line-height:25px }`;
            str+=`#${this.dom.id} .input-text{ width: 50px; height: 20px; line-height:20px; border: 1px solid #ddd; margin: 0 2px; padding: 0 2px; text-indent: .5em; outline: 0 }`;
            str+=`#${this.dom.id} .input-text:hover,#${this.dom.id} .input-text:focus{border-color:var(--mainColor); box-shadow: 0 4px 10px 0 var(--mainColor)}`;
            str+=`#${this.dom.id} .toggle-button{ height: 25px; line-height: 22px;background:#FFF; border:1px solid #CFCFCF; text-align:center; color:#242323 }`;
            str+=`#${this.dom.id} .toggle-button:disabled{ color: gray }`;
            str+='</style>';
            return str;
        }).call(this);
        
        this.dom.innerHTML+=`
        <div class="list-line">
            <div height="42" align="right" bgcolor="#d0d0d0">
            每页显示 &nbsp;
            <input type="text" class="pageSizeInput input-text" value="${this.pageSize}">
            &nbsp;条 &nbsp;
            <input name="button" type="button" class="button pageSizeConfirmButton" value="确定">
            &nbsp;
            总条数：${this.total}
            </div>
            <div height="42" align="center" valign="middle" bgcolor="#d0d0d0">
                <button ${this.currentPage<=1?'disabled':''} type="button" class="toggle-button turnPageTo1">&lt;&lt;</button>
                <button ${this.currentPage<=1?'disabled':''} type="button" class="toggle-button turnPageToPrevious">前一个</button>
                &nbsp;
                ${this.currentPage}/${this.allPage}
                &nbsp;
                <button ${this.currentPage>=this.allPage?'disabled':''} type="button" class="toggle-button turnPageToNext">下一个</button>
                <button ${this.currentPage>=this.allPage?'disabled':''} type="button" class="toggle-button turnPageToEnd">&gt;&gt;</button>
            </div>
            <div height="42" align="right" bgcolor="#d0d0d0">
                转到：
                <input type="text" class="goPageInput input-text" size="3" style="height: 18px;">
                页
                &nbsp;
                <input type="button" class="button goPageButton" value="跳转">
            </div>
        </div>
        `;
        const _this = this;
        const pageSizeInput = this.dom.getElementsByClassName('pageSizeInput')[0];
        pageSizeInput.addEventListener('keydown',async function (e) {
            if(e.key==='Enter'){
                if(!parseInt(pageSizeInput.value.trim()) || parseInt(pageSizeInput.value.trim())<0) return alert('请输入大于0的数字');
                await _this.pageSizeInputEnterFunction({
                    value:this.value.trim()
                });
            }
            // onkeydown="if(event.keyCode==13){setPageSize();}"
        });
        const pageSizeConfirmButton = this.dom.getElementsByClassName('pageSizeConfirmButton')[0];
        pageSizeConfirmButton.addEventListener('click',async function(e){
            e.stopPropagation();
            if(!parseInt(pageSizeInput.value.trim()) || parseInt(pageSizeInput.value.trim())<0) return alert('请输入大于0的数字');
            await _this.pageSizeInputEnterFunction({
                value:pageSizeInput.value.trim()
            });
        });
        const goPageInput = this.dom.getElementsByClassName('goPageInput')[0];
        goPageInput.addEventListener('keydown',async function (e) {
            if(e.key==='Enter'){
                if(!parseInt(goPageInput.value.trim()) || parseInt(goPageInput.value.trim())<0) return alert('请输入大于0的数字');
                await _this.goPageEnterFunction({
                    value:this.value.trim()
                });
            }
        });
        const goPageButton = this.dom.getElementsByClassName('goPageButton')[0];
        goPageButton.addEventListener('click',async function(e){
            e.stopPropagation();
            if(!parseInt(goPageInput.value.trim()) || parseInt(goPageInput.value.trim())<0) return alert('请输入大于0的数字');
            await _this.goPageEnterFunction({
                value:goPageInput.value.trim()
            });
        });
        const turnPageTo1 = this.dom.getElementsByClassName('turnPageTo1')[0];
        turnPageTo1.addEventListener('click',async function(e){
            e.stopPropagation();
            await _this.goPageEnterFunction({
                value:1
            });
        });
        const turnPageToEnd = this.dom.getElementsByClassName('turnPageTo1')[0];
        turnPageToEnd.addEventListener('click',async function(e){
            e.stopPropagation();
            await _this.goPageEnterFunction({
                value:_this.allPage
            });
        });
        const turnPageToPrevious = this.dom.getElementsByClassName('turnPageTo1')[0];
        turnPageToPrevious.addEventListener('click',async function(e){
            e.stopPropagation();
            await _this.goPageEnterFunction({
                value:_this.currentPage-1
            });
        });
        const turnPageToNext = this.dom.getElementsByClassName('turnPageTo1')[0];
        turnPageToNext.addEventListener('click',async function(e){
            e.stopPropagation();
            await _this.goPageEnterFunction({
                value:_this.currentPage+1
            });
        });
    }
}