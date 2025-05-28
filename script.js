'use strict'
let card1=0,card2=0,ccardel1,ccardel2,ppoint=0,cpoint=0;
let winel=document.getElementById("winner");
let ppointel=document.getElementById("playerpoint");
let cpointel=document.getElementById("cpupoint");
let n=[];
for(let i=0;i<2;i++)
{
    for(let j=1;j<14;j++)
    {
        n.push(j);
    }
}
let num,tmp
for(let i=0;i<26;i++)
{
    num=Math.floor(Math.random()*26);
    tmp=n[i];
    n[i]=n[num];
    n[num]=tmp;
}

let boardel=document.getElementById("pboardtab");
let card=[];
let pel=document.createElement("p");
pel.innerHTML="&emsp;"
boardel.appendChild(pel);
for(let i=0;i<26;i++)
{
    let cardel=document.createElement("button");
    cardel.classList.add("but");
    cardel.textContent=n[i];
    cardel.onclick = clickCard; //クリックされた時clickCard()を実行する
    card.push(cardel);
    boardel.appendChild(cardel);
    if(i==6 || i==13 || i==19)
    {
        let brel=document.createElement("br");
        boardel.appendChild(brel);
        let pel=document.createElement("p");
        pel.innerHTML="&emsp;"
        boardel.appendChild(pel);
    }
}

let helpel=document.createElement("button");
helpel.classList.add("helpbutton");
helpel.onclick = helpClick;
boardel.appendChild(helpel);

const origincolor="rgba(255, 255, 255, 0)";
const changecolor="rgb(255, 255, 255)";
const bgorigincolor="rgb(255, 0, 0)";
const bgchangecolor="rgb(255, 234, 0)";
const crtime=2000; //カードが見えなくなるまでの時間
let pturn=true,cturn=false,pcont=false,ccont=false;
let cpairel=0;
let pairel=[];
let appearel=[];
function clickCard()
{
    if(card1==0)
    {
        ccardel1=this; // クリックされたボタンの要素を取得する
        card1=ccardel1.textContent;
        ccardel1.style.color=changecolor;
        ccardel1.style.backgroundColor=bgchangecolor;
        if(cturn)
        {
            for(let i=0;i<appearel.length;i++)
            {
                //console.log(appearel[i]);
                if(ccardel1.textContent==appearel[i].textContent)
                {
                    cpairel=appearel[i];
                    break;
                }
            }
        }
    }
    else
    {
        ccardel2=this;
        if(ccardel1==ccardel2)
        {
            return;
        }
        card2=ccardel2.textContent;
        ccardel2.style.color=changecolor;
        ccardel2.style.backgroundColor=bgchangecolor
        if(card1==card2)
        {
            ccardel1.style.visibility="hidden";
            ccardel2.style.visibility="hidden";
            if(pturn)
            {
                ppoint+=2;
                ppointel.textContent=`YourScore:${ppoint}`;
                pcont=true;
                let pindex1=appearel.indexOf(ccardel1);
                if(pindex1!=-1)
                {
                    appearel.splice(pindex1,1)
                }
                let pindex2=appearel.indexOf(ccardel2);
                if(pindex2!=-1)
                {
                    appearel.splice(pindex2,1)
                }

                let pindex3=pairel.indexOf(ccardel1);
                if(pindex3!=-1)
                {
                    pairel.splice(pindex3,1)
                }
                let pindex4=pairel.indexOf(ccardel2);
                if(pindex4!=-1)
                {
                    pairel.splice(pindex4,1)
                }
            }
            else
            {
                cpoint+=2;
                cpointel.textContent=`NPCScore:${cpoint}`;
                ccont=true;
            }

            //そろった要素は配列から消す
            let index1=card.indexOf(ccardel1);
            if(index1!=-1)
            {
                card.splice(index1,1)
            }
            let index2=card.indexOf(ccardel2);
            if(index2!=-1)
            {
                card.splice(index2,1)
            }

            //カードがなくなったら終わり
            if(card.length==0)
            {
                finish();
                return;
            }
        }
        else
        {
            //かぶってなかったら配列に追加
            let add1=true,add2=true;
            for(let i=0;i<appearel.length;i++)
            {
                if(appearel[i]==ccardel1)
                {
                    add1=false;
                }
                if(appearel[i]==ccardel2)
                {
                    add2=false;
                }
            }
            if(add1)
            {
                for(let i=0;i<appearel.length;i++)
                {
                    if(ccardel1.textContent==appearel[i].textContent)
                    {
                        pairel.push(ccardel1);
                        pairel.push(appearel[i]);
                        break;
                    }
                }
                appearel.push(ccardel1);
            }
            if(add2)
            {
                for(let i=0;i<appearel.length;i++)
                {
                    if(ccardel2.textContent==appearel[i].textContent)
                    {
                        pairel.push(ccardel2);
                        pairel.push(appearel[i]);
                        break;
                    }
                }
                appearel.push(ccardel2);
            }
        }

        console.log("appearel");
        for(let i=0;i<appearel.length;i++)
        {
            console.log(appearel[i].textContent);
        }
        console.log("pairel");
        for(let i=0;i<pairel.length;i++)
        {
            console.log(pairel[i].textContent);
        }

        for(let i=0;i<card.length;i++)
        {
            //カードの判定を無効化する
            card[i].style.pointerEvents="none";
        }
        card1=0;
        card2=0;
        if(pturn)
        {
            if(pcont)
            {
                pcont=false;
                for(let i=0;i<card.length;i++)
                {
                    card[i].style.pointerEvents="auto";
                }
            }
            else
            {
                pturn=false;
                cturn=true;
                window.setTimeout(colorreset,crtime);
                window.setTimeout(cputurn,2500);
            }
        }
        else if(cturn)
        {
            if(ccont)
            {
                ccont=false;
                window.setTimeout(cputurn,2500);
            }
            else //playerのターン開始
            {
                pturn=true;
                cturn=false;

                //カードの判定を無効化する
                for(let i=0;i<card.length;i++) {card[i].style.pointerEvents="none";}

                window.setTimeout(colorreset,crtime);
                window.setTimeout(pturnStart,crtime);

            }
        }
    }
}

let cpuwait=700; //cpuがカードを引くまでの待機時間
function cputurn()
{
    boardel.id='eboardtab';
    //揃っているカードがあるときは、それを引く
    if(pairel.length>0)
    {
        console.log("sorou");
        pairel[0].click();
        setTimeout(()=>{
            pairel[1].click();

            //そろった要素は配列から消す
            for(let i=0;i<2;i++)
            {
                let index1=appearel.indexOf(pairel[0]);
                if(index1!=-1)
                {
                    appearel.splice(index1,1)
                }
                pairel.splice(0,1);
            }
            cpairel=0;
        },cpuwait);
    }
    else
    {
        console.log("random");
        //揃っているカードがないときは、引いたことのないカードを引く
        let rand1,double=true;
        do
        {
            rand1=Math.floor(Math.random()*(card.length));
            if(appearel.length==0)
            {
                double=false;
            }
            for(let i=0;i<appearel.length;i++)
            {
                if(card[rand1]==appearel[i])
                {
                    break;
                }
                if(i==appearel.length-1)
                {
                    double=false;
                }
            }
        }while(double)
        card[rand1].click();

        //一枚目を引いた段階で、もう一枚がすでに出ていたらそれを引く
        if(cpairel!=0)
        {
            console.log("hiitesorou");
            setTimeout(()=>{
                cpairel.click();
                let index1=appearel.indexOf(cpairel);
                if(index1!=-1)
                {
                    appearel.splice(index1,1)
                }
                cpairel=0;
            },cpuwait);
        }
        else
        {
            console.log("random2");
            let rand2,double2=true;
            do
            {
                rand2=Math.floor(Math.random()*(card.length));
                while(rand2==rand1)
                {
                    rand2=Math.floor(Math.random()*(card.length));
                }
                if(appearel.length==0)
                {
                    double2=false;
                }
                for(let i=0;i<appearel.length;i++)
                {
                    if(card[rand2]==appearel[i])
                    {
                        break;
                    }
                    if(i==appearel.length-1)
                    {
                        double2=false;
                    }
                }
            }while(double2)

            setTimeout(()=>{
                card[rand2].click();
            },cpuwait);
        }
    }
}

function finish()
{
    setTimeout(()=>{
        boardel.style.display="none";
        if(ppoint>cpoint)
        {
            winel.classList.add("win");
            winel.textContent="YouWin!!";
        }
        else
        {
            winel.classList.add("lose");
            winel.textContent="YouLose";
        }
    },1500);
}

function pturnStart()
{
    boardel.id='pboardtab';
    for(let i=0;i<card.length;i++)
    {
        card[i].style.pointerEvents="auto";
    }
}

function colorreset()
{
    ccardel1.style.color=origincolor;
    ccardel2.style.color=origincolor;
    ccardel1.style.backgroundColor=bgorigincolor;
    ccardel2.style.backgroundColor=bgorigincolor;
}

//お助け機能　2秒間だけ全てのカードが表示される
function helpClick()
{
    helpel.style.visibility="hidden";
    for(let i=0;i<card.length;i++)
    {
        card[i].style.color=changecolor;
        card[i].style.backgroundColor=bgchangecolor;
    }
    setTimeout(()=>{
        for(let i=0;i<card.length;i++)
            {
                if(ccardel1==card[i] && card1!=0)
                {
                    continue;
                }
                card[i].style.color=origincolor;
                card[i].style.backgroundColor=bgorigincolor;
            }
    },2000);
}
