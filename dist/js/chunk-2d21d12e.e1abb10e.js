(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d12e"],{d06b:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("page-title-bar"),a("v-container",{attrs:{fluid:""}},[a("v-row",{staticClass:"mt-0"},[a("app-card",{attrs:{colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ",customClasses:"mb-0 mt-0"}},[a("v-card-title",[t._v(" Ordenes de Pago "),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers_ordenes,items:t.array_ordenes,search:t.search,"item-key":"name",loading:t.loader,"loading-text":"Cargando... Espere"},scopedSlots:t._u([{key:"item",fn:function(e){return[a("tr",[a("td",{staticClass:"text-right"},[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/contabilidad/ordenPago/GeneratePdf/idOrden/"+e.item.id_orden_pago,target:"_blank"}},[t._v(t._s(e.item.id_orden_pago))])]),a("td",[t._v(t._s(e.item.nombre_agencia))]),a("td",{staticClass:"text-center"},[t._v(t._s(t.formatDate(e.item.log)))]),a("td",{staticClass:"text-right"},[t._v("$ "+t._s(t.formatPrice(e.item.importe_total)))]),a("td",[t._v(t._s(e.item.observaciones))]),a("td",[t._v(t._s(e.item.nombre_usuario))]),a("td",[a("v-chip",{attrs:{color:t.getEstatus(e.item.estatus,"color"),dark:""}},[t._v(t._s(t.getEstatus(e.item.estatus,"estatus")))])],1),a("td",{staticClass:"text-center"},[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(i){var r=i.on;return[a("v-icon",t._g({on:{click:function(a){return t.OpenDialog(e.item.id_orden_pago)}}},r),[t._v("fas fa-list-ol")])]}}],null,!0)},[a("span",[t._v("Detalles de la Orden")])]),a("a",{staticStyle:{color:"black","padding-left":"4px"},attrs:{href:t.redirectRMT+t.sur4+"/contabilidad/ordenPago/GeneratePdf/idOrden/"+e.item.id_orden_pago,target:"_blank"}},[a("v-icon",[t._v("fas fa-file-pdf")])],1)],1)])]}}])})],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-dialog",{model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Folio: #"+t._s(t.folio_orden_pago))])]),a("v-card-text",[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers_detalles,items:t.array_detalles,"item-key":"nameD",loading:t.loaderD,"loading-text":"Cargando... Espere"},scopedSlots:t._u([{key:"item",fn:function(e){return[a("tr",[a("td",{staticClass:"text-right"},[t._v(t._s(e.item.id_orden_pago_detalles))]),a("td",{staticClass:"text-right"},["Reservacion"==e.item.tipo_producto?a("span",[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/reservacion/view/id/"+e.item.identificador,target:"_blank"}},[t._v("H"+t._s(e.item.identificador))])]):"Actividad"==e.item.tipo_producto?a("span",[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/activities/view/id/"+e.item.identificador,target:"_blank"}},[t._v("A"+t._s(e.item.identificador))])]):"Tour"==e.item.tipo_producto?a("span",[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/tourReservacion/view/id/"+e.item.identificador,target:"_blank"}},[t._v("T"+t._s(e.item.identificador))])]):"Grupo"==e.item.tipo_producto?a("span",[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/bloqueos/view/id/"+e.item.identificador,target:"_blank"}},[t._v("G"+t._s(e.item.identificador))])]):"Boda"==e.item.tipo_producto?a("span",[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/bloqueos/view/id/"+e.item.identificador,target:"_blank"}},[t._v("B"+t._s(e.item.identificador))])]):a("span",[a("a",{attrs:{href:t.redirectRMT+t.sur4+"/bloqueos/view/id/"+t.separarHabitacion(e.item.identificador,0),target:"_blank"}},[t._v(t._s(e.item.identificador))])])]),a("td",[t._v(t._s(e.item.descripcion))]),a("td",[t._v(t._s(e.item.tipo_producto))]),a("td",{staticClass:"text-right"},[t._v("$ "+t._s(t.formatPrice(e.item.importe)))]),a("td",[a("v-btn",{staticClass:"ma-2",attrs:{outlined:"",fab:"",small:"",color:"error"},on:{click:function(a){return t.DialogQuitItem(e.item)}}},[a("v-icon",[t._v("fas fa-trash-alt")])],1)],1)])]}}])})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cerrar")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"600"},model:{value:t.dialog_eliminar_detalle,callback:function(e){t.dialog_eliminar_detalle=e},expression:"dialog_eliminar_detalle"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("¿Estas seguro de eliminar la orden "+t._s(t.idEliminar)+"?")]),a("v-card-text",[t._v("Estas a punto de eliminar un detalle de la orden.")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(e){t.dialog_eliminar_detalle=!1,t.idEliminar="",t.itemEliminar=[]}}},[t._v("CANCELAR")]),a("v-btn",{attrs:{color:"error darken-1",dark:""},on:{click:function(e){return t.quitItem()}}},[t._v("Eliminar")])],1)],1)],1)],1)],1)],1)},r=[],o=(a("13d5"),a("b680"),a("d3b7"),a("ac1f"),a("25f0"),a("5319"),a("1276"),a("c1df")),s=a.n(o),n={data:function(){return{loader:!1,search:"",array_ordenes:[],headers_ordenes:[{text:"Folio",value:"id_orden_pago",sortable:!0},{text:"Agencia",value:"nombre_agencia",sortable:!0},{text:"Fecha Creación",value:"log",sortable:!0},{text:"Importe",value:"importe_total",sortable:!0},{text:"Observaciones",value:"observaciones",sortable:!0},{text:"Usuario Elaboró",value:"nombre_usuario",sortable:!0},{text:"Estatus",value:"estatus",sortable:!0},{text:"Acciones",value:"actions",sortable:!1}],dialog:!1,folio_orden_pago:0,loaderD:!1,array_detalles:[],headers_detalles:[{text:"ID",value:"id_orden_pago_detalles",sortable:!0},{text:"Identificador",value:"identificador",sortable:!0},{text:"Descripción",value:"descripcion",sortable:!0},{text:"Tipo",value:"tipo_producto",sortable:!0},{text:"Importe",value:"importe",sortable:!0},{text:"Acciones",value:"actions",sortable:!1}],dialog_eliminar_detalle:!1,idEliminar:"",itemEliminar:[]}},methods:{loadOrdenes:function(){this.loader=!0,this.$http.get("https://www.rutamayatravel.com/"+this.sur4+"/contabilidad/ordenPago/obtenerOrdenesPago").then((function(t){this.array_ordenes=t.data,this.loader=!1}),(function(){console.log("Error")}))},formatDate:function(t){return s()(t).format("DD/MM/YYYY")},formatPrice:function(t){var e=Math.ceil(t),a=(e/1).toFixed(2).replace(",",".");return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},OpenDialog:function(t){this.dialog=!0,this.array_detalles=[],this.folio_orden_pago=t,this.ObtenerOrdenDetalles(t)},ObtenerOrdenDetalles:function(t){this.loaderD=!0,this.$http.get("https://www.rutamayatravel.com/"+this.sur4+"/contabilidad/ordenPago/obtenerOrdenesDetalles?idOrden="+t).then((function(t){this.array_detalles=t.data.row,this.loaderD=!1}),(function(){console.log("Error")}))},separarHabitacion:function(t,e){var a=t.split("-");return a[e]},getEstatus:function(t,e){var a="";switch(t){case"PE":a="estatus"==e?"Pendiente":"orange";break;case"C":a="estatus"==e?"Cancelado":"red";break;case"PP":a="estatus"==e?"Pago Parcial":"blue";break;case"PA":default:a="estatus"==e?"Pagado":"green";break}return a},sumaImporte:function(t){return this.array_ordenes.reduce((function(e,a){return e+(a[t]||0)}),0)},DialogQuitItem:function(t){this.dialog_eliminar_detalle=!0,this.itemEliminar=t,this.idEliminar=this.prefijoIdentificador(t.tipo_producto,t.identificador)},prefijoIdentificador:function(t,e){var a="";switch(t){case"Reservacion":a="H"+e;break;case"Actividad":a="A"+e;break;case"Tour":a="T"+e;break;case"Grupo":a="G"+e;break;case"Boda":a="B"+e;break;default:a=e;break}return a},quitItem:function(){var t={id_orden_pago_detalles:this.itemEliminar.id_orden_pago_detalles};this.$http.post("https://www.rutamayatravel.com/"+this.sur4+"/contabilidad/ordenPago/eliminarDetalle",t,{emulateJSON:!0}).then((function(t){console.log(t),this.dialog_eliminar_detalle=!1}))}},computed:{},mounted:function(){this.loadOrdenes()}},d=n,l=a("2877"),c=a("6544"),u=a.n(c),_=a("8336"),m=a("b0af"),v=a("99d9"),f=a("cc20"),p=a("a523"),g=a("8fea"),b=a("169a"),h=a("132d"),k=a("0fd9"),x=a("2fa4"),C=a("8654"),w=a("3a2f9"),E=Object(l["a"])(d,i,r,!1,null,null,null);e["default"]=E.exports;u()(E,{VBtn:_["a"],VCard:m["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VChip:f["a"],VContainer:p["a"],VDataTable:g["a"],VDialog:b["a"],VIcon:h["a"],VRow:k["a"],VSpacer:x["a"],VTextField:C["a"],VTooltip:w["a"]})}}]);