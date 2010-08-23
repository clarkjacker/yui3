YUI.add("transition",function(D){var E="transition:start",C="transition:end",A="transition:propertyEnd",B=D.Transition;D.mix(B.prototype,{_start:function(){if(B.useNative){this._runNative();}else{this._runTimer();}},_runTimer:function(){var F=this;F._initAttrs();F._node.fire(E,{type:E,config:F._config});B._running[D.stamp(F)]=F;F._startTime=new Date();B._startTimer();},_end:function(F){var G=this._duration*1000;if(F){this._runAttrs(G,G);}delete B._running[D.stamp(this)];this._running=false;this._startTime=null;},_runFrame:function(){var F=new Date()-this._startTime;this._runAttrs(F);},_runAttrs:function(J){var M=this,Q=M._runtimeAttr,I=B.behaviors,K=M._node,N=false,F=false,H,L,S,G,P,R,T,O;for(O in Q){if(Q[O].to){H=Q[O];R=H.duration;P=H.delay;S=J/1000;T=J;L=(O in I&&"set" in I[O])?I[O].set:B.DEFAULT_SETTER;N=(T>=R);if(T>R){T=R;}if(!M._skip[O]&&(!P||J>=P)){L(M,O,H.from,H.to,T-P,R-P,H.easing,H.unit);if(N){M._skip[O]=true;M._count--;K.fire(A,{type:A,elapsedTime:(J-P)/1000,propertyName:O,config:M._config});if(!F&&M._count<=0){F=true;M._end();K.fire(C,{type:C,elapsedTime:(J-P)/1000,config:M._config});}}}}}},_initAttrs:function(){var R={},S={},O=this._easing,M={},G=B.behaviors,T=this._attrs,K,L,I,F,Q,H,J;for(F in T){if(T.hasOwnProperty(F)){I=T[F];K=this._duration*1000;L=this._delay*1000;if(typeof I.value!=="undefined"){K=(("duration" in I)?I.duration:this._duration)*1000;L=(("delay" in I)?I.delay:this._delay)*1000;O=I.easing||O;I=I.value;}K=K||1;K+=L;if(typeof I==="function"){I=I.call(this._node,this._node);}H=(F in G&&"get" in G[F])?G[F].get(this,F):B.DEFAULT_GETTER(this,F);var P=B.RE_UNITS.exec(H);var N=B.RE_UNITS.exec(I);H=P?P[1]:H;J=N?N[1]:I;Q=N?N[2]:P?P[2]:"";if(!Q&&B.RE_DEFAULT_UNIT.test(F)){Q=B.DEFAULT_UNIT;}if(!H||!J){return;}if(typeof O==="string"){if(O.indexOf("cubic-bezier")>-1){O=O.substring(13,O.length-1).split(",");}else{if(B.easings[O]){O=B.easings[O];}}}M[F]={from:H,to:J,unit:Q,duration:K,delay:L,easing:O};if(K>this._totalDuration){this._totalDuration=K;}this._count++;}}this._skip={};this._runtimeAttr=M;},destroy:function(){this.detachAll();this._node=null;}},true);D.mix(D.Transition,{RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",intervalTime:20,behaviors:{left:{get:function(G,F){return D.DOM._getAttrOffset(G._node._node,F);}}},DEFAULT_SETTER:function(I,J,L,M,O,H,K,N){L=Number(L);M=Number(M);var G=I._node,F=B.cubicBezier(K,O/H);F=L+F[0]*(M-L);if(J in G._node.style||J in D.DOM.CUSTOM_STYLES){N=N||"";G.setStyle(J,F+N);}else{if(G._node.attributes[J]){G.setAttribute(J,F);}else{G.set(J,F);}}},DEFAULT_GETTER:function(H,F){var G=H._node,I="";if(F in G._node.style||F in D.DOM.CUSTOM_STYLES){I=G.getComputedStyle(F);}else{if(G._node.attributes[F]){I=G.getAttribute(F);}else{I=G.get(F);}}return I;},_startTimer:function(){if(!B._timer){B._timer=setInterval(B._runFrame,B.intervalTime);}},_stopTimer:function(){clearInterval(B._timer);B._timer=null;},_runFrame:function(){var F=true,G;for(G in B._running){if(B._running[G]._runFrame){F=false;B._running[G]._runFrame();}}if(F){B._stopTimer();}},cubicBezier:function(X,S){var b=0,L=0,a=X[0],K=X[1],Z=X[2],J=X[3],Y=1,I=0,W=Y-3*Z+3*a-b,V=3*Z-6*a+3*b,U=3*a-3*b,T=b,R=I-3*J+3*K-L,Q=3*J-6*K+3*L,P=3*K-3*L,O=L,N=(((W*S)+V)*S+U)*S+T,M=(((R*S)+Q)*S+P)*S+O;return[N,M];},easings:{ease:[0.25,0,1,0.25],linear:[0,0,1,1],"ease-in":[0.42,0,1,1],"ease-out":[0,0,0.58,1],"ease-in-out":[0.42,0,0.58,1]},_running:{},_timer:null,RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},true);B.behaviors.top=B.behaviors.bottom=B.behaviors.right=B.behaviors.left;D.Transition=B;},"@VERSION@",{requires:["transition-native","node-style"]});