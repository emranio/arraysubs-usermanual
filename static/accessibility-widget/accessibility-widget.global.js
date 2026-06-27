var AccessibilityWidget=(function(exports){'use strict';var Ge="accessibility-widget-protanopia-filter";function ci(){if(document.getElementById(Ge))return;let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id=Ge,e.setAttribute("aria-hidden","true"),e.style.cssText="position:absolute;width:0;height:0;pointer-events:none;",e.innerHTML=`
    <defs>
      <filter id="accessibility-widget-protanopia">
        <feColorMatrix type="matrix" values="
          0.567 0.433 0 0 0
          0.558 0.442 0 0 0
          0     0.242 0.758 0 0
          0     0     0 1 0"/>
      </filter>
    </defs>`,document.body.appendChild(e);}function di(){document.getElementById(Ge)?.remove();}var Ue="accessibility-widget-host-effects",y="accessibility-widget-host";function gi(){let e=document.getElementById(Ue);return e||(e=document.createElement("style"),e.id=Ue,document.head.appendChild(e)),e}function ui(){let e=document.getElementById(Ue);e&&(e.textContent="");}function Xe(){let e=document.getElementById(y);if(e)return e;e=document.createElement("div"),e.id=y;let t=document.body,i=[];for(let n of Array.from(t.childNodes))n instanceof HTMLElement&&(n.classList.contains("accessibility-widget-root")||n.id===y)||i.push(n);for(let n of i)e.appendChild(n);return t.insertBefore(e,t.firstChild),e}function Ye(){let e=document.getElementById(y);if(!e)return;let t=e.parentElement;if(t){for(;e.firstChild;)t.insertBefore(e.firstChild,e);e.remove();}}var pi=[{bg:"#1f2937",text:"#f9fafb",border:"#6b7280"},{bg:"#111827",text:"#ffffff",border:"#9ca3af"},{bg:"#030712",text:"#ffffff",border:"#d1d5db"},{bg:"#000000",text:"#ffffff",border:"#ffffff"}],fi=[{bg:"#ffffff",text:"#111827",border:"#d1d5db"},{bg:"#f9fafb",text:"#0f172a",border:"#94a3b8"},{bg:"#ffffff",text:"#000000",border:"#475569"},{bg:"#ffffff",text:"#000000",border:"#000000"}],hi=[{bg:"#111111",text:"#fff7c2",border:"#ffe066"},{bg:"#000000",text:"#fff27a",border:"#fff27a"},{bg:"#000000",text:"#ffff00",border:"#ffff00"},{bg:"#000000",text:"#00ffff",border:"#00ffff"}],G=[{band:86,opacity:.35,edge:"#2563eb"},{band:116,opacity:.45,edge:"#0891b2"},{band:146,opacity:.55,edge:"#10b981"}],U=[{height:6,border:2,fill:"#0c0c0c",edge:"#facc15",glow:"rgba(250,204,21,0.28)"}];function P(e,t){return Math.max(0,Math.min(e-1,t-1))}function mi(e){let t=P(e,3),i=38+t*10,n=Math.round(i*.16),o=["#2563eb","#0891b2","#0f766e"][t],r=`
    <svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 64 64">
      <circle cx="30" cy="31" r="27" fill="${o}" opacity="0.24"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="#ffffff" stroke="#050505" stroke-width="5" stroke-linejoin="round"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="none" stroke="${o}" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>
  `.trim();return `url("data:image/svg+xml,${encodeURIComponent(r)}") ${n} ${n}, auto`}function yi(e){return e===1?'"Accessibility Widget OpenDyslexic"':e===2?'"Accessibility Widget Atkinson Hyperlegible"':null}function bi(e){let t=[],i=`#${y}`;if(e.fontSize!==0){let n=100+e.fontSize*.1*100;t.push(`${i} { font-size: ${n}% !important; }`);}if(e.lineHeight!==0){let n=1.5+e.lineHeight*.15;t.push(`${i} * { line-height: ${n} !important; }`);}if(e.letterSpacing!==0){let n=e.letterSpacing*.02;t.push(`${i} * { letter-spacing: ${n}em !important; }`);}if(e.textAlignment!=="default"&&t.push(`${i} * { text-align: ${e.textAlignment} !important; }`),e.bigCursor!==0){let n=mi(e.bigCursor);t.push(`html, body, ${i}, ${i} *, .accessibility-widget-root, .accessibility-widget-root * { cursor: ${n} !important; }`);}return t.join(`
`)}var O=null,b=null;function X(e){return e.replace(/\s+/g," ").trim().slice(0,200)}function xi(e,t){if(!(t.join(" ").length>=220)){if(e.nodeType===Node.TEXT_NODE){let i=X(e.textContent||"");i&&t.push(i);return}if(e instanceof Element&&!e.matches("script, style, noscript, template")&&!(e instanceof HTMLElement&&(e.hidden||e.getAttribute("aria-hidden")==="true"))){if(e instanceof HTMLSelectElement){let i=e.selectedOptions[0]??e.options[e.selectedIndex],n=X(i?.textContent||e.value);n&&t.push(n);return}if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){let i=X(e.value||e.placeholder||e.getAttribute("aria-label")||"");i&&t.push(i);return}if(e instanceof HTMLImageElement){let i=X(e.alt||e.getAttribute("aria-label")||"");i&&t.push(i);return}for(let i of Array.from(e.childNodes))xi(i,t);}}}function Rn(e){let t=e.closest('button, a, label, summary, [role="button"], [role="link"], select, input, textarea')??e,i=[];return xi(t,i),X(i.join(" "))}function wi(e){if(!b)return;let t=[{fontSize:18,maxWidth:260,padding:"8px 12px"},{fontSize:20,maxWidth:300,padding:"10px 14px"},{fontSize:22,maxWidth:340,padding:"12px 16px"}],i=t[Math.max(0,Math.min(e-1,t.length-1))];b.style.fontSize=`${i.fontSize}px`,b.style.maxWidth=`${i.maxWidth}px`,b.style.padding=i.padding;}function vi(e){if(O){wi(e);return}b=document.createElement("div"),b.className="accessibility-widget-magnify-cursor",b.setAttribute("aria-hidden","true"),b.style.display="none",document.body.appendChild(b),wi(e),O=t=>{if(!b)return;let i=document.elementFromPoint(t.clientX,t.clientY);if(!i||i.closest(".accessibility-widget-root")||i.closest(".accessibility-widget-magnify-cursor")){b.style.display="none";return}let n=Rn(i);if(!n){b.style.display="none";return}b.textContent=n,b.style.display="block";let o=b.getBoundingClientRect(),r=16,l=8,d=Math.max(l,window.innerWidth-o.width-l),h=Math.max(l,window.innerHeight-o.height-l),k=Math.min(Math.max(t.clientX+r,l),d),_=Math.min(Math.max(t.clientY+r,l),h);b.style.left=`${k}px`,b.style.top=`${_}px`;},document.addEventListener("mousemove",O);}function Je(){O&&(document.removeEventListener("mousemove",O),O=null),b&&(b.remove(),b=null);}var w=null,xe=null,Z=null,Q=null,Y=0,J=0,ki=1;function On(e){if(!w)return;ki=e;let t=U[P(e,U.length)];w.dataset.level=String(e),w.style.setProperty("--accessibility-widget-reading-guide-height",`${t.height}px`),w.style.setProperty("--accessibility-widget-reading-guide-border",`${t.border}px`),w.style.setProperty("--accessibility-widget-reading-guide-fill",t.fill),w.style.setProperty("--accessibility-widget-reading-guide-edge",t.edge),w.style.setProperty("--accessibility-widget-reading-guide-glow",t.glow);}function Ze(e,t){if(!w)return;let i=U[P(ki,U.length)],n=i.height+i.border*2,o=Math.max(0,Math.min(window.innerHeight-n,t-n/2));w.style.top=`${o}px`,w.style.setProperty("--accessibility-widget-reading-guide-x",`${e}px`);}function Si(e){w||(w=document.createElement("div"),w.className="accessibility-widget-reading-guide",w.setAttribute("aria-hidden","true"),xe=document.createElement("span"),xe.className="accessibility-widget-reading-guide-pointer",w.appendChild(xe),document.body.appendChild(w),Y=window.innerWidth/2,J=window.innerHeight/2,Z=t=>{Y=t.clientX,J=t.clientY,Ze(Y,J);},Q=()=>Ze(Y,J),document.addEventListener("mousemove",Z,{passive:true}),window.addEventListener("resize",Q,{passive:true})),On(e),Ze(Y,J);}function Qe(){Z&&(document.removeEventListener("mousemove",Z),Z=null),Q&&(window.removeEventListener("resize",Q),Q=null),w&&(w.remove(),w=null,xe=null);}var ve=220,ke=1.8,m=null,L=null,$=null,ee=null,W=null,tt=0,it=0,Se=0,Le=0,H=false;function Li(e){let t=[{diameter:220,zoom:1.8},{diameter:240,zoom:2.2},{diameter:260,zoom:2.75}],i=t[Math.max(0,Math.min(e-1,t.length-1))];ve=i.diameter,ke=i.zoom,!(!m||!L)&&(m.style.width=`${ve}px`,m.style.height=`${ve}px`,H&&(W??(W=requestAnimationFrame(Ai))));}function et(){if(!L)return;let e=document.getElementById(y);if(!e)return;let t=e.getBoundingClientRect();$=null,L.innerHTML="";let i=e.cloneNode(true);i.id="",i.style.position="absolute",i.style.top=`${t.top}px`,i.style.left=`${t.left}px`,i.style.width=`${t.width}px`,i.style.pointerEvents="none",i.querySelectorAll(".accessibility-widget-root, .accessibility-widget-reading-lens, script, iframe").forEach(d=>d.remove());let n=e.querySelectorAll("input, textarea"),o=i.querySelectorAll("input, textarea");for(let d=0;d<n.length&&d<o.length;d++){let h=n[d],k=o[d];h instanceof HTMLInputElement&&k instanceof HTMLInputElement?(k.value=h.value,(h.type==="checkbox"||h.type==="radio")&&(k.checked=h.checked)):h instanceof HTMLTextAreaElement&&k instanceof HTMLTextAreaElement&&(k.value=h.value);}let r=e.querySelectorAll("select"),l=i.querySelectorAll("select");for(let d=0;d<r.length&&d<l.length;d++)l[d].selectedIndex=r[d].selectedIndex;$=i,L.appendChild(i);}function Wn(){if(!$)return;let e=document.getElementById(y);if(!e)return;let t=e.getBoundingClientRect();$.style.top=`${t.top}px`,$.style.left=`${t.left}px`,$.style.width=`${t.width}px`;}function Ai(){if(W=null,!m||!L)return;let e=ve/2;Se=Math.round(tt),Le=Math.round(it),Wn(),m.style.transform=`translate3d(${Se-e}px, ${Le-e}px, 0)`;let t=e-Se*ke,i=e-Le*ke;L.style.transform=`translate3d(${t}px, ${i}px, 0) scale(${ke})`;}function Ei(e){if(Li(e),m){H||et();return}m=document.createElement("div"),m.className="accessibility-widget-reading-lens",m.setAttribute("aria-hidden","true"),m.setAttribute("inert",""),m.style.display="none",m.style.left="0",m.style.top="0",m.style.willChange="transform",L=document.createElement("div"),L.className="accessibility-widget-reading-lens-inner",L.style.willChange="transform",m.appendChild(L),document.body.appendChild(m),Li(e),et(),ee=t=>{if(!m)return;if(t.target?.closest(".accessibility-widget-root")){H&&(m.style.display="none",H=false);return}H||(m.style.display="block",tt=t.clientX,it=t.clientY,Se=t.clientX,Le=t.clientY,H=true,et()),tt=t.clientX,it=t.clientY,W??(W=requestAnimationFrame(Ai));},document.addEventListener("mousemove",ee,{passive:true});}function nt(){ee&&(document.removeEventListener("mousemove",ee),ee=null),W!==null&&(cancelAnimationFrame(W),W=null),H=false,m&&(m.remove(),m=null,L=null,$=null);}var S=null,D=null,z=null,ie=null,ne=null,te=0,Ti=1;function Dn(e){if(!S)return;Ti=e;let t=G[P(e,G.length)];S.dataset.level=String(e),S.style.setProperty("--accessibility-widget-reading-mask-opacity",String(t.opacity)),S.style.setProperty("--accessibility-widget-reading-mask-edge",t.edge);}function ot(e){if(!D||!z)return;let t=G[P(Ti,G.length)],i=Math.max(0,e-t.band/2),n=Math.min(window.innerHeight,e+t.band/2);D.style.height=`${i}px`,z.style.top=`${n}px`,z.style.height=`${Math.max(0,window.innerHeight-n)}px`;}function Mi(e){S||(S=document.createElement("div"),S.className="accessibility-widget-reading-mask",S.setAttribute("aria-hidden","true"),D=document.createElement("div"),D.className="accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-top",z=document.createElement("div"),z.className="accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-bottom",S.append(D,z),document.body.appendChild(S),te=window.innerHeight/2,ie=t=>{te=t.clientY,ot(te);},ne=()=>ot(te),document.addEventListener("mousemove",ie,{passive:true}),window.addEventListener("resize",ne,{passive:true})),Dn(e),ot(te);}function rt(){ie&&(document.removeEventListener("mousemove",ie),ie=null),ne&&(window.removeEventListener("resize",ne),ne=null),S&&(S.remove(),S=null,D=null,z=null);}var jn="p, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th, caption, blockquote, figcaption, summary, dt, dd, span, div",j=null,oe=null;function Ci(){return typeof window<"u"&&typeof window.speechSynthesis<"u"&&typeof window.SpeechSynthesisUtterance<"u"}function Ae(){oe&&(oe.style.outline="",oe.style.outlineOffset="",oe=null);}function Fn(e){let t=(e.innerText||e.textContent||"").replace(/\s+/g," ").trim();if(!t)return;window.speechSynthesis.cancel(),Ae();let i=new SpeechSynthesisUtterance(t.slice(0,4e3));i.onend=Ae,i.onerror=Ae,oe=e,e.style.outline="3px solid #2563eb",e.style.outlineOffset="2px",window.speechSynthesis.speak(i);}function Ii(){j||!Ci()||(j=e=>{let t=e.target;if(!t||t.closest(".accessibility-widget-root"))return;let i=document.getElementById(y);if(!i||!i.contains(t))return;let n=t.closest(jn)??t;e.preventDefault(),e.stopPropagation(),Fn(n);},document.addEventListener("click",j,true),typeof document<"u"&&document.body.classList.add("accessibility-widget-read-aloud-active"));}function st(){j&&(document.removeEventListener("click",j,true),j=null),Ci()&&window.speechSynthesis.cancel(),Ae(),typeof document<"u"&&document.body.classList.remove("accessibility-widget-read-aloud-active");}var _i=null;function Pi(e){_i=e;}async function Bn(e){try{let t=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(e)}`);return t.ok?(await t.json())?.[0]?.meanings?.[0]?.definitions?.[0]?.definition??null:null}catch{return null}}var F=null,re=null,Ee=null,Te=0;function Me(){Ee&&(Ee.remove(),Ee=null);}function at(e,t,i,n){Me();let o=document.createElement("div");o.className="accessibility-widget-dictionary-popover",o.setAttribute("role","dialog"),o.setAttribute("aria-live","polite"),o.setAttribute("aria-label",`Definition of ${i}`),Object.assign(o.style,{position:"fixed",zIndex:"2147483647",maxWidth:"300px",background:"#ffffff",color:"#0c0c0c",border:"1px solid #d4d4d8",borderRadius:"8px",padding:"12px 34px 12px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.18)",font:"14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif",left:`${Math.max(8,Math.min(e,(window.innerWidth||1024)-320))}px`,top:`${t+14}px`});let r=document.createElement("strong");r.textContent=i,r.style.display="block",r.style.marginBottom="4px";let l=document.createElement("p");l.textContent=n,l.style.margin="0";let d=document.createElement("button");d.type="button",d.textContent="\xD7",d.setAttribute("aria-label","Close definition"),Object.assign(d.style,{position:"absolute",top:"6px",right:"8px",border:"none",background:"none",fontSize:"18px",lineHeight:"1",cursor:"pointer",color:"inherit"}),d.addEventListener("click",Me),o.append(r,l,d),document.body.appendChild(o),Ee=o;}function qn(){return ((typeof window<"u"&&window.getSelection?.()?.toString().trim()||"").split(/\s+/)[0]??"").replace(/[^\p{L}\p{N}'-]/gu,"")}function Hi(){F||(F=e=>{let t=e.target;if(!t||t.closest(".accessibility-widget-root")||t.closest(".accessibility-widget-dictionary-popover"))return;let i=document.getElementById(y);if(!i||!i.contains(t))return;let n=qn();if(!n)return;let{clientX:o,clientY:r}=e;at(o,r,n,"Looking up\u2026");let l=++Te;(_i??Bn)(n).then(d=>{l===Te&&at(o,r,n,d||"No definition found.");}).catch(()=>{l===Te&&at(o,r,n,"No definition found.");});},document.addEventListener("dblclick",F,true),re=e=>{e.key==="Escape"&&Me();},document.addEventListener("keydown",re,true));}function lt(){F&&(document.removeEventListener("dblclick",F,true),F=null),re&&(document.removeEventListener("keydown",re,true),re=null),Te++,Me();}var Pe=null;function $i(e){Pe=e;}var B=null,se=null,Ce=null,Ie=null,_e=0;function ae(){Ce&&(Ce.remove(),Ce=null);}function He(){Ie&&(Ie.remove(),Ie=null);}function ct(e,t,i){He();let n=document.createElement("div");n.className="accessibility-widget-simplify-popover",n.setAttribute("role","dialog"),n.setAttribute("aria-live","polite"),n.setAttribute("aria-label","Simplified text"),Object.assign(n.style,{position:"fixed",zIndex:"2147483647",maxWidth:"340px",background:"#ffffff",color:"#0c0c0c",border:"1px solid #d4d4d8",borderRadius:"8px",padding:"12px 34px 12px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.18)",font:"14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif",left:`${Math.max(8,Math.min(e,(window.innerWidth||1024)-360))}px`,top:`${t+14}px`});let o=document.createElement("p");o.textContent=i,o.style.margin="0";let r=document.createElement("button");r.type="button",r.textContent="\xD7",r.setAttribute("aria-label","Close"),Object.assign(r.style,{position:"absolute",top:"6px",right:"8px",border:"none",background:"none",fontSize:"18px",lineHeight:"1",cursor:"pointer",color:"inherit"}),r.addEventListener("click",He),n.append(o,r),document.body.appendChild(n),Ie=n;}function Kn(e,t,i){ae();let n=document.createElement("button");n.type="button",n.className="accessibility-widget-simplify-action",n.textContent="\u2728 Simplify",Object.assign(n.style,{position:"fixed",zIndex:"2147483647",background:"#1d4ed8",color:"#ffffff",border:"none",borderRadius:"6px",padding:"6px 10px",font:"13px/1 system-ui, sans-serif",cursor:"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.2)",left:`${Math.max(8,Math.min(e,(window.innerWidth||1024)-120))}px`,top:`${t+10}px`}),n.addEventListener("mousedown",o=>o.preventDefault()),n.addEventListener("click",()=>{if(ae(),!Pe)return;ct(e,t,"Simplifying\u2026");let o=++_e;Pe(i).then(r=>{o===_e&&ct(e,t,r||"No result.");}).catch(()=>{o===_e&&ct(e,t,"Could not simplify the selection.");});}),document.body.appendChild(n),Ce=n;}function zi(){B||!Pe||(B=e=>{let t=e.target;if(t?.closest(".accessibility-widget-root")||t?.closest(".accessibility-widget-simplify-action")||t?.closest(".accessibility-widget-simplify-popover"))return;let i=document.getElementById(y),n=(window.getSelection?.()?.toString()??"").trim();if(!i||!n||t&&!i.contains(t)){ae();return}Kn(e.clientX,e.clientY,n);},document.addEventListener("mouseup",B,true),se=e=>{e.key==="Escape"&&(ae(),He());},document.addEventListener("keydown",se,true));}function dt(){B&&(document.removeEventListener("mouseup",B,true),B=null),se&&(document.removeEventListener("keydown",se,true),se=null),_e++,ae(),He();}var Vn=new Set(["text","search","email","url","tel","password","number",""]),Gn=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m"]],q=null,E=null,ce=null,N=false;function Ni(e){return e instanceof HTMLTextAreaElement?!e.closest(".accessibility-widget-root"):e instanceof HTMLInputElement?Vn.has(e.type.toLowerCase())&&!e.closest(".accessibility-widget-root"):false}function gt(e,t){let i=e.selectionStart??e.value.length,n=e.selectionEnd??e.value.length;e.value=e.value.slice(0,i)+t+e.value.slice(n);let o=i+t.length;try{e.setSelectionRange(o,o);}catch{}e.dispatchEvent(new Event("input",{bubbles:true}));}function Un(e){let t=e.selectionStart??e.value.length,i=e.selectionEnd??e.value.length;if(t!==i){e.value=e.value.slice(0,t)+e.value.slice(i);try{e.setSelectionRange(t,t);}catch{}}else if(t>0){e.value=e.value.slice(0,t-1)+e.value.slice(i);try{e.setSelectionRange(t-1,t-1);}catch{}}e.dispatchEvent(new Event("input",{bubbles:true}));}function Xn(e){E&&(e==="Backspace"?Un(E):e==="Space"?gt(E," "):e==="Enter"?E instanceof HTMLTextAreaElement&&gt(E,`
`):gt(E,N?e.toUpperCase():e));}function le(e,t,i){let n=document.createElement("button");return n.type="button",n.className="accessibility-widget-vk-key",n.textContent=e,n.setAttribute("aria-label",t==="Space"?"Space":t==="Backspace"?"Backspace":t),Object.assign(n.style,{flex:i?String(i):"1",minWidth:"30px",padding:"10px 6px",border:"1px solid #d4d4d8",borderRadius:"6px",background:"#ffffff",color:"#0c0c0c",font:"14px/1 system-ui, sans-serif",cursor:"pointer"}),n.addEventListener("mousedown",o=>o.preventDefault()),n.addEventListener("click",()=>Xn(t)),n}function Yn(){let e=document.createElement("div");e.className="accessibility-widget-virtual-keyboard",e.setAttribute("role","group"),e.setAttribute("aria-label","Virtual keyboard"),Object.assign(e.style,{position:"fixed",left:"50%",bottom:"16px",transform:"translateX(-50%)",zIndex:"2147483647",width:"min(640px, 96vw)",background:"#f4f4f5",border:"1px solid #d4d4d8",borderRadius:"12px",boxShadow:"0 12px 32px rgba(0,0,0,0.22)",padding:"10px",display:"flex",flexDirection:"column",gap:"6px"});let t=document.createElement("div");t.setAttribute("aria-hidden","true"),Object.assign(t.style,{height:"6px",width:"48px",borderRadius:"3px",background:"#a1a1aa",margin:"0 auto 4px",cursor:"grab"}),Jn(e,t),e.appendChild(t);let i=o=>{let r=document.createElement("div");return Object.assign(r.style,{display:"flex",gap:"6px",justifyContent:"center"}),o.forEach(l=>r.appendChild(l)),r};for(let o of Gn)e.appendChild(i(o.map(r=>le(r,r))));let n=le("\u21E7 Shift","Shift",2);return n.addEventListener("click",()=>{N=!N,n.style.background=N?"#1d4ed8":"#ffffff",n.style.color=N?"#ffffff":"#0c0c0c",n.setAttribute("aria-pressed",String(N));}),n.setAttribute("aria-pressed","false"),e.appendChild(i([n,le("Space","Space",6),le("\u232B","Backspace",2),le("Enter","Enter",2)])),e}function Jn(e,t){t.addEventListener("mousedown",i=>{i.preventDefault();let n=e.getBoundingClientRect(),o=i.clientX-n.left,r=i.clientY-n.top,l=h=>{e.style.left=`${h.clientX-o}px`,e.style.top=`${h.clientY-r}px`,e.style.bottom="auto",e.style.transform="none";},d=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d);};document.addEventListener("mousemove",l),document.addEventListener("mouseup",d);});}function Ri(){if(q||typeof document>"u")return;let e=document.getElementById(y);Ni(document.activeElement)&&(E=document.activeElement),ce=t=>{Ni(t.target)&&(!e||e.contains(t.target))&&(E=t.target);},document.addEventListener("focusin",ce,true),q=Yn(),document.body.appendChild(q);}function ut(){ce&&(document.removeEventListener("focusin",ce,true),ce=null),q&&(q.remove(),q=null),E=null,N=false;}function g(e,t,i){let n=i?.trim();n?e.style.setProperty(t,n):e.style.removeProperty(t);}function Oi(e,t){g(e,"--accessibility-widget-legible-font-family",yi(t.legibleFonts)),g(e,"--accessibility-widget-legible-word-spacing",t.legibleFonts>0?`${t.legibleFonts===1?.03:.015}em`:null),g(e,"--accessibility-widget-legible-letter-spacing",t.legibleFonts>0?`${t.legibleFonts===1?.02:.005}em`:null),g(e,"--accessibility-widget-title-outline-width",t.highlightTitles>0?`${t.highlightTitles}px`:null),g(e,"--accessibility-widget-title-highlight-alpha",t.highlightTitles>0?`${.04+t.highlightTitles*.03}`:null),g(e,"--accessibility-widget-link-outline-width",t.highlightLinks>0?`${t.highlightLinks}px`:null),g(e,"--accessibility-widget-link-highlight-alpha",t.highlightLinks>0?`${.04+t.highlightLinks*.03}`:null),g(e,"--accessibility-widget-link-underline-width",t.highlightLinks>0?`${t.highlightLinks}px`:null);let i=t.darkContrast>0?pi[t.darkContrast-1]:null;g(e,"--accessibility-widget-dark-contrast-bg",i?.bg??null),g(e,"--accessibility-widget-dark-contrast-text",i?.text??null),g(e,"--accessibility-widget-dark-contrast-border",i?.border??null);let n=t.lightContrast>0?fi[t.lightContrast-1]:null;g(e,"--accessibility-widget-light-contrast-bg",n?.bg??null),g(e,"--accessibility-widget-light-contrast-text",n?.text??null),g(e,"--accessibility-widget-light-contrast-border",n?.border??null);let o=t.highContrast>0?hi[t.highContrast-1]:null;g(e,"--accessibility-widget-high-contrast-bg",o?.bg??null),g(e,"--accessibility-widget-high-contrast-text",o?.text??null),g(e,"--accessibility-widget-high-contrast-border",o?.border??null),g(e,"--accessibility-widget-monochrome-amount",t.monochrome>0?"100%":null),g(e,"--accessibility-widget-invert-amount",t.invertColors>0?"100%":null),g(e,"--accessibility-widget-color-blind-saturate",t.colorBlind>0?`${1-t.colorBlind*.1}`:null),g(e,"--accessibility-widget-color-blind-contrast",t.colorBlind>0?`${1+t.colorBlind*.05}`:null);}function Zn(e){return [["accessibility-widget-effect-legible-fonts",e.legibleFonts>0],["accessibility-widget-effect-dyslexia",e.profile==="dyslexia"],["accessibility-widget-effect-highlight-titles",e.highlightTitles>0],["accessibility-widget-effect-highlight-links",e.highlightLinks>0],["accessibility-widget-effect-dark-contrast",e.darkContrast>0],["accessibility-widget-effect-light-contrast",e.lightContrast>0],["accessibility-widget-effect-high-contrast",e.highContrast>0],["accessibility-widget-effect-monochrome",e.monochrome>0],["accessibility-widget-effect-invert",e.invertColors>0],["accessibility-widget-effect-color-blind",e.colorBlind>0],["accessibility-widget-effect-hide-images",e.hideImages>0],["accessibility-widget-effect-off-animations",e.offAnimations>0],["accessibility-widget-effect-text-magnifier",e.textMagnifier>0],["accessibility-widget-effect-big-cursor",e.bigCursor>0],["accessibility-widget-effect-reading-mask-active",e.readingMask>0],["accessibility-widget-effect-reading-guide-active",e.readingGuide>0],["accessibility-widget-effect-focus-highlight",e.focusHighlight>0]]}function de(e){if(typeof document>"u")return;let t=document.getElementById(y);if(t){for(let[i,n]of Zn(e))t.classList.toggle(i,n);Oi(t,e),e.colorBlind>0&&ci(),gi().textContent=bi(e),e.textMagnifier>0?vi(e.textMagnifier):Je(),e.readingLens>0?Ei(e.readingLens):nt(),e.readingMask>0?Mi(e.readingMask):rt(),e.readingGuide>0?Si(e.readingGuide):Qe(),e.readAloud>0?Ii():st(),e.dictionary>0?Hi():lt(),e.simplify>0?zi():dt(),e.virtualKeyboard>0?Ri():ut();}}function Wi(){if(typeof document>"u")return;let e=document.getElementById(y);if(e)for(let t of Array.from(e.classList))t.startsWith("accessibility-widget-effect-")&&e.classList.remove(t);ui(),di(),Je(),nt(),rt(),Qe(),st(),lt(),dt(),ut();}var $e=e=>e,K=()=>null,ji=()=>({});var ze=(...e)=>e.filter((t,i,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===i).join(" ").trim();var Fi=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var Bi=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,n)=>n?n.toUpperCase():i.toLowerCase());var pt=e=>{let t=Bi(e);return t.charAt(0).toUpperCase()+t.slice(1)};var qi=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return  true;return  false};var Ki=()=>ji();var Vi=$e(({color:e,size:t,strokeWidth:i,absoluteStrokeWidth:n,className:o="",children:r,iconNode:l,...d},h)=>{let {className:ye=""}=Ki()??{};return K("svg",{className:ze("lucide",ye,o),...!r&&!qi(d)&&{"aria-hidden":"true"},...d},[...l.map(([we,Ve])=>K(we,Ve)),...Array.isArray(r)?r:[r]])});var s=(e,t)=>{let i=$e(({className:n,...o},r)=>K(Vi,{className:ze(`lucide-${Fi(pt(e))}`,`lucide-${e}`,n),...o}));return i.displayName=pt(e),i};var ft=[["path",{d:"m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16",key:"xik6mr"}],["path",{d:"M15.697 14h5.606",key:"1stdlc"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]];s("a-large-small");var ht=[["rect",{width:"13",height:"7",x:"8",y:"3",rx:"1",key:"pkso9a"}],["path",{d:"m2 9 3 3-3 3",key:"1agib5"}],["rect",{width:"13",height:"7",x:"8",y:"14",rx:"1",key:"1q5fc1"}]];s("between-horizontal-start");var mt=[["rect",{width:"7",height:"13",x:"3",y:"8",rx:"1",key:"1fjrkv"}],["path",{d:"m15 2-3 3-3-3",key:"1uh6eb"}],["rect",{width:"7",height:"13",x:"14",y:"8",rx:"1",key:"w3fjg8"}]];s("between-vertical-start");var yt=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M16 12h2",key:"7q9ll5"}],["path",{d:"M16 8h2",key:"msurwy"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}],["path",{d:"M6 12h2",key:"32wvfc"}],["path",{d:"M6 8h2",key:"30oboj"}]];s("book-open-text");var bt=[["path",{d:"M12 18V5",key:"adv99a"}],["path",{d:"M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",key:"1e3is1"}],["path",{d:"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",key:"1gqd8o"}],["path",{d:"M17.997 5.125a4 4 0 0 1 2.526 5.77",key:"iwvgf7"}],["path",{d:"M18 18a4 4 0 0 0 2-7.464",key:"efp6ie"}],["path",{d:"M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",key:"1gq6am"}],["path",{d:"M6 18a4 4 0 0 1-2-7.464",key:"k1g0md"}],["path",{d:"M6.003 5.125a4 4 0 0 0-2.526 5.77",key:"q97ue3"}]];s("brain");var wt=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]];s("chevron-down");var xt=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]];s("chevron-up");var vt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]];s("circle");var kt=[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.35 2.69A10 10 0 0 1 21.3 15.65",key:"1pfsoa"}],["path",{d:"M19.08 19.08A10 10 0 1 1 4.92 4.92",key:"1ablyi"}]];s("circle-off");var St=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z",key:"j4l70d"}]];s("contrast");var Lt=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]];s("eye");var At=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]];s("external-link");var Et=[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]];s("focus");var Tt=[["path",{d:"M6 12h12",key:"8npq4p"}],["path",{d:"M6 20V4",key:"1w1bmo"}],["path",{d:"M18 20V4",key:"o2hl4u"}]];s("heading");var Mt=[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83",key:"1bzlo9"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21",key:"1q0aeu"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15",key:"5mozeu"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",key:"mmje98"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}]];s("image-off");var Ct=[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",key:"yxxwt6"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]];s("landmark");var It=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]];s("layers");var Re=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]];s("link");var _t=[["path",{d:"M10 13V7",key:"1u13u9"}],["path",{d:"M14 13V7",key:"1vj9om"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]];s("monitor-pause");var Pt=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]];s("moon");var Ht=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]];s("mouse-pointer-2");var $t=[["path",{d:"m18 8 4 4-4 4",key:"1ak13k"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}]];s("move-horizontal");var zt=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]];s("palette");var Nt=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]];s("rotate-ccw");var Rt=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]];s("rows-3");var Ot=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",key:"11ak4c"}]];s("scan-eye");var Wt=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 4h.01",key:"1ujb9j"}],["path",{d:"M20 12h.01",key:"1ykeid"}],["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M4 12h.01",key:"158zrr"}],["path",{d:"M17.657 6.343h.01",key:"31pqzk"}],["path",{d:"M17.657 17.657h.01",key:"jehnf4"}],["path",{d:"M6.343 17.657h.01",key:"gdk6ow"}],["path",{d:"M6.343 6.343h.01",key:"1uurf0"}]];s("sun-dim");var Dt=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]];s("sun");var jt=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M17 12H7",key:"16if0g"}],["path",{d:"M19 19H5",key:"vjpgq2"}]];s("text-align-center");var Ft=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M21 19H7",key:"4cu937"}]];s("text-align-end");var Bt=[["path",{d:"M3 5h18",key:"1u36vt"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 19h18",key:"awlh7x"}]];s("text-align-justify");var qt=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 19H3",key:"z6ezky"}]];s("text-align-start");var Kt=[["path",{d:"M15 5h6",key:"1pr8yx"}],["path",{d:"M15 12h6",key:"upa0zy"}],["path",{d:"M3 19h18",key:"awlh7x"}],["path",{d:"m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12",key:"6lvno8"}],["path",{d:"M3.92 10h6.16",key:"1tl8ex"}]];s("text-initial");var Vt=[["path",{d:"M18 11c-1.5 0-2.5.5-3 2",key:"1fod00"}],["path",{d:"M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",key:"d70hit"}],["path",{d:"M6 11c1.5 0 2.5.5 3 2",key:"136fht"}]];s("venetian-mask");var Gt=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]];s("volume-2");var Ut=[["circle",{cx:"7",cy:"12",r:"3",key:"12clwm"}],["path",{d:"M10 9v6",key:"17i7lo"}],["circle",{cx:"17",cy:"12",r:"3",key:"gl7c2s"}],["path",{d:"M14 7v8",key:"dl84cr"}],["path",{d:"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",key:"lt2kga"}]];s("whole-word");var Xt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]];s("x");var Yt=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]];s("zap");var Jt=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]];s("zoom-in");var Zt=[["path",{d:"M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0",key:"1dfaln"}],["path",{d:"M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4",key:"1qnva7"}]];s("ear");var Oe=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]];s("keyboard");var Qt=[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m8 13 4-7 4 7",key:"4rari8"}],["path",{d:"M9.1 11h5.7",key:"1gkovt"}]];s("book-a");var ei=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]];s("sparkles");var ti=[["path",{d:"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",key:"xwnzip"}],["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M5 21a2 2 0 0 1-2-2",key:"sbafld"}],["path",{d:"M9 3h1",key:"1yesri"}],["path",{d:"M9 21h2",key:"1qve2z"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M3 9v1",key:"1r0deq"}],["path",{d:"M21 9v2",key:"p14lih"}],["path",{d:"M3 14v1",key:"vnatye"}]];s("square-dashed-mouse-pointer");function x(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gi(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function eo(e){return Object.entries(e).filter(([t])=>t!=="key").map(([t,i])=>`${t}="${Gi(String(i))}"`).join(" ")}var c=e=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e.map(([t,i])=>`<${t} ${eo(i)}/>`).join("")}</svg>`,Ui=()=>'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="currentColor"></path></svg>',a={trigger:Ui(),close:c(Xt),reset:c(Nt),chevronDown:c(wt),chevronUp:c(xt),info:'<span class="accessibility-widget-info-glyph">i</span>',wheelchair:Ui(),seizure:c(Yt),vision:c(Lt),lightSensitivity:c(Wt),adhd:c(Et),cognitive:c(bt),colorBlind:c(zt),dyslexia:c(yt),keyboardMotor:c(Oe),blindScreenReader:c(Zt),legibleFonts:c(Kt),dyslexiaFriendlyFont:c(Ut),highlightTitles:c(Tt),fontSizing:c(ft),textMagnifier:c(Jt),readingLens:c(Ot),bigCursor:c(Ht),readingMask:c(Rt),readingGuide:c($t),readAloud:c(Gt),dictionary:c(Qt),simplify:c(ei),virtualKeyboard:c(Oe),focusHighlight:c(ti),highlightLinks:c(Re),lineHeight:c(mt),letterSpacing:c(ht),textAlignLeft:c(qt),textAlignCenter:c(jt),textAlignRight:c(Ft),textAlignJustify:c(Bt),pageStructure:c(It),structureLandmark:c(Ct),structureLink:c(Re),structureExternal:c(At),darkContrast:c(Pt),lightContrast:c(Dt),highContrast:c(St),monochrome:c(vt),invertColors:c(kt),colorBlindVisual:c(Vt),hideImages:c(Mt),offAnimations:c(_t)};var Xi={title:"React Accessibility Widget",subtitle:"Accessibility Settings",widgetSettings:"Settings",widgetSize:"Widget Size",widgetPosition:"Widget Position",smallSize:"Small",largeSize:"Large",leftPosition:"Left",rightPosition:"Right",profiles:"Accessibility Profiles",contentAdjustments:"Content",colorAdjustments:"Color",visibilityAdjustments:"Visibility",pageStructure:"Page Structure",structureHeadings:"Headings",structureLandmarks:"Landmarks",structureLinks:"Links",noStructureItems:"No items found.",untitledHeading:"Untitled heading",untitledLink:"Untitled link",resetAll:"Reset all settings",close:"Close accessibility menu",seizureSafe:"Seizure Safe",visionImpaired:"Vision Impaired",lightSensitivity:"Light Sensitivity",colorBlind:"Color Blind",dyslexia:"Dyslexia",adhdFriendly:"ADHD Friendly",cognitiveDisability:"Cognitive Disability",keyboardMotor:"Keyboard / Motor",blindScreenReader:"Screen Reader",legibleFonts:"Legible Fonts",dyslexiaFriendly:"Dyslexia Friendly",highlightTitles:"Highlight Titles",fontSize:"Font Size",textMagnifier:"Text Magnifier",readingLens:"Reading Lens",bigCursor:"Big Cursor",readingMask:"Reading Mask",readingGuide:"Reading Guide",readAloud:"Read Aloud",dictionary:"Dictionary",simplify:"Simplify",virtualKeyboard:"Virtual Keyboard",focusHighlight:"Focus Highlight",highlightLinks:"Highlight Links",lineHeight:"Line Height",letterSpacing:"Letter Spacing",textAlign:"Text Align",darkContrast:"Dark Contrast",lightContrast:"Light Contrast",highContrast:"High Contrast",monochrome:"Monochrome",invertColors:"Invert Colors",hideImages:"Hide Images",offAnimations:"Reduce Animations"};var v=Xi;var Yi=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", "),ge=null,We=null;function De(e,t,i){ue(),We=e,ge=o=>{if(o.key==="Escape"){o.preventDefault(),i?i():(t.click(),t.focus());return}if(o.key!=="Tab")return;let r=Array.from(e.querySelectorAll(Yi)).filter(h=>!h.closest("[hidden]")&&h.offsetParent!==null);if(r.length===0){o.preventDefault();return}let l=r[0],d=r[r.length-1];o.shiftKey?document.activeElement===l&&(o.preventDefault(),d.focus()):document.activeElement===d&&(o.preventDefault(),l.focus());},e.addEventListener("keydown",ge),e.querySelector(Yi)?.focus();}function ue(){ge&&We&&We.removeEventListener("keydown",ge),ge=null,We=null;}var Ji="data-accessibility-widget-structure-id";var to=0,Zi=["header","nav","main","footer","aside","section","article","form",'[role="banner"]','[role="navigation"]','[role="main"]','[role="contentinfo"]','[role="complementary"]','[role="region"]','[role="search"]','[role="form"]','[role="article"]'].join(",");function ii(e){let t=e.getAttribute(Ji);if(t)return t;let i=`accessibility-widget-structure-${++to}`;return e.setAttribute(Ji,i),i}function io(){return document.getElementById("accessibility-widget-host")??document.body}function no(e){return !!e.closest('.accessibility-widget-root, script, style, template, [hidden], [aria-hidden="true"]')}function je(e){if(!(e instanceof HTMLElement)||no(e))return  false;let t=getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"}function I(e){return (e??"").replace(/\s+/g," ").trim()}function oo(e){return I(e.getAttribute("aria-labelledby")).split(" ").filter(Boolean).map(i=>I(document.getElementById(i)?.textContent)).filter(Boolean).join(" ")}function Qi(e){return I(e.getAttribute("aria-label"))||oo(e)||I(e.getAttribute("title"))}function en(e){return Qi(e)||I(e.textContent)}function ro(e,t){return en(e)||I(e.href)||t}function tn(e){let t=I(e.getAttribute("role")).toLowerCase();if(t==="banner")return "Header";if(t==="navigation")return "Navigation";if(t==="main")return "Main";if(t==="contentinfo")return "Footer";if(t==="complementary")return "Aside";if(t==="search")return "Search";if(t==="form")return "Form";if(t==="article")return "Article";if(t==="region")return "Section";let i=e.tagName.toLowerCase();return i==="nav"?"Navigation":i==="main"?"Main":i==="footer"?"Footer":i==="aside"?"Aside":i.charAt(0).toUpperCase()+i.slice(1)}function so(e){return I(e.querySelector("h1,h2,h3,h4,h5,h6")?.textContent)}function ao(e){let t=tn(e),i=Qi(e)||so(e);return i?`${t}: ${i}`:t}function lo(e,t){let i=0,n=e.parentElement;for(;n&&n!==t;)n.matches(Zi)&&je(n)&&i++,n=n.parentElement;return Math.min(i,5)}function co(e){if(e.target==="_blank")return  true;try{return new URL(e.href,location.href).origin!==location.origin}catch{return  false}}function ni(e){if(typeof document>"u")return {headings:[],landmarks:[],links:[]};let t=io(),i=Array.from(t.querySelectorAll("h1,h2,h3,h4,h5,h6")).filter(je).slice(0,80).map(r=>{let l=Number(r.tagName.slice(1));return {id:ii(r),label:en(r)||e.untitledHeading,meta:`H${l}`,depth:Math.max(0,l-1)}}),n=Array.from(t.querySelectorAll(Zi)).filter(je).slice(0,80).map(r=>({id:ii(r),label:ao(r),meta:tn(r),depth:lo(r,t)})),o=Array.from(t.querySelectorAll("a[href]")).filter(je).slice(0,80).map(r=>({id:ii(r),label:ro(r,e.untitledLink),meta:"Link",external:co(r)}));return {headings:i,landmarks:n,links:o}}function nn(e,t){return e==="landmarks"?t.structureLandmarks:e==="links"?t.structureLinks:t.structureHeadings}function go(e,t){let i=["headings","landmarks","links"];return `
    <div class="accessibility-widget-structure-tabs" role="tablist" aria-label="${x(t.pageStructure)}">
      ${i.map(n=>`
        <button type="button" class="accessibility-widget-structure-tab" role="tab" data-structure-tab="${n}" aria-selected="${e===n}">
          ${x(nn(n,t))}
        </button>
      `).join("")}
    </div>
  `}function uo(e,t){return e==="headings"?`<span class="accessibility-widget-structure-badge accessibility-widget-structure-badge--text">${x(t.meta)}</span>`:`<span class="accessibility-widget-structure-badge">${e==="links"?a.structureLink:a.structureLandmark}</span>`}function po(e,t,i){return e.length===0?`<div class="accessibility-widget-structure-empty">${x(i.noStructureItems)}</div>`:e.map(n=>`
    <button type="button" class="accessibility-widget-structure-item" data-structure-target="${x(n.id)}" style="--accessibility-widget-structure-depth:${n.depth??0}">
      ${uo(t,n)}
      <span class="accessibility-widget-structure-item-label">${x(n.label)}</span>
      ${n.external?`<span class="accessibility-widget-structure-external">${a.structureExternal}</span>`:""}
    </button>
  `).join("")}function oi(e,t,i){let n=e[t];return `
    <div class="accessibility-widget-structure-dialog" role="dialog" aria-modal="true" aria-label="${x(i.pageStructure)}">
      <div class="accessibility-widget-structure-header">
        <h2>${x(i.pageStructure)}</h2>
        <button type="button" class="accessibility-widget-structure-close" data-structure-action="close" aria-label="${x(i.close)}">
          ${a.close}
        </button>
      </div>
      ${go(t,i)}
      <div class="accessibility-widget-structure-list" role="tabpanel" aria-label="${x(nn(t,i))}">
        ${po(n,t,i)}
      </div>
    </div>
  `}function ri(e){if(typeof window>"u"||typeof window.matchMedia!="function")return  false;try{return window.matchMedia(e).matches}catch{return  false}}function on(){return {reducedMotion:ri("(prefers-reduced-motion: reduce)"),moreContrast:ri("(prefers-contrast: more)"),dark:ri("(prefers-color-scheme: dark)")}}function rn(e){let t={};return e.reducedMotion&&(t.offAnimations=1),e.moreContrast&&(t.highContrast=1),t}var T={legibleFonts:2,highlightTitles:2,fontSize:4,textMagnifier:1,highlightLinks:2,readingLens:1,bigCursor:3,readingMask:3,readingGuide:1,readAloud:1,dictionary:1,simplify:1,virtualKeyboard:1,focusHighlight:1,lineHeight:3,letterSpacing:3,darkContrast:3,lightContrast:3,highContrast:3,monochrome:1,invertColors:1,colorBlind:1,hideImages:1,offAnimations:1},V=Object.keys(T),sn=4;var M={profile:null,fontSize:0,lineHeight:0,letterSpacing:0,textAlignment:"default",legibleFonts:0,highlightTitles:0,highlightLinks:0,textMagnifier:0,readingLens:0,bigCursor:0,readingMask:0,readingGuide:0,readAloud:0,dictionary:0,simplify:0,virtualKeyboard:0,focusHighlight:0,darkContrast:0,lightContrast:0,highContrast:0,colorBlind:0,monochrome:0,invertColors:0,hideImages:0,offAnimations:0},Fe="react-accessibility-widget-state";var fo=new Set(["seizure-safe","vision-impaired","light-sensitivity","color-blind","dyslexia","adhd-friendly","cognitive-disability","keyboard-motor","blind-screen-reader"]),ho=new Set(["left","center","right","justify"]);function mo(e,t){return e===true?1:e===false||e==null?0:typeof e=="number"&&Number.isFinite(e)?e<=0?0:Math.min(t,Math.max(1,Math.round(e))):0}function yo(e){let t=e&&typeof e=="object"?e:{},i={...M};typeof t.profile=="string"&&fo.has(t.profile)&&(i.profile=t.profile);for(let n of V)i[n]=mo(t[n],T[n]);return typeof t.textAlignment=="string"&&ho.has(t.textAlignment)&&(i.textAlignment=t.textAlignment),i}function an(e){if(!e)return {...M};if(typeof localStorage>"u")return {...M};try{let t=localStorage.getItem(Fe);if(t)return yo(JSON.parse(t))}catch{}return {...M}}function ln(e){if(!e||typeof localStorage>"u")return  false;try{return localStorage.getItem(Fe)!=null}catch{return  false}}function cn(e,t){if(e&&!(typeof localStorage>"u"))try{localStorage.setItem(Fe,JSON.stringify(t));}catch{}}function C(e){for(let t of V){let i=e[t];if(typeof i!="number")continue;let n=T[t];if(i<0||i>n)throw new Error(`Invalid profile preset: ${t} level ${i} exceeds max ${n}`)}return e}var dn={"seizure-safe":C({offAnimations:1,hideImages:1,monochrome:1}),"vision-impaired":C({fontSize:4,lineHeight:1,highContrast:2,bigCursor:2}),"light-sensitivity":C({darkContrast:2,offAnimations:1}),"color-blind":C({colorBlind:1,highlightLinks:2}),dyslexia:C({legibleFonts:1,lineHeight:2,letterSpacing:2,textAlignment:"left"}),"adhd-friendly":C({readingMask:2,offAnimations:1,highlightLinks:1}),"cognitive-disability":C({legibleFonts:2,fontSize:1,lineHeight:1,highlightTitles:2,highlightLinks:2}),"keyboard-motor":C({focusHighlight:1,bigCursor:2,highlightLinks:2}),"blind-screen-reader":C({readAloud:1,highlightTitles:2,highlightLinks:2,legibleFonts:2})};function gn(e,t,i,n){let o=e.toUpperCase()==="L";return `
    <button type="button" class="accessibility-widget-size-switch" role="switch" data-size="${o?"S":"L"}" aria-checked="${o}" aria-label="${t}">
      <span class="accessibility-widget-size-switch-track" aria-hidden="true">
        <span class="accessibility-widget-size-switch-thumb"></span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--s">${i}</span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--l">${n}</span>
      </span>
    </button>
  `}function un(e,t,i,n){return `
    <div class="accessibility-widget-position-grid" role="group" aria-label="${t}">
      <button type="button" class="accessibility-widget-position-option" data-position="left" aria-pressed="${e==="left"}" aria-label="${i}">
        <span aria-hidden="true">&#8601;</span>
      </button>
      <button type="button" class="accessibility-widget-position-option" data-position="right" aria-pressed="${e==="right"}" aria-label="${n}">
        <span aria-hidden="true">&#8600;</span>
      </button>
    </div>
  `}function pn(e){let t=x(e);return `
    <span class="accessibility-widget-info" aria-hidden="true">
      ${a.info}
      <span class="accessibility-widget-tooltip">${t}</span>
    </span>
  `}function fn(e,t,i,n,o){return `
    <button class="accessibility-widget-card" type="button" data-profile="${e}" aria-pressed="${n}">
      ${pn(o)}
      <span class="icon">${i}</span>
      <span class="label">${t}</span>
    </button>
  `}function bo(e,t){return t<=1?"":`
    <div class="accessibility-widget-levels" aria-hidden="true">
      ${Array.from({length:t},(i,n)=>`
        <span class="accessibility-widget-level${n+1===e?" active":""}"></span>
      `).join("")}
    </div>
  `}function Be(e){let{key:t,icon:i,label:n,level:o,maxLevel:r,tooltip:l}=e,d=r<=1?o>0?"On":"Off":o>0?`Level ${o} of ${r}`:"Off";return `
    <button class="accessibility-widget-tile" type="button" data-tool="${t}" data-level="${o}" data-max-level="${r}" aria-pressed="${o>0}" aria-label="${n}, ${d}">
      ${pn(l)}
      <span class="icon">${i}</span>
      <span class="label">${n}</span>
      ${bo(o,r)}
    </button>
  `}function f(e,t,i,n,o){return Be({key:t,icon:i,label:n,tooltip:o,level:e[t],maxLevel:T[t]})}function hn(e,t,i){let n=e.legibleFonts<=1;return f(e,"legibleFonts",n?a.dyslexiaFriendlyFont:a.legibleFonts,n?t.dyslexiaFriendly:t.legibleFonts,i)}function mn(e){return e==="left"?1:e==="center"?2:e==="right"?3:e==="justify"?4:0}function yn(e){return e==="center"?a.textAlignCenter:e==="right"?a.textAlignRight:e==="justify"?a.textAlignJustify:a.textAlignLeft}var wo={"seizure-safe":"Stops animation, hides images, and applies monochrome to reduce flashing and visual triggers.","vision-impaired":"Increases text size, adds line height, applies high contrast, and enlarges the cursor.","light-sensitivity":"Applies a low-glare dark contrast profile and reduces motion.","color-blind":"Applies the color-blind filter and strengthens link highlighting so meaning is not color-only.",dyslexia:"Uses the dyslexia-friendly font with more spacing and left-aligned text.","adhd-friendly":"Adds a reading mask, reduces motion, and lightly highlights links for focus.","cognitive-disability":"Uses a hyperlegible font with clearer headings, links, spacing, and text size.","keyboard-motor":"Strengthens focus outlines, enlarges the cursor, and highlights links for keyboard and motor navigation.","blind-screen-reader":"Enables click-to-read text-to-speech with clearer headings, links, and a legible font."},p={legibleFonts:"Cycles between the dyslexia-friendly font and Atkinson Hyperlegible.",highlightTitles:"Adds visual emphasis to headings so page structure is easier to scan.",fontSize:"Increases page text size across four levels.",textMagnifier:"Shows a magnified text preview for easier reading.",highlightLinks:"Highlights and underlines links so interactive text is easier to identify.",lineHeight:"Increases line spacing across three levels.",letterSpacing:"Increases character spacing across three levels.",textAlignment:"Cycles text alignment through left, center, right, and justify.",darkContrast:"Applies a dark contrast color treatment.",lightContrast:"Applies a light contrast color treatment.",highContrast:"Applies stronger high-contrast color combinations.",monochrome:"Removes color by applying a monochrome treatment.",invertColors:"Inverts page colors for users who prefer reversed contrast.",colorBlind:"Applies the color-blind visual filter.",readingLens:"Shows a horizontal reading lens that follows the pointer.",bigCursor:"Enlarges the cursor across three levels.",readingMask:"Dims surrounding content and keeps one reading band in focus.",readingGuide:"Adds a guide line that follows the pointer.",readAloud:"Reads page text aloud when you click it (text-to-speech).",dictionary:"Shows the definition of a word when you double-click it.",simplify:"Rewrites the selected text in simpler language.",virtualKeyboard:"Shows an on-screen keyboard for typing without a physical keyboard.",focusHighlight:"Adds a strong outline around the focused element for keyboard navigation.",pageStructure:"Opens a headings, landmarks, and links navigator for the current page.",hideImages:"Hides images and videos from the page.",offAnimations:"Reduces animation and motion effects."};function xo(e){return {settings:e?.settings??true,profiles:e?.profiles??false,content:e?.content??false,color:e?.color??false,visibility:e?.visibility??false}}function pe(e,t,i,n){let o=`accessibility-widget-section-${e}`;return `
    <section class="accessibility-widget-section" data-section="${e}">
      <button type="button" class="accessibility-widget-section-head" data-section-toggle="${e}" aria-expanded="${!i}" aria-controls="${o}">
        <span class="accessibility-widget-section-title">${t}</span>
        <span class="accessibility-widget-section-chevron" aria-hidden="true">${i?a.chevronDown:a.chevronUp}</span>
      </button>
      <div id="${o}" class="accessibility-widget-section-body"${i?" hidden":""}>
        ${n}
      </div>
    </section>
  `}function qe(e){return e.filter(Boolean).join("")}function bn(e,t,i={}){let n=v,o=x(i.title?.trim()||n.title),r=i.position??"right",l=xo(i.collapsedSections),d=[{id:"seizure-safe",label:n.seizureSafe,icon:a.seizure},{id:"vision-impaired",label:n.visionImpaired,icon:a.vision},{id:"light-sensitivity",label:n.lightSensitivity,icon:a.lightSensitivity},{id:"color-blind",label:n.colorBlind,icon:a.colorBlind},{id:"dyslexia",label:n.dyslexia,icon:a.dyslexia},{id:"adhd-friendly",label:n.adhdFriendly,icon:a.adhd},{id:"cognitive-disability",label:n.cognitiveDisability,icon:a.cognitive},{id:"keyboard-motor",label:n.keyboardMotor,icon:a.keyboardMotor},{id:"blind-screen-reader",label:n.blindScreenReader,icon:a.blindScreenReader}],h=new Set(i.hiddenProfiles??[]),k=new Set(i.hiddenTools??[]),_=d.filter(A=>!h.has(A.id)),u=A=>!k.has(A),Ke=i.simplifyEnabled??false,ye=qe([u("legibleFonts")&&hn(e,n,p.legibleFonts),u("highlightTitles")&&f(e,"highlightTitles",a.highlightTitles,n.highlightTitles,p.highlightTitles),u("fontSize")&&f(e,"fontSize",a.fontSizing,n.fontSize,p.fontSize),u("textMagnifier")&&f(e,"textMagnifier",a.textMagnifier,n.textMagnifier,p.textMagnifier),u("highlightLinks")&&f(e,"highlightLinks",a.highlightLinks,n.highlightLinks,p.highlightLinks),u("lineHeight")&&f(e,"lineHeight",a.lineHeight,n.lineHeight,p.lineHeight),u("letterSpacing")&&f(e,"letterSpacing",a.letterSpacing,n.letterSpacing,p.letterSpacing),u("textAlignment")&&Be({key:"textAlignment",icon:yn(e.textAlignment),label:n.textAlign,level:mn(e.textAlignment),maxLevel:sn,tooltip:p.textAlignment}),u("dictionary")&&f(e,"dictionary",a.dictionary,n.dictionary,p.dictionary),Ke&&u("simplify")&&f(e,"simplify",a.simplify,n.simplify,p.simplify)]),be=qe([u("darkContrast")&&f(e,"darkContrast",a.darkContrast,n.darkContrast,p.darkContrast),u("lightContrast")&&f(e,"lightContrast",a.lightContrast,n.lightContrast,p.lightContrast),u("highContrast")&&f(e,"highContrast",a.highContrast,n.highContrast,p.highContrast),u("monochrome")&&f(e,"monochrome",a.monochrome,n.monochrome,p.monochrome),u("invertColors")&&f(e,"invertColors",a.invertColors,n.invertColors,p.invertColors),u("colorBlind")&&f(e,"colorBlind",a.colorBlindVisual,n.colorBlind,p.colorBlind)]),we=qe([u("readingLens")&&f(e,"readingLens",a.readingLens,n.readingLens,p.readingLens),u("bigCursor")&&f(e,"bigCursor",a.bigCursor,n.bigCursor,p.bigCursor),u("readingMask")&&f(e,"readingMask",a.readingMask,n.readingMask,p.readingMask),u("readingGuide")&&f(e,"readingGuide",a.readingGuide,n.readingGuide,p.readingGuide),u("readAloud")&&f(e,"readAloud",a.readAloud,n.readAloud,p.readAloud),u("focusHighlight")&&f(e,"focusHighlight",a.focusHighlight,n.focusHighlight,p.focusHighlight),u("virtualKeyboard")&&f(e,"virtualKeyboard",a.virtualKeyboard,n.virtualKeyboard,p.virtualKeyboard),u("pageStructure")&&Be({key:"pageStructure",icon:a.pageStructure,label:n.pageStructure,level:i.pageStructureOpen?1:0,maxLevel:1,tooltip:p.pageStructure}),u("hideImages")&&f(e,"hideImages",a.hideImages,n.hideImages,p.hideImages),u("offAnimations")&&f(e,"offAnimations",a.offAnimations,n.offAnimations,p.offAnimations)]),Ve=qe([pe("settings",n.widgetSettings,l.settings,`
          <div class="accessibility-widget-setting-row">
            <span class="accessibility-widget-setting-label">${n.widgetSize}</span>
            ${gn(t,n.widgetSize,n.smallSize,n.largeSize)}
          </div>
          <div class="accessibility-widget-setting-row accessibility-widget-setting-row--stack">
            <span class="accessibility-widget-setting-label">${n.widgetPosition}</span>
            ${un(r,n.widgetPosition,n.leftPosition,n.rightPosition)}
          </div>
        `),_.length>0&&pe("profiles",n.profiles,l.profiles,`
          <div class="accessibility-widget-grid">
            ${_.map(A=>fn(A.id,A.label,A.icon,e.profile===A.id,wo[A.id])).join("")}
          </div>
        `),we&&pe("visibility",n.visibilityAdjustments,l.visibility,`
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${we}
          </div>
        `),be&&pe("color",n.colorAdjustments,l.color,`
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${be}
          </div>
        `),ye&&pe("content",n.contentAdjustments,l.content,`
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${ye}
          </div>
        `)]);return `
    <div class="accessibility-widget-header">
      <div class="accessibility-widget-header-left">
        <div class="accessibility-widget-header-icon">${a.wheelchair}</div>
        <div class="accessibility-widget-header-text">
          <div class="accessibility-widget-header-title">
            <span>${o}</span>
          </div>
          ${i.shortcutLabel===null?"":`<kbd class="accessibility-widget-header-shortcut">${x(i.shortcutLabel??"CTRL + U")}</kbd>`}
          <div class="accessibility-widget-header-sub accessibility-widget-sr-only">${n.subtitle}</div>
        </div>
      </div>
      <div class="accessibility-widget-header-actions">
        <button type="button" class="accessibility-widget-icon-btn accessibility-widget-close" aria-label="${n.close}">${a.close}</button>
      </div>
    </div>

    <div class="accessibility-widget-body">
      <div class="accessibility-widget-body-container">
        ${Ve}
      </div>
    </div>

    <div class="accessibility-widget-reset-bar">
      <button type="button" class="accessibility-widget-reset-btn" data-action="reset" aria-label="${n.resetAll}">
        ${a.reset}
        ${n.resetAll}
      </button>
    </div>
  `}var wn=`
/* \u2500\u2500 Size switch \u2500\u2500 */
.accessibility-widget-size-switch {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: inline-flex;
  align-items: center;
  min-height: 0;
  padding: 0;
}
.accessibility-widget-size-switch:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-size-switch-track {
  position: relative;
  width: 150px;
  height: 44px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 5%, #ffffff);
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 8%, #ffffff);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 4px;
}
.accessibility-widget-size-switch-option {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 14px;
  font-weight: 750;
  line-height: 1;
  letter-spacing: 0;
  color: #111827;
  transition: color 0.25s ease;
}
.accessibility-widget-size-switch-thumb {
  position: absolute;
  z-index: 1;
  left: 4px;
  top: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: #ffffff;
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 52%, #ffffff);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-thumb {
  transform: translateX(100%);
}
.accessibility-widget-size-switch[aria-checked="false"] .accessibility-widget-size-switch-option--s,
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-option--l {
  color: #111827;
}

/* \u2500\u2500 Position grid \u2500\u2500 */
.accessibility-widget-position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
}
.accessibility-widget-position-option {
  aspect-ratio: 16 / 7;
  border-radius: 8px;
  border: 1px solid var(--accessibility-widget-border);
  background: color-mix(in srgb, var(--accessibility-widget-text) 4%, #ffffff);
  color: color-mix(in srgb, var(--accessibility-widget-text) 64%, transparent);
  cursor: pointer;
  display: grid;
  font: inherit;
  font-size: 17px;
  line-height: 1;
  padding: 6px;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.accessibility-widget-position-option[data-position="left"] span { place-self: end start; }
.accessibility-widget-position-option[data-position="right"] span { place-self: end end; }
.accessibility-widget-position-option:hover {
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-position-option:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-position-option[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: color-mix(in srgb, var(--accessibility-widget-primary) 12%, #ffffff);
  color: var(--accessibility-widget-primary);
}

/* \u2500\u2500 Profile cards \u2500\u2500 */
.accessibility-widget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.accessibility-widget-grid-tools { grid-template-columns: repeat(2, 1fr); }
[data-size="L"] .accessibility-widget-grid-tools {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.accessibility-widget-grid-3 { grid-template-columns: repeat(3, 1fr); }
[data-size="S"] .accessibility-widget-grid-3 { grid-template-columns: repeat(2, 1fr); }
.accessibility-widget-grid > *, .accessibility-widget-grid-3 > *, .accessibility-widget-grid-tools > * { min-width: 0; }

.accessibility-widget-card {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 14px 12px 13px;
  background: #ffffff;
  cursor: pointer;
  text-align: center;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 104px;
  width: 100%;
}
.accessibility-widget-card:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-card[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-card[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card .icon {
  width: 28px;
  height: 28px;
  color: var(--accessibility-widget-text);
  border: 0;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
}
.accessibility-widget-card:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-card .icon svg { width: 19px; height: 19px; }
.accessibility-widget-card .label {
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;
  width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: center;
  color: inherit;
}
.accessibility-widget-info {
  position: absolute;
  top: 13px;
  right: 13px;
  width: 18px;
  height: 18px;
  background: transparent;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accessibility-widget-text) 48%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  opacity: 0;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.accessibility-widget-info-glyph {
  font-size: 11px;
  font-weight: 800;
  font-style: normal;
  line-height: 1;
}
.accessibility-widget-tooltip {
  position: absolute;
  z-index: 8;
  top: calc(100% + 8px);
  right: 0;
  width: 198px;
  max-width: calc(100vw - 48px);
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accessibility-widget-panel-bg) 82%, #111827);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  font-size: 11px;
  font-weight: 650;
  line-height: 1.35;
  text-align: left;
  white-space: normal;
  display: none;
  pointer-events: auto;
  transition: none;
}
.accessibility-widget-tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 7px;
  width: 10px;
  height: 10px;
  background: inherit;
  transform: rotate(45deg);
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip {
  left: auto;
  right: 0;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip::before {
  left: auto;
  right: 7px;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
.accessibility-widget-card:hover .accessibility-widget-info,
.accessibility-widget-card:focus-visible .accessibility-widget-info,
.accessibility-widget-tile:hover .accessibility-widget-info,
.accessibility-widget-tile:focus-visible .accessibility-widget-info {
  opacity: 1;
  background: var(--accessibility-widget-info-bg);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-card[aria-pressed="true"] .accessibility-widget-info,
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-info {
  opacity: 1;
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #ffffff) 18%, transparent);
  color: var(--accessibility-widget-on-primary, #ffffff);
}
.accessibility-widget-info:hover .accessibility-widget-tooltip {
  display: block;
}

/* \u2500\u2500 Tiles (content & color adjustments) \u2500\u2500 */
.accessibility-widget-tile {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 14px 12px 13px;
  background: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  min-height: 114px;
  width: 100%;
}
.accessibility-widget-tile:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-tile[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-tile[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-tile[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
  border-color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 48%, transparent);
}
.accessibility-widget-tile .icon {
  width: 40px;
  height: 40px;
  color: var(--accessibility-widget-text);
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-tile:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-tile .icon svg { width: 22px; height: 22px; }
.accessibility-widget-tile .label {
  font-size: 13px;
  font-weight: 750;
  line-height: 1.25;
  overflow-wrap: anywhere;
  width: 100%;
  text-align: center;
  color: inherit;
}

/* \u2500\u2500 Level indicator bars (centered under each tile) \u2500\u2500 */
.accessibility-widget-levels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-top: 0;
  min-height: 7px;
}
.accessibility-widget-levels span {
  flex: 0 0 16px;
  width: 16px;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 16%, transparent);
  transition: background 0.2s ease, height 0.2s ease;
}
.accessibility-widget-levels span.active {
  height: 7px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 30%, transparent);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span.active {
  background: var(--accessibility-widget-on-primary, #fff);
}

/* \u2500\u2500 Reset bar \u2500\u2500 */
.accessibility-widget-reset-bar {
  padding: 0 12px 10px;
  border-top: 0;
  flex-shrink: 0;
  background: var(--accessibility-widget-panel-bg);
}
.accessibility-widget-reset-btn {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #ffffff);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-reset-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 90%, #ffffff);
}
.accessibility-widget-reset-btn svg { width: 14px; height: 14px; color: currentColor; }
`;var xn=`
@font-face {
  font-family: "Accessibility Widget OpenDyslexic";
  src: url("/accessibility-widget/fonts/opendyslexic-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget OpenDyslexic";
  src: url("/accessibility-widget/fonts/opendyslexic-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget Atkinson Hyperlegible";
  src: url("/accessibility-widget/fonts/atkinson-hyperlegible-regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget Atkinson Hyperlegible";
  src: url("/accessibility-widget/fonts/atkinson-hyperlegible-bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`;var vn=`
/* \u2500\u2500 Applied host effects \u2500\u2500 */
#accessibility-widget-host.accessibility-widget-effect-legible-fonts, #accessibility-widget-host.accessibility-widget-effect-legible-fonts * {
  font-family: var(--accessibility-widget-legible-font-family), Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: var(--accessibility-widget-legible-letter-spacing, 0em) !important;
  word-spacing: var(--accessibility-widget-legible-word-spacing, 0em) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dyslexia, #accessibility-widget-host.accessibility-widget-effect-dyslexia * {
  font-family: "Accessibility Widget OpenDyslexic", Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: 0.04em !important;
  word-spacing: 0.03em !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h1,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h2,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h3,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h4,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h5,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h6 {
  outline: var(--accessibility-widget-title-outline-width, 2px) solid #f59e0b !important;
  outline-offset: 2px !important;
  background: rgba(245,158,11,var(--accessibility-widget-title-highlight-alpha, 0.07)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-links a {
  outline: var(--accessibility-widget-link-outline-width, 2px) solid #3b82f6 !important;
  outline-offset: 2px !important;
  background: rgba(59,130,246,var(--accessibility-widget-link-highlight-alpha, 0.07)) !important;
  text-decoration: underline !important;
  text-decoration-thickness: var(--accessibility-widget-link-underline-width, 1px) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast {
  background: var(--accessibility-widget-dark-contrast-bg, #000) !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
  border-color: var(--accessibility-widget-dark-contrast-border, #333) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast {
  background: var(--accessibility-widget-light-contrast-bg, #fff) !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
  border-color: var(--accessibility-widget-light-contrast-border, #475569) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast {
  background: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast * {
  background-color: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
  border-color: var(--accessibility-widget-high-contrast-border, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-monochrome { filter: grayscale(var(--accessibility-widget-monochrome-amount, 100%)) !important; }
#accessibility-widget-host.accessibility-widget-effect-invert { filter: invert(var(--accessibility-widget-invert-amount, 100%)) hue-rotate(180deg) !important; }
#accessibility-widget-host.accessibility-widget-effect-color-blind {
  filter:
    url('#accessibility-widget-protanopia')
    saturate(var(--accessibility-widget-color-blind-saturate, 0.85))
    contrast(var(--accessibility-widget-color-blind-contrast, 1)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-hide-images img,
#accessibility-widget-host.accessibility-widget-effect-hide-images picture {
  visibility: hidden !important;
}
#accessibility-widget-host.accessibility-widget-effect-off-animations,
#accessibility-widget-host.accessibility-widget-effect-off-animations *,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::before,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::after {
  animation-delay: 0s !important;
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-delay: 0s !important;
  transition-duration: 0.001ms !important;
}
#accessibility-widget-host.accessibility-widget-effect-focus-highlight :focus,
#accessibility-widget-host.accessibility-widget-effect-focus-highlight :focus-visible {
  outline: 3px solid #1d4ed8 !important;
  outline-offset: 2px !important;
}
`;var kn=`
.accessibility-widget-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2500\u2500 Trigger \u2500\u2500 */
.accessibility-widget-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.2s ease;
}
.accessibility-widget-trigger:hover { filter: brightness(0.93); }
.accessibility-widget-trigger:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accessibility-widget-primary) 55%, transparent);
  outline-offset: 3px;
}
.accessibility-widget-trigger svg { width: 26px; height: 26px; }
.accessibility-widget-trigger[data-position="right"] { right: var(--accessibility-widget-trigger-offset-x, 20px); bottom: var(--accessibility-widget-trigger-offset-y, 20px); }
.accessibility-widget-trigger[data-position="left"]  { left: var(--accessibility-widget-trigger-offset-x, 20px);  bottom: var(--accessibility-widget-trigger-offset-y, 20px); }

/* \u2500\u2500 Overlay \u2500\u2500 */
.accessibility-widget-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9,9,11,0.42);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.accessibility-widget-overlay.open { opacity: 1; pointer-events: auto; }

/* \u2500\u2500 Panel \u2500\u2500 */
.accessibility-widget-panel {
  position: fixed;
  z-index: 2147483647;
  background: var(--accessibility-widget-panel-bg);
  width: 380px;
  max-width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  max-height: 720px;
  border-radius: 22px;
  border: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.accessibility-widget-panel.open {
  opacity: 1;
  pointer-events: auto;
}
.accessibility-widget-panel[data-size="S"] { width: 380px; max-height: 720px; }
.accessibility-widget-panel[data-size="L"] { width: 460px; max-height: 920px; }
.accessibility-widget-panel[data-position="right"] { right: 8px; bottom: 8px; }
.accessibility-widget-panel[data-position="left"]  { left: 8px;  bottom: 8px; }
@media (max-width: 480px) {
  .accessibility-widget-panel,
  .accessibility-widget-panel[data-size="S"],
  .accessibility-widget-panel[data-size="L"] {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    max-height: none;
  }
}

/* \u2500\u2500 Header \u2500\u2500 */
.accessibility-widget-header {
  background: var(--accessibility-widget-panel-bg);
  color: var(--accessibility-widget-on-primary, #fff);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 10px;
}
.accessibility-widget-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.accessibility-widget-header-icon {
  width: 34px;
  height: 34px;
  background: var(--accessibility-widget-primary);
  border: 0;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-header-icon svg { width: 20px; height: 20px; }
.accessibility-widget-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.accessibility-widget-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
  max-width: 100%;
}
.accessibility-widget-header-title {
  display: block;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--accessibility-widget-on-primary, #fff);
  line-height: 1.15;
}
.accessibility-widget-header-title span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-header-shortcut {
  border: 0;
  padding: 0;
  background: transparent;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 76%, transparent);
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
}
.accessibility-widget-header-sub {
  font-size: 11px;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 72%, transparent);
  letter-spacing: 0;
  text-transform: uppercase;
  line-height: 1.2;
}
.accessibility-widget-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 7px;
}
.accessibility-widget-icon-btn {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-primary) 10%, #ffffff);
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.16s ease;
}
.accessibility-widget-icon-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 7%, #ffffff);
  color: #111827;
  transform: scale(1.04);
}
.accessibility-widget-icon-btn:active {
  transform: scale(0.98);
}
.accessibility-widget-icon-btn svg { width: 12px; height: 12px; }

/* \u2500\u2500 Body \u2500\u2500 */
.accessibility-widget-body {
  flex: 1;
  overflow: hidden;
  margin: 0 12px 10px;
  background: var(--accessibility-widget-panel-bg);
  min-width: 0;
  border-radius: 8px;
}

.accessibility-widget-body-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.accessibility-widget-body::-webkit-scrollbar { width: 7px; }
.accessibility-widget-body::-webkit-scrollbar-track { background: transparent; }
.accessibility-widget-body::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 36%, transparent);
  border-radius: 999px;
  border: 2px solid var(--accessibility-widget-panel-bg);
}
.accessibility-widget-body::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 56%, transparent);
}

/* \u2500\u2500 Section \u2500\u2500 */
.accessibility-widget-section {
  padding: 16px;
  background: var(--accessibility-widget-card-bg);
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-border) 88%, #ffffff);
  border-radius: 8px;
  margin: 0 0 16px;
  color: var(--accessibility-widget-text);
}
.accessibility-widget-section:last-child { margin-bottom: 0; }
.accessibility-widget-section-head {
  width: 100%;
  min-height: 44px;
  border: 0;
  border-radius: 8px;
  background: var(--accessibility-widget-section-head-bg);
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
}
.accessibility-widget-section-head:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-section-title {
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0;
  text-transform: none;
  color: var(--accessibility-widget-text);
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-section-chevron {
  width: 18px;
  height: 18px;
  color: #111827;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-section-chevron svg { width: 18px; height: 18px; }
.accessibility-widget-section-body {
  padding-top: 16px;
}
.accessibility-widget-section-body[hidden] {
  display: none;
}
.accessibility-widget-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
}
.accessibility-widget-setting-row + .accessibility-widget-setting-row {
  margin-top: 12px;
}
.accessibility-widget-setting-row--stack {
  align-items: stretch;
  flex-direction: column;
  gap: 8px;
}
.accessibility-widget-setting-label {
  color: var(--accessibility-widget-text);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
}
`;var Sn=`
.accessibility-widget-magnify-cursor {
  position: fixed;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 2147483645;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 18px;
  max-width: 280px;
  color: #0c0c0c;
  line-height: 1.4;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

/* \u2500\u2500 Reading lens (circular zoom that follows the cursor) \u2500\u2500 */
.accessibility-widget-reading-lens {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2147483645;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  border: 3px solid #0c0c0c;
  will-change: transform;
  contain: layout paint;
}
.accessibility-widget-reading-lens-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
  will-change: transform;
}
.accessibility-widget-reading-lens-inner > * {
  margin: 0 !important;
}
.accessibility-widget-reading-lens-inner,
.accessibility-widget-reading-lens-inner *,
.accessibility-widget-reading-lens-inner *::before,
.accessibility-widget-reading-lens-inner *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

/* \u2500\u2500 Reading mask (clear horizontal band with shaded surroundings) \u2500\u2500 */
.accessibility-widget-reading-mask {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483644;
}
.accessibility-widget-reading-mask-panel {
  position: fixed;
  left: 0;
  right: 0;
  background: rgba(0,0,0,var(--accessibility-widget-reading-mask-opacity, 0.45));
}
.accessibility-widget-reading-mask-top {
  top: 0;
  border-bottom: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}
.accessibility-widget-reading-mask-bottom {
  bottom: 0;
  border-top: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}

/* \u2500\u2500 Reading guide (high-contrast rule that follows the cursor) \u2500\u2500 */
.accessibility-widget-reading-guide {
  position: fixed;
  left: 0;
  width: 100vw;
  height: var(--accessibility-widget-reading-guide-height, 8px);
  border: var(--accessibility-widget-reading-guide-border, 3px) solid var(--accessibility-widget-reading-guide-edge, #facc15);
  border-radius: 999px;
  background: var(--accessibility-widget-reading-guide-fill, #0c0c0c);
  pointer-events: none;
  z-index: 2147483645;
}
.accessibility-widget-reading-guide-pointer {
  position: absolute;
  left: var(--accessibility-widget-reading-guide-x, 50vw);
  top: -24px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 18px solid var(--accessibility-widget-reading-guide-edge, #facc15);
}
.accessibility-widget-reading-guide-pointer::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 7px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid var(--accessibility-widget-reading-guide-fill, #0c0c0c);
}

.accessibility-widget-root :focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 2px;
}
`;var Ln=`
/* \u2500\u2500 Page structure dialog \u2500\u2500 */
.accessibility-widget-structure-layer {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
}
.accessibility-widget-structure-layer[hidden] { display: none; }
.accessibility-widget-structure-dialog {
  position: fixed;
  top: 24px;
  bottom: 24px;
  left: clamp(16px, 5vw, 80px);
  width: min(920px, calc(100vw - 420px));
  min-width: min(640px, calc(100vw - 32px));
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  border-radius: 16px;
  border: 1px solid var(--accessibility-widget-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}
.accessibility-widget-structure-header {
  min-height: 62px;
  padding: 14px 22px;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.accessibility-widget-structure-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.accessibility-widget-structure-close {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.accessibility-widget-structure-close:hover {
  background: color-mix(in srgb, currentColor 14%, transparent);
}
.accessibility-widget-structure-close svg {
  width: 20px;
  height: 20px;
}
.accessibility-widget-structure-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid var(--accessibility-widget-border);
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-tab {
  min-height: 50px;
  border: 0;
  border-inline-end: 1px solid var(--accessibility-widget-border);
  background: transparent;
  color: var(--accessibility-widget-muted);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.01em;
  position: relative;
  transition: background 0.2s ease, color 0.2s ease;
}
.accessibility-widget-structure-tab:last-child { border-inline-end: 0; }
.accessibility-widget-structure-tab:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"] {
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-list {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-item {
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 22px);
  text-align: left;
  transition: background 0.12s ease, color 0.12s ease;
}
.accessibility-widget-structure-item:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-badge {
  width: 34px;
  height: 26px;
  border-radius: 7px;
  background: var(--accessibility-widget-surface);
  border: 1px solid var(--accessibility-widget-border);
  color: var(--accessibility-widget-primary);
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.accessibility-widget-structure-badge--text {
  background: var(--accessibility-widget-surface);
  font-size: 11px;
  font-weight: 700;
}
.accessibility-widget-structure-badge svg {
  width: 16px;
  height: 16px;
}
.accessibility-widget-structure-item-label {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 15px;
  line-height: 1.25;
}
.accessibility-widget-structure-external {
  flex: 0 0 auto;
  display: inline-flex;
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-external svg {
  width: 14px;
  height: 14px;
}
.accessibility-widget-structure-empty {
  padding: 28px 12px;
  color: var(--accessibility-widget-muted);
  font-size: 13px;
}

/* \u2500\u2500 Page structure dialog \u2014 small viewports \u2500\u2500 */
@media (max-width: 900px) {
  .accessibility-widget-structure-dialog {
    inset: 12px;
    width: auto;
    min-width: 0;
  }
  .accessibility-widget-structure-header {
    min-height: 64px;
    padding: 14px 18px;
  }
  .accessibility-widget-structure-tab {
    min-height: 46px;
    font-size: 13px;
  }
  .accessibility-widget-structure-list {
    padding: 12px;
  }
  .accessibility-widget-structure-item {
    margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 12px);
  }
  .accessibility-widget-structure-item-label {
    font-size: 14px;
  }
}
`;var fe={primary:"#0c0c0c",background:"#ffffff",text:"#0c0c0c",border:"#e4e4e7",muted:"#71717a",surface:"#f4f4f5"},An=e=>`
.accessibility-widget-root {
  --accessibility-widget-primary: ${e.primary};
  --accessibility-widget-bg: ${e.background};
  --accessibility-widget-text: ${e.text};
  --accessibility-widget-border: ${e.border};
  --accessibility-widget-muted: ${e.muted};
  --accessibility-widget-surface: ${e.surface};
  --accessibility-widget-on-primary: #ffffff;
  --accessibility-widget-panel-bg: color-mix(in srgb, var(--accessibility-widget-primary) 24%, #01020f);
  --accessibility-widget-card-bg: color-mix(in srgb, var(--accessibility-widget-bg) 92%, #ffffff);
  --accessibility-widget-section-head-bg: color-mix(in srgb, var(--accessibility-widget-text) 7%, #ffffff);
  --accessibility-widget-info-bg: color-mix(in srgb, var(--accessibility-widget-panel-bg) 9%, #ffffff);
  --accessibility-widget-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--accessibility-widget-text);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
.accessibility-widget-root *, .accessibility-widget-root *::before, .accessibility-widget-root *::after {
  box-sizing: border-box;
}
`;var si="accessibility-widget-styles";function En(e=fe){return [xn,An(e),kn,wn,Ln,vn,Sn].join(`
`)}var Tn=["darkContrast","lightContrast","highContrast","monochrome","invertColors"],ai=["left","center","right","justify"],vo=["settings","profiles","content","color","visibility"],ko={"seizure-safe":v.seizureSafe,"vision-impaired":v.visionImpaired,"light-sensitivity":v.lightSensitivity,"color-blind":v.colorBlind,dyslexia:v.dyslexia,"adhd-friendly":v.adhdFriendly,"cognitive-disability":v.cognitiveDisability,"keyboard-motor":v.keyboardMotor,"blind-screen-reader":v.blindScreenReader},So={key:"u",ctrlKey:true};function Lo(e){let t=[];return e.ctrlKey&&t.push("CTRL"),e.altKey&&t.push("ALT"),e.shiftKey&&t.push("SHIFT"),e.metaKey&&t.push("CMD"),t.push(e.key.toUpperCase()),t.join(" + ")}function Mn(e){return typeof e=="string"&&e.toUpperCase()==="L"?"L":"S"}function he(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Cn(e){return e==="left"?"left":"right"}function Ao(e){let t=e.trim().replace(/^#/,""),i,n,o;if(t.length===3)i=parseInt(t[0]+t[0],16),n=parseInt(t[1]+t[1],16),o=parseInt(t[2]+t[2],16);else if(t.length===6)i=parseInt(t.slice(0,2),16),n=parseInt(t.slice(2,4),16),o=parseInt(t.slice(4,6),16);else return "#ffffff";if([i,n,o].some(d=>Number.isNaN(d)))return "#ffffff";let r=d=>{let h=d/255;return h<=.03928?h/12.92:Math.pow((h+.055)/1.055,2.4)};return .2126*r(i)+.7152*r(n)+.0722*r(o)>.45?"#0c0c0c":"#ffffff"}var me=class{constructor(t={}){this.root=null;this.trigger=null;this.overlay=null;this.panel=null;this.structureDialog=null;this.isOpen=false;this.pageStructureOpen=false;this.pageStructureTab="headings";this.collapsedSections={settings:true,profiles:false,content:false,color:false,visibility:false};this.liveRegion=null;this.userInteracted=false;this.motionMql=null;this.handleMotionChange=t=>{if(this.userInteracted||this.state.profile!==null)return;let i=t.matches?1:0;this.state.offAnimations!==i&&(this.state={...this.state,offAnimations:i},this.persist(),de(this.state),this.update());};this.shortcutListenerOptions={capture:true};this.handleGlobalShortcut=t=>{let i=this.resolveShortcut();!i||!(t.key.toLowerCase()===i.key.toLowerCase()&&t.ctrlKey===!!i.ctrlKey&&t.altKey===!!i.altKey&&t.shiftKey===!!i.shiftKey&&t.metaKey===!!i.metaKey)||(t.preventDefault(),t.stopPropagation(),this.toggle());};this.config={position:"right",persistence:true,...t},this.config.position=Cn(this.config.position),this.size=Mn(this.config.size),this.state=an(this.config.persistence),(this.config.respectOsPreferences??true)&&this.state.profile===null&&!ln(this.config.persistence)&&(this.state={...this.state,...rn(on())});}mount(){if(!(typeof document>"u")){if(this.injectStyles(),Xe(),this.root=document.createElement("div"),this.root.className="accessibility-widget-root",this.root.setAttribute("role","complementary"),this.applyTheme(),this.applyOffset(),this.trigger=document.createElement("button"),this.trigger.className="accessibility-widget-trigger",this.trigger.type="button",this.trigger.dataset.position=this.config.position,this.trigger.setAttribute("aria-expanded","false"),this.trigger.innerHTML=a.trigger,this.trigger.addEventListener("click",()=>this.toggle()),this.overlay=document.createElement("div"),this.overlay.className="accessibility-widget-overlay",this.overlay.addEventListener("click",()=>{this.pageStructureOpen?this.closePageStructure():this.close();}),this.panel=document.createElement("div"),this.panel.className="accessibility-widget-panel",this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.dataset.position=this.config.position,this.panel.dataset.size=this.size,this.panel.addEventListener("click",t=>this.handlePanelClick(t)),this.structureDialog=document.createElement("div"),this.structureDialog.className="accessibility-widget-structure-layer",this.structureDialog.hidden=true,this.structureDialog.addEventListener("click",t=>this.handleStructureClick(t)),this.liveRegion=document.createElement("div"),this.liveRegion.className="accessibility-widget-sr-only",this.liveRegion.setAttribute("role","status"),this.liveRegion.setAttribute("aria-live","polite"),this.liveRegion.setAttribute("aria-atomic","true"),this.root.append(this.trigger,this.overlay,this.panel,this.structureDialog,this.liveRegion),document.body.appendChild(this.root),document.addEventListener("keydown",this.handleGlobalShortcut,this.shortcutListenerOptions),(this.config.respectOsPreferences??true)&&typeof window<"u"&&typeof window.matchMedia=="function")try{this.motionMql=window.matchMedia("(prefers-reduced-motion: reduce)"),this.motionMql.addEventListener?.("change",this.handleMotionChange);}catch{this.motionMql=null;}Pi(this.config.dictionaryLookup??null),$i(this.config.onSimplify??null),this.update(),de(this.state);}}destroy(){Wi(),Ye(),ue(),document.removeEventListener("keydown",this.handleGlobalShortcut,this.shortcutListenerOptions),this.motionMql?.removeEventListener?.("change",this.handleMotionChange),this.motionMql=null,this.root&&(this.root.remove(),this.root=null),this.trigger=null,this.overlay=null,this.panel=null,this.structureDialog=null,this.liveRegion=null;}open(){this.isOpen=true,this.trigger?.setAttribute("aria-expanded","true"),this.config.onOpen?.(),this.emit({type:"open"}),this.update(),this.panel&&this.trigger&&De(this.panel,this.trigger);}close(){this.isOpen=false,this.pageStructureOpen=false,this.trigger?.setAttribute("aria-expanded","false"),this.config.onClose?.(),this.emit({type:"close"}),ue(),this.update();}toggle(){this.isOpen?this.close():this.open();}reset(){let t=this.captureScrollPosition(),i=this.capturePanelFocusSelector();this.pageStructureOpen=false,this.userInteracted=true,this.state={...M},this.persist(),de(this.state),this.announce("All settings reset"),this.config.onReset?.(),this.emit({type:"reset"}),this.update(t,i);}getState(){return {...this.state}}getIsOpen(){return this.isOpen}setSize(t){this.size=Mn(t),this.panel&&(this.panel.dataset.size=this.size),this.update();}setPosition(t){let i=Cn(t);this.config.position=i,this.trigger&&(this.trigger.dataset.position=i),this.panel&&(this.panel.dataset.position=i),this.update();}setOffsetX(t){this.config.offsetX=t,this.applyOffset();}setOffsetY(t){this.config.offsetY=t,this.applyOffset();}setTitle(t){this.config.title=t,this.updateWidgetLabels(),this.update();}setAccentColor(t){this.config.accentColor=t,this.applyTheme();}setTheme(t){this.config.theme=t,this.applyTheme();}setHiddenProfiles(t){this.config.hiddenProfiles=t,this.update();}setHiddenTools(t){this.config.hiddenTools=t,this.update();}applyOffset(){if(!this.root)return;let{offsetX:t,offsetY:i}=this.config;g(this.root,"--accessibility-widget-trigger-offset-x",typeof t=="number"?`${t}px`:void 0),g(this.root,"--accessibility-widget-trigger-offset-y",typeof i=="number"?`${i}px`:void 0);}getTitle(){return this.config.title?.trim()||v.title}getTriggerLabel(t){return t.toLowerCase().includes("menu")?`Open ${t}`:`Open ${t} menu`}updateWidgetLabels(){let t=this.getTitle();this.root?.setAttribute("aria-label",t),this.trigger?.setAttribute("aria-label",this.getTriggerLabel(t)),this.panel?.setAttribute("aria-label",`${t} settings`);}applyTheme(){if(!this.root)return;let t=this.config.accentColor?.trim()||this.config.theme?.primary,i=this.config.theme;g(this.root,"--accessibility-widget-primary",t),g(this.root,"--accessibility-widget-header-bg",t),g(this.root,"--accessibility-widget-bg",i?.background),g(this.root,"--accessibility-widget-text",i?.text),g(this.root,"--accessibility-widget-on-primary",t?Ao(t):void 0);}handlePanelClick(t){let i=t.target;if(i.closest(".accessibility-widget-close")){this.close();return}this.handleSectionToggleClick(i)||this.handleActionClick(i)||this.handleSizeClick(i)||this.handlePositionClick(i)||this.handleProfileClick(i)||this.handleToolClick(i);}handleSectionToggleClick(t){let i=t.closest("[data-section-toggle]");if(!i)return  false;let n=i.dataset.sectionToggle;return this.isPanelSection(n)&&(this.collapsedSections[n]=!this.collapsedSections[n],this.update()),true}isPanelSection(t){return vo.includes(t)}handleActionClick(t){let i=t.closest("[data-action]");return i?(i.dataset.action==="reset"&&this.reset(),true):false}handleSizeClick(t){let i=t.closest("[data-size]");return !i||!this.panel?.contains(i)||!i.classList.contains("accessibility-widget-size-switch")?false:(this.setSize(i.dataset.size),true)}handlePositionClick(t){let i=t.closest("[data-position]");if(!i||!this.panel?.contains(i)||!i.classList.contains("accessibility-widget-position-option"))return  false;let n=i.dataset.position;return n!=="left"&&n!=="right"||this.setPosition(n),true}handleProfileClick(t){let i=t.closest("[data-profile]");return i?(this.toggleProfile(i.dataset.profile),true):false}handleToolClick(t){let i=t.closest("[data-tool]");if(!i)return  false;let n=i.dataset.tool;return n==="pageStructure"?this.togglePageStructure():n==="textAlignment"?this.cycleAlignment():n&&V.includes(n)&&this.cycleLevel(n),true}handleStructureClick(t){let i=t.target;if(i.closest('[data-structure-action="close"]')){this.closePageStructure();return}let n=i.closest("[data-structure-tab]");if(n){this.pageStructureTab=this.normalizeStructureTab(n.dataset.structureTab),this.update();return}let o=i.closest("[data-structure-target]");o?.dataset.structureTarget&&this.jumpToStructureTarget(o.dataset.structureTarget);}normalizeStructureTab(t){return t==="landmarks"||t==="links"?t:"headings"}togglePageStructure(){this.pageStructureOpen?this.closePageStructure():this.openPageStructure();}openPageStructure(){this.pageStructureTab="headings",this.pageStructureOpen=true,this.update(),this.trapStructureFocus();}closePageStructure(){this.pageStructureOpen&&(this.pageStructureOpen=false,ue(),this.update(),this.isOpen&&this.panel&&this.trigger&&De(this.panel,this.trigger));}trapStructureFocus(){let t=this.structureDialog?.querySelector(".accessibility-widget-structure-close");!this.structureDialog||!t||De(this.structureDialog,t,()=>this.closePageStructure());}jumpToStructureTarget(t){let i=document.querySelector(`[data-accessibility-widget-structure-id="${t}"]`);i&&(this.closePageStructure(),i.scrollIntoView({block:"center",behavior:"smooth"}),i.hasAttribute("tabindex")||i.setAttribute("tabindex","-1"),i.focus({preventScroll:true}));}toggleProfile(t){if(this.state.profile===t)this.state={...M},this.announce("Profiles reset");else {let i=dn[t]??{};this.state={...M,profile:t,...i},this.announce(`${ko[t]??t} profile applied`);}this.emit({type:"profile",profile:this.state.profile}),this.commit();}cycleLevel(t){let i=this.state[t];if(typeof i!="number")return;let n=T[t],o=i>=n?0:i+1;if(Tn.includes(t)&&o>0)for(let l of Tn)l!==t&&(this.state[l]=0);this.state[t]=o;let r=v[t]??t;this.announce(n<=1?`${r} ${o>0?"on":"off"}`:o>0?`${r}, level ${o} of ${n}`:`${r} off`),this.emit({type:"tool",tool:t,level:o}),this.commit();}cycleAlignment(){let t=ai.indexOf(this.state.textAlignment);this.state.textAlignment=ai[(t+1)%ai.length],this.announce(`Text alignment ${this.state.textAlignment}`),this.emit({type:"alignment",alignment:this.state.textAlignment}),this.commit();}commit(){this.userInteracted=true;let t=this.captureScrollPosition(),i=this.capturePanelFocusSelector();this.persist(),de(this.state),this.update(t,i);}persist(){cn(this.config.persistence,this.state);}announce(t){this.liveRegion&&(this.liveRegion.textContent=t);}resolveShortcut(){let t=this.config.shortcut;return t===false?null:t??So}getShortcutLabel(){let t=this.resolveShortcut();return t?Lo(t):null}emit(t){try{this.config.onEvent?.(t);}catch{}}update(t=this.captureScrollPosition(),i=this.capturePanelFocusSelector()){this.panel&&(this.updateWidgetLabels(),this.panel.classList.toggle("open",this.isOpen),this.overlay?.classList.toggle("open",this.isOpen),this.panel.innerHTML=bn(this.state,this.size,{pageStructureOpen:this.pageStructureOpen,title:this.getTitle(),position:this.config.position,collapsedSections:this.collapsedSections,hiddenProfiles:this.config.hiddenProfiles,hiddenTools:this.config.hiddenTools,shortcutLabel:this.getShortcutLabel(),simplifyEnabled:!!this.config.onSimplify}),this.renderStructureDialog(),this.restorePanelFocus(i),this.restoreScrollPosition(t));}captureScrollPosition(){let t=this.panel?.querySelector(".accessibility-widget-body-container");return {panelBodyLeft:t?.scrollLeft??0,panelBodyTop:t?.scrollTop??0,windowX:typeof window>"u"?0:window.scrollX,windowY:typeof window>"u"?0:window.scrollY}}restoreScrollPosition(t){let i=()=>{let n=this.panel?.querySelector(".accessibility-widget-body-container");n&&(n.scrollLeft=t.panelBodyLeft,n.scrollTop=t.panelBodyTop),this.restoreWindowScroll(t.windowX,t.windowY);};i(),typeof window<"u"&&typeof window.requestAnimationFrame=="function"&&window.requestAnimationFrame(i);}restoreWindowScroll(t,i){if(typeof window>"u")return;let n=window.scrollX,o=window.scrollY;if(n===t&&o===i)return;if(typeof window.scrollTo=="function")try{window.scrollTo(t,i);return}catch{}let r=document.scrollingElement;r&&(r.scrollLeft=t,r.scrollTop=i);}capturePanelFocusSelector(){if(!this.panel||typeof document>"u")return null;let t=document.activeElement;if(!(t instanceof HTMLElement)||!this.panel.contains(t))return null;let i=t.closest("[data-tool]");if(i&&this.panel.contains(i)&&i.dataset.tool)return `[data-tool="${he(i.dataset.tool)}"]`;let n=t.closest("[data-profile]");if(n&&this.panel.contains(n)&&n.dataset.profile)return `[data-profile="${he(n.dataset.profile)}"]`;let o=t.closest("[data-section-toggle]");if(o&&this.panel.contains(o)&&o.dataset.sectionToggle)return `[data-section-toggle="${he(o.dataset.sectionToggle)}"]`;let r=t.closest(".accessibility-widget-position-option[data-position]");if(r&&this.panel.contains(r)&&r.dataset.position)return `.accessibility-widget-position-option[data-position="${he(r.dataset.position)}"]`;if(t.classList.contains("accessibility-widget-size-switch"))return ".accessibility-widget-size-switch";if(t.classList.contains("accessibility-widget-close"))return ".accessibility-widget-close";let l=t.closest("[data-action]");return l&&this.panel.contains(l)&&l.dataset.action?`[data-action="${he(l.dataset.action)}"]`:null}restorePanelFocus(t){if(!t||!this.isOpen||!this.panel)return;let i=this.panel.querySelector(t);if(i)try{i.focus({preventScroll:!0});}catch{i.focus();}}renderStructureDialog(){if(!this.structureDialog)return;if(this.structureDialog.hidden=!this.pageStructureOpen,this.structureDialog.classList.toggle("open",this.pageStructureOpen),!this.pageStructureOpen){this.structureDialog.innerHTML="";return}let t=ni(v);this.structureDialog.innerHTML=oi(t,this.pageStructureTab,v);}injectStyles(){if(typeof document>"u"||document.getElementById(si))return;let t=document.createElement("style");t.id=si,t.textContent=En(fe),document.head.appendChild(t);}};var To="0.2.5",R=null;function In(e){if(e==null||e.trim()==="")return;let t=Number(e);return Number.isFinite(t)?t:void 0}function _n(e){if(!e||typeof HTMLElement>"u"||!(e instanceof HTMLElement))return {};let t=e.dataset,i={};if(t.title!=null&&(i.title=t.title),t.accentColor!=null&&(i.accentColor=t.accentColor),(t.position==="left"||t.position==="right")&&(i.position=t.position),t.size){let r=t.size.toUpperCase();(r==="S"||r==="L")&&(i.size=r);}let n=In(t.offsetX);n!=null&&(i.offsetX=n);let o=In(t.offsetY);return o!=null&&(i.offsetY=o),t.persistence!=null&&(i.persistence=t.persistence!=="false"),i}function Pn(e){let t=_n(e),n={...typeof window<"u"&&window.AccessibilityWidgetConfig||{},...t},o=e&&typeof HTMLElement<"u"&&e instanceof HTMLElement?e.dataset.auto:void 0;return {config:n,auto:o!=="false"}}function Hn(e={}){if(R)return R;let t=new me(e);return t.mount(),R=t,t}function Mo(){return R}function Co(){R&&(R.destroy(),R=null);}function li(e=typeof document<"u"?document.currentScript:null){if(typeof document>"u")return;let{config:t,auto:i}=Pn(e);if(!i)return;let n=()=>Hn(t);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):n();}li();/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/a-large-small.mjs:
lucide-react/dist/esm/icons/between-horizontal-start.mjs:
lucide-react/dist/esm/icons/between-vertical-start.mjs:
lucide-react/dist/esm/icons/book-open-text.mjs:
lucide-react/dist/esm/icons/brain.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-up.mjs:
lucide-react/dist/esm/icons/circle.mjs:
lucide-react/dist/esm/icons/circle-off.mjs:
lucide-react/dist/esm/icons/contrast.mjs:
lucide-react/dist/esm/icons/eye.mjs:
lucide-react/dist/esm/icons/external-link.mjs:
lucide-react/dist/esm/icons/focus.mjs:
lucide-react/dist/esm/icons/heading.mjs:
lucide-react/dist/esm/icons/image-off.mjs:
lucide-react/dist/esm/icons/landmark.mjs:
lucide-react/dist/esm/icons/layers.mjs:
lucide-react/dist/esm/icons/link.mjs:
lucide-react/dist/esm/icons/monitor-pause.mjs:
lucide-react/dist/esm/icons/moon.mjs:
lucide-react/dist/esm/icons/mouse-pointer-2.mjs:
lucide-react/dist/esm/icons/move-horizontal.mjs:
lucide-react/dist/esm/icons/palette.mjs:
lucide-react/dist/esm/icons/rotate-ccw.mjs:
lucide-react/dist/esm/icons/rows-3.mjs:
lucide-react/dist/esm/icons/scan-eye.mjs:
lucide-react/dist/esm/icons/sun-dim.mjs:
lucide-react/dist/esm/icons/sun.mjs:
lucide-react/dist/esm/icons/text-align-center.mjs:
lucide-react/dist/esm/icons/text-align-end.mjs:
lucide-react/dist/esm/icons/text-align-justify.mjs:
lucide-react/dist/esm/icons/text-align-start.mjs:
lucide-react/dist/esm/icons/text-initial.mjs:
lucide-react/dist/esm/icons/venetian-mask.mjs:
lucide-react/dist/esm/icons/volume-2.mjs:
lucide-react/dist/esm/icons/whole-word.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/icons/zap.mjs:
lucide-react/dist/esm/icons/zoom-in.mjs:
lucide-react/dist/esm/icons/ear.mjs:
lucide-react/dist/esm/icons/keyboard.mjs:
lucide-react/dist/esm/icons/book-a.mjs:
lucide-react/dist/esm/icons/sparkles.mjs:
lucide-react/dist/esm/icons/square-dashed-mouse-pointer.mjs:
  (**
   * @license lucide-react v1.18.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/exports.autoInit=li;exports.destroy=Co;exports.getInstance=Mo;exports.init=Hn;exports.parseConfigFromElement=_n;exports.resolveConfig=Pn;exports.version=To;return exports;})({});//# sourceMappingURL=accessibility-widget.global.js.map
//# sourceMappingURL=accessibility-widget.global.js.map