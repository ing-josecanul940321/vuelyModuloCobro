(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d398"],{f71b:function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("page-title-bar"),t("v-container",[t("v-card",{staticClass:"pa-5"},[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.busqueda,expression:"busqueda"}],attrs:{type:"text",name:"city",list:"cityname"},domProps:{value:e.busqueda},on:{input:function(a){a.target.composing||(e.busqueda=a.target.value)}}}),e._v(" "+e._s(e.busqueda)+" "),t("datalist",{attrs:{id:"cityname"}},e._l(e.fruits,(function(e,a){return t("option",{key:a,domProps:{value:e}})})),0)]),t("v-col",{attrs:{cols:"6"}},[t("h3",[e._v("Filtros")])]),t("v-col",{attrs:{cols:"6"}},[t("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(a){e.search=a},expression:"search"}})],1)],1),t("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.array_proximos_pagos,search:e.search,"item-key":"name",loading:e.loader,"loading-text":"Cargando... Espere"}})],1)],1)],1)},s=[],o=(t("99af"),t("b680"),t("d3b7"),t("ac1f"),t("25f0"),t("5319"),t("1276"),t("3835")),i={data:function(){return{busqueda:"",fruits:["Apples","Apricots","Avocado","Bananas","Blueberries","Blackberries","Boysenberries","Bread fruit","Cantaloupes (cantalope)","Cherries","Cranberries","Cucumbers","Currants","Dates","Eggplant","Figs","Grapes","Grapefruit","Guava","Honeydew melons","Huckleberries","Kiwis","Kumquat","Lemons","Limes","Mangos","Mulberries","Muskmelon","Nectarines","Olives","Oranges","Papaya","Peaches","Pears","Persimmon","Pineapple","Plums","Pomegranate","Raspberries","Rose Apple","Starfruit","Strawberries","Tangerines","Tomatoes","Watermelons","Zucchini"],loader:!0,array_proximos_pagos:[],search:"",headers:[{text:"Bloqueo",align:"start",value:"id_bloqueo",sortable:!0},{text:"Importe",value:"importe",sortable:!0},{text:"Hotel",value:"id_hotel",sortable:!0},{text:"Pago",value:"pago",sortable:!0},{text:"Inico",value:"fecha_inicio",sortable:!0},{text:"Final",value:"fecha_final",sortable:!0},{text:"Titulo",value:"titulo",sortable:!0}]}},mounted:function(){this.getProjectData()},methods:{formatDate:function(e){if(!e)return null;var a=e.split("-"),t=Object(o["a"])(a,3),r=t[0],s=t[1],i=t[2];return"".concat(i,"/").concat(s,"/").concat(r)},formatPrice:function(e){var a=Math.ceil(e),t=(a/1).toFixed(2).replace(",",".");return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},getProjectData:function(){this.loader=!0,this.$http.get("https://www.rutamayatravel.com/sur4/admin/apivue/listaProximosPagosAllBloqueos").then((function(e){this.array_proximos_pagos=e.data,console.log(this.array_proximos_pagos),this.loader=!1}),(function(){console.log("Error")}))}}},l=i,n=t("2877"),u=t("6544"),c=t.n(u),d=t("b0af"),p=t("62ad"),m=t("a523"),b=t("8fea"),v=t("0fd9"),f=t("8654"),g=Object(n["a"])(l,r,s,!1,null,null,null);a["default"]=g.exports;c()(g,{VCard:d["a"],VCol:p["a"],VContainer:m["a"],VDataTable:b["a"],VRow:v["a"],VTextField:f["a"]})}}]);