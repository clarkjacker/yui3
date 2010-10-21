YUI.add("transition-native",function(b){var i="-webkit-transition",l="WebkitTransition",g="WebkitTransitionProperty",c="-webkit-transition-property",f="-webkit-transition-duration",a="-webkit-transition-timing-function",d="-webkit-transition-delay",j="webkitTransitionEnd",k="WebkitTransform",h={},e=function(){this.init.apply(this,arguments);};e.fx={};e.toggles={};e._hasEnd={};e._toCamel=function(n){n=n.replace(/-([a-z])/gi,function(p,o){return o.toUpperCase();});return n;};e._toHyphen=function(n){n=n.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(r,q,p,o){var s="";if(q){s+="-"+q.toLowerCase();}s+=p;if(o){s+="-"+o.toLowerCase();}return s;});return n;};e._reKeywords=/^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;e.useNative=false;if(i in b.config.doc.documentElement.style){e.useNative=true;e.supported=true;}b.Node.DOM_EVENTS[j]=1;e.NAME="transition";e.DEFAULT_EASING="ease";e.DEFAULT_DURATION=0.5;e.DEFAULT_DELAY=0;e._nodeAttrs={};e.prototype={constructor:e,init:function(o,n){var p=this;p._node=o;if(!p._running&&n){p._config=n;o._transition=p;p._duration=("duration" in n)?n.duration:p.constructor.DEFAULT_DURATION;p._delay=("delay" in n)?n.delay:p.constructor.DEFAULT_DELAY;p._easing=n.easing||p.constructor.DEFAULT_EASING;p._count=0;p._running=false;}return p;},addProperty:function(u,p){var s=this,r=this._node,q=b.stamp(r),o=e._nodeAttrs[q],n,t;if(!o){o=e._nodeAttrs[q]={};}n=o[u];if(p&&p.value!==undefined){t=p.value;}else{if(p!==undefined){t=p;p=h;}}if(typeof t==="function"){t=t.call(r,r);}if(n&&n.transition){if(n.transition!==s){n.transition._count--;}}else{}s._count++;o[u]={value:t,duration:((typeof p.duration!=="undefined")?p.duration:s._duration)||0.0001,delay:(typeof p.delay!=="undefined")?p.delay:s._delay,easing:p.easing||s._easing,transition:s};},removeProperty:function(p){var o=this,n=e._nodeAttrs[b.stamp(o._node)];if(n&&n[p]){delete n[p];o._count--;}},initAttrs:function(o){var n;if(o.transform&&!o[k]){o[k]=o.transform;delete o.transform;}for(n in o){if(o.hasOwnProperty(n)&&!e._reKeywords.test(n)){this.addProperty(n,o[n]);}}},run:function(r){var q=this,o=q._node,n=q._config,p={type:"transition:start",config:n};if(!q._running){q._running=true;q._node.fire("transition:start",p);if(n.on&&n.on.start){n.on.start.call(o,p);}q.initAttrs(q._config);q._callback=r;q._start();}return q;},_start:function(){this._runNative();},_prepDur:function(n){n=parseFloat(n);return n+"s";},_runNative:function(q){var v=this,r=v._node,y=b.stamp(r),w=r._node,o=w.style,t=getComputedStyle(w),C=e._nodeAttrs[y],p="",D=t[c],B=c+": ",u=f+": ",A=a+": ",x=d+": ",s,z,n;if(D!=="all"){B+=D+",";u+=t[f]+",";A+=t[a]+",";x+=t[d]+",";}for(n in C){s=e._toHyphen(n);z=C[n];if(C.hasOwnProperty(n)&&z.transition===v){if(n in w.style){u+=v._prepDur(z.duration)+",";x+=v._prepDur(z.delay)+",";A+=(z.easing)+",";B+=s+",";p+=s+": "+z.value+"; ";}else{this.removeProperty(n);}}}B=B.replace(/,$/,";");u=u.replace(/,$/,";");A=A.replace(/,$/,";");x=x.replace(/,$/,";");if(!e._hasEnd[y]){v._detach=r.on(j,v._onNativeEnd);e._hasEnd[y]=true;}o.cssText+=B+u+A+x+p;},_end:function(n){var r=this,p=r._node,s=r._callback,o=r._config,q={type:"transition:end",config:o,elapsedTime:n};r._running=false;r._callback=null;if(o.on&&o.on.end){setTimeout(function(){o.on.end.call(p,q);if(s){s.call(p,q);}},1);}else{if(s){setTimeout(function(){s.call(p,q);},1);}}p.fire("transition:end",q);},_endNative:function(n){var o=this._node,p=o.getComputedStyle(c);if(typeof p==="string"){p=p.replace(new RegExp("(?:^|,\\s)"+n+",?"),",");p=p.replace(/^,|,$/,"");o.setStyle(l,p);}},_onNativeEnd:function(u){var q=this,t=b.stamp(q),n=u._event,o=e._toCamel(n.propertyName),x=n.elapsedTime,w=e._nodeAttrs[t],v=w[o],r=(v)?v.transition:null,s,p;if(r){r.removeProperty(o);r._endNative(o);p=r._config[o];s={type:"propertyEnd",propertyName:o,elapsedTime:x,config:p};if(p&&p.on&&p.on.end){p.on.end.call(q,s);}q.fire("transition:propertyEnd",s);if(r._count<=0){r._end(x);}}},destroy:function(){var n=this;if(n._detach){n._detach.detach();}n._node=null;}};b.Transition=e;b.TransitionNative=e;b.Node.prototype.transition=function(p,o,t){var n=e._nodeAttrs[b.stamp(this)],r=(n)?n.transition||null:null,q,s;if(typeof p==="string"){if(typeof o==="function"){t=o;o=null;}q=e.fx[p];if(o&&typeof o!=="boolean"){o=b.clone(o);for(s in q){if(q.hasOwnProperty(s)){if(!(s in o)){o[s]=q[s];}}}}else{o=q;}}else{t=o;o=p;}if(r&&!r._running){r.init(this,o);}else{r=new e(this,o);}r.run(t);return this;};b.Node.prototype.show=function(o,n,p){this._show();if(o&&b.Transition){if(typeof o!=="string"&&!o.push){if(typeof n==="function"){p=n;n=o;}o=this.SHOW_TRANSITION;}this.transition(o,n,p);}return this;};var m=function(n,o){return function(){if(n){n.call(this);}if(o){o.apply(this,arguments);}};};b.Node.prototype.hide=function(o,n,p){if(o&&b.Transition){if(typeof n==="function"){p=n;n=null;}p=m(this._hide,p);if(typeof o!=="string"&&!o.push){if(typeof n==="function"){p=n;n=o;}o=this.HIDE_TRANSITION;}this.transition(o,n,p);}else{this._hide();}return this;};b.NodeList.prototype.transition=function(o,r){var n=this._nodes,p=0,q;while((q=n[p++])){b.one(q).transition(o,r);}return this;};b.Node.prototype.toggleView=function(o,n){var p;this._toggles=this._toggles||[];if(typeof o=="boolean"){n=o;}if(typeof n==="undefined"&&o in this._toggles){n=!this._toggles[o];}n=(n)?1:0;if(n){this._show();}else{p=m(this._hide);}this._toggles[o]=n;this.transition(b.Transition.toggles[o][n],p);};b.NodeList.prototype.toggleView=function(o,r){var n=this._nodes,p=0,q;while((q=n[p++])){b.one(q).toggleView(o,r);}return this;};b.mix(e.fx,{fadeOut:{opacity:0,duration:0.5,easing:"ease-out"},fadeIn:{opacity:1,duration:0.5,easing:"ease-in"},sizeOut:{height:0,width:0,duration:0.75,easing:"ease-out"},sizeIn:{height:function(n){return n.get("scrollHeight")+"px";},width:function(n){return n.get("scrollWidth")+"px";},duration:0.5,easing:"ease-in",on:{start:function(){var n=this.getStyle("overflow");if(n!=="hidden"){this.setStyle("overflow","hidden");this._transitionOverflow=n;
}},end:function(){if(this._transitionOverflow){this.setStyle("overflow",this._transitionOverflow);}}}}});b.mix(e.toggles,{size:["sizeIn","sizeOut"],fade:["fadeOut","fadeIn"]});},"@VERSION@",{requires:["node-base"]});YUI.add("transition-timer",function(b){var a=b.Transition;b.mix(a.prototype,{_start:function(){if(a.useNative){this._runNative();}else{this._runTimer();}},_runTimer:function(){var c=this;c._initAttrs();a._running[b.stamp(c)]=c;c._startTime=new Date();a._startTimer();},_endTimer:function(){var c=this;delete a._running[b.stamp(c)];c._startTime=null;},_runFrame:function(){var c=new Date()-this._startTime;this._runAttrs(c);},_runAttrs:function(e){var o=this,n=o._node,u=o._config,f=b.stamp(n),m=a._nodeAttrs[f],h=a.behaviors,l=false,g=false,v,w,j,q,c,s,r,k,p;for(w in m){j=m[w];if((j&&j.transition===o)){r=j.duration;s=j.delay;c=(e-s)/1000;k=e;v={type:"propertyEnd",propertyName:w,config:u,elapsedTime:c};q=(p in h&&"set" in h[p])?h[p].set:a.DEFAULT_SETTER;l=(k>=r);if(k>r){k=r;}if(!s||e>=s){q(o,w,j.from,j.to,k-s,r-s,j.easing,j.unit);if(l){delete m[w];o._count--;if(u[w]&&u[w].on&&u[w].on.end){u[w].on.end.call(n,v);}n.fire("transition:propertyEnd",v);if(!g&&o._count<=0){g=true;o._end(c);o._endTimer();}}}}}},_initAttrs:function(){var j=this,e=a.behaviors,l=b.stamp(j._node),q=a._nodeAttrs[l],d,i,k,n,g,c,m,o,p,f,h;for(c in q){d=q[c];if(q.hasOwnProperty(c)&&(d&&d.transition===j)){i=d.duration*1000;k=d.delay*1000;n=d.easing;g=d.value;if(c in j._node._node.style||c in b.DOM.CUSTOM_STYLES){f=(c in e&&"get" in e[c])?e[c].get(j,c):a.DEFAULT_GETTER(j,c);o=a.RE_UNITS.exec(f);m=a.RE_UNITS.exec(g);f=o?o[1]:f;h=m?m[1]:g;p=m?m[2]:o?o[2]:"";if(!p&&a.RE_DEFAULT_UNIT.test(c)){p=a.DEFAULT_UNIT;}if(typeof n==="string"){if(n.indexOf("cubic-bezier")>-1){n=n.substring(13,n.length-1).split(",");}else{if(a.easings[n]){n=a.easings[n];}}}d.from=Number(f);d.to=Number(h);d.unit=p;d.easing=n;d.duration=i+k;d.delay=k;}else{delete q[c];j._count--;}}}},destroy:function(){this.detachAll();this._node=null;}},true);b.mix(b.Transition,{_runtimeAttrs:{},RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",intervalTime:20,behaviors:{left:{get:function(d,c){return b.DOM._getAttrOffset(d._node._node,c);}}},DEFAULT_SETTER:function(f,g,i,j,l,e,h,k){i=Number(i);j=Number(j);var d=f._node,c=a.cubicBezier(h,l/e);c=i+c[0]*(j-i);if(g in d._node.style||g in b.DOM.CUSTOM_STYLES){k=k||"";d.setStyle(g,c+k);}else{if(d._node.attributes[g]){d.setAttribute(g,c);}else{d.set(g,c);}}},DEFAULT_GETTER:function(e,c){var d=e._node,f="";if(c in d._node.style||c in b.DOM.CUSTOM_STYLES){f=d.getComputedStyle(c);}else{if(d._node.attributes[c]){f=d.getAttribute(c);}else{f=d.get(c);}}return f;},_startTimer:function(){if(!a._timer){a._timer=setInterval(a._runFrame,a.intervalTime);}},_stopTimer:function(){clearInterval(a._timer);a._timer=null;},_runFrame:function(){var c=true,d;for(d in a._running){if(a._running[d]._runFrame){c=false;a._running[d]._runFrame();}}if(c){a._stopTimer();}},cubicBezier:function(s,m){var z=0,f=0,w=s[0],e=s[1],v=s[2],d=s[3],u=1,c=0,r=u-3*v+3*w-z,q=3*v-6*w+3*z,o=3*w-3*z,n=z,l=c-3*d+3*e-f,k=3*d-6*e+3*f,j=3*e-3*f,i=f,h=(((r*m)+q)*m+o)*m+n,g=(((l*m)+k)*m+j)*m+i;return[h,g];},easings:{ease:[0.25,0,1,0.25],linear:[0,0,1,1],"ease-in":[0.42,0,1,1],"ease-out":[0,0,0.58,1],"ease-in-out":[0.42,0,0.58,1]},_running:{},_timer:null,RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},true);a.behaviors.top=a.behaviors.bottom=a.behaviors.right=a.behaviors.left;b.Transition=a;},"@VERSION@",{requires:["transition-native","node-style"]});YUI.add("transition",function(a){},"@VERSION@",{use:["transition-native","transition-timer"]});