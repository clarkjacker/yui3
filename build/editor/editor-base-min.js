YUI.add("editor-base",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{frame:null,initializer:function(){var C=new B.Frame({designMode:true,title:A.STRINGS.title,use:A.USE,dir:this.get("dir"),extracss:this.get("extracss"),linkedcss:this.get("linkedcss"),host:this}).plug(B.Plugin.ExecCommand);C.after("ready",B.bind(this._afterFrameReady,this));C.addTarget(this);this.frame=C;this.publish("nodeChange",{emitFacade:true,bubbles:true,defaultFn:this._defNodeChangeFn});this.plug(B.Plugin.EditorPara);},destructor:function(){this.frame.destroy();this.detachAll();},copyStyles:function(F,E){if(F.test("a")){return;}var C=["color","fontSize","fontFamily","backgroundColor","fontStyle"],D={};B.each(C,function(G){D[G]=F.getStyle(G);});if(F.ancestor("b,strong")){D.fontWeight="bold";}if(F.ancestor("u")){if(!D.textDecoration){D.textDecoration="underline";}}E.setStyles(D);},_lastBookmark:null,_defNodeChangeFn:function(T){var M=(new Date()).getTime();var E=this.getInstance(),R;if(B.UA.ie){R=E.config.doc.selection.createRange();this._lastBookmark=R.getBookmark();}switch(T.changedType){case"keydown":E.Selection.cleanCursor();break;case"enter":if(B.UA.webkit){if(T.changedEvent.shiftKey){this.execCommand("insertbr");T.changedEvent.preventDefault();}}break;case"tab":if(!T.changedNode.test("li, li *")&&!T.changedEvent.shiftKey){T.changedEvent.preventDefault();var R=new E.Selection();R.setCursor();var D=R.getCursor();D.insert(A.TABKEY,"before");R.focusCursor();}break;case"enter-up":var C=((this._lastPara)?this._lastPara:T.changedNode),V=C.one("br.yui-cursor");if(this._lastPara){delete this._lastPara;}if(V){if(V.previous()||V.next()){V.remove();}}if(!C.test("p")){var L=C.ancestor("p");if(L){C=L;L=null;}}if(C.test("p")){var N=C.previous(),Q,H,J=false;if(N){Q=N.one(":last-child");while(!J){if(Q){H=Q.one(":last-child");if(H){Q=H;}else{J=true;}}else{J=true;}}if(Q){this.copyStyles(Q,C);}}}break;}if(B.UA.gecko){if(T.changedNode&&!T.changedNode.test("p")){var O=T.changedNode.ancestor("p");if(O){this._lastPara=O;}}}var G=this.getDomPath(T.changedNode,false),P={},S,K,U=[],I="",W="";if(T.commands){P=T.commands;}B.each(G,function(c){var Y=c.tagName.toLowerCase(),d=A.TAG2CMD[Y];if(d){P[d]=1;}var b=c.currentStyle||c.style;if((""+b.fontWeight)=="bold"){P.bold=1;}if(b.fontStyle=="italic"){P.italic=1;}if(b.textDecoration=="underline"){P.underline=1;}if(b.textDecoration=="line-through"){P.strikethrough=1;}var e=E.one(c);if(e.getStyle("fontFamily")){var a=e.getStyle("fontFamily").split(",")[0].toLowerCase();if(a){S=a;}if(S){S=S.replace(/'/g,"").replace(/"/g,"");}}K=e.getStyle("fontSize");var Z=c.className.split(" ");B.each(Z,function(f){if(f!==""&&(f.substr(0,4)!=="yui_")){U.push(f);}});I=A.FILTER_RGB(e.getStyle("color"));var X=A.FILTER_RGB(b.backgroundColor);if(X!=="transparent"){if(X!==""){W=X;}}});T.dompath=E.all(G);T.classNames=U;T.commands=P;if(!T.fontFamily){T.fontFamily=S;}if(!T.fontSize){T.fontSize=K;}if(!T.fontColor){T.fontColor=I;}if(!T.backgroundColor){T.backgroundColor=W;}var F=(new Date()).getTime();},getDomPath:function(E,C){var G=[],D,F=this.frame.getInstance();D=F.Node.getDOMNode(E);while(D!==null){if((D===F.config.doc.documentElement)||(D===F.config.doc)||!D.tagName){D=null;break;}if(!F.DOM.inDoc(D)){D=null;break;}if(D.nodeName&&D.nodeType&&(D.nodeType==1)){G.push(D);}if(D==F.config.doc.body){D=null;break;}D=D.parentNode;}if(G.length===0){G[0]=F.config.doc.body;}if(C){return F.all(G.reverse());}else{return G.reverse();}},_afterFrameReady:function(){var C=this.frame.getInstance();this.frame.on("dom:mouseup",B.bind(this._onFrameMouseUp,this));this.frame.on("dom:mousedown",B.bind(this._onFrameMouseDown,this));this.frame.on("dom:keydown",B.bind(this._onFrameKeyDown,this));if(B.UA.ie){this.frame.on("dom:activate",B.bind(this._onFrameActivate,this));this.frame.on("dom:keyup",B.throttle(B.bind(this._onFrameKeyUp,this),800));this.frame.on("dom:keypress",B.throttle(B.bind(this._onFrameKeyPress,this),800));}else{this.frame.on("dom:keyup",B.bind(this._onFrameKeyUp,this));this.frame.on("dom:keypress",B.bind(this._onFrameKeyPress,this));}C.Selection.filter();this.fire("ready");},_onFrameActivate:function(){if(this._lastBookmark){var E=this.getInstance(),D=E.config.doc.selection.createRange(),C=D.moveToBookmark(this._lastBookmark);D.select();this._lastBookmark=null;}},_onFrameMouseUp:function(C){this.fire("nodeChange",{changedNode:C.frameTarget,changedType:"mouseup",changedEvent:C.frameEvent});},_onFrameMouseDown:function(C){this.fire("nodeChange",{changedNode:C.frameTarget,changedType:"mousedown",changedEvent:C.frameEvent});},_currentSelection:null,_currentSelectionTimer:null,_currentSelectionClear:null,_onFrameKeyDown:function(E){if(!this._currentSelection){if(this._currentSelectionTimer){this._currentSelectionTimer.cancel();}this._currentSelectionTimer=B.later(850,this,function(){this._currentSelectionClear=true;});var D=this.frame.getInstance(),C=new D.Selection(E);this._currentSelection=C;}else{var C=this._currentSelection;}var D=this.frame.getInstance(),C=new D.Selection();this._currentSelection=C;if(C&&C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keydown",changedEvent:E.frameEvent});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode],changedEvent:E.frameEvent});this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-down",changedEvent:E.frameEvent});}}},_onFrameKeyPress:function(D){var C=this._currentSelection;if(C&&C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keypress",changedEvent:D.frameEvent});if(A.NC_KEYS[D.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[D.keyCode]+"-press",changedEvent:D.frameEvent});}}},_onFrameKeyUp:function(D){var C=this._currentSelection;if(C&&C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keyup",selection:C,changedEvent:D.frameEvent});if(A.NC_KEYS[D.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[D.keyCode]+"-up",selection:C,changedEvent:D.frameEvent});
}}if(this._currentSelectionClear){this._currentSelectionClear=this._currentSelection=null;}},execCommand:function(G,I){var D=this.frame.execCommand(G,I),F=this.frame.getInstance(),E=new F.Selection(),C={},H={changedNode:E.anchorNode,changedType:"execcommand",nodes:D};switch(G){case"forecolor":H.fontColor=I;break;case"backcolor":H.backgroundColor=I;break;case"fontsize":H.fontSize=I;break;case"fontname":H.fontFamily=I;break;}C[G]=1;H.commands=C;this.fire("nodeChange",H);return D;},getInstance:function(){return this.frame.getInstance();},render:function(C){this.frame.set("content",this.get("content"));this.frame.render(C);return this;},focus:function(C){this.frame.focus(C);return this;},show:function(){this.frame.show();return this;},hide:function(){this.frame.hide();return this;},getContent:function(){var C="",D=this.getInstance();if(D&&D.Selection){C=D.Selection.unfilter();}C=C.replace(/ _yuid="([^>]*)"/g,"");return C;}},{TABKEY:'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',FILTER_RGB:function(E){if(E.toLowerCase().indexOf("rgb")!=-1){var H=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");var D=E.replace(H,"$1,$2,$3,$4,$5").split(",");if(D.length==5){var G=parseInt(D[1],10).toString(16);var F=parseInt(D[2],10).toString(16);var C=parseInt(D[3],10).toString(16);G=G.length==1?"0"+G:G;F=F.length==1?"0"+F:F;C=C.length==1?"0"+C:C;E="#"+G+F+C;}}return E;},TAG2CMD:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},NC_KEYS:{8:"backspace",9:"tab",13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete"},USE:["substitute","node","selector-css3","selection","stylesheet"],NAME:"editorBase",STRINGS:{title:"Rich Text Editor"},ATTRS:{content:{value:"<br>",setter:function(C){if(C.substr(0,1)==="\n"){C=C.substr(1);}if(C===""){C="<br>";}return this.frame.set("content",C);},getter:function(){return this.frame.get("content");}},dir:{writeOnce:true,value:"ltr"},linkedcss:{value:"",setter:function(C){if(this.frame){this.frame.set("linkedcss",C);}return C;}},extracss:{value:false,setter:function(C){if(this.frame){this.frame.set("extracss",C);}return C;}}}});B.EditorBase=A;},"@VERSION@",{requires:["base","frame","node","exec-command"],skinnable:false});