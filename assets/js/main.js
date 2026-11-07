"use strict";
var root=document.documentElement,tbtn=document.getElementById("themeBtn"),mbtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
tbtn.addEventListener("click",function(){var t=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=t;tbtn.setAttribute("aria-pressed",String(t==="dark"));try{localStorage.setItem("theme",t)}catch(e){}});
tbtn.setAttribute("aria-pressed",String(root.dataset.theme==="dark"));
mbtn.addEventListener("click",function(){var o=nav.classList.toggle("open");mbtn.setAttribute("aria-expanded",String(o))});
nav.addEventListener("click",function(e){if(e.target.tagName==="A"){nav.classList.remove("open");mbtn.setAttribute("aria-expanded","false")}});
document.getElementById("year").textContent=new Date().getFullYear();
var f=document.getElementById("contactForm"),st=document.getElementById("status"),sb=document.getElementById("send");
f.addEventListener("submit",function(e){
  e.preventDefault();if(!f.reportValidity())return;
  sb.disabled=true;st.textContent="Sending…";
  fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(f)).toString()})
  .then(function(r){if(!r.ok)throw new Error(r.status);st.textContent="Message sent. Thank you, I’ll reply by email.";f.reset()})
  .catch(function(){var d=new FormData(f);st.innerHTML="The form could not send. Please <a href=\"mailto:akshitthakkar8@gmail.com?subject="+encodeURIComponent("Portfolio enquiry from "+d.get("name"))+"&body="+encodeURIComponent(d.get("message")||"")+"\">email me directly</a>."})
  .finally(function(){sb.disabled=false});
});
