// import $ from 'jquery';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    components: {
        vueDropzone: vue2Dropzone
    },
    data() {
        return {
            RMTURL: 'https://www.rutamayatravel.com/sur4dev/admin/',
            URLIMG: 'https://www.rutamayatravel.com/imagenes/',
            busquedaReservastxt: '',
            nombre_agencia: '',
            id_agencia: '',
            observacion: null,
            id_producto: '',
            dialog: false,
            dialog_habitaciones: false,
            dialog_guardar_pagar: false,
            dialog_confirmar_guardar: false,
            dialog_modal_pagos: false,
            modelo_habitaciones: [],
            selected_grupo_cuartos: [],
            selected_agencia: "",
            listaAgencias: [],
            isLoading: false,
            idAgencia: "",
            total_saldo: 0,
            total_saldo_usd: 0,
            total_importe: 0,
            total_saldo2: 0,
            total_saldo_usd2: 0,
            total_importe2: 0,
            total: 0,
            total_saldo_aux: 0,
            total_saldo_usd_aux: 0,
            array_temp_producto: {},
            json_busqueda_prueba: [],
            array_busqueda_agencia: [],
            precios: [],
            loader: true,
            //variables del mensaje
            color: '',
            mode: '',
            snackbar: false,
            text: 'Hello, I\'m a snackbar',
            timeout: 6000,
            x: null,
            y: 'top',
            // ################
            mostrarBotonBusqueda: true,
            loaderHabitaciones: true,
            settings: [],
            msjError: '',
            array_test: {},
            switchInput: false,
            showingEdit: false,
            array_cuartos_busqueda: [],
            model_agencia_selected: null,
            ordenPago: {
                'id_agencia': 0, // para agencias
                'id_hotel': 0, // para hoteles
                'importe_total': 0,
                'observaciones': ''
            },
            search: null,
            money: {
                decimal: '.',
                thousands: ',',
                prefix: '',
                suffix: '',
                precision: 2,
                masked: false
            },
            cont_bloqueos: 0,
            cont_reservas: 0,
            cont_grupoboda: 0,
            // FORMS PAGAR
            validForm: true,
            comision_agencia: '0',
            comprobantesPago: {
                id_orden_pago: 0,
                id_tipo: 0,
                cliente: '',
                referencia: '',
                id_banco: '',
                id_planpago: '',
                tarjeta: '',
                importe: 0.00,
                id_agencia: 0,
                id_cuenta: '',
                comision: 0,
                observaciones: '',
                efectivo_facturable: '0',
            },
            ultimo_comprobante_pago: [],
            ultimo_importe_pagado: 0,
            saldo_a_favor: false,
            importe_comision: 0.00,
            total_pago: 0.00,
            saldores: 0.00,
            polizas_seleccionadas: [],
            apiForms: [],
            cuentas: [],
            saldo_agencia: '$ 5,000.00',
            tasa_cambio: [],
            id_comprobante_pago: 0,
            facturable: [{
                    valor: '0',
                    text: 'Si'
                },
                {
                    valor: '1',
                    text: 'No'
                }
            ],
            digitosBancoRules: [
                v => !!v || "Validación de tarjeta, Campos requerido.",
                v => v.length <= 4 || '4 Digitos como máximo',
            ],
            bancoRules: [
                v => !!v || "Validación de tarjeta, Campos requerido."
            ],
            importeRules: [
                v => !!v || "Error de Validación, ingrese un importe válido.",
                v => v > 0 || "Pago debe ser mayor a cero",
                v => v <= this.total_saldo || "El pago es mayor al importe seleccionado",
            ],
            // ########
            dropzoneOptions: {
                url: this.redirectRMTApi + 'contabilidad/comprobantesPago/subirArchivo',
                method: 'POST',
                thumbnailWidth: 150,
                maxFilesize: 5,
                dictDefaultMessage: "<i class='fas fa-cloud-upload'></i>Arrastra archivos a subir o click aquí",
                headers: {
                    'Cache-Control': null,
                    'X-Requested-With': null,
                },
                autoProcessQueue: true
            },
            dialog_confirmacion_pago: false,
            agencia_pagar_orden: false,
            estatus_pago: '',
            alert_mensaje: '',
            redirect_pdf_comprobante: '',
            hidden_click_pagar: true,
            show_click_pagar: false,
            itemPolizas: [],
            fondoInSuficiente: false,
            // ######################
            es_cuenta_fondo: false,
            disabledTextField: false,
            disabledBtnSearch: false,
            // ##################### variables para modulo pago
            titleModulo: 'COBRO',
            tipo_modulo: '0', // tipo de modulo --> cobrar o pagar
            pagar_a: 'agencia', // tipo de busqueda --> Hotel o Agencia
            model_hotel_selected: null,
            nombre_hotel: '',
            id_hotel: '',
            listaSelectAgencias: [],
            listaSelectHoteles: [],
            model_lista_agencias: null,
            model_lista_hoteles: null,
            dialog_reset_modulo: false,
            pdfComprobantes: [],
            filtrarTexto: '',
            botonAntesModulo: '',
            botonAntesPagarA: ''

        }
    },
    created() {
        this.consultaFormulario();
    },
    mounted() {},
    methods: {
        peticionTest() {
            var url = "contabilidad/ordenPago/search?identificador=";
            switch (this.pagar_a) {
                case 'hotel':
                    var id_hotel = '';
                    if (this.model_hotel_selected != null) {
                        id_hotel = this.model_hotel_selected.id_hotel;
                    }
                    url += this.id_producto + '&hotel=' + id_hotel;
                    break;
                case 'tour':
                    url += this.id_producto + '&tour=1';
                    break;
                case 'agencia':
                default:
                    var id_agencia = '';
                    if (this.model_agencia_selected != null) {
                        id_agencia = this.model_agencia_selected.id_agencia;
                    }
                    url += this.id_producto + '&agencia=' + id_agencia;
                    break;
            }
            this.$http
                .get(this.redirectRMTApi + url).then(function (response) {
                        this.array_temp_producto = response.body;

                        if (this.array_temp_producto.empty == "No ingreso algun código de busqueda") {
                            this.msjError = "<p>" + this.array_temp_producto.empty + "</p>";
                            this.mensaje(this.array_temp_producto.empty, "red");
                        } else if (this.array_temp_producto.empty == "Ocurrió un error al momento de la busqueda. Consulte a Soporte.") {
                            this.mensaje(this.array_temp_producto.empty, "red");
                        } else if (this.array_temp_producto.empty == '') {
                            if (this.array_temp_producto.search.error != '') {
                                this.msjError = "<p>" + this.array_temp_producto.search.error + "</p>";
                                this.mensaje(this.array_temp_producto.search.error, "red");

                            } else {
                                this.agregarReserva();

                                this.mensaje("Se ha agregado el producto" + this.id_producto, 'green');
                                if (this.array_temp_producto.search.mensaje !== "") {
                                    this.mensaje(this.array_temp_producto.search.mensaje, 'green');
                                }
                            }

                        } else {
                            this.mensaje(this.array_temp_producto.search.error, "red");

                        }
                    },
                    function () {
                        console.log("Error");
                        this.msjError = "Hubo un error";
                    }
                );

        },
        crearOrdenPago() {
            this.calcularTotalSaldo();
            if (this.json_busqueda_prueba.length > 0 && (this.model_agencia_selected != null || this.model_hotel_selected != null || this.pagar_a == 'tour')) {
                this.ordenPago.importe_total = this.total_saldo;
                if (this.pagar_a == 'agencia') {
                    this.array_test = {
                        'OrdenPago': this.ordenPago,
                        'OrdenPagoDetalles': this.json_busqueda_prueba,
                    };
                } else if (this.pagar_a == 'hotel' || this.pagar_a == 'tour') {
                    this.array_test = {
                        'OrdenCompra': this.ordenPago,
                        'OrdenCompraDetalles': this.json_busqueda_prueba,
                    };
                }

                if (typeof this.ordenPago.id_orden_pago == 'undefined' && typeof this.ordenPago.id_orden_compra == 'undefined') {
                    this.ordenDePago();
                } else {
                    this.actualizarOrdenDePago();
                }
            } else if (this.json_busqueda_prueba.length == 0) {
                this.mensaje("No tiene agregado productos", "warning");
            } else {
                var mensaje = '';
                if (this.pagar_a == 'agencia') {
                    mensaje = 'Ingrese una agencia.'
                } else if (this.pagar_a == 'hotel') {
                    mensaje = 'Ingrese un hotel.'
                }
                this.mensaje(mensaje, 'warning');
            }

        },
        ordenDePago() {
            this.botonAntesModulo = this.tipo_modulo;
            this.botonAntesPagarA = this.pagar_a;
            // console.log('crea orden');
            var tipo_orden = '',
                url = '';
            if (this.pagar_a == 'agencia') {
                tipo_orden = 'pago'
                url = 'contabilidad/ordenPago/crearOrdenPago';
            } else if (this.pagar_a == 'hotel' || this.pagar_a == 'tour') {
                tipo_orden = 'compra'
                url = 'contabilidad/ordenCompra/crearOrdenCompra';
            }
            var data = {
                'Orden': this.array_test,
                'tipo_orden': tipo_orden
            };
            var total_saldo = this.total_saldo;
            this.$http.post(this.redirectRMTApi + url, data, {
                emulateJSON: true
            }).then(function (response) {
                if (response.body.error == false) {
                    this.dialog_confirmar_guardar = false;
                    var model = response.body;
                    this.ordenPago = model.model;
                    if (this.agencia_pagar_orden == true) {
                        this.comprobantesPago.id_orden_pago = (model.model.id_orden_pago) ? model.model.id_orden_pago : model.model.id_orden_compra;
                        this.comprobantesPago.id_agencia = (model.model.id_agencia) ? model.model.id_agencia : 0;

                        this.comprobantesPago.importe = model.model.importe_total;
                        this.total_pago = this.comprobantesPago.importe;

                        this.total_saldo_aux = total_saldo;
                        this.total_saldo_usd_aux = this.total_saldo_usd;
                        this.cambiarSaldoADolares();

                        var saldo_restante = parseFloat(this.comprobantesPago.importe) - parseFloat(total_saldo);
                        saldo_restante = this.redondearPrecio(saldo_restante, 2);
                        this.saldores = saldo_restante;
                        this.dialog_guardar_pagar = true;
                    } else {
                        if (tipo_orden == 'pago') {
                            window.open(this.redirectRMT + "contabilidad/ordenPago/GeneratePdf/idOrden/" + model.model.id_orden_pago, '_blank');
                        } else if (tipo_orden == 'compra') {
                            window.open(this.redirectRMT + "contabilidad/ordenCompra/GeneratePdf/idOrden/" + model.model.id_orden_compra, '_blank');
                        }
                    }

                    this.mensaje("Se ha guardado la orden correctamente", "green");
                } else {
                    this.mensaje("Ocurrió un error al momento de guardar la orden. Por favor, contacte a sistemas.", "red");
                }

            }, function (response) {
                // Error
                console.log(response.data)
            });
        },
        actualizarOrdenDePago() {
            // console.log('actua orden');

            var tipo_orden = '',
                url = '';
            if (this.pagar_a == 'agencia') {
                tipo_orden = 'pago'
                url = 'contabilidad/ordenPago/crearOrdenPago';
            } else if (this.pagar_a == 'hotel' || this.pagar_a == 'tour') {
                tipo_orden = 'compra'
                url = 'contabilidad/ordenCompra/crearOrdenCompra';
            }
            var data = {
                'Orden': this.array_test,
                'agregaCuenta': this.saldo_a_favor,
                'tipo_orden': tipo_orden
            };
            var total_saldo = this.total_saldo;
            var total_saldo_aux = this.total_saldo;
            this.$http.post(this.redirectRMTApi + url, data, {
                emulateJSON: true
            }).then(function (response) {
                if (response.body.error == false) {
                    this.dialog_confirmar_guardar = false;
                    var model = response.body;
                    this.ordenPago = model.model;
                    // console.log(this.comprobantesPago);

                    if (this.agencia_pagar_orden == true) {
                        // console.log('actualizar orden');

                        if (model.saldada == true) {
                            this.resetAll();
                            if (tipo_orden == 'pago') {
                                window.open(this.redirectRMT + "contabilidad/ordenPago/GeneratePdf/idOrden/" + model.model.id_orden_pago, '_blank');
                            } else if (tipo_orden == 'compra') {
                                window.open(this.redirectRMT + "contabilidad/ordenCompra/GeneratePdf/idOrden/" + model.model.id_orden_compra, '_blank');
                            }
                        } else {
                            this.dialog_guardar_pagar = true;
                            this.comprobantesPago.id_orden_pago = (model.model.id_orden_pago) ? model.model.id_orden_pago : model.model.id_orden_compra;
                            this.comprobantesPago.id_agencia = (model.model.id_agencia) ? model.model.id_agencia : 0;
                            if (Array.isArray(this.ultimo_comprobante_pago) == false) {
                                // console.log('aqui saldo restante 1');
                                total_saldo = total_saldo_aux - this.ultimo_comprobante_pago.importe;
                                // console.log(total_saldo);
                                this.comprobantesPago.importe = this.redondearPrecio(total_saldo, 2);
                            } else {
                                // console.log('aqui saldo restante 2');
                                this.comprobantesPago.importe = model.model.importe_total;
                            }
                            this.total_pago = this.comprobantesPago.importe;

                            this.total_saldo_aux = total_saldo;
                            this.total_saldo_usd_aux = this.total_saldo_usd;
                            this.cambiarSaldoADolares();

                            var saldo_restante = parseFloat(this.comprobantesPago.importe) - parseFloat(this.total_pago);
                            saldo_restante = this.redondearPrecio(saldo_restante, 2);
                            this.saldores = saldo_restante;
                        }
                    } else {
                        if (model.saldada == true) {
                            this.resetAll();
                        }
                        if (tipo_orden == 'pago') {
                            window.open(this.redirectRMT + "contabilidad/ordenPago/GeneratePdf/idOrden/" + model.model.id_orden_pago, '_blank');
                        } else if (tipo_orden == 'compra') {
                            window.open(this.redirectRMT + "contabilidad/ordenCompra/GeneratePdf/idOrden/" + model.model.id_orden_compra, '_blank');
                        }
                    }
                    this.mensaje("Se ha actualizado la orden correctamente", "green");
                } else {
                    this.mensaje("Ocurrió un error al momento de guardar la orden. Por favor, contacte a sistemas.", "red");
                }

            }, function (response) {
                // Error
                console.log(response.data)
            });
        },
        pagarOrdenPago() {
            if (this.itemPolizas.fondo) {
                this.fondoInSuficiente = false;
                if (this.comprobantesPago.id_tipo == '15' && this.comprobantesPago.importe > this.itemPolizas.fondo) {
                    this.fondoInSuficiente = true;
                }
            }
            if (this.comprobantesPago.id_tipo != 0 || this.comprobantesPago.id_tipo != "") {
                if (this.fondoInSuficiente == false) {
                    if (this.$refs.form.validate()) {
                        this.hidden_click_pagar = false;
                        this.show_click_pagar = true;

                        var tipo_orden = '';
                        if (this.pagar_a == 'agencia' && this.tipo_modulo == '0') {
                            tipo_orden = 'pago';
                        } else if (this.pagar_a == 'agencia' && this.tipo_modulo == '1') {
                            tipo_orden = 'compra-agencia';
                        } else if (this.pagar_a == 'hotel' || this.pagar_a == 'tour') {
                            tipo_orden = 'compra-hotel';
                        }
                        var comprobante = {
                            "ComprobantesPago": this.comprobantesPago,
                            "comision": 0,
                            "total": this.total_pago,
                            "saldores": this.saldores,
                            "tipo_orden": tipo_orden,
                            "tipo": this.pagar_a
                        }
                        this.$http.post(this.redirectRMTApi + 'contabilidad/comprobantesPago/generarComprobantePago', comprobante, {
                            emulateJSON: true
                        }).then(function (response) {
                            this.hidden_click_pagar = true;
                            this.show_click_pagar = false;
                            if (response.body.error == false) {
                                this.ultimo_comprobante_pago = comprobante.ComprobantesPago;
                                this.comprobantesPago = response.body.comprobante;
                                this.id_comprobante_pago = this.comprobantesPago.id_comprobante_pago;

                                var ultimo_importe_pagado = parseFloat(this.ultimo_importe_pagado) + parseFloat(this.comprobantesPago.importe);
                                this.ultimo_importe_pagado = this.redondearPrecio(ultimo_importe_pagado, 2);

                                if (this.ultimo_importe_pagado > 0) {
                                    var importe_saldo = parseFloat(this.total_saldo) - parseFloat(this.ultimo_importe_pagado);
                                    this.comprobantesPago.importe = this.redondearPrecio(importe_saldo, 2);
                                } else {
                                    this.comprobantesPago.importe = comprobante.saldores;
                                }
                                this.total_pago = this.comprobantesPago.importe;
                                this.total_saldo_aux = this.total_pago;
                                this.cambiarSaldoADolares();

                                // var saldores = parseFloat(this.total_pago) - parseFloat(this.comprobantesPago.importe);

                                // if (saldores < 0) {
                                //     saldores = 0;
                                // }
                                // this.saldores = this.redondearPrecio(saldores, 2);
                                this.operacionesMath();

                                if (this.comprobantesPago.importe <= 0) {
                                    this.dialog_guardar_pagar = false;
                                    this.resetCampos();
                                    this.agencia_pagar_orden = false;
                                    this.habilitarCamposCuenta();
                                    // if (tipo_orden == 'pago') {
                                    // }
                                    this.resetOrdenPago();
                                    this.nuevaOrden();
                                }
                                this.modalSuccessPago(response.body.comprobante, tipo_orden);
                            } else {
                                this.mensaje("Error al momento de guardar el comprobante de pago", "red");
                            }

                        }, function (response) {
                            // Error
                            console.log(response.body)
                        });
                    }
                } else {
                    this.mensaje("No tiene fondo suficiente para saldar el total de la orden.", "warning");
                }
            } else {
                this.mensaje("Elija un tipo de pago.", "warning");
            }
        },
        modalSuccessPago(model, tipo_orden) {
            var that = this;
            that.pdfComprobantes = [];
            this.dialog_confirmacion_pago = true;
            this.estatus_pago = 'success';
            this.alert_mensaje = 'Pago realizado con éxito.';
            var redirect_orden = "";
            if (tipo_orden == 'pago' || tipo_orden == 'compra-agencia') {
                redirect_orden = "contabilidad/ordenPago/GeneratePdf/idOrden/";
                that.pdfComprobantes.push({
                    'url': this.redirectRMT + redirect_orden + this.comprobantesPago.id_orden_pago + "/formato/" + model.tipo_formato,
                    'formato': model.tipo_formato
                });
                // this.redirect_pdf_comprobante = this.redirectRMT + "contabilidad/ordenPago/GeneratePdf/idOrden/" + this.comprobantesPago.id_orden_pago;
            } else {
                redirect_orden = "contabilidad/ordenCompra/GeneratePdf/idOrden/";
                that.pdfComprobantes.push({
                    'url': this.redirectRMT + redirect_orden + this.comprobantesPago.id_orden_pago + "/formato/" + model.tipo_formato,
                    'formato': model.tipo_formato
                });
                // this.redirect_pdf_comprobante = this.redirectRMT + "contabilidad/ordenCompra/GeneratePdf/idOrden/" + this.comprobantesPago.id_orden_pago;
            }
            that.pdfComprobantes.push({
                'url': this.redirectRMT + redirect_orden + this.comprobantesPago.id_orden_pago + "/formato/orden",
                'formato': 'orden'
            });
            // console.log(this.pdfComprobantes);

        },
        getPolizas() {
            this.loaderPoliza = true;
            var idFondo = 0;
            var busquedaUrl = this.redirectRMTApi + "contabilidad/comprobantesPago/polizasAgencia/agencia/";
            if (this.pagar_a == 'agencia') {
                idFondo = this.model_agencia_selected.id_agencia;
            }else if (this.pagar_a == 'hotel') {
                idFondo = this.model_hotel_selected.id_hotel;
                busquedaUrl = this.redirectRMTApi + "contabilidad/comprobantesPago/polizasAgencia/hotel/";
            }
            if (this.comprobantesPago.id_tipo == '15') {
                this.$http
                    .get(
                        busquedaUrl + idFondo
                    )
                    .then(
                        function (response) {
                            this.itemPolizas = response.data;
                            this.itemPolizas.fondo = parseFloat(this.itemPolizas.fondo) * (-1);
                            var importePago = parseFloat(this.comprobantesPago.importe);
                            var importeFondo = parseFloat(this.itemPolizas.fondo);
                            if (importePago > importeFondo && importeFondo > 0) {
                                this.comprobantesPago.importe = parseFloat(this.itemPolizas.fondo);
                            }
                            // this.comprobantesPago.importe = parseFloat(this.itemPolizas.fondo);
                            this.operacionesMath();
                        },
                        function () {
                            console.log("Error");
                        }
                    );
            }
        },
        comisionBancaria() {
            this.$http.post(this.redirectRMTApi + 'contabilidad/ordenPago/comisionbancaria', {
                cuenta: this.comprobantesPago.id_cuenta,
                plan: this.comprobantesPago.id_planpago
            }, {
                emulateJSON: true
            }).then(function (response) {
                if (this.comprobantesPago.id_planpago != "" && this.comprobantesPago.id_cuenta != "") {

                    if (response.body != "") {
                        this.comprobantesPago.comision = response.body;
                    } else {
                        this.comprobantesPago.comision = 0;
                    }

                    if (this.comprobantesPago.importe > 0) {
                        this.operacionesMath();
                    }
                }
            }, function (response) {
                // Error
                console.log(response.data)
            });
        },
        asyncFind(query) {
            this.isLoading = true;
            if (query.length > 0) {
                this.isLoading = true;
                this.$http
                    .get(
                        this.redirectRMTApi + "produccionesVentas/busquedaAgencias?search=" +
                        query, {
                            before(request) {
                                // abort previous request, if exists
                                if (this.previousRequest) {
                                    this.previousRequest.abort();
                                }
                                // set previous request on Vue instance
                                this.previousRequest = request;
                            }
                        }
                    )
                    .then(
                        function (response) {
                            var response_var = response.body;
                            this.listaAgencias = response_var;
                            this.isLoading = false;
                        },
                        function () {
                            console.log("Error");
                        }
                    );
            }
        },
        buscarAgenciaPagos() {
            this.loader = true;
            var url = "contabilidad/ordenPago/searchAll";
            switch (this.pagar_a) {
                case 'hotel':
                    url += "?hotel=" + this.model_hotel_selected.id_hotel;
                    break;
                case 'tour':
                    url += "?tour=1";
                    break;
                case 'agencia':
                default:
                    url += "?agencia=" + this.id_agencia;
                    break;
            }
            this.$http.get(this.redirectRMTApi + url).then(
                function (response) {
                    this.array_busqueda_agencia = response.body.search;
                    // console.log(Object.keys(this.array_busqueda_agencia.GruposBodas).length);
                    this.cont_reservas = Object.keys(this.array_busqueda_agencia.Reservas).length;
                    this.cont_grupoboda = Object.keys(this.array_busqueda_agencia.GruposBodas).length;
                    this.cont_bloqueos = Object.keys(this.array_busqueda_agencia.Bloqueos).length;
                    this.isLoading = false;
                    this.loader = false;
                },
                function () {
                    console.log("Error");
                }
            );
        },
        modal_habitaciones(modelo) {
            this.selected_grupo_cuartos = modelo;
            var id = this.formatearIdentificador(modelo.tipo, modelo.identificador);
            this.$http.get(this.redirectRMTApi + "contabilidad/ordenPago/obtenerCuartos?identificador=" + id).then(
                function (response) {
                    this.array_cuartos_busqueda = response.body.rows;
                    this.loaderHabitaciones = false;
                },
                function () {
                    console.log("Error");
                }
            );
        },
        consultaFormulario() {
            // if (this.apiForms.length == 0) {
            this.$http.get(this.redirectRMTApi + "contabilidad/ordenPago/consultaFormulario").then(
                function (response) {
                    this.apiForms = response.body;
                    this.cuentas = this.apiForms.cuentas;
                    this.tasa_cambio = response.body.tasa_cambio;
                },
                function () {
                    console.log("Error");
                }
            );
            // }
        },
        buscaCuentaBanco() {
            var banco = "banco=" + this.comprobantesPago.id_banco;
            this.$http.get(this.redirectRMTApi + "contabilidad/ordenPago/buscaCuentaBanco?" + banco).then(
                function (response) {
                    var respuesta = response.body;
                    if (respuesta.length > 0) {
                        this.cuentas = response.body;
                    } else {
                        this.cuentas = this.apiForms.cuentas;
                    }
                },
                function () {
                    console.log("Error");
                }
            );
        },
        confirmarModalOrden() {
            var articulos_ceros = this.json_busqueda_prueba.find(item => parseFloat(item.saldo) === 0);
            if (this.json_busqueda_prueba.length === 0) {
                this.mensaje('Orden vacía.', 'warning');
            } else if (typeof articulos_ceros != 'undefined' && Object.keys(articulos_ceros).length > 0) {
                this.mensaje('Uno de sus artículos tiene saldo en ceros', 'warning');
            } else {
                this.dialog_confirmar_guardar = true;
            }
        },
        autocompleteChange() {
            if (this.pagar_a == 'agencia') {
                if (this.model_lista_agencias != null) {
                    this.model_agencia_selected = {};
                    this.model_agencia_selected.id_agencia = this.model_lista_agencias.id;
                    this.model_agencia_selected.nombre_agencia = this.model_lista_agencias.nombre;
                    this.model_agencia_selected.foto = this.model_lista_agencias.foto;
                    this.id_agencia = this.model_lista_agencias.id;
                    this.nombre_agencia = this.model_lista_agencias.nombre;
                    this.ordenPago.id_agencia = this.model_lista_agencias.id;
                } else {
                    this.model_agencia_selected = null;
                    this.id_agencia = '';
                    this.nombre_agencia = '';
                    this.ordenPago.id_agencia = 0;
                }
            } else if (this.pagar_a == 'hotel') {
                if (this.model_lista_hoteles != null) {
                    this.model_hotel_selected = {};
                    this.model_hotel_selected.id_hotel = this.model_lista_hoteles.id;
                    this.model_hotel_selected.nombre_hotel = this.model_lista_hoteles.nombre;
                    this.model_hotel_selected.foto = this.model_lista_hoteles.foto;
                    this.id_hotel = this.model_lista_hoteles.id;
                    this.nombre_hotel = this.model_lista_hoteles.nombre;
                    this.ordenPago.id_hotel = this.model_lista_hoteles.id;
                } else {
                    this.model_hotel_selected = null;
                    this.id_hotel = '';
                    this.nombre_hotel = '';
                    this.ordenPago.id_hotel = 0;
                }
            }
        },
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        switchInputEvent() {
            this.switchInput = true;
            this.calcularTotalSaldo();
        },
        pruebaGetInfoInputMain(index) {
            this.switchInput = false;
            this.calcularTotalSaldo();
            console.log(index);
        },
        agregarHabAOrden(modelo) {
            this.id_producto = modelo.identificador;
            this.peticionTest();
        },
        agregarReserva() {
            this.json_busqueda_prueba.push({
                'identificador': this.array_temp_producto.search.identificador,
                'saldo': this.array_temp_producto.search.saldo,
                'importe': this.array_temp_producto.search.importe,
                'tipo_producto': this.array_temp_producto.search.tipo,
                'tipo_cambio': this.array_temp_producto.search.tipo_cambio,
                'descripcion': this.array_temp_producto.search.descripcion,
            });
            if (this.pagar_a == 'agencia' || this.pagar_a == 'tour') {
                this.json_busqueda_prueba[0].agencia = this.array_temp_producto.search.agencia;
            } else if (this.pagar_a == 'hotel') {
                this.json_busqueda_prueba[0].hotel = this.array_temp_producto.search.hotel;
            }
            this.limpiarBusquedas();
            this.calcularTotalSaldo();
            this.msjError = '';
        },
        eliminarReserva(index) {
            var that = this;
            that.json_busqueda_prueba.splice(index, 1);
            if (that.json_busqueda_prueba.length == 0) {
                that.habilitarCamposCuenta();
            } else {
                var searchAbono = [];
                searchAbono = that.json_busqueda_prueba.find(item => item.tipo_producto === 'Abono-cuenta');
                if (typeof searchAbono != 'undefined' && searchAbono.length == 0) {
                    that.habilitarCamposCuenta();
                }
            }
            that.calcularTotalSaldo();
            that.mensaje("Se ha eliminado con exito!", 'red');
        },
        calcularTotalSaldo() {
            this.total_saldo = 0;
            this.total_saldo_usd = 0;
            this.total_importe = 0;
            this.json_busqueda_prueba.forEach(reserva => {
                this.total_saldo = (parseFloat(this.total_saldo) + parseFloat(reserva.saldo));
                this.total_importe = (parseFloat(this.total_importe) + parseFloat(reserva.importe));
                var total_saldo_usd = this.convertirPreciosADolares(reserva.saldo, reserva.tipo_cambio);
                this.total_saldo_usd = (parseFloat(this.total_saldo_usd) + parseFloat(total_saldo_usd));
            });
        },
        calcularTotalBusqueda() {
            this.total_importe2 = 0;
            this.total_saldo2 = 0;
            this.total_saldo_usd2 = 0;

            this.precios.forEach(reserva => {
                this.total_saldo2 = this.total_saldo2 + parseFloat(reserva.saldo);
                this.total_importe2 = this.total_importe2 + parseFloat(reserva.importe);
                var total_saldo_usd2 = this.convertirPreciosADolares(reserva.saldo, reserva.tipo_cambio);
                this.total_saldo_usd2 = (parseFloat(this.total_saldo_usd2) + parseFloat(total_saldo_usd2));
            });

        },
        formatearIdentificador(tipo, identificador) {
            var id = '';
            switch (tipo) {
                case 'Tour':
                    id = identificador.replace('T', '');
                    break;
                case 'Reservacion':
                    id = identificador.replace('H', '');
                    break;
                case 'Grupo':
                case 'Bloqueo':
                    id = identificador.replace('G', '');
                    break;
                case 'Boda':
                    id = identificador.replace('W', '');
                    break;
                case 'Actividad':
                    id = identificador.replace('A', '');
                    break;
                case 'Abono-cuenta':
                    id = identificador.replace('C', '');
                    break;
                case 'Cargo-cuenta':
                    id = identificador.replace('C', '');
                    break;
                default:
                    id = identificador;
                    break;
            }
            return id;
        },
        unirBusquedaConPagoGrid() {
            var that = this;
            this.precios.forEach((element, index) => {
                that.json_busqueda_prueba.push({
                    'identificador': this.formatearIdentificador(element.tipo, element.identificador),
                    'saldo': element.saldo,
                    'importe': element.importe,
                    'tipo_producto': element.tipo,
                    'tipo_cambio': element.tipo_cambio,
                    'descripcion': element.descripcion,
                });
                if (this.pagar_a == 'agencia' || this.pagar_a == 'tour') {
                    this.json_busqueda_prueba[index].agencia = element.agencia ? element.agencia : this.nombre_agencia;
                } else if (this.pagar_a == 'hotel') {
                    this.json_busqueda_prueba[index].hotel = this.nombre_hotel;
                }
            });
            this.calcularTotalSaldo();
        },
        agregaCuenta() {
            var hay_una_cuenta = false;
            var searchAbono = this.json_busqueda_prueba.find(item => item.tipo_producto === 'Abono-cuenta');
            if (typeof searchAbono != 'undefined' && Object.keys(searchAbono).length > 0) {
                hay_una_cuenta = true;
            }
            if (this.model_agencia_selected != null) {
                if (hay_una_cuenta == false) {
                    var that = this;
                    this.es_cuenta_fondo = true;
                    if (this.tipo_modulo == '0') {
                        that.json_busqueda_prueba.push({
                            'identificador': '1030-' + this.id_agencia,
                            'saldo': 0.00,
                            'importe': 0.00,
                            'tipo_producto': 'Abono-cuenta',
                            'tipo_cambio': this.tasa_cambio.importe,
                            'descripcion': 'Cuenta #1030-' + this.id_agencia + ' a nombre de ' + this.nombre_agencia,
                            'agencia': this.nombre_agencia
                        });
                        this.calcularTotalSaldo();
                        this.mensaje('Agregar Saldo válido. No puede combinar una cuenta de fondo con otros artículos.', 'warning');
                    } else if (this.tipo_modulo == '1') {
                        this.$http
                            .get(
                                this.redirectRMTApi + "contabilidad/comprobantesPago/polizasAgencia/agencia/" + this.model_agencia_selected.id_agencia
                            )
                            .then(
                                function (response) {
                                    var polizaAgencia = response.data;
                                    var fondo = parseFloat(polizaAgencia.fondo) * (-1);
                                    that.json_busqueda_prueba.push({
                                        'identificador': '1030-' + this.id_agencia,
                                        'saldo': fondo.toFixed(2),
                                        'importe': fondo.toFixed(2),
                                        'tipo_producto': 'Cargo-cuenta',
                                        'tipo_cambio': this.tasa_cambio.importe,
                                        'descripcion': 'Cuenta #1030-' + this.id_agencia + ' a nombre de ' + this.nombre_agencia,
                                        'agencia': this.nombre_agencia
                                    });
                                    this.calcularTotalSaldo();
                                },
                                function () {
                                    console.log("Error");
                                }
                            );
                    }
                } else {
                    this.mensaje('Hay una cuenta de fondo en su orden. Genera una nueva orden.', 'warning');
                }
            } else {
                this.mensaje('Elige una agencia para seguir.', 'warning');
            }
        },
        abrirModal() {
            if (this.model_agencia_selected != null) {
                this.buscarAgenciaPagos();
                if (this.array_busqueda_agencia != []) {
                    this.mostrarBotonBusqueda = false;
                    this.dialog = true;
                }
            } else if (this.model_hotel_selected != null) {
                this.buscarAgenciaPagos();
                if (this.array_busqueda_agencia != []) {
                    this.mostrarBotonBusqueda = false;
                    this.dialog = true;
                }
            } else if (this.pagar_a == 'tour') {
                this.buscarAgenciaPagos();
                if (this.array_busqueda_agencia != []) {
                    this.mostrarBotonBusqueda = false;
                    this.dialog = true;
                }
            } else {
                var mensaje = '';
                if (this.pagar_a == 'agencia') {
                    mensaje = 'Elige una agencia para seguir.'
                } else if (this.pagar_a == 'hotel') {
                    mensaje = 'Elige un hotel para seguir.'
                }
                this.mensaje(mensaje, 'warning');
            }

        },
        modificarTipoCambio(tasa_cambio) {
            this.tasa_cambio = tasa_cambio;
            this.mensaje('Usted a modificado el tipo de cambio.', 'success');
            this.cambiarSaldoADolares();
            this.cambiarPrecioArtADolares();
        },
        iconoTipoPago(id_tipo) {
            var icono = '';
            switch (parseInt(id_tipo)) {
                case 1:
                    icono = 'fas fa-cash-register';
                    break;
                case 7:
                    icono = 'fas fa-money-bill-alt';
                    break;
                case 8:
                    icono = 'fas fa-credit-card';
                    break;
                case 9:
                    icono = 'fas fa-money-check';
                    break;
                case 15:
                    icono = 'fas fa-file-invoice-dollar';
                    break;
                case 2:
                    icono = 'fas fa-money-check-alt';
                    break;
                case 6:
                    icono = 'fas fa-exchange-alt';
                    break;
                default:
                    icono = 'fas fa-dollar-sign';
                    break;
            }
            return icono;
        },
        addParametersFile(file, xhr, formData) {
            formData.append('idComprobante', this.id_comprobante_pago);
        },
        modificoPago() {
            var saldores = 0;
            if (this.comprobantesPago.id_tipo != '8' && this.comprobantesPago.id_tipo != '9') {
                this.total_pago = this.comprobantesPago.importe;
                saldores = parseFloat(this.total_saldo) - parseFloat(this.comprobantesPago.importe);
                this.saldores = saldores.toFixed(2);
            } else {
                this.operacionesMath();
            }
        },
        modificoComision() {
            this.operacionesMath();
        },
        operacionesMath() {
            var com = parseFloat(this.comprobantesPago.comision) / 100;
            com = com * parseFloat(this.comprobantesPago.importe);
            com = this.redondearPrecio(com, 2);
            this.importe_comision = com;
            var total = parseFloat(this.importe_comision) + parseFloat(this.comprobantesPago.importe);
            total = this.redondearPrecio(total, 2);
            this.total_pago = total;
            // var saldores = parseFloat(this.total_saldo) - parseFloat(this.comprobantesPago.importe);
            var saldores = parseFloat(this.total_saldo) - parseFloat(this.comprobantesPago.importe) - parseFloat(this.ultimo_importe_pagado);
            saldores = this.redondearPrecio(saldores, 2);
            this.saldores = saldores;
        },
        redondearPrecio(value, decimal) {
            return (Math.round(value * 100) / 100).toFixed(decimal);
        },
        cambiarSaldoADolares() {
            var saldo_usd = parseFloat(this.total_saldo) / parseFloat(this.tasa_cambio.importe);
            var saldo_usd_aux = parseFloat(this.total_saldo_aux) / parseFloat(this.tasa_cambio.importe);
            this.total_saldo_usd = this.redondearPrecio(saldo_usd, 2);
            this.total_saldo_usd_aux = this.redondearPrecio(saldo_usd_aux, 2);
        },
        convertirPreciosADolares(importe, tipo_cambio) {
            var dolares = parseFloat(importe) / parseFloat(tipo_cambio);
            return this.redondearPrecio(dolares, 2);
        },
        cambiarPrecioArtADolares() {
            // this.json_busqueda_prueba.forEach(reserva => {
            //     this.total_saldo = (parseFloat(this.total_saldo) + parseFloat(reserva.saldo));
            //     this.total_importe = (parseFloat(this.total_importe) + parseFloat(reserva.importe));
            //     var total_saldo_usd = this.convertirPreciosADolares(reserva.saldo,reserva.tipo_cambio);
            //     this.total_saldo_usd = (parseFloat(this.total_saldo_usd) + parseFloat(total_saldo_usd));
            // });
        },
        tipoIdentificador(tipoIdentificador, identificador, opcion) {
            var title = '';
            var link = '';
            var tipoBloqueo = '';
            var id = '';
            if (typeof tipoIdentificador != "undefined") {
                switch (tipoIdentificador) {
                    case 'Reservacion':
                        id = identificador.replace('H', '');
                        title = 'Reservación';
                        link = this.redirectRMT + 'reservacion/view/id/' + id;
                        break;
                    case 'Actividad':
                        id = identificador.replace('A', '');
                        title = 'Actividad';
                        link = this.redirectRMT + 'activities/view/id/' + id;
                        break;
                    case 'Tour':
                        id = identificador.replace('T', '');
                        title = 'Tour';
                        link = this.redirectRMT + 'tourReservacion/view/id/' + id;
                        break;
                    case 'Grupo':
                        id = identificador.replace('G', '');
                        title = 'Grupo';
                        link = this.redirectRMT + 'bloqueos/view/id/' + id;
                        break;
                    case 'Bloqueo':
                        id = identificador.replace('G', '');
                        title = 'Bloqueo';
                        link = this.redirectRMT + 'bloqueos/view/id/' + id;
                        break;
                    case 'Boda':
                        id = identificador.replace('W', '');
                        title = 'Boda';
                        link = this.redirectRMT + 'bloqueos/view/id/' + id;
                        break;
                    case 'Abono-cuenta':
                        id = identificador.replace('C', '');
                        title = 'Abono-cuenta';
                        link = '';
                        break;
                    case 'Cargo-cuenta':
                        id = identificador.replace('C', '');
                        title = 'Cargo-cuenta';
                        link = '';
                        break;
                    default:
                        tipoBloqueo = tipoIdentificador.split('-');
                        var items = identificador.split("-");
                        title = 'Habitación-' + tipoBloqueo[1];
                        link = this.redirectRMT + 'bloqueos/view/id/' + items[0];
                        break;
                }

                if (opcion == 'link') {
                    return link;
                } else if (opcion == 'title') {
                    return title;
                }
            }

        },
        showMetodoPago(item) {
            // console.log(item + '-' + this.tipo_modulo + '-' + this.pagar_a + '-' + this.pagar_a);
            if (item == '15' && (this.es_cuenta_fondo == true || (this.tipo_modulo == '1' && (this.pagar_a == 'agencia' || this.pagar_a == 'tour')))) {
                return false;
            } else if(item == '10' && (this.tipo_modulo == '0' || (this.tipo_modulo == '1' && (this.pagar_a == 'agencia' || this.pagar_a == 'tour')))) {
                // console.log(item + 'aqui');
                return false;
            }else {
                return true;
            }
        },
        clearDropzone() {
            this.$refs.myVueDropzone.removeAllFiles();
        },
        nuevaOrden() {
            this.limpiarTabla();
            this.resetCampos();
            this.habilitarCamposCuenta();
            this.resetOrdenPago();
            this.mensaje("Se ha creado nueva orden", 'warning');
            this.total_saldo_aux = 0;
            this.total_saldo_usd_aux = 0;
            this.ultimo_comprobante_pago = [];
            this.ultimo_importe_pagado = 0;
        },
        limpiarTabla() {
            this.json_busqueda_prueba = [];

            this.array_test = [];
            this.calcularTotalSaldo();

        },
        limpiarBusquedas() {
            // this.nombre_agencia = '';
            this.id_producto = '';
        },
        resetOrdenPago() {
            this.ordenPago = {
                'id_agencia': this.id_agencia,
                'id_hotel': (this.pagar_a == 'hotel') ? this.id_hotel : 0,
                'importe_total': 0,
                'observaciones': ''
            };
        },
        habilitarCamposCuenta() {
            this.disabledTextField = false;
            this.disabledBtnSearch = false;
            this.es_cuenta_fondo = false;
        },
        resetCampos() {
            if (this.comprobantesPago.id_tipo !== "15" && this.comprobantesPago.importe > 0) {
                if (this.ultimo_importe_pagado > 0) {
                    var importe_saldo = parseFloat(this.total_saldo) - parseFloat(this.ultimo_importe_pagado);
                    this.comprobantesPago.importe = this.redondearPrecio(importe_saldo, 2);
                } else {
                    this.comprobantesPago.importe = this.total_saldo;
                }
            }
            this.comprobantesPago.cliente = '';
            this.comprobantesPago.referencia = '';
            this.comprobantesPago.id_banco = '';
            this.comprobantesPago.id_planpago = '';
            this.comprobantesPago.tarjeta = '';
            this.comprobantesPago.id_cuenta = '';
            this.comprobantesPago.comision = 0;
            this.comprobantesPago.observaciones = '';
            this.comprobantesPago.efectivo_facturable = '0';
            this.importe_comision = 0;
            this.itemPolizas = [];
            this.fondoInSuficiente = false;
            if (this.comprobantesPago.id_tipo == "15") {
                this.getPolizas();
            }
            this.cuentas = this.apiForms.cuentas;
            this.operacionesMath();
        },
        resetAll() {
            this.agencia_pagar_orden = false;
            this.saldo_a_favor = false;
            this.resetCampos();
            this.habilitarCamposCuenta();
            this.resetOrdenPago();
            this.nuevaOrden();
        },
        mensaje(texto, color) {
            this.color = color;
            this.mode = 'multi-line';
            this.snackbar = true;
            this.text = texto;
            this.timeout = 6000;
            this.x = 'right';
            this.y = 'bottom';
        },
        // ################# metodos union cobro y pago 01/06/2020
        searchAutocomplete(val) {
            this.isLoading = true
            var url = '';
            if (this.pagar_a == 'agencia') {
                url = "agencias/busquedaAgencias?search=";
            } else {
                url = "hoteles/busquedaHoteles?search=";
            }
            fetch(this.redirectRMTApi + url + val)
                .then(res => res.json())
                .then(res => {
                    this.listaAgencias = res;
                    res.forEach(element => {
                        if (this.pagar_a == 'agencia') {
                            this.listaSelectAgencias.push({
                                'nombre': element.nombre_agencia,
                                'id': element.id_agencia,
                                'foto': this.URLIMG + element.foto,
                                'subtitle': element.nombre_estado,
                            });
                        } else if (this.pagar_a == 'hotel') {
                            this.listaSelectHoteles.push({
                                'nombre': element.nombre_hotel,
                                'id': element.id_hotel,
                                'foto': element.foto,
                                'subtitle': element.proveedor,
                            });
                            // console.log(this.listaSelectHoteles)
                        }
                    });
                }).catch(err => {
                    console.log(err)
                }).finally(() => (this.isLoading = false))
        },
        clickAutoComplete() {
            if (this.pagar_a == 'agencia' && this.tipo_modulo == '0') {
                this.mostrarBotonBusqueda = true;
            }
        },
        cambioModulo() {
            // this.model_agencia_selected = null;
            // this.model_hotel_selected = null;
            if (typeof this.ordenPago.id_orden_pago == 'undefined' && typeof this.ordenPago.id_orden_compra == 'undefined') {
                // console.log('reset');}
                // console.log(this.ordenPago);
                this.resetAllPage();
            } else {
                // console.log(this.ordenPago);
                this.dialog_reset_modulo = true;
            }
        },
        cambioPagarA() {
            // this.model_agencia_selected = null;
            // this.model_hotel_selected = null;

            // console.log(this.ordenPago);
            if (typeof this.ordenPago.id_orden_pago == 'undefined' && typeof this.ordenPago.id_orden_compra == 'undefined') {
                // console.log('reset');
                // console.log(this.ordenPago);
                this.resetAllPage();
            } else {
                this.dialog_reset_modulo = true;
                // console.log(this.ordenPago);
            }
        },
        resetAllPage() {
            if (this.tipo_modulo == '1' && (this.pagar_a == 'hotel' || this.pagar_a == 'tour')) {
                this.mostrarBotonBusqueda = true;
                this.disabledTextField = false;
            } else {
                this.mostrarBotonBusqueda = false;
                this.disabledTextField = true;
            }

            if (this.tipo_modulo == '0') {
                this.mostrarBotonBusqueda = true;
                this.disabledTextField = true;
            }
            this.agencia_pagar_orden = false;
            this.saldo_a_favor = false;
            this.comprobantesPago = {
                id_orden_pago: 0,
                id_tipo: 0,
                cliente: '',
                referencia: '',
                id_banco: '',
                id_planpago: '',
                tarjeta: '',
                importe: 0.00,
                id_agencia: 0,
                id_cuenta: '',
                comision: 0,
                observaciones: '',
                efectivo_facturable: '0',
            }
            this.limpiarTabla();
            this.resetCampos();
            this.resetOrdenPago();
            this.habilitarCamposCuenta();
            this.total_saldo_aux = 0;
            this.total_saldo_usd_aux = 0;
            this.ultimo_comprobante_pago = [];
            this.ultimo_importe_pagado = 0;
        },
        NoCancelarOrdenPendiente(){
            this.tipo_modulo = this.botonAntesModulo;
            this.pagar_a = this.botonAntesPagarA;
        }
    },
    computed: {
        busquedaReservas: function () {
            var self = this;
            return this.array_busqueda_agencia.filter(data => {
                // if (data.novios != null) {

                return (
                    data.Reservas.identificador
                    .toLowerCase()
                    .includes(self.busquedaReservastxt.toLowerCase()) ||
                    data.Reservas.tipo
                    .toLowerCase()
                    .includes(self.busquedaReservastxt.toLowerCase())
                );
                // }
            });
        },
        cuartosGruposBodas() {
            let count = 0;
            return count;
        },
        tituloModulo() {
            var title = '';
            if (this.tipo_modulo == '0') {
                this.pagar_a = 'agencia';
                title = 'COBRO';
            } else {
                title = 'PAGO';
            }
            return title;
        },
        searchAll() {
            // var that = this;
            // return Object.values(that.array_busqueda_agencia.Reservas).filter((reserva) => {
            //     if (typeof reserva.identificador !== 'undefined') {
            //         return reserva.identificador.toLowerCase().includes(that.filtrarTexto.toLowerCase());  
            //     }
            // })
        }
    },
    watch: {
        // search(val) {
        //     this.isLoading = true
        //     // Lazily load input items
        //     fetch(this.redirectRMTApi + "agencias/busquedaAgencias?search=" + val)
        //         .then(res => res.json())
        //         .then(res => {
        //             this.listaAgencias = res;
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        //         .finally(() => (this.isLoading = false))
        // },
    },

};