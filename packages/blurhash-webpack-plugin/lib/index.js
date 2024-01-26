"use strict";var z=Object.create;var d=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty;var V=(t,a)=>{for(var e in a)d(t,e,{get:a[e],enumerable:!0})},x=(t,a,e,o)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of E(a))!U.call(t,r)&&r!==e&&d(t,r,{get:()=>a[r],enumerable:!(o=I(a,r))||o.enumerable});return t};var k=(t,a,e)=>(e=t!=null?z(B(t)):{},x(a||!t||!t.__esModule?d(e,"default",{value:t,enumerable:!0}):e,t)),R=t=>x(d({},"__esModule",{value:!0}),t);var G={};V(G,{default:()=>q});module.exports=R(G);var j=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","#","$","%","*","+",",","-",".",":",";","=","?","@","[","]","^","_","{","|","}","~"];var c=(t,a)=>{var e="";for(let o=1;o<=a;o++){let r=Math.floor(t)/Math.pow(83,a-o)%83;e+=j[Math.floor(r)]}return e},p=t=>{let a=t/255;return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)},w=t=>{let a=Math.max(0,Math.min(1,t));return a<=.0031308?Math.trunc(a*12.92*255+.5):Math.trunc((1.055*Math.pow(a,.4166666666666667)-.055)*255+.5)},F=t=>t<0?-1:1,g=(t,a)=>F(t)*Math.pow(Math.abs(t),a),y=class extends Error{constructor(t){super(t),this.name="ValidationError",this.message=t}};var P=4,H=(t,a,e,o)=>{let r=0,h=0,i=0,u=a*P;for(let f=0;f<a;f++){let M=P*f;for(let l=0;l<e;l++){let s=M+l*u,m=o(f,l);r+=m*p(t[s]),h+=m*p(t[s+1]),i+=m*p(t[s+2])}}let n=1/(a*e);return[r*n,h*n,i*n]},L=t=>{let a=w(t[0]),e=w(t[1]),o=w(t[2]);return(a<<16)+(e<<8)+o},N=(t,a)=>{let e=Math.floor(Math.max(0,Math.min(18,Math.floor(g(t[0]/a,.5)*9+9.5)))),o=Math.floor(Math.max(0,Math.min(18,Math.floor(g(t[1]/a,.5)*9+9.5)))),r=Math.floor(Math.max(0,Math.min(18,Math.floor(g(t[2]/a,.5)*9+9.5))));return e*19*19+o*19+r},T=(t,a,e,o,r)=>{if(o<1||o>9||r<1||r>9)throw new y("BlurHash must have between 1 and 9 components");if(a*e*4!==t.length)throw new y("Width and height must match the pixels array");let h=[];for(let l=0;l<r;l++)for(let s=0;s<o;s++){let m=s==0&&l==0?1:2,D=H(t,a,e,(O,$)=>m*Math.cos(Math.PI*s*O/a)*Math.cos(Math.PI*l*$/e));h.push(D)}let i=h[0],u=h.slice(1),n="",f=o-1+(r-1)*9;n+=c(f,1);let M;if(u.length>0){let l=Math.max(...u.map(m=>Math.max(...m))),s=Math.floor(Math.max(0,Math.min(82,Math.floor(l*166-.5))));M=(s+1)/166,n+=c(s,1)}else M=1,n+=c(0,1);return n+=c(L(i),4),u.forEach(l=>{n+=c(N(l,M),2)}),n},v=T;var C=k(require("sharp")),A="ImageOptimizerWebpackPlugin",W=async t=>{let a=(0,C.default)(t).raw().ensureAlpha(),{width:e=0,height:o=0}=await a.metadata(),{data:r,info:h}=await a.resize({width:8}).toBuffer({resolveWithObject:!0}),i=new Uint8Array(r.buffer),u=new Uint8ClampedArray(i.buffer),n=v(u,h.width,h.height,4,3);return{width:e,height:o,blurhash:n}},b=class{apply(a){a.hooks.thisCompilation.tap(A,e=>{e.hooks.finishModules.tapPromise(A,async()=>{let o={};for(let r of e.modules)if(r.type==="asset/resource"){let h=r.libIdent({context:a.options.context||""});if(h){let i=await W(h);o[h]=i}}a.options.output.assetModuleFilename=r=>{let{width:h,height:i,blurhash:u}=o[`./${r.filename}`];return`[hash][ext]?width=${h}&height=${i}&blurhash=${u}`}})})}},q=b;
