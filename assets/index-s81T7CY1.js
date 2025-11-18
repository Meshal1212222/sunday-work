function Wk(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in t)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function qk(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var dT={exports:{}},gd={},fT={exports:{}},ye={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fc=Symbol.for("react.element"),Hk=Symbol.for("react.portal"),Gk=Symbol.for("react.fragment"),Kk=Symbol.for("react.strict_mode"),Qk=Symbol.for("react.profiler"),Yk=Symbol.for("react.provider"),Xk=Symbol.for("react.context"),Jk=Symbol.for("react.forward_ref"),Zk=Symbol.for("react.suspense"),eN=Symbol.for("react.memo"),tN=Symbol.for("react.lazy"),kv=Symbol.iterator;function nN(t){return t===null||typeof t!="object"?null:(t=kv&&t[kv]||t["@@iterator"],typeof t=="function"?t:null)}var pT={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},mT=Object.assign,gT={};function ea(t,e,n){this.props=t,this.context=e,this.refs=gT,this.updater=n||pT}ea.prototype.isReactComponent={};ea.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ea.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function yT(){}yT.prototype=ea.prototype;function gg(t,e,n){this.props=t,this.context=e,this.refs=gT,this.updater=n||pT}var yg=gg.prototype=new yT;yg.constructor=gg;mT(yg,ea.prototype);yg.isPureReactComponent=!0;var Nv=Array.isArray,_T=Object.prototype.hasOwnProperty,_g={current:null},vT={key:!0,ref:!0,__self:!0,__source:!0};function wT(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)_T.call(e,r)&&!vT.hasOwnProperty(r)&&(s[r]=e[r]);var a=arguments.length-2;if(a===1)s.children=n;else if(1<a){for(var c=Array(a),h=0;h<a;h++)c[h]=arguments[h+2];s.children=c}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)s[r]===void 0&&(s[r]=a[r]);return{$$typeof:fc,type:t,key:i,ref:o,props:s,_owner:_g.current}}function rN(t,e){return{$$typeof:fc,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function vg(t){return typeof t=="object"&&t!==null&&t.$$typeof===fc}function sN(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Av=/\/+/g;function bf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?sN(""+t.key):e.toString(36)}function Du(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case fc:case Hk:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+bf(o,0):r,Nv(s)?(n="",t!=null&&(n=t.replace(Av,"$&/")+"/"),Du(s,e,n,"",function(h){return h})):s!=null&&(vg(s)&&(s=rN(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Av,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Nv(t))for(var a=0;a<t.length;a++){i=t[a];var c=r+bf(i,a);o+=Du(i,e,n,c,s)}else if(c=nN(t),typeof c=="function")for(t=c.call(t),a=0;!(i=t.next()).done;)i=i.value,c=r+bf(i,a++),o+=Du(i,e,n,c,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ou(t,e,n){if(t==null)return t;var r=[],s=0;return Du(t,r,"","",function(i){return e.call(n,i,s++)}),r}function iN(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var zt={current:null},ju={transition:null},oN={ReactCurrentDispatcher:zt,ReactCurrentBatchConfig:ju,ReactCurrentOwner:_g};function ET(){throw Error("act(...) is not supported in production builds of React.")}ye.Children={map:ou,forEach:function(t,e,n){ou(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ou(t,function(){e++}),e},toArray:function(t){return ou(t,function(e){return e})||[]},only:function(t){if(!vg(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ye.Component=ea;ye.Fragment=Gk;ye.Profiler=Qk;ye.PureComponent=gg;ye.StrictMode=Kk;ye.Suspense=Zk;ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oN;ye.act=ET;ye.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=mT({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=_g.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(c in e)_T.call(e,c)&&!vT.hasOwnProperty(c)&&(r[c]=e[c]===void 0&&a!==void 0?a[c]:e[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var h=0;h<c;h++)a[h]=arguments[h+2];r.children=a}return{$$typeof:fc,type:t.type,key:s,ref:i,props:r,_owner:o}};ye.createContext=function(t){return t={$$typeof:Xk,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Yk,_context:t},t.Consumer=t};ye.createElement=wT;ye.createFactory=function(t){var e=wT.bind(null,t);return e.type=t,e};ye.createRef=function(){return{current:null}};ye.forwardRef=function(t){return{$$typeof:Jk,render:t}};ye.isValidElement=vg;ye.lazy=function(t){return{$$typeof:tN,_payload:{_status:-1,_result:t},_init:iN}};ye.memo=function(t,e){return{$$typeof:eN,type:t,compare:e===void 0?null:e}};ye.startTransition=function(t){var e=ju.transition;ju.transition={};try{t()}finally{ju.transition=e}};ye.unstable_act=ET;ye.useCallback=function(t,e){return zt.current.useCallback(t,e)};ye.useContext=function(t){return zt.current.useContext(t)};ye.useDebugValue=function(){};ye.useDeferredValue=function(t){return zt.current.useDeferredValue(t)};ye.useEffect=function(t,e){return zt.current.useEffect(t,e)};ye.useId=function(){return zt.current.useId()};ye.useImperativeHandle=function(t,e,n){return zt.current.useImperativeHandle(t,e,n)};ye.useInsertionEffect=function(t,e){return zt.current.useInsertionEffect(t,e)};ye.useLayoutEffect=function(t,e){return zt.current.useLayoutEffect(t,e)};ye.useMemo=function(t,e){return zt.current.useMemo(t,e)};ye.useReducer=function(t,e,n){return zt.current.useReducer(t,e,n)};ye.useRef=function(t){return zt.current.useRef(t)};ye.useState=function(t){return zt.current.useState(t)};ye.useSyncExternalStore=function(t,e,n){return zt.current.useSyncExternalStore(t,e,n)};ye.useTransition=function(){return zt.current.useTransition()};ye.version="18.3.1";fT.exports=ye;var b=fT.exports;const rh=qk(b),aN=Wk({__proto__:null,default:rh},[b]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lN=b,cN=Symbol.for("react.element"),uN=Symbol.for("react.fragment"),hN=Object.prototype.hasOwnProperty,dN=lN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fN={key:!0,ref:!0,__self:!0,__source:!0};function TT(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)hN.call(e,r)&&!fN.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:cN,type:t,key:i,ref:o,props:s,_owner:dN.current}}gd.Fragment=uN;gd.jsx=TT;gd.jsxs=TT;dT.exports=gd;var u=dT.exports,Ap={},xT={exports:{}},hn={},IT={exports:{}},CT={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(Q,ne){var ue=Q.length;Q.push(ne);e:for(;0<ue;){var Te=ue-1>>>1,Le=Q[Te];if(0<s(Le,ne))Q[Te]=ne,Q[ue]=Le,ue=Te;else break e}}function n(Q){return Q.length===0?null:Q[0]}function r(Q){if(Q.length===0)return null;var ne=Q[0],ue=Q.pop();if(ue!==ne){Q[0]=ue;e:for(var Te=0,Le=Q.length,Fn=Le>>>1;Te<Fn;){var $t=2*(Te+1)-1,Un=Q[$t],en=$t+1,fn=Q[en];if(0>s(Un,ue))en<Le&&0>s(fn,Un)?(Q[Te]=fn,Q[en]=ue,Te=en):(Q[Te]=Un,Q[$t]=ue,Te=$t);else if(en<Le&&0>s(fn,ue))Q[Te]=fn,Q[en]=ue,Te=en;else break e}}return ne}function s(Q,ne){var ue=Q.sortIndex-ne.sortIndex;return ue!==0?ue:Q.id-ne.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var c=[],h=[],d=1,p=null,m=3,w=!1,N=!1,R=!1,D=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function E(Q){for(var ne=n(h);ne!==null;){if(ne.callback===null)r(h);else if(ne.startTime<=Q)r(h),ne.sortIndex=ne.expirationTime,e(c,ne);else break;ne=n(h)}}function j(Q){if(R=!1,E(Q),!N)if(n(c)!==null)N=!0,Vn(z);else{var ne=n(h);ne!==null&&Wr(j,ne.startTime-Q)}}function z(Q,ne){N=!1,R&&(R=!1,x(v),v=-1),w=!0;var ue=m;try{for(E(ne),p=n(c);p!==null&&(!(p.expirationTime>ne)||Q&&!A());){var Te=p.callback;if(typeof Te=="function"){p.callback=null,m=p.priorityLevel;var Le=Te(p.expirationTime<=ne);ne=t.unstable_now(),typeof Le=="function"?p.callback=Le:p===n(c)&&r(c),E(ne)}else r(c);p=n(c)}if(p!==null)var Fn=!0;else{var $t=n(h);$t!==null&&Wr(j,$t.startTime-ne),Fn=!1}return Fn}finally{p=null,m=ue,w=!1}}var W=!1,T=null,v=-1,I=5,C=-1;function A(){return!(t.unstable_now()-C<I)}function P(){if(T!==null){var Q=t.unstable_now();C=Q;var ne=!0;try{ne=T(!0,Q)}finally{ne?S():(W=!1,T=null)}}else W=!1}var S;if(typeof _=="function")S=function(){_(P)};else if(typeof MessageChannel<"u"){var Ge=new MessageChannel,Ct=Ge.port2;Ge.port1.onmessage=P,S=function(){Ct.postMessage(null)}}else S=function(){D(P,0)};function Vn(Q){T=Q,W||(W=!0,S())}function Wr(Q,ne){v=D(function(){Q(t.unstable_now())},ne)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(Q){Q.callback=null},t.unstable_continueExecution=function(){N||w||(N=!0,Vn(z))},t.unstable_forceFrameRate=function(Q){0>Q||125<Q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<Q?Math.floor(1e3/Q):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(Q){switch(m){case 1:case 2:case 3:var ne=3;break;default:ne=m}var ue=m;m=ne;try{return Q()}finally{m=ue}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(Q,ne){switch(Q){case 1:case 2:case 3:case 4:case 5:break;default:Q=3}var ue=m;m=Q;try{return ne()}finally{m=ue}},t.unstable_scheduleCallback=function(Q,ne,ue){var Te=t.unstable_now();switch(typeof ue=="object"&&ue!==null?(ue=ue.delay,ue=typeof ue=="number"&&0<ue?Te+ue:Te):ue=Te,Q){case 1:var Le=-1;break;case 2:Le=250;break;case 5:Le=1073741823;break;case 4:Le=1e4;break;default:Le=5e3}return Le=ue+Le,Q={id:d++,callback:ne,priorityLevel:Q,startTime:ue,expirationTime:Le,sortIndex:-1},ue>Te?(Q.sortIndex=ue,e(h,Q),n(c)===null&&Q===n(h)&&(R?(x(v),v=-1):R=!0,Wr(j,ue-Te))):(Q.sortIndex=Le,e(c,Q),N||w||(N=!0,Vn(z))),Q},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(Q){var ne=m;return function(){var ue=m;m=ne;try{return Q.apply(this,arguments)}finally{m=ue}}}})(CT);IT.exports=CT;var pN=IT.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mN=b,un=pN;function H(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ST=new Set,Al={};function Li(t,e){Do(t,e),Do(t+"Capture",e)}function Do(t,e){for(Al[t]=e,t=0;t<e.length;t++)ST.add(e[t])}var Nr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Rp=Object.prototype.hasOwnProperty,gN=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Rv={},Pv={};function yN(t){return Rp.call(Pv,t)?!0:Rp.call(Rv,t)?!1:gN.test(t)?Pv[t]=!0:(Rv[t]=!0,!1)}function _N(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function vN(t,e,n,r){if(e===null||typeof e>"u"||_N(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Bt(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){xt[t]=new Bt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];xt[e]=new Bt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){xt[t]=new Bt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){xt[t]=new Bt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){xt[t]=new Bt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){xt[t]=new Bt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){xt[t]=new Bt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){xt[t]=new Bt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){xt[t]=new Bt(t,5,!1,t.toLowerCase(),null,!1,!1)});var wg=/[\-:]([a-z])/g;function Eg(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(wg,Eg);xt[e]=new Bt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(wg,Eg);xt[e]=new Bt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(wg,Eg);xt[e]=new Bt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){xt[t]=new Bt(t,1,!1,t.toLowerCase(),null,!1,!1)});xt.xlinkHref=new Bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){xt[t]=new Bt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Tg(t,e,n,r){var s=xt.hasOwnProperty(e)?xt[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(vN(e,n,s,r)&&(n=null),r||s===null?yN(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Fr=mN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,au=Symbol.for("react.element"),io=Symbol.for("react.portal"),oo=Symbol.for("react.fragment"),xg=Symbol.for("react.strict_mode"),Pp=Symbol.for("react.profiler"),kT=Symbol.for("react.provider"),NT=Symbol.for("react.context"),Ig=Symbol.for("react.forward_ref"),bp=Symbol.for("react.suspense"),Dp=Symbol.for("react.suspense_list"),Cg=Symbol.for("react.memo"),ss=Symbol.for("react.lazy"),AT=Symbol.for("react.offscreen"),bv=Symbol.iterator;function Va(t){return t===null||typeof t!="object"?null:(t=bv&&t[bv]||t["@@iterator"],typeof t=="function"?t:null)}var $e=Object.assign,Df;function Ya(t){if(Df===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Df=e&&e[1]||""}return`
`+Df+t}var jf=!1;function Mf(t,e){if(!t||jf)return"";jf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,a=i.length-1;1<=o&&0<=a&&s[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(s[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||s[o]!==i[a]){var c=`
`+s[o].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=o&&0<=a);break}}}finally{jf=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ya(t):""}function wN(t){switch(t.tag){case 5:return Ya(t.type);case 16:return Ya("Lazy");case 13:return Ya("Suspense");case 19:return Ya("SuspenseList");case 0:case 2:case 15:return t=Mf(t.type,!1),t;case 11:return t=Mf(t.type.render,!1),t;case 1:return t=Mf(t.type,!0),t;default:return""}}function jp(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case oo:return"Fragment";case io:return"Portal";case Pp:return"Profiler";case xg:return"StrictMode";case bp:return"Suspense";case Dp:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case NT:return(t.displayName||"Context")+".Consumer";case kT:return(t._context.displayName||"Context")+".Provider";case Ig:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Cg:return e=t.displayName||null,e!==null?e:jp(t.type)||"Memo";case ss:e=t._payload,t=t._init;try{return jp(t(e))}catch{}}return null}function EN(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jp(e);case 8:return e===xg?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ps(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function RT(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function TN(t){var e=RT(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function lu(t){t._valueTracker||(t._valueTracker=TN(t))}function PT(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=RT(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function sh(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Mp(t,e){var n=e.checked;return $e({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Dv(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Ps(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function bT(t,e){e=e.checked,e!=null&&Tg(t,"checked",e,!1)}function Op(t,e){bT(t,e);var n=Ps(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Lp(t,e.type,n):e.hasOwnProperty("defaultValue")&&Lp(t,e.type,Ps(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function jv(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Lp(t,e,n){(e!=="number"||sh(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Xa=Array.isArray;function wo(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Ps(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Vp(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(H(91));return $e({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Mv(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(H(92));if(Xa(n)){if(1<n.length)throw Error(H(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ps(n)}}function DT(t,e){var n=Ps(e.value),r=Ps(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Ov(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function jT(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fp(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?jT(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var cu,MT=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(cu=cu||document.createElement("div"),cu.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=cu.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Rl(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ll={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xN=["Webkit","ms","Moz","O"];Object.keys(ll).forEach(function(t){xN.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ll[e]=ll[t]})});function OT(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ll.hasOwnProperty(t)&&ll[t]?(""+e).trim():e+"px"}function LT(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=OT(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var IN=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Up(t,e){if(e){if(IN[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(H(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(H(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(H(61))}if(e.style!=null&&typeof e.style!="object")throw Error(H(62))}}function zp(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bp=null;function Sg(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var $p=null,Eo=null,To=null;function Lv(t){if(t=gc(t)){if(typeof $p!="function")throw Error(H(280));var e=t.stateNode;e&&(e=Ed(e),$p(t.stateNode,t.type,e))}}function VT(t){Eo?To?To.push(t):To=[t]:Eo=t}function FT(){if(Eo){var t=Eo,e=To;if(To=Eo=null,Lv(t),e)for(t=0;t<e.length;t++)Lv(e[t])}}function UT(t,e){return t(e)}function zT(){}var Of=!1;function BT(t,e,n){if(Of)return t(e,n);Of=!0;try{return UT(t,e,n)}finally{Of=!1,(Eo!==null||To!==null)&&(zT(),FT())}}function Pl(t,e){var n=t.stateNode;if(n===null)return null;var r=Ed(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(H(231,e,typeof n));return n}var Wp=!1;if(Nr)try{var Fa={};Object.defineProperty(Fa,"passive",{get:function(){Wp=!0}}),window.addEventListener("test",Fa,Fa),window.removeEventListener("test",Fa,Fa)}catch{Wp=!1}function CN(t,e,n,r,s,i,o,a,c){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(d){this.onError(d)}}var cl=!1,ih=null,oh=!1,qp=null,SN={onError:function(t){cl=!0,ih=t}};function kN(t,e,n,r,s,i,o,a,c){cl=!1,ih=null,CN.apply(SN,arguments)}function NN(t,e,n,r,s,i,o,a,c){if(kN.apply(this,arguments),cl){if(cl){var h=ih;cl=!1,ih=null}else throw Error(H(198));oh||(oh=!0,qp=h)}}function Vi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function $T(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Vv(t){if(Vi(t)!==t)throw Error(H(188))}function AN(t){var e=t.alternate;if(!e){if(e=Vi(t),e===null)throw Error(H(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Vv(s),t;if(i===r)return Vv(s),e;i=i.sibling}throw Error(H(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o)throw Error(H(189))}}if(n.alternate!==r)throw Error(H(190))}if(n.tag!==3)throw Error(H(188));return n.stateNode.current===n?t:e}function WT(t){return t=AN(t),t!==null?qT(t):null}function qT(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=qT(t);if(e!==null)return e;t=t.sibling}return null}var HT=un.unstable_scheduleCallback,Fv=un.unstable_cancelCallback,RN=un.unstable_shouldYield,PN=un.unstable_requestPaint,Ye=un.unstable_now,bN=un.unstable_getCurrentPriorityLevel,kg=un.unstable_ImmediatePriority,GT=un.unstable_UserBlockingPriority,ah=un.unstable_NormalPriority,DN=un.unstable_LowPriority,KT=un.unstable_IdlePriority,yd=null,Qn=null;function jN(t){if(Qn&&typeof Qn.onCommitFiberRoot=="function")try{Qn.onCommitFiberRoot(yd,t,void 0,(t.current.flags&128)===128)}catch{}}var Pn=Math.clz32?Math.clz32:LN,MN=Math.log,ON=Math.LN2;function LN(t){return t>>>=0,t===0?32:31-(MN(t)/ON|0)|0}var uu=64,hu=4194304;function Ja(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function lh(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~s;a!==0?r=Ja(a):(i&=o,i!==0&&(r=Ja(i)))}else o=n&~s,o!==0?r=Ja(o):i!==0&&(r=Ja(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Pn(e),s=1<<n,r|=t[n],e&=~s;return r}function VN(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function FN(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Pn(i),a=1<<o,c=s[o];c===-1?(!(a&n)||a&r)&&(s[o]=VN(a,e)):c<=e&&(t.expiredLanes|=a),i&=~a}}function Hp(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function QT(){var t=uu;return uu<<=1,!(uu&4194240)&&(uu=64),t}function Lf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function pc(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Pn(e),t[e]=n}function UN(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Pn(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Ng(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Pn(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var Se=0;function YT(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var XT,Ag,JT,ZT,e1,Gp=!1,du=[],gs=null,ys=null,_s=null,bl=new Map,Dl=new Map,os=[],zN="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Uv(t,e){switch(t){case"focusin":case"focusout":gs=null;break;case"dragenter":case"dragleave":ys=null;break;case"mouseover":case"mouseout":_s=null;break;case"pointerover":case"pointerout":bl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dl.delete(e.pointerId)}}function Ua(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=gc(e),e!==null&&Ag(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function BN(t,e,n,r,s){switch(e){case"focusin":return gs=Ua(gs,t,e,n,r,s),!0;case"dragenter":return ys=Ua(ys,t,e,n,r,s),!0;case"mouseover":return _s=Ua(_s,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return bl.set(i,Ua(bl.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Dl.set(i,Ua(Dl.get(i)||null,t,e,n,r,s)),!0}return!1}function t1(t){var e=hi(t.target);if(e!==null){var n=Vi(e);if(n!==null){if(e=n.tag,e===13){if(e=$T(n),e!==null){t.blockedOn=e,e1(t.priority,function(){JT(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Mu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Kp(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Bp=r,n.target.dispatchEvent(r),Bp=null}else return e=gc(n),e!==null&&Ag(e),t.blockedOn=n,!1;e.shift()}return!0}function zv(t,e,n){Mu(t)&&n.delete(e)}function $N(){Gp=!1,gs!==null&&Mu(gs)&&(gs=null),ys!==null&&Mu(ys)&&(ys=null),_s!==null&&Mu(_s)&&(_s=null),bl.forEach(zv),Dl.forEach(zv)}function za(t,e){t.blockedOn===e&&(t.blockedOn=null,Gp||(Gp=!0,un.unstable_scheduleCallback(un.unstable_NormalPriority,$N)))}function jl(t){function e(s){return za(s,t)}if(0<du.length){za(du[0],t);for(var n=1;n<du.length;n++){var r=du[n];r.blockedOn===t&&(r.blockedOn=null)}}for(gs!==null&&za(gs,t),ys!==null&&za(ys,t),_s!==null&&za(_s,t),bl.forEach(e),Dl.forEach(e),n=0;n<os.length;n++)r=os[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<os.length&&(n=os[0],n.blockedOn===null);)t1(n),n.blockedOn===null&&os.shift()}var xo=Fr.ReactCurrentBatchConfig,ch=!0;function WN(t,e,n,r){var s=Se,i=xo.transition;xo.transition=null;try{Se=1,Rg(t,e,n,r)}finally{Se=s,xo.transition=i}}function qN(t,e,n,r){var s=Se,i=xo.transition;xo.transition=null;try{Se=4,Rg(t,e,n,r)}finally{Se=s,xo.transition=i}}function Rg(t,e,n,r){if(ch){var s=Kp(t,e,n,r);if(s===null)Gf(t,e,r,uh,n),Uv(t,r);else if(BN(s,t,e,n,r))r.stopPropagation();else if(Uv(t,r),e&4&&-1<zN.indexOf(t)){for(;s!==null;){var i=gc(s);if(i!==null&&XT(i),i=Kp(t,e,n,r),i===null&&Gf(t,e,r,uh,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Gf(t,e,r,null,n)}}var uh=null;function Kp(t,e,n,r){if(uh=null,t=Sg(r),t=hi(t),t!==null)if(e=Vi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=$T(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return uh=t,null}function n1(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(bN()){case kg:return 1;case GT:return 4;case ah:case DN:return 16;case KT:return 536870912;default:return 16}default:return 16}}var ds=null,Pg=null,Ou=null;function r1(){if(Ou)return Ou;var t,e=Pg,n=e.length,r,s="value"in ds?ds.value:ds.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Ou=s.slice(t,1<r?1-r:void 0)}function Lu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function fu(){return!0}function Bv(){return!1}function dn(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?fu:Bv,this.isPropagationStopped=Bv,this}return $e(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fu)},persist:function(){},isPersistent:fu}),e}var ta={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bg=dn(ta),mc=$e({},ta,{view:0,detail:0}),HN=dn(mc),Vf,Ff,Ba,_d=$e({},mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Dg,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ba&&(Ba&&t.type==="mousemove"?(Vf=t.screenX-Ba.screenX,Ff=t.screenY-Ba.screenY):Ff=Vf=0,Ba=t),Vf)},movementY:function(t){return"movementY"in t?t.movementY:Ff}}),$v=dn(_d),GN=$e({},_d,{dataTransfer:0}),KN=dn(GN),QN=$e({},mc,{relatedTarget:0}),Uf=dn(QN),YN=$e({},ta,{animationName:0,elapsedTime:0,pseudoElement:0}),XN=dn(YN),JN=$e({},ta,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ZN=dn(JN),eA=$e({},ta,{data:0}),Wv=dn(eA),tA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},nA={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rA={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sA(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=rA[t])?!!e[t]:!1}function Dg(){return sA}var iA=$e({},mc,{key:function(t){if(t.key){var e=tA[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Lu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?nA[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Dg,charCode:function(t){return t.type==="keypress"?Lu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Lu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),oA=dn(iA),aA=$e({},_d,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qv=dn(aA),lA=$e({},mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Dg}),cA=dn(lA),uA=$e({},ta,{propertyName:0,elapsedTime:0,pseudoElement:0}),hA=dn(uA),dA=$e({},_d,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),fA=dn(dA),pA=[9,13,27,32],jg=Nr&&"CompositionEvent"in window,ul=null;Nr&&"documentMode"in document&&(ul=document.documentMode);var mA=Nr&&"TextEvent"in window&&!ul,s1=Nr&&(!jg||ul&&8<ul&&11>=ul),Hv=" ",Gv=!1;function i1(t,e){switch(t){case"keyup":return pA.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function o1(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ao=!1;function gA(t,e){switch(t){case"compositionend":return o1(e);case"keypress":return e.which!==32?null:(Gv=!0,Hv);case"textInput":return t=e.data,t===Hv&&Gv?null:t;default:return null}}function yA(t,e){if(ao)return t==="compositionend"||!jg&&i1(t,e)?(t=r1(),Ou=Pg=ds=null,ao=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return s1&&e.locale!=="ko"?null:e.data;default:return null}}var _A={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Kv(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!_A[t.type]:e==="textarea"}function a1(t,e,n,r){VT(r),e=hh(e,"onChange"),0<e.length&&(n=new bg("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var hl=null,Ml=null;function vA(t){_1(t,0)}function vd(t){var e=uo(t);if(PT(e))return t}function wA(t,e){if(t==="change")return e}var l1=!1;if(Nr){var zf;if(Nr){var Bf="oninput"in document;if(!Bf){var Qv=document.createElement("div");Qv.setAttribute("oninput","return;"),Bf=typeof Qv.oninput=="function"}zf=Bf}else zf=!1;l1=zf&&(!document.documentMode||9<document.documentMode)}function Yv(){hl&&(hl.detachEvent("onpropertychange",c1),Ml=hl=null)}function c1(t){if(t.propertyName==="value"&&vd(Ml)){var e=[];a1(e,Ml,t,Sg(t)),BT(vA,e)}}function EA(t,e,n){t==="focusin"?(Yv(),hl=e,Ml=n,hl.attachEvent("onpropertychange",c1)):t==="focusout"&&Yv()}function TA(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return vd(Ml)}function xA(t,e){if(t==="click")return vd(e)}function IA(t,e){if(t==="input"||t==="change")return vd(e)}function CA(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Mn=typeof Object.is=="function"?Object.is:CA;function Ol(t,e){if(Mn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Rp.call(e,s)||!Mn(t[s],e[s]))return!1}return!0}function Xv(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Jv(t,e){var n=Xv(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Xv(n)}}function u1(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?u1(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function h1(){for(var t=window,e=sh();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=sh(t.document)}return e}function Mg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function SA(t){var e=h1(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&u1(n.ownerDocument.documentElement,n)){if(r!==null&&Mg(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Jv(n,i);var o=Jv(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var kA=Nr&&"documentMode"in document&&11>=document.documentMode,lo=null,Qp=null,dl=null,Yp=!1;function Zv(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Yp||lo==null||lo!==sh(r)||(r=lo,"selectionStart"in r&&Mg(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),dl&&Ol(dl,r)||(dl=r,r=hh(Qp,"onSelect"),0<r.length&&(e=new bg("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=lo)))}function pu(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var co={animationend:pu("Animation","AnimationEnd"),animationiteration:pu("Animation","AnimationIteration"),animationstart:pu("Animation","AnimationStart"),transitionend:pu("Transition","TransitionEnd")},$f={},d1={};Nr&&(d1=document.createElement("div").style,"AnimationEvent"in window||(delete co.animationend.animation,delete co.animationiteration.animation,delete co.animationstart.animation),"TransitionEvent"in window||delete co.transitionend.transition);function wd(t){if($f[t])return $f[t];if(!co[t])return t;var e=co[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in d1)return $f[t]=e[n];return t}var f1=wd("animationend"),p1=wd("animationiteration"),m1=wd("animationstart"),g1=wd("transitionend"),y1=new Map,ew="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ws(t,e){y1.set(t,e),Li(e,[t])}for(var Wf=0;Wf<ew.length;Wf++){var qf=ew[Wf],NA=qf.toLowerCase(),AA=qf[0].toUpperCase()+qf.slice(1);Ws(NA,"on"+AA)}Ws(f1,"onAnimationEnd");Ws(p1,"onAnimationIteration");Ws(m1,"onAnimationStart");Ws("dblclick","onDoubleClick");Ws("focusin","onFocus");Ws("focusout","onBlur");Ws(g1,"onTransitionEnd");Do("onMouseEnter",["mouseout","mouseover"]);Do("onMouseLeave",["mouseout","mouseover"]);Do("onPointerEnter",["pointerout","pointerover"]);Do("onPointerLeave",["pointerout","pointerover"]);Li("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Li("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Li("onBeforeInput",["compositionend","keypress","textInput","paste"]);Li("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Li("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Li("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Za="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),RA=new Set("cancel close invalid load scroll toggle".split(" ").concat(Za));function tw(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,NN(r,e,void 0,t),t.currentTarget=null}function _1(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],c=a.instance,h=a.currentTarget;if(a=a.listener,c!==i&&s.isPropagationStopped())break e;tw(s,a,h),i=c}else for(o=0;o<r.length;o++){if(a=r[o],c=a.instance,h=a.currentTarget,a=a.listener,c!==i&&s.isPropagationStopped())break e;tw(s,a,h),i=c}}}if(oh)throw t=qp,oh=!1,qp=null,t}function De(t,e){var n=e[tm];n===void 0&&(n=e[tm]=new Set);var r=t+"__bubble";n.has(r)||(v1(e,t,2,!1),n.add(r))}function Hf(t,e,n){var r=0;e&&(r|=4),v1(n,t,r,e)}var mu="_reactListening"+Math.random().toString(36).slice(2);function Ll(t){if(!t[mu]){t[mu]=!0,ST.forEach(function(n){n!=="selectionchange"&&(RA.has(n)||Hf(n,!1,t),Hf(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[mu]||(e[mu]=!0,Hf("selectionchange",!1,e))}}function v1(t,e,n,r){switch(n1(e)){case 1:var s=WN;break;case 4:s=qN;break;default:s=Rg}n=s.bind(null,e,n,t),s=void 0,!Wp||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Gf(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===s||a.nodeType===8&&a.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;a!==null;){if(o=hi(a),o===null)return;if(c=o.tag,c===5||c===6){r=i=o;continue e}a=a.parentNode}}r=r.return}BT(function(){var h=i,d=Sg(n),p=[];e:{var m=y1.get(t);if(m!==void 0){var w=bg,N=t;switch(t){case"keypress":if(Lu(n)===0)break e;case"keydown":case"keyup":w=oA;break;case"focusin":N="focus",w=Uf;break;case"focusout":N="blur",w=Uf;break;case"beforeblur":case"afterblur":w=Uf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=$v;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=KN;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=cA;break;case f1:case p1:case m1:w=XN;break;case g1:w=hA;break;case"scroll":w=HN;break;case"wheel":w=fA;break;case"copy":case"cut":case"paste":w=ZN;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=qv}var R=(e&4)!==0,D=!R&&t==="scroll",x=R?m!==null?m+"Capture":null:m;R=[];for(var _=h,E;_!==null;){E=_;var j=E.stateNode;if(E.tag===5&&j!==null&&(E=j,x!==null&&(j=Pl(_,x),j!=null&&R.push(Vl(_,j,E)))),D)break;_=_.return}0<R.length&&(m=new w(m,N,null,n,d),p.push({event:m,listeners:R}))}}if(!(e&7)){e:{if(m=t==="mouseover"||t==="pointerover",w=t==="mouseout"||t==="pointerout",m&&n!==Bp&&(N=n.relatedTarget||n.fromElement)&&(hi(N)||N[Ar]))break e;if((w||m)&&(m=d.window===d?d:(m=d.ownerDocument)?m.defaultView||m.parentWindow:window,w?(N=n.relatedTarget||n.toElement,w=h,N=N?hi(N):null,N!==null&&(D=Vi(N),N!==D||N.tag!==5&&N.tag!==6)&&(N=null)):(w=null,N=h),w!==N)){if(R=$v,j="onMouseLeave",x="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(R=qv,j="onPointerLeave",x="onPointerEnter",_="pointer"),D=w==null?m:uo(w),E=N==null?m:uo(N),m=new R(j,_+"leave",w,n,d),m.target=D,m.relatedTarget=E,j=null,hi(d)===h&&(R=new R(x,_+"enter",N,n,d),R.target=E,R.relatedTarget=D,j=R),D=j,w&&N)t:{for(R=w,x=N,_=0,E=R;E;E=Zi(E))_++;for(E=0,j=x;j;j=Zi(j))E++;for(;0<_-E;)R=Zi(R),_--;for(;0<E-_;)x=Zi(x),E--;for(;_--;){if(R===x||x!==null&&R===x.alternate)break t;R=Zi(R),x=Zi(x)}R=null}else R=null;w!==null&&nw(p,m,w,R,!1),N!==null&&D!==null&&nw(p,D,N,R,!0)}}e:{if(m=h?uo(h):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var z=wA;else if(Kv(m))if(l1)z=IA;else{z=TA;var W=EA}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(z=xA);if(z&&(z=z(t,h))){a1(p,z,n,d);break e}W&&W(t,m,h),t==="focusout"&&(W=m._wrapperState)&&W.controlled&&m.type==="number"&&Lp(m,"number",m.value)}switch(W=h?uo(h):window,t){case"focusin":(Kv(W)||W.contentEditable==="true")&&(lo=W,Qp=h,dl=null);break;case"focusout":dl=Qp=lo=null;break;case"mousedown":Yp=!0;break;case"contextmenu":case"mouseup":case"dragend":Yp=!1,Zv(p,n,d);break;case"selectionchange":if(kA)break;case"keydown":case"keyup":Zv(p,n,d)}var T;if(jg)e:{switch(t){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else ao?i1(t,n)&&(v="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(v="onCompositionStart");v&&(s1&&n.locale!=="ko"&&(ao||v!=="onCompositionStart"?v==="onCompositionEnd"&&ao&&(T=r1()):(ds=d,Pg="value"in ds?ds.value:ds.textContent,ao=!0)),W=hh(h,v),0<W.length&&(v=new Wv(v,t,null,n,d),p.push({event:v,listeners:W}),T?v.data=T:(T=o1(n),T!==null&&(v.data=T)))),(T=mA?gA(t,n):yA(t,n))&&(h=hh(h,"onBeforeInput"),0<h.length&&(d=new Wv("onBeforeInput","beforeinput",null,n,d),p.push({event:d,listeners:h}),d.data=T))}_1(p,e)})}function Vl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function hh(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Pl(t,n),i!=null&&r.unshift(Vl(t,i,s)),i=Pl(t,e),i!=null&&r.push(Vl(t,i,s))),t=t.return}return r}function Zi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function nw(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var a=n,c=a.alternate,h=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&h!==null&&(a=h,s?(c=Pl(n,i),c!=null&&o.unshift(Vl(n,c,a))):s||(c=Pl(n,i),c!=null&&o.push(Vl(n,c,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var PA=/\r\n?/g,bA=/\u0000|\uFFFD/g;function rw(t){return(typeof t=="string"?t:""+t).replace(PA,`
`).replace(bA,"")}function gu(t,e,n){if(e=rw(e),rw(t)!==e&&n)throw Error(H(425))}function dh(){}var Xp=null,Jp=null;function Zp(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var em=typeof setTimeout=="function"?setTimeout:void 0,DA=typeof clearTimeout=="function"?clearTimeout:void 0,sw=typeof Promise=="function"?Promise:void 0,jA=typeof queueMicrotask=="function"?queueMicrotask:typeof sw<"u"?function(t){return sw.resolve(null).then(t).catch(MA)}:em;function MA(t){setTimeout(function(){throw t})}function Kf(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),jl(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);jl(e)}function vs(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function iw(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var na=Math.random().toString(36).slice(2),Gn="__reactFiber$"+na,Fl="__reactProps$"+na,Ar="__reactContainer$"+na,tm="__reactEvents$"+na,OA="__reactListeners$"+na,LA="__reactHandles$"+na;function hi(t){var e=t[Gn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ar]||n[Gn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=iw(t);t!==null;){if(n=t[Gn])return n;t=iw(t)}return e}t=n,n=t.parentNode}return null}function gc(t){return t=t[Gn]||t[Ar],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function uo(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(H(33))}function Ed(t){return t[Fl]||null}var nm=[],ho=-1;function qs(t){return{current:t}}function Oe(t){0>ho||(t.current=nm[ho],nm[ho]=null,ho--)}function Pe(t,e){ho++,nm[ho]=t.current,t.current=e}var bs={},Dt=qs(bs),Yt=qs(!1),xi=bs;function jo(t,e){var n=t.type.contextTypes;if(!n)return bs;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function Xt(t){return t=t.childContextTypes,t!=null}function fh(){Oe(Yt),Oe(Dt)}function ow(t,e,n){if(Dt.current!==bs)throw Error(H(168));Pe(Dt,e),Pe(Yt,n)}function w1(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(H(108,EN(t)||"Unknown",s));return $e({},n,r)}function ph(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||bs,xi=Dt.current,Pe(Dt,t),Pe(Yt,Yt.current),!0}function aw(t,e,n){var r=t.stateNode;if(!r)throw Error(H(169));n?(t=w1(t,e,xi),r.__reactInternalMemoizedMergedChildContext=t,Oe(Yt),Oe(Dt),Pe(Dt,t)):Oe(Yt),Pe(Yt,n)}var gr=null,Td=!1,Qf=!1;function E1(t){gr===null?gr=[t]:gr.push(t)}function VA(t){Td=!0,E1(t)}function Hs(){if(!Qf&&gr!==null){Qf=!0;var t=0,e=Se;try{var n=gr;for(Se=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}gr=null,Td=!1}catch(s){throw gr!==null&&(gr=gr.slice(t+1)),HT(kg,Hs),s}finally{Se=e,Qf=!1}}return null}var fo=[],po=0,mh=null,gh=0,pn=[],mn=0,Ii=null,_r=1,vr="";function ai(t,e){fo[po++]=gh,fo[po++]=mh,mh=t,gh=e}function T1(t,e,n){pn[mn++]=_r,pn[mn++]=vr,pn[mn++]=Ii,Ii=t;var r=_r;t=vr;var s=32-Pn(r)-1;r&=~(1<<s),n+=1;var i=32-Pn(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,_r=1<<32-Pn(e)+s|n<<s|r,vr=i+t}else _r=1<<i|n<<s|r,vr=t}function Og(t){t.return!==null&&(ai(t,1),T1(t,1,0))}function Lg(t){for(;t===mh;)mh=fo[--po],fo[po]=null,gh=fo[--po],fo[po]=null;for(;t===Ii;)Ii=pn[--mn],pn[mn]=null,vr=pn[--mn],pn[mn]=null,_r=pn[--mn],pn[mn]=null}var ln=null,on=null,Ve=!1,kn=null;function x1(t,e){var n=yn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function lw(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,ln=t,on=vs(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,ln=t,on=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ii!==null?{id:_r,overflow:vr}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=yn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,ln=t,on=null,!0):!1;default:return!1}}function rm(t){return(t.mode&1)!==0&&(t.flags&128)===0}function sm(t){if(Ve){var e=on;if(e){var n=e;if(!lw(t,e)){if(rm(t))throw Error(H(418));e=vs(n.nextSibling);var r=ln;e&&lw(t,e)?x1(r,n):(t.flags=t.flags&-4097|2,Ve=!1,ln=t)}}else{if(rm(t))throw Error(H(418));t.flags=t.flags&-4097|2,Ve=!1,ln=t}}}function cw(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;ln=t}function yu(t){if(t!==ln)return!1;if(!Ve)return cw(t),Ve=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Zp(t.type,t.memoizedProps)),e&&(e=on)){if(rm(t))throw I1(),Error(H(418));for(;e;)x1(t,e),e=vs(e.nextSibling)}if(cw(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(H(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){on=vs(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}on=null}}else on=ln?vs(t.stateNode.nextSibling):null;return!0}function I1(){for(var t=on;t;)t=vs(t.nextSibling)}function Mo(){on=ln=null,Ve=!1}function Vg(t){kn===null?kn=[t]:kn.push(t)}var FA=Fr.ReactCurrentBatchConfig;function $a(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(H(309));var r=n.stateNode}if(!r)throw Error(H(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var a=s.refs;o===null?delete a[i]:a[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(H(284));if(!n._owner)throw Error(H(290,t))}return t}function _u(t,e){throw t=Object.prototype.toString.call(e),Error(H(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function uw(t){var e=t._init;return e(t._payload)}function C1(t){function e(x,_){if(t){var E=x.deletions;E===null?(x.deletions=[_],x.flags|=16):E.push(_)}}function n(x,_){if(!t)return null;for(;_!==null;)e(x,_),_=_.sibling;return null}function r(x,_){for(x=new Map;_!==null;)_.key!==null?x.set(_.key,_):x.set(_.index,_),_=_.sibling;return x}function s(x,_){return x=xs(x,_),x.index=0,x.sibling=null,x}function i(x,_,E){return x.index=E,t?(E=x.alternate,E!==null?(E=E.index,E<_?(x.flags|=2,_):E):(x.flags|=2,_)):(x.flags|=1048576,_)}function o(x){return t&&x.alternate===null&&(x.flags|=2),x}function a(x,_,E,j){return _===null||_.tag!==6?(_=np(E,x.mode,j),_.return=x,_):(_=s(_,E),_.return=x,_)}function c(x,_,E,j){var z=E.type;return z===oo?d(x,_,E.props.children,j,E.key):_!==null&&(_.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===ss&&uw(z)===_.type)?(j=s(_,E.props),j.ref=$a(x,_,E),j.return=x,j):(j=Wu(E.type,E.key,E.props,null,x.mode,j),j.ref=$a(x,_,E),j.return=x,j)}function h(x,_,E,j){return _===null||_.tag!==4||_.stateNode.containerInfo!==E.containerInfo||_.stateNode.implementation!==E.implementation?(_=rp(E,x.mode,j),_.return=x,_):(_=s(_,E.children||[]),_.return=x,_)}function d(x,_,E,j,z){return _===null||_.tag!==7?(_=_i(E,x.mode,j,z),_.return=x,_):(_=s(_,E),_.return=x,_)}function p(x,_,E){if(typeof _=="string"&&_!==""||typeof _=="number")return _=np(""+_,x.mode,E),_.return=x,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case au:return E=Wu(_.type,_.key,_.props,null,x.mode,E),E.ref=$a(x,null,_),E.return=x,E;case io:return _=rp(_,x.mode,E),_.return=x,_;case ss:var j=_._init;return p(x,j(_._payload),E)}if(Xa(_)||Va(_))return _=_i(_,x.mode,E,null),_.return=x,_;_u(x,_)}return null}function m(x,_,E,j){var z=_!==null?_.key:null;if(typeof E=="string"&&E!==""||typeof E=="number")return z!==null?null:a(x,_,""+E,j);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case au:return E.key===z?c(x,_,E,j):null;case io:return E.key===z?h(x,_,E,j):null;case ss:return z=E._init,m(x,_,z(E._payload),j)}if(Xa(E)||Va(E))return z!==null?null:d(x,_,E,j,null);_u(x,E)}return null}function w(x,_,E,j,z){if(typeof j=="string"&&j!==""||typeof j=="number")return x=x.get(E)||null,a(_,x,""+j,z);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case au:return x=x.get(j.key===null?E:j.key)||null,c(_,x,j,z);case io:return x=x.get(j.key===null?E:j.key)||null,h(_,x,j,z);case ss:var W=j._init;return w(x,_,E,W(j._payload),z)}if(Xa(j)||Va(j))return x=x.get(E)||null,d(_,x,j,z,null);_u(_,j)}return null}function N(x,_,E,j){for(var z=null,W=null,T=_,v=_=0,I=null;T!==null&&v<E.length;v++){T.index>v?(I=T,T=null):I=T.sibling;var C=m(x,T,E[v],j);if(C===null){T===null&&(T=I);break}t&&T&&C.alternate===null&&e(x,T),_=i(C,_,v),W===null?z=C:W.sibling=C,W=C,T=I}if(v===E.length)return n(x,T),Ve&&ai(x,v),z;if(T===null){for(;v<E.length;v++)T=p(x,E[v],j),T!==null&&(_=i(T,_,v),W===null?z=T:W.sibling=T,W=T);return Ve&&ai(x,v),z}for(T=r(x,T);v<E.length;v++)I=w(T,x,v,E[v],j),I!==null&&(t&&I.alternate!==null&&T.delete(I.key===null?v:I.key),_=i(I,_,v),W===null?z=I:W.sibling=I,W=I);return t&&T.forEach(function(A){return e(x,A)}),Ve&&ai(x,v),z}function R(x,_,E,j){var z=Va(E);if(typeof z!="function")throw Error(H(150));if(E=z.call(E),E==null)throw Error(H(151));for(var W=z=null,T=_,v=_=0,I=null,C=E.next();T!==null&&!C.done;v++,C=E.next()){T.index>v?(I=T,T=null):I=T.sibling;var A=m(x,T,C.value,j);if(A===null){T===null&&(T=I);break}t&&T&&A.alternate===null&&e(x,T),_=i(A,_,v),W===null?z=A:W.sibling=A,W=A,T=I}if(C.done)return n(x,T),Ve&&ai(x,v),z;if(T===null){for(;!C.done;v++,C=E.next())C=p(x,C.value,j),C!==null&&(_=i(C,_,v),W===null?z=C:W.sibling=C,W=C);return Ve&&ai(x,v),z}for(T=r(x,T);!C.done;v++,C=E.next())C=w(T,x,v,C.value,j),C!==null&&(t&&C.alternate!==null&&T.delete(C.key===null?v:C.key),_=i(C,_,v),W===null?z=C:W.sibling=C,W=C);return t&&T.forEach(function(P){return e(x,P)}),Ve&&ai(x,v),z}function D(x,_,E,j){if(typeof E=="object"&&E!==null&&E.type===oo&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case au:e:{for(var z=E.key,W=_;W!==null;){if(W.key===z){if(z=E.type,z===oo){if(W.tag===7){n(x,W.sibling),_=s(W,E.props.children),_.return=x,x=_;break e}}else if(W.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===ss&&uw(z)===W.type){n(x,W.sibling),_=s(W,E.props),_.ref=$a(x,W,E),_.return=x,x=_;break e}n(x,W);break}else e(x,W);W=W.sibling}E.type===oo?(_=_i(E.props.children,x.mode,j,E.key),_.return=x,x=_):(j=Wu(E.type,E.key,E.props,null,x.mode,j),j.ref=$a(x,_,E),j.return=x,x=j)}return o(x);case io:e:{for(W=E.key;_!==null;){if(_.key===W)if(_.tag===4&&_.stateNode.containerInfo===E.containerInfo&&_.stateNode.implementation===E.implementation){n(x,_.sibling),_=s(_,E.children||[]),_.return=x,x=_;break e}else{n(x,_);break}else e(x,_);_=_.sibling}_=rp(E,x.mode,j),_.return=x,x=_}return o(x);case ss:return W=E._init,D(x,_,W(E._payload),j)}if(Xa(E))return N(x,_,E,j);if(Va(E))return R(x,_,E,j);_u(x,E)}return typeof E=="string"&&E!==""||typeof E=="number"?(E=""+E,_!==null&&_.tag===6?(n(x,_.sibling),_=s(_,E),_.return=x,x=_):(n(x,_),_=np(E,x.mode,j),_.return=x,x=_),o(x)):n(x,_)}return D}var Oo=C1(!0),S1=C1(!1),yh=qs(null),_h=null,mo=null,Fg=null;function Ug(){Fg=mo=_h=null}function zg(t){var e=yh.current;Oe(yh),t._currentValue=e}function im(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Io(t,e){_h=t,Fg=mo=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Gt=!0),t.firstContext=null)}function En(t){var e=t._currentValue;if(Fg!==t)if(t={context:t,memoizedValue:e,next:null},mo===null){if(_h===null)throw Error(H(308));mo=t,_h.dependencies={lanes:0,firstContext:t}}else mo=mo.next=t;return e}var di=null;function Bg(t){di===null?di=[t]:di.push(t)}function k1(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,Bg(e)):(n.next=s.next,s.next=n),e.interleaved=n,Rr(t,r)}function Rr(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var is=!1;function $g(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function N1(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ir(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function ws(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,Ee&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Rr(t,n)}return s=r.interleaved,s===null?(e.next=e,Bg(r)):(e.next=s.next,s.next=e),r.interleaved=e,Rr(t,n)}function Vu(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Ng(t,n)}}function hw(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function vh(t,e,n,r){var s=t.updateQueue;is=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,a=s.shared.pending;if(a!==null){s.shared.pending=null;var c=a,h=c.next;c.next=null,o===null?i=h:o.next=h,o=c;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=h:a.next=h,d.lastBaseUpdate=c))}if(i!==null){var p=s.baseState;o=0,d=h=c=null,a=i;do{var m=a.lane,w=a.eventTime;if((r&m)===m){d!==null&&(d=d.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var N=t,R=a;switch(m=e,w=n,R.tag){case 1:if(N=R.payload,typeof N=="function"){p=N.call(w,p,m);break e}p=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=R.payload,m=typeof N=="function"?N.call(w,p,m):N,m==null)break e;p=$e({},p,m);break e;case 2:is=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,m=s.effects,m===null?s.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(h=d=w,c=p):d=d.next=w,o|=m;if(a=a.next,a===null){if(a=s.shared.pending,a===null)break;m=a,a=m.next,m.next=null,s.lastBaseUpdate=m,s.shared.pending=null}}while(!0);if(d===null&&(c=p),s.baseState=c,s.firstBaseUpdate=h,s.lastBaseUpdate=d,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Si|=o,t.lanes=o,t.memoizedState=p}}function dw(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(H(191,s));s.call(r)}}}var yc={},Yn=qs(yc),Ul=qs(yc),zl=qs(yc);function fi(t){if(t===yc)throw Error(H(174));return t}function Wg(t,e){switch(Pe(zl,e),Pe(Ul,t),Pe(Yn,yc),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Fp(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Fp(e,t)}Oe(Yn),Pe(Yn,e)}function Lo(){Oe(Yn),Oe(Ul),Oe(zl)}function A1(t){fi(zl.current);var e=fi(Yn.current),n=Fp(e,t.type);e!==n&&(Pe(Ul,t),Pe(Yn,n))}function qg(t){Ul.current===t&&(Oe(Yn),Oe(Ul))}var Fe=qs(0);function wh(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Yf=[];function Hg(){for(var t=0;t<Yf.length;t++)Yf[t]._workInProgressVersionPrimary=null;Yf.length=0}var Fu=Fr.ReactCurrentDispatcher,Xf=Fr.ReactCurrentBatchConfig,Ci=0,ze=null,ot=null,ft=null,Eh=!1,fl=!1,Bl=0,UA=0;function St(){throw Error(H(321))}function Gg(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Mn(t[n],e[n]))return!1;return!0}function Kg(t,e,n,r,s,i){if(Ci=i,ze=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Fu.current=t===null||t.memoizedState===null?WA:qA,t=n(r,s),fl){i=0;do{if(fl=!1,Bl=0,25<=i)throw Error(H(301));i+=1,ft=ot=null,e.updateQueue=null,Fu.current=HA,t=n(r,s)}while(fl)}if(Fu.current=Th,e=ot!==null&&ot.next!==null,Ci=0,ft=ot=ze=null,Eh=!1,e)throw Error(H(300));return t}function Qg(){var t=Bl!==0;return Bl=0,t}function qn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ft===null?ze.memoizedState=ft=t:ft=ft.next=t,ft}function Tn(){if(ot===null){var t=ze.alternate;t=t!==null?t.memoizedState:null}else t=ot.next;var e=ft===null?ze.memoizedState:ft.next;if(e!==null)ft=e,ot=t;else{if(t===null)throw Error(H(310));ot=t,t={memoizedState:ot.memoizedState,baseState:ot.baseState,baseQueue:ot.baseQueue,queue:ot.queue,next:null},ft===null?ze.memoizedState=ft=t:ft=ft.next=t}return ft}function $l(t,e){return typeof e=="function"?e(t):e}function Jf(t){var e=Tn(),n=e.queue;if(n===null)throw Error(H(311));n.lastRenderedReducer=t;var r=ot,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var a=o=null,c=null,h=i;do{var d=h.lane;if((Ci&d)===d)c!==null&&(c=c.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var p={lane:d,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};c===null?(a=c=p,o=r):c=c.next=p,ze.lanes|=d,Si|=d}h=h.next}while(h!==null&&h!==i);c===null?o=r:c.next=a,Mn(r,e.memoizedState)||(Gt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=c,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,ze.lanes|=i,Si|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Zf(t){var e=Tn(),n=e.queue;if(n===null)throw Error(H(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Mn(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function R1(){}function P1(t,e){var n=ze,r=Tn(),s=e(),i=!Mn(r.memoizedState,s);if(i&&(r.memoizedState=s,Gt=!0),r=r.queue,Yg(j1.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||ft!==null&&ft.memoizedState.tag&1){if(n.flags|=2048,Wl(9,D1.bind(null,n,r,s,e),void 0,null),gt===null)throw Error(H(349));Ci&30||b1(n,e,s)}return s}function b1(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ze.updateQueue,e===null?(e={lastEffect:null,stores:null},ze.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function D1(t,e,n,r){e.value=n,e.getSnapshot=r,M1(e)&&O1(t)}function j1(t,e,n){return n(function(){M1(e)&&O1(t)})}function M1(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Mn(t,n)}catch{return!0}}function O1(t){var e=Rr(t,1);e!==null&&bn(e,t,1,-1)}function fw(t){var e=qn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$l,lastRenderedState:t},e.queue=t,t=t.dispatch=$A.bind(null,ze,t),[e.memoizedState,t]}function Wl(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ze.updateQueue,e===null?(e={lastEffect:null,stores:null},ze.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function L1(){return Tn().memoizedState}function Uu(t,e,n,r){var s=qn();ze.flags|=t,s.memoizedState=Wl(1|e,n,void 0,r===void 0?null:r)}function xd(t,e,n,r){var s=Tn();r=r===void 0?null:r;var i=void 0;if(ot!==null){var o=ot.memoizedState;if(i=o.destroy,r!==null&&Gg(r,o.deps)){s.memoizedState=Wl(e,n,i,r);return}}ze.flags|=t,s.memoizedState=Wl(1|e,n,i,r)}function pw(t,e){return Uu(8390656,8,t,e)}function Yg(t,e){return xd(2048,8,t,e)}function V1(t,e){return xd(4,2,t,e)}function F1(t,e){return xd(4,4,t,e)}function U1(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function z1(t,e,n){return n=n!=null?n.concat([t]):null,xd(4,4,U1.bind(null,e,t),n)}function Xg(){}function B1(t,e){var n=Tn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Gg(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function $1(t,e){var n=Tn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Gg(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function W1(t,e,n){return Ci&21?(Mn(n,e)||(n=QT(),ze.lanes|=n,Si|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Gt=!0),t.memoizedState=n)}function zA(t,e){var n=Se;Se=n!==0&&4>n?n:4,t(!0);var r=Xf.transition;Xf.transition={};try{t(!1),e()}finally{Se=n,Xf.transition=r}}function q1(){return Tn().memoizedState}function BA(t,e,n){var r=Ts(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},H1(t))G1(e,n);else if(n=k1(t,e,n,r),n!==null){var s=Ut();bn(n,t,r,s),K1(n,e,r)}}function $A(t,e,n){var r=Ts(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(H1(t))G1(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,a=i(o,n);if(s.hasEagerState=!0,s.eagerState=a,Mn(a,o)){var c=e.interleaved;c===null?(s.next=s,Bg(e)):(s.next=c.next,c.next=s),e.interleaved=s;return}}catch{}finally{}n=k1(t,e,s,r),n!==null&&(s=Ut(),bn(n,t,r,s),K1(n,e,r))}}function H1(t){var e=t.alternate;return t===ze||e!==null&&e===ze}function G1(t,e){fl=Eh=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function K1(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Ng(t,n)}}var Th={readContext:En,useCallback:St,useContext:St,useEffect:St,useImperativeHandle:St,useInsertionEffect:St,useLayoutEffect:St,useMemo:St,useReducer:St,useRef:St,useState:St,useDebugValue:St,useDeferredValue:St,useTransition:St,useMutableSource:St,useSyncExternalStore:St,useId:St,unstable_isNewReconciler:!1},WA={readContext:En,useCallback:function(t,e){return qn().memoizedState=[t,e===void 0?null:e],t},useContext:En,useEffect:pw,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Uu(4194308,4,U1.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Uu(4194308,4,t,e)},useInsertionEffect:function(t,e){return Uu(4,2,t,e)},useMemo:function(t,e){var n=qn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=qn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=BA.bind(null,ze,t),[r.memoizedState,t]},useRef:function(t){var e=qn();return t={current:t},e.memoizedState=t},useState:fw,useDebugValue:Xg,useDeferredValue:function(t){return qn().memoizedState=t},useTransition:function(){var t=fw(!1),e=t[0];return t=zA.bind(null,t[1]),qn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ze,s=qn();if(Ve){if(n===void 0)throw Error(H(407));n=n()}else{if(n=e(),gt===null)throw Error(H(349));Ci&30||b1(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,pw(j1.bind(null,r,i,t),[t]),r.flags|=2048,Wl(9,D1.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=qn(),e=gt.identifierPrefix;if(Ve){var n=vr,r=_r;n=(r&~(1<<32-Pn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Bl++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=UA++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},qA={readContext:En,useCallback:B1,useContext:En,useEffect:Yg,useImperativeHandle:z1,useInsertionEffect:V1,useLayoutEffect:F1,useMemo:$1,useReducer:Jf,useRef:L1,useState:function(){return Jf($l)},useDebugValue:Xg,useDeferredValue:function(t){var e=Tn();return W1(e,ot.memoizedState,t)},useTransition:function(){var t=Jf($l)[0],e=Tn().memoizedState;return[t,e]},useMutableSource:R1,useSyncExternalStore:P1,useId:q1,unstable_isNewReconciler:!1},HA={readContext:En,useCallback:B1,useContext:En,useEffect:Yg,useImperativeHandle:z1,useInsertionEffect:V1,useLayoutEffect:F1,useMemo:$1,useReducer:Zf,useRef:L1,useState:function(){return Zf($l)},useDebugValue:Xg,useDeferredValue:function(t){var e=Tn();return ot===null?e.memoizedState=t:W1(e,ot.memoizedState,t)},useTransition:function(){var t=Zf($l)[0],e=Tn().memoizedState;return[t,e]},useMutableSource:R1,useSyncExternalStore:P1,useId:q1,unstable_isNewReconciler:!1};function Cn(t,e){if(t&&t.defaultProps){e=$e({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function om(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:$e({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Id={isMounted:function(t){return(t=t._reactInternals)?Vi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Ut(),s=Ts(t),i=Ir(r,s);i.payload=e,n!=null&&(i.callback=n),e=ws(t,i,s),e!==null&&(bn(e,t,s,r),Vu(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Ut(),s=Ts(t),i=Ir(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=ws(t,i,s),e!==null&&(bn(e,t,s,r),Vu(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Ut(),r=Ts(t),s=Ir(n,r);s.tag=2,e!=null&&(s.callback=e),e=ws(t,s,r),e!==null&&(bn(e,t,r,n),Vu(e,t,r))}};function mw(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Ol(n,r)||!Ol(s,i):!0}function Q1(t,e,n){var r=!1,s=bs,i=e.contextType;return typeof i=="object"&&i!==null?i=En(i):(s=Xt(e)?xi:Dt.current,r=e.contextTypes,i=(r=r!=null)?jo(t,s):bs),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Id,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function gw(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Id.enqueueReplaceState(e,e.state,null)}function am(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},$g(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=En(i):(i=Xt(e)?xi:Dt.current,s.context=jo(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(om(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Id.enqueueReplaceState(s,s.state,null),vh(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Vo(t,e){try{var n="",r=e;do n+=wN(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function ep(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function lm(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var GA=typeof WeakMap=="function"?WeakMap:Map;function Y1(t,e,n){n=Ir(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Ih||(Ih=!0,_m=r),lm(t,e)},n}function X1(t,e,n){n=Ir(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){lm(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){lm(t,e),typeof r!="function"&&(Es===null?Es=new Set([this]):Es.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function yw(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new GA;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=aR.bind(null,t,e,n),e.then(t,t))}function _w(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function vw(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ir(-1,1),e.tag=2,ws(n,e,1))),n.lanes|=1),t)}var KA=Fr.ReactCurrentOwner,Gt=!1;function Ft(t,e,n,r){e.child=t===null?S1(e,null,n,r):Oo(e,t.child,n,r)}function ww(t,e,n,r,s){n=n.render;var i=e.ref;return Io(e,s),r=Kg(t,e,n,r,i,s),n=Qg(),t!==null&&!Gt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Pr(t,e,s)):(Ve&&n&&Og(e),e.flags|=1,Ft(t,e,r,s),e.child)}function Ew(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!iy(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,J1(t,e,i,r,s)):(t=Wu(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ol,n(o,r)&&t.ref===e.ref)return Pr(t,e,s)}return e.flags|=1,t=xs(i,r),t.ref=e.ref,t.return=e,e.child=t}function J1(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Ol(i,r)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Gt=!0);else return e.lanes=t.lanes,Pr(t,e,s)}return cm(t,e,n,r,s)}function Z1(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Pe(yo,rn),rn|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Pe(yo,rn),rn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Pe(yo,rn),rn|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,Pe(yo,rn),rn|=r;return Ft(t,e,s,n),e.child}function ex(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function cm(t,e,n,r,s){var i=Xt(n)?xi:Dt.current;return i=jo(e,i),Io(e,s),n=Kg(t,e,n,r,i,s),r=Qg(),t!==null&&!Gt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Pr(t,e,s)):(Ve&&r&&Og(e),e.flags|=1,Ft(t,e,n,s),e.child)}function Tw(t,e,n,r,s){if(Xt(n)){var i=!0;ph(e)}else i=!1;if(Io(e,s),e.stateNode===null)zu(t,e),Q1(e,n,r),am(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var c=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=En(h):(h=Xt(n)?xi:Dt.current,h=jo(e,h));var d=n.getDerivedStateFromProps,p=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||c!==h)&&gw(e,o,r,h),is=!1;var m=e.memoizedState;o.state=m,vh(e,r,o,s),c=e.memoizedState,a!==r||m!==c||Yt.current||is?(typeof d=="function"&&(om(e,n,d,r),c=e.memoizedState),(a=is||mw(e,n,a,r,m,c,h))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),o.props=r,o.state=c,o.context=h,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,N1(t,e),a=e.memoizedProps,h=e.type===e.elementType?a:Cn(e.type,a),o.props=h,p=e.pendingProps,m=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=En(c):(c=Xt(n)?xi:Dt.current,c=jo(e,c));var w=n.getDerivedStateFromProps;(d=typeof w=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==p||m!==c)&&gw(e,o,r,c),is=!1,m=e.memoizedState,o.state=m,vh(e,r,o,s);var N=e.memoizedState;a!==p||m!==N||Yt.current||is?(typeof w=="function"&&(om(e,n,w,r),N=e.memoizedState),(h=is||mw(e,n,h,r,m,N,c)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,N,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,N,c)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=N),o.props=r,o.state=N,o.context=c,r=h):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),r=!1)}return um(t,e,n,r,i,s)}function um(t,e,n,r,s,i){ex(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&aw(e,n,!1),Pr(t,e,i);r=e.stateNode,KA.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Oo(e,t.child,null,i),e.child=Oo(e,null,a,i)):Ft(t,e,a,i),e.memoizedState=r.state,s&&aw(e,n,!0),e.child}function tx(t){var e=t.stateNode;e.pendingContext?ow(t,e.pendingContext,e.pendingContext!==e.context):e.context&&ow(t,e.context,!1),Wg(t,e.containerInfo)}function xw(t,e,n,r,s){return Mo(),Vg(s),e.flags|=256,Ft(t,e,n,r),e.child}var hm={dehydrated:null,treeContext:null,retryLane:0};function dm(t){return{baseLanes:t,cachePool:null,transitions:null}}function nx(t,e,n){var r=e.pendingProps,s=Fe.current,i=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(s&2)!==0),a?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),Pe(Fe,s&1),t===null)return sm(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=kd(o,r,0,null),t=_i(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=dm(n),e.memoizedState=hm,t):Jg(e,o));if(s=t.memoizedState,s!==null&&(a=s.dehydrated,a!==null))return QA(t,e,o,r,a,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,a=s.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=c,e.deletions=null):(r=xs(s,c),r.subtreeFlags=s.subtreeFlags&14680064),a!==null?i=xs(a,i):(i=_i(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?dm(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=hm,r}return i=t.child,t=i.sibling,r=xs(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Jg(t,e){return e=kd({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function vu(t,e,n,r){return r!==null&&Vg(r),Oo(e,t.child,null,n),t=Jg(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function QA(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=ep(Error(H(422))),vu(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=kd({mode:"visible",children:r.children},s,0,null),i=_i(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Oo(e,t.child,null,o),e.child.memoizedState=dm(o),e.memoizedState=hm,i);if(!(e.mode&1))return vu(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(H(419)),r=ep(i,r,void 0),vu(t,e,o,r)}if(a=(o&t.childLanes)!==0,Gt||a){if(r=gt,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Rr(t,s),bn(r,t,s,-1))}return sy(),r=ep(Error(H(421))),vu(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=lR.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,on=vs(s.nextSibling),ln=e,Ve=!0,kn=null,t!==null&&(pn[mn++]=_r,pn[mn++]=vr,pn[mn++]=Ii,_r=t.id,vr=t.overflow,Ii=e),e=Jg(e,r.children),e.flags|=4096,e)}function Iw(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),im(t.return,e,n)}function tp(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function rx(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(Ft(t,e,r.children,n),r=Fe.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Iw(t,n,e);else if(t.tag===19)Iw(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(Pe(Fe,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&wh(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),tp(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&wh(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}tp(e,!0,n,null,i);break;case"together":tp(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function zu(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Pr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Si|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(H(153));if(e.child!==null){for(t=e.child,n=xs(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=xs(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function YA(t,e,n){switch(e.tag){case 3:tx(e),Mo();break;case 5:A1(e);break;case 1:Xt(e.type)&&ph(e);break;case 4:Wg(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;Pe(yh,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(Pe(Fe,Fe.current&1),e.flags|=128,null):n&e.child.childLanes?nx(t,e,n):(Pe(Fe,Fe.current&1),t=Pr(t,e,n),t!==null?t.sibling:null);Pe(Fe,Fe.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return rx(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Pe(Fe,Fe.current),r)break;return null;case 22:case 23:return e.lanes=0,Z1(t,e,n)}return Pr(t,e,n)}var sx,fm,ix,ox;sx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};fm=function(){};ix=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,fi(Yn.current);var i=null;switch(n){case"input":s=Mp(t,s),r=Mp(t,r),i=[];break;case"select":s=$e({},s,{value:void 0}),r=$e({},r,{value:void 0}),i=[];break;case"textarea":s=Vp(t,s),r=Vp(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=dh)}Up(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var a=s[h];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Al.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var c=r[h];if(a=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&c!==a&&(c!=null||a!=null))if(h==="style")if(a){for(o in a)!a.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&a[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(h,n)),n=c;else h==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(i=i||[]).push(h,c)):h==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(h,""+c):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Al.hasOwnProperty(h)?(c!=null&&h==="onScroll"&&De("scroll",t),i||a===c||(i=[])):(i=i||[]).push(h,c))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};ox=function(t,e,n,r){n!==r&&(e.flags|=4)};function Wa(t,e){if(!Ve)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function XA(t,e,n){var r=e.pendingProps;switch(Lg(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return kt(e),null;case 1:return Xt(e.type)&&fh(),kt(e),null;case 3:return r=e.stateNode,Lo(),Oe(Yt),Oe(Dt),Hg(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(yu(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,kn!==null&&(Em(kn),kn=null))),fm(t,e),kt(e),null;case 5:qg(e);var s=fi(zl.current);if(n=e.type,t!==null&&e.stateNode!=null)ix(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(H(166));return kt(e),null}if(t=fi(Yn.current),yu(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[Gn]=e,r[Fl]=i,t=(e.mode&1)!==0,n){case"dialog":De("cancel",r),De("close",r);break;case"iframe":case"object":case"embed":De("load",r);break;case"video":case"audio":for(s=0;s<Za.length;s++)De(Za[s],r);break;case"source":De("error",r);break;case"img":case"image":case"link":De("error",r),De("load",r);break;case"details":De("toggle",r);break;case"input":Dv(r,i),De("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},De("invalid",r);break;case"textarea":Mv(r,i),De("invalid",r)}Up(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&gu(r.textContent,a,t),s=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&gu(r.textContent,a,t),s=["children",""+a]):Al.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&De("scroll",r)}switch(n){case"input":lu(r),jv(r,i,!0);break;case"textarea":lu(r),Ov(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=dh)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=jT(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[Gn]=e,t[Fl]=r,sx(t,e,!1,!1),e.stateNode=t;e:{switch(o=zp(n,r),n){case"dialog":De("cancel",t),De("close",t),s=r;break;case"iframe":case"object":case"embed":De("load",t),s=r;break;case"video":case"audio":for(s=0;s<Za.length;s++)De(Za[s],t);s=r;break;case"source":De("error",t),s=r;break;case"img":case"image":case"link":De("error",t),De("load",t),s=r;break;case"details":De("toggle",t),s=r;break;case"input":Dv(t,r),s=Mp(t,r),De("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=$e({},r,{value:void 0}),De("invalid",t);break;case"textarea":Mv(t,r),s=Vp(t,r),De("invalid",t);break;default:s=r}Up(n,s),a=s;for(i in a)if(a.hasOwnProperty(i)){var c=a[i];i==="style"?LT(t,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&MT(t,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Rl(t,c):typeof c=="number"&&Rl(t,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Al.hasOwnProperty(i)?c!=null&&i==="onScroll"&&De("scroll",t):c!=null&&Tg(t,i,c,o))}switch(n){case"input":lu(t),jv(t,r,!1);break;case"textarea":lu(t),Ov(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Ps(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?wo(t,!!r.multiple,i,!1):r.defaultValue!=null&&wo(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=dh)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return kt(e),null;case 6:if(t&&e.stateNode!=null)ox(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(H(166));if(n=fi(zl.current),fi(Yn.current),yu(e)){if(r=e.stateNode,n=e.memoizedProps,r[Gn]=e,(i=r.nodeValue!==n)&&(t=ln,t!==null))switch(t.tag){case 3:gu(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&gu(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Gn]=e,e.stateNode=r}return kt(e),null;case 13:if(Oe(Fe),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ve&&on!==null&&e.mode&1&&!(e.flags&128))I1(),Mo(),e.flags|=98560,i=!1;else if(i=yu(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(H(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(H(317));i[Gn]=e}else Mo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;kt(e),i=!1}else kn!==null&&(Em(kn),kn=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Fe.current&1?at===0&&(at=3):sy())),e.updateQueue!==null&&(e.flags|=4),kt(e),null);case 4:return Lo(),fm(t,e),t===null&&Ll(e.stateNode.containerInfo),kt(e),null;case 10:return zg(e.type._context),kt(e),null;case 17:return Xt(e.type)&&fh(),kt(e),null;case 19:if(Oe(Fe),i=e.memoizedState,i===null)return kt(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)Wa(i,!1);else{if(at!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=wh(t),o!==null){for(e.flags|=128,Wa(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Pe(Fe,Fe.current&1|2),e.child}t=t.sibling}i.tail!==null&&Ye()>Fo&&(e.flags|=128,r=!0,Wa(i,!1),e.lanes=4194304)}else{if(!r)if(t=wh(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Wa(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Ve)return kt(e),null}else 2*Ye()-i.renderingStartTime>Fo&&n!==1073741824&&(e.flags|=128,r=!0,Wa(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Ye(),e.sibling=null,n=Fe.current,Pe(Fe,r?n&1|2:n&1),e):(kt(e),null);case 22:case 23:return ry(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?rn&1073741824&&(kt(e),e.subtreeFlags&6&&(e.flags|=8192)):kt(e),null;case 24:return null;case 25:return null}throw Error(H(156,e.tag))}function JA(t,e){switch(Lg(e),e.tag){case 1:return Xt(e.type)&&fh(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Lo(),Oe(Yt),Oe(Dt),Hg(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return qg(e),null;case 13:if(Oe(Fe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(H(340));Mo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Oe(Fe),null;case 4:return Lo(),null;case 10:return zg(e.type._context),null;case 22:case 23:return ry(),null;case 24:return null;default:return null}}var wu=!1,Rt=!1,ZA=typeof WeakSet=="function"?WeakSet:Set,Z=null;function go(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){qe(t,e,r)}else n.current=null}function pm(t,e,n){try{n()}catch(r){qe(t,e,r)}}var Cw=!1;function eR(t,e){if(Xp=ch,t=h1(),Mg(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,c=-1,h=0,d=0,p=t,m=null;t:for(;;){for(var w;p!==n||s!==0&&p.nodeType!==3||(a=o+s),p!==i||r!==0&&p.nodeType!==3||(c=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(w=p.firstChild)!==null;)m=p,p=w;for(;;){if(p===t)break t;if(m===n&&++h===s&&(a=o),m===i&&++d===r&&(c=o),(w=p.nextSibling)!==null)break;p=m,m=p.parentNode}p=w}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Jp={focusedElem:t,selectionRange:n},ch=!1,Z=e;Z!==null;)if(e=Z,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Z=t;else for(;Z!==null;){e=Z;try{var N=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var R=N.memoizedProps,D=N.memoizedState,x=e.stateNode,_=x.getSnapshotBeforeUpdate(e.elementType===e.type?R:Cn(e.type,R),D);x.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var E=e.stateNode.containerInfo;E.nodeType===1?E.textContent="":E.nodeType===9&&E.documentElement&&E.removeChild(E.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(H(163))}}catch(j){qe(e,e.return,j)}if(t=e.sibling,t!==null){t.return=e.return,Z=t;break}Z=e.return}return N=Cw,Cw=!1,N}function pl(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&pm(e,n,i)}s=s.next}while(s!==r)}}function Cd(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function mm(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function ax(t){var e=t.alternate;e!==null&&(t.alternate=null,ax(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Gn],delete e[Fl],delete e[tm],delete e[OA],delete e[LA])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function lx(t){return t.tag===5||t.tag===3||t.tag===4}function Sw(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||lx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function gm(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=dh));else if(r!==4&&(t=t.child,t!==null))for(gm(t,e,n),t=t.sibling;t!==null;)gm(t,e,n),t=t.sibling}function ym(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(ym(t,e,n),t=t.sibling;t!==null;)ym(t,e,n),t=t.sibling}var vt=null,Sn=!1;function ns(t,e,n){for(n=n.child;n!==null;)cx(t,e,n),n=n.sibling}function cx(t,e,n){if(Qn&&typeof Qn.onCommitFiberUnmount=="function")try{Qn.onCommitFiberUnmount(yd,n)}catch{}switch(n.tag){case 5:Rt||go(n,e);case 6:var r=vt,s=Sn;vt=null,ns(t,e,n),vt=r,Sn=s,vt!==null&&(Sn?(t=vt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):vt.removeChild(n.stateNode));break;case 18:vt!==null&&(Sn?(t=vt,n=n.stateNode,t.nodeType===8?Kf(t.parentNode,n):t.nodeType===1&&Kf(t,n),jl(t)):Kf(vt,n.stateNode));break;case 4:r=vt,s=Sn,vt=n.stateNode.containerInfo,Sn=!0,ns(t,e,n),vt=r,Sn=s;break;case 0:case 11:case 14:case 15:if(!Rt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&pm(n,e,o),s=s.next}while(s!==r)}ns(t,e,n);break;case 1:if(!Rt&&(go(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){qe(n,e,a)}ns(t,e,n);break;case 21:ns(t,e,n);break;case 22:n.mode&1?(Rt=(r=Rt)||n.memoizedState!==null,ns(t,e,n),Rt=r):ns(t,e,n);break;default:ns(t,e,n)}}function kw(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ZA),e.forEach(function(r){var s=cR.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function In(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:vt=a.stateNode,Sn=!1;break e;case 3:vt=a.stateNode.containerInfo,Sn=!0;break e;case 4:vt=a.stateNode.containerInfo,Sn=!0;break e}a=a.return}if(vt===null)throw Error(H(160));cx(i,o,s),vt=null,Sn=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(h){qe(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)ux(e,t),e=e.sibling}function ux(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(In(e,t),Wn(t),r&4){try{pl(3,t,t.return),Cd(3,t)}catch(R){qe(t,t.return,R)}try{pl(5,t,t.return)}catch(R){qe(t,t.return,R)}}break;case 1:In(e,t),Wn(t),r&512&&n!==null&&go(n,n.return);break;case 5:if(In(e,t),Wn(t),r&512&&n!==null&&go(n,n.return),t.flags&32){var s=t.stateNode;try{Rl(s,"")}catch(R){qe(t,t.return,R)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,a=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&bT(s,i),zp(a,o);var h=zp(a,i);for(o=0;o<c.length;o+=2){var d=c[o],p=c[o+1];d==="style"?LT(s,p):d==="dangerouslySetInnerHTML"?MT(s,p):d==="children"?Rl(s,p):Tg(s,d,p,h)}switch(a){case"input":Op(s,i);break;case"textarea":DT(s,i);break;case"select":var m=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var w=i.value;w!=null?wo(s,!!i.multiple,w,!1):m!==!!i.multiple&&(i.defaultValue!=null?wo(s,!!i.multiple,i.defaultValue,!0):wo(s,!!i.multiple,i.multiple?[]:"",!1))}s[Fl]=i}catch(R){qe(t,t.return,R)}}break;case 6:if(In(e,t),Wn(t),r&4){if(t.stateNode===null)throw Error(H(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(R){qe(t,t.return,R)}}break;case 3:if(In(e,t),Wn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{jl(e.containerInfo)}catch(R){qe(t,t.return,R)}break;case 4:In(e,t),Wn(t);break;case 13:In(e,t),Wn(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(ty=Ye())),r&4&&kw(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(Rt=(h=Rt)||d,In(e,t),Rt=h):In(e,t),Wn(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!d&&t.mode&1)for(Z=t,d=t.child;d!==null;){for(p=Z=d;Z!==null;){switch(m=Z,w=m.child,m.tag){case 0:case 11:case 14:case 15:pl(4,m,m.return);break;case 1:go(m,m.return);var N=m.stateNode;if(typeof N.componentWillUnmount=="function"){r=m,n=m.return;try{e=r,N.props=e.memoizedProps,N.state=e.memoizedState,N.componentWillUnmount()}catch(R){qe(r,n,R)}}break;case 5:go(m,m.return);break;case 22:if(m.memoizedState!==null){Aw(p);continue}}w!==null?(w.return=m,Z=w):Aw(p)}d=d.sibling}e:for(d=null,p=t;;){if(p.tag===5){if(d===null){d=p;try{s=p.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=p.stateNode,c=p.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=OT("display",o))}catch(R){qe(t,t.return,R)}}}else if(p.tag===6){if(d===null)try{p.stateNode.nodeValue=h?"":p.memoizedProps}catch(R){qe(t,t.return,R)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:In(e,t),Wn(t),r&4&&kw(t);break;case 21:break;default:In(e,t),Wn(t)}}function Wn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(lx(n)){var r=n;break e}n=n.return}throw Error(H(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Rl(s,""),r.flags&=-33);var i=Sw(t);ym(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Sw(t);gm(t,a,o);break;default:throw Error(H(161))}}catch(c){qe(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function tR(t,e,n){Z=t,hx(t)}function hx(t,e,n){for(var r=(t.mode&1)!==0;Z!==null;){var s=Z,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||wu;if(!o){var a=s.alternate,c=a!==null&&a.memoizedState!==null||Rt;a=wu;var h=Rt;if(wu=o,(Rt=c)&&!h)for(Z=s;Z!==null;)o=Z,c=o.child,o.tag===22&&o.memoizedState!==null?Rw(s):c!==null?(c.return=o,Z=c):Rw(s);for(;i!==null;)Z=i,hx(i),i=i.sibling;Z=s,wu=a,Rt=h}Nw(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,Z=i):Nw(t)}}function Nw(t){for(;Z!==null;){var e=Z;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Rt||Cd(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Rt)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Cn(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&dw(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}dw(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var d=h.memoizedState;if(d!==null){var p=d.dehydrated;p!==null&&jl(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(H(163))}Rt||e.flags&512&&mm(e)}catch(m){qe(e,e.return,m)}}if(e===t){Z=null;break}if(n=e.sibling,n!==null){n.return=e.return,Z=n;break}Z=e.return}}function Aw(t){for(;Z!==null;){var e=Z;if(e===t){Z=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Z=n;break}Z=e.return}}function Rw(t){for(;Z!==null;){var e=Z;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Cd(4,e)}catch(c){qe(e,n,c)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(c){qe(e,s,c)}}var i=e.return;try{mm(e)}catch(c){qe(e,i,c)}break;case 5:var o=e.return;try{mm(e)}catch(c){qe(e,o,c)}}}catch(c){qe(e,e.return,c)}if(e===t){Z=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Z=a;break}Z=e.return}}var nR=Math.ceil,xh=Fr.ReactCurrentDispatcher,Zg=Fr.ReactCurrentOwner,vn=Fr.ReactCurrentBatchConfig,Ee=0,gt=null,tt=null,Tt=0,rn=0,yo=qs(0),at=0,ql=null,Si=0,Sd=0,ey=0,ml=null,qt=null,ty=0,Fo=1/0,mr=null,Ih=!1,_m=null,Es=null,Eu=!1,fs=null,Ch=0,gl=0,vm=null,Bu=-1,$u=0;function Ut(){return Ee&6?Ye():Bu!==-1?Bu:Bu=Ye()}function Ts(t){return t.mode&1?Ee&2&&Tt!==0?Tt&-Tt:FA.transition!==null?($u===0&&($u=QT()),$u):(t=Se,t!==0||(t=window.event,t=t===void 0?16:n1(t.type)),t):1}function bn(t,e,n,r){if(50<gl)throw gl=0,vm=null,Error(H(185));pc(t,n,r),(!(Ee&2)||t!==gt)&&(t===gt&&(!(Ee&2)&&(Sd|=n),at===4&&as(t,Tt)),Jt(t,r),n===1&&Ee===0&&!(e.mode&1)&&(Fo=Ye()+500,Td&&Hs()))}function Jt(t,e){var n=t.callbackNode;FN(t,e);var r=lh(t,t===gt?Tt:0);if(r===0)n!==null&&Fv(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Fv(n),e===1)t.tag===0?VA(Pw.bind(null,t)):E1(Pw.bind(null,t)),jA(function(){!(Ee&6)&&Hs()}),n=null;else{switch(YT(r)){case 1:n=kg;break;case 4:n=GT;break;case 16:n=ah;break;case 536870912:n=KT;break;default:n=ah}n=vx(n,dx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function dx(t,e){if(Bu=-1,$u=0,Ee&6)throw Error(H(327));var n=t.callbackNode;if(Co()&&t.callbackNode!==n)return null;var r=lh(t,t===gt?Tt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Sh(t,r);else{e=r;var s=Ee;Ee|=2;var i=px();(gt!==t||Tt!==e)&&(mr=null,Fo=Ye()+500,yi(t,e));do try{iR();break}catch(a){fx(t,a)}while(!0);Ug(),xh.current=i,Ee=s,tt!==null?e=0:(gt=null,Tt=0,e=at)}if(e!==0){if(e===2&&(s=Hp(t),s!==0&&(r=s,e=wm(t,s))),e===1)throw n=ql,yi(t,0),as(t,r),Jt(t,Ye()),n;if(e===6)as(t,r);else{if(s=t.current.alternate,!(r&30)&&!rR(s)&&(e=Sh(t,r),e===2&&(i=Hp(t),i!==0&&(r=i,e=wm(t,i))),e===1))throw n=ql,yi(t,0),as(t,r),Jt(t,Ye()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(H(345));case 2:li(t,qt,mr);break;case 3:if(as(t,r),(r&130023424)===r&&(e=ty+500-Ye(),10<e)){if(lh(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){Ut(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=em(li.bind(null,t,qt,mr),e);break}li(t,qt,mr);break;case 4:if(as(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Pn(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Ye()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*nR(r/1960))-r,10<r){t.timeoutHandle=em(li.bind(null,t,qt,mr),r);break}li(t,qt,mr);break;case 5:li(t,qt,mr);break;default:throw Error(H(329))}}}return Jt(t,Ye()),t.callbackNode===n?dx.bind(null,t):null}function wm(t,e){var n=ml;return t.current.memoizedState.isDehydrated&&(yi(t,e).flags|=256),t=Sh(t,e),t!==2&&(e=qt,qt=n,e!==null&&Em(e)),t}function Em(t){qt===null?qt=t:qt.push.apply(qt,t)}function rR(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Mn(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function as(t,e){for(e&=~ey,e&=~Sd,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Pn(e),r=1<<n;t[n]=-1,e&=~r}}function Pw(t){if(Ee&6)throw Error(H(327));Co();var e=lh(t,0);if(!(e&1))return Jt(t,Ye()),null;var n=Sh(t,e);if(t.tag!==0&&n===2){var r=Hp(t);r!==0&&(e=r,n=wm(t,r))}if(n===1)throw n=ql,yi(t,0),as(t,e),Jt(t,Ye()),n;if(n===6)throw Error(H(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,li(t,qt,mr),Jt(t,Ye()),null}function ny(t,e){var n=Ee;Ee|=1;try{return t(e)}finally{Ee=n,Ee===0&&(Fo=Ye()+500,Td&&Hs())}}function ki(t){fs!==null&&fs.tag===0&&!(Ee&6)&&Co();var e=Ee;Ee|=1;var n=vn.transition,r=Se;try{if(vn.transition=null,Se=1,t)return t()}finally{Se=r,vn.transition=n,Ee=e,!(Ee&6)&&Hs()}}function ry(){rn=yo.current,Oe(yo)}function yi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,DA(n)),tt!==null)for(n=tt.return;n!==null;){var r=n;switch(Lg(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fh();break;case 3:Lo(),Oe(Yt),Oe(Dt),Hg();break;case 5:qg(r);break;case 4:Lo();break;case 13:Oe(Fe);break;case 19:Oe(Fe);break;case 10:zg(r.type._context);break;case 22:case 23:ry()}n=n.return}if(gt=t,tt=t=xs(t.current,null),Tt=rn=e,at=0,ql=null,ey=Sd=Si=0,qt=ml=null,di!==null){for(e=0;e<di.length;e++)if(n=di[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}di=null}return t}function fx(t,e){do{var n=tt;try{if(Ug(),Fu.current=Th,Eh){for(var r=ze.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Eh=!1}if(Ci=0,ft=ot=ze=null,fl=!1,Bl=0,Zg.current=null,n===null||n.return===null){at=1,ql=e,tt=null;break}e:{var i=t,o=n.return,a=n,c=e;if(e=Tt,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var h=c,d=a,p=d.tag;if(!(d.mode&1)&&(p===0||p===11||p===15)){var m=d.alternate;m?(d.updateQueue=m.updateQueue,d.memoizedState=m.memoizedState,d.lanes=m.lanes):(d.updateQueue=null,d.memoizedState=null)}var w=_w(o);if(w!==null){w.flags&=-257,vw(w,o,a,i,e),w.mode&1&&yw(i,h,e),e=w,c=h;var N=e.updateQueue;if(N===null){var R=new Set;R.add(c),e.updateQueue=R}else N.add(c);break e}else{if(!(e&1)){yw(i,h,e),sy();break e}c=Error(H(426))}}else if(Ve&&a.mode&1){var D=_w(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),vw(D,o,a,i,e),Vg(Vo(c,a));break e}}i=c=Vo(c,a),at!==4&&(at=2),ml===null?ml=[i]:ml.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var x=Y1(i,c,e);hw(i,x);break e;case 1:a=c;var _=i.type,E=i.stateNode;if(!(i.flags&128)&&(typeof _.getDerivedStateFromError=="function"||E!==null&&typeof E.componentDidCatch=="function"&&(Es===null||!Es.has(E)))){i.flags|=65536,e&=-e,i.lanes|=e;var j=X1(i,a,e);hw(i,j);break e}}i=i.return}while(i!==null)}gx(n)}catch(z){e=z,tt===n&&n!==null&&(tt=n=n.return);continue}break}while(!0)}function px(){var t=xh.current;return xh.current=Th,t===null?Th:t}function sy(){(at===0||at===3||at===2)&&(at=4),gt===null||!(Si&268435455)&&!(Sd&268435455)||as(gt,Tt)}function Sh(t,e){var n=Ee;Ee|=2;var r=px();(gt!==t||Tt!==e)&&(mr=null,yi(t,e));do try{sR();break}catch(s){fx(t,s)}while(!0);if(Ug(),Ee=n,xh.current=r,tt!==null)throw Error(H(261));return gt=null,Tt=0,at}function sR(){for(;tt!==null;)mx(tt)}function iR(){for(;tt!==null&&!RN();)mx(tt)}function mx(t){var e=_x(t.alternate,t,rn);t.memoizedProps=t.pendingProps,e===null?gx(t):tt=e,Zg.current=null}function gx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=JA(n,e),n!==null){n.flags&=32767,tt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{at=6,tt=null;return}}else if(n=XA(n,e,rn),n!==null){tt=n;return}if(e=e.sibling,e!==null){tt=e;return}tt=e=t}while(e!==null);at===0&&(at=5)}function li(t,e,n){var r=Se,s=vn.transition;try{vn.transition=null,Se=1,oR(t,e,n,r)}finally{vn.transition=s,Se=r}return null}function oR(t,e,n,r){do Co();while(fs!==null);if(Ee&6)throw Error(H(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(H(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(UN(t,i),t===gt&&(tt=gt=null,Tt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Eu||(Eu=!0,vx(ah,function(){return Co(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=vn.transition,vn.transition=null;var o=Se;Se=1;var a=Ee;Ee|=4,Zg.current=null,eR(t,n),ux(n,t),SA(Jp),ch=!!Xp,Jp=Xp=null,t.current=n,tR(n),PN(),Ee=a,Se=o,vn.transition=i}else t.current=n;if(Eu&&(Eu=!1,fs=t,Ch=s),i=t.pendingLanes,i===0&&(Es=null),jN(n.stateNode),Jt(t,Ye()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ih)throw Ih=!1,t=_m,_m=null,t;return Ch&1&&t.tag!==0&&Co(),i=t.pendingLanes,i&1?t===vm?gl++:(gl=0,vm=t):gl=0,Hs(),null}function Co(){if(fs!==null){var t=YT(Ch),e=vn.transition,n=Se;try{if(vn.transition=null,Se=16>t?16:t,fs===null)var r=!1;else{if(t=fs,fs=null,Ch=0,Ee&6)throw Error(H(331));var s=Ee;for(Ee|=4,Z=t.current;Z!==null;){var i=Z,o=i.child;if(Z.flags&16){var a=i.deletions;if(a!==null){for(var c=0;c<a.length;c++){var h=a[c];for(Z=h;Z!==null;){var d=Z;switch(d.tag){case 0:case 11:case 15:pl(8,d,i)}var p=d.child;if(p!==null)p.return=d,Z=p;else for(;Z!==null;){d=Z;var m=d.sibling,w=d.return;if(ax(d),d===h){Z=null;break}if(m!==null){m.return=w,Z=m;break}Z=w}}}var N=i.alternate;if(N!==null){var R=N.child;if(R!==null){N.child=null;do{var D=R.sibling;R.sibling=null,R=D}while(R!==null)}}Z=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,Z=o;else e:for(;Z!==null;){if(i=Z,i.flags&2048)switch(i.tag){case 0:case 11:case 15:pl(9,i,i.return)}var x=i.sibling;if(x!==null){x.return=i.return,Z=x;break e}Z=i.return}}var _=t.current;for(Z=_;Z!==null;){o=Z;var E=o.child;if(o.subtreeFlags&2064&&E!==null)E.return=o,Z=E;else e:for(o=_;Z!==null;){if(a=Z,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Cd(9,a)}}catch(z){qe(a,a.return,z)}if(a===o){Z=null;break e}var j=a.sibling;if(j!==null){j.return=a.return,Z=j;break e}Z=a.return}}if(Ee=s,Hs(),Qn&&typeof Qn.onPostCommitFiberRoot=="function")try{Qn.onPostCommitFiberRoot(yd,t)}catch{}r=!0}return r}finally{Se=n,vn.transition=e}}return!1}function bw(t,e,n){e=Vo(n,e),e=Y1(t,e,1),t=ws(t,e,1),e=Ut(),t!==null&&(pc(t,1,e),Jt(t,e))}function qe(t,e,n){if(t.tag===3)bw(t,t,n);else for(;e!==null;){if(e.tag===3){bw(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Es===null||!Es.has(r))){t=Vo(n,t),t=X1(e,t,1),e=ws(e,t,1),t=Ut(),e!==null&&(pc(e,1,t),Jt(e,t));break}}e=e.return}}function aR(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Ut(),t.pingedLanes|=t.suspendedLanes&n,gt===t&&(Tt&n)===n&&(at===4||at===3&&(Tt&130023424)===Tt&&500>Ye()-ty?yi(t,0):ey|=n),Jt(t,e)}function yx(t,e){e===0&&(t.mode&1?(e=hu,hu<<=1,!(hu&130023424)&&(hu=4194304)):e=1);var n=Ut();t=Rr(t,e),t!==null&&(pc(t,e,n),Jt(t,n))}function lR(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),yx(t,n)}function cR(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(H(314))}r!==null&&r.delete(e),yx(t,n)}var _x;_x=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Yt.current)Gt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Gt=!1,YA(t,e,n);Gt=!!(t.flags&131072)}else Gt=!1,Ve&&e.flags&1048576&&T1(e,gh,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;zu(t,e),t=e.pendingProps;var s=jo(e,Dt.current);Io(e,n),s=Kg(null,e,r,t,s,n);var i=Qg();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Xt(r)?(i=!0,ph(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,$g(e),s.updater=Id,e.stateNode=s,s._reactInternals=e,am(e,r,t,n),e=um(null,e,r,!0,i,n)):(e.tag=0,Ve&&i&&Og(e),Ft(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(zu(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=hR(r),t=Cn(r,t),s){case 0:e=cm(null,e,r,t,n);break e;case 1:e=Tw(null,e,r,t,n);break e;case 11:e=ww(null,e,r,t,n);break e;case 14:e=Ew(null,e,r,Cn(r.type,t),n);break e}throw Error(H(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Cn(r,s),cm(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Cn(r,s),Tw(t,e,r,s,n);case 3:e:{if(tx(e),t===null)throw Error(H(387));r=e.pendingProps,i=e.memoizedState,s=i.element,N1(t,e),vh(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Vo(Error(H(423)),e),e=xw(t,e,r,n,s);break e}else if(r!==s){s=Vo(Error(H(424)),e),e=xw(t,e,r,n,s);break e}else for(on=vs(e.stateNode.containerInfo.firstChild),ln=e,Ve=!0,kn=null,n=S1(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Mo(),r===s){e=Pr(t,e,n);break e}Ft(t,e,r,n)}e=e.child}return e;case 5:return A1(e),t===null&&sm(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Zp(r,s)?o=null:i!==null&&Zp(r,i)&&(e.flags|=32),ex(t,e),Ft(t,e,o,n),e.child;case 6:return t===null&&sm(e),null;case 13:return nx(t,e,n);case 4:return Wg(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Oo(e,null,r,n):Ft(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Cn(r,s),ww(t,e,r,s,n);case 7:return Ft(t,e,e.pendingProps,n),e.child;case 8:return Ft(t,e,e.pendingProps.children,n),e.child;case 12:return Ft(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,Pe(yh,r._currentValue),r._currentValue=o,i!==null)if(Mn(i.value,o)){if(i.children===s.children&&!Yt.current){e=Pr(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=Ir(-1,n&-n),c.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var d=h.pending;d===null?c.next=c:(c.next=d.next,d.next=c),h.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),im(i.return,n,e),a.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(H(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),im(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ft(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Io(e,n),s=En(s),r=r(s),e.flags|=1,Ft(t,e,r,n),e.child;case 14:return r=e.type,s=Cn(r,e.pendingProps),s=Cn(r.type,s),Ew(t,e,r,s,n);case 15:return J1(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Cn(r,s),zu(t,e),e.tag=1,Xt(r)?(t=!0,ph(e)):t=!1,Io(e,n),Q1(e,r,s),am(e,r,s,n),um(null,e,r,!0,t,n);case 19:return rx(t,e,n);case 22:return Z1(t,e,n)}throw Error(H(156,e.tag))};function vx(t,e){return HT(t,e)}function uR(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yn(t,e,n,r){return new uR(t,e,n,r)}function iy(t){return t=t.prototype,!(!t||!t.isReactComponent)}function hR(t){if(typeof t=="function")return iy(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Ig)return 11;if(t===Cg)return 14}return 2}function xs(t,e){var n=t.alternate;return n===null?(n=yn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Wu(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")iy(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case oo:return _i(n.children,s,i,e);case xg:o=8,s|=8;break;case Pp:return t=yn(12,n,e,s|2),t.elementType=Pp,t.lanes=i,t;case bp:return t=yn(13,n,e,s),t.elementType=bp,t.lanes=i,t;case Dp:return t=yn(19,n,e,s),t.elementType=Dp,t.lanes=i,t;case AT:return kd(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case kT:o=10;break e;case NT:o=9;break e;case Ig:o=11;break e;case Cg:o=14;break e;case ss:o=16,r=null;break e}throw Error(H(130,t==null?t:typeof t,""))}return e=yn(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function _i(t,e,n,r){return t=yn(7,t,r,e),t.lanes=n,t}function kd(t,e,n,r){return t=yn(22,t,r,e),t.elementType=AT,t.lanes=n,t.stateNode={isHidden:!1},t}function np(t,e,n){return t=yn(6,t,null,e),t.lanes=n,t}function rp(t,e,n){return e=yn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function dR(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Lf(0),this.expirationTimes=Lf(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Lf(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function oy(t,e,n,r,s,i,o,a,c){return t=new dR(t,e,n,a,c),e===1?(e=1,i===!0&&(e|=8)):e=0,i=yn(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$g(i),t}function fR(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:io,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function wx(t){if(!t)return bs;t=t._reactInternals;e:{if(Vi(t)!==t||t.tag!==1)throw Error(H(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Xt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(H(171))}if(t.tag===1){var n=t.type;if(Xt(n))return w1(t,n,e)}return e}function Ex(t,e,n,r,s,i,o,a,c){return t=oy(n,r,!0,t,s,i,o,a,c),t.context=wx(null),n=t.current,r=Ut(),s=Ts(n),i=Ir(r,s),i.callback=e??null,ws(n,i,s),t.current.lanes=s,pc(t,s,r),Jt(t,r),t}function Nd(t,e,n,r){var s=e.current,i=Ut(),o=Ts(s);return n=wx(n),e.context===null?e.context=n:e.pendingContext=n,e=Ir(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=ws(s,e,o),t!==null&&(bn(t,s,o,i),Vu(t,s,o)),o}function kh(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Dw(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ay(t,e){Dw(t,e),(t=t.alternate)&&Dw(t,e)}function pR(){return null}var Tx=typeof reportError=="function"?reportError:function(t){console.error(t)};function ly(t){this._internalRoot=t}Ad.prototype.render=ly.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(H(409));Nd(t,e,null,null)};Ad.prototype.unmount=ly.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ki(function(){Nd(null,t,null,null)}),e[Ar]=null}};function Ad(t){this._internalRoot=t}Ad.prototype.unstable_scheduleHydration=function(t){if(t){var e=ZT();t={blockedOn:null,target:t,priority:e};for(var n=0;n<os.length&&e!==0&&e<os[n].priority;n++);os.splice(n,0,t),n===0&&t1(t)}};function cy(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Rd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function jw(){}function mR(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=kh(o);i.call(h)}}var o=Ex(e,r,t,0,null,!1,!1,"",jw);return t._reactRootContainer=o,t[Ar]=o.current,Ll(t.nodeType===8?t.parentNode:t),ki(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var a=r;r=function(){var h=kh(c);a.call(h)}}var c=oy(t,0,!1,null,null,!1,!1,"",jw);return t._reactRootContainer=c,t[Ar]=c.current,Ll(t.nodeType===8?t.parentNode:t),ki(function(){Nd(e,c,n,r)}),c}function Pd(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var a=s;s=function(){var c=kh(o);a.call(c)}}Nd(e,o,t,s)}else o=mR(n,e,t,s,r);return kh(o)}XT=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ja(e.pendingLanes);n!==0&&(Ng(e,n|1),Jt(e,Ye()),!(Ee&6)&&(Fo=Ye()+500,Hs()))}break;case 13:ki(function(){var r=Rr(t,1);if(r!==null){var s=Ut();bn(r,t,1,s)}}),ay(t,1)}};Ag=function(t){if(t.tag===13){var e=Rr(t,134217728);if(e!==null){var n=Ut();bn(e,t,134217728,n)}ay(t,134217728)}};JT=function(t){if(t.tag===13){var e=Ts(t),n=Rr(t,e);if(n!==null){var r=Ut();bn(n,t,e,r)}ay(t,e)}};ZT=function(){return Se};e1=function(t,e){var n=Se;try{return Se=t,e()}finally{Se=n}};$p=function(t,e,n){switch(e){case"input":if(Op(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=Ed(r);if(!s)throw Error(H(90));PT(r),Op(r,s)}}}break;case"textarea":DT(t,n);break;case"select":e=n.value,e!=null&&wo(t,!!n.multiple,e,!1)}};UT=ny;zT=ki;var gR={usingClientEntryPoint:!1,Events:[gc,uo,Ed,VT,FT,ny]},qa={findFiberByHostInstance:hi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},yR={bundleType:qa.bundleType,version:qa.version,rendererPackageName:qa.rendererPackageName,rendererConfig:qa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=WT(t),t===null?null:t.stateNode},findFiberByHostInstance:qa.findFiberByHostInstance||pR,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Tu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Tu.isDisabled&&Tu.supportsFiber)try{yd=Tu.inject(yR),Qn=Tu}catch{}}hn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gR;hn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!cy(e))throw Error(H(200));return fR(t,e,null,n)};hn.createRoot=function(t,e){if(!cy(t))throw Error(H(299));var n=!1,r="",s=Tx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=oy(t,1,!1,null,null,n,!1,r,s),t[Ar]=e.current,Ll(t.nodeType===8?t.parentNode:t),new ly(e)};hn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(H(188)):(t=Object.keys(t).join(","),Error(H(268,t)));return t=WT(e),t=t===null?null:t.stateNode,t};hn.flushSync=function(t){return ki(t)};hn.hydrate=function(t,e,n){if(!Rd(e))throw Error(H(200));return Pd(null,t,e,!0,n)};hn.hydrateRoot=function(t,e,n){if(!cy(t))throw Error(H(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=Tx;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Ex(e,null,t,1,n??null,s,!1,i,o),t[Ar]=e.current,Ll(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new Ad(e)};hn.render=function(t,e,n){if(!Rd(e))throw Error(H(200));return Pd(null,t,e,!1,n)};hn.unmountComponentAtNode=function(t){if(!Rd(t))throw Error(H(40));return t._reactRootContainer?(ki(function(){Pd(null,null,t,!1,function(){t._reactRootContainer=null,t[Ar]=null})}),!0):!1};hn.unstable_batchedUpdates=ny;hn.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Rd(n))throw Error(H(200));if(t==null||t._reactInternals===void 0)throw Error(H(38));return Pd(t,e,n,!1,r)};hn.version="18.3.1-next-f1338f8080-20240426";function xx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xx)}catch(t){console.error(t)}}xx(),xT.exports=hn;var _R=xT.exports,Mw=_R;Ap.createRoot=Mw.createRoot,Ap.hydrateRoot=Mw.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Hl(){return Hl=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Hl.apply(this,arguments)}var ps;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(ps||(ps={}));const Ow="popstate";function vR(t){t===void 0&&(t={});function e(r,s){let{pathname:i,search:o,hash:a}=r.location;return Tm("",{pathname:i,search:o,hash:a},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:Nh(s)}return ER(e,n,null,t)}function Be(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Ix(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function wR(){return Math.random().toString(36).substr(2,8)}function Lw(t,e){return{usr:t.state,key:t.key,idx:e}}function Tm(t,e,n,r){return n===void 0&&(n=null),Hl({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?ra(e):e,{state:n,key:e&&e.key||r||wR()})}function Nh(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function ra(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function ER(t,e,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,a=ps.Pop,c=null,h=d();h==null&&(h=0,o.replaceState(Hl({},o.state,{idx:h}),""));function d(){return(o.state||{idx:null}).idx}function p(){a=ps.Pop;let D=d(),x=D==null?null:D-h;h=D,c&&c({action:a,location:R.location,delta:x})}function m(D,x){a=ps.Push;let _=Tm(R.location,D,x);h=d()+1;let E=Lw(_,h),j=R.createHref(_);try{o.pushState(E,"",j)}catch(z){if(z instanceof DOMException&&z.name==="DataCloneError")throw z;s.location.assign(j)}i&&c&&c({action:a,location:R.location,delta:1})}function w(D,x){a=ps.Replace;let _=Tm(R.location,D,x);h=d();let E=Lw(_,h),j=R.createHref(_);o.replaceState(E,"",j),i&&c&&c({action:a,location:R.location,delta:0})}function N(D){let x=s.location.origin!=="null"?s.location.origin:s.location.href,_=typeof D=="string"?D:Nh(D);return _=_.replace(/ $/,"%20"),Be(x,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,x)}let R={get action(){return a},get location(){return t(s,o)},listen(D){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Ow,p),c=D,()=>{s.removeEventListener(Ow,p),c=null}},createHref(D){return e(s,D)},createURL:N,encodeLocation(D){let x=N(D);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:m,replace:w,go(D){return o.go(D)}};return R}var Vw;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Vw||(Vw={}));function TR(t,e,n){return n===void 0&&(n="/"),xR(t,e,n)}function xR(t,e,n,r){let s=typeof e=="string"?ra(e):e,i=Uo(s.pathname||"/",n);if(i==null)return null;let o=Cx(t);IR(o);let a=null;for(let c=0;a==null&&c<o.length;++c){let h=MR(i);a=DR(o[c],h)}return a}function Cx(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,a)=>{let c={relativePath:a===void 0?i.path||"":a,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(Be(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let h=Is([r,c.relativePath]),d=n.concat(c);i.children&&i.children.length>0&&(Be(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),Cx(i.children,e,d,h)),!(i.path==null&&!i.index)&&e.push({path:h,score:PR(h,i.index),routesMeta:d})};return t.forEach((i,o)=>{var a;if(i.path===""||!((a=i.path)!=null&&a.includes("?")))s(i,o);else for(let c of Sx(i.path))s(i,o,c)}),e}function Sx(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=Sx(r.join("/")),a=[];return a.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&a.push(...o),a.map(c=>t.startsWith("/")&&c===""?"/":c)}function IR(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:bR(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const CR=/^:[\w-]+$/,SR=3,kR=2,NR=1,AR=10,RR=-2,Fw=t=>t==="*";function PR(t,e){let n=t.split("/"),r=n.length;return n.some(Fw)&&(r+=RR),e&&(r+=kR),n.filter(s=>!Fw(s)).reduce((s,i)=>s+(CR.test(i)?SR:i===""?NR:AR),r)}function bR(t,e){return t.length===e.length&&t.slice(0,-1).every((r,s)=>r===e[s])?t[t.length-1]-e[e.length-1]:0}function DR(t,e,n){let{routesMeta:r}=t,s={},i="/",o=[];for(let a=0;a<r.length;++a){let c=r[a],h=a===r.length-1,d=i==="/"?e:e.slice(i.length)||"/",p=xm({path:c.relativePath,caseSensitive:c.caseSensitive,end:h},d),m=c.route;if(!p)return null;Object.assign(s,p.params),o.push({params:s,pathname:Is([i,p.pathname]),pathnameBase:FR(Is([i,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(i=Is([i,p.pathnameBase]))}return o}function xm(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=jR(t.path,t.caseSensitive,t.end),s=e.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),a=s.slice(1);return{params:r.reduce((h,d,p)=>{let{paramName:m,isOptional:w}=d;if(m==="*"){let R=a[p]||"";o=i.slice(0,i.length-R.length).replace(/(.)\/+$/,"$1")}const N=a[p];return w&&!N?h[m]=void 0:h[m]=(N||"").replace(/%2F/g,"/"),h},{}),pathname:i,pathnameBase:o,pattern:t}}function jR(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Ix(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,c)=>(r.push({paramName:a,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function MR(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Ix(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Uo(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}function OR(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:s=""}=typeof t=="string"?ra(t):t;return{pathname:n?n.startsWith("/")?n:LR(n,e):e,search:UR(r),hash:zR(s)}}function LR(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function sp(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function VR(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function uy(t,e){let n=VR(t);return e?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function hy(t,e,n,r){r===void 0&&(r=!1);let s;typeof t=="string"?s=ra(t):(s=Hl({},t),Be(!s.pathname||!s.pathname.includes("?"),sp("?","pathname","search",s)),Be(!s.pathname||!s.pathname.includes("#"),sp("#","pathname","hash",s)),Be(!s.search||!s.search.includes("#"),sp("#","search","hash",s)));let i=t===""||s.pathname==="",o=i?"/":s.pathname,a;if(o==null)a=n;else{let p=e.length-1;if(!r&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),p-=1;s.pathname=m.join("/")}a=p>=0?e[p]:"/"}let c=OR(s,a),h=o&&o!=="/"&&o.endsWith("/"),d=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(h||d)&&(c.pathname+="/"),c}const Is=t=>t.join("/").replace(/\/\/+/g,"/"),FR=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),UR=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,zR=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function BR(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const kx=["post","put","patch","delete"];new Set(kx);const $R=["get",...kx];new Set($R);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Gl(){return Gl=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Gl.apply(this,arguments)}const bd=b.createContext(null),Nx=b.createContext(null),Ur=b.createContext(null),Dd=b.createContext(null),ir=b.createContext({outlet:null,matches:[],isDataRoute:!1}),Ax=b.createContext(null);function WR(t,e){let{relative:n}=e===void 0?{}:e;sa()||Be(!1);let{basename:r,navigator:s}=b.useContext(Ur),{hash:i,pathname:o,search:a}=jd(t,{relative:n}),c=o;return r!=="/"&&(c=o==="/"?r:Is([r,o])),s.createHref({pathname:c,search:a,hash:i})}function sa(){return b.useContext(Dd)!=null}function ia(){return sa()||Be(!1),b.useContext(Dd).location}function Rx(t){b.useContext(Ur).static||b.useLayoutEffect(t)}function Fi(){let{isDataRoute:t}=b.useContext(ir);return t?iP():qR()}function qR(){sa()||Be(!1);let t=b.useContext(bd),{basename:e,future:n,navigator:r}=b.useContext(Ur),{matches:s}=b.useContext(ir),{pathname:i}=ia(),o=JSON.stringify(uy(s,n.v7_relativeSplatPath)),a=b.useRef(!1);return Rx(()=>{a.current=!0}),b.useCallback(function(h,d){if(d===void 0&&(d={}),!a.current)return;if(typeof h=="number"){r.go(h);return}let p=hy(h,JSON.parse(o),i,d.relative==="path");t==null&&e!=="/"&&(p.pathname=p.pathname==="/"?e:Is([e,p.pathname])),(d.replace?r.replace:r.push)(p,d.state,d)},[e,r,o,i,t])}const HR=b.createContext(null);function GR(t){let e=b.useContext(ir).outlet;return e&&b.createElement(HR.Provider,{value:t},e)}function Px(){let{matches:t}=b.useContext(ir),e=t[t.length-1];return e?e.params:{}}function jd(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=b.useContext(Ur),{matches:s}=b.useContext(ir),{pathname:i}=ia(),o=JSON.stringify(uy(s,r.v7_relativeSplatPath));return b.useMemo(()=>hy(t,JSON.parse(o),i,n==="path"),[t,o,i,n])}function KR(t,e){return QR(t,e)}function QR(t,e,n,r){sa()||Be(!1);let{navigator:s}=b.useContext(Ur),{matches:i}=b.useContext(ir),o=i[i.length-1],a=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let h=ia(),d;if(e){var p;let D=typeof e=="string"?ra(e):e;c==="/"||(p=D.pathname)!=null&&p.startsWith(c)||Be(!1),d=D}else d=h;let m=d.pathname||"/",w=m;if(c!=="/"){let D=c.replace(/^\//,"").split("/");w="/"+m.replace(/^\//,"").split("/").slice(D.length).join("/")}let N=TR(t,{pathname:w}),R=eP(N&&N.map(D=>Object.assign({},D,{params:Object.assign({},a,D.params),pathname:Is([c,s.encodeLocation?s.encodeLocation(D.pathname).pathname:D.pathname]),pathnameBase:D.pathnameBase==="/"?c:Is([c,s.encodeLocation?s.encodeLocation(D.pathnameBase).pathname:D.pathnameBase])})),i,n,r);return e&&R?b.createElement(Dd.Provider,{value:{location:Gl({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:ps.Pop}},R):R}function YR(){let t=sP(),e=BR(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},e),n?b.createElement("pre",{style:s},n):null,null)}const XR=b.createElement(YR,null);class JR extends b.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?b.createElement(ir.Provider,{value:this.props.routeContext},b.createElement(Ax.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ZR(t){let{routeContext:e,match:n,children:r}=t,s=b.useContext(bd);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),b.createElement(ir.Provider,{value:e},r)}function eP(t,e,n,r){var s;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var i;if(!n)return null;if(n.errors)t=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(s=n)==null?void 0:s.errors;if(a!=null){let d=o.findIndex(p=>p.route.id&&(a==null?void 0:a[p.route.id])!==void 0);d>=0||Be(!1),o=o.slice(0,Math.min(o.length,d+1))}let c=!1,h=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<o.length;d++){let p=o[d];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(h=d),p.route.id){let{loaderData:m,errors:w}=n,N=p.route.loader&&m[p.route.id]===void 0&&(!w||w[p.route.id]===void 0);if(p.route.lazy||N){c=!0,h>=0?o=o.slice(0,h+1):o=[o[0]];break}}}return o.reduceRight((d,p,m)=>{let w,N=!1,R=null,D=null;n&&(w=a&&p.route.id?a[p.route.id]:void 0,R=p.route.errorElement||XR,c&&(h<0&&m===0?(oP("route-fallback"),N=!0,D=null):h===m&&(N=!0,D=p.route.hydrateFallbackElement||null)));let x=e.concat(o.slice(0,m+1)),_=()=>{let E;return w?E=R:N?E=D:p.route.Component?E=b.createElement(p.route.Component,null):p.route.element?E=p.route.element:E=d,b.createElement(ZR,{match:p,routeContext:{outlet:d,matches:x,isDataRoute:n!=null},children:E})};return n&&(p.route.ErrorBoundary||p.route.errorElement||m===0)?b.createElement(JR,{location:n.location,revalidation:n.revalidation,component:R,error:w,children:_(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):_()},null)}var bx=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(bx||{}),Dx=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Dx||{});function tP(t){let e=b.useContext(bd);return e||Be(!1),e}function nP(t){let e=b.useContext(Nx);return e||Be(!1),e}function rP(t){let e=b.useContext(ir);return e||Be(!1),e}function jx(t){let e=rP(),n=e.matches[e.matches.length-1];return n.route.id||Be(!1),n.route.id}function sP(){var t;let e=b.useContext(Ax),n=nP(),r=jx();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function iP(){let{router:t}=tP(bx.UseNavigateStable),e=jx(Dx.UseNavigateStable),n=b.useRef(!1);return Rx(()=>{n.current=!0}),b.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,Gl({fromRouteId:e},i)))},[t,e])}const Uw={};function oP(t,e,n){Uw[t]||(Uw[t]=!0)}function aP(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function xu(t){let{to:e,replace:n,state:r,relative:s}=t;sa()||Be(!1);let{future:i,static:o}=b.useContext(Ur),{matches:a}=b.useContext(ir),{pathname:c}=ia(),h=Fi(),d=hy(e,uy(a,i.v7_relativeSplatPath),c,s==="path"),p=JSON.stringify(d);return b.useEffect(()=>h(JSON.parse(p),{replace:n,state:r,relative:s}),[h,p,s,n,r]),null}function lP(t){return GR(t.context)}function Vt(t){Be(!1)}function cP(t){let{basename:e="/",children:n=null,location:r,navigationType:s=ps.Pop,navigator:i,static:o=!1,future:a}=t;sa()&&Be(!1);let c=e.replace(/^\/*/,"/"),h=b.useMemo(()=>({basename:c,navigator:i,static:o,future:Gl({v7_relativeSplatPath:!1},a)}),[c,a,i,o]);typeof r=="string"&&(r=ra(r));let{pathname:d="/",search:p="",hash:m="",state:w=null,key:N="default"}=r,R=b.useMemo(()=>{let D=Uo(d,c);return D==null?null:{location:{pathname:D,search:p,hash:m,state:w,key:N},navigationType:s}},[c,d,p,m,w,N,s]);return R==null?null:b.createElement(Ur.Provider,{value:h},b.createElement(Dd.Provider,{children:n,value:R}))}function uP(t){let{children:e,location:n}=t;return KR(Im(e),n)}new Promise(()=>{});function Im(t,e){e===void 0&&(e=[]);let n=[];return b.Children.forEach(t,(r,s)=>{if(!b.isValidElement(r))return;let i=[...e,s];if(r.type===b.Fragment){n.push.apply(n,Im(r.props.children,i));return}r.type!==Vt&&Be(!1),!r.props.index||!r.props.children||Be(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Im(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ah(){return Ah=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ah.apply(this,arguments)}function Mx(t,e){if(t==null)return{};var n={},r=Object.keys(t),s,i;for(i=0;i<r.length;i++)s=r[i],!(e.indexOf(s)>=0)&&(n[s]=t[s]);return n}function hP(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function dP(t,e){return t.button===0&&(!e||e==="_self")&&!hP(t)}const fP=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],pP=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],mP="6";try{window.__reactRouterVersion=mP}catch{}const gP=b.createContext({isTransitioning:!1}),yP="startTransition",zw=aN[yP];function _P(t){let{basename:e,children:n,future:r,window:s}=t,i=b.useRef();i.current==null&&(i.current=vR({window:s,v5Compat:!0}));let o=i.current,[a,c]=b.useState({action:o.action,location:o.location}),{v7_startTransition:h}=r||{},d=b.useCallback(p=>{h&&zw?zw(()=>c(p)):c(p)},[c,h]);return b.useLayoutEffect(()=>o.listen(d),[o,d]),b.useEffect(()=>aP(r),[r]),b.createElement(cP,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:r})}const vP=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",wP=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,EP=b.forwardRef(function(e,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:a,target:c,to:h,preventScrollReset:d,viewTransition:p}=e,m=Mx(e,fP),{basename:w}=b.useContext(Ur),N,R=!1;if(typeof h=="string"&&wP.test(h)&&(N=h,vP))try{let E=new URL(window.location.href),j=h.startsWith("//")?new URL(E.protocol+h):new URL(h),z=Uo(j.pathname,w);j.origin===E.origin&&z!=null?h=z+j.search+j.hash:R=!0}catch{}let D=WR(h,{relative:s}),x=xP(h,{replace:o,state:a,target:c,preventScrollReset:d,relative:s,viewTransition:p});function _(E){r&&r(E),E.defaultPrevented||x(E)}return b.createElement("a",Ah({},m,{href:N||D,onClick:R||i?r:_,ref:n,target:c}))}),Bw=b.forwardRef(function(e,n){let{"aria-current":r="page",caseSensitive:s=!1,className:i="",end:o=!1,style:a,to:c,viewTransition:h,children:d}=e,p=Mx(e,pP),m=jd(c,{relative:p.relative}),w=ia(),N=b.useContext(Nx),{navigator:R,basename:D}=b.useContext(Ur),x=N!=null&&IP(m)&&h===!0,_=R.encodeLocation?R.encodeLocation(m).pathname:m.pathname,E=w.pathname,j=N&&N.navigation&&N.navigation.location?N.navigation.location.pathname:null;s||(E=E.toLowerCase(),j=j?j.toLowerCase():null,_=_.toLowerCase()),j&&D&&(j=Uo(j,D)||j);const z=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let W=E===_||!o&&E.startsWith(_)&&E.charAt(z)==="/",T=j!=null&&(j===_||!o&&j.startsWith(_)&&j.charAt(_.length)==="/"),v={isActive:W,isPending:T,isTransitioning:x},I=W?r:void 0,C;typeof i=="function"?C=i(v):C=[i,W?"active":null,T?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let A=typeof a=="function"?a(v):a;return b.createElement(EP,Ah({},p,{"aria-current":I,className:C,ref:n,style:A,to:c,viewTransition:h}),typeof d=="function"?d(v):d)});var Cm;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Cm||(Cm={}));var $w;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})($w||($w={}));function TP(t){let e=b.useContext(bd);return e||Be(!1),e}function xP(t,e){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:a}=e===void 0?{}:e,c=Fi(),h=ia(),d=jd(t,{relative:o});return b.useCallback(p=>{if(dP(p,n)){p.preventDefault();let m=r!==void 0?r:Nh(h)===Nh(d);c(t,{replace:m,state:s,preventScrollReset:i,relative:o,viewTransition:a})}},[h,c,d,r,s,n,t,i,o,a])}function IP(t,e){e===void 0&&(e={});let n=b.useContext(gP);n==null&&Be(!1);let{basename:r}=TP(Cm.useViewTransitionState),s=jd(t,{relative:e.relative});if(!n.isTransitioning)return!1;let i=Uo(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Uo(n.nextLocation.pathname,r)||n.nextLocation.pathname;return xm(s.pathname,o)!=null||xm(s.pathname,i)!=null}const CP=()=>{};var Ww={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ox={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G=function(t,e){if(!t)throw oa(e)},oa=function(t){return new Error("Firebase Database ("+Ox.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lx=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},SP=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},dy={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,h=c?t[s+2]:0,d=i>>2,p=(i&3)<<4|a>>4;let m=(a&15)<<2|h>>6,w=h&63;c||(w=64,o||(m=64)),r.push(n[d],n[p],n[m],n[w])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Lx(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):SP(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||h==null||p==null)throw new kP;const m=i<<2|a>>4;if(r.push(m),h!==64){const w=a<<4&240|h>>2;if(r.push(w),p!==64){const N=h<<6&192|p;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class kP extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vx=function(t){const e=Lx(t);return dy.encodeByteArray(e,!0)},Rh=function(t){return Vx(t).replace(/\./g,"")},Ph=function(t){try{return dy.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NP(t){return Fx(void 0,t)}function Fx(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!AP(n)||(t[n]=Fx(t[n],e[n]));return t}function AP(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RP(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PP=()=>RP().__FIREBASE_DEFAULTS__,bP=()=>{if(typeof process>"u"||typeof Ww>"u")return;const t=Ww.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},DP=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ph(t[1]);return e&&JSON.parse(e)},Md=()=>{try{return CP()||PP()||bP()||DP()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ux=t=>{var e,n;return(n=(e=Md())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},zx=t=>{const e=Ux(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Bx=()=>{var t;return(t=Md())==null?void 0:t.config},$x=t=>{var e;return(e=Md())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function fy(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wx(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Rh(JSON.stringify(n)),Rh(JSON.stringify(o)),""].join(".")}const yl={};function jP(){const t={prod:[],emulator:[]};for(const e of Object.keys(yl))yl[e]?t.emulator.push(e):t.prod.push(e);return t}function MP(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let qw=!1;function py(t,e){if(typeof window>"u"||typeof document>"u"||!Gs(window.location.host)||yl[t]===e||yl[t]||qw)return;yl[t]=e;function n(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=jP().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function a(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,w){m.setAttribute("width","24"),m.setAttribute("id",w),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{qw=!0,o()},m}function d(m,w){m.setAttribute("id",w),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=MP(r),w=n("text"),N=document.getElementById(w)||document.createElement("span"),R=n("learnmore"),D=document.getElementById(R)||document.createElement("a"),x=n("preprendIcon"),_=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const E=m.element;a(E),d(D,R);const j=h();c(_,x),E.append(_,N,D,j),document.body.appendChild(E)}i?(N.innerText="Preview backend disconnected.",_.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(_.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,N.innerText="Preview backend running in this workspace."),N.setAttribute("id",w)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function my(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(jt())}function OP(){var e;const t=(e=Md())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function LP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function VP(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function qx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function FP(){const t=jt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function UP(){return Ox.NODE_ADMIN===!0}function zP(){return!OP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function BP(){try{return typeof indexedDB=="object"}catch{return!1}}function $P(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WP="FirebaseError";class zr extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=WP,Object.setPrototypeOf(this,zr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_c.prototype.create)}}class _c{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?qP(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new zr(s,a,r)}}function qP(t,e){return t.replace(HP,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const HP=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(t){return JSON.parse(t)}function mt(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hx=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=Kl(Ph(i[0])||""),n=Kl(Ph(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},GP=function(t){const e=Hx(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},KP=function(t){const e=Hx(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function zo(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function bh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Dh(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function Ds(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Hw(i)&&Hw(o)){if(!Ds(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Hw(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function el(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function tl(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QP{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let p=0;p<16;p++)r[p]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let p=16;p<80;p++){const m=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(m<<1|m>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],h,d;for(let p=0;p<80;p++){p<40?p<20?(h=a^i&(o^a),d=1518500249):(h=i^o^a,d=1859775393):p<60?(h=i&o|a&(i|o),d=2400959708):(h=i^o^a,d=3395469782);const m=(s<<5|s>>>27)+h+c+d+r[p]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=s,s=m}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function YP(t,e){const n=new XP(t,e);return n.subscribe.bind(n)}class XP{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");JP(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=ip),s.error===void 0&&(s.error=ip),s.complete===void 0&&(s.complete=ip);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function JP(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ip(){}function Bo(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZP=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,G(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Od=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(t){return t&&t._delegate?t._delegate:t}class js{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new yr;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nb(e))try{this.getOrInitializeService({instanceIdentifier:ci})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ci){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ci){return this.instances.has(e)}getOptions(e=ci){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:tb(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ci){return this.component?this.component.multipleInstances?e:ci:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function tb(t){return t===ci?void 0:t}function nb(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new eb(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ge||(ge={}));const sb={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},ib=ge.INFO,ob={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},ab=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=ob[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ld{constructor(e){this.name=e,this._logLevel=ib,this._logHandler=ab,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const lb=(t,e)=>e.some(n=>t instanceof n);let Gw,Kw;function cb(){return Gw||(Gw=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ub(){return Kw||(Kw=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Gx=new WeakMap,Sm=new WeakMap,Kx=new WeakMap,op=new WeakMap,gy=new WeakMap;function hb(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Cs(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Gx.set(n,t)}).catch(()=>{}),gy.set(e,t),e}function db(t){if(Sm.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Sm.set(t,e)}let km={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Sm.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Kx.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Cs(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function fb(t){km=t(km)}function pb(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ap(this),e,...n);return Kx.set(r,e.sort?e.sort():[e]),Cs(r)}:ub().includes(t)?function(...e){return t.apply(ap(this),e),Cs(Gx.get(this))}:function(...e){return Cs(t.apply(ap(this),e))}}function mb(t){return typeof t=="function"?pb(t):(t instanceof IDBTransaction&&db(t),lb(t,cb())?new Proxy(t,km):t)}function Cs(t){if(t instanceof IDBRequest)return hb(t);if(op.has(t))return op.get(t);const e=mb(t);return e!==t&&(op.set(t,e),gy.set(e,t)),e}const ap=t=>gy.get(t);function gb(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=Cs(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Cs(o.result),c.oldVersion,c.newVersion,Cs(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),a}const yb=["get","getKey","getAll","getAllKeys","count"],_b=["put","add","delete","clear"],lp=new Map;function Qw(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(lp.get(e))return lp.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=_b.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||yb.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(a.shift())),(await Promise.all([h[n](...a),s&&c.done]))[0]};return lp.set(e,i),i}fb(t=>({...t,get:(e,n,r)=>Qw(e,n)||t.get(e,n,r),has:(e,n)=>!!Qw(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(wb(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function wb(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Nm="@firebase/app",Yw="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const br=new Ld("@firebase/app"),Eb="@firebase/app-compat",Tb="@firebase/analytics-compat",xb="@firebase/analytics",Ib="@firebase/app-check-compat",Cb="@firebase/app-check",Sb="@firebase/auth",kb="@firebase/auth-compat",Nb="@firebase/database",Ab="@firebase/data-connect",Rb="@firebase/database-compat",Pb="@firebase/functions",bb="@firebase/functions-compat",Db="@firebase/installations",jb="@firebase/installations-compat",Mb="@firebase/messaging",Ob="@firebase/messaging-compat",Lb="@firebase/performance",Vb="@firebase/performance-compat",Fb="@firebase/remote-config",Ub="@firebase/remote-config-compat",zb="@firebase/storage",Bb="@firebase/storage-compat",$b="@firebase/firestore",Wb="@firebase/ai",qb="@firebase/firestore-compat",Hb="firebase",Gb="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am="[DEFAULT]",Kb={[Nm]:"fire-core",[Eb]:"fire-core-compat",[xb]:"fire-analytics",[Tb]:"fire-analytics-compat",[Cb]:"fire-app-check",[Ib]:"fire-app-check-compat",[Sb]:"fire-auth",[kb]:"fire-auth-compat",[Nb]:"fire-rtdb",[Ab]:"fire-data-connect",[Rb]:"fire-rtdb-compat",[Pb]:"fire-fn",[bb]:"fire-fn-compat",[Db]:"fire-iid",[jb]:"fire-iid-compat",[Mb]:"fire-fcm",[Ob]:"fire-fcm-compat",[Lb]:"fire-perf",[Vb]:"fire-perf-compat",[Fb]:"fire-rc",[Ub]:"fire-rc-compat",[zb]:"fire-gcs",[Bb]:"fire-gcs-compat",[$b]:"fire-fst",[qb]:"fire-fst-compat",[Wb]:"fire-vertex","fire-js":"fire-js",[Hb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh=new Map,Qb=new Map,Rm=new Map;function Xw(t,e){try{t.container.addComponent(e)}catch(n){br.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ni(t){const e=t.name;if(Rm.has(e))return br.debug(`There were multiple attempts to register component ${e}.`),!1;Rm.set(e,t);for(const n of jh.values())Xw(n,t);for(const n of Qb.values())Xw(n,t);return!0}function Vd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function sn(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ss=new _c("app","Firebase",Yb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xb{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new js("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ss.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=Gb;function Qx(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Am,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Ss.create("bad-app-name",{appName:String(s)});if(n||(n=Bx()),!n)throw Ss.create("no-options");const i=jh.get(s);if(i){if(Ds(n,i.options)&&Ds(r,i.config))return i;throw Ss.create("duplicate-app",{appName:s})}const o=new rb(s);for(const c of Rm.values())o.addComponent(c);const a=new Xb(n,r,o);return jh.set(s,a),a}function yy(t=Am){const e=jh.get(t);if(!e&&t===Am&&Bx())return Qx();if(!e)throw Ss.create("no-app",{appName:t});return e}function Xn(t,e,n){let r=Kb[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),br.warn(o.join(" "));return}Ni(new js(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jb="firebase-heartbeat-database",Zb=1,Ql="firebase-heartbeat-store";let cp=null;function Yx(){return cp||(cp=gb(Jb,Zb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ql)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ss.create("idb-open",{originalErrorMessage:t.message})})),cp}async function e2(t){try{const n=(await Yx()).transaction(Ql),r=await n.objectStore(Ql).get(Xx(t));return await n.done,r}catch(e){if(e instanceof zr)br.warn(e.message);else{const n=Ss.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});br.warn(n.message)}}}async function Jw(t,e){try{const r=(await Yx()).transaction(Ql,"readwrite");await r.objectStore(Ql).put(e,Xx(t)),await r.done}catch(n){if(n instanceof zr)br.warn(n.message);else{const r=Ss.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});br.warn(r.message)}}}function Xx(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t2=1024,n2=30;class r2{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new i2(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Zw();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>n2){const o=o2(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){br.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Zw(),{heartbeatsToSend:r,unsentEntries:s}=s2(this._heartbeatsCache.heartbeats),i=Rh(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return br.warn(n),""}}}function Zw(){return new Date().toISOString().substring(0,10)}function s2(t,e=t2){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),eE(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),eE(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class i2{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return BP()?$P().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await e2(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Jw(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Jw(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function eE(t){return Rh(JSON.stringify({version:2,heartbeats:t})).length}function o2(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a2(t){Ni(new js("platform-logger",e=>new vb(e),"PRIVATE")),Ni(new js("heartbeat",e=>new r2(e),"PRIVATE")),Xn(Nm,Yw,t),Xn(Nm,Yw,"esm2020"),Xn("fire-js","")}a2("");function Jx(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const l2=Jx,Zx=new _c("auth","Firebase",Jx());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=new Ld("@firebase/auth");function c2(t,...e){Mh.logLevel<=ge.WARN&&Mh.warn(`Auth (${Ui}): ${t}`,...e)}function qu(t,...e){Mh.logLevel<=ge.ERROR&&Mh.error(`Auth (${Ui}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(t,...e){throw _y(t,...e)}function Jn(t,...e){return _y(t,...e)}function eI(t,e,n){const r={...l2(),[e]:n};return new _c("auth","Firebase",r).create(e,{appName:t.name})}function Cr(t){return eI(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _y(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Zx.create(t,...e)}function se(t,e,...n){if(!t)throw _y(e,...n)}function wr(t){const e="INTERNAL ASSERTION FAILED: "+t;throw qu(e),new Error(e)}function Dr(t,e){t||wr(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function u2(){return tE()==="http:"||tE()==="https:"}function tE(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h2(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(u2()||VP()||"connection"in navigator)?navigator.onLine:!0}function d2(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,n){this.shortDelay=e,this.longDelay=n,Dr(n>e,"Short delay should be less than long delay!"),this.isMobile=my()||qx()}get(){return h2()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vy(t,e){Dr(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f2={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p2=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],m2=new vc(3e4,6e4);function Ks(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Br(t,e,n,r,s={}){return nI(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=aa({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:c,...i};return LP()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&Gs(t.emulatorConfig.host)&&(h.credentials="include"),tI.fetch()(await rI(t,t.config.apiHost,n,a),h)})}async function nI(t,e,n){t._canInitEmulator=!1;const r={...f2,...e};try{const s=new y2(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Iu(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,h]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Iu(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Iu(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Iu(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw eI(t,d,h);On(t,d)}}catch(s){if(s instanceof zr)throw s;On(t,"network-request-failed",{message:String(s)})}}async function wc(t,e,n,r,s={}){const i=await Br(t,e,n,r,s);return"mfaPendingCredential"in i&&On(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function rI(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?vy(t.config,s):`${t.config.apiScheme}://${s}`;return p2.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function g2(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class y2{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Jn(this.auth,"network-request-failed")),m2.get())})}}function Iu(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Jn(t,e,r);return s.customData._tokenResponse=n,s}function nE(t){return t!==void 0&&t.enterprise!==void 0}class _2{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return g2(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function v2(t,e){return Br(t,"GET","/v2/recaptchaConfig",Ks(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w2(t,e){return Br(t,"POST","/v1/accounts:delete",e)}async function Oh(t,e){return Br(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function E2(t,e=!1){const n=be(t),r=await n.getIdToken(e),s=wy(r);se(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:_l(up(s.auth_time)),issuedAtTime:_l(up(s.iat)),expirationTime:_l(up(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function up(t){return Number(t)*1e3}function wy(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return qu("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ph(n);return s?JSON.parse(s):(qu("Failed to decode base64 JWT payload"),null)}catch(s){return qu("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function rE(t){const e=wy(t);return se(e,"internal-error"),se(typeof e.exp<"u","internal-error"),se(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $o(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof zr&&T2(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function T2({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x2{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=_l(this.lastLoginAt),this.creationTime=_l(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lh(t){var p;const e=t.auth,n=await t.getIdToken(),r=await $o(t,Oh(e,{idToken:n}));se(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?sI(s.providerUserInfo):[],o=C2(t.providerData,i),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(o!=null&&o.length),h=a?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new bm(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function I2(t){const e=be(t);await Lh(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function C2(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function sI(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S2(t,e){const n=await nI(t,{},async()=>{const r=aa({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await rI(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&Gs(t.emulatorConfig.host)&&(c.credentials="include"),tI.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function k2(t,e){return Br(t,"POST","/v2/accounts:revokeToken",Ks(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){se(e.idToken,"internal-error"),se(typeof e.idToken<"u","internal-error"),se(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):rE(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){se(e.length!==0,"internal-error");const n=rE(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(se(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await S2(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new So;return r&&(se(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(se(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(se(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new So,this.toJSON())}_performRefresh(){return wr("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(t,e){se(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class An{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new x2(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new bm(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await $o(this,this.stsTokenManager.getToken(this.auth,e));return se(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return E2(this,e)}reload(){return I2(this)}_assign(e){this!==e&&(se(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new An({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){se(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Lh(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(sn(this.auth.app))return Promise.reject(Cr(this.auth));const e=await this.getIdToken();return await $o(this,w2(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,h=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:w,providerData:N,stsTokenManager:R}=n;se(p&&R,e,"internal-error");const D=So.fromJSON(this.name,R);se(typeof p=="string",e,"internal-error"),rs(r,e.name),rs(s,e.name),se(typeof m=="boolean",e,"internal-error"),se(typeof w=="boolean",e,"internal-error"),rs(i,e.name),rs(o,e.name),rs(a,e.name),rs(c,e.name),rs(h,e.name),rs(d,e.name);const x=new An({uid:p,auth:e,email:s,emailVerified:m,displayName:r,isAnonymous:w,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:D,createdAt:h,lastLoginAt:d});return N&&Array.isArray(N)&&(x.providerData=N.map(_=>({..._}))),c&&(x._redirectEventId=c),x}static async _fromIdTokenResponse(e,n,r=!1){const s=new So;s.updateFromServerResponse(n);const i=new An({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Lh(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];se(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?sI(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),a=new So;a.updateFromIdToken(r);const c=new An({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new bm(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=new Map;function Er(t){Dr(t instanceof Function,"Expected a class definition");let e=sE.get(t);return e?(Dr(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,sE.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}iI.type="NONE";const iE=iI;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(t,e,n){return`firebase:${t}:${e}:${n}`}class ko{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Hu(this.userKey,s.apiKey,i),this.fullPersistenceKey=Hu("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Oh(this.auth,{idToken:e}).catch(()=>{});return n?An._fromGetAccountInfoResponse(this.auth,n,e):null}return An._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ko(Er(iE),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Er(iE);const o=Hu(r,e.config.apiKey,e.name);let a=null;for(const h of n)try{const d=await h._get(o);if(d){let p;if(typeof d=="string"){const m=await Oh(e,{idToken:d}).catch(()=>{});if(!m)break;p=await An._fromGetAccountInfoResponse(e,m,d)}else p=An._fromJSON(e,d);h!==i&&(a=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new ko(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new ko(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oE(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cI(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(oI(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hI(e))return"Blackberry";if(dI(e))return"Webos";if(aI(e))return"Safari";if((e.includes("chrome/")||lI(e))&&!e.includes("edge/"))return"Chrome";if(uI(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function oI(t=jt()){return/firefox\//i.test(t)}function aI(t=jt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function lI(t=jt()){return/crios\//i.test(t)}function cI(t=jt()){return/iemobile/i.test(t)}function uI(t=jt()){return/android/i.test(t)}function hI(t=jt()){return/blackberry/i.test(t)}function dI(t=jt()){return/webos/i.test(t)}function Ey(t=jt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function N2(t=jt()){var e;return Ey(t)&&!!((e=window.navigator)!=null&&e.standalone)}function A2(){return FP()&&document.documentMode===10}function fI(t=jt()){return Ey(t)||uI(t)||dI(t)||hI(t)||/windows phone/i.test(t)||cI(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pI(t,e=[]){let n;switch(t){case"Browser":n=oE(jt());break;case"Worker":n=`${oE(jt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ui}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R2{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P2(t,e={}){return Br(t,"GET","/v2/passwordPolicy",Ks(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b2=6;class D2{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??b2,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j2{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new aE(this),this.idTokenSubscription=new aE(this),this.beforeStateQueue=new R2(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zx,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Er(n)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await ko.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Oh(this,{idToken:e}),r=await An._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(sn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return se(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Lh(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=d2()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(sn(this.app))return Promise.reject(Cr(this));const n=e?be(e):null;return n&&se(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&se(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return sn(this.app)?Promise.reject(Cr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return sn(this.app)?Promise.reject(Cr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Er(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await P2(this),n=new D2(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new _c("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await k2(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Er(e)||this._popupRedirectResolver;se(n,this,"argument-error"),this.redirectPersistenceManager=await ko.create(this,[Er(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(se(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return se(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pI(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(sn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&c2(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function zi(t){return be(t)}class aE{constructor(e){this.auth=e,this.observer=null,this.addObserver=YP(n=>this.observer=n)}get next(){return se(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function M2(t){Fd=t}function mI(t){return Fd.loadJS(t)}function O2(){return Fd.recaptchaEnterpriseScript}function L2(){return Fd.gapiScript}function V2(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class F2{constructor(){this.enterprise=new U2}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class U2{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const z2="recaptcha-enterprise",gI="NO_RECAPTCHA";class B2{constructor(e){this.type=z2,this.auth=zi(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{v2(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const h=new _2(c);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;nE(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(gI)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new F2().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(a=>{if(!n&&nE(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=O2();c.length!==0&&(c+=a),mI(c).then(()=>{s(a,i,o)}).catch(h=>{o(h)})}}).catch(a=>{o(a)})})}}async function lE(t,e,n,r=!1,s=!1){const i=new B2(t);let o;if(s)o=gI;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const a={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,h=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Dm(t,e,n,r,s){var i;if((i=t._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await lE(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await lE(t,e,n,n==="getOobCode");return r(t,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $2(t,e){const n=Vd(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Ds(i,e??{}))return s;On(s,"already-initialized")}return n.initialize({options:e})}function W2(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Er);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function q2(t,e,n){const r=zi(t);se(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=yI(e),{host:o,port:a}=H2(e),c=a===null?"":`:${a}`,h={url:`${i}//${o}${c}/`},d=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){se(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),se(Ds(h,r.config.emulator)&&Ds(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Gs(o)?(fy(`${i}//${o}${c}`),py("Auth",!0)):G2()}function yI(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function H2(t){const e=yI(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:cE(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:cE(o)}}}function cE(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function G2(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wr("not implemented")}_getIdTokenResponse(e){return wr("not implemented")}_linkToIdToken(e,n){return wr("not implemented")}_getReauthenticationResolver(e){return wr("not implemented")}}async function K2(t,e){return Br(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q2(t,e){return wc(t,"POST","/v1/accounts:signInWithPassword",Ks(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y2(t,e){return wc(t,"POST","/v1/accounts:signInWithEmailLink",Ks(t,e))}async function X2(t,e){return wc(t,"POST","/v1/accounts:signInWithEmailLink",Ks(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl extends Ty{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Yl(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Yl(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Dm(e,n,"signInWithPassword",Q2);case"emailLink":return Y2(e,{email:this._email,oobCode:this._password});default:On(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Dm(e,r,"signUpPassword",K2);case"emailLink":return X2(e,{idToken:n,email:this._email,oobCode:this._password});default:On(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function No(t,e){return wc(t,"POST","/v1/accounts:signInWithIdp",Ks(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J2="http://localhost";class Ai extends Ty{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ai(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):On("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const o=new Ai(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return No(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,No(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,No(e,n)}buildRequest(){const e={requestUri:J2,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=aa(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z2(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function eD(t){const e=el(tl(t)).link,n=e?el(tl(e)).deep_link_id:null,r=el(tl(t)).deep_link_id;return(r?el(tl(r)).link:null)||r||n||e||t}class xy{constructor(e){const n=el(tl(e)),r=n.apiKey??null,s=n.oobCode??null,i=Z2(n.mode??null);se(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=eD(e);try{return new xy(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(){this.providerId=la.PROVIDER_ID}static credential(e,n){return Yl._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=xy.parseLink(n);return se(r,"argument-error"),Yl._fromEmailAndCode(e,r.code,r.tenantId)}}la.PROVIDER_ID="password";la.EMAIL_PASSWORD_SIGN_IN_METHOD="password";la.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec extends _I{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends Ec{constructor(){super("facebook.com")}static credential(e){return Ai._fromParams({providerId:ls.PROVIDER_ID,signInMethod:ls.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ls.credentialFromTaggedObject(e)}static credentialFromError(e){return ls.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ls.credential(e.oauthAccessToken)}catch{return null}}}ls.FACEBOOK_SIGN_IN_METHOD="facebook.com";ls.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs extends Ec{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ai._fromParams({providerId:cs.PROVIDER_ID,signInMethod:cs.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return cs.credentialFromTaggedObject(e)}static credentialFromError(e){return cs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return cs.credential(n,r)}catch{return null}}}cs.GOOGLE_SIGN_IN_METHOD="google.com";cs.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us extends Ec{constructor(){super("github.com")}static credential(e){return Ai._fromParams({providerId:us.PROVIDER_ID,signInMethod:us.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return us.credentialFromTaggedObject(e)}static credentialFromError(e){return us.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return us.credential(e.oauthAccessToken)}catch{return null}}}us.GITHUB_SIGN_IN_METHOD="github.com";us.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs extends Ec{constructor(){super("twitter.com")}static credential(e,n){return Ai._fromParams({providerId:hs.PROVIDER_ID,signInMethod:hs.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return hs.credentialFromTaggedObject(e)}static credentialFromError(e){return hs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return hs.credential(n,r)}catch{return null}}}hs.TWITTER_SIGN_IN_METHOD="twitter.com";hs.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tD(t,e){return wc(t,"POST","/v1/accounts:signUp",Ks(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await An._fromIdTokenResponse(e,r,s),o=uE(r);return new Ri({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=uE(r);return new Ri({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function uE(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh extends zr{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Vh.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Vh(e,n,r,s)}}function vI(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Vh._fromErrorAndOperation(t,i,e,r):i})}async function nD(t,e,n=!1){const r=await $o(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ri._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rD(t,e,n=!1){const{auth:r}=t;if(sn(r.app))return Promise.reject(Cr(r));const s="reauthenticate";try{const i=await $o(t,vI(r,s,e,t),n);se(i.idToken,r,"internal-error");const o=wy(i.idToken);se(o,r,"internal-error");const{sub:a}=o;return se(t.uid===a,r,"user-mismatch"),Ri._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&On(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wI(t,e,n=!1){if(sn(t.app))return Promise.reject(Cr(t));const r="signIn",s=await vI(t,r,e),i=await Ri._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function sD(t,e){return wI(zi(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(t){const e=zi(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function iD(t,e,n){if(sn(t.app))return Promise.reject(Cr(t));const r=zi(t),o=await Dm(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",tD).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&EI(t),c}),a=await Ri._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function oD(t,e,n){return sn(t.app)?Promise.reject(Cr(t)):sD(be(t),la.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&EI(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aD(t,e){return Br(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lD(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=be(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await $o(r,aD(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function cD(t,e,n,r){return be(t).onIdTokenChanged(e,n,r)}function uD(t,e,n){return be(t).beforeAuthStateChanged(e,n)}function hD(t,e,n,r){return be(t).onAuthStateChanged(e,n,r)}function dD(t){return be(t).signOut()}const Fh="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Fh,"1"),this.storage.removeItem(Fh),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fD=1e3,pD=10;class xI extends TI{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fI(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);A2()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,pD):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},fD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}xI.type="LOCAL";const mD=xI;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II extends TI{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}II.type="SESSION";const CI=II;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gD(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Ud(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async h=>h(n.origin,i)),c=await gD(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ud.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yD{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const h=Iy("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(m.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zn(){return window}function _D(t){Zn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SI(){return typeof Zn().WorkerGlobalScope<"u"&&typeof Zn().importScripts=="function"}async function vD(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function wD(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function ED(){return SI()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI="firebaseLocalStorageDb",TD=1,Uh="firebaseLocalStorage",NI="fbase_key";class Tc{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function zd(t,e){return t.transaction([Uh],e?"readwrite":"readonly").objectStore(Uh)}function xD(){const t=indexedDB.deleteDatabase(kI);return new Tc(t).toPromise()}function jm(){const t=indexedDB.open(kI,TD);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Uh,{keyPath:NI})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Uh)?e(r):(r.close(),await xD(),e(await jm()))})})}async function hE(t,e,n){const r=zd(t,!0).put({[NI]:e,value:n});return new Tc(r).toPromise()}async function ID(t,e){const n=zd(t,!1).get(e),r=await new Tc(n).toPromise();return r===void 0?null:r.value}function dE(t,e){const n=zd(t,!0).delete(e);return new Tc(n).toPromise()}const CD=800,SD=3;class AI{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await jm(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>SD)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return SI()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ud._getInstance(ED()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await vD(),!this.activeServiceWorker)return;this.sender=new yD(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||wD()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await jm();return await hE(e,Fh,"1"),await dE(e,Fh),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>hE(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>ID(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>dE(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=zd(s,!1).getAll();return new Tc(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),CD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}AI.type="LOCAL";const kD=AI;new vc(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ND(t,e){return e?Er(e):(se(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy extends Ty{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return No(e,this._buildIdpRequest())}_linkToIdToken(e,n){return No(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return No(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function AD(t){return wI(t.auth,new Cy(t),t.bypassAuthState)}function RD(t){const{auth:e,user:n}=t;return se(n,e,"internal-error"),rD(n,new Cy(t),t.bypassAuthState)}async function PD(t){const{auth:e,user:n}=t;return se(n,e,"internal-error"),nD(n,new Cy(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return AD;case"linkViaPopup":case"linkViaRedirect":return PD;case"reauthViaPopup":case"reauthViaRedirect":return RD;default:On(this.auth,"internal-error")}}resolve(e){Dr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bD=new vc(2e3,1e4);class _o extends RI{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,_o.currentPopupAction&&_o.currentPopupAction.cancel(),_o.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return se(e,this.auth,"internal-error"),e}async onExecution(){Dr(this.filter.length===1,"Popup operations only handle one event");const e=Iy();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Jn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Jn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,_o.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Jn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bD.get())};e()}}_o.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DD="pendingRedirect",Gu=new Map;class jD extends RI{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Gu.get(this.auth._key());if(!e){try{const r=await MD(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Gu.set(this.auth._key(),e)}return this.bypassAuthState||Gu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function MD(t,e){const n=VD(e),r=LD(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function OD(t,e){Gu.set(t._key(),e)}function LD(t){return Er(t._redirectPersistence)}function VD(t){return Hu(DD,t.config.apiKey,t.name)}async function FD(t,e,n=!1){if(sn(t.app))return Promise.reject(Cr(t));const r=zi(t),s=ND(r,e),o=await new jD(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UD=10*60*1e3;class zD{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!BD(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!PI(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(Jn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=UD&&this.cachedEventUids.clear(),this.cachedEventUids.has(fE(e))}saveEventToCache(e){this.cachedEventUids.add(fE(e)),this.lastProcessedEventTime=Date.now()}}function fE(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function PI({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function BD(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return PI(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $D(t,e={}){return Br(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WD=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,qD=/^https?/;async function HD(t){if(t.config.emulator)return;const{authorizedDomains:e}=await $D(t);for(const n of e)try{if(GD(n))return}catch{}On(t,"unauthorized-domain")}function GD(t){const e=Pm(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!qD.test(n))return!1;if(WD.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KD=new vc(3e4,6e4);function pE(){const t=Zn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function QD(t){return new Promise((e,n)=>{var s,i,o;function r(){pE(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{pE(),n(Jn(t,"network-request-failed"))},timeout:KD.get()})}if((i=(s=Zn().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Zn().gapi)!=null&&o.load)r();else{const a=V2("iframefcb");return Zn()[a]=()=>{gapi.load?r():n(Jn(t,"network-request-failed"))},mI(`${L2()}?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Ku=null,e})}let Ku=null;function YD(t){return Ku=Ku||QD(t),Ku}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XD=new vc(5e3,15e3),JD="__/auth/iframe",ZD="emulator/auth/iframe",ej={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tj=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function nj(t){const e=t.config;se(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?vy(e,ZD):`https://${t.config.authDomain}/${JD}`,r={apiKey:e.apiKey,appName:t.name,v:Ui},s=tj.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${aa(r).slice(1)}`}async function rj(t){const e=await YD(t),n=Zn().gapi;return se(n,t,"internal-error"),e.open({where:document.body,url:nj(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ej,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Jn(t,"network-request-failed"),a=Zn().setTimeout(()=>{i(o)},XD.get());function c(){Zn().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sj={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ij=500,oj=600,aj="_blank",lj="http://localhost";class mE{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function cj(t,e,n,r=ij,s=oj){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...sj,width:r.toString(),height:s.toString(),top:i,left:o},h=jt().toLowerCase();n&&(a=lI(h)?aj:n),oI(h)&&(e=e||lj,c.scrollbars="yes");const d=Object.entries(c).reduce((m,[w,N])=>`${m}${w}=${N},`,"");if(N2(h)&&a!=="_self")return uj(e||"",a),new mE(null);const p=window.open(e||"",a,d);se(p,t,"popup-blocked");try{p.focus()}catch{}return new mE(p)}function uj(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hj="__/auth/handler",dj="emulator/auth/handler",fj=encodeURIComponent("fac");async function gE(t,e,n,r,s,i){se(t.config.authDomain,t,"auth-domain-config-required"),se(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ui,eventId:s};if(e instanceof _I){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",bh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Ec){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const c=await t._getAppCheckToken(),h=c?`#${fj}=${encodeURIComponent(c)}`:"";return`${pj(t)}?${aa(a).slice(1)}${h}`}function pj({config:t}){return t.emulator?vy(t,dj):`https://${t.authDomain}/${hj}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp="webStorageSupport";class mj{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=CI,this._completeRedirectFn=FD,this._overrideRedirectResult=OD}async _openPopup(e,n,r,s){var o;Dr((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await gE(e,n,r,Pm(),s);return cj(e,i,Iy())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await gE(e,n,r,Pm(),s);return _D(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Dr(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await rj(e),r=new zD(e);return n.register("authEvent",s=>(se(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(hp,{type:hp},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[hp];i!==void 0&&n(!!i),On(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=HD(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return fI()||aI()||Ey()}}const gj=mj;var yE="@firebase/auth",_E="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yj{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){se(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _j(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vj(t){Ni(new js("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;se(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pI(t)},h=new j2(r,s,i,c);return W2(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ni(new js("auth-internal",e=>{const n=zi(e.getProvider("auth").getImmediate());return(r=>new yj(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xn(yE,_E,_j(t)),Xn(yE,_E,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wj=5*60,Ej=$x("authIdTokenMaxAge")||wj;let vE=null;const Tj=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Ej)return;const s=n==null?void 0:n.token;vE!==s&&(vE=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function xj(t=yy()){const e=Vd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=$2(t,{popupRedirectResolver:gj,persistence:[kD,mD,CI]}),r=$x("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Tj(i.toString());uD(n,o,()=>o(n.currentUser)),cD(n,a=>o(a))}}const s=Ux("auth");return s&&q2(n,`http://${s}`),n}function Ij(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}M2({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Jn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",Ij().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vj("Browser");var wE=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ks,bI;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,v){function I(){}I.prototype=v.prototype,T.F=v.prototype,T.prototype=new I,T.prototype.constructor=T,T.D=function(C,A,P){for(var S=Array(arguments.length-2),Ge=2;Ge<arguments.length;Ge++)S[Ge-2]=arguments[Ge];return v.prototype[A].apply(C,S)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,v,I){I||(I=0);const C=Array(16);if(typeof v=="string")for(var A=0;A<16;++A)C[A]=v.charCodeAt(I++)|v.charCodeAt(I++)<<8|v.charCodeAt(I++)<<16|v.charCodeAt(I++)<<24;else for(A=0;A<16;++A)C[A]=v[I++]|v[I++]<<8|v[I++]<<16|v[I++]<<24;v=T.g[0],I=T.g[1],A=T.g[2];let P=T.g[3],S;S=v+(P^I&(A^P))+C[0]+3614090360&4294967295,v=I+(S<<7&4294967295|S>>>25),S=P+(A^v&(I^A))+C[1]+3905402710&4294967295,P=v+(S<<12&4294967295|S>>>20),S=A+(I^P&(v^I))+C[2]+606105819&4294967295,A=P+(S<<17&4294967295|S>>>15),S=I+(v^A&(P^v))+C[3]+3250441966&4294967295,I=A+(S<<22&4294967295|S>>>10),S=v+(P^I&(A^P))+C[4]+4118548399&4294967295,v=I+(S<<7&4294967295|S>>>25),S=P+(A^v&(I^A))+C[5]+1200080426&4294967295,P=v+(S<<12&4294967295|S>>>20),S=A+(I^P&(v^I))+C[6]+2821735955&4294967295,A=P+(S<<17&4294967295|S>>>15),S=I+(v^A&(P^v))+C[7]+4249261313&4294967295,I=A+(S<<22&4294967295|S>>>10),S=v+(P^I&(A^P))+C[8]+1770035416&4294967295,v=I+(S<<7&4294967295|S>>>25),S=P+(A^v&(I^A))+C[9]+2336552879&4294967295,P=v+(S<<12&4294967295|S>>>20),S=A+(I^P&(v^I))+C[10]+4294925233&4294967295,A=P+(S<<17&4294967295|S>>>15),S=I+(v^A&(P^v))+C[11]+2304563134&4294967295,I=A+(S<<22&4294967295|S>>>10),S=v+(P^I&(A^P))+C[12]+1804603682&4294967295,v=I+(S<<7&4294967295|S>>>25),S=P+(A^v&(I^A))+C[13]+4254626195&4294967295,P=v+(S<<12&4294967295|S>>>20),S=A+(I^P&(v^I))+C[14]+2792965006&4294967295,A=P+(S<<17&4294967295|S>>>15),S=I+(v^A&(P^v))+C[15]+1236535329&4294967295,I=A+(S<<22&4294967295|S>>>10),S=v+(A^P&(I^A))+C[1]+4129170786&4294967295,v=I+(S<<5&4294967295|S>>>27),S=P+(I^A&(v^I))+C[6]+3225465664&4294967295,P=v+(S<<9&4294967295|S>>>23),S=A+(v^I&(P^v))+C[11]+643717713&4294967295,A=P+(S<<14&4294967295|S>>>18),S=I+(P^v&(A^P))+C[0]+3921069994&4294967295,I=A+(S<<20&4294967295|S>>>12),S=v+(A^P&(I^A))+C[5]+3593408605&4294967295,v=I+(S<<5&4294967295|S>>>27),S=P+(I^A&(v^I))+C[10]+38016083&4294967295,P=v+(S<<9&4294967295|S>>>23),S=A+(v^I&(P^v))+C[15]+3634488961&4294967295,A=P+(S<<14&4294967295|S>>>18),S=I+(P^v&(A^P))+C[4]+3889429448&4294967295,I=A+(S<<20&4294967295|S>>>12),S=v+(A^P&(I^A))+C[9]+568446438&4294967295,v=I+(S<<5&4294967295|S>>>27),S=P+(I^A&(v^I))+C[14]+3275163606&4294967295,P=v+(S<<9&4294967295|S>>>23),S=A+(v^I&(P^v))+C[3]+4107603335&4294967295,A=P+(S<<14&4294967295|S>>>18),S=I+(P^v&(A^P))+C[8]+1163531501&4294967295,I=A+(S<<20&4294967295|S>>>12),S=v+(A^P&(I^A))+C[13]+2850285829&4294967295,v=I+(S<<5&4294967295|S>>>27),S=P+(I^A&(v^I))+C[2]+4243563512&4294967295,P=v+(S<<9&4294967295|S>>>23),S=A+(v^I&(P^v))+C[7]+1735328473&4294967295,A=P+(S<<14&4294967295|S>>>18),S=I+(P^v&(A^P))+C[12]+2368359562&4294967295,I=A+(S<<20&4294967295|S>>>12),S=v+(I^A^P)+C[5]+4294588738&4294967295,v=I+(S<<4&4294967295|S>>>28),S=P+(v^I^A)+C[8]+2272392833&4294967295,P=v+(S<<11&4294967295|S>>>21),S=A+(P^v^I)+C[11]+1839030562&4294967295,A=P+(S<<16&4294967295|S>>>16),S=I+(A^P^v)+C[14]+4259657740&4294967295,I=A+(S<<23&4294967295|S>>>9),S=v+(I^A^P)+C[1]+2763975236&4294967295,v=I+(S<<4&4294967295|S>>>28),S=P+(v^I^A)+C[4]+1272893353&4294967295,P=v+(S<<11&4294967295|S>>>21),S=A+(P^v^I)+C[7]+4139469664&4294967295,A=P+(S<<16&4294967295|S>>>16),S=I+(A^P^v)+C[10]+3200236656&4294967295,I=A+(S<<23&4294967295|S>>>9),S=v+(I^A^P)+C[13]+681279174&4294967295,v=I+(S<<4&4294967295|S>>>28),S=P+(v^I^A)+C[0]+3936430074&4294967295,P=v+(S<<11&4294967295|S>>>21),S=A+(P^v^I)+C[3]+3572445317&4294967295,A=P+(S<<16&4294967295|S>>>16),S=I+(A^P^v)+C[6]+76029189&4294967295,I=A+(S<<23&4294967295|S>>>9),S=v+(I^A^P)+C[9]+3654602809&4294967295,v=I+(S<<4&4294967295|S>>>28),S=P+(v^I^A)+C[12]+3873151461&4294967295,P=v+(S<<11&4294967295|S>>>21),S=A+(P^v^I)+C[15]+530742520&4294967295,A=P+(S<<16&4294967295|S>>>16),S=I+(A^P^v)+C[2]+3299628645&4294967295,I=A+(S<<23&4294967295|S>>>9),S=v+(A^(I|~P))+C[0]+4096336452&4294967295,v=I+(S<<6&4294967295|S>>>26),S=P+(I^(v|~A))+C[7]+1126891415&4294967295,P=v+(S<<10&4294967295|S>>>22),S=A+(v^(P|~I))+C[14]+2878612391&4294967295,A=P+(S<<15&4294967295|S>>>17),S=I+(P^(A|~v))+C[5]+4237533241&4294967295,I=A+(S<<21&4294967295|S>>>11),S=v+(A^(I|~P))+C[12]+1700485571&4294967295,v=I+(S<<6&4294967295|S>>>26),S=P+(I^(v|~A))+C[3]+2399980690&4294967295,P=v+(S<<10&4294967295|S>>>22),S=A+(v^(P|~I))+C[10]+4293915773&4294967295,A=P+(S<<15&4294967295|S>>>17),S=I+(P^(A|~v))+C[1]+2240044497&4294967295,I=A+(S<<21&4294967295|S>>>11),S=v+(A^(I|~P))+C[8]+1873313359&4294967295,v=I+(S<<6&4294967295|S>>>26),S=P+(I^(v|~A))+C[15]+4264355552&4294967295,P=v+(S<<10&4294967295|S>>>22),S=A+(v^(P|~I))+C[6]+2734768916&4294967295,A=P+(S<<15&4294967295|S>>>17),S=I+(P^(A|~v))+C[13]+1309151649&4294967295,I=A+(S<<21&4294967295|S>>>11),S=v+(A^(I|~P))+C[4]+4149444226&4294967295,v=I+(S<<6&4294967295|S>>>26),S=P+(I^(v|~A))+C[11]+3174756917&4294967295,P=v+(S<<10&4294967295|S>>>22),S=A+(v^(P|~I))+C[2]+718787259&4294967295,A=P+(S<<15&4294967295|S>>>17),S=I+(P^(A|~v))+C[9]+3951481745&4294967295,T.g[0]=T.g[0]+v&4294967295,T.g[1]=T.g[1]+(A+(S<<21&4294967295|S>>>11))&4294967295,T.g[2]=T.g[2]+A&4294967295,T.g[3]=T.g[3]+P&4294967295}r.prototype.v=function(T,v){v===void 0&&(v=T.length);const I=v-this.blockSize,C=this.C;let A=this.h,P=0;for(;P<v;){if(A==0)for(;P<=I;)s(this,T,P),P+=this.blockSize;if(typeof T=="string"){for(;P<v;)if(C[A++]=T.charCodeAt(P++),A==this.blockSize){s(this,C),A=0;break}}else for(;P<v;)if(C[A++]=T[P++],A==this.blockSize){s(this,C),A=0;break}}this.h=A,this.o+=v},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var v=1;v<T.length-8;++v)T[v]=0;v=this.o*8;for(var I=T.length-8;I<T.length;++I)T[I]=v&255,v/=256;for(this.v(T),T=Array(16),v=0,I=0;I<4;++I)for(let C=0;C<32;C+=8)T[v++]=this.g[I]>>>C&255;return T};function i(T,v){var I=a;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=v(T)}function o(T,v){this.h=v;const I=[];let C=!0;for(let A=T.length-1;A>=0;A--){const P=T[A]|0;C&&P==v||(I[A]=P,C=!1)}this.g=I}var a={};function c(T){return-128<=T&&T<128?i(T,function(v){return new o([v|0],v<0?-1:0)}):new o([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return D(h(-T));const v=[];let I=1;for(let C=0;T>=I;C++)v[C]=T/I|0,I*=4294967296;return new o(v,0)}function d(T,v){if(T.length==0)throw Error("number format error: empty string");if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(T.charAt(0)=="-")return D(d(T.substring(1),v));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(v,8));let C=p;for(let P=0;P<T.length;P+=8){var A=Math.min(8,T.length-P);const S=parseInt(T.substring(P,P+A),v);A<8?(A=h(Math.pow(v,A)),C=C.j(A).add(h(S))):(C=C.j(I),C=C.add(h(S)))}return C}var p=c(0),m=c(1),w=c(16777216);t=o.prototype,t.m=function(){if(R(this))return-D(this).m();let T=0,v=1;for(let I=0;I<this.g.length;I++){const C=this.i(I);T+=(C>=0?C:4294967296+C)*v,v*=4294967296}return T},t.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(N(this))return"0";if(R(this))return"-"+D(this).toString(T);const v=h(Math.pow(T,6));var I=this;let C="";for(;;){const A=j(I,v).g;I=x(I,A.j(v));let P=((I.g.length>0?I.g[0]:I.h)>>>0).toString(T);if(I=A,N(I))return P+C;for(;P.length<6;)P="0"+P;C=P+C}},t.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function N(T){if(T.h!=0)return!1;for(let v=0;v<T.g.length;v++)if(T.g[v]!=0)return!1;return!0}function R(T){return T.h==-1}t.l=function(T){return T=x(this,T),R(T)?-1:N(T)?0:1};function D(T){const v=T.g.length,I=[];for(let C=0;C<v;C++)I[C]=~T.g[C];return new o(I,~T.h).add(m)}t.abs=function(){return R(this)?D(this):this},t.add=function(T){const v=Math.max(this.g.length,T.g.length),I=[];let C=0;for(let A=0;A<=v;A++){let P=C+(this.i(A)&65535)+(T.i(A)&65535),S=(P>>>16)+(this.i(A)>>>16)+(T.i(A)>>>16);C=S>>>16,P&=65535,S&=65535,I[A]=S<<16|P}return new o(I,I[I.length-1]&-2147483648?-1:0)};function x(T,v){return T.add(D(v))}t.j=function(T){if(N(this)||N(T))return p;if(R(this))return R(T)?D(this).j(D(T)):D(D(this).j(T));if(R(T))return D(this.j(D(T)));if(this.l(w)<0&&T.l(w)<0)return h(this.m()*T.m());const v=this.g.length+T.g.length,I=[];for(var C=0;C<2*v;C++)I[C]=0;for(C=0;C<this.g.length;C++)for(let A=0;A<T.g.length;A++){const P=this.i(C)>>>16,S=this.i(C)&65535,Ge=T.i(A)>>>16,Ct=T.i(A)&65535;I[2*C+2*A]+=S*Ct,_(I,2*C+2*A),I[2*C+2*A+1]+=P*Ct,_(I,2*C+2*A+1),I[2*C+2*A+1]+=S*Ge,_(I,2*C+2*A+1),I[2*C+2*A+2]+=P*Ge,_(I,2*C+2*A+2)}for(T=0;T<v;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=v;T<2*v;T++)I[T]=0;return new o(I,0)};function _(T,v){for(;(T[v]&65535)!=T[v];)T[v+1]+=T[v]>>>16,T[v]&=65535,v++}function E(T,v){this.g=T,this.h=v}function j(T,v){if(N(v))throw Error("division by zero");if(N(T))return new E(p,p);if(R(T))return v=j(D(T),v),new E(D(v.g),D(v.h));if(R(v))return v=j(T,D(v)),new E(D(v.g),v.h);if(T.g.length>30){if(R(T)||R(v))throw Error("slowDivide_ only works with positive integers.");for(var I=m,C=v;C.l(T)<=0;)I=z(I),C=z(C);var A=W(I,1),P=W(C,1);for(C=W(C,2),I=W(I,2);!N(C);){var S=P.add(C);S.l(T)<=0&&(A=A.add(I),P=S),C=W(C,1),I=W(I,1)}return v=x(T,A.j(v)),new E(A,v)}for(A=p;T.l(v)>=0;){for(I=Math.max(1,Math.floor(T.m()/v.m())),C=Math.ceil(Math.log(I)/Math.LN2),C=C<=48?1:Math.pow(2,C-48),P=h(I),S=P.j(v);R(S)||S.l(T)>0;)I-=C,P=h(I),S=P.j(v);N(P)&&(P=m),A=A.add(P),T=x(T,S)}return new E(A,T)}t.B=function(T){return j(this,T).h},t.and=function(T){const v=Math.max(this.g.length,T.g.length),I=[];for(let C=0;C<v;C++)I[C]=this.i(C)&T.i(C);return new o(I,this.h&T.h)},t.or=function(T){const v=Math.max(this.g.length,T.g.length),I=[];for(let C=0;C<v;C++)I[C]=this.i(C)|T.i(C);return new o(I,this.h|T.h)},t.xor=function(T){const v=Math.max(this.g.length,T.g.length),I=[];for(let C=0;C<v;C++)I[C]=this.i(C)^T.i(C);return new o(I,this.h^T.h)};function z(T){const v=T.g.length+1,I=[];for(let C=0;C<v;C++)I[C]=T.i(C)<<1|T.i(C-1)>>>31;return new o(I,T.h)}function W(T,v){const I=v>>5;v%=32;const C=T.g.length-I,A=[];for(let P=0;P<C;P++)A[P]=v>0?T.i(P+I)>>>v|T.i(P+I+1)<<32-v:T.i(P+I);return new o(A,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,bI=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,ks=o}).apply(typeof wE<"u"?wE:typeof self<"u"?self:typeof window<"u"?window:{});var Cu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var DI,nl,jI,Qu,Mm,MI,OI,LI;(function(){var t,e=Object.defineProperty;function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Cu=="object"&&Cu];for(var f=0;f<l.length;++f){var g=l[f];if(g&&g.Math==Math)return g}throw Error("Cannot find global object")}var r=n(this);function s(l,f){if(f)e:{var g=r;l=l.split(".");for(var y=0;y<l.length-1;y++){var M=l[y];if(!(M in g))break e;g=g[M]}l=l[l.length-1],y=g[l],f=f(y),f!=y&&f!=null&&e(g,l,{configurable:!0,writable:!0,value:f})}}s("Symbol.dispose",function(l){return l||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(l){return l||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(l){return l||function(f){var g=[],y;for(y in f)Object.prototype.hasOwnProperty.call(f,y)&&g.push([y,f[y]]);return g}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function a(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function c(l,f,g){return l.call.apply(l.bind,arguments)}function h(l,f,g){return h=c,h.apply(null,arguments)}function d(l,f){var g=Array.prototype.slice.call(arguments,1);return function(){var y=g.slice();return y.push.apply(y,arguments),l.apply(this,y)}}function p(l,f){function g(){}g.prototype=f.prototype,l.Z=f.prototype,l.prototype=new g,l.prototype.constructor=l,l.Ob=function(y,M,V){for(var K=Array(arguments.length-2),he=2;he<arguments.length;he++)K[he-2]=arguments[he];return f.prototype[M].apply(y,K)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?l=>l&&AsyncContext.Snapshot.wrap(l):l=>l;function w(l){const f=l.length;if(f>0){const g=Array(f);for(let y=0;y<f;y++)g[y]=l[y];return g}return[]}function N(l,f){for(let y=1;y<arguments.length;y++){const M=arguments[y];var g=typeof M;if(g=g!="object"?g:M?Array.isArray(M)?"array":g:"null",g=="array"||g=="object"&&typeof M.length=="number"){g=l.length||0;const V=M.length||0;l.length=g+V;for(let K=0;K<V;K++)l[g+K]=M[K]}else l.push(M)}}class R{constructor(f,g){this.i=f,this.j=g,this.h=0,this.g=null}get(){let f;return this.h>0?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function D(l){o.setTimeout(()=>{throw l},0)}function x(){var l=T;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class _{constructor(){this.h=this.g=null}add(f,g){const y=E.get();y.set(f,g),this.h?this.h.next=y:this.g=y,this.h=y}}var E=new R(()=>new j,l=>l.reset());class j{constructor(){this.next=this.g=this.h=null}set(f,g){this.h=f,this.g=g,this.next=null}reset(){this.next=this.g=this.h=null}}let z,W=!1,T=new _,v=()=>{const l=Promise.resolve(void 0);z=()=>{l.then(I)}};function I(){for(var l;l=x();){try{l.h.call(l.g)}catch(g){D(g)}var f=E;f.j(l),f.h<100&&(f.h++,l.next=f.g,f.g=l)}W=!1}function C(){this.u=this.u,this.C=this.C}C.prototype.u=!1,C.prototype.dispose=function(){this.u||(this.u=!0,this.N())},C.prototype[Symbol.dispose]=function(){this.dispose()},C.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var P=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const g=()=>{};o.addEventListener("test",g,f),o.removeEventListener("test",g,f)}catch{}return l}();function S(l){return/^[\s\xa0]*$/.test(l)}function Ge(l,f){A.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l&&this.init(l,f)}p(Ge,A),Ge.prototype.init=function(l,f){const g=this.type=l.type,y=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget,f||(g=="mouseover"?f=l.fromElement:g=="mouseout"&&(f=l.toElement)),this.relatedTarget=f,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=l.pointerType,this.state=l.state,this.i=l,l.defaultPrevented&&Ge.Z.h.call(this)},Ge.prototype.h=function(){Ge.Z.h.call(this);const l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var Ct="closure_listenable_"+(Math.random()*1e6|0),Vn=0;function Wr(l,f,g,y,M){this.listener=l,this.proxy=null,this.src=f,this.type=g,this.capture=!!y,this.ha=M,this.key=++Vn,this.da=this.fa=!1}function Q(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function ne(l,f,g){for(const y in l)f.call(g,l[y],y,l)}function ue(l,f){for(const g in l)f.call(void 0,l[g],g,l)}function Te(l){const f={};for(const g in l)f[g]=l[g];return f}const Le="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fn(l,f){let g,y;for(let M=1;M<arguments.length;M++){y=arguments[M];for(g in y)l[g]=y[g];for(let V=0;V<Le.length;V++)g=Le[V],Object.prototype.hasOwnProperty.call(y,g)&&(l[g]=y[g])}}function $t(l){this.src=l,this.g={},this.h=0}$t.prototype.add=function(l,f,g,y,M){const V=l.toString();l=this.g[V],l||(l=this.g[V]=[],this.h++);const K=en(l,f,y,M);return K>-1?(f=l[K],g||(f.fa=!1)):(f=new Wr(f,this.src,V,!!y,M),f.fa=g,l.push(f)),f};function Un(l,f){const g=f.type;if(g in l.g){var y=l.g[g],M=Array.prototype.indexOf.call(y,f,void 0),V;(V=M>=0)&&Array.prototype.splice.call(y,M,1),V&&(Q(f),l.g[g].length==0&&(delete l.g[g],l.h--))}}function en(l,f,g,y){for(let M=0;M<l.length;++M){const V=l[M];if(!V.da&&V.listener==f&&V.capture==!!g&&V.ha==y)return M}return-1}var fn="closure_lm_"+(Math.random()*1e6|0),Js={};function Hi(l,f,g,y,M){if(Array.isArray(f)){for(let V=0;V<f.length;V++)Hi(l,f[V],g,y,M);return null}return g=Lc(g),l&&l[Ct]?l.J(f,g,a(y)?!!y.capture:!1,M):Gi(l,f,g,!1,y,M)}function Gi(l,f,g,y,M,V){if(!f)throw Error("Invalid event type");const K=a(M)?!!M.capture:!!M;let he=qr(l);if(he||(l[fn]=he=new $t(l)),g=he.add(f,g,y,K,V),g.proxy)return g;if(y=ev(),g.proxy=y,y.src=l,y.listener=g,l.addEventListener)P||(M=K),M===void 0&&(M=!1),l.addEventListener(f.toString(),y,M);else if(l.attachEvent)l.attachEvent(_a(f.toString()),y);else if(l.addListener&&l.removeListener)l.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return g}function ev(){function l(g){return f.call(l.src,l.listener,g)}const f=xn;return l}function Ef(l,f,g,y,M){if(Array.isArray(f))for(var V=0;V<f.length;V++)Ef(l,f[V],g,y,M);else y=a(y)?!!y.capture:!!y,g=Lc(g),l&&l[Ct]?(l=l.i,V=String(f).toString(),V in l.g&&(f=l.g[V],g=en(f,g,y,M),g>-1&&(Q(f[g]),Array.prototype.splice.call(f,g,1),f.length==0&&(delete l.g[V],l.h--)))):l&&(l=qr(l))&&(f=l.g[f.toString()],l=-1,f&&(l=en(f,g,y,M)),(g=l>-1?f[l]:null)&&Ki(g))}function Ki(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[Ct])Un(f.i,l);else{var g=l.type,y=l.proxy;f.removeEventListener?f.removeEventListener(g,y,l.capture):f.detachEvent?f.detachEvent(_a(g),y):f.addListener&&f.removeListener&&f.removeListener(y),(g=qr(f))?(Un(g,l),g.h==0&&(g.src=null,f[fn]=null)):Q(l)}}}function _a(l){return l in Js?Js[l]:Js[l]="on"+l}function xn(l,f){if(l.da)l=!0;else{f=new Ge(f,this);const g=l.listener,y=l.ha||l.src;l.fa&&Ki(l),l=g.call(y,f)}return l}function qr(l){return l=l[fn],l instanceof $t?l:null}var Oc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Lc(l){return typeof l=="function"?l:(l[Oc]||(l[Oc]=function(f){return l.handleEvent(f)}),l[Oc])}function Ke(){C.call(this),this.i=new $t(this),this.M=this,this.G=null}p(Ke,C),Ke.prototype[Ct]=!0,Ke.prototype.removeEventListener=function(l,f,g,y){Ef(this,l,f,g,y)};function yt(l,f){var g,y=l.G;if(y)for(g=[];y;y=y.G)g.push(y);if(l=l.M,y=f.type||f,typeof f=="string")f=new A(f,l);else if(f instanceof A)f.target=f.target||l;else{var M=f;f=new A(y,l),Fn(f,M)}M=!0;let V,K;if(g)for(K=g.length-1;K>=0;K--)V=f.g=g[K],M=ar(V,y,!0,f)&&M;if(V=f.g=l,M=ar(V,y,!0,f)&&M,M=ar(V,y,!1,f)&&M,g)for(K=0;K<g.length;K++)V=f.g=g[K],M=ar(V,y,!1,f)&&M}Ke.prototype.N=function(){if(Ke.Z.N.call(this),this.i){var l=this.i;for(const f in l.g){const g=l.g[f];for(let y=0;y<g.length;y++)Q(g[y]);delete l.g[f],l.h--}}this.G=null},Ke.prototype.J=function(l,f,g,y){return this.i.add(String(l),f,!1,g,y)},Ke.prototype.K=function(l,f,g,y){return this.i.add(String(l),f,!0,g,y)};function ar(l,f,g,y){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();let M=!0;for(let V=0;V<f.length;++V){const K=f[V];if(K&&!K.da&&K.capture==g){const he=K.listener,it=K.ha||K.src;K.fa&&Un(l.i,K),M=he.call(it,y)!==!1&&M}}return M&&!y.defaultPrevented}function Vc(l,f){if(typeof l!="function")if(l&&typeof l.handleEvent=="function")l=h(l.handleEvent,l);else throw Error("Invalid listener argument");return Number(f)>2147483647?-1:o.setTimeout(l,f||0)}function lr(l){l.g=Vc(()=>{l.g=null,l.i&&(l.i=!1,lr(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class cr extends C{constructor(f,g){super(),this.m=f,this.l=g,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:lr(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function tn(l){C.call(this),this.h=l,this.g={}}p(tn,C);var Fc=[];function Uc(l){ne(l.g,function(f,g){this.g.hasOwnProperty(g)&&Ki(f)},l),l.g={}}tn.prototype.N=function(){tn.Z.N.call(this),Uc(this)},tn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var va=o.JSON.stringify,zc=o.JSON.parse,ur=class{stringify(l){return o.JSON.stringify(l,void 0)}parse(l){return o.JSON.parse(l,void 0)}};function Bc(){}function wa(){}var Hr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ea(){A.call(this,"d")}p(Ea,A);function Zs(){A.call(this,"c")}p(Zs,A);var hr={},Ta=null;function Qi(){return Ta=Ta||new Ke}hr.Ia="serverreachability";function xa(l){A.call(this,hr.Ia,l)}p(xa,A);function ei(l){const f=Qi();yt(f,new xa(f))}hr.STAT_EVENT="statevent";function $c(l,f){A.call(this,hr.STAT_EVENT,l),this.stat=f}p($c,A);function _t(l){const f=Qi();yt(f,new $c(f,l))}hr.Ja="timingevent";function Wc(l,f){A.call(this,hr.Ja,l),this.size=f}p(Wc,A);function ti(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){l()},f)}function ni(){this.g=!0}ni.prototype.ua=function(){this.g=!1};function Tf(l,f,g,y,M,V){l.info(function(){if(l.g)if(V){var K="",he=V.split("&");for(let Ne=0;Ne<he.length;Ne++){var it=he[Ne].split("=");if(it.length>1){const ut=it[0];it=it[1];const $n=ut.split("_");K=$n.length>=2&&$n[1]=="type"?K+(ut+"="+it+"&"):K+(ut+"=redacted&")}}}else K=null;else K=V;return"XMLHTTP REQ ("+y+") [attempt "+M+"]: "+f+`
`+g+`
`+K})}function xf(l,f,g,y,M,V,K){l.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+M+"]: "+f+`
`+g+`
`+V+" "+K})}function Gr(l,f,g,y){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+qc(l,g)+(y?" "+y:"")})}function Ia(l,f){l.info(function(){return"TIMEOUT: "+f})}ni.prototype.info=function(){};function qc(l,f){if(!l.g)return f;if(!f)return null;try{const V=JSON.parse(f);if(V){for(l=0;l<V.length;l++)if(Array.isArray(V[l])){var g=V[l];if(!(g.length<2)){var y=g[1];if(Array.isArray(y)&&!(y.length<1)){var M=y[0];if(M!="noop"&&M!="stop"&&M!="close")for(let K=1;K<y.length;K++)y[K]=""}}}}return va(V)}catch{return f}}var ri={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Hc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Gc;function Ca(){}p(Ca,Bc),Ca.prototype.g=function(){return new XMLHttpRequest},Gc=new Ca;function Kr(l){return encodeURIComponent(String(l))}function Sa(l){var f=1;l=l.split(":");const g=[];for(;f>0&&l.length;)g.push(l.shift()),f--;return l.length&&g.push(l.join(":")),g}function zn(l,f,g,y){this.j=l,this.i=f,this.l=g,this.S=y||1,this.V=new tn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Kc}function Kc(){this.i=null,this.g="",this.h=!1}var Qc={},Qr={};function ka(l,f,g){l.M=1,l.A=Jc(Lt(f)),l.u=g,l.R=!0,Na(l,null)}function Na(l,f){l.F=Date.now(),dr(l),l.B=Lt(l.A);var g=l.B,y=l.S;Array.isArray(y)||(y=[String(y)]),iv(g.i,"t",y),l.C=0,g=l.j.L,l.h=new Kc,l.g=xv(l.j,g?f:null,!l.u),l.P>0&&(l.O=new cr(h(l.Y,l,l.g),l.P)),f=l.V,g=l.g,y=l.ba;var M="readystatechange";Array.isArray(M)||(M&&(Fc[0]=M.toString()),M=Fc);for(let V=0;V<M.length;V++){const K=Hi(g,M[V],y||f.handleEvent,!1,f.h||f);if(!K)break;f.g[K.key]=K}f=l.J?Te(l.J):{},l.u?(l.v||(l.v="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.B,l.v,l.u,f)):(l.v="GET",l.g.ea(l.B,l.v,null,f)),ei(),Tf(l.i,l.v,l.B,l.l,l.S,l.u)}zn.prototype.ba=function(l){l=l.target;const f=this.O;f&&Zr(l)==3?f.j():this.Y(l)},zn.prototype.Y=function(l){try{if(l==this.g)e:{const he=Zr(this.g),it=this.g.ya(),Ne=this.g.ca();if(!(he<3)&&(he!=3||this.g&&(this.h.h||this.g.la()||dv(this.g)))){this.K||he!=4||it==7||(it==8||Ne<=0?ei(3):ei(2)),Aa(this);var f=this.g.ca();this.X=f;var g=If(this);if(this.o=f==200,xf(this.i,this.v,this.B,this.l,this.S,he,f),this.o){if(this.U&&!this.L){t:{if(this.g){var y,M=this.g;if((y=M.g?M.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!S(y)){var V=y;break t}}V=null}if(l=V)Gr(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Yi(this,l);else{this.o=!1,this.m=3,_t(12),fr(this),Yr(this);break e}}if(this.R){l=!0;let ut;for(;!this.K&&this.C<g.length;)if(ut=Cf(this,g),ut==Qr){he==4&&(this.m=4,_t(14),l=!1),Gr(this.i,this.l,null,"[Incomplete Response]");break}else if(ut==Qc){this.m=4,_t(15),Gr(this.i,this.l,g,"[Invalid Chunk]"),l=!1;break}else Gr(this.i,this.l,ut,null),Yi(this,ut);if(Yc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),he!=4||g.length!=0||this.h.h||(this.m=1,_t(16),l=!1),this.o=this.o&&l,!l)Gr(this.i,this.l,g,"[Invalid Chunked Response]"),fr(this),Yr(this);else if(g.length>0&&!this.W){this.W=!0;var K=this.j;K.g==this&&K.aa&&!K.P&&(K.j.info("Great, no buffering proxy detected. Bytes received: "+g.length),Rf(K),K.P=!0,_t(11))}}else Gr(this.i,this.l,g,null),Yi(this,g);he==4&&fr(this),this.o&&!this.K&&(he==4?vv(this.j,this):(this.o=!1,dr(this)))}else Bk(this.g),f==400&&g.indexOf("Unknown SID")>0?(this.m=3,_t(12)):(this.m=0,_t(13)),fr(this),Yr(this)}}}catch{}finally{}};function If(l){if(!Yc(l))return l.g.la();const f=dv(l.g);if(f==="")return"";let g="";const y=f.length,M=Zr(l.g)==4;if(!l.h.i){if(typeof TextDecoder>"u")return fr(l),Yr(l),"";l.h.i=new o.TextDecoder}for(let V=0;V<y;V++)l.h.h=!0,g+=l.h.i.decode(f[V],{stream:!(M&&V==y-1)});return f.length=0,l.h.g+=g,l.C=0,l.h.g}function Yc(l){return l.g?l.v=="GET"&&l.M!=2&&l.j.Aa:!1}function Cf(l,f){var g=l.C,y=f.indexOf(`
`,g);return y==-1?Qr:(g=Number(f.substring(g,y)),isNaN(g)?Qc:(y+=1,y+g>f.length?Qr:(f=f.slice(y,y+g),l.C=y+g,f)))}zn.prototype.cancel=function(){this.K=!0,fr(this)};function dr(l){l.T=Date.now()+l.H,Xc(l,l.H)}function Xc(l,f){if(l.D!=null)throw Error("WatchDog timer not null");l.D=ti(h(l.aa,l),f)}function Aa(l){l.D&&(o.clearTimeout(l.D),l.D=null)}zn.prototype.aa=function(){this.D=null;const l=Date.now();l-this.T>=0?(Ia(this.i,this.B),this.M!=2&&(ei(),_t(17)),fr(this),this.m=2,Yr(this)):Xc(this,this.T-l)};function Yr(l){l.j.I==0||l.K||vv(l.j,l)}function fr(l){Aa(l);var f=l.O;f&&typeof f.dispose=="function"&&f.dispose(),l.O=null,Uc(l.V),l.g&&(f=l.g,l.g=null,f.abort(),f.dispose())}function Yi(l,f){try{var g=l.j;if(g.I!=0&&(g.g==l||q(g.h,l))){if(!l.L&&q(g.h,l)&&g.I==3){try{var y=g.Ba.g.parse(f)}catch{y=null}if(Array.isArray(y)&&y.length==3){var M=y;if(M[0]==0){e:if(!g.v){if(g.g)if(g.g.F+3e3<l.F)ru(g),tu(g);else break e;Af(g),_t(18)}}else g.xa=M[1],0<g.xa-g.K&&M[2]<37500&&g.F&&g.A==0&&!g.C&&(g.C=ti(h(g.Va,g),6e3));O(g.h)<=1&&g.ta&&(g.ta=void 0)}else ii(g,11)}else if((l.L||g.g==l)&&ru(g),!S(f))for(M=g.Ba.g.parse(f),f=0;f<M.length;f++){let Ne=M[f];const ut=Ne[0];if(!(ut<=g.K))if(g.K=ut,Ne=Ne[1],g.I==2)if(Ne[0]=="c"){g.M=Ne[1],g.ba=Ne[2];const $n=Ne[3];$n!=null&&(g.ka=$n,g.j.info("VER="+g.ka));const oi=Ne[4];oi!=null&&(g.za=oi,g.j.info("SVER="+g.za));const es=Ne[5];es!=null&&typeof es=="number"&&es>0&&(y=1.5*es,g.O=y,g.j.info("backChannelRequestTimeoutMs_="+y)),y=g;const ts=l.g;if(ts){const iu=ts.g?ts.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(iu){var V=y.h;V.g||iu.indexOf("spdy")==-1&&iu.indexOf("quic")==-1&&iu.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(J(V,V.h),V.h=null))}if(y.G){const Pf=ts.g?ts.g.getResponseHeader("X-HTTP-Session-Id"):null;Pf&&(y.wa=Pf,Ce(y.J,y.G,Pf))}}g.I=3,g.l&&g.l.ra(),g.aa&&(g.T=Date.now()-l.F,g.j.info("Handshake RTT: "+g.T+"ms")),y=g;var K=l;if(y.na=Tv(y,y.L?y.ba:null,y.W),K.L){ee(y.h,K);var he=K,it=y.O;it&&(he.H=it),he.D&&(Aa(he),dr(he)),y.g=K}else yv(y);g.i.length>0&&nu(g)}else Ne[0]!="stop"&&Ne[0]!="close"||ii(g,7);else g.I==3&&(Ne[0]=="stop"||Ne[0]=="close"?Ne[0]=="stop"?ii(g,7):Nf(g):Ne[0]!="noop"&&g.l&&g.l.qa(Ne),g.A=0)}}ei(4)}catch{}}var k=class{constructor(l,f){this.g=l,this.map=f}};function L(l){this.l=l||10,o.PerformanceNavigationTiming?(l=o.performance.getEntriesByType("navigation"),l=l.length>0&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function B(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function O(l){return l.h?1:l.g?l.g.size:0}function q(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function J(l,f){l.g?l.g.add(f):l.h=f}function ee(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}L.prototype.cancel=function(){if(this.i=re(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function re(l){if(l.h!=null)return l.i.concat(l.h.G);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const g of l.g.values())f=f.concat(g.G);return f}return w(l.i)}var de=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ct(l,f){if(l){l=l.split("&");for(let g=0;g<l.length;g++){const y=l[g].indexOf("=");let M,V=null;y>=0?(M=l[g].substring(0,y),V=l[g].substring(y+1)):M=l[g],f(M,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function Ot(l){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let f;l instanceof Ot?(this.l=l.l,Xr(this,l.j),this.o=l.o,this.g=l.g,Bn(this,l.u),this.h=l.h,Ra(this,ov(l.i)),this.m=l.m):l&&(f=String(l).match(de))?(this.l=!1,Xr(this,f[1]||"",!0),this.o=Pa(f[2]||""),this.g=Pa(f[3]||"",!0),Bn(this,f[4]),this.h=Pa(f[5]||"",!0),Ra(this,f[6]||"",!0),this.m=Pa(f[7]||"")):(this.l=!1,this.i=new Da(null,this.l))}Ot.prototype.toString=function(){const l=[];var f=this.j;f&&l.push(ba(f,tv,!0),":");var g=this.g;return(g||f=="file")&&(l.push("//"),(f=this.o)&&l.push(ba(f,tv,!0),"@"),l.push(Kr(g).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),g=this.u,g!=null&&l.push(":",String(g))),(g=this.h)&&(this.g&&g.charAt(0)!="/"&&l.push("/"),l.push(ba(g,g.charAt(0)=="/"?Dk:bk,!0))),(g=this.i.toString())&&l.push("?",g),(g=this.m)&&l.push("#",ba(g,Mk)),l.join("")},Ot.prototype.resolve=function(l){const f=Lt(this);let g=!!l.j;g?Xr(f,l.j):g=!!l.o,g?f.o=l.o:g=!!l.g,g?f.g=l.g:g=l.u!=null;var y=l.h;if(g)Bn(f,l.u);else if(g=!!l.h){if(y.charAt(0)!="/")if(this.g&&!this.h)y="/"+y;else{var M=f.h.lastIndexOf("/");M!=-1&&(y=f.h.slice(0,M+1)+y)}if(M=y,M==".."||M==".")y="";else if(M.indexOf("./")!=-1||M.indexOf("/.")!=-1){y=M.lastIndexOf("/",0)==0,M=M.split("/");const V=[];for(let K=0;K<M.length;){const he=M[K++];he=="."?y&&K==M.length&&V.push(""):he==".."?((V.length>1||V.length==1&&V[0]!="")&&V.pop(),y&&K==M.length&&V.push("")):(V.push(he),y=!0)}y=V.join("/")}else y=M}return g?f.h=y:g=l.i.toString()!=="",g?Ra(f,ov(l.i)):g=!!l.m,g&&(f.m=l.m),f};function Lt(l){return new Ot(l)}function Xr(l,f,g){l.j=g?Pa(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function Bn(l,f){if(f){if(f=Number(f),isNaN(f)||f<0)throw Error("Bad port number "+f);l.u=f}else l.u=null}function Ra(l,f,g){f instanceof Da?(l.i=f,Ok(l.i,l.l)):(g||(f=ba(f,jk)),l.i=new Da(f,l.l))}function Ce(l,f,g){l.i.set(f,g)}function Jc(l){return Ce(l,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),l}function Pa(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function ba(l,f,g){return typeof l=="string"?(l=encodeURI(l).replace(f,Pk),g&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function Pk(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var tv=/[#\/\?@]/g,bk=/[#\?:]/g,Dk=/[#\?]/g,jk=/[#\?@]/g,Mk=/#/g;function Da(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function si(l){l.g||(l.g=new Map,l.h=0,l.i&&ct(l.i,function(f,g){l.add(decodeURIComponent(f.replace(/\+/g," ")),g)}))}t=Da.prototype,t.add=function(l,f){si(this),this.i=null,l=Xi(this,l);let g=this.g.get(l);return g||this.g.set(l,g=[]),g.push(f),this.h+=1,this};function nv(l,f){si(l),f=Xi(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function rv(l,f){return si(l),f=Xi(l,f),l.g.has(f)}t.forEach=function(l,f){si(this),this.g.forEach(function(g,y){g.forEach(function(M){l.call(f,M,y,this)},this)},this)};function sv(l,f){si(l);let g=[];if(typeof f=="string")rv(l,f)&&(g=g.concat(l.g.get(Xi(l,f))));else for(l=Array.from(l.g.values()),f=0;f<l.length;f++)g=g.concat(l[f]);return g}t.set=function(l,f){return si(this),this.i=null,l=Xi(this,l),rv(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},t.get=function(l,f){return l?(l=sv(this,l),l.length>0?String(l[0]):f):f};function iv(l,f,g){nv(l,f),g.length>0&&(l.i=null,l.g.set(Xi(l,f),w(g)),l.h+=g.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(let y=0;y<f.length;y++){var g=f[y];const M=Kr(g);g=sv(this,g);for(let V=0;V<g.length;V++){let K=M;g[V]!==""&&(K+="="+Kr(g[V])),l.push(K)}}return this.i=l.join("&")};function ov(l){const f=new Da;return f.i=l.i,l.g&&(f.g=new Map(l.g),f.h=l.h),f}function Xi(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function Ok(l,f){f&&!l.j&&(si(l),l.i=null,l.g.forEach(function(g,y){const M=y.toLowerCase();y!=M&&(nv(this,y),iv(this,M,g))},l)),l.j=f}function Lk(l,f){const g=new ni;if(o.Image){const y=new Image;y.onload=d(Jr,g,"TestLoadImage: loaded",!0,f,y),y.onerror=d(Jr,g,"TestLoadImage: error",!1,f,y),y.onabort=d(Jr,g,"TestLoadImage: abort",!1,f,y),y.ontimeout=d(Jr,g,"TestLoadImage: timeout",!1,f,y),o.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=l}else f(!1)}function Vk(l,f){const g=new ni,y=new AbortController,M=setTimeout(()=>{y.abort(),Jr(g,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:y.signal}).then(V=>{clearTimeout(M),V.ok?Jr(g,"TestPingServer: ok",!0,f):Jr(g,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(M),Jr(g,"TestPingServer: error",!1,f)})}function Jr(l,f,g,y,M){try{M&&(M.onload=null,M.onerror=null,M.onabort=null,M.ontimeout=null),y(g)}catch{}}function Fk(){this.g=new ur}function Sf(l){this.i=l.Sb||null,this.h=l.ab||!1}p(Sf,Bc),Sf.prototype.g=function(){return new Zc(this.i,this.h)};function Zc(l,f){Ke.call(this),this.H=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Zc,Ke),t=Zc.prototype,t.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=l,this.D=f,this.readyState=1,Ma(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const f={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};l&&(f.body=l),(this.H||o).fetch(new Request(this.D,f)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ja(this)),this.readyState=0},t.Pa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Ma(this)),this.g&&(this.readyState=3,Ma(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;av(this)}else l.text().then(this.Oa.bind(this),this.ga.bind(this))};function av(l){l.j.read().then(l.Ma.bind(l)).catch(l.ga.bind(l))}t.Ma=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.B.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?ja(this):Ma(this),this.readyState==3&&av(this)}},t.Oa=function(l){this.g&&(this.response=this.responseText=l,ja(this))},t.Na=function(l){this.g&&(this.response=l,ja(this))},t.ga=function(){this.g&&ja(this)};function ja(l){l.readyState=4,l.l=null,l.j=null,l.B=null,Ma(l)}t.setRequestHeader=function(l,f){this.A.append(l,f)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var g=f.next();!g.done;)g=g.value,l.push(g[0]+": "+g[1]),g=f.next();return l.join(`\r
`)};function Ma(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Zc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function lv(l){let f="";return ne(l,function(g,y){f+=y,f+=":",f+=g,f+=`\r
`}),f}function kf(l,f,g){e:{for(y in g){var y=!1;break e}y=!0}y||(g=lv(g),typeof l=="string"?g!=null&&Kr(g):Ce(l,f,g))}function We(l){Ke.call(this),this.headers=new Map,this.L=l||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(We,Ke);var Uk=/^https?$/i,zk=["POST","PUT"];t=We.prototype,t.Fa=function(l){this.H=l},t.ea=function(l,f,g,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Gc.g(),this.g.onreadystatechange=m(h(this.Ca,this));try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(V){cv(this,V);return}if(l=g||"",g=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var M in y)g.set(M,y[M]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const V of y.keys())g.set(V,y.get(V));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(g.keys()).find(V=>V.toLowerCase()=="content-type"),M=o.FormData&&l instanceof o.FormData,!(Array.prototype.indexOf.call(zk,f,void 0)>=0)||y||M||g.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,K]of g)this.g.setRequestHeader(V,K);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(l),this.v=!1}catch(V){cv(this,V)}};function cv(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.o=5,uv(l),eu(l)}function uv(l){l.A||(l.A=!0,yt(l,"complete"),yt(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=l||7,yt(this,"complete"),yt(this,"abort"),eu(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),eu(this,!0)),We.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?hv(this):this.Xa())},t.Xa=function(){hv(this)};function hv(l){if(l.h&&typeof i<"u"){if(l.v&&Zr(l)==4)setTimeout(l.Ca.bind(l),0);else if(yt(l,"readystatechange"),Zr(l)==4){l.h=!1;try{const V=l.ca();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var g;if(!(g=f)){var y;if(y=V===0){let K=String(l.D).match(de)[1]||null;!K&&o.self&&o.self.location&&(K=o.self.location.protocol.slice(0,-1)),y=!Uk.test(K?K.toLowerCase():"")}g=y}if(g)yt(l,"complete"),yt(l,"success");else{l.o=6;try{var M=Zr(l)>2?l.g.statusText:""}catch{M=""}l.l=M+" ["+l.ca()+"]",uv(l)}}finally{eu(l)}}}}function eu(l,f){if(l.g){l.m&&(clearTimeout(l.m),l.m=null);const g=l.g;l.g=null,f||yt(l,"ready");try{g.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function Zr(l){return l.g?l.g.readyState:0}t.ca=function(){try{return Zr(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),zc(f)}};function dv(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.F){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function Bk(l){const f={};l=(l.g&&Zr(l)>=2&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<l.length;y++){if(S(l[y]))continue;var g=Sa(l[y]);const M=g[0];if(g=g[1],typeof g!="string")continue;g=g.trim();const V=f[M]||[];f[M]=V,V.push(g)}ue(f,function(y){return y.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Oa(l,f,g){return g&&g.internalChannelParams&&g.internalChannelParams[l]||f}function fv(l){this.za=0,this.i=[],this.j=new ni,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Oa("failFast",!1,l),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Oa("baseRetryDelayMs",5e3,l),this.Za=Oa("retryDelaySeedMs",1e4,l),this.Ta=Oa("forwardChannelMaxRetries",2,l),this.va=Oa("forwardChannelRequestTimeoutMs",2e4,l),this.ma=l&&l.xmlHttpFactory||void 0,this.Ua=l&&l.Rb||void 0,this.Aa=l&&l.useFetchStreams||!1,this.O=void 0,this.L=l&&l.supportsCrossDomainXhr||!1,this.M="",this.h=new L(l&&l.concurrentRequestLimit),this.Ba=new Fk,this.S=l&&l.fastHandshake||!1,this.R=l&&l.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=l&&l.Pb||!1,l&&l.ua&&this.j.ua(),l&&l.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&l&&l.detectBufferingProxy||!1,this.ia=void 0,l&&l.longPollingTimeout&&l.longPollingTimeout>0&&(this.ia=l.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=fv.prototype,t.ka=8,t.I=1,t.connect=function(l,f,g,y){_t(0),this.W=l,this.H=f||{},g&&y!==void 0&&(this.H.OSID=g,this.H.OAID=y),this.F=this.X,this.J=Tv(this,null,this.W),nu(this)};function Nf(l){if(pv(l),l.I==3){var f=l.V++,g=Lt(l.J);if(Ce(g,"SID",l.M),Ce(g,"RID",f),Ce(g,"TYPE","terminate"),La(l,g),f=new zn(l,l.j,f),f.M=2,f.A=Jc(Lt(g)),g=!1,o.navigator&&o.navigator.sendBeacon)try{g=o.navigator.sendBeacon(f.A.toString(),"")}catch{}!g&&o.Image&&(new Image().src=f.A,g=!0),g||(f.g=xv(f.j,null),f.g.ea(f.A)),f.F=Date.now(),dr(f)}Ev(l)}function tu(l){l.g&&(Rf(l),l.g.cancel(),l.g=null)}function pv(l){tu(l),l.v&&(o.clearTimeout(l.v),l.v=null),ru(l),l.h.cancel(),l.m&&(typeof l.m=="number"&&o.clearTimeout(l.m),l.m=null)}function nu(l){if(!B(l.h)&&!l.m){l.m=!0;var f=l.Ea;z||v(),W||(z(),W=!0),T.add(f,l),l.D=0}}function $k(l,f){return O(l.h)>=l.h.j-(l.m?1:0)?!1:l.m?(l.i=f.G.concat(l.i),!0):l.I==1||l.I==2||l.D>=(l.Sa?0:l.Ta)?!1:(l.m=ti(h(l.Ea,l,f),wv(l,l.D)),l.D++,!0)}t.Ea=function(l){if(this.m)if(this.m=null,this.I==1){if(!l){this.V=Math.floor(Math.random()*1e5),l=this.V++;const M=new zn(this,this.j,l);let V=this.o;if(this.U&&(V?(V=Te(V),Fn(V,this.U)):V=this.U),this.u!==null||this.R||(M.J=V,V=null),this.S)e:{for(var f=0,g=0;g<this.i.length;g++){t:{var y=this.i[g];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(f+=y,f>4096){f=g;break e}if(f===4096||g===this.i.length-1){f=g+1;break e}}f=1e3}else f=1e3;f=gv(this,M,f),g=Lt(this.J),Ce(g,"RID",l),Ce(g,"CVER",22),this.G&&Ce(g,"X-HTTP-Session-Id",this.G),La(this,g),V&&(this.R?f="headers="+Kr(lv(V))+"&"+f:this.u&&kf(g,this.u,V)),J(this.h,M),this.Ra&&Ce(g,"TYPE","init"),this.S?(Ce(g,"$req",f),Ce(g,"SID","null"),M.U=!0,ka(M,g,null)):ka(M,g,f),this.I=2}}else this.I==3&&(l?mv(this,l):this.i.length==0||B(this.h)||mv(this))};function mv(l,f){var g;f?g=f.l:g=l.V++;const y=Lt(l.J);Ce(y,"SID",l.M),Ce(y,"RID",g),Ce(y,"AID",l.K),La(l,y),l.u&&l.o&&kf(y,l.u,l.o),g=new zn(l,l.j,g,l.D+1),l.u===null&&(g.J=l.o),f&&(l.i=f.G.concat(l.i)),f=gv(l,g,1e3),g.H=Math.round(l.va*.5)+Math.round(l.va*.5*Math.random()),J(l.h,g),ka(g,y,f)}function La(l,f){l.H&&ne(l.H,function(g,y){Ce(f,y,g)}),l.l&&ne({},function(g,y){Ce(f,y,g)})}function gv(l,f,g){g=Math.min(l.i.length,g);const y=l.l?h(l.l.Ka,l.l,l):null;e:{var M=l.i;let he=-1;for(;;){const it=["count="+g];he==-1?g>0?(he=M[0].g,it.push("ofs="+he)):he=0:it.push("ofs="+he);let Ne=!0;for(let ut=0;ut<g;ut++){var V=M[ut].g;const $n=M[ut].map;if(V-=he,V<0)he=Math.max(0,M[ut].g-100),Ne=!1;else try{V="req"+V+"_"||"";try{var K=$n instanceof Map?$n:Object.entries($n);for(const[oi,es]of K){let ts=es;a(es)&&(ts=va(es)),it.push(V+oi+"="+encodeURIComponent(ts))}}catch(oi){throw it.push(V+"type="+encodeURIComponent("_badmap")),oi}}catch{y&&y($n)}}if(Ne){K=it.join("&");break e}}K=void 0}return l=l.i.splice(0,g),f.G=l,K}function yv(l){if(!l.g&&!l.v){l.Y=1;var f=l.Da;z||v(),W||(z(),W=!0),T.add(f,l),l.A=0}}function Af(l){return l.g||l.v||l.A>=3?!1:(l.Y++,l.v=ti(h(l.Da,l),wv(l,l.A)),l.A++,!0)}t.Da=function(){if(this.v=null,_v(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var l=4*this.T;this.j.info("BP detection timer enabled: "+l),this.B=ti(h(this.Wa,this),l)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,_t(10),tu(this),_v(this))};function Rf(l){l.B!=null&&(o.clearTimeout(l.B),l.B=null)}function _v(l){l.g=new zn(l,l.j,"rpc",l.Y),l.u===null&&(l.g.J=l.o),l.g.P=0;var f=Lt(l.na);Ce(f,"RID","rpc"),Ce(f,"SID",l.M),Ce(f,"AID",l.K),Ce(f,"CI",l.F?"0":"1"),!l.F&&l.ia&&Ce(f,"TO",l.ia),Ce(f,"TYPE","xmlhttp"),La(l,f),l.u&&l.o&&kf(f,l.u,l.o),l.O&&(l.g.H=l.O);var g=l.g;l=l.ba,g.M=1,g.A=Jc(Lt(f)),g.u=null,g.R=!0,Na(g,l)}t.Va=function(){this.C!=null&&(this.C=null,tu(this),Af(this),_t(19))};function ru(l){l.C!=null&&(o.clearTimeout(l.C),l.C=null)}function vv(l,f){var g=null;if(l.g==f){ru(l),Rf(l),l.g=null;var y=2}else if(q(l.h,f))g=f.G,ee(l.h,f),y=1;else return;if(l.I!=0){if(f.o)if(y==1){g=f.u?f.u.length:0,f=Date.now()-f.F;var M=l.D;y=Qi(),yt(y,new Wc(y,g)),nu(l)}else yv(l);else if(M=f.m,M==3||M==0&&f.X>0||!(y==1&&$k(l,f)||y==2&&Af(l)))switch(g&&g.length>0&&(f=l.h,f.i=f.i.concat(g)),M){case 1:ii(l,5);break;case 4:ii(l,10);break;case 3:ii(l,6);break;default:ii(l,2)}}}function wv(l,f){let g=l.Qa+Math.floor(Math.random()*l.Za);return l.isActive()||(g*=2),g*f}function ii(l,f){if(l.j.info("Error code "+f),f==2){var g=h(l.bb,l),y=l.Ua;const M=!y;y=new Ot(y||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Xr(y,"https"),Jc(y),M?Lk(y.toString(),g):Vk(y.toString(),g)}else _t(2);l.I=0,l.l&&l.l.pa(f),Ev(l),pv(l)}t.bb=function(l){l?(this.j.info("Successfully pinged google.com"),_t(2)):(this.j.info("Failed to ping google.com"),_t(1))};function Ev(l){if(l.I=0,l.ja=[],l.l){const f=re(l.h);(f.length!=0||l.i.length!=0)&&(N(l.ja,f),N(l.ja,l.i),l.h.i.length=0,w(l.i),l.i.length=0),l.l.oa()}}function Tv(l,f,g){var y=g instanceof Ot?Lt(g):new Ot(g);if(y.g!="")f&&(y.g=f+"."+y.g),Bn(y,y.u);else{var M=o.location;y=M.protocol,f=f?f+"."+M.hostname:M.hostname,M=+M.port;const V=new Ot(null);y&&Xr(V,y),f&&(V.g=f),M&&Bn(V,M),g&&(V.h=g),y=V}return g=l.G,f=l.wa,g&&f&&Ce(y,g,f),Ce(y,"VER",l.ka),La(l,y),y}function xv(l,f,g){if(f&&!l.L)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Aa&&!l.ma?new We(new Sf({ab:g})):new We(l.ma),f.Fa(l.L),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Iv(){}t=Iv.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function su(){}su.prototype.g=function(l,f){return new nn(l,f)};function nn(l,f){Ke.call(this),this.g=new fv(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.sa&&(l?l["X-WebChannel-Client-Profile"]=f.sa:l={"X-WebChannel-Client-Profile":f.sa}),this.g.U=l,(l=f&&f.Qb)&&!S(l)&&(this.g.u=l),this.A=f&&f.supportsCrossDomainXhr||!1,this.v=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!S(f)&&(this.g.G=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new Ji(this)}p(nn,Ke),nn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},nn.prototype.close=function(){Nf(this.g)},nn.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var g={};g.__data__=l,l=g}else this.v&&(g={},g.__data__=va(l),l=g);f.i.push(new k(f.Ya++,l)),f.I==3&&nu(f)},nn.prototype.N=function(){this.g.l=null,delete this.j,Nf(this.g),delete this.g,nn.Z.N.call(this)};function Cv(l){Ea.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const g in f){l=g;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}p(Cv,Ea);function Sv(){Zs.call(this),this.status=1}p(Sv,Zs);function Ji(l){this.g=l}p(Ji,Iv),Ji.prototype.ra=function(){yt(this.g,"a")},Ji.prototype.qa=function(l){yt(this.g,new Cv(l))},Ji.prototype.pa=function(l){yt(this.g,new Sv)},Ji.prototype.oa=function(){yt(this.g,"b")},su.prototype.createWebChannel=su.prototype.g,nn.prototype.send=nn.prototype.o,nn.prototype.open=nn.prototype.m,nn.prototype.close=nn.prototype.close,LI=function(){return new su},OI=function(){return Qi()},MI=hr,Mm={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ri.NO_ERROR=0,ri.TIMEOUT=8,ri.HTTP_ERROR=6,Qu=ri,Hc.COMPLETE="complete",jI=Hc,wa.EventType=Hr,Hr.OPEN="a",Hr.CLOSE="b",Hr.ERROR="c",Hr.MESSAGE="d",Ke.prototype.listen=Ke.prototype.J,nl=wa,We.prototype.listenOnce=We.prototype.K,We.prototype.getLastError=We.prototype.Ha,We.prototype.getLastErrorCode=We.prototype.ya,We.prototype.getStatus=We.prototype.ca,We.prototype.getResponseJson=We.prototype.La,We.prototype.getResponseText=We.prototype.la,We.prototype.send=We.prototype.ea,We.prototype.setWithCredentials=We.prototype.Fa,DI=We}).apply(typeof Cu<"u"?Cu:typeof self<"u"?self:typeof window<"u"?window:{});const EE="@firebase/firestore",TE="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let At=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ca="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=new Ld("@firebase/firestore");function to(){return Pi.logLevel}function X(t,...e){if(Pi.logLevel<=ge.DEBUG){const n=e.map(Sy);Pi.debug(`Firestore (${ca}): ${t}`,...n)}}function jr(t,...e){if(Pi.logLevel<=ge.ERROR){const n=e.map(Sy);Pi.error(`Firestore (${ca}): ${t}`,...n)}}function Wo(t,...e){if(Pi.logLevel<=ge.WARN){const n=e.map(Sy);Pi.warn(`Firestore (${ca}): ${t}`,...n)}}function Sy(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,VI(t,r,n)}function VI(t,e,n){let r=`FIRESTORE (${ca}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw jr(r),new Error(r)}function Ie(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||VI(e,s,r)}function ce(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Y extends zr{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FI{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Cj{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(At.UNAUTHENTICATED))}shutdown(){}}class Sj{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class kj{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ie(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new Sr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Sr,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Sr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ie(typeof r.accessToken=="string",31837,{l:r}),new FI(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ie(e===null||typeof e=="string",2055,{h:e}),new At(e)}}class Nj{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Aj{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new Nj(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(At.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class xE{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Rj{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,sn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Ie(this.o===void 0,3512);const r=i=>{i.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,X("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new xE(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ie(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new xE(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pj(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Pj(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function _e(t,e){return t<e?-1:t>e?1:0}function Om(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return dp(s)===dp(i)?_e(s,i):dp(s)?1:-1}return _e(t.length,e.length)}const bj=55296,Dj=57343;function dp(t){const e=t.charCodeAt(0);return e>=bj&&e<=Dj}function qo(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IE="__name__";class Hn{constructor(e,n,r){n===void 0?n=0:n>e.length&&ie(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&ie(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Hn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Hn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=Hn.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return _e(e.length,n.length)}static compareSegments(e,n){const r=Hn.isNumericId(e),s=Hn.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?Hn.extractNumericId(e).compare(Hn.extractNumericId(n)):Om(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ks.fromString(e.substring(4,e.length-2))}}class Re extends Hn{construct(e,n,r){return new Re(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new Y(U.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Re(n)}static emptyPath(){return new Re([])}}const jj=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Et extends Hn{construct(e,n,r){return new Et(e,n,r)}static isValidIdentifier(e){return jj.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Et.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===IE}static keyField(){return new Et([IE])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Y(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new Y(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new Y(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new Y(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Et(n)}static emptyPath(){return new Et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.path=e}static fromPath(e){return new te(Re.fromString(e))}static fromName(e){return new te(Re.fromString(e).popFirst(5))}static empty(){return new te(Re.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Re.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Re.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new te(new Re(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UI(t,e,n){if(!n)throw new Y(U.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Mj(t,e,n,r){if(e===!0&&r===!0)throw new Y(U.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function CE(t){if(!te.isDocumentKey(t))throw new Y(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function SE(t){if(te.isDocumentKey(t))throw new Y(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function zI(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Bd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ie(12329,{type:typeof t})}function cn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Y(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Bd(t);throw new Y(U.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function Oj(t,e){if(e<=0)throw new Y(U.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(t,e){const n={typeString:t};return e&&(n.value=e),n}function xc(t,e){if(!zI(t))throw new Y(U.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new Y(U.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE=-62135596800,NE=1e6;class Me{static now(){return Me.fromMillis(Date.now())}static fromDate(e){return Me.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*NE);return new Me(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new Y(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Y(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<kE)throw new Y(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Y(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/NE}_compareTo(e){return this.seconds===e.seconds?_e(this.nanoseconds,e.nanoseconds):_e(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(xc(e,Me._jsonSchema))return new Me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-kE;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Me._jsonSchemaVersion="firestore/timestamp/1.0",Me._jsonSchema={type:rt("string",Me._jsonSchemaVersion),seconds:rt("number"),nanoseconds:rt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{static fromTimestamp(e){return new le(e)}static min(){return new le(new Me(0,0))}static max(){return new le(new Me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=-1;function Lj(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=le.fromTimestamp(r===1e9?new Me(n+1,0):new Me(n,r));return new Ms(s,te.empty(),e)}function Vj(t){return new Ms(t.readTime,t.key,Xl)}class Ms{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Ms(le.min(),te.empty(),Xl)}static max(){return new Ms(le.max(),te.empty(),Xl)}}function Fj(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=te.comparator(t.documentKey,e.documentKey),n!==0?n:_e(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uj="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class zj{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ua(t){if(t.code!==U.FAILED_PRECONDITION||t.message!==Uj)throw t;X("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ie(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new $((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof $?n:$.resolve(n)}catch(n){return $.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):$.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):$.reject(n)}static resolve(e){return new $((n,r)=>{n(e)})}static reject(e){return new $((n,r)=>{r(e)})}static waitFor(e){return new $((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=$.resolve(!1);for(const r of e)n=n.next(s=>s?$.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new $((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next(d=>{o[h]=d,++a,a===i&&r(o)},d=>s(d))}})}static doWhile(e,n){return new $((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function Bj(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ha(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}$d.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=-1;function Wd(t){return t==null}function zh(t){return t===0&&1/t==-1/0}function $j(t){return typeof t=="number"&&Number.isInteger(t)&&!zh(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI="";function Wj(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=AE(e)),e=qj(t.get(n),e);return AE(e)}function qj(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case BI:n+="";break;default:n+=i}}return n}function AE(t){return t+BI+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RE(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Qs(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function $I(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let st=class Lm{constructor(e,n){this.comparator=e,this.root=n||Ns.EMPTY}insert(e,n){return new Lm(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ns.BLACK,null,null))}remove(e){return new Lm(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ns.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Su(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Su(this.root,e,this.comparator,!1)}getReverseIterator(){return new Su(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Su(this.root,e,this.comparator,!0)}},Su=class{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Ns=class pr{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??pr.RED,this.left=s??pr.EMPTY,this.right=i??pr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new pr(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return pr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return pr.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ie(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ie(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ie(27949);return e+(this.isRed()?0:1)}};Ns.EMPTY=null,Ns.RED=!0,Ns.BLACK=!1;Ns.EMPTY=new class{constructor(){this.size=0}get key(){throw ie(57766)}get value(){throw ie(16141)}get color(){throw ie(16727)}get left(){throw ie(29726)}get right(){throw ie(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new Ns(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.comparator=e,this.data=new st(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new PE(this.data.getIterator())}getIteratorFrom(e){return new PE(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof lt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new lt(this.comparator);return n.data=e,n}}class PE{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.fields=e,e.sort(Et.comparator)}static empty(){return new an([])}unionWith(e){let n=new lt(Et.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new an(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return qo(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new WI("Invalid base64 string: "+i):i}}(e);return new It(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new It(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return _e(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}It.EMPTY_BYTE_STRING=new It("");const Hj=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Os(t){if(Ie(!!t,39018),typeof t=="string"){let e=0;const n=Hj.exec(t);if(Ie(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Qe(t.seconds),nanos:Qe(t.nanos)}}function Qe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ls(t){return typeof t=="string"?It.fromBase64String(t):It.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qI="server_timestamp",HI="__type__",GI="__previous_value__",KI="__local_write_time__";function Ay(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[HI])==null?void 0:r.stringValue)===qI}function qd(t){const e=t.mapValue.fields[GI];return Ay(e)?qd(e):e}function Jl(t){const e=Os(t.mapValue.fields[KI].timestampValue);return new Me(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gj{constructor(e,n,r,s,i,o,a,c,h,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d}}const Bh="(default)";class Zl{constructor(e,n){this.projectId=e,this.database=n||Bh}static empty(){return new Zl("","")}get isDefaultDatabase(){return this.database===Bh}isEqual(e){return e instanceof Zl&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QI="__type__",Kj="__max__",ku={mapValue:{}},YI="__vector__",$h="value";function Vs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ay(t)?4:Yj(t)?9007199254740991:Qj(t)?10:11:ie(28295,{value:t})}function sr(t,e){if(t===e)return!0;const n=Vs(t);if(n!==Vs(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Jl(t).isEqual(Jl(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Os(s.timestampValue),a=Os(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Ls(s.bytesValue).isEqual(Ls(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Qe(s.geoPointValue.latitude)===Qe(i.geoPointValue.latitude)&&Qe(s.geoPointValue.longitude)===Qe(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Qe(s.integerValue)===Qe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Qe(s.doubleValue),a=Qe(i.doubleValue);return o===a?zh(o)===zh(a):isNaN(o)&&isNaN(a)}return!1}(t,e);case 9:return qo(t.arrayValue.values||[],e.arrayValue.values||[],sr);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(RE(o)!==RE(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!sr(o[c],a[c])))return!1;return!0}(t,e);default:return ie(52216,{left:t})}}function ec(t,e){return(t.values||[]).find(n=>sr(n,e))!==void 0}function Ho(t,e){if(t===e)return 0;const n=Vs(t),r=Vs(e);if(n!==r)return _e(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return _e(t.booleanValue,e.booleanValue);case 2:return function(i,o){const a=Qe(i.integerValue||i.doubleValue),c=Qe(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(t,e);case 3:return bE(t.timestampValue,e.timestampValue);case 4:return bE(Jl(t),Jl(e));case 5:return Om(t.stringValue,e.stringValue);case 6:return function(i,o){const a=Ls(i),c=Ls(o);return a.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const a=i.split("/"),c=o.split("/");for(let h=0;h<a.length&&h<c.length;h++){const d=_e(a[h],c[h]);if(d!==0)return d}return _e(a.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const a=_e(Qe(i.latitude),Qe(o.latitude));return a!==0?a:_e(Qe(i.longitude),Qe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return DE(t.arrayValue,e.arrayValue);case 10:return function(i,o){var m,w,N,R;const a=i.fields||{},c=o.fields||{},h=(m=a[$h])==null?void 0:m.arrayValue,d=(w=c[$h])==null?void 0:w.arrayValue,p=_e(((N=h==null?void 0:h.values)==null?void 0:N.length)||0,((R=d==null?void 0:d.values)==null?void 0:R.length)||0);return p!==0?p:DE(h,d)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===ku.mapValue&&o===ku.mapValue)return 0;if(i===ku.mapValue)return 1;if(o===ku.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),h=o.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const m=Om(c[p],d[p]);if(m!==0)return m;const w=Ho(a[c[p]],h[d[p]]);if(w!==0)return w}return _e(c.length,d.length)}(t.mapValue,e.mapValue);default:throw ie(23264,{he:n})}}function bE(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return _e(t,e);const n=Os(t),r=Os(e),s=_e(n.seconds,r.seconds);return s!==0?s:_e(n.nanos,r.nanos)}function DE(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Ho(n[s],r[s]);if(i)return i}return _e(n.length,r.length)}function Go(t){return Vm(t)}function Vm(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Os(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Ls(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return te.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Vm(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Vm(n.fields[o])}`;return s+"}"}(t.mapValue):ie(61005,{value:t})}function Yu(t){switch(Vs(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qd(t);return e?16+Yu(e):16;case 5:return 2*t.stringValue.length;case 6:return Ls(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Yu(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Qs(r.fields,(i,o)=>{s+=i.length+Yu(o)}),s}(t.mapValue);default:throw ie(13486,{value:t})}}function jE(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Fm(t){return!!t&&"integerValue"in t}function Ry(t){return!!t&&"arrayValue"in t}function ME(t){return!!t&&"nullValue"in t}function OE(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Xu(t){return!!t&&"mapValue"in t}function Qj(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[QI])==null?void 0:r.stringValue)===YI}function vl(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Qs(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=vl(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=vl(t.arrayValue.values[n]);return e}return{...t}}function Yj(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===Kj}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e){this.value=e}static empty(){return new Ht({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Xu(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=vl(n)}setAll(e){let n=Et.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=vl(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Xu(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return sr(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Xu(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Qs(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ht(vl(this.value))}}function XI(t){const e=[];return Qs(t.fields,(n,r)=>{const s=new Et([n]);if(Xu(r)){const i=XI(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new an(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Pt(e,0,le.min(),le.min(),le.min(),Ht.empty(),0)}static newFoundDocument(e,n,r,s){return new Pt(e,1,n,le.min(),r,s,0)}static newNoDocument(e,n){return new Pt(e,2,n,le.min(),le.min(),Ht.empty(),0)}static newUnknownDocument(e,n){return new Pt(e,3,n,le.min(),le.min(),Ht.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(le.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ht.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ht.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=le.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(e,n){this.position=e,this.inclusive=n}}function LE(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=te.comparator(te.fromName(o.referenceValue),n.key):r=Ho(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function VE(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!sr(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,n="asc"){this.field=e,this.dir=n}}function Xj(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let JI=class{};class nt extends JI{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new Zj(e,n,r):n==="array-contains"?new nM(e,r):n==="in"?new rM(e,r):n==="not-in"?new sM(e,r):n==="array-contains-any"?new iM(e,r):new nt(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new eM(e,r):new tM(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Ho(n,this.value)):n!==null&&Vs(this.value)===Vs(n)&&this.matchesComparison(Ho(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ie(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ln extends JI{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Ln(e,n)}matches(e){return ZI(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ZI(t){return t.op==="and"}function eC(t){return Jj(t)&&ZI(t)}function Jj(t){for(const e of t.filters)if(e instanceof Ln)return!1;return!0}function Um(t){if(t instanceof nt)return t.field.canonicalString()+t.op.toString()+Go(t.value);if(eC(t))return t.filters.map(e=>Um(e)).join(",");{const e=t.filters.map(n=>Um(n)).join(",");return`${t.op}(${e})`}}function tC(t,e){return t instanceof nt?function(r,s){return s instanceof nt&&r.op===s.op&&r.field.isEqual(s.field)&&sr(r.value,s.value)}(t,e):t instanceof Ln?function(r,s){return s instanceof Ln&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,a)=>i&&tC(o,s.filters[a]),!0):!1}(t,e):void ie(19439)}function nC(t){return t instanceof nt?function(n){return`${n.field.canonicalString()} ${n.op} ${Go(n.value)}`}(t):t instanceof Ln?function(n){return n.op.toString()+" {"+n.getFilters().map(nC).join(" ,")+"}"}(t):"Filter"}class Zj extends nt{constructor(e,n,r){super(e,n,r),this.key=te.fromName(r.referenceValue)}matches(e){const n=te.comparator(e.key,this.key);return this.matchesComparison(n)}}class eM extends nt{constructor(e,n){super(e,"in",n),this.keys=rC("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class tM extends nt{constructor(e,n){super(e,"not-in",n),this.keys=rC("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function rC(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(r=>te.fromName(r.referenceValue))}class nM extends nt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ry(n)&&ec(n.arrayValue,this.value)}}class rM extends nt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ec(this.value.arrayValue,n)}}class sM extends nt{constructor(e,n){super(e,"not-in",n)}matches(e){if(ec(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ec(this.value.arrayValue,n)}}class iM extends nt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ry(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ec(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oM{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.Te=null}}function FE(t,e=null,n=[],r=[],s=null,i=null,o=null){return new oM(t,e,n,r,s,i,o)}function Py(t){const e=ce(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Um(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Wd(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Go(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Go(r)).join(",")),e.Te=n}return e.Te}function by(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Xj(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!tC(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!VE(t.startAt,e.startAt)&&VE(t.endAt,e.endAt)}function zm(t){return te.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function aM(t,e,n,r,s,i,o,a){return new da(t,e,n,r,s,i,o,a)}function Hd(t){return new da(t)}function UE(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function sC(t){return t.collectionGroup!==null}function wl(t){const e=ce(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new lt(Et.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(a=a.add(h.field))})}),a})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new tc(i,r))}),n.has(Et.keyField().canonicalString())||e.Ie.push(new tc(Et.keyField(),r))}return e.Ie}function er(t){const e=ce(t);return e.Ee||(e.Ee=lM(e,wl(t))),e.Ee}function lM(t,e){if(t.limitType==="F")return FE(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new tc(s.field,i)});const n=t.endAt?new Wh(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Wh(t.startAt.position,t.startAt.inclusive):null;return FE(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Bm(t,e){const n=t.filters.concat([e]);return new da(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function qh(t,e,n){return new da(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Gd(t,e){return by(er(t),er(e))&&t.limitType===e.limitType}function iC(t){return`${Py(er(t))}|lt:${t.limitType}`}function no(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>nC(s)).join(", ")}]`),Wd(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Go(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Go(s)).join(",")),`Target(${r})`}(er(t))}; limitType=${t.limitType})`}function Kd(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):te.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of wl(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,a,c){const h=LE(o,a,c);return o.inclusive?h<=0:h<0}(r.startAt,wl(r),s)||r.endAt&&!function(o,a,c){const h=LE(o,a,c);return o.inclusive?h>=0:h>0}(r.endAt,wl(r),s))}(t,e)}function cM(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function oC(t){return(e,n)=>{let r=!1;for(const s of wl(t)){const i=uM(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function uM(t,e,n){const r=t.field.isKeyField()?te.comparator(e.key,n.key):function(i,o,a){const c=o.data.field(i),h=a.data.field(i);return c!==null&&h!==null?Ho(c,h):ie(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ie(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Qs(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return $I(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hM=new st(te.comparator);function Mr(){return hM}const aC=new st(te.comparator);function rl(...t){let e=aC;for(const n of t)e=e.insert(n.key,n);return e}function lC(t){let e=aC;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function pi(){return El()}function cC(){return El()}function El(){return new Bi(t=>t.toString(),(t,e)=>t.isEqual(e))}const dM=new st(te.comparator),fM=new lt(te.comparator);function ve(...t){let e=fM;for(const n of t)e=e.add(n);return e}const pM=new lt(_e);function mM(){return pM}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dy(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zh(e)?"-0":e}}function uC(t){return{integerValue:""+t}}function gM(t,e){return $j(e)?uC(e):Dy(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(){this._=void 0}}function yM(t,e,n){return t instanceof nc?function(s,i){const o={fields:{[HI]:{stringValue:qI},[KI]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ay(i)&&(i=qd(i)),i&&(o.fields[GI]=i),{mapValue:o}}(n,e):t instanceof rc?dC(t,e):t instanceof sc?fC(t,e):function(s,i){const o=hC(s,i),a=zE(o)+zE(s.Ae);return Fm(o)&&Fm(s.Ae)?uC(a):Dy(s.serializer,a)}(t,e)}function _M(t,e,n){return t instanceof rc?dC(t,e):t instanceof sc?fC(t,e):n}function hC(t,e){return t instanceof Hh?function(r){return Fm(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class nc extends Qd{}class rc extends Qd{constructor(e){super(),this.elements=e}}function dC(t,e){const n=pC(e);for(const r of t.elements)n.some(s=>sr(s,r))||n.push(r);return{arrayValue:{values:n}}}class sc extends Qd{constructor(e){super(),this.elements=e}}function fC(t,e){let n=pC(e);for(const r of t.elements)n=n.filter(s=>!sr(s,r));return{arrayValue:{values:n}}}class Hh extends Qd{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function zE(t){return Qe(t.integerValue||t.doubleValue)}function pC(t){return Ry(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vM{constructor(e,n){this.field=e,this.transform=n}}function wM(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof rc&&s instanceof rc||r instanceof sc&&s instanceof sc?qo(r.elements,s.elements,sr):r instanceof Hh&&s instanceof Hh?sr(r.Ae,s.Ae):r instanceof nc&&s instanceof nc}(t.transform,e.transform)}class EM{constructor(e,n){this.version=e,this.transformResults=n}}class Dn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Dn}static exists(e){return new Dn(void 0,e)}static updateTime(e){return new Dn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ju(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Yd{}function mC(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new yC(t.key,Dn.none()):new Ic(t.key,t.data,Dn.none());{const n=t.data,r=Ht.empty();let s=new lt(Et.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Ys(t.key,r,new an(s.toArray()),Dn.none())}}function TM(t,e,n){t instanceof Ic?function(s,i,o){const a=s.value.clone(),c=$E(s.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(t,e,n):t instanceof Ys?function(s,i,o){if(!Ju(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=$E(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(gC(s)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Tl(t,e,n,r){return t instanceof Ic?function(i,o,a,c){if(!Ju(i.precondition,o))return a;const h=i.value.clone(),d=WE(i.fieldTransforms,c,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Ys?function(i,o,a,c){if(!Ju(i.precondition,o))return a;const h=WE(i.fieldTransforms,c,o),d=o.data;return d.setAll(gC(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,a){return Ju(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(t,e,n)}function xM(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=hC(r.transform,s||null);i!=null&&(n===null&&(n=Ht.empty()),n.set(r.field,i))}return n||null}function BE(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&qo(r,s,(i,o)=>wM(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ic extends Yd{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ys extends Yd{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function gC(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function $E(t,e,n){const r=new Map;Ie(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,_M(o,a,n[s]))}return r}function WE(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,yM(i,o,e))}return r}class yC extends Yd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class IM extends Yd{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CM{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&TM(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Tl(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Tl(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=cC();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const c=mC(o,a);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(le.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ve())}isEqual(e){return this.batchId===e.batchId&&qo(this.mutations,e.mutations,(n,r)=>BE(n,r))&&qo(this.baseMutations,e.baseMutations,(n,r)=>BE(n,r))}}class jy{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Ie(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return dM}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new jy(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SM{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kM{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je,we;function NM(t){switch(t){case U.OK:return ie(64938);case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0;default:return ie(15467,{code:t})}}function _C(t){if(t===void 0)return jr("GRPC error has no .code"),U.UNKNOWN;switch(t){case Je.OK:return U.OK;case Je.CANCELLED:return U.CANCELLED;case Je.UNKNOWN:return U.UNKNOWN;case Je.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case Je.INTERNAL:return U.INTERNAL;case Je.UNAVAILABLE:return U.UNAVAILABLE;case Je.UNAUTHENTICATED:return U.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case Je.NOT_FOUND:return U.NOT_FOUND;case Je.ALREADY_EXISTS:return U.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return U.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case Je.ABORTED:return U.ABORTED;case Je.OUT_OF_RANGE:return U.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return U.UNIMPLEMENTED;case Je.DATA_LOSS:return U.DATA_LOSS;default:return ie(39323,{code:t})}}(we=Je||(Je={}))[we.OK=0]="OK",we[we.CANCELLED=1]="CANCELLED",we[we.UNKNOWN=2]="UNKNOWN",we[we.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",we[we.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",we[we.NOT_FOUND=5]="NOT_FOUND",we[we.ALREADY_EXISTS=6]="ALREADY_EXISTS",we[we.PERMISSION_DENIED=7]="PERMISSION_DENIED",we[we.UNAUTHENTICATED=16]="UNAUTHENTICATED",we[we.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",we[we.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",we[we.ABORTED=10]="ABORTED",we[we.OUT_OF_RANGE=11]="OUT_OF_RANGE",we[we.UNIMPLEMENTED=12]="UNIMPLEMENTED",we[we.INTERNAL=13]="INTERNAL",we[we.UNAVAILABLE=14]="UNAVAILABLE",we[we.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AM(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RM=new ks([4294967295,4294967295],0);function qE(t){const e=AM().encode(t),n=new bI;return n.update(e),new Uint8Array(n.digest())}function HE(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new ks([n,r],0),new ks([s,i],0)]}class My{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new sl(`Invalid padding: ${n}`);if(r<0)throw new sl(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new sl(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new sl(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=ks.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(ks.fromNumber(r)));return s.compare(RM)===1&&(s=new ks([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=qE(e),[r,s]=HE(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new My(i,s,n);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.ge===0)return;const n=qE(e),[r,s]=HE(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class sl extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Cc.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Xd(le.min(),s,new st(_e),Mr(),ve())}}class Cc{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Cc(r,n,ve(),ve(),ve())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class vC{constructor(e,n){this.targetId=e,this.Ce=n}}class wC{constructor(e,n,r=It.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class GE{constructor(){this.ve=0,this.Fe=KE(),this.Me=It.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ve(),n=ve(),r=ve();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ie(38017,{changeType:i})}}),new Cc(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=KE()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Ie(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class PM{constructor(e){this.Ge=e,this.ze=new Map,this.je=Mr(),this.Je=Nu(),this.He=Nu(),this.Ye=new st(_e)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:ie(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,s)=>{this.rt(s)&&n(s)})}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(zm(i))if(r===0){const o=new te(i.path);this.et(n,o,Pt.newNoDocument(o,le.min()))}else Ie(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const a=this.ut(e),c=a?this.ct(a,e,o):1;if(c!==0){this.it(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,a;try{o=Ls(r).toUint8Array()}catch(c){if(c instanceof WI)return Wo("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new My(o,s,i)}catch(c){return Wo(c instanceof sl?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.ge===0?null:a}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.et(n,i,null),s++)}),s}Tt(e){const n=new Map;this.ze.forEach((i,o)=>{const a=this.ot(o);if(a){if(i.current&&zm(a.target)){const c=new te(a.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,Pt.newNoDocument(c,e))}i.Be&&(n.set(o,i.ke()),i.qe())}});let r=ve();this.He.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new Xd(e,n,this.Ye,this.je,r);return this.je=Mr(),this.Je=Nu(),this.He=Nu(),this.Ye=new st(_e),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new GE,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new lt(_e),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new lt(_e),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||X("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new GE),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function Nu(){return new st(te.comparator)}function KE(){return new st(te.comparator)}const bM={asc:"ASCENDING",desc:"DESCENDING"},DM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jM={and:"AND",or:"OR"};class MM{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function $m(t,e){return t.useProto3Json||Wd(e)?e:{value:e}}function Gh(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function EC(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function OM(t,e){return Gh(t,e.toTimestamp())}function tr(t){return Ie(!!t,49232),le.fromTimestamp(function(n){const r=Os(n);return new Me(r.seconds,r.nanos)}(t))}function Oy(t,e){return Wm(t,e).canonicalString()}function Wm(t,e){const n=function(s){return new Re(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function TC(t){const e=Re.fromString(t);return Ie(kC(e),10190,{key:e.toString()}),e}function qm(t,e){return Oy(t.databaseId,e.path)}function fp(t,e){const n=TC(e);if(n.get(1)!==t.databaseId.projectId)throw new Y(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Y(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new te(IC(n))}function xC(t,e){return Oy(t.databaseId,e)}function LM(t){const e=TC(t);return e.length===4?Re.emptyPath():IC(e)}function Hm(t){return new Re(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function IC(t){return Ie(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function QE(t,e,n){return{name:qm(t,e),fields:n.value.mapValue.fields}}function VM(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ie(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(Ie(d===void 0||typeof d=="string",58123),It.fromBase64String(d||"")):(Ie(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),It.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(h){const d=h.code===void 0?U.UNKNOWN:_C(h.code);return new Y(d,h.message||"")}(o);n=new wC(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=fp(t,r.document.name),i=tr(r.document.updateTime),o=r.document.createTime?tr(r.document.createTime):le.min(),a=new Ht({mapValue:{fields:r.document.fields}}),c=Pt.newFoundDocument(s,i,o,a),h=r.targetIds||[],d=r.removedTargetIds||[];n=new Zu(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=fp(t,r.document),i=r.readTime?tr(r.readTime):le.min(),o=Pt.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Zu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=fp(t,r.document),i=r.removedTargetIds||[];n=new Zu([],i,s,null)}else{if(!("filter"in e))return ie(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new kM(s,i),a=r.targetId;n=new vC(a,o)}}return n}function FM(t,e){let n;if(e instanceof Ic)n={update:QE(t,e.key,e.value)};else if(e instanceof yC)n={delete:qm(t,e.key)};else if(e instanceof Ys)n={update:QE(t,e.key,e.data),updateMask:KM(e.fieldMask)};else{if(!(e instanceof IM))return ie(16599,{Vt:e.type});n={verify:qm(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const a=o.transform;if(a instanceof nc)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof rc)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof sc)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Hh)return{fieldPath:o.field.canonicalString(),increment:a.Ae};throw ie(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:OM(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ie(27497)}(t,e.precondition)),n}function UM(t,e){return t&&t.length>0?(Ie(e!==void 0,14353),t.map(n=>function(s,i){let o=s.updateTime?tr(s.updateTime):tr(i);return o.isEqual(le.min())&&(o=tr(i)),new EM(o,s.transformResults||[])}(n,e))):[]}function zM(t,e){return{documents:[xC(t,e.path)]}}function BM(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=xC(t,s);const i=function(h){if(h.length!==0)return SC(Ln.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(d=>function(m){return{field:ro(m.field),direction:qM(m.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=$m(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:n,parent:s}}function $M(t){let e=LM(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Ie(r===1,65062);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const m=CC(p);return m instanceof Ln&&eC(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(m=>function(N){return new tc(so(N.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(m))}(n.orderBy));let a=null;n.limit&&(a=function(p){let m;return m=typeof p=="object"?p.value:p,Wd(m)?null:m}(n.limit));let c=null;n.startAt&&(c=function(p){const m=!!p.before,w=p.values||[];return new Wh(w,m)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const m=!p.before,w=p.values||[];return new Wh(w,m)}(n.endAt)),aM(e,s,o,i,a,"F",c,h)}function WM(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ie(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function CC(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=so(n.unaryFilter.field);return nt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=so(n.unaryFilter.field);return nt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=so(n.unaryFilter.field);return nt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=so(n.unaryFilter.field);return nt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ie(61313);default:return ie(60726)}}(t):t.fieldFilter!==void 0?function(n){return nt.create(so(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ie(58110);default:return ie(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Ln.create(n.compositeFilter.filters.map(r=>CC(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ie(1026)}}(n.compositeFilter.op))}(t):ie(30097,{filter:t})}function qM(t){return bM[t]}function HM(t){return DM[t]}function GM(t){return jM[t]}function ro(t){return{fieldPath:t.canonicalString()}}function so(t){return Et.fromServerFormat(t.fieldPath)}function SC(t){return t instanceof nt?function(n){if(n.op==="=="){if(OE(n.value))return{unaryFilter:{field:ro(n.field),op:"IS_NAN"}};if(ME(n.value))return{unaryFilter:{field:ro(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(OE(n.value))return{unaryFilter:{field:ro(n.field),op:"IS_NOT_NAN"}};if(ME(n.value))return{unaryFilter:{field:ro(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ro(n.field),op:HM(n.op),value:n.value}}}(t):t instanceof Ln?function(n){const r=n.getFilters().map(s=>SC(s));return r.length===1?r[0]:{compositeFilter:{op:GM(n.op),filters:r}}}(t):ie(54877,{filter:t})}function KM(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function kC(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,n,r,s,i=le.min(),o=le.min(),a=It.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new ms(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new ms(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ms(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ms(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QM{constructor(e){this.yt=e}}function YM(t){const e=$M({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?qh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XM{constructor(){this.Cn=new JM}addToCollectionParentIndex(e,n){return this.Cn.add(n),$.resolve()}getCollectionParents(e,n){return $.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return $.resolve()}deleteFieldIndex(e,n){return $.resolve()}deleteAllFieldIndexes(e){return $.resolve()}createTargetIndexes(e,n){return $.resolve()}getDocumentsMatchingTarget(e,n){return $.resolve(null)}getIndexType(e,n){return $.resolve(0)}getFieldIndexes(e,n){return $.resolve([])}getNextCollectionGroupToUpdate(e){return $.resolve(null)}getMinOffset(e,n){return $.resolve(Ms.min())}getMinOffsetFromCollectionGroup(e,n){return $.resolve(Ms.min())}updateCollectionGroup(e,n,r){return $.resolve()}updateIndexEntries(e,n){return $.resolve()}}class JM{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new lt(Re.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new lt(Re.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YE={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},NC=41943040;class Wt{static withCacheSize(e){return new Wt(e,Wt.DEFAULT_COLLECTION_PERCENTILE,Wt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Wt.DEFAULT_COLLECTION_PERCENTILE=10,Wt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Wt.DEFAULT=new Wt(NC,Wt.DEFAULT_COLLECTION_PERCENTILE,Wt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Wt.DISABLED=new Wt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Ko(0)}static cr(){return new Ko(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XE="LruGarbageCollector",ZM=1048576;function JE([t,e],[n,r]){const s=_e(t,n);return s===0?_e(e,r):s}class eO{constructor(e){this.Ir=e,this.buffer=new lt(JE),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();JE(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class tO{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){X(XE,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){ha(n)?X(XE,"Ignoring IndexedDB error during garbage collection: ",n):await ua(n)}await this.Vr(3e5)})}}class nO{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return $.resolve($d.ce);const r=new eO(n);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(X("LruGarbageCollector","Garbage collection skipped; disabled"),$.resolve(YE)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(X("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),YE):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,o,a,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(X("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,a=Date.now(),this.removeTargets(e,r,n))).next(p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),to()<=ge.DEBUG&&X("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),$.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function rO(t,e){return new nO(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sO{constructor(){this.changes=new Bi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Pt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?$.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iO{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oO{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Tl(r.mutation,s,an.empty(),Me.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ve()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ve()){const s=pi();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=rl();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=pi();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ve()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,s){let i=Mr();const o=El(),a=function(){return El()}();return n.forEach((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof Ys)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),Tl(d.mutation,h,d.mutation.getFieldMask(),Me.now())):o.set(h.key,an.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,d)=>o.set(h,d)),n.forEach((h,d)=>a.set(h,new iO(d,o.get(h)??null))),a))}recalculateAndSaveOverlays(e,n){const r=El();let s=new st((o,a)=>o-a),i=ve();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const h=n.get(c);if(h===null)return;let d=r.get(c)||an.empty();d=a.applyToLocalView(h,d),r.set(c,d);const p=(s.get(a.batchId)||ve()).add(c);s=s.insert(a.batchId,p)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),h=c.key,d=c.value,p=cC();d.forEach(m=>{if(!i.has(m)){const w=mC(n.get(m),r.get(m));w!==null&&p.set(m,w),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return $.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return te.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):sC(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):$.resolve(pi());let a=Xl,c=i;return o.next(h=>$.forEach(h,(d,p)=>(a<p.largestBatchId&&(a=p.largestBatchId),i.get(d)?$.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{c=c.insert(d,m)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,ve())).next(d=>({batchId:a,changes:lC(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new te(n)).next(r=>{let s=rl();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=rl();return this.indexManager.getCollectionParents(e,i).next(a=>$.forEach(a,c=>{const h=function(p,m){return new da(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(d=>{d.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,Pt.newInvalidDocument(d)))});let a=rl();return o.forEach((c,h)=>{const d=i.get(c);d!==void 0&&Tl(d.mutation,h,an.empty(),Me.now()),Kd(n,h)&&(a=a.insert(c,h))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aO{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return $.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:tr(s.createTime)}}(n)),$.resolve()}getNamedQuery(e,n){return $.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(s){return{name:s.name,query:YM(s.bundledQuery),readTime:tr(s.readTime)}}(n)),$.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lO{constructor(){this.overlays=new st(te.comparator),this.qr=new Map}getOverlay(e,n){return $.resolve(this.overlays.get(n))}getOverlays(e,n){const r=pi();return $.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.St(e,n,i)}),$.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),$.resolve()}getOverlaysForCollection(e,n,r){const s=pi(),i=n.length+1,o=new te(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return $.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new st((h,d)=>h-d);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=pi(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const a=pi(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,d)=>a.set(h,d)),!(a.size()>=s)););return $.resolve(a)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new SM(n,r));let i=this.qr.get(n);i===void 0&&(i=ve(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cO{constructor(){this.sessionToken=It.EMPTY_BYTE_STRING}getSessionToken(e){return $.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,$.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{constructor(){this.Qr=new lt(dt.$r),this.Ur=new lt(dt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new dt(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Gr(new dt(e,n))}zr(e,n){e.forEach(r=>this.removeReference(r,n))}jr(e){const n=new te(new Re([])),r=new dt(n,e),s=new dt(n,e+1),i=[];return this.Ur.forEachInRange([r,s],o=>{this.Gr(o),i.push(o.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new te(new Re([])),r=new dt(n,e),s=new dt(n,e+1);let i=ve();return this.Ur.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new dt(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class dt{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return te.comparator(e.key,n.key)||_e(e.Yr,n.Yr)}static Kr(e,n){return _e(e.Yr,n.Yr)||te.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uO{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new lt(dt.$r)}checkEmpty(e){return $.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new CM(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this.Zr=this.Zr.add(new dt(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return $.resolve(o)}lookupMutationBatch(e,n){return $.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return $.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return $.resolve(this.mutationQueue.length===0?Ny:this.tr-1)}getAllMutationBatches(e){return $.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new dt(n,0),s=new dt(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],o=>{const a=this.Xr(o.Yr);i.push(a)}),$.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new lt(_e);return n.forEach(s=>{const i=new dt(s,0),o=new dt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],a=>{r=r.add(a.Yr)})}),$.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;te.isDocumentKey(i)||(i=i.child(""));const o=new dt(new te(i),0);let a=new lt(_e);return this.Zr.forEachWhile(c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(a=a.add(c.Yr)),!0)},o),$.resolve(this.ti(a))}ti(e){const n=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Ie(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return $.forEach(n.mutations,s=>{const i=new dt(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,n){const r=new dt(n,0),s=this.Zr.firstAfterOrEqual(r);return $.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,$.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hO{constructor(e){this.ri=e,this.docs=function(){return new st(te.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return $.resolve(r?r.document.mutableCopy():Pt.newInvalidDocument(n))}getEntries(e,n){let r=Mr();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Pt.newInvalidDocument(s))}),$.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Mr();const o=n.path,a=new te(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Fj(Vj(d),r)<=0||(s.has(d.key)||Kd(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return $.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ie(9500)}ii(e,n){return $.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new dO(this)}getSize(e){return $.resolve(this.size)}}class dO extends sO{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),$.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fO{constructor(e){this.persistence=e,this.si=new Bi(n=>Py(n),by),this.lastRemoteSnapshotVersion=le.min(),this.highestTargetId=0,this.oi=0,this._i=new Ly,this.targetCount=0,this.ai=Ko.ur()}forEachTarget(e,n){return this.si.forEach((r,s)=>n(s)),$.resolve()}getLastRemoteSnapshotVersion(e){return $.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return $.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),$.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),$.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new Ko(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,$.resolve()}updateTargetData(e,n){return this.Pr(n),$.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,$.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),$.waitFor(i).next(()=>s)}getTargetCount(e){return $.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return $.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),$.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),$.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),$.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return $.resolve(r)}containsKey(e,n){return $.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AC{constructor(e,n){this.ui={},this.overlays={},this.ci=new $d(0),this.li=!1,this.li=!0,this.hi=new cO,this.referenceDelegate=e(this),this.Pi=new fO(this),this.indexManager=new XM,this.remoteDocumentCache=function(s){return new hO(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new QM(n),this.Ii=new aO(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new lO,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new uO(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){X("MemoryPersistence","Starting transaction:",e);const s=new pO(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,n){return $.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,n)))}}class pO extends zj{constructor(e){super(),this.currentSequenceNumber=e}}class Vy{constructor(e){this.persistence=e,this.Ri=new Ly,this.Vi=null}static mi(e){return new Vy(e)}get fi(){if(this.Vi)return this.Vi;throw ie(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),$.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),$.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),$.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return $.forEach(this.fi,r=>{const s=te.fromPath(r);return this.gi(e,s).next(i=>{i||n.removeEntry(s,le.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return $.or([()=>$.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Kh{constructor(e,n){this.persistence=e,this.pi=new Bi(r=>Wj(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=rO(this,n)}static mi(e,n){return new Kh(e,n)}Ei(){}di(e){return $.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}wr(e){let n=0;return this.pr(e,r=>{n++}).next(()=>n)}pr(e,n){return $.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?$.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,o=>this.br(e,o,n).next(a=>{a||(r++,i.removeEntry(o,le.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),$.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),$.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),$.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),$.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Yu(e.data.value)),n}br(e,n,r){return $.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return $.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=ve(),s=ve();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Fy(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mO{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gO{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return zP()?8:Bj(jt())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ws(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new mO;return this.Ss(e,n,o).next(a=>{if(i.result=a,this.Vs)return this.bs(e,n,o,a.size)})}).next(()=>i.result)}bs(e,n,r,s){return r.documentReadCount<this.fs?(to()<=ge.DEBUG&&X("QueryEngine","SDK will not create cache indexes for query:",no(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),$.resolve()):(to()<=ge.DEBUG&&X("QueryEngine","Query:",no(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(to()<=ge.DEBUG&&X("QueryEngine","The SDK decides to create cache indexes for query:",no(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,er(n))):$.resolve())}ys(e,n){if(UE(n))return $.resolve(null);let r=er(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=qh(n,null,"F"),r=er(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ve(...i);return this.ps.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const h=this.Ds(n,a);return this.Cs(n,h,o,c.readTime)?this.ys(e,qh(n,null,"F")):this.vs(e,h,n,c)}))})))}ws(e,n,r,s){return UE(n)||s.isEqual(le.min())?$.resolve(null):this.ps.getDocuments(e,r).next(i=>{const o=this.Ds(n,i);return this.Cs(n,o,r,s)?$.resolve(null):(to()<=ge.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),no(n)),this.vs(e,o,n,Lj(s,Xl)).next(a=>a))})}Ds(e,n){let r=new lt(oC(e));return n.forEach((s,i)=>{Kd(e,i)&&(r=r.add(i))}),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return to()<=ge.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",no(n)),this.ps.getDocumentsMatchingQuery(e,n,Ms.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy="LocalStore",yO=3e8;class _O{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new st(_e),this.xs=new Bi(i=>Py(i),by),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new oO(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function vO(t,e,n,r){return new _O(t,e,n,r)}async function RC(t,e){const n=ce(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let c=ve();for(const h of s){o.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){a.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next(h=>({Ls:h,removedBatchIds:o,addedBatchIds:a}))})})}function wO(t,e){const n=ce(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(a,c,h,d){const p=h.batch,m=p.keys();let w=$.resolve();return m.forEach(N=>{w=w.next(()=>d.getEntry(c,N)).next(R=>{const D=h.docVersions.get(N);Ie(D!==null,48541),R.version.compareTo(D)<0&&(p.applyToRemoteDocument(R,h),R.isValidDocument()&&(R.setReadTime(h.commitVersion),d.addEntry(R)))})}),w.next(()=>a.mutationQueue.removeMutationBatch(c,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let c=ve();for(let h=0;h<a.mutationResults.length;++h)a.mutationResults[h].transformResults.length>0&&(c=c.add(a.batch.mutations[h].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function PC(t){const e=ce(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function EO(t,e){const n=ce(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const a=[];e.targetChanges.forEach((d,p)=>{const m=s.get(p);if(!m)return;a.push(n.Pi.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Pi.addMatchingKeys(i,d.addedDocuments,p)));let w=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?w=w.withResumeToken(It.EMPTY_BYTE_STRING,le.min()).withLastLimboFreeSnapshotVersion(le.min()):d.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(d.resumeToken,r)),s=s.insert(p,w),function(R,D,x){return R.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=yO?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(m,w,d)&&a.push(n.Pi.updateTargetData(i,w))});let c=Mr(),h=ve();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),a.push(TO(i,o,e.documentUpdates).next(d=>{c=d.ks,h=d.qs})),!r.isEqual(le.min())){const d=n.Pi.getLastRemoteSnapshotVersion(i).next(p=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(d)}return $.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(n.Ms=s,i))}function TO(t,e,n){let r=ve(),s=ve();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Mr();return n.forEach((a,c)=>{const h=i.get(a);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(le.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):X(Uy,"Ignoring outdated watch update for ",a,". Current version:",h.version," Watch version:",c.version)}),{ks:o,qs:s}})}function xO(t,e){const n=ce(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ny),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function IO(t,e){const n=ce(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Pi.getTargetData(r,e).next(i=>i?(s=i,$.resolve(s)):n.Pi.allocateTargetId(r).next(o=>(s=new ms(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r})}async function Gm(t,e,n){const r=ce(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!ha(o))throw o;X(Uy,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function ZE(t,e,n){const r=ce(t);let s=le.min(),i=ve();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,d){const p=ce(c),m=p.xs.get(d);return m!==void 0?$.resolve(p.Ms.get(m)):p.Pi.getTargetData(h,d)}(r,o,er(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>r.Fs.getDocumentsMatchingQuery(o,e,n?s:le.min(),n?i:ve())).next(a=>(CO(r,cM(e),a),{documents:a,Qs:i})))}function CO(t,e,n){let r=t.Os.get(e)||le.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Os.set(e,r)}class e0{constructor(){this.activeTargetIds=mM()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class SO{constructor(){this.Mo=new e0,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new e0,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kO{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t0="ConnectivityMonitor";class n0{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){X(t0,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){X(t0,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Au=null;function Km(){return Au===null?Au=function(){return 268435456+Math.round(2147483648*Math.random())}():Au++,"0x"+Au.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="RestConnection",NO={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class AO{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Bh?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const o=Km(),a=this.zo(e,n.toUriEncodedString());X(pp,`Sending RPC '${e}' ${o}:`,a,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,i);const{host:h}=new URL(a),d=Gs(h);return this.Jo(e,a,c,r,d).then(p=>(X(pp,`Received RPC '${e}' ${o}: `,p),p),p=>{throw Wo(pp,`RPC '${e}' ${o} failed with error: `,p,"url: ",a,"request:",r),p})}Ho(e,n,r,s,i,o){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ca}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,n){const r=NO[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RO{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="WebChannelConnection";class PO extends AO{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const o=Km();return new Promise((a,c)=>{const h=new DI;h.setWithCredentials(!0),h.listenOnce(jI.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Qu.NO_ERROR:const p=h.getResponseJson();X(Nt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case Qu.TIMEOUT:X(Nt,`RPC '${e}' ${o} timed out`),c(new Y(U.DEADLINE_EXCEEDED,"Request time out"));break;case Qu.HTTP_ERROR:const m=h.getStatus();if(X(Nt,`RPC '${e}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let w=h.getResponseJson();Array.isArray(w)&&(w=w[0]);const N=w==null?void 0:w.error;if(N&&N.status&&N.message){const R=function(x){const _=x.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(_)>=0?_:U.UNKNOWN}(N.status);c(new Y(R,N.message))}else c(new Y(U.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new Y(U.UNAVAILABLE,"Connection failed."));break;default:ie(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{X(Nt,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(s);X(Nt,`RPC '${e}' ${o} sending request:`,s),h.send(n,"POST",d,r,15)})}T_(e,n,r){const s=Km(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=LI(),a=OI(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");X(Nt,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=o.createWebChannel(d,c);this.I_(p);let m=!1,w=!1;const N=new RO({Yo:D=>{w?X(Nt,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(m||(X(Nt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),X(Nt,`RPC '${e}' stream ${s} sending:`,D),p.send(D))},Zo:()=>p.close()}),R=(D,x,_)=>{D.listen(x,E=>{try{_(E)}catch(j){setTimeout(()=>{throw j},0)}})};return R(p,nl.EventType.OPEN,()=>{w||(X(Nt,`RPC '${e}' stream ${s} transport opened.`),N.o_())}),R(p,nl.EventType.CLOSE,()=>{w||(w=!0,X(Nt,`RPC '${e}' stream ${s} transport closed`),N.a_(),this.E_(p))}),R(p,nl.EventType.ERROR,D=>{w||(w=!0,Wo(Nt,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),N.a_(new Y(U.UNAVAILABLE,"The operation could not be completed")))}),R(p,nl.EventType.MESSAGE,D=>{var x;if(!w){const _=D.data[0];Ie(!!_,16349);const E=_,j=(E==null?void 0:E.error)||((x=E[0])==null?void 0:x.error);if(j){X(Nt,`RPC '${e}' stream ${s} received error:`,j);const z=j.status;let W=function(I){const C=Je[I];if(C!==void 0)return _C(C)}(z),T=j.message;W===void 0&&(W=U.INTERNAL,T="Unknown error status: "+z+" with message "+j.message),w=!0,N.a_(new Y(W,T)),p.close()}else X(Nt,`RPC '${e}' stream ${s} received:`,_),N.u_(_)}}),R(a,MI.STAT_EVENT,D=>{D.stat===Mm.PROXY?X(Nt,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===Mm.NOPROXY&&X(Nt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{N.__()},0),N}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}function mp(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(t){return new MM(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bC{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&X("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r0="PersistentStream";class DC{constructor(e,n,r,s,i,o,a,c){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new bC(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===U.RESOURCE_EXHAUSTED?(jr(n.toString()),jr("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===U.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===n&&this.G_(r,s)},r=>{e(()=>{const s=new Y(U.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return X(r0,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(X(r0,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class bO extends DC{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=VM(this.serializer,e),r=function(i){if(!("targetChange"in i))return le.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?le.min():o.readTime?tr(o.readTime):le.min()}(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Hm(this.serializer),n.addTarget=function(i,o){let a;const c=o.target;if(a=zm(c)?{documents:zM(i,c)}:{query:BM(i,c).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=EC(i,o.resumeToken);const h=$m(i,o.expectedCount);h!==null&&(a.expectedCount=h)}else if(o.snapshotVersion.compareTo(le.min())>0){a.readTime=Gh(i,o.snapshotVersion.toTimestamp());const h=$m(i,o.expectedCount);h!==null&&(a.expectedCount=h)}return a}(this.serializer,e);const r=WM(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Hm(this.serializer),n.removeTarget=e,this.q_(n)}}class DO extends DC{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Ie(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ie(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Ie(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=UM(e.writeResults,e.commitTime),r=tr(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Hm(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>FM(this.serializer,r))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jO{}class MO extends jO{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new Y(U.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Go(e,Wm(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Y(U.UNKNOWN,i.toString())})}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Ho(e,Wm(n,r),s,o,a,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Y(U.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class OO{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(jr(n),this.aa=!1):X("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi="RemoteStore";class LO{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(o=>{r.enqueueAndForget(async()=>{$i(this)&&(X(bi,"Restarting streams for network reachability change."),await async function(c){const h=ce(c);h.Ea.add(4),await Sc(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Zd(h)}(this))})}),this.Ra=new OO(r,s)}}async function Zd(t){if($i(t))for(const e of t.da)await e(!0)}async function Sc(t){for(const e of t.da)await e(!1)}function jC(t,e){const n=ce(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),Wy(n)?$y(n):fa(n).O_()&&By(n,e))}function zy(t,e){const n=ce(t),r=fa(n);n.Ia.delete(e),r.O_()&&MC(n,e),n.Ia.size===0&&(r.O_()?r.L_():$i(n)&&n.Ra.set("Unknown"))}function By(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(le.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}fa(t).Y_(e)}function MC(t,e){t.Va.Ue(e),fa(t).Z_(e)}function $y(t){t.Va=new PM({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),fa(t).start(),t.Ra.ua()}function Wy(t){return $i(t)&&!fa(t).x_()&&t.Ia.size>0}function $i(t){return ce(t).Ea.size===0}function OC(t){t.Va=void 0}async function VO(t){t.Ra.set("Online")}async function FO(t){t.Ia.forEach((e,n)=>{By(t,e)})}async function UO(t,e){OC(t),Wy(t)?(t.Ra.ha(e),$y(t)):t.Ra.set("Unknown")}async function zO(t,e,n){if(t.Ra.set("Online"),e instanceof wC&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const a of i.targetIds)s.Ia.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.Ia.delete(a),s.Va.removeTarget(a))}(t,e)}catch(r){X(bi,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Qh(t,r)}else if(e instanceof Zu?t.Va.Ze(e):e instanceof vC?t.Va.st(e):t.Va.tt(e),!n.isEqual(le.min()))try{const r=await PC(t.localStore);n.compareTo(r)>=0&&await function(i,o){const a=i.Va.Tt(o);return a.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ia.get(h);d&&i.Ia.set(h,d.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,h)=>{const d=i.Ia.get(c);if(!d)return;i.Ia.set(c,d.withResumeToken(It.EMPTY_BYTE_STRING,d.snapshotVersion)),MC(i,c);const p=new ms(d.target,c,h,d.sequenceNumber);By(i,p)}),i.remoteSyncer.applyRemoteEvent(a)}(t,n)}catch(r){X(bi,"Failed to raise snapshot:",r),await Qh(t,r)}}async function Qh(t,e,n){if(!ha(e))throw e;t.Ea.add(1),await Sc(t),t.Ra.set("Offline"),n||(n=()=>PC(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{X(bi,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Zd(t)})}function LC(t,e){return e().catch(n=>Qh(t,n,e))}async function ef(t){const e=ce(t),n=Fs(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ny;for(;BO(e);)try{const s=await xO(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,$O(e,s)}catch(s){await Qh(e,s)}VC(e)&&FC(e)}function BO(t){return $i(t)&&t.Ta.length<10}function $O(t,e){t.Ta.push(e);const n=Fs(t);n.O_()&&n.X_&&n.ea(e.mutations)}function VC(t){return $i(t)&&!Fs(t).x_()&&t.Ta.length>0}function FC(t){Fs(t).start()}async function WO(t){Fs(t).ra()}async function qO(t){const e=Fs(t);for(const n of t.Ta)e.ea(n.mutations)}async function HO(t,e,n){const r=t.Ta.shift(),s=jy.from(r,e,n);await LC(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await ef(t)}async function GO(t,e){e&&Fs(t).X_&&await async function(r,s){if(function(o){return NM(o)&&o!==U.ABORTED}(s.code)){const i=r.Ta.shift();Fs(r).B_(),await LC(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ef(r)}}(t,e),VC(t)&&FC(t)}async function s0(t,e){const n=ce(t);n.asyncQueue.verifyOperationInProgress(),X(bi,"RemoteStore received new credentials");const r=$i(n);n.Ea.add(3),await Sc(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Zd(n)}async function KO(t,e){const n=ce(t);e?(n.Ea.delete(2),await Zd(n)):e||(n.Ea.add(2),await Sc(n),n.Ra.set("Unknown"))}function fa(t){return t.ma||(t.ma=function(n,r,s){const i=ce(n);return i.sa(),new bO(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:VO.bind(null,t),t_:FO.bind(null,t),r_:UO.bind(null,t),H_:zO.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),Wy(t)?$y(t):t.Ra.set("Unknown")):(await t.ma.stop(),OC(t))})),t.ma}function Fs(t){return t.fa||(t.fa=function(n,r,s){const i=ce(n);return i.sa(),new DO(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:WO.bind(null,t),r_:GO.bind(null,t),ta:qO.bind(null,t),na:HO.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await ef(t)):(await t.fa.stop(),t.Ta.length>0&&(X(bi,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Sr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new qy(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Y(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Hy(t,e){if(jr("AsyncQueue",`${e}: ${t}`),ha(t))return new Y(U.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{static emptySet(e){return new Ao(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||te.comparator(n.key,r.key):(n,r)=>te.comparator(n.key,r.key),this.keyedMap=rl(),this.sortedSet=new st(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ao)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Ao;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(){this.ga=new st(te.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):ie(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,r)=>{e.push(r)}),e}}class Qo{constructor(e,n,r,s,i,o,a,c,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Qo(e,n,Ao.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Gd(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QO{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class YO{constructor(){this.queries=o0(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=ce(n),i=s.queries;s.queries=o0(),i.forEach((o,a)=>{for(const c of a.Sa)c.onError(r)})})(this,new Y(U.ABORTED,"Firestore shutting down"))}}function o0(){return new Bi(t=>iC(t),Gd)}async function Gy(t,e){const n=ce(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new QO,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const a=Hy(o,`Initialization of query '${no(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&Qy(n)}async function Ky(t,e){const n=ce(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function XO(t,e){const n=ce(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.Sa)a.Fa(s)&&(r=!0);o.wa=s}}r&&Qy(n)}function JO(t,e,n){const r=ce(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function Qy(t){t.Ca.forEach(e=>{e.next()})}var Qm,a0;(a0=Qm||(Qm={})).Ma="default",a0.Cache="cache";class Yy{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Qo(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=Qo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Qm.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(e){this.key=e}}class zC{constructor(e){this.key=e}}class ZO{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ve(),this.mutatedKeys=ve(),this.eu=oC(e),this.tu=new Ao(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new i0,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const m=s.get(d),w=Kd(this.query,p)?p:null,N=!!m&&this.mutatedKeys.has(m.key),R=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let D=!1;m&&w?m.data.isEqual(w.data)?N!==R&&(r.track({type:3,doc:w}),D=!0):this.su(m,w)||(r.track({type:2,doc:w}),D=!0,(c&&this.eu(w,c)>0||h&&this.eu(w,h)<0)&&(a=!0)):!m&&w?(r.track({type:0,doc:w}),D=!0):m&&!w&&(r.track({type:1,doc:m}),D=!0,(c||h)&&(a=!0)),D&&(w?(o=o.add(w),i=R?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Cs:a,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,p)=>function(w,N){const R=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ie(20277,{Rt:D})}};return R(w)-R(N)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(r),s=s??!1;const a=n&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,h=c!==this.Za;return this.Za=c,o.length!==0||h?{snapshot:new Qo(this.query,e.tu,i,o,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new i0,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=ve(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const n=[];return e.forEach(r=>{this.Xa.has(r)||n.push(new zC(r))}),this.Xa.forEach(r=>{e.has(r)||n.push(new UC(r))}),n}cu(e){this.Ya=e.Qs,this.Xa=ve();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return Qo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Xy="SyncEngine";class eL{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class tL{constructor(e){this.key=e,this.hu=!1}}class nL{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Bi(a=>iC(a),Gd),this.Iu=new Map,this.Eu=new Set,this.du=new st(te.comparator),this.Au=new Map,this.Ru=new Ly,this.Vu={},this.mu=new Map,this.fu=Ko.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function rL(t,e,n=!0){const r=GC(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await BC(r,e,n,!0),s}async function sL(t,e){const n=GC(t);await BC(n,e,!0,!1)}async function BC(t,e,n,r){const s=await IO(t.localStore,er(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await iL(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&jC(t.remoteStore,s),a}async function iL(t,e,n,r,s){t.pu=(p,m,w)=>async function(R,D,x,_){let E=D.view.ru(x);E.Cs&&(E=await ZE(R.localStore,D.query,!1).then(({documents:T})=>D.view.ru(T,E)));const j=_&&_.targetChanges.get(D.targetId),z=_&&_.targetMismatches.get(D.targetId)!=null,W=D.view.applyChanges(E,R.isPrimaryClient,j,z);return c0(R,D.targetId,W.au),W.snapshot}(t,p,m,w);const i=await ZE(t.localStore,e,!0),o=new ZO(e,i.Qs),a=o.ru(i.documents),c=Cc.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(a,t.isPrimaryClient,c);c0(t,n,h.au);const d=new eL(e,n,o);return t.Tu.set(e,d),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),h.snapshot}async function oL(t,e,n){const r=ce(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(o=>!Gd(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Gm(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&zy(r.remoteStore,s.targetId),Ym(r,s.targetId)}).catch(ua)):(Ym(r,s.targetId),await Gm(r.localStore,s.targetId,!0))}async function aL(t,e){const n=ce(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),zy(n.remoteStore,r.targetId))}async function lL(t,e,n){const r=mL(t);try{const s=await function(o,a){const c=ce(o),h=Me.now(),d=a.reduce((w,N)=>w.add(N.key),ve());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",w=>{let N=Mr(),R=ve();return c.Ns.getEntries(w,d).next(D=>{N=D,N.forEach((x,_)=>{_.isValidDocument()||(R=R.add(x))})}).next(()=>c.localDocuments.getOverlayedDocuments(w,N)).next(D=>{p=D;const x=[];for(const _ of a){const E=xM(_,p.get(_.key).overlayedDocument);E!=null&&x.push(new Ys(_.key,E,XI(E.value.mapValue),Dn.exists(!0)))}return c.mutationQueue.addMutationBatch(w,h,x,a)}).next(D=>{m=D;const x=D.applyToLocalDocumentSet(p,R);return c.documentOverlayCache.saveOverlays(w,D.batchId,x)})}).then(()=>({batchId:m.batchId,changes:lC(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,a,c){let h=o.Vu[o.currentUser.toKey()];h||(h=new st(_e)),h=h.insert(a,c),o.Vu[o.currentUser.toKey()]=h}(r,s.batchId,n),await kc(r,s.changes),await ef(r.remoteStore)}catch(s){const i=Hy(s,"Failed to persist write");n.reject(i)}}async function $C(t,e){const n=ce(t);try{const r=await EO(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Au.get(i);o&&(Ie(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Ie(o.hu,14607):s.removedDocuments.size>0&&(Ie(o.hu,42227),o.hu=!1))}),await kc(n,r,e)}catch(r){await ua(r)}}function l0(t,e,n){const r=ce(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach((i,o)=>{const a=o.view.va(e);a.snapshot&&s.push(a.snapshot)}),function(o,a){const c=ce(o);c.onlineState=a;let h=!1;c.queries.forEach((d,p)=>{for(const m of p.Sa)m.va(a)&&(h=!0)}),h&&Qy(c)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function cL(t,e,n){const r=ce(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new st(te.comparator);o=o.insert(i,Pt.newNoDocument(i,le.min()));const a=ve().add(i),c=new Xd(le.min(),new Map,new st(_e),o,a);await $C(r,c),r.du=r.du.remove(i),r.Au.delete(e),Jy(r)}else await Gm(r.localStore,e,!1).then(()=>Ym(r,e,n)).catch(ua)}async function uL(t,e){const n=ce(t),r=e.batch.batchId;try{const s=await wO(n.localStore,e);qC(n,r,null),WC(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await kc(n,s)}catch(s){await ua(s)}}async function hL(t,e,n){const r=ce(t);try{const s=await function(o,a){const c=ce(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return c.mutationQueue.lookupMutationBatch(h,a).next(p=>(Ie(p!==null,37113),d=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>c.localDocuments.getDocuments(h,d))})}(r.localStore,e);qC(r,e,n),WC(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await kc(r,s)}catch(s){await ua(s)}}function WC(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function qC(t,e,n){const r=ce(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Ym(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(r=>{t.Ru.containsKey(r)||HC(t,r)})}function HC(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(zy(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),Jy(t))}function c0(t,e,n){for(const r of n)r instanceof UC?(t.Ru.addReference(r.key,e),dL(t,r)):r instanceof zC?(X(Xy,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||HC(t,r.key)):ie(19791,{wu:r})}function dL(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(X(Xy,"New document in limbo: "+n),t.Eu.add(r),Jy(t))}function Jy(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new te(Re.fromString(e)),r=t.fu.next();t.Au.set(r,new tL(n)),t.du=t.du.insert(n,r),jC(t.remoteStore,new ms(er(Hd(n.path)),r,"TargetPurposeLimboResolution",$d.ce))}}async function kc(t,e,n){const r=ce(t),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((a,c)=>{o.push(r.pu(c,e,n).then(h=>{var d;if((h||n)&&r.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=Fy.As(c.targetId,h);i.push(p)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(c,h){const d=ce(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>$.forEach(h,m=>$.forEach(m.Es,w=>d.persistence.referenceDelegate.addReference(p,m.targetId,w)).next(()=>$.forEach(m.ds,w=>d.persistence.referenceDelegate.removeReference(p,m.targetId,w)))))}catch(p){if(!ha(p))throw p;X(Uy,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const w=d.Ms.get(m),N=w.snapshotVersion,R=w.withLastLimboFreeSnapshotVersion(N);d.Ms=d.Ms.insert(m,R)}}}(r.localStore,i))}async function fL(t,e){const n=ce(t);if(!n.currentUser.isEqual(e)){X(Xy,"User change. New user:",e.toKey());const r=await RC(n.localStore,e);n.currentUser=e,function(i,o){i.mu.forEach(a=>{a.forEach(c=>{c.reject(new Y(U.CANCELLED,o))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await kc(n,r.Ls)}}function pL(t,e){const n=ce(t),r=n.Au.get(e);if(r&&r.hu)return ve().add(r.key);{let s=ve();const i=n.Iu.get(e);if(!i)return s;for(const o of i){const a=n.Tu.get(o);s=s.unionWith(a.view.nu)}return s}}function GC(t){const e=ce(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=$C.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=pL.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=cL.bind(null,e),e.Pu.H_=XO.bind(null,e.eventManager),e.Pu.yu=JO.bind(null,e.eventManager),e}function mL(t){const e=ce(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=uL.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=hL.bind(null,e),e}class Yh{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Jd(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return vO(this.persistence,new gO,e.initialUser,this.serializer)}Cu(e){return new AC(Vy.mi,this.serializer)}Du(e){return new SO}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Yh.provider={build:()=>new Yh};class gL extends Yh{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Ie(this.persistence.referenceDelegate instanceof Kh,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new tO(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Wt.withCacheSize(this.cacheSizeBytes):Wt.DEFAULT;return new AC(r=>Kh.mi(r,n),this.serializer)}}class Xm{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>l0(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=fL.bind(null,this.syncEngine),await KO(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new YO}()}createDatastore(e){const n=Jd(e.databaseInfo.databaseId),r=function(i){return new PO(i)}(e.databaseInfo);return function(i,o,a,c){return new MO(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,a){return new LO(r,s,i,o,a)}(this.localStore,this.datastore,e.asyncQueue,n=>l0(this.syncEngine,n,0),function(){return n0.v()?new n0:new kO}())}createSyncEngine(e,n){return function(s,i,o,a,c,h,d){const p=new nL(s,i,o,a,c,h);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=ce(s);X(bi,"RemoteStore shutting down."),i.Ea.add(5),await Sc(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}Xm.provider={build:()=>new Xm};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):jr("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us="FirestoreClient";class yL{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=ky.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{X(Us,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(X(Us,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Sr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Hy(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function gp(t,e){t.asyncQueue.verifyOperationInProgress(),X(Us,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await RC(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function u0(t,e){t.asyncQueue.verifyOperationInProgress();const n=await _L(t);X(Us,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>s0(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>s0(e.remoteStore,s)),t._onlineComponents=e}async function _L(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){X(Us,"Using user provided OfflineComponentProvider");try{await gp(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===U.FAILED_PRECONDITION||s.code===U.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;Wo("Error using user provided cache. Falling back to memory cache: "+n),await gp(t,new Yh)}}else X(Us,"Using default OfflineComponentProvider"),await gp(t,new gL(void 0));return t._offlineComponents}async function KC(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(X(Us,"Using user provided OnlineComponentProvider"),await u0(t,t._uninitializedComponentsProvider._online)):(X(Us,"Using default OnlineComponentProvider"),await u0(t,new Xm))),t._onlineComponents}function vL(t){return KC(t).then(e=>e.syncEngine)}async function Xh(t){const e=await KC(t),n=e.eventManager;return n.onListen=rL.bind(null,e.syncEngine),n.onUnlisten=oL.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=sL.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=aL.bind(null,e.syncEngine),n}function wL(t,e,n={}){const r=new Sr;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,a,c,h){const d=new Zy({next:m=>{d.Nu(),o.enqueueAndForget(()=>Ky(i,p));const w=m.docs.has(a);!w&&m.fromCache?h.reject(new Y(U.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&m.fromCache&&c&&c.source==="server"?h.reject(new Y(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new Yy(Hd(a.path),d,{includeMetadataChanges:!0,qa:!0});return Gy(i,p)}(await Xh(t),t.asyncQueue,e,n,r)),r.promise}function EL(t,e,n={}){const r=new Sr;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,a,c,h){const d=new Zy({next:m=>{d.Nu(),o.enqueueAndForget(()=>Ky(i,p)),m.fromCache&&c.source==="server"?h.reject(new Y(U.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new Yy(a,d,{includeMetadataChanges:!0,qa:!0});return Gy(i,p)}(await Xh(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QC(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h0=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YC="firestore.googleapis.com",d0=!0;class f0{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new Y(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=YC,this.ssl=d0}else this.host=e.host,this.ssl=e.ssl??d0;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=NC;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ZM)throw new Y(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Mj("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=QC(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new Y(U.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new Y(U.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new Y(U.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class tf{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new f0({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Y(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Y(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new f0(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Cj;switch(r.type){case"firstParty":return new Aj(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Y(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=h0.get(n);r&&(X("ComponentProvider","Removing Datastore"),h0.delete(n),r.terminate())}(this),Promise.resolve()}}function TL(t,e,n,r={}){var h;t=cn(t,tf);const s=Gs(e),i=t._getSettings(),o={...i,emulatorOptions:t._getEmulatorOptions()},a=`${e}:${n}`;s&&(fy(`https://${a}`),py("Firestore",!0)),i.host!==YC&&i.host!==a&&Wo("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:s,emulatorOptions:r};if(!Ds(c,o)&&(t._setSettings(c),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=At.MOCK_USER;else{d=Wx(r.mockUserToken,(h=t._app)==null?void 0:h.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new Y(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new At(m)}t._authCredentials=new Sj(new FI(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new $r(this.firestore,e,this._query)}}class He{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new As(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new He(this.firestore,e,this._key)}toJSON(){return{type:He._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(xc(n,He._jsonSchema))return new He(e,r||null,new te(Re.fromString(n.referencePath)))}}He._jsonSchemaVersion="firestore/documentReference/1.0",He._jsonSchema={type:rt("string",He._jsonSchemaVersion),referencePath:rt("string")};class As extends $r{constructor(e,n,r){super(e,n,Hd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new He(this.firestore,null,new te(e))}withConverter(e){return new As(this.firestore,e,this._path)}}function pa(t,e,...n){if(t=be(t),UI("collection","path",e),t instanceof tf){const r=Re.fromString(e,...n);return SE(r),new As(t,null,r)}{if(!(t instanceof He||t instanceof As))throw new Y(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Re.fromString(e,...n));return SE(r),new As(t.firestore,null,r)}}function vi(t,e,...n){if(t=be(t),arguments.length===1&&(e=ky.newId()),UI("doc","path",e),t instanceof tf){const r=Re.fromString(e,...n);return CE(r),new He(t,null,new te(r))}{if(!(t instanceof He||t instanceof As))throw new Y(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Re.fromString(e,...n));return CE(r),new He(t.firestore,t instanceof As?t.converter:null,new te(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0="AsyncQueue";class m0{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new bC(this,"async_queue_retry"),this._c=()=>{const r=mp();r&&X(p0,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=mp();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=mp();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new Sr;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ha(e))throw e;X(p0,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,jr("INTERNAL UNHANDLED ERROR: ",g0(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=qy.createAndSchedule(this,e,n,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&ie(47125,{Pc:g0(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function g0(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y0(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class zs extends tf{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new m0,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new m0(e),this._firestoreClient=void 0,await e}}}function xL(t,e){const n=typeof t=="object"?t:yy(),r=typeof t=="string"?t:Bh,s=Vd(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=zx("firestore");i&&TL(s,...i)}return s}function nf(t){if(t._terminated)throw new Y(U.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||IL(t),t._firestoreClient}function IL(t){var r,s,i;const e=t._freezeSettings(),n=function(a,c,h,d){return new Gj(a,c,h,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,QC(d.experimentalLongPollingOptions),d.useFetchStreams,d.isUsingEmulator)}(t._databaseId,((r=t._app)==null?void 0:r.options.appId)||"",t._persistenceKey,e);t._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new yL(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(a){const c=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new gn(It.fromBase64String(e))}catch(n){throw new Y(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new gn(It.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:gn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(xc(e,gn._jsonSchema))return gn.fromBase64String(e.bytes)}}gn._jsonSchemaVersion="firestore/bytes/1.0",gn._jsonSchema={type:rt("string",gn._jsonSchemaVersion),bytes:rt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new Y(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new Y(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new Y(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return _e(this._lat,e._lat)||_e(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:nr._jsonSchemaVersion}}static fromJSON(e){if(xc(e,nr._jsonSchema))return new nr(e.latitude,e.longitude)}}nr._jsonSchemaVersion="firestore/geoPoint/1.0",nr._jsonSchema={type:rt("string",nr._jsonSchemaVersion),latitude:rt("number"),longitude:rt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:rr._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(xc(e,rr._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new rr(e.vectorValues);throw new Y(U.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rr._jsonSchemaVersion="firestore/vectorValue/1.0",rr._jsonSchema={type:rt("string",rr._jsonSchemaVersion),vectorValues:rt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CL=/^__.*__$/;class SL{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Ys(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ic(e,this.data,n,this.fieldTransforms)}}class XC{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Ys(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function JC(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ie(40011,{Ac:t})}}class e_{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new e_({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const n=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){var s;const n=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Jh(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(JC(this.Ac)&&CL.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class kL{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Jd(e)}Cc(e,n,r,s=!1){return new e_({Ac:e,methodName:n,Dc:r,path:Et.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function of(t){const e=t._freezeSettings(),n=Jd(t._databaseId);return new kL(t._databaseId,!!e.ignoreUndefinedProperties,n)}function ZC(t,e,n,r,s,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);n_("Data must be an object, but it was:",o,r);const a=eS(r,o);let c,h;if(i.merge)c=new an(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const m=Jm(e,p,n);if(!o.contains(m))throw new Y(U.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);nS(d,m)||d.push(m)}c=new an(d),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new SL(new Ht(a),c,h)}class af extends sf{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof af}}class t_ extends sf{_toFieldTransform(e){return new vM(e.path,new nc)}isEqual(e){return e instanceof t_}}function NL(t,e,n,r){const s=t.Cc(1,e,n);n_("Data must be an object, but it was:",s,r);const i=[],o=Ht.empty();Qs(r,(c,h)=>{const d=r_(e,c,n);h=be(h);const p=s.yc(d);if(h instanceof af)i.push(d);else{const m=Nc(h,p);m!=null&&(i.push(d),o.set(d,m))}});const a=new an(i);return new XC(o,a,s.fieldTransforms)}function AL(t,e,n,r,s,i){const o=t.Cc(1,e,n),a=[Jm(e,r,n)],c=[s];if(i.length%2!=0)throw new Y(U.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)a.push(Jm(e,i[m])),c.push(i[m+1]);const h=[],d=Ht.empty();for(let m=a.length-1;m>=0;--m)if(!nS(h,a[m])){const w=a[m];let N=c[m];N=be(N);const R=o.yc(w);if(N instanceof af)h.push(w);else{const D=Nc(N,R);D!=null&&(h.push(w),d.set(w,D))}}const p=new an(h);return new XC(d,p,o.fieldTransforms)}function RL(t,e,n,r=!1){return Nc(n,t.Cc(r?4:3,e))}function Nc(t,e){if(tS(t=be(t)))return n_("Unsupported field value:",e,t),eS(t,e);if(t instanceof sf)return function(r,s){if(!JC(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const a of r){let c=Nc(a,s.wc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=be(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return gM(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Me.fromDate(r);return{timestampValue:Gh(s.serializer,i)}}if(r instanceof Me){const i=new Me(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Gh(s.serializer,i)}}if(r instanceof nr)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof gn)return{bytesValue:EC(s.serializer,r._byteString)};if(r instanceof He){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Oy(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof rr)return function(o,a){return{mapValue:{fields:{[QI]:{stringValue:YI},[$h]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw a.Sc("VectorValues must only contain numeric values.");return Dy(a.serializer,h)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${Bd(r)}`)}(t,e)}function eS(t,e){const n={};return $I(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Qs(t,(r,s)=>{const i=Nc(s,e.mc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function tS(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Me||t instanceof nr||t instanceof gn||t instanceof He||t instanceof sf||t instanceof rr)}function n_(t,e,n){if(!tS(n)||!zI(n)){const r=Bd(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function Jm(t,e,n){if((e=be(e))instanceof rf)return e._internalPath;if(typeof e=="string")return r_(t,e);throw Jh("Field path arguments must be of type string or ",t,!1,void 0,n)}const PL=new RegExp("[~\\*/\\[\\]]");function r_(t,e,n){if(e.search(PL)>=0)throw Jh(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new rf(...e.split("."))._internalPath}catch{throw Jh(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Jh(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Y(U.INVALID_ARGUMENT,a+t+c)}function nS(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new He(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new bL(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(lf("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class bL extends rS{data(){return super.data()}}function lf(t,e){return typeof e=="string"?r_(t,e):e instanceof rf?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sS(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new Y(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class s_{}class i_ extends s_{}function o_(t,e,...n){let r=[];e instanceof s_&&r.push(e),r=r.concat(n),function(i){const o=i.filter(c=>c instanceof a_).length,a=i.filter(c=>c instanceof cf).length;if(o>1||o>0&&a>0)throw new Y(U.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class cf extends i_{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new cf(e,n,r)}_apply(e){const n=this._parse(e);return iS(e._query,n),new $r(e.firestore,e.converter,Bm(e._query,n))}_parse(e){const n=of(e.firestore);return function(i,o,a,c,h,d,p){let m;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new Y(U.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){w0(p,d);const N=[];for(const R of p)N.push(v0(c,i,R));m={arrayValue:{values:N}}}else m=v0(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||w0(p,d),m=RL(a,o,p,d==="in"||d==="not-in");return nt.create(h,d,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function _0(t,e,n){const r=e,s=lf("where",t);return cf._create(s,r,n)}class a_ extends s_{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new a_(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Ln.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const a=i.getFlattenedFilters();for(const c of a)iS(o,c),o=Bm(o,c)}(e._query,n),new $r(e.firestore,e.converter,Bm(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class l_ extends i_{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new l_(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new Y(U.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new Y(U.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new tc(i,o)}(e._query,this._field,this._direction);return new $r(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new da(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function c_(t,e="asc"){const n=e,r=lf("orderBy",t);return l_._create(r,n)}class u_ extends i_{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new u_(e,n,r)}_apply(e){return new $r(e.firestore,e.converter,qh(e._query,this._limit,this._limitType))}}function DL(t){return Oj("limit",t),u_._create("limit",t,"F")}function v0(t,e,n){if(typeof(n=be(n))=="string"){if(n==="")throw new Y(U.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!sC(e)&&n.indexOf("/")!==-1)throw new Y(U.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Re.fromString(n));if(!te.isDocumentKey(r))throw new Y(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return jE(t,new te(r))}if(n instanceof He)return jE(t,n._key);throw new Y(U.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Bd(n)}.`)}function w0(t,e){if(!Array.isArray(t)||t.length===0)throw new Y(U.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function iS(t,e){const n=function(s,i){for(const o of s)for(const a of o.getFlattenedFilters())if(i.indexOf(a.op)>=0)return a.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new Y(U.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Y(U.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class jL{convertValue(e,n="none"){switch(Vs(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Ls(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ie(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Qs(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var r,s,i;const n=(i=(s=(r=e.fields)==null?void 0:r[$h].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>Qe(o.doubleValue));return new rr(n)}convertGeoPoint(e){return new nr(Qe(e.latitude),Qe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=qd(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Jl(e));default:return null}}convertTimestamp(e){const n=Os(e);return new Me(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Re.fromString(e);Ie(kC(r),9688,{name:e});const s=new Zl(r.get(1),r.get(3)),i=new te(r.popFirst(5));return s.isEqual(n)||jr(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oS(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class il{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wi extends rS{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new eh(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(lf("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Y(U.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=wi._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}wi._jsonSchemaVersion="firestore/documentSnapshot/1.0",wi._jsonSchema={type:rt("string",wi._jsonSchemaVersion),bundleSource:rt("string","DocumentSnapshot"),bundleName:rt("string"),bundle:rt("string")};class eh extends wi{data(e={}){return super.data(e)}}class Ei{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new il(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new eh(this._firestore,this._userDataWriter,r.key,r,new il(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new Y(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(a=>{const c=new eh(s._firestore,s._userDataWriter,a.doc.key,a.doc,new il(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(a=>i||a.type!==3).map(a=>{const c=new eh(s._firestore,s._userDataWriter,a.doc.key,a.doc,new il(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return a.type!==0&&(h=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),d=o.indexOf(a.doc.key)),{type:ML(a.type),doc:c,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Y(U.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ei._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ky.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ML(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ie(61501,{type:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aS(t){t=cn(t,He);const e=cn(t.firestore,zs);return wL(nf(e),t._key).then(n=>cS(e,t,n))}Ei._jsonSchemaVersion="firestore/querySnapshot/1.0",Ei._jsonSchema={type:rt("string",Ei._jsonSchemaVersion),bundleSource:rt("string","QuerySnapshot"),bundleName:rt("string"),bundle:rt("string")};class h_ extends jL{constructor(e){super(),this.firestore=e}convertBytes(e){return new gn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new He(this.firestore,null,n)}}function OL(t){t=cn(t,$r);const e=cn(t.firestore,zs),n=nf(e),r=new h_(e);return sS(t._query),EL(n,t._query).then(s=>new Ei(e,r,t,s))}function Zm(t,e,n){t=cn(t,He);const r=cn(t.firestore,zs),s=oS(t.converter,e);return f_(r,[ZC(of(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Dn.none())])}function LL(t,e,n,...r){t=cn(t,He);const s=cn(t.firestore,zs),i=of(s);let o;return o=typeof(e=be(e))=="string"||e instanceof rf?AL(i,"updateDoc",t._key,e,n,r):NL(i,"updateDoc",t._key,e),f_(s,[o.toMutation(t._key,Dn.exists(!0))])}function lS(t,e){const n=cn(t.firestore,zs),r=vi(t),s=oS(t.converter,e);return f_(n,[ZC(of(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Dn.exists(!1))]).then(()=>r)}function d_(t,...e){var c,h,d;t=be(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||y0(e[r])||(n=e[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(y0(e[r])){const p=e[r];e[r]=(c=p.next)==null?void 0:c.bind(p),e[r+1]=(h=p.error)==null?void 0:h.bind(p),e[r+2]=(d=p.complete)==null?void 0:d.bind(p)}let i,o,a;if(t instanceof He)o=cn(t.firestore,zs),a=Hd(t._key.path),i={next:p=>{e[r]&&e[r](cS(o,t,p))},error:e[r+1],complete:e[r+2]};else{const p=cn(t,$r);o=cn(p.firestore,zs),a=p._query;const m=new h_(o);i={next:w=>{e[r]&&e[r](new Ei(o,m,p,w))},error:e[r+1],complete:e[r+2]},sS(t._query)}return function(m,w,N,R){const D=new Zy(R),x=new Yy(w,D,N);return m.asyncQueue.enqueueAndForget(async()=>Gy(await Xh(m),x)),()=>{D.Nu(),m.asyncQueue.enqueueAndForget(async()=>Ky(await Xh(m),x))}}(nf(o),a,s,i)}function f_(t,e){return function(r,s){const i=new Sr;return r.asyncQueue.enqueueAndForget(async()=>lL(await vL(r),s,i)),i.promise}(nf(t),e)}function cS(t,e,n){const r=n.docs.get(e._key),s=new h_(t);return new wi(t,s,e._key,r,new il(n.hasPendingWrites,n.fromCache),e.converter)}function Ti(){return new t_("serverTimestamp")}(function(e,n=!0){(function(s){ca=s})(Ui),Ni(new js("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new zs(new kj(r.getProvider("auth-internal")),new Rj(o,r.getProvider("app-check-internal")),function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new Y(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Zl(h.options.projectId,d)}(o,s),o);return i={useFetchStreams:n,...i},a._setSettings(i),a},"PUBLIC").setMultipleInstances(!0)),Xn(EE,TE,e),Xn(EE,TE,"esm2020")})();var VL="firebase",FL="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xn(VL,FL,"app");var E0={};const T0="@firebase/database",x0="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uS="";function UL(t){uS=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zL{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),mt(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Kl(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BL{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return or(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new zL(e)}}catch{}return new BL},mi=hS("localStorage"),$L=hS("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=new Ld("@firebase/database"),WL=function(){let t=1;return function(){return t++}}(),dS=function(t){const e=ZP(t),n=new QP;n.update(e);const r=n.digest();return dy.encodeByteArray(r)},Ac=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Ac.apply(null,r):typeof r=="object"?e+=mt(r):e+=r,e+=" "}return e};let xl=null,I0=!0;const qL=function(t,e){G(!0,"Can't turn on custom loggers persistently."),Ro.logLevel=ge.VERBOSE,xl=Ro.log.bind(Ro)},wt=function(...t){if(I0===!0&&(I0=!1,xl===null&&$L.get("logging_enabled")===!0&&qL()),xl){const e=Ac.apply(null,t);xl(e)}},Rc=function(t){return function(...e){wt(t,...e)}},eg=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ac(...t);Ro.error(e)},Or=function(...t){const e=`FIREBASE FATAL ERROR: ${Ac(...t)}`;throw Ro.error(e),new Error(e)},Zt=function(...t){const e="FIREBASE WARNING: "+Ac(...t);Ro.warn(e)},HL=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Zt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},uf=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},GL=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Yo="[MIN_NAME]",Di="[MAX_NAME]",Wi=function(t,e){if(t===e)return 0;if(t===Yo||e===Di)return-1;if(e===Yo||t===Di)return 1;{const n=C0(t),r=C0(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},KL=function(t,e){return t===e?0:t<e?-1:1},Ha=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+mt(e))},p_=function(t){if(typeof t!="object"||t===null)return mt(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=mt(e[r]),n+=":",n+=p_(t[e[r]]);return n+="}",n},fS=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function Mt(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const pS=function(t){G(!uf(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,a,c;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const h=[];for(c=n;c;c-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)h.push(i%2?1:0),i=Math.floor(i/2);h.push(s?1:0),h.reverse();const d=h.join("");let p="";for(c=0;c<64;c+=8){let m=parseInt(d.substr(c,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},QL=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},YL=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function XL(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const JL=new RegExp("^-?(0*)\\d{1,10}$"),ZL=-2147483648,e4=2147483647,C0=function(t){if(JL.test(t)){const e=Number(t);if(e>=ZL&&e<=e4)return e}return null},ma=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Zt("Exception was thrown by user callback.",n),e},Math.floor(0))}},t4=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Il=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n4{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,sn(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)==null||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Zt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r4{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(wt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Zt(e)}}class th{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}th.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_="5",mS="v",gS="s",yS="r",_S="f",vS=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wS="ls",ES="p",tg="ac",TS="websocket",xS="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IS{constructor(e,n,r,s,i=!1,o="",a=!1,c=!1,h=null){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=h,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=mi.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&mi.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function s4(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function CS(t,e,n){G(typeof e=="string","typeof type must == string"),G(typeof n=="object","typeof params must == object");let r;if(e===TS)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===xS)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);s4(t)&&(n.ns=t.namespace);const s=[];return Mt(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i4{constructor(){this.counters_={}}incrementCounter(e,n=1){or(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return NP(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp={},_p={};function g_(t){const e=t.toString();return yp[e]||(yp[e]=new i4),yp[e]}function o4(t,e){const n=t.toString();return _p[n]||(_p[n]=e()),_p[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a4{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&ma(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S0="start",l4="close",c4="pLPCommand",u4="pRTLPCB",SS="id",kS="pw",NS="ser",h4="cb",d4="seg",f4="ts",p4="d",m4="dframe",AS=1870,RS=30,g4=AS-RS,y4=25e3,_4=3e4;class vo{constructor(e,n,r,s,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Rc(e),this.stats_=g_(n),this.urlFn=c=>(this.appCheckToken&&(c[tg]=this.appCheckToken),CS(n,xS,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new a4(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(_4)),GL(()=>{if(this.isClosed_)return;this.scriptTagHolder=new y_((...i)=>{const[o,a,c,h,d]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===S0)this.id=a,this.password=c;else if(o===l4)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[S0]="t",r[NS]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[h4]=this.scriptTagHolder.uniqueCallbackIdentifier),r[mS]=m_,this.transportSessionId&&(r[gS]=this.transportSessionId),this.lastSessionId&&(r[wS]=this.lastSessionId),this.applicationId&&(r[ES]=this.applicationId),this.appCheckToken&&(r[tg]=this.appCheckToken),typeof location<"u"&&location.hostname&&vS.test(location.hostname)&&(r[yS]=_S);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){vo.forceAllow_=!0}static forceDisallow(){vo.forceDisallow_=!0}static isAvailable(){return vo.forceAllow_?!0:!vo.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!QL()&&!YL()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=mt(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Vx(n),s=fS(r,g4);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[m4]="t",r[SS]=e,r[kS]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=mt(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class y_{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=WL(),window[c4+this.uniqueCallbackIdentifier]=e,window[u4+this.uniqueCallbackIdentifier]=n,this.myIFrame=y_.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){wt("frame writing exception"),a.stack&&wt(a.stack),wt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||wt("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[SS]=this.myID,e[kS]=this.myPW,e[NS]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+RS+r.length<=AS;){const o=this.pendingSegs.shift();r=r+"&"+d4+s+"="+o.seg+"&"+f4+s+"="+o.ts+"&"+p4+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(y4)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{wt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v4=16384,w4=45e3;let Zh=null;typeof MozWebSocket<"u"?Zh=MozWebSocket:typeof WebSocket<"u"&&(Zh=WebSocket);class Nn{constructor(e,n,r,s,i,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Rc(this.connId),this.stats_=g_(n),this.connURL=Nn.connectionURL_(n,o,a,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[mS]=m_,typeof location<"u"&&location.hostname&&vS.test(location.hostname)&&(o[yS]=_S),n&&(o[gS]=n),r&&(o[wS]=r),s&&(o[tg]=s),i&&(o[ES]=i),CS(e,TS,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,mi.set("previous_websocket_failure",!0);try{let r;UP(),this.mySock=new Zh(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Nn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Zh!==null&&!Nn.forceDisallow_}static previouslyFailed(){return mi.isInMemoryStorage||mi.get("previous_websocket_failure")===!0}markConnectionHealthy(){mi.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Kl(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(G(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=mt(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=fS(n,v4);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(w4))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Nn.responsesRequiredToBeHealthy=2;Nn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{static get ALL_TRANSPORTS(){return[vo,Nn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Nn&&Nn.isAvailable();let r=n&&!Nn.previouslyFailed();if(e.webSocketOnly&&(n||Zt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Nn];else{const s=this.transports_=[];for(const i of ic.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);ic.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ic.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E4=6e4,T4=5e3,x4=10*1024,I4=100*1024,vp="t",k0="d",C4="s",N0="r",S4="e",A0="o",R0="a",P0="n",b0="p",k4="h";class N4{constructor(e,n,r,s,i,o,a,c,h,d){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=h,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Rc("c:"+this.id+":"),this.transportManager_=new ic(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Il(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>I4?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>x4?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(vp in e){const n=e[vp];n===R0?this.upgradeIfSecondaryHealthy_():n===N0?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===A0&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ha("t",e),r=Ha("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:b0,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:R0,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:P0,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ha("t",e),r=Ha("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ha(vp,e);if(k0 in e){const r=e[k0];if(n===k4){const s={...r};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===P0){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===C4?this.onConnectionShutdown_(r):n===N0?this.onReset_(r):n===S4?eg("Server Error: "+r):n===A0?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):eg("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),m_!==r&&Zt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Il(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(E4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Il(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(T4))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:b0,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(mi.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PS{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e){this.allowedEvents_=e,this.listeners_={},G(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){G(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed extends bS{static getInstance(){return new ed}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!my()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return G(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D0=32,j0=768;class ke{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function xe(){return new ke("")}function fe(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Bs(t){return t.pieces_.length-t.pieceNum_}function Ae(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ke(t.pieces_,e)}function __(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function A4(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function oc(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function DS(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ke(e,0)}function Xe(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof ke)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new ke(n,0)}function pe(t){return t.pieceNum_>=t.pieces_.length}function Kt(t,e){const n=fe(t),r=fe(e);if(n===null)return e;if(n===r)return Kt(Ae(t),Ae(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function R4(t,e){const n=oc(t,0),r=oc(e,0);for(let s=0;s<n.length&&s<r.length;s++){const i=Wi(n[s],r[s]);if(i!==0)return i}return n.length===r.length?0:n.length<r.length?-1:1}function v_(t,e){if(Bs(t)!==Bs(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function _n(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(Bs(t)>Bs(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class P4{constructor(e,n){this.errorPrefix_=n,this.parts_=oc(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Od(this.parts_[r]);jS(this)}}function b4(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Od(e),jS(t)}function D4(t){const e=t.parts_.pop();t.byteLength_-=Od(e),t.parts_.length>0&&(t.byteLength_-=1)}function jS(t){if(t.byteLength_>j0)throw new Error(t.errorPrefix_+"has a key path longer than "+j0+" bytes ("+t.byteLength_+").");if(t.parts_.length>D0)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+D0+") or object contains a cycle "+ui(t))}function ui(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_ extends bS{static getInstance(){return new w_}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return G(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga=1e3,j4=60*5*1e3,M0=30*1e3,M4=1.3,O4=3e4,L4="server_kill",O0=3;class kr extends PS{constructor(e,n,r,s,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=kr.nextPersistentConnectionId_++,this.log_=Rc("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ga,this.maxReconnectDelay_=j4,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");w_.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ed.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(mt(i)),G(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new yr,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),G(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),G(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,h=a.s;kr.warnOnListenWarnings_(c,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",a),h!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(h,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&or(e,"w")){const r=zo(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();Zt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||KP(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=M0)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=GP(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),G(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+mt(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):eg("Unrecognized action received from server: "+mt(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){G(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ga,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ga,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>O4&&(this.reconnectDelay_=Ga),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*M4)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+kr.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,r())},h=function(p){G(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(p)};this.realtime_={close:c,sendRequest:h};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,m]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?wt("getToken() completed but was canceled"):(wt("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,a=new N4(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,w=>{Zt(w+" ("+this.repoInfo_.toString()+")"),this.interrupt(L4)},i))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&Zt(p),c())}}}interrupt(e){wt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){wt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],bh(this.interruptReasons_)&&(this.reconnectDelay_=Ga,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>p_(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new ke(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){wt("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=O0&&(this.reconnectDelay_=M0,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){wt("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=O0&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+uS.replace(/\./g,"-")]=1,my()?e["framework.cordova"]=1:qx()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ed.getInstance().currentlyOnline();return bh(this.interruptReasons_)&&e}}kr.nextPersistentConnectionId_=0;kr.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new me(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new me(Yo,e),s=new me(Yo,n);return this.compare(r,s)!==0}minPost(){return me.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ru;class MS extends hf{static get __EMPTY_NODE(){return Ru}static set __EMPTY_NODE(e){Ru=e}compare(e,n){return Wi(e.name,n.name)}isDefinedOn(e){throw oa("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return me.MIN}maxPost(){return new me(Di,Ru)}makePost(e,n){return G(typeof e=="string","KeyIndex indexValue must always be a string."),new me(e,Ru)}toString(){return".key"}}const Po=new MS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class pt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??pt.RED,this.left=s??Qt.EMPTY_NODE,this.right=i??Qt.EMPTY_NODE}copy(e,n,r,s,i){return new pt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Qt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Qt.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}pt.RED=!0;pt.BLACK=!1;class V4{copy(e,n,r,s,i){return this}insert(e,n,r){return new pt(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Qt{constructor(e,n=Qt.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Qt(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,pt.BLACK,null,null))}remove(e){return new Qt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,pt.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Pu(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Pu(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Pu(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Pu(this.root_,null,this.comparator_,!0,e)}}Qt.EMPTY_NODE=new V4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F4(t,e){return Wi(t.name,e.name)}function E_(t,e){return Wi(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ng;function U4(t){ng=t}const OS=function(t){return typeof t=="number"?"number:"+pS(t):"string:"+t},LS=function(t){if(t.isLeafNode()){const e=t.val();G(typeof e=="string"||typeof e=="number"||typeof e=="object"&&or(e,".sv"),"Priority must be a string or number.")}else G(t===ng||t.isEmpty(),"priority of unexpected type.");G(t===ng||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let L0;class ht{static set __childrenNodeConstructor(e){L0=e}static get __childrenNodeConstructor(){return L0}constructor(e,n=ht.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,G(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),LS(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ht(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ht.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return pe(e)?this:fe(e)===".priority"?this.priorityNode_:ht.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ht.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=fe(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(G(r!==".priority"||Bs(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,ht.__childrenNodeConstructor.EMPTY_NODE.updateChild(Ae(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+OS(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=pS(this.value_):e+=this.value_,this.lazyHash_=dS(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ht.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ht.__childrenNodeConstructor?-1:(G(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=ht.VALUE_TYPE_ORDER.indexOf(n),i=ht.VALUE_TYPE_ORDER.indexOf(r);return G(s>=0,"Unknown leaf type: "+n),G(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ht.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let VS,FS;function z4(t){VS=t}function B4(t){FS=t}class $4 extends hf{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?Wi(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return me.MIN}maxPost(){return new me(Di,new ht("[PRIORITY-POST]",FS))}makePost(e,n){const r=VS(e);return new me(n,new ht("[PRIORITY-POST]",r))}toString(){return".priority"}}const Ue=new $4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W4=Math.log(2);class q4{constructor(e){const n=i=>parseInt(Math.log(i)/W4,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const td=function(t,e,n,r){t.sort(e);const s=function(c,h){const d=h-c;let p,m;if(d===0)return null;if(d===1)return p=t[c],m=n?n(p):p,new pt(m,p.node,pt.BLACK,null,null);{const w=parseInt(d/2,10)+c,N=s(c,w),R=s(w+1,h);return p=t[w],m=n?n(p):p,new pt(m,p.node,pt.BLACK,N,R)}},i=function(c){let h=null,d=null,p=t.length;const m=function(N,R){const D=p-N,x=p;p-=N;const _=s(D+1,x),E=t[D],j=n?n(E):E;w(new pt(j,E.node,R,null,_))},w=function(N){h?(h.left=N,h=N):(d=N,h=N)};for(let N=0;N<c.count;++N){const R=c.nextBitIsOne(),D=Math.pow(2,c.count-(N+1));R?m(D,pt.BLACK):(m(D,pt.BLACK),m(D,pt.RED))}return d},o=new q4(t.length),a=i(o);return new Qt(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wp;const eo={};class Tr{static get Default(){return G(eo&&Ue,"ChildrenNode.ts has not been loaded"),wp=wp||new Tr({".priority":eo},{".priority":Ue}),wp}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=zo(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Qt?n:null}hasIndex(e){return or(this.indexSet_,e.toString())}addIndex(e,n){G(e!==Po,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(me.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let a;s?a=td(r,e.getCompare()):a=eo;const c=e.toString(),h={...this.indexSet_};h[c]=e;const d={...this.indexes_};return d[c]=a,new Tr(d,h)}addToIndexes(e,n){const r=Dh(this.indexes_,(s,i)=>{const o=zo(this.indexSet_,i);if(G(o,"Missing index implementation for "+i),s===eo)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(me.Wrap);let h=c.getNext();for(;h;)h.name!==e.name&&a.push(h),h=c.getNext();return a.push(e),td(a,o.getCompare())}else return eo;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new me(e.name,a))),c.insert(e,e.node)}});return new Tr(r,this.indexSet_)}removeFromIndexes(e,n){const r=Dh(this.indexes_,s=>{if(s===eo)return s;{const i=n.get(e.name);return i?s.remove(new me(e.name,i)):s}});return new Tr(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ka;class oe{static get EMPTY_NODE(){return Ka||(Ka=new oe(new Qt(E_),null,Tr.Default))}constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&LS(this.priorityNode_),this.children_.isEmpty()&&G(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ka}updatePriority(e){return this.children_.isEmpty()?this:new oe(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Ka:n}}getChild(e){const n=fe(e);return n===null?this:this.getImmediateChild(n).getChild(Ae(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(G(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new me(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?Ka:this.priorityNode_;return new oe(s,o,i)}}updateChild(e,n){const r=fe(e);if(r===null)return n;{G(fe(e)!==".priority"||Bs(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(Ae(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(Ue,(o,a)=>{n[o]=a.val(e),r++,i&&oe.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+OS(this.getPriority().val())+":"),this.forEachChild(Ue,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":dS(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new me(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new me(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new me(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,me.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,me.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Pc?-1:0}withIndex(e){if(e===Po||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new oe(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Po||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(Ue),s=n.getIterator(Ue);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Po?null:this.indexMap_.get(e.toString())}}oe.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class H4 extends oe{constructor(){super(new Qt(E_),oe.EMPTY_NODE,Tr.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return oe.EMPTY_NODE}isEmpty(){return!1}}const Pc=new H4;Object.defineProperties(me,{MIN:{value:new me(Yo,oe.EMPTY_NODE)},MAX:{value:new me(Di,Pc)}});MS.__EMPTY_NODE=oe.EMPTY_NODE;ht.__childrenNodeConstructor=oe;U4(Pc);B4(Pc);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G4=!0;function et(t,e=null){if(t===null)return oe.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),G(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new ht(n,et(e))}if(!(t instanceof Array)&&G4){const n=[];let r=!1;if(Mt(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=et(a);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),n.push(new me(o,c)))}}),n.length===0)return oe.EMPTY_NODE;const i=td(n,F4,o=>o.name,E_);if(r){const o=td(n,Ue.getCompare());return new oe(i,et(e),new Tr({".priority":o},{".priority":Ue}))}else return new oe(i,et(e),Tr.Default)}else{let n=oe.EMPTY_NODE;return Mt(t,(r,s)=>{if(or(t,r)&&r.substring(0,1)!=="."){const i=et(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(et(e))}}z4(et);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K4 extends hf{constructor(e){super(),this.indexPath_=e,G(!pe(e)&&fe(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?Wi(e.name,n.name):i}makePost(e,n){const r=et(e),s=oe.EMPTY_NODE.updateChild(this.indexPath_,r);return new me(n,s)}maxPost(){const e=oe.EMPTY_NODE.updateChild(this.indexPath_,Pc);return new me(Di,e)}toString(){return oc(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q4 extends hf{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Wi(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return me.MIN}maxPost(){return me.MAX}makePost(e,n){const r=et(e);return new me(n,r)}toString(){return".value"}}const Y4=new Q4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function US(t){return{type:"value",snapshotNode:t}}function Xo(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function ac(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function lc(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function X4(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e){this.index_=e}updateChild(e,n,r,s,i,o){G(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(r.getChild(s))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(ac(n,a)):G(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Xo(n,r)):o.trackChildChange(lc(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(Ue,(s,i)=>{n.hasChild(s)||r.trackChildChange(ac(s,i))}),n.isLeafNode()||n.forEachChild(Ue,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(lc(s,i,o))}else r.trackChildChange(Xo(s,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?oe.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e){this.indexedFilter_=new T_(e.getIndex()),this.index_=e.getIndex(),this.startPost_=cc.getStartPost_(e),this.endPost_=cc.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,i,o){return this.matches(new me(n,r))||(r=oe.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,i,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=oe.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(oe.EMPTY_NODE);const i=this;return n.forEachChild(Ue,(o,a)=>{i.matches(new me(o,a))||(s=s.updateImmediateChild(o,oe.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J4{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new cc(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,i,o){return this.rangedFilter_.matches(new me(n,r))||(r=oe.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,i,o):this.fullLimitUpdateChild_(e,n,r,i,o)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=oe.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=oe.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(oe.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,oe.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,i){let o;if(this.reverse_){const p=this.index_.getCompare();o=(m,w)=>p(w,m)}else o=this.index_.getCompare();const a=e;G(a.numChildren()===this.limit_,"");const c=new me(n,r),h=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(c);if(a.hasChild(n)){const p=a.getImmediateChild(n);let m=s.getChildAfterChild(this.index_,h,this.reverse_);for(;m!=null&&(m.name===n||a.hasChild(m.name));)m=s.getChildAfterChild(this.index_,m,this.reverse_);const w=m==null?1:o(m,c);if(d&&!r.isEmpty()&&w>=0)return i!=null&&i.trackChildChange(lc(n,r,p)),a.updateImmediateChild(n,r);{i!=null&&i.trackChildChange(ac(n,p));const R=a.updateImmediateChild(n,oe.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(i!=null&&i.trackChildChange(Xo(m.name,m.node)),R.updateImmediateChild(m.name,m.node)):R}}else return r.isEmpty()?e:d&&o(h,c)>=0?(i!=null&&(i.trackChildChange(ac(h.name,h.node)),i.trackChildChange(Xo(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(h.name,oe.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Ue}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return G(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return G(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Yo}hasEnd(){return this.endSet_}getIndexEndValue(){return G(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return G(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Di}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return G(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Ue}copy(){const e=new x_;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Z4(t){return t.loadsAllData()?new T_(t.getIndex()):t.hasLimit()?new J4(t):new cc(t)}function V0(t){const e={};if(t.isDefault())return e;let n;if(t.index_===Ue?n="$priority":t.index_===Y4?n="$value":t.index_===Po?n="$key":(G(t.index_ instanceof K4,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=mt(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=mt(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+mt(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=mt(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+mt(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function F0(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==Ue&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd extends PS{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(G(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=Rc("p:rest:"),this.listens_={}}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=nd.getListenId_(e,r),a={};this.listens_[o]=a;const c=V0(e._queryParams);this.restRequest_(i+".json",c,(h,d)=>{let p=d;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(i,p,!1,r),zo(this.listens_,o)===a){let m;h?h===401?m="permission_denied":m="rest_error:"+h:m="ok",s(m,null)}})}unlisten(e,n){const r=nd.getListenId_(e,n);delete this.listens_[r]}get(e){const n=V0(e._queryParams),r=e._path.toString(),s=new yr;return this.restRequest_(r+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(r,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+aa(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Kl(a.responseText)}catch{Zt("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,c)}else a.status!==401&&a.status!==404&&Zt("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eV{constructor(){this.rootNode_=oe.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rd(){return{value:null,children:new Map}}function ga(t,e,n){if(pe(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=fe(e);t.children.has(r)||t.children.set(r,rd());const s=t.children.get(r);e=Ae(e),ga(s,e,n)}}function rg(t,e){if(pe(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(Ue,(r,s)=>{ga(t,new ke(r),s)}),rg(t,e)}}else if(t.children.size>0){const n=fe(e);return e=Ae(e),t.children.has(n)&&rg(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function sg(t,e,n){t.value!==null?n(e,t.value):tV(t,(r,s)=>{const i=new ke(e.toString()+"/"+r);sg(s,i,n)})}function tV(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Mt(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0=10*1e3,rV=30*1e3,sV=5*60*1e3;class iV{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new nV(e);const r=U0+(rV-U0)*Math.random();Il(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;Mt(e,(s,i)=>{i>0&&or(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),Il(this.reportStats_.bind(this),Math.floor(Math.random()*2*sV))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rn;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Rn||(Rn={}));function zS(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function I_(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function C_(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Rn.ACK_USER_WRITE,this.source=zS()}operationForChild(e){if(pe(this.path)){if(this.affectedTree.value!=null)return G(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ke(e));return new sd(xe(),n,this.revert)}}else return G(fe(this.path)===e,"operationForChild called for unrelated child."),new sd(Ae(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,n){this.source=e,this.path=n,this.type=Rn.LISTEN_COMPLETE}operationForChild(e){return pe(this.path)?new uc(this.source,xe()):new uc(this.source,Ae(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Rn.OVERWRITE}operationForChild(e){return pe(this.path)?new ji(this.source,xe(),this.snap.getImmediateChild(e)):new ji(this.source,Ae(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Rn.MERGE}operationForChild(e){if(pe(this.path)){const n=this.children.subtree(new ke(e));return n.isEmpty()?null:n.value?new ji(this.source,xe(),n.value):new hc(this.source,xe(),n)}else return G(fe(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new hc(this.source,Ae(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(pe(e))return this.isFullyInitialized()&&!this.filtered_;const n=fe(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oV{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function aV(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(X4(o.childName,o.snapshotNode))}),Qa(t,s,"child_removed",e,r,n),Qa(t,s,"child_added",e,r,n),Qa(t,s,"child_moved",i,r,n),Qa(t,s,"child_changed",e,r,n),Qa(t,s,"value",e,r,n),s}function Qa(t,e,n,r,s,i){const o=r.filter(a=>a.type===n);o.sort((a,c)=>cV(t,a,c)),o.forEach(a=>{const c=lV(t,a,i);s.forEach(h=>{h.respondsTo(a.type)&&e.push(h.createEvent(c,t.query_))})})}function lV(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function cV(t,e,n){if(e.childName==null||n.childName==null)throw oa("Should only compare child_ events.");const r=new me(e.childName,e.snapshotNode),s=new me(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function df(t,e){return{eventCache:t,serverCache:e}}function Cl(t,e,n,r){return df(new Mi(e,n,r),t.serverCache)}function BS(t,e,n,r){return df(t.eventCache,new Mi(e,n,r))}function ig(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Oi(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ep;const uV=()=>(Ep||(Ep=new Qt(KL)),Ep);class je{static fromObject(e){let n=new je(null);return Mt(e,(r,s)=>{n=n.set(new ke(r),s)}),n}constructor(e,n=uV()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:xe(),value:this.value};if(pe(e))return null;{const r=fe(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(Ae(e),n);return i!=null?{path:Xe(new ke(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(pe(e))return this;{const n=fe(e),r=this.children.get(n);return r!==null?r.subtree(Ae(e)):new je(null)}}set(e,n){if(pe(e))return new je(n,this.children);{const r=fe(e),i=(this.children.get(r)||new je(null)).set(Ae(e),n),o=this.children.insert(r,i);return new je(this.value,o)}}remove(e){if(pe(e))return this.children.isEmpty()?new je(null):new je(null,this.children);{const n=fe(e),r=this.children.get(n);if(r){const s=r.remove(Ae(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new je(null):new je(this.value,i)}else return this}}get(e){if(pe(e))return this.value;{const n=fe(e),r=this.children.get(n);return r?r.get(Ae(e)):null}}setTree(e,n){if(pe(e))return n;{const r=fe(e),i=(this.children.get(r)||new je(null)).setTree(Ae(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new je(this.value,o)}}fold(e){return this.fold_(xe(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(Xe(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,xe(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(pe(e))return null;{const i=fe(e),o=this.children.get(i);return o?o.findOnPath_(Ae(e),Xe(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,xe(),n)}foreachOnPath_(e,n,r){if(pe(e))return this;{this.value&&r(n,this.value);const s=fe(e),i=this.children.get(s);return i?i.foreachOnPath_(Ae(e),Xe(n,s),r):new je(null)}}foreach(e){this.foreach_(xe(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(Xe(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(e){this.writeTree_=e}static empty(){return new jn(new je(null))}}function Sl(t,e,n){if(pe(e))return new jn(new je(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=Kt(s,e);return i=i.updateChild(o,n),new jn(t.writeTree_.set(s,i))}else{const s=new je(n),i=t.writeTree_.setTree(e,s);return new jn(i)}}}function z0(t,e,n){let r=t;return Mt(n,(s,i)=>{r=Sl(r,Xe(e,s),i)}),r}function B0(t,e){if(pe(e))return jn.empty();{const n=t.writeTree_.setTree(e,new je(null));return new jn(n)}}function og(t,e){return qi(t,e)!=null}function qi(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Kt(n.path,e)):null}function $0(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Ue,(r,s)=>{e.push(new me(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new me(r,s.value))}),e}function Rs(t,e){if(pe(e))return t;{const n=qi(t,e);return n!=null?new jn(new je(n)):new jn(t.writeTree_.subtree(e))}}function ag(t){return t.writeTree_.isEmpty()}function Jo(t,e){return $S(xe(),t.writeTree_,e)}function $S(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(G(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=$S(Xe(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(Xe(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S_(t,e){return GS(e,t)}function hV(t,e,n,r,s){G(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=Sl(t.visibleWrites,e,n)),t.lastWriteId=r}function dV(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function fV(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);G(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&pV(a,r.path)?s=!1:_n(r.path,a.path)&&(i=!0)),o--}if(s){if(i)return mV(t),!0;if(r.snap)t.visibleWrites=B0(t.visibleWrites,r.path);else{const a=r.children;Mt(a,c=>{t.visibleWrites=B0(t.visibleWrites,Xe(r.path,c))})}return!0}else return!1}function pV(t,e){if(t.snap)return _n(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&_n(Xe(t.path,n),e))return!0;return!1}function mV(t){t.visibleWrites=WS(t.allWrites,gV,xe()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function gV(t){return t.visible}function WS(t,e,n){let r=jn.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let a;if(i.snap)_n(n,o)?(a=Kt(n,o),r=Sl(r,a,i.snap)):_n(o,n)&&(a=Kt(o,n),r=Sl(r,xe(),i.snap.getChild(a)));else if(i.children){if(_n(n,o))a=Kt(n,o),r=z0(r,a,i.children);else if(_n(o,n))if(a=Kt(o,n),pe(a))r=z0(r,xe(),i.children);else{const c=zo(i.children,fe(a));if(c){const h=c.getChild(Ae(a));r=Sl(r,xe(),h)}}}else throw oa("WriteRecord should have .snap or .children")}}return r}function qS(t,e,n,r,s){if(!r&&!s){const i=qi(t.visibleWrites,e);if(i!=null)return i;{const o=Rs(t.visibleWrites,e);if(ag(o))return n;if(n==null&&!og(o,xe()))return null;{const a=n||oe.EMPTY_NODE;return Jo(o,a)}}}else{const i=Rs(t.visibleWrites,e);if(!s&&ag(i))return n;if(!s&&n==null&&!og(i,xe()))return null;{const o=function(h){return(h.visible||s)&&(!r||!~r.indexOf(h.writeId))&&(_n(h.path,e)||_n(e,h.path))},a=WS(t.allWrites,o,e),c=n||oe.EMPTY_NODE;return Jo(a,c)}}}function yV(t,e,n){let r=oe.EMPTY_NODE;const s=qi(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(Ue,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=Rs(t.visibleWrites,e);return n.forEachChild(Ue,(o,a)=>{const c=Jo(Rs(i,new ke(o)),a);r=r.updateImmediateChild(o,c)}),$0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=Rs(t.visibleWrites,e);return $0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function _V(t,e,n,r,s){G(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=Xe(e,n);if(og(t.visibleWrites,i))return null;{const o=Rs(t.visibleWrites,i);return ag(o)?s.getChild(n):Jo(o,s.getChild(n))}}function vV(t,e,n,r){const s=Xe(e,n),i=qi(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=Rs(t.visibleWrites,s);return Jo(o,r.getNode().getImmediateChild(n))}else return null}function wV(t,e){return qi(t.visibleWrites,e)}function EV(t,e,n,r,s,i,o){let a;const c=Rs(t.visibleWrites,e),h=qi(c,xe());if(h!=null)a=h;else if(n!=null)a=Jo(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],p=o.getCompare(),m=i?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let w=m.getNext();for(;w&&d.length<s;)p(w,r)!==0&&d.push(w),w=m.getNext();return d}else return[]}function TV(){return{visibleWrites:jn.empty(),allWrites:[],lastWriteId:-1}}function id(t,e,n,r){return qS(t.writeTree,t.treePath,e,n,r)}function k_(t,e){return yV(t.writeTree,t.treePath,e)}function W0(t,e,n,r){return _V(t.writeTree,t.treePath,e,n,r)}function od(t,e){return wV(t.writeTree,Xe(t.treePath,e))}function xV(t,e,n,r,s,i){return EV(t.writeTree,t.treePath,e,n,r,s,i)}function N_(t,e,n){return vV(t.writeTree,t.treePath,e,n)}function HS(t,e){return GS(Xe(t.treePath,e),t.writeTree)}function GS(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IV{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;G(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),G(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,lc(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,ac(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,Xo(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,lc(r,e.snapshotNode,s.oldSnap));else throw oa("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CV{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const KS=new CV;class A_{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Mi(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return N_(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Oi(this.viewCache_),i=xV(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SV(t){return{filter:t}}function kV(t,e){G(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),G(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function NV(t,e,n,r,s){const i=new IV;let o,a;if(n.type===Rn.OVERWRITE){const h=n;h.source.fromUser?o=lg(t,e,h.path,h.snap,r,s,i):(G(h.source.fromServer,"Unknown source."),a=h.source.tagged||e.serverCache.isFiltered()&&!pe(h.path),o=ad(t,e,h.path,h.snap,r,s,a,i))}else if(n.type===Rn.MERGE){const h=n;h.source.fromUser?o=RV(t,e,h.path,h.children,r,s,i):(G(h.source.fromServer,"Unknown source."),a=h.source.tagged||e.serverCache.isFiltered(),o=cg(t,e,h.path,h.children,r,s,a,i))}else if(n.type===Rn.ACK_USER_WRITE){const h=n;h.revert?o=DV(t,e,h.path,r,s,i):o=PV(t,e,h.path,h.affectedTree,r,s,i)}else if(n.type===Rn.LISTEN_COMPLETE)o=bV(t,e,n.path,r,i);else throw oa("Unknown operation type: "+n.type);const c=i.getChanges();return AV(e,o,c),{viewCache:o,changes:c}}function AV(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=ig(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(US(ig(e)))}}function QS(t,e,n,r,s,i){const o=e.eventCache;if(od(r,n)!=null)return e;{let a,c;if(pe(n))if(G(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Oi(e),d=h instanceof oe?h:oe.EMPTY_NODE,p=k_(r,d);a=t.filter.updateFullNode(e.eventCache.getNode(),p,i)}else{const h=id(r,Oi(e));a=t.filter.updateFullNode(e.eventCache.getNode(),h,i)}else{const h=fe(n);if(h===".priority"){G(Bs(n)===1,"Can't have a priority with additional path components");const d=o.getNode();c=e.serverCache.getNode();const p=W0(r,n,d,c);p!=null?a=t.filter.updatePriority(d,p):a=o.getNode()}else{const d=Ae(n);let p;if(o.isCompleteForChild(h)){c=e.serverCache.getNode();const m=W0(r,n,o.getNode(),c);m!=null?p=o.getNode().getImmediateChild(h).updateChild(d,m):p=o.getNode().getImmediateChild(h)}else p=N_(r,h,e.serverCache);p!=null?a=t.filter.updateChild(o.getNode(),h,p,d,s,i):a=o.getNode()}}return Cl(e,a,o.isFullyInitialized()||pe(n),t.filter.filtersNodes())}}function ad(t,e,n,r,s,i,o,a){const c=e.serverCache;let h;const d=o?t.filter:t.filter.getIndexedFilter();if(pe(n))h=d.updateFullNode(c.getNode(),r,null);else if(d.filtersNodes()&&!c.isFiltered()){const w=c.getNode().updateChild(n,r);h=d.updateFullNode(c.getNode(),w,null)}else{const w=fe(n);if(!c.isCompleteForPath(n)&&Bs(n)>1)return e;const N=Ae(n),D=c.getNode().getImmediateChild(w).updateChild(N,r);w===".priority"?h=d.updatePriority(c.getNode(),D):h=d.updateChild(c.getNode(),w,D,N,KS,null)}const p=BS(e,h,c.isFullyInitialized()||pe(n),d.filtersNodes()),m=new A_(s,p,i);return QS(t,p,n,s,m,a)}function lg(t,e,n,r,s,i,o){const a=e.eventCache;let c,h;const d=new A_(s,e,i);if(pe(n))h=t.filter.updateFullNode(e.eventCache.getNode(),r,o),c=Cl(e,h,!0,t.filter.filtersNodes());else{const p=fe(n);if(p===".priority")h=t.filter.updatePriority(e.eventCache.getNode(),r),c=Cl(e,h,a.isFullyInitialized(),a.isFiltered());else{const m=Ae(n),w=a.getNode().getImmediateChild(p);let N;if(pe(m))N=r;else{const R=d.getCompleteChild(p);R!=null?__(m)===".priority"&&R.getChild(DS(m)).isEmpty()?N=R:N=R.updateChild(m,r):N=oe.EMPTY_NODE}if(w.equals(N))c=e;else{const R=t.filter.updateChild(a.getNode(),p,N,m,d,o);c=Cl(e,R,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function q0(t,e){return t.eventCache.isCompleteForChild(e)}function RV(t,e,n,r,s,i,o){let a=e;return r.foreach((c,h)=>{const d=Xe(n,c);q0(e,fe(d))&&(a=lg(t,a,d,h,s,i,o))}),r.foreach((c,h)=>{const d=Xe(n,c);q0(e,fe(d))||(a=lg(t,a,d,h,s,i,o))}),a}function H0(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function cg(t,e,n,r,s,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,h;pe(n)?h=r:h=new je(null).setTree(n,r);const d=e.serverCache.getNode();return h.children.inorderTraversal((p,m)=>{if(d.hasChild(p)){const w=e.serverCache.getNode().getImmediateChild(p),N=H0(t,w,m);c=ad(t,c,new ke(p),N,s,i,o,a)}}),h.children.inorderTraversal((p,m)=>{const w=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!d.hasChild(p)&&!w){const N=e.serverCache.getNode().getImmediateChild(p),R=H0(t,N,m);c=ad(t,c,new ke(p),R,s,i,o,a)}}),c}function PV(t,e,n,r,s,i,o){if(od(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(pe(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return ad(t,e,n,c.getNode().getChild(n),s,i,a,o);if(pe(n)){let h=new je(null);return c.getNode().forEachChild(Po,(d,p)=>{h=h.set(new ke(d),p)}),cg(t,e,n,h,s,i,a,o)}else return e}else{let h=new je(null);return r.foreach((d,p)=>{const m=Xe(n,d);c.isCompleteForPath(m)&&(h=h.set(d,c.getNode().getChild(m)))}),cg(t,e,n,h,s,i,a,o)}}function bV(t,e,n,r,s){const i=e.serverCache,o=BS(e,i.getNode(),i.isFullyInitialized()||pe(n),i.isFiltered());return QS(t,o,n,r,KS,s)}function DV(t,e,n,r,s,i){let o;if(od(r,n)!=null)return e;{const a=new A_(r,e,s),c=e.eventCache.getNode();let h;if(pe(n)||fe(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=id(r,Oi(e));else{const p=e.serverCache.getNode();G(p instanceof oe,"serverChildren would be complete if leaf node"),d=k_(r,p)}d=d,h=t.filter.updateFullNode(c,d,i)}else{const d=fe(n);let p=N_(r,d,e.serverCache);p==null&&e.serverCache.isCompleteForChild(d)&&(p=c.getImmediateChild(d)),p!=null?h=t.filter.updateChild(c,d,p,Ae(n),a,i):e.eventCache.getNode().hasChild(d)?h=t.filter.updateChild(c,d,oe.EMPTY_NODE,Ae(n),a,i):h=c,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=id(r,Oi(e)),o.isLeafNode()&&(h=t.filter.updateFullNode(h,o,i)))}return o=e.serverCache.isFullyInitialized()||od(r,xe())!=null,Cl(e,h,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jV{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new T_(r.getIndex()),i=Z4(r);this.processor_=SV(i);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(oe.EMPTY_NODE,o.getNode(),null),h=i.updateFullNode(oe.EMPTY_NODE,a.getNode(),null),d=new Mi(c,o.isFullyInitialized(),s.filtersNodes()),p=new Mi(h,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=df(p,d),this.eventGenerator_=new oV(this.query_)}get query(){return this.query_}}function MV(t){return t.viewCache_.serverCache.getNode()}function OV(t,e){const n=Oi(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!pe(e)&&!n.getImmediateChild(fe(e)).isEmpty())?n.getChild(e):null}function G0(t){return t.eventRegistrations_.length===0}function LV(t,e){t.eventRegistrations_.push(e)}function K0(t,e,n){const r=[];if(n){G(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function Q0(t,e,n,r){e.type===Rn.MERGE&&e.source.queryId!==null&&(G(Oi(t.viewCache_),"We should always have a full cache before handling merges"),G(ig(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=NV(t.processor_,s,e,n,r);return kV(t.processor_,i.viewCache),G(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,YS(t,i.changes,i.viewCache.eventCache.getNode(),null)}function VV(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Ue,(i,o)=>{r.push(Xo(i,o))}),n.isFullyInitialized()&&r.push(US(n.getNode())),YS(t,r,n.getNode(),e)}function YS(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return aV(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ld;class FV{constructor(){this.views=new Map}}function UV(t){G(!ld,"__referenceConstructor has already been defined"),ld=t}function zV(){return G(ld,"Reference.ts has not been loaded"),ld}function BV(t){return t.views.size===0}function R_(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return G(i!=null,"SyncTree gave us an op for an invalid query."),Q0(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(Q0(o,e,n,r));return i}}function $V(t,e,n,r,s){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=id(n,s?r:null),c=!1;a?c=!0:r instanceof oe?(a=k_(n,r),c=!1):(a=oe.EMPTY_NODE,c=!1);const h=df(new Mi(a,c,!1),new Mi(r,s,!1));return new jV(e,h)}return o}function WV(t,e,n,r,s,i){const o=$V(t,e,r,s,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),LV(o,n),VV(o,n)}function qV(t,e,n,r){const s=e._queryIdentifier,i=[];let o=[];const a=$s(t);if(s==="default")for(const[c,h]of t.views.entries())o=o.concat(K0(h,n,r)),G0(h)&&(t.views.delete(c),h.query._queryParams.loadsAllData()||i.push(h.query));else{const c=t.views.get(s);c&&(o=o.concat(K0(c,n,r)),G0(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!$s(t)&&i.push(new(zV())(e._repo,e._path)),{removed:i,events:o}}function XS(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function bo(t,e){let n=null;for(const r of t.views.values())n=n||OV(r,e);return n}function JS(t,e){if(e._queryParams.loadsAllData())return ff(t);{const r=e._queryIdentifier;return t.views.get(r)}}function ZS(t,e){return JS(t,e)!=null}function $s(t){return ff(t)!=null}function ff(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cd;function HV(t){G(!cd,"__referenceConstructor has already been defined"),cd=t}function GV(){return G(cd,"Reference.ts has not been loaded"),cd}let KV=1;class Y0{constructor(e){this.listenProvider_=e,this.syncPointTree_=new je(null),this.pendingWriteTree_=TV(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ek(t,e,n,r,s){return hV(t.pendingWriteTree_,e,n,r,s),s?bc(t,new ji(zS(),e,n)):[]}function gi(t,e,n=!1){const r=dV(t.pendingWriteTree_,e);if(fV(t.pendingWriteTree_,e)){let i=new je(null);return r.snap!=null?i=i.set(xe(),!0):Mt(r.children,o=>{i=i.set(new ke(o),!0)}),bc(t,new sd(r.path,i,n))}else return[]}function pf(t,e,n){return bc(t,new ji(I_(),e,n))}function QV(t,e,n){const r=je.fromObject(n);return bc(t,new hc(I_(),e,r))}function YV(t,e){return bc(t,new uc(I_(),e))}function XV(t,e,n){const r=b_(t,n);if(r){const s=D_(r),i=s.path,o=s.queryId,a=Kt(i,e),c=new uc(C_(o),a);return j_(t,i,c)}else return[]}function ug(t,e,n,r,s=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||ZS(o,e))){const c=qV(o,e,n,r);BV(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const h=c.removed;if(a=c.events,!s){const d=h.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=t.syncPointTree_.findOnPath(i,(m,w)=>$s(w));if(d&&!p){const m=t.syncPointTree_.subtree(i);if(!m.isEmpty()){const w=e3(m);for(let N=0;N<w.length;++N){const R=w[N],D=R.query,x=rk(t,R);t.listenProvider_.startListening(kl(D),ud(t,D),x.hashFn,x.onComplete)}}}!p&&h.length>0&&!r&&(d?t.listenProvider_.stopListening(kl(e),null):h.forEach(m=>{const w=t.queryToTagMap.get(mf(m));t.listenProvider_.stopListening(kl(m),w)}))}t3(t,h)}return a}function JV(t,e,n,r){const s=b_(t,r);if(s!=null){const i=D_(s),o=i.path,a=i.queryId,c=Kt(o,e),h=new ji(C_(a),c,n);return j_(t,o,h)}else return[]}function ZV(t,e,n,r){const s=b_(t,r);if(s){const i=D_(s),o=i.path,a=i.queryId,c=Kt(o,e),h=je.fromObject(n),d=new hc(C_(a),c,h);return j_(t,o,d)}else return[]}function X0(t,e,n,r=!1){const s=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(s,(m,w)=>{const N=Kt(m,s);i=i||bo(w,N),o=o||$s(w)});let a=t.syncPointTree_.get(s);a?(o=o||$s(a),i=i||bo(a,xe())):(a=new FV,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;i!=null?c=!0:(c=!1,i=oe.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((w,N)=>{const R=bo(N,xe());R&&(i=i.updateImmediateChild(w,R))}));const h=ZS(a,e);if(!h&&!e._queryParams.loadsAllData()){const m=mf(e);G(!t.queryToTagMap.has(m),"View does not exist, but we have a tag");const w=n3();t.queryToTagMap.set(m,w),t.tagToQueryMap.set(w,m)}const d=S_(t.pendingWriteTree_,s);let p=WV(a,e,n,d,i,c);if(!h&&!o&&!r){const m=JS(a,e);p=p.concat(r3(t,e,m))}return p}function P_(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Kt(o,e),h=bo(a,c);if(h)return h});return qS(s,e,i,n,!0)}function bc(t,e){return tk(e,t.syncPointTree_,null,S_(t.pendingWriteTree_,xe()))}function tk(t,e,n,r){if(pe(t.path))return nk(t,e,n,r);{const s=e.get(xe());n==null&&s!=null&&(n=bo(s,xe()));let i=[];const o=fe(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const h=n?n.getImmediateChild(o):null,d=HS(r,o);i=i.concat(tk(a,c,h,d))}return s&&(i=i.concat(R_(s,t,r,n))),i}}function nk(t,e,n,r){const s=e.get(xe());n==null&&s!=null&&(n=bo(s,xe()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,h=HS(r,o),d=t.operationForChild(o);d&&(i=i.concat(nk(d,a,c,h)))}),s&&(i=i.concat(R_(s,t,r,n))),i}function rk(t,e){const n=e.query,r=ud(t,n);return{hashFn:()=>(MV(e)||oe.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?XV(t,n._path,r):YV(t,n._path);{const i=XL(s,n);return ug(t,n,null,i)}}}}function ud(t,e){const n=mf(e);return t.queryToTagMap.get(n)}function mf(t){return t._path.toString()+"$"+t._queryIdentifier}function b_(t,e){return t.tagToQueryMap.get(e)}function D_(t){const e=t.indexOf("$");return G(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ke(t.substr(0,e))}}function j_(t,e,n){const r=t.syncPointTree_.get(e);G(r,"Missing sync point for query tag that we're tracking");const s=S_(t.pendingWriteTree_,e);return R_(r,n,s,null)}function e3(t){return t.fold((e,n,r)=>{if(n&&$s(n))return[ff(n)];{let s=[];return n&&(s=XS(n)),Mt(r,(i,o)=>{s=s.concat(o)}),s}})}function kl(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(GV())(t._repo,t._path):t}function t3(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=mf(r),i=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(i)}}}function n3(){return KV++}function r3(t,e,n){const r=e._path,s=ud(t,e),i=rk(t,n),o=t.listenProvider_.startListening(kl(e),s,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(r);if(s)G(!$s(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((h,d,p)=>{if(!pe(h)&&d&&$s(d))return[ff(d).query];{let m=[];return d&&(m=m.concat(XS(d).map(w=>w.query))),Mt(p,(w,N)=>{m=m.concat(N)}),m}});for(let h=0;h<c.length;++h){const d=c[h];t.listenProvider_.stopListening(kl(d),ud(t,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new M_(n)}node(){return this.node_}}class O_{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=Xe(this.path_,e);return new O_(this.syncTree_,n)}node(){return P_(this.syncTree_,this.path_)}}const s3=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},J0=function(t,e,n){if(!t||typeof t!="object")return t;if(G(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return i3(t[".sv"],e,n);if(typeof t[".sv"]=="object")return o3(t[".sv"],e);G(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},i3=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:G(!1,"Unexpected server value: "+t)}},o3=function(t,e,n){t.hasOwnProperty("increment")||G(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&G(!1,"Unexpected increment value: "+r);const s=e.node();if(G(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},a3=function(t,e,n,r){return L_(e,new O_(n,t),r)},sk=function(t,e,n){return L_(t,new M_(e),n)};function L_(t,e,n){const r=t.getPriority().val(),s=J0(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=J0(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new ht(a,et(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new ht(s))),o.forEachChild(Ue,(a,c)=>{const h=L_(c,e.getImmediateChild(a),n);h!==c&&(i=i.updateImmediateChild(a,h))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function F_(t,e){let n=e instanceof ke?e:new ke(e),r=t,s=fe(n);for(;s!==null;){const i=zo(r.node.children,s)||{children:{},childCount:0};r=new V_(s,r,i),n=Ae(n),s=fe(n)}return r}function ya(t){return t.node.value}function ik(t,e){t.node.value=e,hg(t)}function ok(t){return t.node.childCount>0}function l3(t){return ya(t)===void 0&&!ok(t)}function gf(t,e){Mt(t.node.children,(n,r)=>{e(new V_(n,t,r))})}function ak(t,e,n,r){n&&e(t),gf(t,s=>{ak(s,e,!0)})}function c3(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Dc(t){return new ke(t.parent===null?t.name:Dc(t.parent)+"/"+t.name)}function hg(t){t.parent!==null&&u3(t.parent,t.name,t)}function u3(t,e,n){const r=l3(n),s=or(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,hg(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,hg(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h3=/[\[\].#$\/\u0000-\u001F\u007F]/,d3=/[\[\].#$\u0000-\u001F\u007F]/,Tp=10*1024*1024,U_=function(t){return typeof t=="string"&&t.length!==0&&!h3.test(t)},lk=function(t){return typeof t=="string"&&t.length!==0&&!d3.test(t)},f3=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),lk(t)},ck=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!uf(t)||t&&typeof t=="object"&&or(t,".sv")},dg=function(t,e,n,r){yf(Bo(t,"value"),e,n)},yf=function(t,e,n){const r=n instanceof ke?new P4(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ui(r));if(typeof e=="function")throw new Error(t+"contains a function "+ui(r)+" with contents = "+e.toString());if(uf(e))throw new Error(t+"contains "+e.toString()+" "+ui(r));if(typeof e=="string"&&e.length>Tp/3&&Od(e)>Tp)throw new Error(t+"contains a string greater than "+Tp+" utf8 bytes "+ui(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(Mt(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!U_(o)))throw new Error(t+" contains an invalid key ("+o+") "+ui(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);b4(r,o),yf(t,a,r),D4(r)}),s&&i)throw new Error(t+' contains ".value" child '+ui(r)+" in addition to actual children.")}},p3=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const i=oc(r);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!U_(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(R4);let s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&_n(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},m3=function(t,e,n,r){const s=Bo(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const i=[];Mt(e,(o,a)=>{const c=new ke(o);if(yf(s,a,Xe(n,c)),__(c)===".priority"&&!ck(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(c)}),p3(s,i)},g3=function(t,e,n){if(uf(e))throw new Error(Bo(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ck(e))throw new Error(Bo(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},uk=function(t,e,n,r){if(!lk(n))throw new Error(Bo(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},y3=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),uk(t,e,n)},ol=function(t,e){if(fe(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},_3=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!U_(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!f3(n))throw new Error(Bo(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v3{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function z_(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!v_(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function hk(t,e,n){z_(t,n),dk(t,r=>v_(r,e))}function Lr(t,e,n){z_(t,n),dk(t,r=>_n(r,e)||_n(e,r))}function dk(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(w3(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function w3(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();xl&&wt("event: "+n.toString()),ma(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E3="repo_interrupt",T3=25;class x3{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new v3,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=rd(),this.transactionQueueTree_=new V_,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function I3(t,e,n){if(t.stats_=g_(t.repoInfo_),t.forceRestClient_||t4())t.server_=new nd(t.repoInfo_,(r,s,i,o)=>{Z0(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>eT(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{mt(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new kr(t.repoInfo_,e,(r,s,i,o)=>{Z0(t,r,s,i,o)},r=>{eT(t,r)},r=>{S3(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=o4(t.repoInfo_,()=>new iV(t.stats_,t.server_)),t.infoData_=new eV,t.infoSyncTree_=new Y0({startListening:(r,s,i,o)=>{let a=[];const c=t.infoData_.getNode(r._path);return c.isEmpty()||(a=pf(t.infoSyncTree_,r._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),$_(t,"connected",!1),t.serverSyncTree_=new Y0({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(a,c)=>{const h=o(a,c);Lr(t.eventQueue_,r._path,h)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function C3(t){const n=t.infoData_.getNode(new ke(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function B_(t){return s3({timestamp:C3(t)})}function Z0(t,e,n,r,s){t.dataUpdateCount++;const i=new ke(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const c=Dh(n,h=>et(h));o=ZV(t.serverSyncTree_,i,c,s)}else{const c=et(n);o=JV(t.serverSyncTree_,i,c,s)}else if(r){const c=Dh(n,h=>et(h));o=QV(t.serverSyncTree_,i,c)}else{const c=et(n);o=pf(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=_f(t,i)),Lr(t.eventQueue_,a,o)}function eT(t,e){$_(t,"connected",e),e===!1&&N3(t)}function S3(t,e){Mt(e,(n,r)=>{$_(t,n,r)})}function $_(t,e,n){const r=new ke("/.info/"+e),s=et(n);t.infoData_.updateSnapshot(r,s);const i=pf(t.infoSyncTree_,r,s);Lr(t.eventQueue_,r,i)}function fk(t){return t.nextWriteId_++}function k3(t,e,n,r,s){W_(t,"set",{path:e.toString(),value:n,priority:r});const i=B_(t),o=et(n,r),a=P_(t.serverSyncTree_,e),c=sk(o,a,i),h=fk(t),d=ek(t.serverSyncTree_,e,c,h,!0);z_(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(m,w)=>{const N=m==="ok";N||Zt("set at "+e+" failed: "+m);const R=gi(t.serverSyncTree_,h,!N);Lr(t.eventQueue_,e,R),Zo(t,s,m,w)});const p=_k(t,e);_f(t,p),Lr(t.eventQueue_,p,[])}function N3(t){W_(t,"onDisconnectEvents");const e=B_(t),n=rd();sg(t.onDisconnect_,xe(),(s,i)=>{const o=a3(s,i,t.serverSyncTree_,e);ga(n,s,o)});let r=[];sg(n,xe(),(s,i)=>{r=r.concat(pf(t.serverSyncTree_,s,i));const o=_k(t,s);_f(t,o)}),t.onDisconnect_=rd(),Lr(t.eventQueue_,xe(),r)}function A3(t,e,n){t.server_.onDisconnectCancel(e.toString(),(r,s)=>{r==="ok"&&rg(t.onDisconnect_,e),Zo(t,n,r,s)})}function tT(t,e,n,r){const s=et(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(i,o)=>{i==="ok"&&ga(t.onDisconnect_,e,s),Zo(t,r,i,o)})}function R3(t,e,n,r,s){const i=et(n,r);t.server_.onDisconnectPut(e.toString(),i.val(!0),(o,a)=>{o==="ok"&&ga(t.onDisconnect_,e,i),Zo(t,s,o,a)})}function P3(t,e,n,r){if(bh(n)){wt("onDisconnect().update() called with empty data.  Don't do anything."),Zo(t,r,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,i)=>{s==="ok"&&Mt(n,(o,a)=>{const c=et(a);ga(t.onDisconnect_,Xe(e,o),c)}),Zo(t,r,s,i)})}function b3(t,e,n){let r;fe(e._path)===".info"?r=X0(t.infoSyncTree_,e,n):r=X0(t.serverSyncTree_,e,n),hk(t.eventQueue_,e._path,r)}function nT(t,e,n){let r;fe(e._path)===".info"?r=ug(t.infoSyncTree_,e,n):r=ug(t.serverSyncTree_,e,n),hk(t.eventQueue_,e._path,r)}function D3(t){t.persistentConnection_&&t.persistentConnection_.interrupt(E3)}function W_(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),wt(n,...e)}function Zo(t,e,n,r){e&&ma(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function pk(t,e,n){return P_(t.serverSyncTree_,e,n)||oe.EMPTY_NODE}function q_(t,e=t.transactionQueueTree_){if(e||vf(t,e),ya(e)){const n=gk(t,e);G(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&j3(t,Dc(e),n)}else ok(e)&&gf(e,n=>{q_(t,n)})}function j3(t,e,n){const r=n.map(h=>h.currentWriteId),s=pk(t,e,r);let i=s;const o=s.hash();for(let h=0;h<n.length;h++){const d=n[h];G(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const p=Kt(e,d.path);i=i.updateChild(p,d.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,h=>{W_(t,"transaction put response",{path:c.toString(),status:h});let d=[];if(h==="ok"){const p=[];for(let m=0;m<n.length;m++)n[m].status=2,d=d.concat(gi(t.serverSyncTree_,n[m].currentWriteId)),n[m].onComplete&&p.push(()=>n[m].onComplete(null,!0,n[m].currentOutputSnapshotResolved)),n[m].unwatcher();vf(t,F_(t.transactionQueueTree_,e)),q_(t,t.transactionQueueTree_),Lr(t.eventQueue_,e,d);for(let m=0;m<p.length;m++)ma(p[m])}else{if(h==="datastale")for(let p=0;p<n.length;p++)n[p].status===3?n[p].status=4:n[p].status=0;else{Zt("transaction at "+c.toString()+" failed: "+h);for(let p=0;p<n.length;p++)n[p].status=4,n[p].abortReason=h}_f(t,e)}},o)}function _f(t,e){const n=mk(t,e),r=Dc(n),s=gk(t,n);return M3(t,s,r),r}function M3(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],h=Kt(n,c.path);let d=!1,p;if(G(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)d=!0,p=c.abortReason,s=s.concat(gi(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=T3)d=!0,p="maxretry",s=s.concat(gi(t.serverSyncTree_,c.currentWriteId,!0));else{const m=pk(t,c.path,o);c.currentInputSnapshot=m;const w=e[a].update(m.val());if(w!==void 0){yf("transaction failed: Data returned ",w,c.path);let N=et(w);typeof w=="object"&&w!=null&&or(w,".priority")||(N=N.updatePriority(m.getPriority()));const D=c.currentWriteId,x=B_(t),_=sk(N,m,x);c.currentOutputSnapshotRaw=N,c.currentOutputSnapshotResolved=_,c.currentWriteId=fk(t),o.splice(o.indexOf(D),1),s=s.concat(ek(t.serverSyncTree_,c.path,_,c.currentWriteId,c.applyLocally)),s=s.concat(gi(t.serverSyncTree_,D,!0))}else d=!0,p="nodata",s=s.concat(gi(t.serverSyncTree_,c.currentWriteId,!0))}Lr(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,function(m){setTimeout(m,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(p==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(p),!1,null))))}vf(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)ma(r[a]);q_(t,t.transactionQueueTree_)}function mk(t,e){let n,r=t.transactionQueueTree_;for(n=fe(e);n!==null&&ya(r)===void 0;)r=F_(r,n),e=Ae(e),n=fe(e);return r}function gk(t,e){const n=[];return yk(t,e,n),n.sort((r,s)=>r.order-s.order),n}function yk(t,e,n){const r=ya(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);gf(e,s=>{yk(t,s,n)})}function vf(t,e){const n=ya(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,ik(e,n.length>0?n:void 0)}gf(e,r=>{vf(t,r)})}function _k(t,e){const n=Dc(mk(t,e)),r=F_(t.transactionQueueTree_,e);return c3(r,s=>{xp(t,s)}),xp(t,r),ak(r,s=>{xp(t,s)}),n}function xp(t,e){const n=ya(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(G(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(G(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(gi(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?ik(e,void 0):n.length=i+1,Lr(t.eventQueue_,Dc(e),s);for(let o=0;o<r.length;o++)ma(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O3(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function L3(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Zt(`Invalid query segment '${n}' in query '${t}'`)}return e}const rT=function(t,e){const n=V3(t),r=n.namespace;n.domain==="firebase.com"&&Or(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Or("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||HL();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new IS(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new ke(n.pathString)}},V3=function(t){let e="",n="",r="",s="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let h=t.indexOf("//");h>=0&&(a=t.substring(0,h-1),t=t.substring(h+2));let d=t.indexOf("/");d===-1&&(d=t.length);let p=t.indexOf("?");p===-1&&(p=t.length),e=t.substring(0,Math.min(d,p)),d<p&&(s=O3(t.substring(d,p)));const m=L3(t.substring(Math.min(t.length,p)));h=e.indexOf(":"),h>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(h+1),10)):h=e.length;const w=e.slice(0,h);if(w.toLowerCase()==="localhost")n="localhost";else if(w.split(".").length<=2)n=w;else{const N=e.indexOf(".");r=e.substring(0,N).toLowerCase(),n=e.substring(N+1),i=r}"ns"in m&&(i=m.ns)}return{host:e,port:c,domain:n,subdomain:r,secure:o,scheme:a,pathString:s,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F3{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+mt(this.snapshot.exportVal())}}class U3{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z3{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return G(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B3{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new yr;return A3(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){ol("OnDisconnect.remove",this._path);const e=new yr;return tT(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){ol("OnDisconnect.set",this._path),dg("OnDisconnect.set",e,this._path);const n=new yr;return tT(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){ol("OnDisconnect.setWithPriority",this._path),dg("OnDisconnect.setWithPriority",e,this._path),g3("OnDisconnect.setWithPriority",n);const r=new yr;return R3(this._repo,this._path,e,n,r.wrapCallback(()=>{})),r.promise}update(e){ol("OnDisconnect.update",this._path),m3("OnDisconnect.update",e,this._path);const n=new yr;return P3(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return pe(this._path)?null:__(this._path)}get ref(){return new Xs(this._repo,this._path)}get _queryIdentifier(){const e=F0(this._queryParams),n=p_(e);return n==="{}"?"default":n}get _queryObject(){return F0(this._queryParams)}isEqual(e){if(e=be(e),!(e instanceof H_))return!1;const n=this._repo===e._repo,r=v_(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+A4(this._path)}}class Xs extends H_{constructor(e,n){super(e,n,new x_,!1)}get parent(){const e=DS(this._path);return e===null?null:new Xs(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class hd{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ke(e),r=fg(this.ref,e);return new hd(this._node.getChild(n),r,Ue)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new hd(s,fg(this.ref,r),Ue)))}hasChild(e){const n=new ke(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function vk(t,e){return t=be(t),t._checkNotDeleted("ref"),e!==void 0?fg(t._root,e):t._root}function fg(t,e){return t=be(t),fe(t._path)===null?y3("child","path",e):uk("child","path",e),new Xs(t._repo,Xe(t._path,e))}function $3(t){return t=be(t),new B3(t._repo,t._path)}function Ip(t,e){t=be(t),ol("set",t._path),dg("set",e,t._path);const n=new yr;return k3(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}class G_{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new F3("value",this,new hd(e.snapshotNode,new Xs(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new U3(this,e,n):null}matches(e){return e instanceof G_?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function W3(t,e,n,r,s){let i;if(typeof r=="object"&&(i=void 0,s=r),typeof r=="function"&&(i=r),s&&s.onlyOnce){const c=n,h=(d,p)=>{nT(t._repo,t,a),c(d,p)};h.userCallback=n.userCallback,h.context=n.context,n=h}const o=new z3(n,i||void 0),a=new G_(o);return b3(t._repo,t,a),()=>nT(t._repo,t,a)}function q3(t,e,n,r){return W3(t,"value",e,n,r)}UV(Xs);HV(Xs);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H3="FIREBASE_DATABASE_EMULATOR_HOST",pg={};let G3=!1;function K3(t,e,n,r){const s=e.lastIndexOf(":"),i=e.substring(0,s),o=Gs(i);t.repoInfo_=new IS(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(t.authTokenProvider_=r)}function Q3(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||Or("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),wt("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=rT(i,s),a=o.repoInfo,c;typeof process<"u"&&E0&&(c=E0[H3]),c?(i=`http://${c}?ns=${a.namespace}`,o=rT(i,s),a=o.repoInfo):o.repoInfo.secure;const h=new r4(t.name,t.options,e);_3("Invalid Firebase Database URL",o),pe(o.path)||Or("Database URL must point to the root of a Firebase Database (not including a child path).");const d=X3(a,t,h,new n4(t,n));return new J3(d,t)}function Y3(t,e){const n=pg[e];(!n||n[t.key]!==t)&&Or(`Database ${e}(${t.repoInfo_}) has already been deleted.`),D3(t),delete n[t.key]}function X3(t,e,n,r){let s=pg[e.name];s||(s={},pg[e.name]=s);let i=s[t.toURLString()];return i&&Or("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new x3(t,G3,n,r),s[t.toURLString()]=i,i}class J3{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(I3(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Xs(this._repo,xe())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Y3(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Or("Cannot call "+e+" on a deleted database.")}}function Z3(t=yy(),e){const n=Vd(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=zx("database");r&&eF(n,...r)}return n}function eF(t,e,n,r={}){t=be(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&Ds(r,i.repoInfo_.emulatorOptions))return;Or("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Or('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new th(th.OWNER);else if(r.mockUserToken){const a=typeof r.mockUserToken=="string"?r.mockUserToken:Wx(r.mockUserToken,t.app.options.projectId);o=new th(a)}Gs(e)&&(fy(e),py("Database",!0)),K3(i,s,r,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tF(t){UL(Ui),Ni(new js("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return Q3(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),Xn(T0,x0,t),Xn(T0,x0,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nF={".sv":"timestamp"};function Cp(){return nF}kr.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};kr.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};tF();const rF={apiKey:"AIzaSyACk3UhHouKfGsOu3ZJfa0hqLqucumn2UQ",authDomain:"sunday-fb28c.firebaseapp.com",databaseURL:"https://sunday-fb28c-default-rtdb.firebaseio.com",projectId:"sunday-fb28c",storageBucket:"sunday-fb28c.firebasestorage.app",messagingSenderId:"24752239756",appId:"1:24752239756:web:386c2c72624eb67ba337a9",measurementId:"G-R50TBPQFJL"},K_=Qx(rF),wk=Z3(K_),jc=xj(K_),wn=xL(K_);async function sF(t,e,n,r,s="employee"){try{const o=(await iD(jc,t,e)).user;await lD(o,{displayName:n});const a=vi(wn,"companies",r),c=await aS(a);if(!c.exists())throw new Error("رمز الشركة غير صحيح");const h=c.data();await Zm(vi(wn,"users",o.uid),{uid:o.uid,email:o.email,displayName:n,companyCode:r,companyName:h.name,role:s,avatar:null,createdAt:Ti(),lastLogin:Ti(),isActive:!0});const d=vi(wn,"companies",r,"users",o.uid);return await Zm(d,{uid:o.uid,email:o.email,displayName:n,role:s,joinedAt:Ti()}),{success:!0,user:o}}catch(i){return console.error("Registration error:",i),{success:!1,error:Mc(i)}}}async function iF(t,e){try{const r=(await oD(jc,t,e)).user;return await LL(vi(wn,"users",r.uid),{lastLogin:Ti()}),{success:!0,user:r}}catch(n){return console.error("Login error:",n),{success:!1,error:Mc(n)}}}async function Q_(){try{return await dD(jc),localStorage.clear(),sessionStorage.clear(),window.location.href="/sunday-work/auth",{success:!0}}catch(t){return console.error("Logout error:",t),{success:!1,error:Mc(t)}}}async function oF(t){try{const e=await aS(vi(wn,"users",t));return e.exists()?{success:!0,data:e.data()}:{success:!1,error:"المستخدم غير موجود"}}catch(e){return console.error("Get user data error:",e),{success:!1,error:Mc(e)}}}async function aF(t,e){try{const n=lF();return await Zm(vi(wn,"companies",n),{code:n,name:t,ownerEmail:e,createdAt:Ti(),isActive:!0,settings:{allowEmployeeInvite:!0,requireApproval:!1}}),{success:!0,code:n}}catch(n){return console.error("Create company error:",n),{success:!1,error:Mc(n)}}}function lF(){const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let e="";for(let n=0;n<8;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}function Mc(t){return{"auth/email-already-in-use":"البريد الإلكتروني مستخدم بالفعل","auth/invalid-email":"البريد الإلكتروني غير صحيح","auth/weak-password":"كلمة المرور ضعيفة (يجب أن تكون 6 أحرف على الأقل)","auth/user-not-found":"المستخدم غير موجود","auth/wrong-password":"كلمة المرور غير صحيحة","auth/too-many-requests":"محاولات كثيرة جداً، حاول لاحقاً","auth/network-request-failed":"خطأ في الاتصال بالإنترنت"}[t.code]||t.message||"حدث خطأ غير متوقع"}function cF(t){return hD(jc,t)}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var uF={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hF=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),ae=(t,e)=>{const n=b.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:a="",children:c,...h},d)=>b.createElement("svg",{ref:d,...uF,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${hF(t)}`,a].join(" "),...h},[...e.map(([p,m])=>b.createElement(p,m)),...Array.isArray(c)?c:[c]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dd=ae("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sT=ae("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dF=ae("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ek=ae("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fF=ae("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=ae("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=ae("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iT=ae("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fd=ae("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pF=ae("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mF=ae("Command",[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oT=ae("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=ae("ExternalLink",[["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}],["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["line",{x1:"10",x2:"21",y1:"14",y2:"3",key:"18c3s4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pd=ae("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gF=ae("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kn=ae("FolderKanban",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tk=ae("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yF=ae("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xk=ae("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nh=ae("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aT=ae("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lT=ae("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _F=ae("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nl=ae("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vF=ae("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const al=ae("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ik=ae("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wF=ae("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EF=ae("MoreHorizontal",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y_=ae("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TF=ae("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xF=ae("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=ae("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const md=ae("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X_=ae("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ck=ae("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IF=ae("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CF=ae("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J_=ae("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sk=ae("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cT=ae("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dc=ae("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=ae("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SF=ae("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=ae("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kk=ae("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);function kF(){const t=Fi(),[e,n]=b.useState("login"),[r,s]=b.useState(!1),[i,o]=b.useState(null),[a,c]=b.useState(null),[h,d]=b.useState(""),[p,m]=b.useState(""),[w,N]=b.useState(""),[R,D]=b.useState(""),[x,_]=b.useState(""),[E,j]=b.useState(""),[z,W]=b.useState(""),[T,v]=b.useState(""),I=async P=>{P.preventDefault(),o(null),s(!0);const S=await iF(h,p);S.success?t("/"):o(S.error),s(!1)},C=async P=>{P.preventDefault(),o(null),s(!0);const S=await sF(w,R,x,E);S.success?t("/"):o(S.error),s(!1)},A=async P=>{P.preventDefault(),o(null),c(null),s(!0);const S=await aF(z,T);S.success?(c(`تم إنشاء الشركة بنجاح! رمز الشركة: ${S.code}`),W(""),v("")):o(S.error),s(!1)};return u.jsx("div",{className:"auth-page",children:u.jsxs("div",{className:"auth-container",children:[u.jsx("div",{className:"auth-branding",children:u.jsxs("div",{className:"auth-branding-content",children:[u.jsx("h1",{className:"brand-logo",children:"Sunday"}),u.jsx("p",{className:"brand-tagline",children:"منصة إدارة المشاريع الاحترافية"}),u.jsxs("div",{className:"features-list",children:[u.jsxs("div",{className:"feature-item",children:[u.jsx("div",{className:"feature-icon",children:"✨"}),u.jsxs("div",{className:"feature-text",children:[u.jsx("h3",{children:"إدارة متقدمة"}),u.jsx("p",{children:"نظام شامل لإدارة المهام والمشاريع"})]})]}),u.jsxs("div",{className:"feature-item",children:[u.jsx("div",{className:"feature-icon",children:"🚀"}),u.jsxs("div",{className:"feature-text",children:[u.jsx("h3",{children:"تعاون فعّال"}),u.jsx("p",{children:"تواصل فوري بين أعضاء الفريق"})]})]}),u.jsxs("div",{className:"feature-item",children:[u.jsx("div",{className:"feature-icon",children:"📊"}),u.jsxs("div",{className:"feature-text",children:[u.jsx("h3",{children:"تقارير ذكية"}),u.jsx("p",{children:"تحليلات وإحصائيات مفصلة"})]})]})]})]})}),u.jsx("div",{className:"auth-forms",children:u.jsxs("div",{className:"auth-forms-content",children:[u.jsxs("div",{className:"mode-selector",children:[u.jsxs("button",{className:`mode-btn ${e==="login"?"active":""}`,onClick:()=>n("login"),children:[u.jsx(lT,{size:18}),u.jsx("span",{children:"تسجيل دخول"})]}),u.jsxs("button",{className:`mode-btn ${e==="register"?"active":""}`,onClick:()=>n("register"),children:[u.jsx(cT,{size:18}),u.jsx("span",{children:"حساب جديد"})]}),u.jsxs("button",{className:`mode-btn ${e==="create-company"?"active":""}`,onClick:()=>n("create-company"),children:[u.jsx(Sp,{size:18}),u.jsx("span",{children:"إنشاء شركة"})]})]}),i&&u.jsxs("div",{className:"alert alert-danger",children:[u.jsx(sT,{size:18}),u.jsx("span",{children:i})]}),a&&u.jsxs("div",{className:"alert alert-success",children:[u.jsx(sT,{size:18}),u.jsx("span",{children:a})]}),e==="login"&&u.jsxs("form",{onSubmit:I,className:"auth-form",children:[u.jsx("h2",{className:"form-title",children:"مرحباً بعودتك!"}),u.jsx("p",{className:"form-subtitle",children:"سجّل دخولك للمتابعة"}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"البريد الإلكتروني"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Nl,{size:20}),u.jsx("input",{type:"email",value:h,onChange:P=>d(P.target.value),placeholder:"name@company.com",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"كلمة المرور"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(aT,{size:20}),u.jsx("input",{type:"password",value:p,onChange:P=>m(P.target.value),placeholder:"••••••••",required:!0})]})]}),u.jsx("button",{type:"submit",className:"btn btn-primary btn-block",disabled:r,children:r?u.jsxs(u.Fragment,{children:[u.jsx(nh,{size:18,className:"spin"}),u.jsx("span",{children:"جاري تسجيل الدخول..."})]}):u.jsxs(u.Fragment,{children:[u.jsx(lT,{size:18}),u.jsx("span",{children:"تسجيل الدخول"})]})})]}),e==="register"&&u.jsxs("form",{onSubmit:C,className:"auth-form",children:[u.jsx("h2",{className:"form-title",children:"إنشاء حساب جديد"}),u.jsx("p",{className:"form-subtitle",children:"انضم لفريقك الآن"}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"الاسم الكامل"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(dc,{size:20}),u.jsx("input",{type:"text",value:x,onChange:P=>_(P.target.value),placeholder:"أحمد محمد",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"البريد الإلكتروني"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Nl,{size:20}),u.jsx("input",{type:"email",value:w,onChange:P=>N(P.target.value),placeholder:"name@company.com",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"كلمة المرور"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(aT,{size:20}),u.jsx("input",{type:"password",value:R,onChange:P=>D(P.target.value),placeholder:"••••••••",required:!0,minLength:6})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"رمز الشركة"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(yF,{size:20}),u.jsx("input",{type:"text",value:E,onChange:P=>j(P.target.value.toUpperCase()),placeholder:"ABC12345",required:!0,maxLength:8})]}),u.jsx("small",{className:"form-hint",children:"اطلب رمز الشركة من المسؤول"})]}),u.jsx("button",{type:"submit",className:"btn btn-primary btn-block",disabled:r,children:r?u.jsxs(u.Fragment,{children:[u.jsx(nh,{size:18,className:"spin"}),u.jsx("span",{children:"جاري إنشاء الحساب..."})]}):u.jsxs(u.Fragment,{children:[u.jsx(cT,{size:18}),u.jsx("span",{children:"إنشاء الحساب"})]})})]}),e==="create-company"&&u.jsxs("form",{onSubmit:A,className:"auth-form",children:[u.jsx("h2",{className:"form-title",children:"إنشاء شركة جديدة"}),u.jsx("p",{className:"form-subtitle",children:"ابدأ بإدارة فريقك"}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"اسم الشركة"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Sp,{size:20}),u.jsx("input",{type:"text",value:z,onChange:P=>W(P.target.value),placeholder:"شركة التقنية المتقدمة",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"البريد الإلكتروني للمسؤول"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Nl,{size:20}),u.jsx("input",{type:"email",value:T,onChange:P=>v(P.target.value),placeholder:"admin@company.com",required:!0})]}),u.jsx("small",{className:"form-hint",children:"سيتم إرسال رمز الشركة لهذا البريد"})]}),u.jsx("button",{type:"submit",className:"btn btn-primary btn-block",disabled:r,children:r?u.jsxs(u.Fragment,{children:[u.jsx(nh,{size:18,className:"spin"}),u.jsx("span",{children:"جاري إنشاء الشركة..."})]}):u.jsxs(u.Fragment,{children:[u.jsx(Sp,{size:18}),u.jsx("span",{children:"إنشاء الشركة"})]})})]})]})})]})})}const Nk=b.createContext({});async function NF(){if(window.indexedDB){const t=await window.indexedDB.databases();for(const e of t)window.indexedDB.deleteDatabase(e.name),console.log("Deleted DB:",e.name)}localStorage.clear(),sessionStorage.clear(),await Q_(),window.location.href="/sunday-work/auth"}function wf(){return b.useContext(Nk)}function AF({children:t}){const[e,n]=b.useState(null),[r,s]=b.useState(null),[i,o]=b.useState(!0);b.useEffect(()=>cF(async h=>{if(n(h),h){const d=await oF(h.uid);d.success&&s(d.data)}else s(null);o(!1)}),[]);const a={currentUser:e,userData:r,loading:i,isAuthenticated:!!e,isAdmin:(r==null?void 0:r.role)==="admin",isManager:(r==null?void 0:r.role)==="manager"||(r==null?void 0:r.role)==="admin",isEmployee:(r==null?void 0:r.role)==="employee"};return u.jsx(Nk.Provider,{value:a,children:!i&&t})}function RF(){var s;const t=wf(),[e,n]=b.useState(null);b.useEffect(()=>{n(jc.currentUser)},[]);const r=async()=>{window.indexedDB&&(await window.indexedDB.databases()).forEach(o=>{window.indexedDB.deleteDatabase(o.name)}),localStorage.clear(),sessionStorage.clear(),await Q_(),window.location.href="/sunday-work/auth"};return u.jsxs("div",{style:{padding:"40px",fontFamily:"monospace",direction:"ltr"},children:[u.jsx("h1",{children:"🔍 Auth Debug Panel"}),u.jsxs("div",{style:{background:"#f5f5f5",padding:"20px",margin:"20px 0",borderRadius:"8px"},children:[u.jsx("h3",{children:"AuthContext State:"}),u.jsx("pre",{children:JSON.stringify({isAuthenticated:t.isAuthenticated,currentUser:((s=t.currentUser)==null?void 0:s.email)||null,userData:t.userData||null,loading:t.loading},null,2)})]}),u.jsxs("div",{style:{background:"#f5f5f5",padding:"20px",margin:"20px 0",borderRadius:"8px"},children:[u.jsx("h3",{children:"Firebase Auth State:"}),u.jsx("pre",{children:JSON.stringify({fbCurrentUser:(e==null?void 0:e.email)||null,fbUid:(e==null?void 0:e.uid)||null},null,2)})]}),u.jsxs("div",{style:{background:"#fff3cd",padding:"20px",margin:"20px 0",borderRadius:"8px"},children:[u.jsx("h3",{children:"Storage:"}),u.jsxs("p",{children:["localStorage items: ",localStorage.length]}),u.jsxs("p",{children:["sessionStorage items: ",sessionStorage.length]})]}),u.jsx("button",{onClick:r,style:{background:"#dc3545",color:"white",padding:"12px 24px",border:"none",borderRadius:"6px",fontSize:"16px",cursor:"pointer",fontWeight:"bold"},children:"🔥 Force Complete Logout"}),u.jsx("p",{style:{marginTop:"20px",color:"#666"},children:"هذا الزر سيحذف كل شيء بما فيها IndexedDB"})]})}const F={personality:{voice:"ودود، احترافي، مبتكر",tone:"متفائل، داعم، ملهم",style:"عصري، نابض بالحياة، منظم"},colors:{vibrant:{purple:"#6C5CE7",blue:"#0984E3",green:"#00B894",yellow:"#FDCB6E",orange:"#FF7675",pink:"#FD79A8",teal:"#00CEC9",red:"#FF6B6B"},success:"#00B894",gray:{50:"#F9FAFB",200:"#E5E7EB",600:"#4B5563",700:"#374151",900:"#111827"}},typography:{fontFamily:{code:'"Fira Code", "Courier New", monospace'},fontSize:{sm:"14px",lg:"18px","2xl":"24px","3xl":"30px"},fontWeight:{medium:500,bold:700,black:900}},spacing:{sm:"8px",md:"16px",lg:"24px",xl:"32px","3xl":"64px"},borderRadius:{xl:"16px","2xl":"24px","3xl":"32px"},shadows:{lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1)","2xl":"0 25px 50px -12px rgba(0, 0, 0, 0.25)",inner:"inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"},name:"Sunday",tagline:"منصة إدارة المشاريع الاحترافية",description:"نظام متكامل لإدارة المشاريع والمهام بكفاءة عالية",features:[{icon:"⚡",title:"سريع",description:"أداء فائق السرعة"},{icon:"🎯",title:"منظم",description:"إدارة احترافية للمهام"},{icon:"👥",title:"تعاوني",description:"عمل جماعي فعّال"},{icon:"📊",title:"تحليلي",description:"تقارير وإحصائيات دقيقة"},{icon:"🔒",title:"آمن",description:"حماية متقدمة للبيانات"},{icon:"🚀",title:"مبتكر",description:"ميزات حديثة ومتطورة"}]};function bu({size:t="md",variant:e="full",showText:n=!0,animated:r=!1}){const s={xs:{box:40,text:"18px"},sm:{box:56,text:"24px"},md:{box:72,text:"32px"},lg:{box:96,text:"42px"},xl:{box:120,text:"56px"}},i=s[t]||s.md;return u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:n?"20px":"0",flexDirection:e==="stacked"?"column":"row"},children:[u.jsxs("div",{style:{width:`${i.box}px`,height:`${i.box}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",animation:r?"rotateSun 20s linear infinite":"none"},children:[u.jsxs("svg",{width:i.box,height:i.box,viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[u.jsxs("defs",{children:[u.jsxs("linearGradient",{id:"sunGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[u.jsx("stop",{offset:"0%",stopColor:F.colors.vibrant.yellow}),u.jsx("stop",{offset:"50%",stopColor:F.colors.vibrant.orange}),u.jsx("stop",{offset:"100%",stopColor:F.colors.vibrant.purple})]}),u.jsxs("filter",{id:"glow",children:[u.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),u.jsxs("feMerge",{children:[u.jsx("feMergeNode",{in:"coloredBlur"}),u.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),u.jsx("circle",{cx:"60",cy:"60",r:"35",fill:"url(#sunGradient)",filter:"url(#glow)"}),u.jsxs("g",{stroke:"url(#sunGradient)",strokeWidth:"5",strokeLinecap:"round",opacity:"0.8",children:[u.jsx("line",{x1:"60",y1:"10",x2:"60",y2:"25"}),u.jsx("line",{x1:"95",y1:"25",x2:"85",y2:"35"}),u.jsx("line",{x1:"110",y1:"60",x2:"95",y2:"60"}),u.jsx("line",{x1:"95",y1:"95",x2:"85",y2:"85"}),u.jsx("line",{x1:"60",y1:"110",x2:"60",y2:"95"}),u.jsx("line",{x1:"25",y1:"95",x2:"35",y2:"85"}),u.jsx("line",{x1:"10",y1:"60",x2:"25",y2:"60"}),u.jsx("line",{x1:"25",y1:"25",x2:"35",y2:"35"})]}),u.jsx("text",{x:"60",y:"77",fontFamily:"Arial, sans-serif",fontSize:"52",fontWeight:"900",fill:"white",textAnchor:"middle",children:"S"})]}),u.jsx("style",{children:`
          @keyframes rotateSun {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `})]}),n&&u.jsxs("div",{style:{textAlign:e==="stacked"?"center":"left"},children:[u.jsx("h1",{style:{fontSize:i.text,fontWeight:F.typography.fontWeight.black,background:`linear-gradient(135deg, ${F.colors.vibrant.purple} 0%, ${F.colors.vibrant.orange} 50%, ${F.colors.vibrant.yellow} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:0,letterSpacing:"-2px",lineHeight:1},children:F.name}),e==="full"&&u.jsx("p",{style:{fontSize:`calc(${i.text} * 0.3)`,color:F.colors.gray[600],margin:"4px 0 0 0",fontWeight:F.typography.fontWeight.medium},children:F.tagline})]})]})}function Ak(){return u.jsxs("div",{style:{minHeight:"100vh",background:`linear-gradient(135deg, ${F.colors.vibrant.purple} 0%, ${F.colors.vibrant.pink} 50%, ${F.colors.vibrant.orange} 100%)`,padding:"40px 20px",position:"relative",overflow:"hidden"},children:[u.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,opacity:.1,backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}),u.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1},children:[u.jsxs("div",{style:{background:"white",borderRadius:F.borderRadius["3xl"],padding:F.spacing["3xl"],marginBottom:F.spacing.xl,boxShadow:F.shadows["2xl"],textAlign:"center"},children:[u.jsx(bu,{size:"xl",variant:"stacked",showText:!0,animated:!0}),u.jsx("p",{style:{fontSize:F.typography.fontSize.lg,color:F.colors.gray[600],marginTop:F.spacing.xl,maxWidth:"600px",margin:"24px auto 0"},children:F.description})]}),u.jsxs("div",{style:{background:"white",borderRadius:F.borderRadius["2xl"],padding:F.spacing.xl,marginBottom:F.spacing.xl,boxShadow:F.shadows.xl},children:[u.jsx("h2",{style:{fontSize:F.typography.fontSize["3xl"],fontWeight:F.typography.fontWeight.black,color:F.colors.gray[900],marginBottom:F.spacing.lg,textAlign:"center"},children:"🎭 شخصية العلامة التجارية"}),u.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:F.spacing.lg},children:[{title:"الصوت",value:F.personality.voice,icon:"🗣️"},{title:"النبرة",value:F.personality.tone,icon:"🎵"},{title:"الأسلوب",value:F.personality.style,icon:"✨"}].map((t,e)=>u.jsxs("div",{style:{background:`linear-gradient(135deg, ${F.colors.gray[50]} 0%, white 100%)`,padding:F.spacing.lg,borderRadius:F.borderRadius.xl,border:`2px solid ${F.colors.gray[200]}`,textAlign:"center"},children:[u.jsx("div",{style:{fontSize:"48px",marginBottom:F.spacing.sm},children:t.icon}),u.jsx("h3",{style:{fontSize:F.typography.fontSize.lg,fontWeight:F.typography.fontWeight.bold,color:F.colors.gray[900],marginBottom:F.spacing.sm},children:t.title}),u.jsx("p",{style:{fontSize:F.typography.fontSize.sm,color:F.colors.gray[600]},children:t.value})]},e))})]}),u.jsxs("div",{style:{background:"white",borderRadius:F.borderRadius["2xl"],padding:F.spacing.xl,marginBottom:F.spacing.xl,boxShadow:F.shadows.xl},children:[u.jsx("h2",{style:{fontSize:F.typography.fontSize["3xl"],fontWeight:F.typography.fontWeight.black,color:F.colors.gray[900],marginBottom:F.spacing.lg,textAlign:"center"},children:"🎨 الألوان النابضة بالحياة"}),u.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:F.spacing.md},children:Object.entries(F.colors.vibrant).map(([t,e])=>u.jsxs("div",{style:{background:e,height:"120px",borderRadius:F.borderRadius.xl,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:F.shadows.lg,cursor:"pointer",transition:"transform 0.2s ease",color:"white",fontWeight:F.typography.fontWeight.bold},onMouseEnter:n=>n.currentTarget.style.transform="scale(1.05)",onMouseLeave:n=>n.currentTarget.style.transform="scale(1)",children:[u.jsx("span",{style:{fontSize:"24px",marginBottom:"8px"},children:"●"}),u.jsx("span",{style:{fontSize:"12px",textTransform:"capitalize"},children:t}),u.jsx("code",{style:{fontSize:"9px",opacity:.8},children:e})]},t))})]}),u.jsxs("div",{style:{background:"white",borderRadius:F.borderRadius["2xl"],padding:F.spacing.xl,marginBottom:F.spacing.xl,boxShadow:F.shadows.xl},children:[u.jsx("h2",{style:{fontSize:F.typography.fontSize["3xl"],fontWeight:F.typography.fontWeight.black,color:F.colors.gray[900],marginBottom:F.spacing.lg,textAlign:"center"},children:"⭐ المميزات الأساسية"}),u.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:F.spacing.lg},children:F.features.map((t,e)=>u.jsxs("div",{style:{background:`linear-gradient(135deg, ${Object.values(F.colors.vibrant)[e%8]}15 0%, ${Object.values(F.colors.vibrant)[e%8]}05 100%)`,padding:F.spacing.lg,borderRadius:F.borderRadius.xl,border:`2px solid ${Object.values(F.colors.vibrant)[e%8]}`,textAlign:"center",cursor:"pointer",transition:"all 0.3s ease"},onMouseEnter:n=>{n.currentTarget.style.transform="translateY(-8px)",n.currentTarget.style.boxShadow=F.shadows.xl},onMouseLeave:n=>{n.currentTarget.style.transform="translateY(0)",n.currentTarget.style.boxShadow="none"},children:[u.jsx("div",{style:{fontSize:"48px",marginBottom:F.spacing.md},children:t.icon}),u.jsx("h3",{style:{fontSize:F.typography.fontSize.lg,fontWeight:F.typography.fontWeight.bold,color:F.colors.gray[900],marginBottom:F.spacing.sm},children:t.title}),u.jsx("p",{style:{fontSize:F.typography.fontSize.sm,color:F.colors.gray[600]},children:t.description})]},e))})]}),u.jsxs("div",{style:{background:"white",borderRadius:F.borderRadius["2xl"],padding:F.spacing.xl,marginBottom:F.spacing.xl,boxShadow:F.shadows.xl},children:[u.jsx("h2",{style:{fontSize:F.typography.fontSize["3xl"],fontWeight:F.typography.fontWeight.black,color:F.colors.gray[900],marginBottom:F.spacing.lg,textAlign:"center"},children:"🌟 أشكال الشعار المختلفة"}),u.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:F.spacing.xl,padding:F.spacing.lg},children:[u.jsxs("div",{style:{textAlign:"center",padding:F.spacing.lg,background:F.colors.gray[50],borderRadius:F.borderRadius.xl},children:[u.jsx(bu,{size:"lg",variant:"full",showText:!0,animated:!1}),u.jsx("p",{style:{marginTop:F.spacing.md,fontSize:F.typography.fontSize.sm,color:F.colors.gray[600]},children:"Full Logo"})]}),u.jsxs("div",{style:{textAlign:"center",padding:F.spacing.lg,background:F.colors.gray[50],borderRadius:F.borderRadius.xl},children:[u.jsx(bu,{size:"lg",variant:"stacked",showText:!0,animated:!1}),u.jsx("p",{style:{marginTop:F.spacing.md,fontSize:F.typography.fontSize.sm,color:F.colors.gray[600]},children:"Stacked Logo"})]}),u.jsxs("div",{style:{textAlign:"center",padding:F.spacing.lg,background:F.colors.gray[50],borderRadius:F.borderRadius.xl},children:[u.jsx(bu,{size:"lg",showText:!1,animated:!0}),u.jsx("p",{style:{marginTop:F.spacing.md,fontSize:F.typography.fontSize.sm,color:F.colors.gray[600]},children:"Icon Only (Animated)"})]})]})]}),u.jsxs("div",{style:{background:`linear-gradient(135deg, ${F.colors.vibrant.yellow}30 0%, ${F.colors.vibrant.orange}30 100%)`,padding:F.spacing.xl,borderRadius:F.borderRadius["2xl"],textAlign:"center",border:`3px solid ${F.colors.vibrant.orange}`,boxShadow:F.shadows.xl},children:[u.jsx("h3",{style:{fontSize:F.typography.fontSize["2xl"],fontWeight:F.typography.fontWeight.bold,color:F.colors.gray[900],marginBottom:F.spacing.md},children:"🚀 جاهز للانطلاق؟"}),u.jsx("p",{style:{fontSize:F.typography.fontSize.lg,color:F.colors.gray[700],marginBottom:F.spacing.lg},children:"لرؤية صفحة المصادقة الكاملة، افتح Console (F12) والصق الكود:"}),u.jsx("code",{style:{display:"block",background:F.colors.gray[900],color:F.colors.success,padding:F.spacing.lg,borderRadius:F.borderRadius.xl,fontFamily:F.typography.fontFamily.code,fontSize:F.typography.fontSize.sm,textAlign:"left",direction:"ltr",overflow:"auto",lineHeight:"1.8",boxShadow:F.shadows.inner},children:`(async () => {
  const dbs = await indexedDB.databases();
  dbs.forEach(db => indexedDB.deleteDatabase(db.name));
  localStorage.clear();
  sessionStorage.clear();
  setTimeout(() => location.href = '/sunday-work/auth', 1000);
})();`})]}),u.jsx("div",{style:{marginTop:F.spacing.xl,textAlign:"center",color:"white",fontSize:F.typography.fontSize.lg,fontWeight:F.typography.fontWeight.medium,textShadow:"0 2px 4px rgba(0,0,0,0.2)"},children:"Made with 💜 by Claude & Meshal"})]})]})}function PF(){const t=[{icon:Kn,label:"إجمالي اللوحات",value:"26",subtitle:"في 6 مساحات عمل",progress:100,color:"#6161FF",bgColor:"#F0EFFF",trend:""},{icon:Vr,label:"أعضاء الفريق",value:"29",subtitle:"عضو نشط",progress:100,color:"#00CA72",bgColor:"#E5FFF1",trend:""},{icon:dd,label:"المهام النشطة",value:"800+",subtitle:"مهمة في التقدم",progress:75,color:"#FDAB3D",bgColor:"#FFF4E5",trend:""},{icon:Sk,label:"مساحات العمل",value:"6",subtitle:"مساحة نشطة",progress:100,color:"#0073EA",bgColor:"#E3F2FF",trend:""}];return u.jsxs("div",{className:"dashboard",children:[u.jsxs("div",{className:"dashboard-header",children:[u.jsxs("div",{className:"header-content",children:[u.jsx("h1",{children:"مرحباً، مشال 👋"}),u.jsx("p",{children:"لديك 23 مهمة نشطة و 5 مهام تحتاج متابعة عاجلة"})]}),u.jsxs("div",{className:"header-actions",children:[u.jsxs("button",{className:"btn btn-secondary",children:[u.jsx(dF,{size:18}),u.jsx("span",{children:"التقارير"})]}),u.jsxs("button",{className:"btn btn-primary",children:[u.jsx(Kn,{size:18}),u.jsx("span",{children:"مشروع جديد"})]})]})]}),u.jsx("div",{className:"stats-grid",children:t.map((e,n)=>u.jsxs("div",{className:"stat-card",style:{"--accent-color":e.color},children:[u.jsxs("div",{className:"stat-header",children:[u.jsx("div",{className:"stat-icon",style:{backgroundColor:e.bgColor},children:u.jsx(e.icon,{size:24,style:{color:e.color}})}),u.jsx("div",{className:"stat-trend",style:{color:e.color},children:e.trend})]}),u.jsxs("div",{className:"stat-body",children:[u.jsx("div",{className:"stat-value",children:e.value}),u.jsx("div",{className:"stat-label",children:e.label}),u.jsx("div",{className:"stat-subtitle",children:e.subtitle})]}),u.jsx("div",{className:"stat-progress",children:u.jsx("div",{className:"stat-progress-bar",style:{width:`${e.progress}%`,backgroundColor:e.color}})})]},n))}),u.jsx("div",{className:"dashboard-content",children:u.jsxs("div",{className:"dashboard-card",style:{flex:1,textAlign:"center",padding:"60px 20px"},children:[u.jsx(Kn,{size:64,style:{color:"#C4C4C4",margin:"0 auto 20px"}}),u.jsx("h3",{style:{color:"#323338",marginBottom:"10px"},children:"مرحباً بك في Sunday"}),u.jsx("p",{style:{color:"#676879",marginBottom:"30px"},children:"جميع بياناتك من Monday.com متصلة ومتزامنة"}),u.jsxs("div",{style:{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"},children:[u.jsxs("a",{href:"/sunday-work/workspaces",className:"btn btn-primary",style:{textDecoration:"none"},children:[u.jsx(Kn,{size:18}),u.jsx("span",{children:"عرض مساحات العمل"})]}),u.jsxs("a",{href:"/sunday-work/team",className:"btn btn-secondary",style:{textDecoration:"none"},children:[u.jsx(Vr,{size:18}),u.jsx("span",{children:"عرض الفريق"})]})]})]})})]})}const Z_=[{id:"4163103",name:"الإدارة العليا",icon:"🏢",color:"#6161FF",members:29,boards:22},{id:"4152774",name:"مبيعات الشركات template",icon:"💼",color:"#E74C3C",members:29,boards:1},{id:"3823324",name:"IT Management Solution",icon:"💻",color:"#0073EA",members:29,boards:3},{id:"3597255",name:"Level Up",icon:"📈",color:"#00CA72",members:29,boards:0},{id:"2965387",name:"CRM",icon:"👥",color:"#FDAB3D",members:29,boards:1},{id:"2678373",name:"Main workspace",icon:"📊",color:"#FF158A",members:29,boards:0}],Rk={4163103:[{id:"1933939383",name:"مبيعات الشركات",icon:"💰",color:"#E74C3C",tasks:218},{id:"1929435129",name:"CRM Sales 2",icon:"📊",color:"#3498DB",tasks:159},{id:"2082909220",name:"Brandizzer clients",icon:"👥",color:"#6161FF",tasks:117},{id:"5004046796",name:"العملاء - المنجزين",icon:"✅",color:"#00CA72",tasks:114},{id:"5004064987",name:"العملاء الجدد",icon:"🆕",color:"#FF158A",tasks:21},{id:"2080809360",name:"Golden Ticket-Managemnt",icon:"🎫",color:"#FDAB3D",tasks:55},{id:"2080807883",name:"Golden Host - Managemnt",icon:"🏨",color:"#E44258",tasks:41},{id:"1937035902",name:"Golden Ticket-الاحداث",icon:"🎉",color:"#9B59B6",tasks:44},{id:"1937038882",name:"Level UP - Managemnt",icon:"📈",color:"#1ABC9C",tasks:34},{id:"2080806968",name:"Brandizr - Managemnt",icon:"⚙️",color:"#34495E",tasks:2},{id:"2080808005",name:"Golden Host -Social Media",icon:"📱",color:"#0073EA",tasks:23},{id:"2080807098",name:"Brandizr - Social Media",icon:"📲",color:"#00D1CD",tasks:17},{id:"1937039511",name:"Level UP -Social Media",icon:"📣",color:"#E67E22",tasks:2},{id:"2080809452",name:"GoldeTicket -Social Media",icon:"🎫",color:"#95A5A6",tasks:0},{id:"1937040156",name:"النمو والتطوير والشراكات",icon:"🚀",color:"#27AE60",tasks:46},{id:"1962968698",name:"مدفوعات ليفل اب",icon:"💳",color:"#F39C12",tasks:40},{id:"5054566034",name:"الجودة والتطوير",icon:"⚙️",color:"#9B59B6",tasks:9},{id:"1962657975",name:"Brandizr - Managemnt Storage",icon:"📦",color:"#7F8C8D",tasks:14},{id:"1951012012",name:"Design Weekly Tasks",icon:"🎨",color:"#E91E63",tasks:6},{id:"5079968085",name:"New Form",icon:"📋",color:"#3498DB",tasks:1},{id:"1937039758",name:"new1",icon:"📝",color:"#BDC3C7",tasks:4},{id:"9999999999",name:"المتأخرات",icon:"⚠️",color:"#E44258",tasks:0}],4152774:[{id:"1923982430",name:"مبيعات الشركات",icon:"💰",color:"#E74C3C",tasks:27}],3823324:[{id:"1855101083",name:"Incidents",icon:"🚨",color:"#E74C3C",tasks:1},{id:"1855101078",name:"Tickets",icon:"🎫",color:"#F39C12",tasks:3},{id:"1855101074",name:"📌 Start here",icon:"🏁",color:"#3498DB",tasks:1}],3597255:[],2965387:[{id:"1682731127",name:"Accounts",icon:"👤",color:"#9B59B6",tasks:3}],2678373:[]},Np=[{id:"1",name:"meshal",email:"meshal.hgz@gmail.com",phone:"",photo:null,title:"المدير التنفيذي",role:"Admin",status:"active",enabled:!0},{id:"2",name:"Majed",email:"majedam12@hotmail.com",phone:"",photo:null,title:"مدير المشروع",role:"Admin",status:"active",enabled:!0},{id:"3",name:"رشا العتيبي",email:"rasha.qk@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"4",name:"محمد مهنا",email:"muhanna_mm@hotmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"5",name:"yazeed almutairi",email:"yzo.mut33@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"6",name:"Salma alz",email:"salma.hr@goldenhost.co",phone:"538669473",photo:null,title:"موارد بشرية",role:"Member",status:"active",enabled:!0},{id:"7",name:"Abdulaziz",email:"abdulazizfadil70@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"8",name:"محمد سالم",email:"ma1600969@gmail.com",phone:"966552389264",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"9",name:"أمل القرني",email:"amlalqrny691@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"10",name:"رغد العتيبي",email:"raqmohamed1996@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"11",name:"Badr Anaam",email:"mediabuyer.adz1@gmail.com",phone:"",photo:null,title:"Media Buyer",role:"Member",status:"active",enabled:!0},{id:"12",name:"مصعب نور",email:"mussabnoor88@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"13",name:"sami alnajjar",email:"samialnjjar1975@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"14",name:"سليمان احمد",email:"deesd6060@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"15",name:"Siham Abdou",email:"abdousiham222@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"16",name:"fouad ae",email:"aitelhajfouad@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"17",name:"Amal",email:"amal4ti@goldenhost.co",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"18",name:"yasser mohanna",email:"yassser.1323@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"19",name:"Anwar",email:"anwar8t8@hotmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"20",name:"Amani A",email:"amanialrizqi@goldenhost.co",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"21",name:"mohammad.hr",email:"mohammad.hr@goldenhost.co",phone:"0537805895",photo:null,title:"موارد بشرية",role:"Member",status:"active",enabled:!0},{id:"22",name:"Abdullah",email:"abdullah.alruhimi@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"23",name:"منيرة القحطاني",email:"monirh94m@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"24",name:"Mohamed Yasser",email:"moh.yasser.co@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"25",name:"MOHAMMED JAMAL",email:"mohdesign92@gmail.com",phone:"",photo:null,title:"مصمم",role:"Member",status:"active",enabled:!0},{id:"26",name:"Abdulmajeed Yahya Alqahtani",email:"abdulmajeed.alqahtani7@gmail.com",phone:"",photo:null,title:"موظف",role:"Member",status:"active",enabled:!0},{id:"27",name:"RokiaMeryem",email:"rokiagadire@gmail.com",phone:"+212675971509",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"28",name:"الهنوف",email:"alhanouf7y@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0},{id:"29",name:"Saja aljallal",email:"saj1995.za@gmail.com",phone:"",photo:null,title:"موظفة",role:"Member",status:"active",enabled:!0}];function bF(){const t=Fi(),[e,n]=b.useState(!1),r=Z_.map(o=>({...o,description:`مساحة عمل تحتوي على ${o.boards} لوحة`})),s=o=>{t(`/workspace/${o}`)},i=()=>{alert(`إنشاء مساحة عمل جديدة - قريباً!

هذه الميزة ستتوفر قريباً. حالياً يمكنك استخدام مساحات العمل الموجودة من Monday.com`)};return u.jsxs("div",{className:"workspaces-page",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"مساحات العمل"}),u.jsx("p",{children:"إدارة جميع مساحات العمل والمشاريع"})]}),u.jsxs("button",{className:"btn btn-primary",onClick:i,children:[u.jsx(bt,{size:20}),u.jsx("span",{children:"مساحة عمل جديدة"})]})]}),u.jsxs("div",{className:"workspaces-grid",children:[r.map(o=>u.jsxs("div",{className:"workspace-card",children:[u.jsxs("div",{className:"workspace-header",children:[u.jsx("div",{className:"workspace-icon",style:{backgroundColor:`${o.color}20`},children:u.jsx(Kn,{size:24,style:{color:o.color}})}),u.jsx("button",{className:"icon-button",children:u.jsx(Y_,{size:20})})]}),u.jsxs("div",{className:"workspace-content",children:[u.jsx("h3",{children:o.name}),u.jsx("p",{children:o.description})]}),u.jsxs("div",{className:"workspace-footer",children:[u.jsxs("div",{className:"workspace-stat",children:[u.jsx(Kn,{size:16}),u.jsxs("span",{children:[o.boards," لوحات"]})]}),u.jsxs("div",{className:"workspace-stat",children:[u.jsx(Vr,{size:16}),u.jsxs("span",{children:[o.members," أعضاء"]})]})]}),u.jsx("button",{className:"workspace-enter-btn",onClick:()=>s(o.id),children:"دخول مساحة العمل"})]},o.id)),u.jsx("div",{className:"workspace-card create-card",children:u.jsxs("div",{className:"create-card-content",children:[u.jsx("div",{className:"create-icon",children:u.jsx(bt,{size:32})}),u.jsx("h3",{children:"إنشاء مساحة عمل جديدة"}),u.jsx("p",{children:"ابدأ بإنشاء مساحة عمل لمشروع أو فريق جديد"}),u.jsx("button",{className:"btn btn-outline",onClick:i,children:"إنشاء الآن"})]})})]})]})}function DF(){const{id:t}=Px(),e=Fi(),n=Z_.find(s=>s.id===t),r=Rk[t]||[];return n?u.jsxs("div",{className:"workspace-view-page",children:[u.jsxs("div",{className:"workspace-header",children:[u.jsxs("div",{className:"workspace-header-content",children:[u.jsx("div",{className:"workspace-icon-large",children:n.icon}),u.jsxs("div",{children:[u.jsx("h1",{children:n.name}),u.jsxs("p",{children:[n.members," عضو • ",r.length," لوحة"]})]})]}),u.jsxs("div",{className:"workspace-header-actions",children:[u.jsxs("button",{className:"btn btn-secondary",children:[u.jsx(Vr,{size:18}),u.jsx("span",{children:"إدارة الأعضاء"})]}),u.jsxs("button",{className:"btn btn-primary",children:[u.jsx(bt,{size:18}),u.jsx("span",{children:"لوحة جديدة"})]})]})]}),u.jsxs("div",{className:"boards-section",children:[u.jsx("div",{className:"section-header",children:u.jsxs("h2",{children:["اللوحات (",r.length,")"]})}),r.length===0?u.jsxs("div",{className:"empty-state",children:[u.jsx(Kn,{size:48}),u.jsx("h3",{children:"لا توجد لوحات في هذه المساحة"}),u.jsx("p",{children:"ابدأ بإنشاء لوحة جديدة لإدارة مهامك ومشاريعك"}),u.jsxs("button",{className:"btn btn-primary",children:[u.jsx(bt,{size:18}),u.jsx("span",{children:"إنشاء لوحة جديدة"})]})]}):u.jsxs("div",{className:"boards-grid",children:[r.map(s=>u.jsxs("div",{className:"board-card",onClick:()=>e(`/board/${s.id}`),style:{"--board-color":s.color},children:[u.jsxs("div",{className:"board-card-header",children:[u.jsx("div",{className:"board-icon",style:{backgroundColor:`${s.color}20`},children:u.jsx("span",{style:{fontSize:"24px"},children:s.icon})}),u.jsx("button",{className:"icon-button",onClick:i=>{i.stopPropagation(),alert("خيارات اللوحة - قريباً!")},children:u.jsx(Y_,{size:18})})]}),u.jsx("div",{className:"board-card-content",children:u.jsx("h3",{children:s.name})}),u.jsxs("div",{className:"board-card-footer",children:[u.jsxs("div",{className:"board-stat",children:[u.jsx(Kn,{size:14}),u.jsxs("span",{children:[s.tasks," مهمة"]})]}),u.jsx("div",{className:"board-color-indicator",style:{backgroundColor:s.color}})]})]},s.id)),u.jsx("div",{className:"board-card create-board-card",onClick:()=>alert("إنشاء لوحة جديدة - قريباً!"),children:u.jsxs("div",{className:"create-board-content",children:[u.jsx("div",{className:"create-icon",children:u.jsx(bt,{size:32})}),u.jsx("h3",{children:"لوحة جديدة"}),u.jsx("p",{children:"أنشئ لوحة جديدة لمشروع أو فريق"})]})})]})]})]}):u.jsx("div",{className:"workspace-view-page",children:u.jsxs("div",{className:"empty-state",children:[u.jsx("h2",{children:"مساحة العمل غير موجودة"}),u.jsx("p",{children:"لم نتمكن من العثور على مساحة العمل المطلوبة"}),u.jsx("button",{className:"btn btn-primary",onClick:()=>e("/workspaces"),children:"العودة لمساحات العمل"})]})})}function jF({task:t,board:e,onClose:n,onUpdate:r}){var _;const[s,i]=b.useState(t.name),[o,a]=b.useState(t.subtasks||[]),[c,h]=b.useState(!1),[d,p]=b.useState({name:"",person:"",status:"جديد",date:""}),m=()=>{if(!d.name.trim())return;const E={id:Date.now().toString(),name:d.name,person:d.person,status:d.status,date:d.date,subtasks:[]};a([...o,E]),p({name:"",person:"",status:"جديد",date:""}),h(!1)},w=E=>{const j=z=>z.filter(W=>W.id===E?!1:(W.subtasks&&(W.subtasks=j(W.subtasks)),!0));a(j(o))},N=E=>{const j=z=>z.map(W=>W.id===E?{...W,subtasks:[...W.subtasks||[],{id:Date.now().toString(),name:"مهمة فرعية جديدة",person:"",status:"جديد",date:"",subtasks:[]}]}:W.subtasks?{...W,subtasks:j(W.subtasks)}:W);a(j(o))},R=()=>{r({...t,name:s,subtasks:o}),n()},D=E=>{const j=(E==null?void 0:E.toLowerCase())||"";return j.includes("مكتمل")||j.includes("done")?"#00CA72":j.includes("قيد")||j.includes("working")?"#FDAB3D":j.includes("معلق")||j.includes("stuck")?"#E44258":"#0073EA"},x=(E,j=0)=>E.map(z=>{var W;return u.jsxs("div",{className:"subtask-row",style:{marginRight:j*24+"px"},children:[u.jsxs("div",{className:"subtask-main",children:[u.jsxs("div",{className:"subtask-left",children:[u.jsx("div",{className:"task-check"}),u.jsx("input",{type:"text",value:z.name,onChange:T=>{const v=I=>I.map(C=>C.id===z.id?{...C,name:T.target.value}:C.subtasks?{...C,subtasks:v(C.subtasks)}:C);a(v(o))},className:"subtask-name-input"})]}),u.jsxs("div",{className:"subtask-right",children:[u.jsx("div",{className:"subtask-field person-field",children:z.person?u.jsxs("div",{className:"person-pill-small",children:[u.jsx("div",{className:"person-avatar-small",children:z.person[0]}),u.jsx("span",{children:z.person})]}):u.jsx("button",{className:"field-btn",onClick:()=>{const T=prompt("أدخل اسم المسؤول:");if(T){const v=I=>I.map(C=>C.id===z.id?{...C,person:T}:C.subtasks?{...C,subtasks:v(C.subtasks)}:C);a(v(o))}},children:u.jsx(dc,{size:14})})}),u.jsx("div",{className:"subtask-field status-field",children:u.jsx("div",{className:"status-pill-small",style:{backgroundColor:D(z.status)},children:z.status||"جديد"})}),u.jsx("div",{className:"subtask-field date-field",children:z.date?u.jsx("span",{className:"date-text",children:z.date}):u.jsx("button",{className:"field-btn",onClick:()=>{const T=prompt("أدخل التاريخ:");if(T){const v=I=>I.map(C=>C.id===z.id?{...C,date:T}:C.subtasks?{...C,subtasks:v(C.subtasks)}:C);a(v(o))}},children:u.jsx(mg,{size:14})})}),u.jsx("button",{className:"add-nested-btn",onClick:()=>N(z.id),title:"إضافة مهمة فرعية",children:u.jsx(bt,{size:14})}),u.jsx("button",{className:"delete-subtask-btn",onClick:()=>w(z.id),children:u.jsx(J_,{size:14})})]})]}),((W=z.subtasks)==null?void 0:W.length)>0&&u.jsx("div",{className:"nested-subtasks",children:x(z.subtasks,j+1)})]},z.id)});return u.jsx("div",{className:"modal-overlay",onClick:n,children:u.jsxs("div",{className:"task-modal",onClick:E=>E.stopPropagation(),children:[u.jsxs("div",{className:"modal-header",children:[u.jsxs("div",{className:"header-left",children:[u.jsx("div",{className:"task-check-large"}),u.jsx("input",{type:"text",value:s,onChange:E=>i(E.target.value),className:"task-name-input",placeholder:"اسم المهمة..."})]}),u.jsx("button",{className:"close-btn",onClick:n,children:u.jsx(xr,{size:20})})]}),u.jsxs("div",{className:"modal-body",children:[u.jsxs("div",{className:"task-info-section",children:[u.jsxs("div",{className:"info-row",children:[u.jsx("div",{className:"info-label",children:"المجموعة"}),u.jsx("div",{className:"info-value",children:((_=t.group)==null?void 0:_.title)||"غير محدد"})]}),(()=>{const E=t.column_values.find(j=>j.type==="person"||j.type==="people"||j.type==="multiple-person");if(E&&E.text)return u.jsxs("div",{className:"info-row",children:[u.jsx("div",{className:"info-label",children:"المنشئ/المسؤول"}),u.jsx("div",{className:"info-value",children:u.jsxs("div",{className:"creator-info",children:[u.jsx("div",{className:"creator-avatar",children:E.text[0]}),u.jsx("span",{children:E.text})]})})]})})(),t.column_values.filter(E=>E.text&&E.type!=="name"&&E.type!=="person"&&E.type!=="people"&&E.type!=="multiple-person").slice(0,3).map(E=>u.jsxs("div",{className:"info-row",children:[u.jsx("div",{className:"info-label",children:E.id}),u.jsx("div",{className:"info-value",children:E.text})]},E.id))]}),u.jsxs("div",{className:"subtasks-section",children:[u.jsxs("div",{className:"section-header",children:[u.jsxs("h3",{children:["المهام الفرعية (",o.length,")"]}),!c&&u.jsxs("button",{className:"add-main-subtask-btn",onClick:()=>h(!0),children:[u.jsx(bt,{size:16}),u.jsx("span",{children:"إضافة مهمة فرعية"})]})]}),c&&u.jsxs("div",{className:"new-subtask-form",children:[u.jsxs("div",{className:"form-row",children:[u.jsx("div",{className:"task-check"}),u.jsx("input",{type:"text",placeholder:"اسم المهمة الفرعية...",value:d.name,onChange:E=>p({...d,name:E.target.value}),className:"form-input",autoFocus:!0})]}),u.jsxs("div",{className:"form-row",children:[u.jsxs("div",{className:"form-field",children:[u.jsx(dc,{size:14}),u.jsx("input",{type:"text",placeholder:"المسؤول",value:d.person,onChange:E=>p({...d,person:E.target.value}),className:"form-input-small"})]}),u.jsx("div",{className:"form-field",children:u.jsxs("select",{value:d.status,onChange:E=>p({...d,status:E.target.value}),className:"form-select",children:[u.jsx("option",{value:"جديد",children:"جديد"}),u.jsx("option",{value:"قيد العمل",children:"قيد العمل"}),u.jsx("option",{value:"مكتمل",children:"مكتمل"}),u.jsx("option",{value:"معلق",children:"معلق"})]})}),u.jsxs("div",{className:"form-field",children:[u.jsx(mg,{size:14}),u.jsx("input",{type:"date",value:d.date,onChange:E=>p({...d,date:E.target.value}),className:"form-input-small"})]})]}),u.jsxs("div",{className:"form-actions",children:[u.jsx("button",{className:"btn-cancel",onClick:()=>h(!1),children:"إلغاء"}),u.jsx("button",{className:"btn-add",onClick:m,children:"إضافة"})]})]}),u.jsx("div",{className:"subtasks-list",children:o.length===0?u.jsxs("div",{className:"empty-state",children:[u.jsx("p",{children:"لا توجد مهام فرعية"}),u.jsx("p",{className:"empty-hint",children:'انقر على "إضافة مهمة فرعية" للبدء'})]}):x(o)})]})]}),u.jsxs("div",{className:"modal-footer",children:[u.jsx("button",{className:"btn-secondary",onClick:n,children:"إغلاق"}),u.jsx("button",{className:"btn-primary",onClick:R,children:"حفظ التغييرات"})]})]})})}function MF(t,e,n,r="#0073EA"){if(!t||!e||!n)return console.warn("Missing required presence parameters"),null;const s=vk(wk,`presence/${n}/${t}`),i={userId:t,userName:e,color:r,lastSeen:Cp(),status:"online"};Ip(s,i),$3(s).set({...i,status:"offline",lastSeen:Cp()});const o=setInterval(()=>{Ip(s,i).catch(a=>{console.error("Failed to update presence:",a)})},3e4);return()=>{clearInterval(o),Ip(s,{...i,status:"offline",lastSeen:Cp()})}}function OF(t,e){if(!t)return console.warn("Missing boardId for presence subscription"),()=>{};const n=vk(wk,`presence/${t}`);return q3(n,s=>{const i=s.val();if(!i){e([]);return}const o=Object.values(i).filter(a=>a.status==="online").sort((a,c)=>(c.lastSeen||0)-(a.lastSeen||0));e(o)},s=>{console.error("Presence subscription error:",s),e([])})}function LF(){const t=["#0073EA","#00C875","#E44258","#FDAB3D","#7F5AF0","#FF6B9D","#00D9FF","#FFB800","#784BD1","#2ECC71"];return t[Math.floor(Math.random()*t.length)]}function VF(t){if(!t)return"?";const e=t.trim().split(" ");return e.length===1?e[0][0].toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase()}async function uT(t,e,n,r,s){try{const i=pa(wn,"boards",t,"items",e,"updates"),o={text:n.trim(),authorId:r,authorName:s,timestamp:Ti(),createdAt:new Date().toISOString()};return await lS(i,o),{success:!0}}catch(i){return console.error("Error adding update:",i),{success:!1,error:i.message}}}function FF(t,e,n){try{const r=pa(wn,"boards",t,"items",e,"updates"),s=o_(r,c_("timestamp","asc"));return d_(s,i=>{const o=[];i.forEach(a=>{var h,d;const c=a.data();o.push({id:a.id,author:c.authorName,authorId:c.authorId,text:c.text,time:UF(((h=c.timestamp)==null?void 0:h.toDate())||new Date(c.createdAt)),timestamp:((d=c.timestamp)==null?void 0:d.toDate())||new Date(c.createdAt)})}),n(o)},i=>{console.error("Error subscribing to updates:",i),n([])})}catch(r){return console.error("Error setting up updates subscription:",r),()=>{}}}function UF(t){if(!t)return"";const n=new Date-t,r=Math.floor(n/6e4),s=Math.floor(n/36e5),i=Math.floor(n/864e5);return r<1?"الآن":r<60?`منذ ${r} دقيقة`:s<24?`منذ ${s} ساعة`:i<7?`منذ ${i} يوم`:t.toLocaleDateString("ar-EG",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function zF(t,e,n){const r=[],s={};return e.forEach(i=>{const o=pa(wn,"boards",t,"items",i,"updates"),a=d_(o,c=>{s[i]=c.size,n({...s})});r.push(a)}),()=>{r.forEach(i=>i())}}async function BF(t){try{const e=pa(wn,"users"),n=o_(e,_0("companyCode","==",t),_0("isActive","==",!0),c_("displayName","asc")),r=await OL(n),s=[];return r.forEach(i=>{const o=i.data();s.push({uid:o.uid,displayName:o.displayName,email:o.email,role:o.role,avatar:o.avatar})}),{success:!0,users:s}}catch(e){return console.error("Error getting company users:",e),{success:!1,error:e.message,users:[]}}}function $F(t){return t?t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2):"؟"}const Ze={TASK_CREATED:"task_created",TASK_DELETED:"task_deleted",TASK_UPDATED:"task_updated",TASK_MOVED:"task_moved",COLUMN_UPDATED:"column_updated",UPDATE_POSTED:"update_posted",USER_MENTIONED:"user_mentioned",SUBTASK_CREATED:"subtask_created",SUBTASK_DELETED:"subtask_deleted"};async function hT(t,e,n,r,s={}){try{const i=pa(wn,"boards",t,"activity"),o={type:e,userId:n,userName:r,details:s,timestamp:Ti(),createdAt:new Date().toISOString()};return await lS(i,o),{success:!0}}catch(i){return console.error("Error logging activity:",i),{success:!1,error:i.message}}}function WF(t,e=50,n){try{const r=pa(wn,"boards",t,"activity"),s=o_(r,c_("timestamp","desc"),DL(e));return d_(s,i=>{const o=[];i.forEach(a=>{var h,d;const c=a.data();o.push({id:a.id,type:c.type,userId:c.userId,userName:c.userName,details:c.details,time:qF(((h=c.timestamp)==null?void 0:h.toDate())||new Date(c.createdAt)),timestamp:((d=c.timestamp)==null?void 0:d.toDate())||new Date(c.createdAt)})}),n(o)},i=>{console.error("Error subscribing to activity log:",i),n([])})}catch(r){return console.error("Error setting up activity log subscription:",r),()=>{}}}function qF(t){if(!t)return"";const n=new Date-t,r=Math.floor(n/6e4),s=Math.floor(n/36e5),i=Math.floor(n/864e5);return r<1?"الآن":r<60?`منذ ${r} دقيقة`:s<24?`منذ ${s} ساعة`:i<7?`منذ ${i} يوم`:t.toLocaleDateString("ar-EG",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function HF(t){const{type:e,details:n}=t;switch(e){case Ze.TASK_CREATED:return`أنشأ مهمة "${n.taskName}"`;case Ze.TASK_DELETED:return`حذف مهمة "${n.taskName}"`;case Ze.TASK_UPDATED:return`حدّث مهمة "${n.taskName}"`;case Ze.TASK_MOVED:return`نقل مهمة "${n.taskName}" من "${n.fromGroup}" إلى "${n.toGroup}"`;case Ze.COLUMN_UPDATED:return`غيّر ${n.columnName} في "${n.taskName}"`;case Ze.UPDATE_POSTED:return`نشر تحديثاً على "${n.taskName}"`;case Ze.USER_MENTIONED:return`ذكر ${n.mentionedUser} في تحديث`;case Ze.SUBTASK_CREATED:return`أضاف مهمة فرعية "${n.subtaskName}" إلى "${n.taskName}"`;case Ze.SUBTASK_DELETED:return`حذف مهمة فرعية "${n.subtaskName}" من "${n.taskName}"`;default:return"نشاط غير معروف"}}function GF(t){switch(t){case Ze.TASK_CREATED:return"➕";case Ze.TASK_DELETED:return"🗑️";case Ze.TASK_UPDATED:return"✏️";case Ze.TASK_MOVED:return"↔️";case Ze.COLUMN_UPDATED:return"🔄";case Ze.UPDATE_POSTED:return"💬";case Ze.USER_MENTIONED:return"@";case Ze.SUBTASK_CREATED:return"➕";case Ze.SUBTASK_DELETED:return"🗑️";default:return"📝"}}function KF({users:t,searchTerm:e,onSelect:n,position:r}){const[s,i]=b.useState(0),o=b.useRef(null),a=t.filter(c=>c.displayName.toLowerCase().includes(e.toLowerCase()));return b.useEffect(()=>{i(0)},[e]),b.useEffect(()=>{const c=h=>{h.key==="ArrowDown"?(h.preventDefault(),i(d=>d<a.length-1?d+1:d)):h.key==="ArrowUp"?(h.preventDefault(),i(d=>d>0?d-1:0)):(h.key==="Enter"||h.key==="Tab")&&(h.preventDefault(),a[s]&&n(a[s]))};return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)},[s,a,n]),b.useEffect(()=>{if(o.current){const c=o.current.children[s];c&&c.scrollIntoView({block:"nearest",behavior:"smooth"})}},[s]),a.length===0?u.jsx("div",{className:"mention-dropdown",style:r,children:u.jsx("div",{className:"mention-dropdown-empty",children:"لا توجد نتائج"})}):u.jsx("div",{className:"mention-dropdown",style:r,ref:o,children:a.map((c,h)=>u.jsxs("div",{className:`mention-dropdown-item ${h===s?"selected":""}`,onClick:()=>n(c),onMouseEnter:()=>i(h),children:[u.jsx("div",{className:"mention-user-avatar",children:$F(c.displayName)}),u.jsxs("div",{className:"mention-user-info",children:[u.jsx("div",{className:"mention-user-name",children:c.displayName}),u.jsx("div",{className:"mention-user-role",children:QF(c.role)})]})]},c.uid))})}function QF(t){return{admin:"مسؤول",manager:"مدير",employee:"موظف"}[t]||"موظف"}function YF({boardId:t,isOpen:e,onClose:n}){const[r,s]=b.useState([]),[i,o]=b.useState("all"),[a,c]=b.useState(!0);b.useEffect(()=>{if(!t||!e){s([]),c(!0);return}c(!0);const d=WF(t,100,p=>{s(p),c(!1)});return()=>{d&&d()}},[t,e]);const h=i==="all"?r:r.filter(d=>d.type===i);return e?u.jsx("div",{className:"activity-log-overlay",onClick:n,children:u.jsxs("div",{className:"activity-log-panel",onClick:d=>d.stopPropagation(),children:[u.jsxs("div",{className:"activity-log-header",children:[u.jsxs("div",{className:"activity-log-title",children:[u.jsx(dd,{size:20}),u.jsx("h3",{children:"سجل النشاطات"})]}),u.jsxs("div",{className:"activity-log-actions",children:[u.jsx("button",{className:"filter-btn",title:"تصفية",children:u.jsx(gF,{size:18})}),u.jsx("button",{className:"close-btn",onClick:n,children:u.jsx(xr,{size:20})})]})]}),u.jsx("div",{className:"activity-log-body",children:a?u.jsxs("div",{className:"activity-log-loading",children:[u.jsx("div",{className:"loading-spinner"}),u.jsx("p",{children:"جاري تحميل النشاطات..."})]}):h.length===0?u.jsxs("div",{className:"activity-log-empty",children:[u.jsx(dd,{size:48,style:{opacity:.3}}),u.jsx("p",{children:"لا توجد نشاطات بعد"}),u.jsx("p",{style:{fontSize:"13px",marginTop:"8px"},children:"سيتم تسجيل جميع التغييرات هنا"})]}):u.jsx("div",{className:"activity-log-list",children:h.map((d,p)=>u.jsxs("div",{className:"activity-item",children:[u.jsx("div",{className:"activity-icon",children:GF(d.type)}),u.jsxs("div",{className:"activity-content",children:[u.jsxs("div",{className:"activity-description",children:[u.jsx("strong",{children:d.userName})," ",HF(d)]}),u.jsx("div",{className:"activity-time",children:d.time})]})]},d.id||p))})})]})}):null}const XF="eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I",JF="https://api.monday.com/v2";async function ZF(t){var s,i,o;const r=await(await fetch(JF,{method:"POST",headers:{"Content-Type":"application/json",Authorization:XF},body:JSON.stringify({query:`
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
        name
        columns {
          id
          title
          type
          settings_str
        }
        groups {
          id
          title
          color
        }
        items_page(limit: 500) {
          items {
            id
            name
            group {
              id
            }
            creator {
              id
              name
            }
            created_at
            column_values {
              id
              text
              type
              value
            }
          }
        }
      }
    }
  `,variables:{boardId:String(t)}})})).json();if(r.errors)throw new Error(((s=r.errors[0])==null?void 0:s.message)||"فشل تحميل البيانات");if(!((o=(i=r.data)==null?void 0:i.boards)!=null&&o[0]))throw new Error("البورد غير موجود");return r.data.boards[0]}function e6(){const{id:t}=Px(),{currentUser:e,userData:n}=wf(),[r,s]=b.useState(null),[i,o]=b.useState(!0),[a,c]=b.useState(null),[h,d]=b.useState(null),[p,m]=b.useState(["person","status","date"]),[w,N]=b.useState(null),[R,D]=b.useState(!1),[x,_]=b.useState(null),[E,j]=b.useState({}),[z,W]=b.useState({}),[T,v]=b.useState(()=>{const k=localStorage.getItem("darkMode");return k?JSON.parse(k):!1}),[I,C]=b.useState({}),[A,P]=b.useState(null),[S,Ge]=b.useState(null),[Ct,Vn]=b.useState(null),[Wr,Q]=b.useState({}),[ne,ue]=b.useState({task:400}),[Te,Le]=b.useState(null),[Fn,$t]=b.useState(0),[Un,en]=b.useState(0),[fn,Js]=b.useState(null),[Hi,Gi]=b.useState(""),[ev,Ef]=b.useState(null),[Ki,_a]=b.useState(null),[xn,qr]=b.useState(null),[Oc,Lc]=b.useState({}),[Ke,yt]=b.useState({}),[ar,Vc]=b.useState([]),[lr,cr]=b.useState(null),[tn,Fc]=b.useState([]),[Uc,va]=b.useState([]),[zc,ur]=b.useState(!1),[Bc,wa]=b.useState(""),[Hr,Ea]=b.useState(0),Zs=b.useRef(null),[hr,Ta]=b.useState(!1);b.useEffect(()=>{async function k(){try{o(!0),c(null);const L=await ZF(t);s(L)}catch(L){c(L.message||"حدث خطأ")}finally{o(!1)}}k()},[t]),b.useEffect(()=>{if(r!=null&&r.columns){const k={task:400};r.columns.forEach(L=>{switch(L.type){case"people":case"person":k[L.id]=200;break;case"status":case"color":k[L.id]=150;break;case"date":case"timeline":k[L.id]=150;break;case"link":case"url":k[L.id]=250;break;case"text":case"long_text":k[L.id]=200;break;case"numbers":case"numeric":k[L.id]=120;break;case"checkbox":k[L.id]=80;break;case"dropdown":k[L.id]=150;break;case"tags":k[L.id]=180;break;default:k[L.id]=150}}),k.updates=80,ue(k)}},[r==null?void 0:r.columns]),b.useEffect(()=>{localStorage.setItem("darkMode",JSON.stringify(T)),T?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")},[T]),b.useEffect(()=>{if(r&&Object.keys(Wr).length===0){const k={};r.groups.forEach(L=>{const B=r.items_page.items.filter(O=>{var q;return(((q=O.group)==null?void 0:q.id)||"other")===L.id}).map(O=>O.id);B.length>0&&(k[L.id]=B)}),Q(k)}},[r]),b.useEffect(()=>{if(!t||!e||!n)return;const k=e.uid,L=n.displayName||"موظف";let B=localStorage.getItem("sunday_user_color");B||(B=LF(),localStorage.setItem("sunday_user_color",B));const O=MF(k,L,t,B),q=OF(t,J=>{const ee=J.filter(re=>re.userId!==k);Fc(ee)});return()=>{O&&O(),q&&q()}},[t,e,n]),b.useEffect(()=>{if(!r||!t)return;const k=r.items_page.items.map(B=>B.id);if(k.length===0)return;const L=zF(t,k,B=>{yt(B)});return()=>{L&&L()}},[r,t]),b.useEffect(()=>{if(!xn||!t){Vc([]);return}const k=FF(t,xn,L=>{Vc(L),Lc(B=>({...B,[xn]:L}))});return()=>{k&&k()}},[xn,t]),b.useEffect(()=>{n!=null&&n.companyCode&&BF(n.companyCode).then(k=>{k.success&&va(k.users)})},[n]);const Qi=()=>{v(!T)},xa=async(k,L)=>{try{await navigator.clipboard.writeText(k),_a(L),setTimeout(()=>_a(null),2e3)}catch(B){console.error("فشل نسخ الرابط:",B)}},ei=k=>{const L=k.target.value,B=k.target.selectionStart,O=L.substring(0,B),q=O.lastIndexOf("@");if(q!==-1){const J=O.substring(q+1);J.includes(" ")?ur(!1):(ur(!0),wa(J),Ea(q))}else ur(!1)},$c=k=>{if(!Zs.current)return;const L=Zs.current,B=L.value,O=`@${k.displayName} `,q=B.substring(0,Hr),J=B.substring(L.selectionStart),ee=q+O+J;L.value=ee;const re=Hr+O.length;L.setSelectionRange(re,re),L.focus(),ur(!1),wa("")},_t=k=>{const L=/@(\w+(?:\s+\w+)*)/g,B=[];let O=0,q;for(;(q=L.exec(k))!==null;)q.index>O&&B.push(k.substring(O,q.index)),B.push(u.jsxs("span",{className:"mention",children:["@",q[1]]},q.index)),O=q.index+q[0].length;return O<k.length&&B.push(k.substring(O)),B.length>0?B:k},Wc=k=>{C(L=>({...L,[k]:!L[k]}))},ti=(k,L,B,O)=>{P({task:L,groupId:B,taskIndex:O}),k.dataTransfer.effectAllowed="move",k.target.style.opacity="0.4"},ni=k=>{k.target.style.opacity="1",P(null),Ge(null),Vn(null)},Tf=(k,L)=>{k.preventDefault(),k.dataTransfer.dropEffect="move",Ge(L)},xf=(k,L,B,O)=>{if(k.preventDefault(),k.stopPropagation(),!!A){if(A.task.id===L){Vn(null);return}Vn({taskId:L,groupId:B,taskIndex:O}),k.dataTransfer.dropEffect="move"}},Gr=(k,L)=>{if(k.preventDefault(),!A)return;const{task:B,groupId:O,taskIndex:q}=A;if(Ct&&Ct.groupId===L){const J=Ct.taskIndex;O===L&&q!==J?(Q(ee=>{const de=[...ee[O]||[]];return de.splice(q,1),de.splice(J,0,B.id),{...ee,[O]:de}}),console.log(`Reordering "${B.name}" from position ${q} to ${J}`)):O!==L&&(Q(ee=>{const re=(ee[O]||[]).filter(Ot=>Ot!==B.id),ct=[...ee[L]||[]];return ct.splice(J,0,B.id),{...ee,[O]:re,[L]:ct}}),s(ee=>{const re=ee.items_page.items.map(de=>de.id===B.id?{...de,group:{id:L}}:de);return{...ee,items_page:{items:re}}}),console.log(`Moving "${B.name}" from ${O} to ${L} at position ${J}`))}else O!==L&&(Q(J=>{const ee=(J[O]||[]).filter(de=>de!==B.id),re=[...J[L]||[],B.id];return{...J,[O]:ee,[L]:re}}),s(J=>{const ee=J.items_page.items.map(re=>re.id===B.id?{...re,group:{id:L}}:re);return{...J,items_page:{items:ee}}}),console.log(`Moving task "${B.name}" from ${O} to ${L}`));P(null),Ge(null),Vn(null)},Ia=(k,L)=>{k.preventDefault(),k.stopPropagation(),Le(L),$t(k.clientX),en(ne[L])},qc=k=>{if(!Te)return;const L=Fn-k.clientX,B=Math.max(100,Un+L);ue(O=>({...O,[Te]:B}))},ri=()=>{Le(null)};b.useEffect(()=>{if(Te)return document.addEventListener("mousemove",qc),document.addEventListener("mouseup",ri),document.body.style.cursor="col-resize",document.body.style.userSelect="none",()=>{document.removeEventListener("mousemove",qc),document.removeEventListener("mouseup",ri),document.body.style.cursor="",document.body.style.userSelect=""}},[Te,Fn,Un,ne]),b.useEffect(()=>{const k=L=>{fn&&!L.target.closest(".person-cell-wrapper")&&(Js(null),Gi(""))};return document.addEventListener("click",k),()=>document.removeEventListener("click",k)},[fn]);const Hc=k=>{d(k)},Gc=k=>{const L=r.items_page.items.map(B=>B.id===k.id?k:B);s({...r,items_page:{items:L}})},Ca=k=>{j(L=>({...L,[k]:!L[k]}))},Kr=(k,L=null)=>{const B={id:Date.now().toString(),name:"",person:"",status:"جديد",date:"",subtasks:[],isNew:!0};L?(W(O=>{const q=J=>J.map(ee=>ee.id===L?{...ee,subtasks:[...ee.subtasks||[],B]}:ee.subtasks?{...ee,subtasks:q(ee.subtasks)}:ee);return{...O,[k]:q(O[k]||[])}}),j(O=>({...O,[`${k}-${L}`]:!0}))):(W(O=>({...O,[k]:[...O[k]||[],B]})),j(O=>({...O,[k]:!0})))},Sa=(k,L,B,O)=>{W(q=>{const J=ee=>ee.map(re=>re.id===L?{...re,[B]:O,isNew:!1}:re.subtasks?{...re,subtasks:J(re.subtasks)}:re);return{...q,[k]:J(q[k]||[])}})},zn=(k,L)=>{W(B=>{const O=q=>q.filter(J=>J.id===L?!1:(J.subtasks&&(J.subtasks=O(J.subtasks)),!0));return{...B,[k]:O(B[k]||[])}})},Kc=(k,L)=>{const B=`${k}-${L}`;j(O=>({...O,[B]:!O[B]}))},Qc=[{type:"text",label:"نص",icon:"📝"},{type:"person",label:"شخص",icon:"👤"},{type:"status",label:"حالة",icon:"🎯"},{type:"date",label:"تاريخ",icon:"📅"},{type:"timeline",label:"جدول زمني",icon:"📊"},{type:"numbers",label:"أرقام",icon:"🔢"},{type:"email",label:"بريد إلكتروني",icon:"✉️"},{type:"phone",label:"هاتف",icon:"📞"},{type:"link",label:"رابط",icon:"🔗"},{type:"dropdown",label:"قائمة منسدلة",icon:"📋"},{type:"checkbox",label:"مربع اختيار",icon:"☑️"},{type:"file",label:"ملف",icon:"📎"},{type:"location",label:"موقع",icon:"📍"},{type:"rating",label:"تقييم",icon:"⭐"},{type:"progress",label:"تقدم",icon:"📈"}];if(i)return u.jsxs("div",{className:"board-loading",children:[u.jsx(nh,{size:48,className:"spin"}),u.jsx("p",{children:"جاري التحميل..."})]});if(a)return u.jsxs("div",{className:"board-error",children:[u.jsx("h2",{children:"❌ خطأ"}),u.jsx("p",{children:a}),u.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"إعادة المحاولة"})]});if(!r)return null;const Qr={};r.items_page.items.forEach(k=>{var B;const L=((B=k.group)==null?void 0:B.id)||"other";Qr[L]||(Qr[L]=[]),Qr[L].push(k)});const ka=k=>{const L=Qr[k]||[],B=Wr[k];if(!B||B.length===0)return L;const O={};L.forEach(J=>{O[J.id]=J});const q=[];return B.forEach(J=>{O[J]&&(q.push(O[J]),delete O[J])}),Object.values(O).forEach(J=>{q.push(J)}),q},Na=k=>{if(!k)return"#C4C4C4";const L=k.toLowerCase();return L.includes("done")||L.includes("مكتمل")?"#00CA72":L.includes("working")||L.includes("قيد")?"#FDAB3D":L.includes("stuck")||L.includes("معلق")?"#E44258":"#0073EA"},If=(k,L)=>{const B=k.column_values.find(O=>O.id===L);return(B==null?void 0:B.text)||""},Yc=(k,L,B,O)=>{let q="";k.type==="people"||k.type==="person"||k.type==="multiple-person"?q=L.person||"":k.type==="status"||k.type==="color"?q=L.status||"":k.type==="date"||k.type==="timeline"?q=L.date||"":k.type==="link"||k.type==="url"?q=L.link||"":q=L[k.id]||"";const J=`${B}-${L.id}`;switch(k.type){case"people":case"person":case"multiple-person":return Yr(J,q,ee=>{O("person",ee)});case"status":case"color":return u.jsxs("select",{className:"subtask-select-inline",value:q||"جديد",onChange:ee=>O("status",ee.target.value),style:{backgroundColor:Na(q||"جديد")},children:[u.jsx("option",{value:"جديد",children:"جديد"}),u.jsx("option",{value:"قيد العمل",children:"قيد العمل"}),u.jsx("option",{value:"مكتمل",children:"مكتمل"}),u.jsx("option",{value:"معلق",children:"معلق"})]});case"date":case"timeline":return u.jsx("input",{type:"date",className:"subtask-input-inline",value:q||"",onChange:ee=>O("date",ee.target.value)});case"link":case"url":return u.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center",width:"100%"},children:[u.jsx("input",{type:"url",className:"subtask-input-inline",value:q||"",onChange:ee=>O("link",ee.target.value),placeholder:"رابط...",style:{flex:1,minWidth:0}}),q&&u.jsxs(u.Fragment,{children:[u.jsx("button",{onClick:()=>xa(q,J),className:"link-icon-btn",title:"نسخ الرابط",style:{flexShrink:0},children:Ki===J?u.jsx(iT,{size:12}):u.jsx(oT,{size:12})}),u.jsx("a",{href:q,target:"_blank",rel:"noopener noreferrer",className:"link-icon-btn",title:"فتح الرابط",style:{flexShrink:0},children:u.jsx(kp,{size:12})})]})]});case"text":case"long_text":return u.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"center",justifyContent:"center"},children:u.jsxs("button",{onClick:()=>cr({itemId:J,columnId:k.id,columnTitle:k.title,value:q,isSubtask:!0,taskId:B,subtaskId:L.id,onUpdate:ee=>{Sa(B,L.id,k.id,ee)}}),className:"text-icon-btn text-icon-btn-small",title:q?`${k.title}: ${q.substring(0,50)}...`:`إضافة ${k.title}`,style:{position:"relative"},children:[u.jsx(pd,{size:14}),q&&u.jsx("span",{className:"text-has-content-indicator text-has-content-indicator-small"})]})});default:return u.jsx("div",{className:"subtask-input-inline",style:{opacity:.6},children:q||"-"})}},Cf=(k,L,B)=>{const O=If(L,k.id);switch(k.type){case"people":case"person":case"multiple-person":return Yr(L.id,O,q=>{B(k.id,q,k.type)});case"status":case"color":return u.jsxs("select",{className:"subtask-select-inline",value:O||"جديد",onChange:q=>B(k.id,q.target.value,k.type),style:{backgroundColor:Na(O||"جديد")},children:[u.jsx("option",{value:"جديد",children:"جديد"}),u.jsx("option",{value:"قيد العمل",children:"قيد العمل"}),u.jsx("option",{value:"مكتمل",children:"مكتمل"}),u.jsx("option",{value:"معلق",children:"معلق"})]});case"date":case"timeline":return u.jsx("input",{type:"date",className:"subtask-input-inline",value:O||"",onChange:q=>B(k.id,q.target.value,k.type)});case"link":case"url":return u.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center",width:"100%"},children:[u.jsx("input",{type:"url",className:"subtask-input-inline",value:O||"",onChange:q=>B(k.id,q.target.value,k.type),placeholder:"رابط...",style:{flex:1,minWidth:0}}),O&&u.jsxs(u.Fragment,{children:[u.jsx("button",{onClick:()=>xa(O,L.id),className:"link-icon-btn",title:"نسخ الرابط",children:Ki===L.id?u.jsx(iT,{size:14}):u.jsx(oT,{size:14})}),u.jsx("a",{href:O,target:"_blank",rel:"noopener noreferrer",className:"link-icon-btn",title:"فتح الرابط",children:u.jsx(kp,{size:14})})]})]});case"text":case"long_text":return u.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"center",justifyContent:"center"},children:u.jsxs("button",{onClick:()=>cr({itemId:L.id,columnId:k.id,columnTitle:k.title,value:O,isSubtask:!1,onUpdate:q=>B(k.id,q,k.type)}),className:"text-icon-btn",title:O?`${k.title}: ${O.substring(0,50)}...`:`إضافة ${k.title}`,style:{position:"relative"},children:[u.jsx(pd,{size:16}),O&&u.jsx("span",{className:"text-has-content-indicator"})]})});case"numbers":case"numeric":return u.jsx("input",{type:"number",className:"subtask-input-inline",value:O||"",onChange:q=>B(k.id,q.target.value,k.type),placeholder:"0"});case"checkbox":return u.jsx("input",{type:"checkbox",checked:O==="true"||O===!0,onChange:q=>B(k.id,q.target.checked.toString(),k.type),style:{width:"20px",height:"20px"}});case"dropdown":return u.jsxs("select",{className:"subtask-select-inline",value:O||"",onChange:q=>B(k.id,q.target.value,k.type),children:[u.jsx("option",{value:"",children:"اختر..."}),u.jsx("option",{value:"خيار 1",children:"خيار 1"}),u.jsx("option",{value:"خيار 2",children:"خيار 2"}),u.jsx("option",{value:"خيار 3",children:"خيار 3"})]});default:return u.jsx("div",{className:"subtask-input-inline",style:{opacity:.6},children:O||"-"})}},dr=k=>{if(!k)return"?";const L=k.trim().split(" ");return L.length===1?L[0][0].toUpperCase():(L[0][0]+L[L.length-1][0]).toUpperCase()},Xc=k=>Np.find(L=>L.name.toLowerCase()===(k==null?void 0:k.toLowerCase())),Aa=()=>{if(!Hi)return Np;const k=Hi.toLowerCase();return Np.filter(L=>{var B;return L.name.toLowerCase().includes(k)||L.email.toLowerCase().includes(k)||((B=L.title)==null?void 0:B.toLowerCase().includes(k))})},Yr=(k,L,B)=>{const O=`person-${k}`,q=fn===O,J=Xc(L),ee=Aa();return u.jsxs("div",{className:"person-cell-wrapper",children:[u.jsx("div",{className:`person-display ${L?"":"empty"}`,onClick:()=>{Js(q?null:O),Gi("")},children:J?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"person-avatar",children:dr(J.name)}),u.jsx("span",{className:"person-name",children:J.name})]}):L?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"person-avatar",children:dr(L)}),u.jsx("span",{className:"person-name",children:L})]}):u.jsxs(u.Fragment,{children:[u.jsx(dc,{size:16}),u.jsx("span",{children:"اختر مسؤول"})]})}),q&&u.jsxs("div",{className:"person-dropdown-menu",children:[u.jsx("div",{className:"person-dropdown-search",children:u.jsx("input",{type:"text",className:"person-search-input",placeholder:"ابحث عن موظف...",value:Hi,onChange:re=>Gi(re.target.value),autoFocus:!0,onClick:re=>re.stopPropagation()})}),u.jsx("div",{className:"person-dropdown-list",children:ee.length>0?ee.map(re=>u.jsxs("button",{className:`person-dropdown-item ${(J==null?void 0:J.id)===re.id?"selected":""}`,onClick:de=>{de.stopPropagation(),B(re.name),Js(null),Gi("")},children:[u.jsx("div",{className:"person-avatar",children:dr(re.name)}),u.jsxs("div",{className:"person-item-info",children:[u.jsx("div",{className:"person-item-name",children:re.name}),u.jsx("div",{className:"person-item-title",children:re.title||re.email})]})]},re.id)):u.jsx("div",{className:"person-dropdown-empty",children:"لا توجد نتائج"})})]})]})},fr=r!=null&&r.columns?`${ne.task}px ${r.columns.map(k=>`${ne[k.id]||150}px`).join(" ")} ${ne.updates}px`:"400px 200px 150px 150px 250px 80px",Yi=(k,L,B=0)=>L.map(O=>{const q=`${k}-${O.id}`,J=E[q],ee=O.subtasks&&O.subtasks.length>0;return u.jsxs(rh.Fragment,{children:[u.jsxs("div",{className:"subtask-row-inline",style:{"--indent-level":B},children:[u.jsxs("div",{className:"item-cell col-task",children:[u.jsx("div",{className:"subtask-indent",style:{width:`${B*30}px`}}),u.jsx("button",{className:"expand-arrow expand-arrow-small",onClick:re=>{re.stopPropagation(),Kc(k,O.id)},style:{opacity:ee||J?1:.3},children:u.jsx(fd,{size:12,className:J?"expanded":""})}),u.jsx("div",{className:"task-check-small"}),u.jsx("input",{type:"text",className:"subtask-name-inline-input",value:O.name,onChange:re=>Sa(k,O.id,"name",re.target.value),placeholder:"اسم المهمة الفرعية...",autoFocus:O.isNew}),u.jsx("button",{className:"add-subtask-inline-btn add-subtask-inline-btn-small",onClick:re=>{re.stopPropagation(),Kr(k,O.id)},title:"إضافة مهمة فرعية",children:u.jsx(bt,{size:12})}),u.jsx("button",{className:"delete-subtask-inline-btn",onClick:()=>zn(k,O.id),title:"حذف",children:u.jsx(J_,{size:14})})]}),r.columns.map(re=>u.jsx("div",{className:"item-cell",children:Yc(re,O,k,(de,ct)=>{Sa(k,O.id,de,ct)})},re.id)),u.jsx("div",{className:"item-cell col-updates",children:u.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"center",justifyContent:"center"},children:u.jsxs("button",{onClick:()=>qr(`${k}-${O.id}`),className:"updates-icon-btn updates-icon-btn-small",title:"التحديثات",style:{position:"relative"},children:[u.jsx(al,{size:14}),Ke[`${k}-${O.id}`]>0&&u.jsx("span",{className:"updates-badge updates-badge-small",children:Ke[`${k}-${O.id}`]})]})})})]}),J&&ee&&Yi(k,O.subtasks,B+1)]},O.id)});return u.jsxs("div",{className:"monday-board",children:[u.jsxs("div",{className:"board-top-bar",children:[u.jsxs("div",{className:"board-title-section",children:[u.jsx("h1",{children:r.name}),u.jsxs("div",{className:"board-meta",children:[u.jsxs("span",{children:[r.items_page.items.length," مهمة"]}),u.jsx("span",{children:"•"}),u.jsxs("span",{children:[r.groups.length," مجموعة"]}),tn.length>0&&u.jsxs(u.Fragment,{children:[u.jsx("span",{children:"•"}),u.jsxs("span",{children:[tn.length," موظف نشط"]})]})]})]}),tn.length>0&&u.jsxs("div",{className:"online-users-container",children:[tn.slice(0,5).map(k=>u.jsxs("div",{className:"online-user-avatar",style:{backgroundColor:k.color},title:k.userName,children:[VF(k.userName),u.jsx("span",{className:"online-indicator"})]},k.userId)),tn.length>5&&u.jsxs("div",{className:"online-user-avatar more-users",title:`+${tn.length-5} آخرين`,children:["+",tn.length-5]})]}),u.jsxs("div",{className:"board-actions",children:[u.jsxs("button",{className:"action-btn",onClick:()=>Ta(!0),title:"سجل النشاطات",children:[u.jsx(dd,{size:16}),u.jsx("span",{children:"سجل النشاطات"})]}),u.jsxs("button",{className:"action-btn",onClick:Qi,title:T?"الوضع النهاري":"الوضع الليلي",children:[T?u.jsx(CF,{size:16}):u.jsx(wF,{size:16}),u.jsx("span",{children:T?"وضع نهاري":"وضع ليلي"})]}),u.jsxs("a",{href:`https://monday.com/boards/${t}`,target:"_blank",rel:"noopener noreferrer",className:"action-btn",children:[u.jsx(kp,{size:16}),u.jsx("span",{children:"فتح في Monday"})]})]})]}),u.jsx("div",{className:"board-table-container",children:u.jsx("div",{className:"board-table",style:{"--grid-cols":fr},children:r.groups.map(k=>{const L=ka(k.id),B=I[k.id];return u.jsxs("div",{className:`table-group ${S===k.id?"drag-over":""}`,onDragOver:O=>Tf(O,k.id),onDrop:O=>Gr(O,k.id),children:[u.jsxs("div",{className:`group-row ${B?"collapsed":""}`,style:{borderLeftColor:k.color,borderLeftWidth:"4px",borderLeftStyle:"solid"},onClick:()=>Wc(k.id),children:[u.jsx("div",{className:"group-name",style:{backgroundColor:k.color?`${k.color}20`:"transparent",color:k.color||"inherit",padding:"6px 12px",borderRadius:"6px",fontWeight:"700",border:`2px solid ${k.color||"transparent"}`},children:k.title}),u.jsxs("div",{className:"group-count",children:[L.length," مهام"]})]}),!B&&u.jsxs("div",{className:"table-header-row",children:[u.jsxs("div",{className:"header-cell col-task",children:["المهمة",u.jsx("div",{className:`column-resize-handle ${Te==="task"?"resizing":""}`,onMouseDown:O=>Ia(O,"task")})]}),r.columns.map(O=>u.jsxs("div",{className:"header-cell",children:[O.title,u.jsx("div",{className:`column-resize-handle ${Te===O.id?"resizing":""}`,onMouseDown:q=>Ia(q,O.id)})]},O.id)),u.jsxs("div",{className:"header-cell",children:["التحديثات",u.jsx("div",{className:`column-resize-handle ${Te==="updates"?"resizing":""}`,onMouseDown:O=>Ia(O,"updates")})]})]}),!B&&L.map((O,q)=>{const J=z[O.id]||[],ee=E[O.id],re=(Ct==null?void 0:Ct.taskId)===O.id;return u.jsxs(rh.Fragment,{children:[u.jsxs("div",{className:`item-row ${re?"drag-over-task":""}`,draggable:"true",onDragStart:de=>ti(de,O,k.id,q),onDragEnd:ni,onDragOver:de=>xf(de,O.id,k.id,q),children:[u.jsxs("div",{className:"item-cell col-task",children:[u.jsx("button",{className:"expand-arrow",onClick:de=>{de.stopPropagation(),Ca(O.id)},children:u.jsx(fd,{size:16,className:ee?"expanded":""})}),u.jsx("div",{className:"task-check"}),O.isNew?u.jsx("input",{type:"text",className:"task-name-input",value:O.name,onChange:de=>{const ct=de.target.value;s(Ot=>({...Ot,items_page:{items:Ot.items_page.items.map(Lt=>Lt.id===O.id?{...Lt,name:ct}:Lt)}}))},onBlur:()=>{O.name.trim()?s(de=>({...de,items_page:{items:de.items_page.items.map(ct=>ct.id===O.id?{...ct,isNew:!1}:ct)}})):(s(de=>({...de,items_page:{items:de.items_page.items.filter(ct=>ct.id!==O.id)}})),Q(de=>({...de,[k.id]:(de[k.id]||[]).filter(ct=>ct!==O.id)})))},placeholder:"اسم المهمة...",autoFocus:!0}):u.jsx("span",{className:"task-text",onClick:()=>Hc(O),children:O.name}),u.jsx("button",{className:"add-subtask-inline-btn",onClick:de=>{de.stopPropagation(),Kr(O.id)},title:"إضافة مهمة فرعية",children:u.jsx(bt,{size:14})})]}),r.columns.map(de=>u.jsx("div",{className:"item-cell",children:Cf(de,O,(ct,Ot,Lt)=>{s(Xr=>({...Xr,items_page:{items:Xr.items_page.items.map(Bn=>{if(Bn.id===O.id){const Ra=Bn.column_values.map(Ce=>Ce.id===ct?{...Ce,text:Ot}:Ce);return{...Bn,column_values:Ra}}return Bn})}}))})},de.id)),u.jsx("div",{className:"item-cell col-updates",children:u.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"center",justifyContent:"center"},children:u.jsxs("button",{onClick:()=>qr(O.id),className:"updates-icon-btn",title:"التحديثات",style:{position:"relative"},children:[u.jsx(al,{size:18}),Ke[O.id]>0&&u.jsx("span",{className:"updates-badge",children:Ke[O.id]})]})})})]}),ee&&J.length>0&&Yi(O.id,J,0)]},O.id)}),!B&&u.jsx("div",{className:"add-item-row",children:u.jsxs("button",{className:"add-item-btn",onClick:()=>{const O={id:`temp-${Date.now()}`,name:"",group:{id:k.id},column_values:[{id:"person",text:"",type:"person"},{id:"status",text:"",type:"status"},{id:"date",text:"",type:"date"},{id:"link",text:"",type:"link"}],isNew:!0};s(q=>({...q,items_page:{items:[...q.items_page.items,O]}})),Q(q=>({...q,[k.id]:[...q[k.id]||[],O.id]}))},children:[u.jsx(bt,{size:18}),u.jsx("span",{children:"إضافة مهمة"})]})})]},k.id)})})}),h&&u.jsx(jF,{task:h,board:r,onClose:()=>d(null),onUpdate:Gc}),R&&u.jsxs("div",{className:"column-type-menu",children:[u.jsxs("div",{className:"menu-header",children:[u.jsx("h3",{children:"اختر نوع العمود"}),u.jsx("button",{onClick:()=>D(!1),className:"close-menu-btn",children:u.jsx(xr,{size:16})})]}),u.jsx("div",{className:"column-types-grid",children:Qc.map(k=>u.jsxs("div",{className:"column-type-item",onClick:()=>{console.log("Adding column:",k.type),D(!1)},children:[u.jsx("span",{className:"column-type-icon",children:k.icon}),u.jsx("span",{className:"column-type-label",children:k.label})]},k.type))})]}),x&&u.jsxs("div",{className:"cell-menu",style:{position:"fixed",left:`${x.x}px`,top:`${x.y}px`,zIndex:1001},onClick:k=>k.stopPropagation(),children:[u.jsxs("div",{className:"cell-menu-header",children:[u.jsxs("span",{children:["تعديل ",x.columnType]}),u.jsx("button",{onClick:()=>_(null),className:"close-menu-btn",children:u.jsx(xr,{size:14})})]}),u.jsx("div",{className:"cell-menu-options",children:x.columnType==="status"||x.columnType==="color"?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"menu-option status-option",style:{background:"#00CA72"},children:"مكتمل"}),u.jsx("div",{className:"menu-option status-option",style:{background:"#FDAB3D"},children:"قيد العمل"}),u.jsx("div",{className:"menu-option status-option",style:{background:"#E44258"},children:"معلق"}),u.jsx("div",{className:"menu-option status-option",style:{background:"#0073EA"},children:"جديد"})]}):x.columnType==="person"||x.columnType==="people"?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"menu-option",children:"تعيين شخص"}),u.jsx("div",{className:"menu-option",children:"إزالة الشخص"})]}):x.columnType==="date"?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"menu-option",children:"اختيار تاريخ"}),u.jsx("div",{className:"menu-option",children:"مسح التاريخ"})]}):u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"menu-option",children:"تعديل"}),u.jsx("div",{className:"menu-option",children:"مسح"})]})})]}),lr&&u.jsx("div",{className:"updates-modal-overlay",onClick:()=>cr(null),children:u.jsxs("div",{className:"updates-modal",onClick:k=>k.stopPropagation(),style:{maxWidth:"700px"},children:[u.jsxs("div",{className:"updates-modal-header",children:[u.jsx("div",{children:u.jsx("h3",{children:lr.columnTitle})}),u.jsx("button",{onClick:()=>cr(null),className:"close-modal-btn",title:"إغلاق",children:u.jsx(xr,{size:20})})]}),u.jsx("div",{className:"updates-modal-body",style:{padding:"20px"},children:u.jsx("textarea",{className:"text-modal-textarea",value:lr.value||"",onChange:k=>{const L=k.target.value;cr(B=>({...B,value:L}))},placeholder:`اكتب ${lr.columnTitle} هنا...`,rows:10,style:{width:"100%",padding:"12px",border:"1px solid var(--border-color)",borderRadius:"6px",fontSize:"14px",fontFamily:"inherit",resize:"vertical",backgroundColor:"var(--bg-item)",color:"var(--text-primary)"}})}),u.jsxs("div",{className:"updates-modal-footer",style:{padding:"16px 20px",borderTop:"1px solid var(--border-color)",display:"flex",gap:"10px",justifyContent:"flex-end"},children:[u.jsx("button",{onClick:()=>cr(null),className:"modal-cancel-btn",style:{padding:"8px 16px",borderRadius:"6px",border:"1px solid var(--border-color)",backgroundColor:"var(--bg-item)",color:"var(--text-primary)",cursor:"pointer"},children:"إلغاء"}),u.jsx("button",{onClick:()=>{lr.onUpdate(lr.value),cr(null)},className:"modal-save-btn",style:{padding:"8px 16px",borderRadius:"6px",border:"none",backgroundColor:"var(--link-color, #0073EA)",color:"white",cursor:"pointer",fontWeight:"600"},children:"حفظ"})]})]})}),xn&&u.jsx("div",{className:"updates-modal-overlay",onClick:()=>qr(null),children:u.jsxs("div",{className:"updates-modal",onClick:k=>k.stopPropagation(),children:[u.jsxs("div",{className:"updates-modal-header",children:[u.jsx("div",{children:u.jsx("h3",{children:"التحديثات"})}),u.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[u.jsxs("div",{className:"updates-modal-actions",children:[u.jsxs("button",{className:"updates-action-btn email",onClick:()=>{const k=encodeURIComponent("تحديث من Monday.com"),L=encodeURIComponent(ar.map(B=>`${B.author}: ${B.text}`).join(`

`)||"");window.location.href=`mailto:?subject=${k}&body=${L}`},title:"إرسال عبر البريد",children:[u.jsx(Nl,{size:16}),u.jsx("span",{children:"إيميل"})]}),u.jsxs("button",{className:"updates-action-btn whatsapp",onClick:()=>{const k=encodeURIComponent(ar.map(L=>`${L.author}: ${L.text}`).join(`

`)||"");window.open(`https://wa.me/?text=${k}`,"_blank")},title:"إرسال عبر واتساب",children:[u.jsx(al,{size:16}),u.jsx("span",{children:"واتساب"})]})]}),u.jsx("button",{onClick:()=>qr(null),className:"close-menu-btn",children:u.jsx(xr,{size:18})})]})]}),u.jsx("div",{className:"updates-modal-body",children:ar.length>0?u.jsx("div",{className:"updates-list",children:ar.map((k,L)=>u.jsxs("div",{className:"update-item",children:[u.jsx("div",{className:"update-avatar",children:dr(k.author)}),u.jsxs("div",{className:"update-content",children:[u.jsxs("div",{className:"update-header",children:[u.jsx("span",{className:"update-author",children:k.author}),u.jsx("span",{className:"update-time",children:k.time})]}),u.jsx("div",{className:"update-text",children:_t(k.text)})]})]},k.id||L))}):u.jsxs("div",{className:"updates-empty",children:[u.jsx(al,{size:48,style:{opacity:.3,marginBottom:"12px"}}),u.jsx("p",{children:"لا توجد تحديثات بعد"}),u.jsx("p",{style:{fontSize:"13px",marginTop:"8px"},children:"ابدأ المحادثة أدناه"})]})}),u.jsx("div",{className:"updates-input-area",children:u.jsxs("div",{className:"updates-input-wrapper",style:{position:"relative"},children:[u.jsx("textarea",{ref:Zs,className:"updates-input",placeholder:"اكتب تحديثاً... (استخدم @ لذكر المستخدمين)",rows:2,onChange:ei,onKeyDown:async k=>{var L,B;if(!(zc&&(k.key==="Enter"||k.key==="Tab")))if(k.key==="Enter"&&!k.shiftKey){k.preventDefault();const O=k.target.value.trim();if(O&&e&&n){if((await uT(t,xn,O,e.uid,n.displayName||"مستخدم")).success){const J=(B=(L=r==null?void 0:r.items_page)==null?void 0:L.items)==null?void 0:B.find(ee=>ee.id===xn);await hT(t,Ze.UPDATE_POSTED,e.uid,n.displayName||"مستخدم",{taskName:(J==null?void 0:J.name)||"مهمة",updateText:O.substring(0,50)+(O.length>50?"...":"")})}k.target.value="",ur(!1)}}else k.key==="Escape"&&ur(!1)}}),zc&&u.jsx(KF,{users:Uc,searchTerm:Bc,onSelect:$c,position:{bottom:"100%",left:"0",marginBottom:"8px"}}),u.jsx("button",{className:"updates-send-btn",onClick:async k=>{var O,q;const L=k.target.parentElement.querySelector("textarea"),B=L.value.trim();if(B&&e&&n){if((await uT(t,xn,B,e.uid,n.displayName||"مستخدم")).success){const ee=(q=(O=r==null?void 0:r.items_page)==null?void 0:O.items)==null?void 0:q.find(re=>re.id===xn);await hT(t,Ze.UPDATE_POSTED,e.uid,n.displayName||"مستخدم",{taskName:(ee==null?void 0:ee.name)||"مهمة",updateText:B.substring(0,50)+(B.length>50?"...":"")})}L.value="",ur(!1)}},children:"إرسال"})]})})]})}),(R||x)&&u.jsx("div",{className:"menu-overlay",onClick:()=>{D(!1),_(null)}}),u.jsx(YF,{boardId:t,isOpen:hr,onClose:()=>Ta(!1)})]})}function t6(){const[t,e]=b.useState([{id:1,trigger:"When a subitem is created",action:"set subitem Status to جديد",owner:"M",updated:"a month ago",badge:"Minor",active:!0},{id:2,trigger:"1 day after subitem Date arrives",condition:"only if subitem Status is قيد الانتظار",action:"set subitem Status to جاري العمل AND set subitem متابعة to جاري",owner:"M",updated:"a month ago",badge:"Minor",active:!0},{id:3,trigger:"When subitem Date arrives",condition:"only if subitem Status is جديد",action:"set subitem Status to قيد الانتظار",owner:"M",updated:"a month ago",badge:"Minor",active:!0},{id:4,trigger:"When subitem Status changes to تم الانجاز",condition:"only if subitem متابعة الجودة is NOT متأخر",action:"set subitem متابعة الجودة to Done",owner:"M",updated:"a month ago",badge:"Minor",active:!0},{id:5,trigger:"When Status changes to تم الإنجاز",condition:"only if متابعة الجودة is NOT متأخر",action:"set متابعة الجودة to تم",owner:"M",updated:"a month ago",badge:"Minor",active:!1},{id:6,trigger:"When Date arrives",condition:"only if Status is جديدة",action:"set Status to جاري العمل",owner:"M",updated:"a month ago",badge:"Minor",active:!0},{id:7,trigger:"When an item is created",action:"set Status to جديد",owner:"M",updated:"a month ago",badge:"Minor",active:!0},{id:8,trigger:"1 day after Date arrives",condition:"only if Status is جاري العمل",action:"set Status to متأخر AND set متابعة الجودة to متأخر",owner:"M",updated:"2 months ago",badge:"Minor",active:!0},{id:9,trigger:"When Status is تم الإنجاز for 30 days",action:"archive item",owner:"M",updated:"just now",badge:"Major",active:!0},{id:10,trigger:"When Date is overdue",action:"set Priority to عاجل",owner:"M",updated:"just now",badge:"Critical",active:!0},{id:11,trigger:"When stuck for 2 days",action:"set Priority to حرج",owner:"M",updated:"just now",badge:"Critical",active:!0},{id:12,trigger:"When Status is معلق",action:'move to "المشاكل" group',owner:"M",updated:"just now",badge:"Major",active:!0},{id:13,trigger:"When Status changes to متأخر",action:"notify المسؤول",owner:"M",updated:"just now",badge:"Minor",active:!0},{id:14,trigger:"When Date is 1 day away",action:"notify سلمى ومحمد",owner:"M",updated:"just now",badge:"Minor",active:!0}]),[n,r]=b.useState("all"),[s,i]=b.useState(""),o=c=>{e(t.map(h=>h.id===c?{...h,active:!h.active}:h))},a=t.filter(c=>{const h=n==="all"?!0:n==="active"?c.active:!c.active,d=s===""?!0:c.trigger.toLowerCase().includes(s.toLowerCase())||c.action.toLowerCase().includes(s.toLowerCase())||c.condition&&c.condition.toLowerCase().includes(s.toLowerCase());return h&&d});return u.jsxs("div",{className:"automations-page",children:[u.jsxs("div",{className:"automations-header",children:[u.jsxs("div",{className:"header-left",children:[u.jsx("h1",{children:"⚡ Automations"}),u.jsxs("p",{className:"active-count",children:[t.filter(c=>c.active).length," active"]})]}),u.jsxs("button",{className:"create-automation-btn",children:[u.jsx(bt,{size:18}),u.jsx("span",{children:"Create Automation"})]})]}),u.jsxs("div",{className:"automations-filters",children:[u.jsxs("div",{className:"filter-buttons",children:[u.jsxs("button",{className:`filter-btn ${n==="all"?"active":""}`,onClick:()=>r("all"),children:["All (",t.length,")"]}),u.jsxs("button",{className:`filter-btn ${n==="active"?"active":""}`,onClick:()=>r("active"),children:["Active (",t.filter(c=>c.active).length,")"]}),u.jsxs("button",{className:`filter-btn ${n==="inactive"?"active":""}`,onClick:()=>r("inactive"),children:["Inactive (",t.filter(c=>!c.active).length,")"]})]}),u.jsxs("div",{className:"search-box",children:[u.jsx(md,{size:16,className:"search-icon"}),u.jsx("input",{type:"text",placeholder:"Search automations...",value:s,onChange:c=>i(c.target.value)})]})]}),u.jsx("div",{className:"automations-list",children:a.length>0?a.map(c=>u.jsxs("div",{className:"automation-card",children:[u.jsxs("div",{className:"card-content",children:[u.jsx("div",{className:"automation-trigger",children:u.jsx("span",{className:"trigger-text",children:c.trigger})}),c.condition&&u.jsxs("div",{className:"automation-condition",children:[u.jsx("span",{className:"condition-badge",children:"AND"}),u.jsx("span",{className:"condition-text",children:c.condition})]}),u.jsxs("div",{className:"automation-action",children:[u.jsx("span",{className:"action-arrow",children:"→"}),u.jsx("span",{className:"action-text",children:c.action})]}),u.jsxs("div",{className:"automation-meta",children:[u.jsx("div",{className:"meta-avatar",children:c.owner}),u.jsxs("span",{className:"meta-text",children:["Updated ",c.updated]}),u.jsx("span",{className:"meta-dot",children:"•"}),u.jsx("span",{className:"meta-badge",children:c.badge}),u.jsx("button",{className:"meta-more",children:u.jsx(Y_,{size:16})})]})]}),u.jsx("div",{className:"card-toggle",children:u.jsxs("label",{className:"toggle-switch",children:[u.jsx("input",{type:"checkbox",checked:c.active,onChange:()=>o(c.id)}),u.jsx("span",{className:"toggle-slider"})]})})]},c.id)):u.jsx("div",{className:"empty-state",children:u.jsx("p",{children:"No automations found"})})})]})}const n6="eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I",r6="https://api.monday.com/v2";async function s6(t,e={}){var n;try{const r=await fetch(r6,{method:"POST",headers:{"Content-Type":"application/json",Authorization:n6,"API-Version":"2024-01"},body:JSON.stringify({query:t,variables:e})});if(!r.ok)throw new Error(`Monday API error: ${r.status}`);const s=await r.json();if(s.errors)throw console.error("Monday API errors:",s.errors),new Error(((n=s.errors[0])==null?void 0:n.message)||"Monday API error");return s.data}catch(r){throw console.error("Monday API request failed:",r),r}}async function i6(){const t=`
    query {
      users {
        id
        name
        email
        phone
        mobile_phone
        photo_original
        title
        birthday
        location
        created_at
        enabled
        is_guest
        is_pending
      }
    }
  `;try{const e=await s6(t);return console.log("Team members:",e.users),e.users||[]}catch(e){return console.error("Failed to fetch team members:",e),[]}}function o6(){const[t,e]=b.useState([]),[n,r]=b.useState(!0);b.useEffect(()=>{s()},[]);async function s(){try{r(!0);const i=await i6();e(i)}catch(i){console.error("Failed to fetch team:",i)}finally{r(!1)}}return n?u.jsx("div",{className:"page-container",children:u.jsxs("div",{className:"loading-state",children:[u.jsx("div",{className:"spinner"}),u.jsx("p",{children:"جاري تحميل بيانات الفريق..."})]})}):u.jsxs("div",{className:"page-container",children:[u.jsx("div",{className:"page-header",children:u.jsxs("div",{className:"page-title-section",children:[u.jsx(Vr,{size:32}),u.jsxs("div",{children:[u.jsx("h1",{children:"الفريق"}),u.jsx("p",{className:"page-subtitle",children:"إدارة أعضاء الفريق وصلاحياتهم"})]})]})}),u.jsx("div",{className:"team-grid",children:t.map(i=>{var o;return u.jsxs("div",{className:"team-card",children:[u.jsxs("div",{className:"team-card-header",children:[u.jsx("div",{className:"member-avatar",children:i.photo_original?u.jsx("img",{src:i.photo_original,alt:i.name}):u.jsx("div",{className:"avatar-placeholder",children:((o=i.name)==null?void 0:o.charAt(0))||"👤"})}),u.jsx("div",{className:"member-status",children:i.enabled?u.jsx("span",{className:"status-badge active",children:"نشط"}):u.jsx("span",{className:"status-badge inactive",children:"غير نشط"})})]}),u.jsxs("div",{className:"team-card-body",children:[u.jsx("h3",{className:"member-name",children:i.name}),i.title&&u.jsx("p",{className:"member-title",children:i.title}),u.jsxs("div",{className:"member-info",children:[i.email&&u.jsxs("div",{className:"info-item",children:[u.jsx(Nl,{size:16}),u.jsx("span",{children:i.email})]}),(i.phone||i.mobile_phone)&&u.jsxs("div",{className:"info-item",children:[u.jsx(xF,{size:16}),u.jsx("span",{children:i.phone||i.mobile_phone})]}),i.location&&u.jsxs("div",{className:"info-item",children:[u.jsx(Ck,{size:16}),u.jsx("span",{children:i.location})]})]}),i.is_guest&&u.jsx("div",{className:"member-badge",children:"ضيف"}),i.is_pending&&u.jsx("div",{className:"member-badge pending",children:"قيد الانتظار"})]})]},i.id)})}),t.length===0&&u.jsxs("div",{className:"empty-state",children:[u.jsx(Vr,{size:64}),u.jsx("h3",{children:"لا يوجد أعضاء في الفريق"}),u.jsx("p",{children:"ابدأ بإضافة أعضاء جدد للفريق"})]})]})}function a6(){return u.jsxs("div",{className:"page-container",children:[u.jsx("div",{className:"page-header",children:u.jsxs("div",{className:"page-title-section",children:[u.jsx(X_,{size:32}),u.jsxs("div",{children:[u.jsx("h1",{children:"الإعدادات"}),u.jsx("p",{className:"page-subtitle",children:"إدارة إعدادات الحساب والنظام"})]})]})}),u.jsxs("div",{className:"settings-grid",children:[u.jsxs("div",{className:"settings-card",children:[u.jsxs("div",{className:"settings-card-header",children:[u.jsx(dc,{size:24}),u.jsx("h3",{children:"الملف الشخصي"})]}),u.jsxs("div",{className:"settings-card-body",children:[u.jsx("p",{children:"إدارة معلومات الملف الشخصي والصورة"}),u.jsx("button",{className:"btn-secondary",children:"تعديل الملف الشخصي"})]})]}),u.jsxs("div",{className:"settings-card",children:[u.jsxs("div",{className:"settings-card-header",children:[u.jsx(Ek,{size:24}),u.jsx("h3",{children:"الإشعارات"})]}),u.jsxs("div",{className:"settings-card-body",children:[u.jsx("p",{children:"تخصيص إعدادات الإشعارات والتنبيهات"}),u.jsx("button",{className:"btn-secondary",children:"إدارة الإشعارات"})]})]}),u.jsxs("div",{className:"settings-card",children:[u.jsxs("div",{className:"settings-card-header",children:[u.jsx(Ck,{size:24}),u.jsx("h3",{children:"الأمان والخصوصية"})]}),u.jsxs("div",{className:"settings-card-body",children:[u.jsx("p",{children:"إعدادات كلمة المرور والأمان"}),u.jsx("button",{className:"btn-secondary",children:"إدارة الأمان"})]})]}),u.jsxs("div",{className:"settings-card",children:[u.jsxs("div",{className:"settings-card-header",children:[u.jsx(TF,{size:24}),u.jsx("h3",{children:"المظهر"})]}),u.jsxs("div",{className:"settings-card-body",children:[u.jsx("p",{children:"تخصيص ألوان ومظهر النظام"}),u.jsx("button",{className:"btn-secondary",children:"تخصيص المظهر"})]})]})]})]})}function l6(){const t=[{icon:fF,title:"دليل الاستخدام",description:"تعلم كيفية استخدام جميع ميزات النظام",link:"#"},{icon:SF,title:"فيديوهات تعليمية",description:"شاهد دروس فيديو خطوة بخطوة",link:"#"},{icon:al,title:"الدعم الفني",description:"تواصل مع فريق الدعم للحصول على المساعدة",link:"#"},{icon:pd,title:"الأسئلة الشائعة",description:"إجابات على الأسئلة الأكثر شيوعاً",link:"#"}];return u.jsxs("div",{className:"page-container",children:[u.jsx("div",{className:"page-header",children:u.jsxs("div",{className:"page-title-section",children:[u.jsx(Tk,{size:32}),u.jsxs("div",{children:[u.jsx("h1",{children:"المساعدة والدعم"}),u.jsx("p",{className:"page-subtitle",children:"نحن هنا لمساعدتك"})]})]})}),u.jsx("div",{className:"help-grid",children:t.map((e,n)=>u.jsxs("a",{href:e.link,className:"help-card",children:[u.jsx("div",{className:"help-icon",children:u.jsx(e.icon,{size:32})}),u.jsx("h3",{children:e.title}),u.jsx("p",{children:e.description})]},n))}),u.jsxs("div",{className:"contact-section",children:[u.jsx("h2",{children:"هل تحتاج إلى مساعدة إضافية؟"}),u.jsx("p",{children:"فريق الدعم الفني متاح على مدار الساعة لمساعدتك"}),u.jsx("button",{className:"btn-primary",children:"تواصل مع الدعم"})]})]})}function c6({isOpen:t,setIsOpen:e}){const n=Fi(),[r,s]=b.useState(!0),[i,o]=b.useState(!1),[a,c]=b.useState("4163103"),[h,d]=b.useState(!1),p=Z_,m=Rk,w=p.find(_=>_.id===a)||p[0],N=m[a]||[],R=_=>{c(_),o(!1),n("/workspaces")},D=()=>{o(!1),d(!0)},x=[{icon:xk,label:"لوحة التحكم",path:"/dashboard"},{icon:kk,label:"الأتمتة",path:"/automations"},{icon:Vr,label:"الفريق",path:"/team"},{icon:X_,label:"الإعدادات",path:"/settings"},{icon:Tk,label:"المساعدة",path:"/help"}];return u.jsxs(u.Fragment,{children:[t&&u.jsx("div",{className:"sidebar-overlay",onClick:()=>e(!1)}),u.jsxs("aside",{className:`sidebar ${t?"open":"closed"}`,children:[u.jsxs("div",{className:"sidebar-header",children:[u.jsxs("div",{className:"sidebar-logo",children:[u.jsx("span",{className:"logo-icon",children:"📅"}),u.jsx("span",{className:"logo-text",children:"Sunday"})]}),u.jsx("button",{className:"sidebar-close",onClick:()=>e(!1),children:u.jsx(xr,{size:20})})]}),u.jsxs("div",{className:"workspace-card-container",children:[u.jsxs("button",{className:"workspace-card",onClick:()=>o(!i),children:[u.jsx("div",{className:"workspace-icon-large",children:w.icon}),u.jsxs("div",{className:"workspace-info",children:[u.jsx("div",{className:"workspace-name",children:w.name}),u.jsxs("div",{className:"workspace-role",children:["مدير • ",w.members," عضو"]})]}),u.jsx("div",{className:"workspace-menu-btn",children:u.jsx(fd,{size:18,style:{transform:i?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}})})]}),i&&u.jsxs("div",{className:"workspace-dropdown",children:[p.map(_=>u.jsxs("button",{className:`workspace-dropdown-item ${_.id===w.id?"active":""}`,onClick:()=>{R(_.id),o(!1)},children:[u.jsx("span",{className:"workspace-dropdown-icon",children:_.icon}),u.jsxs("div",{className:"workspace-dropdown-info",children:[u.jsx("div",{className:"workspace-dropdown-name",children:_.name}),u.jsxs("div",{className:"workspace-dropdown-members",children:[_.members," أعضاء"]})]}),_.id===w.id&&u.jsx("div",{className:"workspace-dropdown-check",children:"✓"})]},_.id)),u.jsx("div",{className:"workspace-dropdown-divider"}),u.jsxs("button",{className:"workspace-dropdown-item workspace-dropdown-create",onClick:D,children:[u.jsx(bt,{size:18}),u.jsx("span",{children:"إنشاء مساحة عمل جديدة"})]})]})]}),u.jsx("nav",{className:"sidebar-nav",children:x.map(_=>u.jsxs(Bw,{to:_.path,className:({isActive:E})=>`nav-item ${E?"active":""}`,onClick:()=>window.innerWidth<1024&&e(!1),children:[u.jsx(_.icon,{size:20}),u.jsx("span",{children:_.label})]},_.path))}),u.jsxs("div",{className:"boards-section",children:[u.jsxs("div",{className:"boards-header",children:[u.jsxs("button",{className:"boards-toggle",onClick:()=>s(!r),children:[r?u.jsx(fd,{size:18}):u.jsx(pF,{size:18}),u.jsx(Kn,{size:18}),u.jsx("span",{children:"اللوحات"}),u.jsx("span",{className:"boards-count",children:N.length})]}),u.jsx("button",{className:"add-board-btn",title:"إضافة لوحة جديدة",children:u.jsx(bt,{size:18})})]}),r&&u.jsx("div",{className:"boards-list",children:N.map(_=>u.jsxs(Bw,{to:`/board/${_.id}`,className:({isActive:E})=>`board-item ${E?"active":""}`,onClick:()=>window.innerWidth<1024&&e(!1),children:[u.jsx("div",{className:"board-indicator",style:{backgroundColor:_.color}}),u.jsx("span",{className:"board-icon",children:_.icon}),u.jsxs("div",{className:"board-info",children:[u.jsx("span",{className:"board-name",children:_.name}),u.jsxs("span",{className:"board-tasks",children:[_.tasks," مهام"]})]}),u.jsx("button",{className:"board-menu-btn",children:u.jsx(EF,{size:16})})]},_.id))})]}),u.jsxs("button",{className:"add-board-large",children:[u.jsx(bt,{size:20}),u.jsx("span",{children:"إضافة لوحة جديدة"})]})]}),h&&u.jsx("div",{className:"modal-overlay",onClick:()=>d(!1),children:u.jsxs("div",{className:"modal-content",onClick:_=>_.stopPropagation(),children:[u.jsxs("div",{className:"modal-header",children:[u.jsx("h2",{children:"إنشاء مساحة عمل جديدة"}),u.jsx("button",{onClick:()=>d(!1),children:u.jsx(xr,{size:20})})]}),u.jsxs("div",{className:"modal-body",children:[u.jsx("p",{children:"سيتم إضافة وظيفة إنشاء مساحة عمل جديدة قريباً."}),u.jsx("p",{children:"حالياً يمكنك التنقل بين مساحات العمل الموجودة."})]}),u.jsx("div",{className:"modal-footer",children:u.jsx("button",{className:"btn-cancel",onClick:()=>d(!1),children:"إغلاق"})})]})})]})}function u6({toggleSidebar:t}){const{userData:e}=wf(),n=async()=>{confirm("هل أنت متأكد من تسجيل الخروج؟")&&await Q_()},r=async()=>{confirm("🔥 هل تريد حذف كل البيانات وتسجيل خروج كامل؟")&&await NF()},s=o=>o?o.split(" ").map(a=>a[0]).join("").toUpperCase().slice(0,2):"؟",i=o=>({admin:"مسؤول",manager:"مدير",employee:"موظف"})[o]||"موظف";return u.jsxs("header",{className:"header",children:[u.jsxs("div",{className:"header-right",children:[u.jsx("button",{className:"menu-button",onClick:t,children:u.jsx(vF,{size:24})}),u.jsxs("div",{className:"search-container",children:[u.jsx(md,{size:20}),u.jsx("input",{type:"text",placeholder:"البحث في المهام...",className:"search-input"})]})]}),u.jsxs("div",{className:"header-left",children:[u.jsxs("button",{className:"icon-button",title:"الرسائل",children:[u.jsx(Ik,{size:20}),u.jsx("span",{className:"notification-badge",children:"3"})]}),u.jsxs("button",{className:"icon-button",title:"الإشعارات",children:[u.jsx(Ek,{size:20}),u.jsx("span",{className:"notification-badge",children:"5"})]}),u.jsxs("div",{className:"user-menu",children:[u.jsx("div",{className:"user-avatar",children:s(e==null?void 0:e.displayName)}),u.jsxs("div",{className:"user-info",children:[u.jsx("div",{className:"user-name",children:(e==null?void 0:e.displayName)||"مستخدم"}),u.jsx("div",{className:"user-role",children:i(e==null?void 0:e.role)})]})]}),u.jsx("button",{className:"icon-button",onClick:r,title:"🔥 حذف كامل وخروج",style:{color:"#dc3545"},children:u.jsx(J_,{size:20})}),u.jsx("button",{className:"icon-button logout-button",onClick:n,title:"تسجيل الخروج",children:u.jsx(_F,{size:20})})]})]})}function h6(){const[t,e]=b.useState(!1),[n,r]=b.useState(""),[s,i]=b.useState(0),o=Fi(),c=[{id:"dashboard",label:"لوحة التحكم",icon:xk,action:()=>o("/dashboard"),keywords:["dashboard","لوحة","التحكم","home"]},{id:"workspaces",label:"مساحات العمل",icon:Kn,action:()=>o("/workspaces"),keywords:["workspaces","مساحات","العمل","boards","لوحات"]},{id:"team",label:"الفريق",icon:Vr,action:()=>o("/team"),keywords:["team","فريق","أعضاء","members"]},{id:"settings",label:"الإعدادات",icon:X_,action:()=>o("/settings"),keywords:["settings","إعدادات","تفضيلات","preferences"]},{id:"new-board",label:"لوحة جديدة",icon:bt,action:()=>console.log("Create new board"),keywords:["new","board","create","جديد","لوحة","إنشاء"]},{id:"analytics",label:"التحليلات",icon:Sk,action:()=>console.log("Analytics"),keywords:["analytics","تحليلات","إحصائيات","stats"]},{id:"shortcuts",label:"اختصارات لوحة المفاتيح",icon:mF,action:()=>console.log("Show shortcuts"),keywords:["shortcuts","اختصارات","keyboard","keys"]}].filter(p=>p.label.toLowerCase().includes(n.toLowerCase())||p.keywords.some(m=>m.toLowerCase().includes(n.toLowerCase()))),h=b.useCallback(p=>{if((p.metaKey||p.ctrlKey)&&p.key==="k"){p.preventDefault(),e(!0);return}if(p.key==="Escape"&&t){e(!1),r(""),i(0);return}t&&(p.key==="ArrowDown"?(p.preventDefault(),i(m=>m<c.length-1?m+1:m)):p.key==="ArrowUp"?(p.preventDefault(),i(m=>m>0?m-1:0)):p.key==="Enter"&&c[s]&&(p.preventDefault(),d(c[s])))},[t,c,s]);b.useEffect(()=>(window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)),[h]),b.useEffect(()=>{i(0)},[n]);const d=p=>{p.action(),e(!1),r(""),i(0)};return t?u.jsx("div",{className:"command-palette-overlay",onClick:()=>e(!1),children:u.jsxs("div",{className:"command-palette",onClick:p=>p.stopPropagation(),children:[u.jsxs("div",{className:"command-palette-header",children:[u.jsx(md,{size:20,className:"search-icon"}),u.jsx("input",{type:"text",className:"command-palette-input",placeholder:"ابحث عن أي شيء... (⌘K)",value:n,onChange:p=>r(p.target.value),autoFocus:!0}),u.jsx("kbd",{className:"command-palette-kbd",children:"ESC"})]}),u.jsx("div",{className:"command-palette-results",children:c.length>0?c.map((p,m)=>u.jsxs("button",{className:`command-item ${m===s?"selected":""}`,onClick:()=>d(p),onMouseEnter:()=>i(m),children:[u.jsx(p.icon,{size:18}),u.jsx("span",{children:p.label}),m===s&&u.jsx("kbd",{className:"command-item-kbd",children:"↵"})]},p.id)):u.jsxs("div",{className:"command-empty",children:[u.jsx(md,{size:32}),u.jsx("p",{children:"لا توجد نتائج"})]})}),u.jsxs("div",{className:"command-palette-footer",children:[u.jsxs("div",{className:"command-hint",children:[u.jsx("kbd",{children:"↑"}),u.jsx("kbd",{children:"↓"}),u.jsx("span",{children:"للتنقل"})]}),u.jsxs("div",{className:"command-hint",children:[u.jsx("kbd",{children:"↵"}),u.jsx("span",{children:"للتحديد"})]}),u.jsxs("div",{className:"command-hint",children:[u.jsx("kbd",{children:"ESC"}),u.jsx("span",{children:"للإغلاق"})]})]})]})}):null}function d6(){const[t,e]=b.useState(!1),n=[{id:"task",label:"مهمة جديدة",icon:pd,color:"#6161FF",action:()=>console.log("New task")},{id:"board",label:"لوحة جديدة",icon:kk,color:"#00CA72",action:()=>console.log("New board")},{id:"member",label:"إضافة عضو",icon:Vr,color:"#FDAB3D",action:()=>console.log("Add member")},{id:"meeting",label:"جدولة اجتماع",icon:mg,color:"#E44258",action:()=>console.log("Schedule meeting")},{id:"message",label:"رسالة جديدة",icon:Ik,color:"#0073EA",action:()=>console.log("New message")},{id:"ai",label:"اسأل المساعد الذكي",icon:IF,color:"#FF158A",action:()=>console.log("Ask AI")}];return u.jsxs(u.Fragment,{children:[u.jsx("button",{className:`quick-actions-fab ${t?"open":""}`,onClick:()=>e(!t),"aria-label":"Quick Actions",children:t?u.jsx(xr,{size:24}):u.jsx(bt,{size:24})}),t&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"quick-actions-overlay",onClick:()=>e(!1)}),u.jsx("div",{className:"quick-actions-menu",children:n.map((r,s)=>u.jsxs("button",{className:"quick-action-item",style:{"--action-color":r.color,"--delay":`${s*.05}s`},onClick:()=>{r.action(),e(!1)},children:[u.jsx("div",{className:"action-icon",children:u.jsx(r.icon,{size:20})}),u.jsx("span",{className:"action-label",children:r.label})]},r.id))})]})]})}function f6(){const[t,e]=b.useState(!0);return u.jsxs("div",{className:"main-layout",children:[u.jsx(c6,{isOpen:t,setIsOpen:e}),u.jsxs("div",{className:`main-content ${t?"sidebar-open":"sidebar-closed"}`,children:[u.jsx(u6,{toggleSidebar:()=>e(!t)}),u.jsx("main",{className:"page-content",children:u.jsx(lP,{})})]}),u.jsx(h6,{}),u.jsx(d6,{})]})}const p6=b.createContext();function m6({children:t}){const[e,n]=b.useState("1"),[r]=b.useState([{id:"1",name:"مساحة العمل الرئيسية",icon:"🏢",color:"#6161FF",members:24},{id:"2",name:"التسويق الرقمي",icon:"📊",color:"#00CA72",members:12},{id:"3",name:"تطوير المنتج",icon:"💻",color:"#FDAB3D",members:18}]),[s]=b.useState({1:[{id:"b1",name:"مشروع التطبيق الجديد",icon:"📱",color:"#6161FF",tasks:24},{id:"b2",name:"التسويق الرقمي",icon:"📊",color:"#00CA72",tasks:18},{id:"b3",name:"تطوير Backend",icon:"⚙️",color:"#FDAB3D",tasks:31},{id:"b4",name:"إدارة المحتوى",icon:"✍️",color:"#E44258",tasks:12},{id:"b5",name:"خدمة العملاء",icon:"💬",color:"#0073EA",tasks:8},{id:"b6",name:"الموارد البشرية",icon:"👥",color:"#FF158A",tasks:15}],2:[{id:"b7",name:"حملة وسائل التواصل",icon:"📱",color:"#00CA72",tasks:14},{id:"b8",name:"إنشاء المحتوى",icon:"✨",color:"#6161FF",tasks:22},{id:"b9",name:"تحليل البيانات",icon:"📈",color:"#0073EA",tasks:9}],3:[{id:"b10",name:"تصميم UI/UX",icon:"🎨",color:"#FF158A",tasks:16},{id:"b11",name:"Frontend Development",icon:"💻",color:"#6161FF",tasks:28},{id:"b12",name:"Backend Development",icon:"⚙️",color:"#FDAB3D",tasks:19},{id:"b13",name:"Testing & QA",icon:"🔍",color:"#00CA72",tasks:11}]}),h={currentWorkspace:e,workspaces:r,boards:s,getCurrentWorkspace:()=>r.find(d=>d.id===e),getCurrentBoards:()=>s[e]||[],getAllWorkspaces:()=>r,switchWorkspace:d=>{n(d)}};return u.jsx(p6.Provider,{value:h,children:t})}function g6(){const{isAuthenticated:t}=wf();return u.jsx(_P,{basename:"/sunday-work",children:u.jsxs(uP,{children:[u.jsx(Vt,{path:"/auth",element:u.jsx(kF,{})}),u.jsx(Vt,{path:"/auth-debug",element:u.jsx(RF,{})}),u.jsx(Vt,{path:"/test",element:u.jsx(Ak,{})}),u.jsx(Vt,{path:"/",element:t?u.jsx(xu,{to:"/dashboard",replace:!0}):u.jsx(xu,{to:"/auth",replace:!0})}),t&&u.jsxs(Vt,{element:u.jsx(f6,{}),children:[u.jsx(Vt,{path:"/dashboard",element:u.jsx(PF,{})}),u.jsx(Vt,{path:"/workspaces",element:u.jsx(bF,{})}),u.jsx(Vt,{path:"/workspace/:id",element:u.jsx(DF,{})}),u.jsx(Vt,{path:"/board/:id",element:u.jsx(e6,{})}),u.jsx(Vt,{path:"/automations",element:u.jsx(t6,{})}),u.jsx(Vt,{path:"/team",element:u.jsx(o6,{})}),u.jsx(Vt,{path:"/settings",element:u.jsx(a6,{})}),u.jsx(Vt,{path:"/help",element:u.jsx(l6,{})})]}),u.jsx(Vt,{path:"*",element:t?u.jsx(xu,{to:"/dashboard",replace:!0}):u.jsx(xu,{to:"/auth",replace:!0})})]})})}function y6(){return window.location.pathname==="/sunday-work/test"?u.jsx(Ak,{}):u.jsx(AF,{children:u.jsx(m6,{children:u.jsx(g6,{})})})}Ap.createRoot(document.getElementById("root")).render(u.jsx(rh.StrictMode,{children:u.jsx(y6,{})}));
//# sourceMappingURL=index-s81T7CY1.js.map
