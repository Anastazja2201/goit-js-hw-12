import{a as w,S,i}from"./assets/vendor-CjwUT-lV.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const P="49358433-5727c4bf05d17bed3943eaf07",v="https://pixabay.com/api/",h=15;let c=1,l="",p=0;const L=async(o,s=1)=>{try{const r=await w.get(v,{params:{key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:s}});return p=r.data.totalHits,r.data}catch(r){return console.error("Error fetching images:",r),{hits:[],totalHits:0}}},q=async()=>{if(l)return c*h>=p?(iziToast.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"red"}),{hits:[]}):(c+=1,L(l,c))},b=()=>{c=1},E=o=>{l!==o&&(l=o,b())},m=document.querySelector(".gallery"),H=new S(".gallery a",{captionSelector:"img",captionsData:"alt",captionDelay:250}),y=o=>{if(m.innerHTML="",o.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=o.map(r=>`
  <li class="gallery-item">
       <a href="${r.largeImageURL}" class="gallery-link">
        <img src="${r.webformatURL}" alt="${r.tags}" class="gallery-image" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${r.likes}</p>
          <p class="info-item"><b>Views:</b> ${r.views}</p>
          <p class="info-item"><b>Comments:</b> ${r.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${r.downloads}</p>
        </div>
      </a>
    </li>
  `).join("");m.insertAdjacentHTML("beforeend",s),H.refresh()},f=()=>{document.querySelector(".loader").style.display="block"},d=()=>{document.querySelector(".loader").style.display="none"},M=()=>{m.innerHTML=""},g=()=>{document.querySelector(".load-more").classList.remove("hidden")},u=()=>{document.querySelector(".load-more").classList.add("hidden")},$=()=>{const o=document.querySelector(".gallery-item");if(!o)return;const s=o.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})};document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".form"),s=document.querySelector('input[name="search-text"]'),r=document.querySelector(".load-more");d(),u(),o.addEventListener("submit",async n=>{n.preventDefault();const e=s.value.trim();if(e===""){i.error({message:"Please enter a search term!"});return}E(e),b(),M(),u(),f();try{const{hits:t,totalHits:a}=await L(e);t.length===0?i.warning({message:"Sorry, there are no images matching your search query. Please try again!"}):(y(t),t.length<a&&g())}catch(t){i.error({message:"An error occurred while fetching images. Please try again later."}),console.error("Error fetching images:",t)}finally{d()}}),r.addEventListener("click",async()=>{f();try{const{hits:n,totalHits:e}=await q();n.length>0&&(y(n),$(),n.length<e?g():u())}catch(n){i.error({message:"Error loading more images."}),console.error(n)}finally{d()}})});
//# sourceMappingURL=index.js.map
