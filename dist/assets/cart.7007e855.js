import"./style.c0ed6924.js";let a=JSON.parse(localStorage.getItem("data"))||[];const p=document.querySelector(".store__cartshopping"),S=document.querySelector(".cart__items"),g=document.querySelector(".cart__total-price > span");let n=[];const d=async()=>{let e=await(await fetch("https://fakestoreapi.com/products")).json();_(e)};d();const _=t=>{S.innerHTML=t.map(({id:e,title:i,price:r,image:l})=>{for(let s of a)if(e==s.id){let u=Intl.NumberFormat("en-US").format(s.item*r),m=n.find(o=>o.id==e);return m==null?n.push({id:e,value:r*s.item}):m.value=r*s.item,g.textContent=`$ ${Intl.NumberFormat("en-US").format(n.reduce((o,f)=>o+f.value,0))}`,`<div class="items__card">
            <img
                class="cart__img"
                width="50"
                height="50"
                src="${l}"
            />
            <div class="title__price">
                <h4 class="cart__itens-name">${i}</h4>
                <p class="cart__itens-price">$ ${u}</p>
            </div>
                <div id="${e}" class="erase__cartItem">X</div>
            <div class="cart__itens-quantity">
                <div id="${e}" class="decrease-itens">-</div>
                <p id="${e}" class="itens-quantity">${s.item}</p>
                <div id="${e}" class="increase-itens">+</div>
            </div>
        </div>`}}).join("")};document.addEventListener("click",t=>{if(t.target.classList.contains("increase-itens")){let e=a.find(i=>i.id===t.target.id);e.item++;for(let i of a)t.target.previousSibling.previousSibling.id==i.id&&(t.target.previousSibling.previousSibling.textContent=i.item);localStorage.setItem("data",JSON.stringify(a)),c(),d()}});document.addEventListener("click",t=>{if(t.target.classList.contains("decrease-itens")){let e=a.find(i=>i.id===t.target.id);e.item--;for(let i of a)t.target.nextSibling.nextSibling.id==i.id&&(t.target.nextSibling.nextSibling.textContent=i.item);t.target.nextSibling.nextSibling.textContent=="0"&&t.target.parentElement.parentElement.remove(),a=a.filter(i=>i.item!=0),localStorage.setItem("data",JSON.stringify(a)),c(),d()}});document.addEventListener("click",t=>{t.target.classList.contains("erase__cartItem")&&(t.target.parentElement.remove(),a=a.filter(e=>e.id!=t.target.id),localStorage.setItem("data",JSON.stringify(a)),c(),n.forEach((e,i)=>{t.target.id==e.id&&n.splice(i,1),g.textContent=`$ ${Intl.NumberFormat("en-US").format(n.reduce((r,l)=>r+l.value,0))}`}))});const c=()=>{let t=a.reduce((e,i)=>e+i.item,0);p.dataset.content=t};c();
