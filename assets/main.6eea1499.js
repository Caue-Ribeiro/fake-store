import"./style.c0ed6924.js";const p=document.querySelector(".shop__container"),g=document.querySelectorAll("[data-name]");let a=JSON.parse(localStorage.getItem("data"))||[];const m=document.querySelector(".store__cartshopping");(async()=>{let s=await(await fetch("https://fakestoreapi.com/products")).json();y(s)})();let y=t=>{p.innerHTML=t.map(({id:n,image:r,price:i,title:d})=>{let o=a.find(c=>Number(c.id)===n)||[];return`
            <div class="shop__itens">
                        <img class="shop__img" width="150" height="200" src="${r}" />
                        <h4 class="shop__itens-name">${d}</h4>
                        <p class="shop__itens-price">$ ${i}</p>
                         <div class="shop__outter-star">
                    <div class="shop__inner-star"></div>
                </div>
                        <div  class="shop__itens-quantity">
                            <div id="${n}" class="decrease-itens">-</div>
                            <p id="${n}" class="itens-quantity">${o.item===void 0?0:o.item}</p>
                            <div id="${n}" class="increase-itens">+</div>
                        </div>
            </div>
        `}).join("");let s=document.querySelectorAll(".shop__inner-star");for(const n of t)u(s[n.id-1],n.rating.rate);let e=document.querySelectorAll(".shop__itens");g.forEach(n=>n.addEventListener("click",()=>{({men:()=>{t.map(i=>{i.category!="men's clothing"?e[i.id-1].style.display="none":e[i.id-1].style.display=""})},women:()=>{t.map(i=>{i.category!="women's clothing"?e[i.id-1].style.display="none":e[i.id-1].style.display=""})},eletronic:()=>{t.map(i=>{i.category!="electronics"?e[i.id-1].style.display="none":e[i.id-1].style.display=""})},jewelry:()=>{t.map(i=>{i.category!="jewelery"?e[i.id-1].style.display="none":e[i.id-1].style.display=""})},all:()=>{t.map(i=>e[i.id-1].style.display="")}})[n.dataset.name]()}))};const u=(t,s)=>{let e=s/5*100,n=`${Math.round(e/10)*10}%`;t.style.width=n};document.addEventListener("click",t=>{if(t.target.classList.contains("increase-itens")){let s=a.find(e=>e.id===t.target.id);s===void 0?a.push({id:t.target.id,item:1}):s.item++;for(let e of a)t.target.previousSibling.previousSibling.id==e.id&&(t.target.previousSibling.previousSibling.textContent=e.item);localStorage.setItem("data",JSON.stringify(a)),l()}});document.addEventListener("click",t=>{if(t.target.classList.contains("decrease-itens")){let s=a.find(e=>e.id===t.target.id);if(s===void 0)return;if(s.item===0)return;s.item--;for(let e of a)t.target.nextSibling.nextSibling.id==e.id&&(t.target.nextSibling.nextSibling.textContent=e.item);a=a.filter(e=>e.item!=0),localStorage.setItem("data",JSON.stringify(a)),l()}});const l=()=>{let t=a.reduce((s,e)=>s+e.item,0);m.dataset.content=t};l();
