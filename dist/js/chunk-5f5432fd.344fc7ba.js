(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f5432fd"],{"2db4":function(t,a,e){"use strict";e("a9e3"),e("ca71");var o=e("a9ad"),s=e("f2e7"),i=e("fe6c"),r=e("58df"),n=e("d9bd");a["a"]=Object(r["a"])(o["a"],s["a"],Object(i["b"])(["absolute","top","bottom","left","right"])).extend({name:"v-snackbar",props:{multiLine:Boolean,timeout:{type:Number,default:6e3},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--active":this.isActive,"v-snack--absolute":this.absolute,"v-snack--bottom":this.bottom||!this.top,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--top":this.top,"v-snack--vertical":this.vertical}}},watch:{isActive:function(){this.setTimeout()}},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(n["d"])("auto-height",this)},mounted:function(){this.setTimeout()},methods:{setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout),this.isActive&&this.timeout&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),this.timeout))}},render:function(t){return t("transition",{attrs:{name:"v-snack-transition"}},[this.isActive&&t("div",{staticClass:"v-snack",class:this.classes,on:this.$listeners},[t("div",this.setBackgroundColor(this.color,{staticClass:"v-snack__wrapper",attrs:{role:"alert"}}),[t("div",{staticClass:"v-snack__content"},this.$slots.default)])])])}})},ca71:function(t,a,e){},d3a2:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("page-title-bar"),e("v-container",{attrs:{fluid:""}},[e("v-row",{staticClass:"mt-0"},[e("app-card",{attrs:{colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ",customClasses:"mb-0 mt-0"}},[e("h3",[t._v("Comprobantes de Pago")]),e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers_comprobantes,items:t.array_comprobantes,"item-key":"name",loading:t.loader,"loading-text":"Cargando... Espere"},scopedSlots:t._u([{key:"item",fn:function(a){return[e("tr",[e("td",{staticClass:"text-right"},[e("a",{attrs:{href:t.redirectRMT+t.sur4+"/contabilidad/ordenPago/GeneratePdf/idOrden/"+a.item.id_orden_pago,target:"_blank"}},[t._v(t._s(a.item.id_comprobante_pago))])]),e("td",[t._v(t._s(a.item.descripcion))]),e("td",{staticClass:"text-right"},[t._v("$ "+t._s(t.formatPrice(a.item.importe)))]),e("td",{staticClass:"text-center"},[t._v(t._s(t.formatDate(a.item.log)))]),e("td",[t._v(t._s(a.item.nombre_agencia))]),e("td",[t._v(t._s(a.item.nombre_usuario))]),e("td",{staticClass:"text-right"},[t._v(t._s(a.item.comision))]),e("td",[e("v-chip",{attrs:{color:t.getEstatus(a.item.estatus,"color"),dark:""}},[t._v(t._s(t.getEstatus(a.item.estatus,"estatus")))])],1),e("td",{staticClass:"text-center"},[e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(o){var s=o.on;return[1==a.item.facturacion?e("a",t._g({staticStyle:{color:"black","padding-right":"5px"},attrs:{href:t.redirectRMT+"sur4test/facturacionCfdi/factura/idrecibo/"+a.item.id_comprobante_pago+"/tipo/comprobante",target:"_blank"}},s),[e("v-icon",[t._v("fas fa-file-alt")])],1):t._e()]}}],null,!0)},[e("span",[t._v("Facturar Comprobante")])])],1)])]}}])}),e("v-snackbar",{attrs:{bottom:!0,right:!0,color:"success",timeout:1e3},model:{value:t.snackbar,callback:function(a){t.snackbar=a},expression:"snackbar"}},[t._v(" "+t._s(t.text)+" "),e("v-btn",{attrs:{color:"white",text:""},on:{click:function(a){t.snackbar=!1}}},[t._v("Cerrar")])],1)],1)],1)],1)],1)},s=[],i=(e("b680"),e("d3b7"),e("ac1f"),e("25f0"),e("5319"),e("c1df")),r=e.n(i),n={data:function(){return{loader:!1,array_comprobantes:[],headers_comprobantes:[{text:"Folio",value:"id_comprobante_pago",sortable:!0},{text:"Tipo de Pago",value:"descripcion",sortable:!0},{text:"Importe",value:"importe",sortable:!0},{text:"Fecha Creación",value:"log",sortable:!0},{text:"Agencia",value:"nombre_agencia",sortable:!0},{text:"Usuario Elaboró",value:"nombre_usuario",sortable:!0},{text:"% Comisión",value:"comision",sortable:!0},{text:"Estatus",value:"estatus",sortable:!0},{text:"Facturación",value:"actions",sortable:!1}],snackbar:!1,text:"Comprobante Facturado"}},methods:{loadComprobantes:function(){this.loader=!0,this.$http.get("https://www.rutamayatravel.com/"+this.sur4+"/contabilidad/comprobantesPago/obtenerComprobantesPago").then((function(t){this.array_comprobantes=t.data,this.loader=!1}),(function(){console.log("Error")}))},formatDate:function(t){return r()(t).format("DD/MM/YYYY")},formatPrice:function(t){var a=Math.ceil(t),e=(a/1).toFixed(2).replace(",",".");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},getEstatus:function(t,a){var e="";switch(t){case"C":e="estatus"==a?"Cancelado":"red";break;case"AP":e="estatus"==a?"Aplicado":"orange";break;case"P":default:e="estatus"==a?"Pagado":"green";break}return e},ponerFacturado:function(t){this.snackbar=!0,console.log(t)}},computed:{},mounted:function(){this.loadComprobantes()}},c=n,l=e("2877"),u=e("6544"),d=e.n(u),m=e("8336"),b=e("cc20"),v=e("a523"),h=e("8fea"),p=e("132d"),f=e("0fd9"),_=e("2db4"),g=e("3a2f9"),k=Object(l["a"])(c,o,s,!1,null,null,null);a["default"]=k.exports;d()(k,{VBtn:m["a"],VChip:b["a"],VContainer:v["a"],VDataTable:h["a"],VIcon:p["a"],VRow:f["a"],VSnackbar:_["a"],VTooltip:g["a"]})}}]);