(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c47ad68"],{"3a81":function(a,t,e){},cd32:function(a,t,e){"use strict";e.r(t);var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("v-container",{attrs:{fluid:""}},[e("v-toolbar",{attrs:{flat:!0,height:150}},[e("div",{},[e("div",{staticClass:"d-flex cust-width-max"},[e("img",{staticClass:"img-responsive",attrs:{src:"https://www.rutamayatravel.com/imagenes/"+a.array_agencia.foto,alt:""}})])]),e("v-toolbar-title",[e("h3",{staticClass:"mt-2 mb-2 pl-6"},[a._v(a._s(a.array_agencia.nombre_agencia))])]),e("v-spacer"),e("router-link",{attrs:{to:"/agencias/"}},[e("v-btn",{attrs:{icon:""}},[e("v-icon",[a._v("mdi-arrow-left")])],1)],1)],1),e("v-row",{staticClass:"mt-0"},[e("app-card",{attrs:{colClasses:"col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 ",customClasses:"mb-0 mt-0"}},[e("h3",[a._v("Paquetes de la agencia")]),e("v-data-table",{staticClass:"elevation-1",attrs:{headers:a.headers_paquetes,items:a.array_paquetes_agencia,"item-key":"name",loading:a.loader,"loading-text":"Cargando... Espere"}})],1),e("app-card",{attrs:{colClasses:"col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12 "}},[e("div",{staticClass:"text-center"},[e("h3",[a._v("Proximos pagos")]),e("br"),1==a.loader?e("v-progress-circular",{attrs:{size:150,width:17,color:"purple",indeterminate:""}}):a._e()],1),e("div",{directives:[{name:"show",rawName:"v-show",value:0==a.loader,expression:"loader == false"}]},a._l(a.array_pagos,(function(t,o){return e("div",{key:o},[e("h6",[e("b",[a._v(a._s(t.descripcion_pago)+" - "+a._s(t.id_politicas_pagos_desglose))])]),e("p",[a._v(a._s(t.fecha)+" - "+a._s(t.importe))])])})),0)])],1)],1)],1)},s=[],i=(e("b680"),e("d3b7"),e("ac1f"),e("25f0"),e("5319"),{data:function(){return{array_agencia:[],loader:!1,array_paquetes_agencia:[],array_proximos_pagos:[],array_pagos:[],headers_paquetes:[{text:"Id",align:"start",value:"id_bloqueo",sortable:!0},{text:"Tipo",value:"idTarifa.precio",sortable:!0},{text:"Fecha Inicio",value:"fecha_inicio",sortable:!0},{text:"Hotel",value:"id_hotel",sortable:!0},{text:"Cant.Habs.",value:"numero_habitaciones",sortable:!0},{text:"Novios",value:"novios",sortable:!0},{text:"Estatus",value:"estatus",sortable:!0}],id:this.$route.params.id}},created:function(){},mounted:function(){this.loadAgencias()},methods:{formatPrice:function(a){var t=Math.ceil(a),e=(t/1).toFixed(2).replace(",",".");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},redondearArriba:function(a){var t=Math.ceil(a);return t},loadAgencias:function(){this.loader=!0,this.$http.get("https://www.rutamayatravel.com/sur4/admin/apivue/infoAgencia/"+this.id).then((function(a){this.array_agencia=a.data,this.loadListadoPaquetesAgencia(),this.loadlistaProimosPagosAgencia(),console.log(this.array_paquetes_agencia),console.log(this.array_proximos_pagos),this.loader=!1}),(function(){console.log("Error")}))},loadListadoPaquetesAgencia:function(){this.$http.get("//www.rutamayatravel.com/sur4/admin/apivue/listadoPaquetesAgencia/"+this.id).then((function(a){this.array_paquetes_agencia=a.data}),(function(){console.log("Error")}))},loadlistaProimosPagosAgencia:function(){console.log(this.array_proximos_pagos),this.$http.get("//www.rutamayatravel.com/sur4/admin/apivue/listadoProximosPagos/"+this.id).then((function(a){this.array_proximos_pagos=a.data,this.array_pagos=a.data[0].gruposPoliticasPagosDesgloses}),(function(){console.log("Error")}))}}}),r=i,n=(e("f70e"),e("2877")),l=e("6544"),c=e.n(l),d=e("8336"),u=e("a523"),g=e("8fea"),p=e("132d"),h=e("490a"),_=e("0fd9"),m=e("2fa4"),v=e("71d9"),f=e("2a7f"),b=Object(n["a"])(r,o,s,!1,null,"2d010d1c",null);t["default"]=b.exports;c()(b,{VBtn:d["a"],VContainer:u["a"],VDataTable:g["a"],VIcon:p["a"],VProgressCircular:h["a"],VRow:_["a"],VSpacer:m["a"],VToolbar:v["a"],VToolbarTitle:f["b"]})},f70e:function(a,t,e){"use strict";var o=e("3a81"),s=e.n(o);s.a}}]);