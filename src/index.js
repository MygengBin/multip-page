function toLineString(obj){
    return Object.entries(obj).map(i=>`${i[0]}:${i[1]}`).join(';')
}
window.multipPage = class{
    dom=null;
    constructor(dom){
        this.dom=dom;
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
        const inputTT = toLineString({
            width: '50px',
            height: '20px',
            'line-height':' 20px',
            border: '1px solid #ddd',
            margin: '0 2px',
            padding: '0 2px'
        });
        this.dom.innerHTML=`
        <style>#${this.dom.id} td{border-bottom:1px solid #d0d0d0}</style>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="${listLineNob}">
        <tbody>
        <tr style=${listLineNobTr}">
            <td width="74" height="42" align="right" bgcolor="#d0d0d0">
            每页显示 &nbsp;
            <input type="text" style="${inputTT}" id="pagesize" name="basePageVo.pagesize" value="10" onkeydown="if(event.keyCode==13){setPageSize();}">
            &nbsp;条 &nbsp;
            </td>
            <td width="40" align="left" bgcolor="#d0d0d0"><input name="button" type="button" style="${buttonStyle}" onclick="setPageSize()" value="确定"></td>
            <td width="88" height="42" align="right" bgcolor="#d0d0d0">总页数
                1</td>
            <td width="88" height="42" align="right" bgcolor="#d0d0d0">
                总条数 1
            </td>
            <td width="66" height="42" align="center" valign="middle" bgcolor="#d0d0d0">
                <a href="javascript:doPage('1');" style="padding:5px 10px; width:28px; background:#FFF; border:1px solid #CFCFCF; text-align:center; color:#999;">&lt;&lt;</a>
                <a href="javascript:doPrePage();" style="padding:5px 10px; width:60px; height:23px; background:#FFF; border:1px solid #CFCFCF; text-align:center; line-height:23px; color:#999;">前一个</a>
            </td>

            <td width="27" height="42" align="center" bgcolor="#d0d0d0">
                1/1
            </td>
            <td width="67" height="42" align="center" bgcolor="#d0d0d0"><a href="javascript:donextPage();" style=" display:block; width:60px; height:23px; background:#FFF; border:1px solid #CFCFCF; text-align:center; line-height:23px; color:#999;">下一个</a></td>
            <td width="34" height="42" align="center" bgcolor="#d0d0d0"><a href="javascript:doPage('1');" style=" display:block; width:28px; height:23px; background:#FFF; border:1px solid #CFCFCF; text-align:center; line-height:23px; color:#999;">&gt;&gt;</a></td>
            <td width="55" height="42" align="right" bgcolor="#d0d0d0">
                转到：
                <input type="text" name="gotoPage" size="3" style="${inputTT};height: 18px;" onkeydown="if(event.keyCode==13){goPage();}">
                页
            </td>
            <td width="56" height="42" bgcolor="#d0d0d0"><input name="" onclick="goPage()" type="button" style="${buttonStyle}" value="跳转"></td>
        </tr>
        </tbody>
    </table>
        `;
    }
}