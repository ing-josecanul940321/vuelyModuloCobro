(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5cf826a2"],{"2db4":function(t,e,a){"use strict";a("a9e3"),a("ca71");var i=a("a9ad"),s=a("f2e7"),n=a("fe6c"),c=a("58df"),o=a("d9bd");e["a"]=Object(c["a"])(i["a"],s["a"],Object(n["b"])(["absolute","top","bottom","left","right"])).extend({name:"v-snackbar",props:{multiLine:Boolean,timeout:{type:Number,default:6e3},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--active":this.isActive,"v-snack--absolute":this.absolute,"v-snack--bottom":this.bottom||!this.top,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--top":this.top,"v-snack--vertical":this.vertical}}},watch:{isActive:function(){this.setTimeout()}},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(o["d"])("auto-height",this)},mounted:function(){this.setTimeout()},methods:{setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout),this.isActive&&this.timeout&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),this.timeout))}},render:function(t){return t("transition",{attrs:{name:"v-snack-transition"}},[this.isActive&&t("div",{staticClass:"v-snack",class:this.classes,on:this.$listeners},[t("div",this.setBackgroundColor(this.color,{staticClass:"v-snack__wrapper",attrs:{role:"alert"}}),[t("div",{staticClass:"v-snack__content"},this.$slots.default)])])])}})},"97eb":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("page-title-bar"),a("v-container",{attrs:{fluid:""}},[a("v-card-title",[t._v(" Catálogo de Cuentas "),a("v-spacer"),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.cuentas,"sort-by":"id_cuenta",loading:t.loader,"loading-text":"Cargando... Espere",search:t.search},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Catálogo de Cuentas")]),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{attrs:{label:"Cuenta"},model:{value:t.editedItem.cuenta,callback:function(e){t.$set(t.editedItem,"cuenta",e)},expression:"editedItem.cuenta"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{attrs:{label:"Descripción"},model:{value:t.editedItem.descripcion,callback:function(e){t.$set(t.editedItem,"descripcion",e)},expression:"editedItem.descripcion"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-select",{attrs:{items:t.itemNaturaleza,"item-text":"valor","item-value":"naturaleza",label:"Naturaleza"},model:{value:t.editedItem.naturaleza,callback:function(e){t.$set(t.editedItem,"naturaleza",e)},expression:"editedItem.naturaleza"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-select",{attrs:{items:t.itemTipo,"item-text":"valor","item-value":"tipo",label:"Tipo"},model:{value:t.editedItem.tipo,callback:function(e){t.$set(t.editedItem,"tipo",e)},expression:"editedItem.tipo"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-select",{attrs:{items:t.itemNivel,label:"Nivel"},model:{value:t.editedItem.nivel,callback:function(e){t.$set(t.editedItem,"nivel",e)},expression:"editedItem.nivel"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-text-field",{attrs:{label:"Cuenta Mayor"},model:{value:t.editedItem.may,callback:function(e){t.$set(t.editedItem,"may",e)},expression:"editedItem.may"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-text-field",{attrs:{label:"Afecta"},model:{value:t.editedItem.afecta,callback:function(e){t.$set(t.editedItem,"afecta",e)},expression:"editedItem.afecta"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancelar")]),t.editedItem.id_cuenta?a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.save(t.editedItem.id_cuenta)}}},[t._v(t._s(t.formTitle))]):a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.save(0)}}},[t._v(t._s(t.formTitle))])],1)],1)],1)],1)]},proxy:!0},{key:"item",fn:function(e){return[a("tr",[a("td",{staticClass:"text-right"},[t._v(t._s(e.item.id_cuenta))]),a("td",[t._v(t._s(e.item.cuenta))]),a("td",[t._v(t._s(e.item.descripcion))]),a("td",["D"==e.item.naturaleza?a("span",[t._v("Deudora")]):t._e(),"A"==e.item.naturaleza?a("span",[t._v("Acreedora")]):t._e()]),a("td",[t._v(t._s(t.ObtenerTipoCuenta(e.item.tipo)))]),a("td",{staticClass:"text-right"},[t._v(t._s(e.item.nivel))]),a("td",{staticClass:"text-right"},[t._v(t._s(e.item.may))]),a("td",[t._v(t._s(e.item.afecta))]),a("td",{staticClass:"text-center"},[t._v(t._s(t.$formatDate(e.item.fecha_creacion)))]),a("td",[a("v-btn",{staticClass:"ma-2",attrs:{outlined:"",fab:"",small:"",color:"success"},on:{click:function(a){return t.editItem(e.item)}}},[a("v-icon",[t._v("mdi-pencil")])],1)],1)])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("Reset")])]},proxy:!0}])}),a("v-snackbar",{attrs:{color:"green","multi-line":"multi-line",timeout:3e3,right:!0,bottom:!0},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.text_snackbar)+" "),a("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.snackbar=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1)],1)],1)},s=[],n=(a("c975"),a("a434"),{data:function(){return{dialog:!1,loader:!1,snackbar:!1,search:"",text_snackbar:"",headers:[{text:"Folio",sortable:!0,value:"id_cuenta"},{text:"Cuenta",value:"cuenta"},{text:"Descripción",value:"descripcion"},{text:"Naturaleza",value:"naturaleza"},{text:"Tipo",value:"tipo"},{text:"Nivel",value:"nivel"},{text:"Cuenta Mayor",value:"may"},{text:"Afecta",value:"afecta"},{text:"Fecha Creación",value:"fecha_creacion"},{text:"Acciones",value:"actions",sortable:!1}],cuentas:[],editedIndex:-1,editedItem:{id_cuenta:"",cuenta:"",descripcion:"",naturaleza:"",tipo:"",nivel:4,may:"",afecta:""},defaultItem:{cuenta:"",descripcion:"",naturaleza:"",tipo:"",nivel:4,may:"",afecta:""},itemTipo:[{valor:"Activo",tipo:"A"},{valor:"Pasivo",tipo:"P"},{valor:"Orden",tipo:"O"},{valor:"Balance",tipo:"B"},{valor:"Resultado",tipo:"R"}],itemNaturaleza:[{valor:"Deudora",naturaleza:"D"},{valor:"Acreedora",naturaleza:"A"}],itemNivel:["1","4"]}},computed:{formTitle:function(){return-1===this.editedIndex?"Nueva Cuenta":"Editar"}},watch:{dialog:function(t){t||this.close()}},created:function(){this.initialize()},methods:{initialize:function(){this.loader=!0,this.$http.get("https://www.rutamayatravel.com/"+this.sur4+"/contabilidad/contCatalogoCtas/obtenerCuentas").then((function(t){this.cuentas=t.data,this.loader=!1}),(function(){console.log("Error")}))},editItem:function(t){this.editedIndex=this.cuentas.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){var e=this.cuentas.indexOf(t);confirm("Are you sure you want to delete this item?")&&this.cuentas.splice(e,1)},close:function(){var t=this;this.dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},save:function(t){if(this.editedIndex>-1){var e=this.editedIndex;this.$http.post("https://www.rutamayatravel.com/"+this.sur4+"/contabilidad/contCatalogoCtas/update/id/"+t,{CatalogoCtas:this.editedItem},{emulateJSON:!0}).then((function(t){this.editedItem=t.body,Object.assign(this.cuentas[e],this.editedItem),this.close(),this.text_snackbar="Datos actualizados;",this.snackbar=!0}))}else this.cuentas.push(this.editedItem),this.close()},ObtenerTipoCuenta:function(t){var e="";switch(t){case"A":e="Activo";break;case"P":e="Pasivo";break;case"O":e="Orden";break;case"B":e="Balance";break;case"R":e="Resultado";break;default:e="Activo";break}return e}}}),c=n,o=a("2877"),l=a("6544"),r=a.n(l),d=a("8336"),u=a("b0af"),v=a("99d9"),m=a("62ad"),h=a("a523"),f=a("8fea"),b=a("169a"),p=a("132d"),k=a("0fd9"),x=a("b974"),_=a("2db4"),I=a("2fa4"),C=a("8654"),g=a("71d9"),w=a("2a7f"),T=Object(o["a"])(c,i,s,!1,null,null,null);e["default"]=T.exports;r()(T,{VBtn:d["a"],VCard:u["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VCol:m["a"],VContainer:h["a"],VDataTable:f["a"],VDialog:b["a"],VIcon:p["a"],VRow:k["a"],VSelect:x["a"],VSnackbar:_["a"],VSpacer:I["a"],VTextField:C["a"],VToolbar:g["a"],VToolbarTitle:w["b"]})},ca71:function(t,e,a){}}]);