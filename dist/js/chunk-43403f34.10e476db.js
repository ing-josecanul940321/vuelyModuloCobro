(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43403f34"],{"0fd9":function(t,e,n){"use strict";n("99af"),n("4160"),n("caad"),n("13d5"),n("4ec9"),n("b64b"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0");var i=n("ade3"),a=n("5530"),s=(n("4b85"),n("2b0e")),r=n("d9f7"),o=n("80d2"),c=["sm","md","lg","xl"],u=["start","end","center"];function l(t,e){return c.reduce((function(n,i){return n[t+Object(o["x"])(i)]=e(),n}),{})}var d=function(t){return[].concat(u,["baseline","stretch"]).includes(t)},h=l("align",(function(){return{type:String,default:null,validator:d}})),g=function(t){return[].concat(u,["space-between","space-around"]).includes(t)},v=l("justify",(function(){return{type:String,default:null,validator:g}})),f=function(t){return[].concat(u,["space-between","space-around","stretch"]).includes(t)},p=l("alignContent",(function(){return{type:String,default:null,validator:f}})),m={align:Object.keys(h),justify:Object.keys(v),alignContent:Object.keys(p)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,n){var i=b[t];if(null!=n){if(e){var a=e.replace(t,"");i+="-".concat(a)}return i+="-".concat(n),i.toLowerCase()}}var w=new Map;e["a"]=s["default"].extend({name:"v-row",functional:!0,props:Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},h,{justify:{type:String,default:null,validator:g}},v,{alignContent:{type:String,default:null,validator:f}},p),render:function(t,e){var n=e.props,a=e.data,s=e.children,o="";for(var c in n)o+=String(n[c]);var u=w.get(o);return u||function(){var t,e;for(e in u=[],m)m[e].forEach((function(t){var i=n[t],a=y(e,t,i);a&&u.push(a)}));u.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(i["a"])(t,"align-".concat(n.align),n.align),Object(i["a"])(t,"justify-".concat(n.justify),n.justify),Object(i["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),w.set(o,u)}(),t(n.tag,Object(r["a"])(a,{staticClass:"row",class:u}),s)}})},"17b3":function(t,e,n){},4665:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("page-title-bar"),n("v-container",{attrs:{fluid:""}},[n("div",{staticClass:"text-center"},[1==t.loader?n("v-progress-circular",{attrs:{size:150,width:17,color:"purple",indeterminate:""}}):t._e()],1),n("div",{directives:[{name:"show",rawName:"v-show",value:0==t.loader,expression:"loader == false"}]},[n("v-row",t._l(t.busquedaAgencia,(function(e,i){return n("div",{directives:[{name:"show",rawName:"v-show",value:(t.pag-1)*t.NUM_RESULTS<=i&&t.pag*t.NUM_RESULTS>i,expression:"(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index"}],key:i,staticClass:"col-12 col-sm-6 col-md-4"},[n("v-lazy",{attrs:{options:{threshold:1},transition:"fade-transition","min-height":"0"}},[n("app-card",[n("div",{staticClass:"user-list-content"},[n("div",{staticClass:"text-center"},[n("h3",{staticClass:"fw-bold"},[t._v(t._s(e.nombre_agencia))]),n("p",[t._v(t._s(e.contacto))]),n("p",[t._v(t._s(e.email_agencia))])]),n("div",{staticClass:"text-center"},[n("router-link",{attrs:{to:"/agencias/"+e.id_agencia}},[n("v-btn",{staticClass:"light-blue darken-4 white--text",attrs:{rounded:"",dark:""}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v("Ver más ")],1)],1)],1)])])],1)],1)})),0),n("v-pagination",{attrs:{length:t.redondearArriba(t.busquedaAgencia.length/t.NUM_RESULTS),"total-visible":5},model:{value:t.pag,callback:function(e){t.pag=e},expression:"pag"}})],1)])],1)},a=[],s=(n("4de4"),n("caad"),n("b680"),n("d3b7"),n("ac1f"),n("25f0"),n("2532"),n("5319"),{data:function(){return{loader:!0,headers:[{text:"Dessert (100g serving)",align:"start",sortable:!1,value:"name"},{text:"Calories",value:"calories"}],array_agencias:[],busqueda:"",NUM_RESULTS:9,pag:1,id:this.$route.params.id}},mounted:function(){this.loadAgencias()},methods:{formatPrice:function(t){var e=Math.ceil(t),n=(e/1).toFixed(2).replace(",",".");return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},redondearArriba:function(t){var e=Math.ceil(t);return e},loadAgencias:function(){this.loader=!0,this.$http.get("https://www.rutamayatravel.com/sur4/admin/apivue/listadoAgenciasConBloqueo").then((function(t){this.array_agencias=t.data,this.array_agencias=t.data,this.loader=!1}),(function(){console.log("Error")}))}},computed:{busquedaAgencia:function(){var t=this;return this.array_agencias.filter((function(e){return e.nombre_agencia.toLowerCase().includes(t.busqueda.toLowerCase())||e.municipio_agencia.toLowerCase().includes(t.busqueda.toLowerCase())||e.tel_agencia.toLowerCase().includes(t.busqueda.toLowerCase())||e.email_agencia.toLowerCase().includes(t.busqueda.toLowerCase())||e.contacto.toLowerCase().includes(t.busqueda.toLowerCase())||e.id_agencia.toLowerCase().includes(t.busqueda.toLowerCase())}))}}}),r=s,o=n("2877"),c=n("6544"),u=n.n(c),l=n("8336"),d=n("a523"),h=n("132d"),g=(n("a9e3"),n("f2e7")),v=n("90a2"),f=n("58df"),p=n("80d2"),m=Object(f["a"])(g["a"]).extend({name:"VLazy",directives:{intersect:v["a"]},props:{minHeight:[Number,String],options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},tag:{type:String,default:"div"},transition:{type:String,default:"fade-transition"}},computed:{styles:function(){return{minHeight:parseInt(this.minHeight)?Object(p["e"])(this.minHeight):this.minHeight}}},methods:{genContent:function(){var t=Object(p["n"])(this);if(!this.transition)return t;var e=[];return this.isActive&&e.push(t),this.$createElement("transition",{props:{name:this.transition}},e)},onObserve:function(t,e,n){this.isActive||(this.isActive=n)}},render:function(t){return t(this.tag,{staticClass:"v-lazy",attrs:this.$attrs,directives:[{name:"intersect",value:{handler:this.onObserve,options:this.options}}],on:this.$listeners,style:this.styles},[this.genContent()])}}),b=(n("99af"),n("d81d"),n("2909")),y=n("5530"),w=(n("17b3"),n("9d26")),_=n("dc22"),C=n("a9ad"),x=n("7560"),j=Object(f["a"])(C["a"],x["a"]).extend({name:"v-pagination",directives:{Resize:_["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(y["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10),e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var n=e%2===0?1:0,i=Math.floor(e/2),a=this.length-i+1+n;if(this.value>i&&this.value<a){var s=this.value-i+2,r=this.value+i-2-n;return[1,"..."].concat(Object(b["a"])(this.range(s,r)),["...",this.length])}if(this.value===i){var o=this.value+i-1-n;return[].concat(Object(b["a"])(this.range(1,o)),["...",this.length])}if(this.value===a){var c=this.value-i+1;return[1,"..."].concat(Object(b["a"])(this.range(c,this.length)))}return[].concat(Object(b["a"])(this.range(1,i)),["..."],Object(b["a"])(this.range(a,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var n=[];t=t>0?t:1;for(var i=t;i<=e;i++)n.push(i);return n},genIcon:function(t,e,n,i){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":n},attrs:{type:"button"},on:n?{}:{click:i}},[t(w["a"],[e])])])},genItem:function(t,e){var n=this,i=e===this.value&&(this.color||"primary");return t("button",this.setBackgroundColor(i,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button"},on:{click:function(){return n.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(n,i){return t("li",{key:i},[isNaN(Number(n))?t("span",{class:"v-pagination__more"},[n.toString()]):e.genItem(t,n)])}))}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next)];return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}}),S=n("490a"),O=n("0fd9"),L=Object(o["a"])(r,i,a,!1,null,null,null);e["default"]=L.exports;u()(L,{VBtn:l["a"],VContainer:d["a"],VIcon:h["a"],VLazy:m,VPagination:j,VProgressCircular:S["a"],VRow:O["a"]})}}]);