<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid>
      <v-row class="mt-0">
        <app-card
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
          customClasses="mb-0 mt-0"
        >
          <v-card-title>
            Ordenes de Pago
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers_ordenes"
            :items="array_ordenes"
            :search="search"
            item-key="id_orden_pago"
            class="elevation-1"
            :loading="loader"
            loading-text="Cargando... Espere"
          >
            <template v-slot:item="props">
              <tr>
                <td class="text-right">
                  <a
                    @click="abrirComprobantes(props.item.id_orden_pago)"
                  >{{ props.item.id_orden_pago }}</a>
                </td>
                <td>{{ props.item.nombre_agencia }}</td>
                <td class="text-center">{{ formatDate(props.item.log) }}</td>
                <td class="text-right">$ {{ $RMT.formatoPrecio(props.item.importe_total) }}</td>
                <td style="white-space: initial !important;">{{ props.item.observaciones }}</td>
                <td>
                  <v-chip
                    :color="getEstatus(props.item.estatus, 'color')"
                    dark
                  >{{ getEstatus(props.item.estatus, "estatus") }}</v-chip>
                </td>
                <td class="text-center">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" @click="OpenDialog(props.item)">fas fa-list-ol</v-icon>
                    </template>
                    <span>Detalles de la Orden</span>
                  </v-tooltip>
                  <a
                    @click="abrirComprobantes(props.item.id_orden_pago)"
                    style="color:black; padding-left:5px; padding-right:5px;"
                  >
                    <v-icon>fas fa-file-pdf</v-icon>
                  </a>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        v-show="
                          props.item.estatus != 'PA' &&
                            props.item.estatus != 'C'
                        "
                        dark
                        v-on="on"
                        @click="OpenDialogPay(props.item)"
                      >fas fa-cash-register</v-icon>
                    </template>
                    <span>Pagar Orden de pago</span>
                  </v-tooltip>
                </td>
                <td style="white-space: initial !important;">{{ props.item.nombre_usuario }}</td>
              </tr>
            </template>
          </v-data-table>
        </app-card>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="col-12">
                  <span class="headline">Orden: #{{ folio_orden_pago }}</span>
                </v-col>
                <!-- <v-spacer></v-spacer> -->
                <v-col class="col-12">
                  <v-btn
                    v-show="editItemOrden.estatus != 'C' && (editItemOrden.estatus != 'PA' || fechaHoy(editItemOrden.log)==true)"
                    class="ma-2"
                    color="red"
                    dark
                    @click="confirmRemoveDetalle(null)"
                  >
                    <v-icon dark left>mdi-cancel</v-icon>Cancelar
                  </v-btn>
                  <!-- <v-btn
                    v-show="editItemOrden.estatus != 'C' && editItemOrden.estatus != 'PA'"
                    class="ma-2"
                    color="success"
                    dark
                    @click="clickActualizarOrden()"
                  >
                    <v-icon dark left>mdi-check</v-icon>Actualizar
                  </v-btn> -->
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers_detalles"
                :items="array_detalles"
                item-key="id_orden_pago_detalles"
                class="elevation-1"
                :loading="loaderD"
                loading-text="Cargando... Espere"
              >
                <template v-slot:item="props">
                  <tr>
                    <td class="text-right">{{ props.item.id_orden_pago_detalles }}</td>
                    <td class="text-right">
                      <span v-if="props.item.tipo_producto == 'Reservacion'">
                        <a
                          :href="
                            redirectRMT +
                              '/reservacion/view/id/' +
                              props.item.identificador
                          "
                          target="_blank"
                        >H{{ props.item.identificador }}</a>
                      </span>
                      <span v-else-if="props.item.tipo_producto == 'Actividad'">
                        <a
                          :href="
                            redirectRMT +
                              '/activities/view/id/' +
                              props.item.identificador
                          "
                          target="_blank"
                        >A{{ props.item.identificador }}</a>
                      </span>
                      <span v-else-if="props.item.tipo_producto == 'Tour'">
                        <a
                          :href="
                            redirectRMT +
                              '/tourReservacion/view/id/' +
                              props.item.identificador
                          "
                          target="_blank"
                        >T{{ props.item.identificador }}</a>
                      </span>
                      <span v-else-if="props.item.tipo_producto == 'Grupo'">
                        <a
                          :href="
                            redirectRMT +
                              '/bloqueos/view/id/' +
                              props.item.identificador
                          "
                          target="_blank"
                        >G{{ props.item.identificador }}</a>
                      </span>
                      <span v-else-if="props.item.tipo_producto == 'Boda'">
                        <a
                          :href="
                            redirectRMT +
                              '/bloqueos/view/id/' +
                              props.item.identificador
                          "
                          target="_blank"
                        >B{{ props.item.identificador }}</a>
                      </span>
                      <span v-else>
                        <a
                          :href="
                            redirectRMT +
                              '/bloqueos/view/id/' +
                              separarHabitacion(props.item.identificador, 0)
                          "
                          target="_blank"
                        >{{ props.item.identificador }}</a>
                      </span>
                    </td>
                    <!-- <td v-show="showDescription == false" @click="showDescription = true;"> -->
                    <td style="white-space: initial !important;">
                      {{ props.item.descripcion }}
                    </td>
                    <!-- <td v-show="showDescription == true">
                      <v-text-field
                        v-model.lazy="props.item.descripcion"
                        @keyup.enter="showDescription = false; $emit('update');"
                        autofocus
                      />
                    </td> -->
                    <td>{{ props.item.tipo_producto }}</td>
                    <td
                      class="text-right"
                    >$ {{ $RMT.formatoPrecio(props.item.importe) }}</td>
                    <!-- <td
                      v-show="!changePrice"
                      @click="changePrice = true;"
                      class="text-right"
                    >$ {{ $RMT.formatoPrecio(props.item.importe) }}</td> -->
                    <!-- <td
                      style="width: 200px !important; text-align:right !important"
                      v-show="changePrice"
                    >
                      <v-text-field
                        prefix="$"
                        v-model.lazy="props.item.importe"
                        suffix="MX"
                        @keyup.enter="changePrice = false; $emit('update');"
                        autofocus
                      />
                    </td> -->
                    <!-- <td>
                      <v-btn
                        v-show="editItemOrden.estatus !== 'C' && editItemOrden.estatus !== 'PA' && array_detalles.length > 1"
                        class="ma-2"
                        text
                        icon
                        color="red lighten-2"
                        @click="confirmRemoveDetalle(props.item)"
                      >
                        <v-icon>fas fa-window-close</v-icon>
                      </v-btn>
                    </td> -->
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog_eliminar_detalle" persistent max-width="600">
          <v-card>
            <v-card-title class="headline">{{mensaje_confirmacion_title}}</v-card-title>
            <v-card-text v-show="showMotivo">
              <v-text-field
                v-model="editItemOrden.motivo_cancelacion"
                label="Motivo de Cancelación"
              ></v-text-field>
            </v-card-text>
            <v-card-text v-html="mensaje_confirmacion_body"></v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-1"
                text
                @click="
                  dialog_eliminar_detalle = false;
                  idEliminar = '';
                  itemEliminar = [];
                "
              >Cerrar</v-btn>

              <v-btn
                v-show="idEliminar != ''"
                :loading="loadingConfirm"
                :disabled="loadingConfirm"
                color="error darken-1"
                @click="removeItemDetalle(); loadingConfirm = true;"
              >Eliminar</v-btn>
              <v-btn
                v-show="idEliminar == ''"
                :loading="loadingConfirm"
                :disabled="loadingConfirm"
                color="error darken-1"
                @click="cancelItem(); loadingConfirm = true;"
              >Cancelar Orden</v-btn>
              <!-- <v-btn color="green darken-1" dark @click="dialog_guardar_pagar=true">GUARDAR</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog_pagar"
      fullscreen
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="pink">
          <v-toolbar-title>PAGAR ORDEN DE PAGO #{{ comprobantesPago.id_orden_pago }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="
                dialog_pagar = false;
                resetCampos();
                ultimo_importe_pagado = 0;
              "
              class="pt-0"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="6" md="4">
              <tasa-cambio v-model="tasa_cambio.importe" v-on:success-change="modificarTipoCambio"></tasa-cambio>
            </v-col>
            <v-col cols="6" md="8" class="text-right">
              <v-list-item ripple>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold display-1"
                    v-html="'$ ' + $RMT.formatoPrecio(saldoOrden) + ' MXN'"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="headline"
                    v-html="'$ ' + $RMT.formatoPrecio(saldoOrdenUSD) + ' USD'"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-form id="form-buy" v-model="validForm" ref="form" lazy-validation>
            <v-row>
              <v-col cols="12" class="paymentCont mb-3">
                <div
                  v-for="(radioButtons, indexRadio) in apiForms.metodos"
                  :key="indexRadio"
                  v-show="showMetodoPago(radioButtons.id_tipo)"
                >
                  <input
                    type="radio"
                    :id="'control_' + indexRadio"
                    v-model="comprobantesPago.id_tipo"
                    :value="radioButtons.id_tipo"
                    name="tipo_pago"
                    @change="
                      resetCampos();
                      getPolizas();
                    "
                  />
                  <label :for="'control_' + indexRadio">
                    <p style="font-size:12px;">{{ radioButtons.descripcion }}</p>
                    <v-icon>{{ iconoTipoPago(radioButtons.id_tipo) }}</v-icon>
                  </label>
                </div>
              </v-col>
              <v-col cols="12" md="6" v-show="comprobantesPago.id_tipo == '15'">
                <v-text-field v-model="itemPolizas.concepto" label="Concepto" filled readonly></v-text-field>
                <!-- cuenta de fondo -->
              </v-col>
              <v-col cols="12" md="6" v-show="comprobantesPago.id_tipo == '15'">
                <v-text-field
                  v-model="itemPolizas.fondo"
                  label="Cuenta de Fondo"
                  prefix="$"
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="12"
                v-show="
                  comprobantesPago.id_tipo == '1' ||
                    comprobantesPago.id_tipo == '7'
                "
              >
                <header>Facturar</header>
                <v-radio-group v-model="comprobantesPago.efectivo_facturable" row>
                  <v-radio
                    v-for="(optionsFact, indexFact) in facturable"
                    :key="indexFact"
                    color="success"
                    :value="optionsFact.valor"
                    :label="optionsFact.text"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col
                cols="12"
                md="6"
                v-show="
                  comprobantesPago.id_tipo == '2' ||
                    comprobantesPago.id_tipo == '6' ||
                    comprobantesPago.id_tipo == '7'
                "
              >
                <v-text-field v-model="comprobantesPago.referencia" label="Referencia"></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
                v-show="
                  comprobantesPago.id_tipo == '2' ||
                    comprobantesPago.id_tipo == '6' ||
                    comprobantesPago.id_tipo == '7' ||
                    comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9'
                "
              >
                <v-text-field v-model="comprobantesPago.cliente" label="Cuenta Habiente"></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="8"
                v-show="
                  comprobantesPago.id_tipo == '2' ||
                    comprobantesPago.id_tipo == '6' ||
                    comprobantesPago.id_tipo == '7' ||
                    comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9'
                "
              >
                <v-select
                  v-model="comprobantesPago.id_banco"
                  :items="apiForms.bancos"
                  item-value="id_banco"
                  item-text="nombre"
                  label="Banco"
                  :rules=" (comprobantesPago.id_tipo != 1 && comprobantesPago.id_tipo != 15) ? bancoRules : [] "
                  @change="buscaCuentaBanco()"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                md="4"
                v-show="
                  comprobantesPago.id_tipo == '2' ||
                    comprobantesPago.id_tipo == '6' ||
                    comprobantesPago.id_tipo == '7' ||
                    comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9'
                "
              >
                <v-text-field
                  v-model="comprobantesPago.tarjeta"
                  label="4 Dígitos"
                  :rules="
                    (comprobantesPago.id_tipo == 8 ||
                    comprobantesPago.id_tipo == 9) && this.es_cuenta_cargo == false
                      ? digitosBancoRules
                      : []
                  "
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                v-show="
                  comprobantesPago.id_tipo == '2' ||
                    comprobantesPago.id_tipo == '6' ||
                    comprobantesPago.id_tipo == '7' ||
                    comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9'
                "
              >
                <v-select
                  v-model="comprobantesPago.id_cuenta"
                  :items="cuentas"
                  item-value="id_cuenta"
                  item-text="descripcion"
                  label="Cuenta"
                  no-data-text="No se encontró cuentas para el banco seleccionado"
                  @change="comisionBancaria()"
                  :rules=" (comprobantesPago.id_tipo != 1 && comprobantesPago.id_tipo != 15) ? bancoRules : [] "
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                v-show="
                  (comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9') && this.es_cuenta_cargo == false
                "
              >
                <v-select
                  v-model="comprobantesPago.id_planpago"
                  :items="apiForms.planPagos"
                  item-value="id_planpago"
                  item-text="descripcion"
                  label="Plan de Pago"
                  @change="comisionBancaria()"
                  :rules="
                    comprobantesPago.id_tipo == 8 ||
                    comprobantesPago.id_tipo == 9
                      ? bancoRules
                      : []
                  "
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="comprobantesPago.importe"
                  label="Pago"
                  prefix="$"
                  required
                  @change="modificoPago"
                  :rules="importeRules"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
                v-show="
                  comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9'
                "
              >
                <v-text-field
                  v-model="comprobantesPago.comision"
                  label="Comisión"
                  suffix="%"
                  @change="modificoComision"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="8"
                v-show="
                  comprobantesPago.id_tipo == '8' ||
                    comprobantesPago.id_tipo == '9'
                "
              >
                <v-text-field
                  v-model="importe_comision"
                  label="Importe con Comisión"
                  readonly
                  prefix="$"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="total_pago" label="Total" prefix="$" readonly></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="saldores" label="Saldo Restante" prefix="$" readonly></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="comprobantesPago.observaciones" label="Observaciones"></v-text-field>
              </v-col>
              <v-col class="text-right">
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    dialog_pagar = false;
                    resetCampos();
                    ultimo_importe_pagado = 0;
                  "
                >Cancelar</v-btn>
                <v-btn
                  v-show="hidden_click_pagar"
                  :disabled="!validForm"
                  color="success darken-1"
                  @click="pagarOrdenPago"
                >Pagar</v-btn>
                <v-btn v-show="show_click_pagar" color="success darken-1" loading>Pagar</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12">
              <div v-if="ultimo_importe_pagado > 0">
                <p class="font-weight-black">
                  Tienes pagos realizados con un monto de $
                  {{ $RMT.formatoPrecio(ultimo_importe_pagado) }} en la orden
                  actual.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_confirmacion_pago" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-alert dense outlined :type="estatus_pago">{{alert_mensaje}}</v-alert>
                <!-- <v-alert dense outlined type="error">Ocurrió un error desconocido.</v-alert> -->
              </v-col>
              <v-col cols="12" v-if="estatus_pago=='success'">
                <v-row v-if="pdfComprobantes.length > 0">
                  <div v-for="(pdf, keyPdf) in pdfComprobantes" :key="keyPdf" class="mr-3">
                    <v-btn
                      outlined
                      color="indigo"
                      :href="pdf.url"
                      target="_blank"
                    >Imprimir {{ (pdf.formato == 'egreso') ? 'Póliza de Egreso' : (pdf.formato == 'movimiento') ? 'Comprobante de mov.' : (pdf.formato == 'recibo') ? 'Recibo' : 'Orden' }}</v-btn>
                  </div>
                </v-row>
                <!-- <v-btn
                  outlined
                  color="indigo"
                  :href="redirect_pdf_comprobante"
                  target="_blank"
                >Imprimir Comprobante</v-btn>-->
              </v-col>
              <v-col cols="12" v-if="estatus_pago=='success'">
                <h4>Subir Comprobante de Pago</h4>
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  v-on:vdropzone-sending="addParametersFile"
                ></vue-dropzone>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog_confirmacion_pago = false; resetCampos(); id_comprobante_pago = ''; clearDropzone();"
          >Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{text}}
      <v-btn dark text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import moment from "moment";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      loader: false,
      loadingConfirm: false,
      loaderConfirm: null,
      search: "",
      array_ordenes: [],
      headers_ordenes: [
        {
          text: "Folio",
          value: "id_orden_pago",
          sortable: true
        },
        { text: "Agencia", value: "nombre_agencia", sortable: true },
        { text: "Fecha Creación", value: "log", sortable: true },
        { text: "Importe", value: "importe_total", sortable: true },
        { text: "Observaciones", value: "observaciones", sortable: true },
        { text: "Estatus", value: "estatus", sortable: true },
        { text: "Acciones", value: "actions", sortable: false },
        { text: "Usuario Elaboró", value: "nombre_usuario", sortable: true }
      ],
      dialog: false,
      folio_orden_pago: 0,
      loaderD: false,
      array_detalles: [],
      editedIndex: -1,
      editItemOrden: {},
      defaultOrden: {
        id_agencia: "",
        importe_total: 0,
        observaciones: "",
        motivo_cancelacion: ""
      },
      headers_detalles: [
        {
          text: "ID",
          value: "id_orden_pago_detalles",
          sortable: true
        },
        { text: "Identificador", value: "identificador", sortable: true },
        { text: "Descripción", value: "descripcion", sortable: true },
        { text: "Tipo", value: "tipo_producto", sortable: true },
        { text: "Importe", value: "importe", sortable: true },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      dialog_eliminar_detalle: false,
      idEliminar: "",
      itemEliminar: [],
      mensaje_confirmacion_title: "",
      mensaje_confirmacion_body: "",
      showMotivo: false,
      saldo_actual: 0,

      // ################### MODAL ##################
      dialog_pagar: false,
      validForm: true,
      saldoOrden: 0,
      saldoOrdenUSD: 0,
      digitosBancoRules: [
        v => !!v || "Validación de tarjeta, Campos requerido.",
        v => v.length <= 4 || "4 Digitos como máximo"
      ],
      bancoRules: [v => !!v || "Validación de tarjeta, Campos requerido."],
      importeRules: [
        v => !!v || "Error de Validación, ingrese un importe válido.",
        v => v > 0 || "Pago debe ser mayor a cero",
        v => v <= this.saldoOrden || "El pago es mayor al importe seleccionado"
      ],
      comision_agencia: "0",
      // ******** POST pagos sur4
      comprobantesPago: {
        id_orden_pago: 0,
        id_tipo: 0,
        cliente: "",
        referencia: "",
        id_banco: "",
        id_planpago: "",
        tarjeta: "",
        importe: 0.0,
        id_agencia: 0,
        id_cuenta: "",
        comision: 0,
        observaciones: "",
        efectivo_facturable: "0"
      },
      importe_comision: 0.0,
      total_pago: 0.0,
      saldores: 0.0,
      ultimo_comprobante_pago: [],
      ultimo_importe_pagado: 0,
      id_comprobante_pago: 0,
      // *************
      facturable: [
        {
          valor: "0",
          text: "Si"
        },
        {
          valor: "1",
          text: "No"
        }
      ],
      apiForms: [],
      cuentas: [],
      tasa_cambio: [],
      es_cuenta_fondo: false,
      es_cuenta_cargo: false,
      dialog_confirmacion_pago: false,
      estatus_pago: "",
      alert_mensaje: "",
      redirect_pdf_comprobante: "",
      itemPolizas: [],
      hidden_click_pagar: true,
      show_click_pagar: false,
      // atributos mensaje
      color: "",
      mode: "",
      snackbar: false,
      text: "Hello, I'm a snackbar",
      timeout: 6000,
      x: null,
      y: "top",
      // upload image
      dropzoneOptions: {
        url: this.redirectRMTApi + "contabilidad/comprobantesPago/subirArchivo",
        method: "POST",
        thumbnailWidth: 150,
        maxFilesize: 5,
        dictDefaultMessage:
          "<i class='fas fa-cloud-upload'></i>Arrastra archivos a subir o click aquí",
        headers: {
          "Cache-Control": null,
          "X-Requested-With": null
        },
        autoProcessQueue: true
      },
      // ################################## Fin Atributos de modal
      fondoInSuficiente: false,
      pdfComprobantes: [],
      showDescription: false,
      changePrice: false
    };
  },
  created() {
    this.consultaFormulario();
  },
  methods: {
    loadOrdenes() {
      this.loader = true;
      this.$http
        .get(this.redirectRMTApi + "contabilidad/ordenPago/obtenerOrdenesPago")
        .then(
          function(response) {
            this.array_ordenes = response.data;
            this.loader = false;
          },
          function() {
            console.log("Error");
          }
        );
    },
    formatDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    OpenDialog: function(item) {
      this.dialog = true;
      this.array_detalles = [];
      this.folio_orden_pago = item.id_orden_pago;
      this.obtenerItemTablaOrden(item);
      this.obtenerItemTablaDetalles(item.id_orden_pago);
    },
    obtenerItemTablaDetalles: function(item) {
      this.loaderD = true;
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/ordenPago/obtenerOrdenesDetalles?idOrden=" +
            item
        )
        .then(
          function(response) {
            this.array_detalles = response.data.row;
            this.loaderD = false;
          },
          function() {
            console.log("Error");
          }
        );
    },
    separarHabitacion: function(item, posicion) {
      var items = item.split("-");
      return items[posicion];
    },
    getEstatus(estatus, peticion) {
      var valor = "";
      switch (estatus) {
        case "PE":
          if (peticion == "estatus") {
            valor = "Pendiente";
          } else {
            valor = "orange";
          }
          break;
        case "C":
          if (peticion == "estatus") {
            valor = "Cancelado";
          } else {
            valor = "red";
          }
          break;
        case "PP":
          if (peticion == "estatus") {
            valor = "Pago Parcial";
          } else {
            valor = "blue";
          }
          break;
        case "PA":
        default:
          if (peticion == "estatus") {
            valor = "Pagado";
          } else {
            valor = "green";
          }
          break;
      }

      return valor;
    },
    prefijoIdentificador(tipo, identificador) {
      var prefijo = "";
      switch (tipo) {
        case "Reservacion":
          prefijo = "H" + identificador;
          break;
        case "Actividad":
          prefijo = "A" + identificador;
          break;
        case "Tour":
          prefijo = "T" + identificador;
          break;
        case "Grupo":
          prefijo = "G" + identificador;
          break;
        case "Boda":
          prefijo = "W" + identificador;
          break;
        default:
          prefijo = identificador;
          break;
      }
      return prefijo;
    },
    sumaNuevoImporte() {
      var total_saldo = 0;
      this.array_detalles.forEach(detalles => {
        total_saldo = parseFloat(total_saldo) + parseFloat(detalles.importe);
      });
      return total_saldo;
    },
    confirmRemoveDetalle(item) {
      this.dialog_eliminar_detalle = true;
      this.showMotivo = false;
      if (item == null) {
        this.showMotivo = true;
        this.mensaje_confirmacion_title =
          "¿Estas seguro de cancelar la orden " +
          this.editItemOrden.id_orden_pago +
          "?";
        this.mensaje_confirmacion_body =
          "Estas a punto de cancelar la orden. Esta acción es irreversible.";
      } else {
        this.itemEliminar = item;
        this.idEliminar = this.prefijoIdentificador(
          item.tipo_producto,
          item.identificador
        );
        this.mensaje_confirmacion_title =
          "¿Estas seguro de eliminar el artículo " + this.idEliminar + "?";
        this.mensaje_confirmacion_body =
          "Estas a punto de eliminar un detalle de la orden. Esta acción es irreversible.";
      }
    },
    clickActualizarOrden() {
      var nuevoImporte = this.sumaNuevoImporte();
      this.editItemOrden.importe_total = nuevoImporte;
      this.actualizarItem();
    },
    removeItemDetalle() {
      this.deleteItemTablaDetalles();
      var nuevoImporte = this.sumaNuevoImporte();
      this.editItemOrden.importe_total = nuevoImporte;
      this.actualizarItem();
    },
    cancelItem() {
      this.editItemOrden.estatus = "C";
      this.actualizarItem();
    },
    actualizarItem() {
      var agregaCuenta = false;
      // console.log(this.editItemOrden.importe_total);
      if (
        parseFloat(
          parseFloat(this.saldo_actual) > this.editItemOrden.importe_total
        )
      ) {
        agregaCuenta = true;
      }
      var data = {
        Orden: {
          OrdenPago: this.editItemOrden,
          OrdenPagoDetalles: this.array_detalles
        },
        agregaCuenta: agregaCuenta,
        tipo_orden: "pago"
      };
      console.log(data);
      this.$http
        .post(
          this.redirectRMTApi + "contabilidad/ordenPago/crearOrdenPago",
          data,
          {
            emulateJSON: true
          }
        )
        .then(
          function(response) {
            this.loadingConfirm = false;
            if (response.body.error == false) {
              var model = response.body;
              this.updateTablaOrdenPago(model.model);
              this.obtenerItemTablaDetalles(model.model.id_orden_pago);
              this.dialog_eliminar_detalle = false;
              this.mensaje("Se ha actualizado la orden correctamente", "green");
            } else {
              this.dialog_eliminar_detalle = false;
              this.dialog = false;
              this.mensaje(
                "Error al momento de actualizar la orden de pago.",
                "red"
              );
            }
          },
          function(response) {
            // Error
            console.log(response.data);
          }
        );
    },
    obtenerItemTablaOrden(item) {
      this.editedIndex = this.array_ordenes.indexOf(item);
      // copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino
      this.editItemOrden = Object.assign({}, item);
      this.saldo_actual = this.editItemOrden.importe_total;
      console.log(this.saldo_actual);
    },
    deleteItemTablaDetalles() {
      const index = this.array_detalles.indexOf(this.itemEliminar);
      this.array_detalles.splice(index, 1);
    },
    updateTablaOrdenPago(model) {
      if (this.editedIndex > -1) {
        this.editItemOrden = model;
        Object.assign(this.array_ordenes[this.editedIndex], this.editItemOrden);
      }
    },
    // ##################### Metodos del modal ##############
    OpenDialogPay(item) {
      this.obtenerItemTablaOrden(item);
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/ordenPago/consultaOrdenPago/idOrden/" +
            item.id_orden_pago
        )
        .then(
          function(response) {
            var model = response.body;
            var searchAbono = model.detalles.find(
              item => item.tipo_producto === "Abono-cuenta"
            );
            var searchCargo = model.detalles.find(
              item => item.tipo_producto === "Cargo-cuenta"
            );
            this.es_cuenta_fondo = false;
            this.es_cuenta_cargo = false;
            if (
              typeof searchAbono != "undefined" &&
              Object.keys(searchAbono).length > 0
            ) {
              this.es_cuenta_fondo = true;
            }
            if (
              typeof searchCargo != "undefined" &&
              Object.keys(searchCargo).length > 0
            ) {
              this.es_cuenta_cargo = true;
            }
            this.comprobantesPago.id_orden_pago = model.model.id_orden_pago;
            this.comprobantesPago.id_agencia = model.model.id_agencia;
            this.comprobantesPago.importe = model.pagos.saldores;
            this.saldoOrden = parseFloat(model.model.importe_total);

            if (model.pagos.pagado > 0) {
              this.ultimo_importe_pagado = this.redondearPrecio(
                model.pagos.pagado,
                2
              );
            }
            this.cambiarSaldoADolares();
            this.operacionesMath();
            this.dialog_pagar = true;
          },
          function() {
            console.log("Error");
          }
        );
    },
    pagarOrdenPago() {
      if (this.itemPolizas.fondo) {
        this.fondoInSuficiente = false;
        if (
          this.comprobantesPago.id_tipo == "15" &&
          this.comprobantesPago.importe > this.itemPolizas.fondo
        ) {
          this.fondoInSuficiente = true;
        }
      }
      if (
        this.comprobantesPago.id_tipo != 0 ||
        this.comprobantesPago.id_tipo != ""
      ) {
        if (this.fondoInSuficiente == false) {
          if (this.$refs.form.validate()) {
            this.hidden_click_pagar = false;
            this.show_click_pagar = true;
            var tipo_orden = "";
            if (this.es_cuenta_cargo == true) {
              tipo_orden = "compra-agencia";
            } else {
              tipo_orden = "pago";
            }
            var comprobante = {
              ComprobantesPago: this.comprobantesPago,
              comision: 0,
              total: this.total_pago,
              saldores: this.saldores,
              tipo_orden: tipo_orden,
              tipo: "agencia"
            };
            this.$http
              .post(
                this.redirectRMTApi +
                  "contabilidad/comprobantesPago/generarComprobantePago",
                comprobante,
                {
                  emulateJSON: true
                }
              )
              .then(
                function(response) {
                  this.hidden_click_pagar = true;
                  this.show_click_pagar = false;
                  if (response.body.error == false) {
                    this.ultimo_comprobante_pago = comprobante.ComprobantesPago;
                    this.comprobantesPago = response.body.comprobante;
                    this.id_comprobante_pago = this.comprobantesPago.id_comprobante_pago;

                    var ultimo_importe_pagado =
                      parseFloat(this.ultimo_importe_pagado) +
                      parseFloat(this.comprobantesPago.importe);
                    this.ultimo_importe_pagado = this.redondearPrecio(
                      ultimo_importe_pagado,
                      2
                    );

                    if (this.ultimo_importe_pagado > 0) {
                      var importe_saldo =
                        parseFloat(this.saldoOrden) -
                        parseFloat(this.ultimo_importe_pagado);
                      this.comprobantesPago.importe = this.redondearPrecio(
                        importe_saldo,
                        2
                      );
                    } else {
                      this.comprobantesPago.importe = comprobante.saldores;
                    }
                    // console.log('ultimo importe: ' + this.ultimo_importe_pagado);
                    // console.log('saldores: ' + comprobante.saldores);
                    this.total_pago = this.comprobantesPago.importe;
                    this.cambiarSaldoADolares();
                    this.resetCampos();
                    this.operacionesMath();

                    if (this.comprobantesPago.importe <= 0) {
                      this.ultimo_comprobante_pago = [];
                      this.ultimo_importe_pagado = 0;
                      this.dialog_pagar = false;
                    }

                    this.updateTablaOrdenPago(response.body.orden);
                    this.modalSuccessPago(
                      response.body.comprobante,
                      tipo_orden
                    );
                  } else {
                    this.mensaje(
                      "Error al momento de guardar el comprobante de pago",
                      "red"
                    );
                  }
                },
                function(response) {
                  // Error
                  console.log(response.body);
                }
              );
          }
        } else {
          this.mensaje(
            "No tiene fondo suficiente para saldar el total de la orden.",
            "warning"
          );
        }
      } else {
        this.mensaje("Elija un tipo de pago.", "warning");
      }
    },
    modalSuccessPago(model, tipo_orden) {
      console.log(tipo_orden);

      var that = this;
      that.pdfComprobantes = [];
      this.dialog_confirmacion_pago = true;
      this.estatus_pago = "success";
      this.alert_mensaje = "Pago realizado con éxito.";
      var redirect_orden = "";
      redirect_orden = "contabilidad/ordenPago/GeneratePdf/idOrden/";
      that.pdfComprobantes.push({
        url:
          this.redirectRMT +
          redirect_orden +
          this.comprobantesPago.id_orden_pago +
          "/formato/" +
          model.tipo_formato,
        formato: model.tipo_formato
      });

      that.pdfComprobantes.push({
        url:
          this.redirectRMT +
          redirect_orden +
          this.comprobantesPago.id_orden_pago +
          "/formato/orden",
        formato: "orden"
      });
      console.log(this.pdfComprobantes);
    },
    consultaFormulario() {
      this.$http
        .get(this.redirectRMTApi + "contabilidad/ordenPago/consultaFormulario")
        .then(
          function(response) {
            this.apiForms = response.body;
            this.cuentas = this.apiForms.cuentas;
            this.tasa_cambio = response.body.tasa_cambio;
          },
          function() {
            console.log("Error");
          }
        );
    },
    getPolizas() {
      if (this.comprobantesPago.id_tipo == "15") {
        this.$http
          .get(
            this.redirectRMTApi +
              "contabilidad/comprobantesPago/polizasAgencia/agencia/" +
              +this.editItemOrden.id_agencia
          )
          .then(
            function(response) {
              this.itemPolizas = response.data;
              this.itemPolizas.fondo = parseFloat(this.itemPolizas.fondo) * -1;
              var importePago = parseFloat(this.comprobantesPago.importe);
              var importeFondo = parseFloat(this.itemPolizas.fondo);
              if (importePago > importeFondo && importeFondo > 0) {
                this.comprobantesPago.importe = parseFloat(
                  this.itemPolizas.fondo
                );
              }
              // this.comprobantesPago.importe = parseFloat(this.itemPolizas.fondo);
              this.operacionesMath();
            },
            function() {
              console.log("Error");
            }
          );
      }
    },
    comisionBancaria() {
      this.$http
        .post(
          this.redirectRMTApi + "contabilidad/ordenPago/comisionbancaria",
          {
            cuenta: this.comprobantesPago.id_cuenta,
            plan: this.comprobantesPago.id_planpago
          },
          {
            emulateJSON: true
          }
        )
        .then(
          function(response) {
            if (
              this.comprobantesPago.id_planpago != "" &&
              this.comprobantesPago.id_cuenta != ""
            ) {
              if (response.body != "") {
                this.comprobantesPago.comision = response.body;
              } else {
                this.comprobantesPago.comision = 0;
              }

              if (this.comprobantesPago.importe > 0) {
                this.operacionesMath();
              }
            }
          },
          function(response) {
            // Error
            console.log(response.data);
          }
        );
    },
    buscaCuentaBanco() {
      var banco = "banco=" + this.comprobantesPago.id_banco;
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/ordenPago/buscaCuentaBanco?" +
            banco
        )
        .then(
          function(response) {
            var respuesta = response.body;
            if (respuesta.length > 0) {
              this.cuentas = response.body;
            } else {
              this.cuentas = this.apiForms.cuentas;
            }
          },
          function() {
            console.log("Error");
          }
        );
    },
    abrirComprobantes(item) {
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/comprobantesPago/ObtenerOrdenComprobantes/item/" +
            item +
            "/tipo/agencia"
        )
        .then(
          function(response) {
            var respuesta = response.body;
            window.open(
              this.redirectRMT +
                "contabilidad/ordenPago/GeneratePdf/idOrden/" +
                item +
                "/formato/orden",
              "_blank"
            );
            respuesta.forEach(pdf => {
              window.open(
                this.redirectRMT +
                  "contabilidad/ordenPago/GeneratePdf/idOrden/" +
                  item +
                  "/formato/" +
                  pdf.tipo_formato,
                "_blank"
              );
            });
          },
          function() {
            console.log("Error");
          }
        );
    },
    cambiarSaldoADolares() {
      var saldo_usd =
        parseFloat(this.saldoOrden) / parseFloat(this.tasa_cambio.importe);
      this.saldoOrdenUSD = this.redondearPrecio(saldo_usd, 2);
    },
    modificarTipoCambio(tasa_cambio) {
      this.tasa_cambio = tasa_cambio;
      this.mensaje("Usted a modificado el tipo de cambio.", "success");
      this.cambiarSaldoADolares();
    },
    modificoPago() {
      var saldores = 0;
      if (
        this.comprobantesPago.id_tipo != "8" &&
        this.comprobantesPago.id_tipo != "9"
      ) {
        this.total_pago = this.comprobantesPago.importe;
        saldores =
          parseFloat(this.saldoOrden) -
          parseFloat(this.comprobantesPago.importe);
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
      var total =
        parseFloat(this.importe_comision) +
        parseFloat(this.comprobantesPago.importe);
      total = this.redondearPrecio(total, 2);
      this.total_pago = total;
      var saldores =
        parseFloat(this.saldoOrden) -
        parseFloat(this.comprobantesPago.importe) -
        parseFloat(this.ultimo_importe_pagado);
      saldores = this.redondearPrecio(saldores, 2);
      this.saldores = saldores;
    },
    redondearPrecio(value, decimal) {
      return (Math.round(value * 100) / 100).toFixed(decimal);
    },
    iconoTipoPago(id_tipo) {
      var icono = "";
      switch (parseInt(id_tipo)) {
        case 1:
          icono = "fas fa-cash-register";
          break;
        case 7:
          icono = "fas fa-money-bill-alt";
          break;
        case 8:
          icono = "fas fa-credit-card";
          break;
        case 9:
          icono = "fas fa-money-check";
          break;
        case 15:
          icono = "fas fa-file-invoice-dollar";
          break;
        case 2:
          icono = "fas fa-money-check-alt";
          break;
        case 6:
          icono = "fas fa-exchange-alt";
          break;
        default:
          icono = "fas fa-dollar-sign";
          break;
      }
      return icono;
    },
    showMetodoPago(item) {
      if (
        item == "15" &&
        (this.es_cuenta_fondo == true || this.es_cuenta_cargo == true)
      ) {
        return false;
      } else {
        return true;
      }
    },
    fechaHoy(log){
      var bandera = false;
      
      if (moment(log).format("DD/MM/YYYY") == moment().format('DD/MM/YYYY')) {
        bandera = true;
      }
      return bandera;
    },
    resetCampos() {
      // if (this.comprobantesPago.id_tipo !== "15" && this.ultimo_importe_pagado > 0) {
      //   this.comprobantesPago.importe = this.saldoOrden;
      // }
      if (
        this.comprobantesPago.id_tipo !== "15" &&
        this.comprobantesPago.importe > 0
      ) {
        if (this.ultimo_importe_pagado > 0) {
          var importe_saldo =
            parseFloat(this.saldoOrden) -
            parseFloat(this.ultimo_importe_pagado);
          this.comprobantesPago.importe = this.redondearPrecio(
            importe_saldo,
            2
          );
        } else {
          this.comprobantesPago.importe = this.saldoOrden;
        }
      }
      this.comprobantesPago.cliente = "";
      this.comprobantesPago.referencia = "";
      this.comprobantesPago.id_banco = "";
      this.comprobantesPago.id_planpago = "";
      this.comprobantesPago.tarjeta = "";
      this.comprobantesPago.id_cuenta = "";
      this.comprobantesPago.comision = 0;
      this.comprobantesPago.observaciones = "";
      this.comprobantesPago.efectivo_facturable = "0";
      this.importe_comision = 0;
      this.itemPolizas = [];
      this.fondoInSuficiente = false;
      if (this.comprobantesPago.id_tipo == "15") {
        this.getPolizas();
      }
      this.cuentas = this.apiForms.cuentas;
      this.operacionesMath();
    },
    mensaje(texto, color) {
      this.color = color;
      this.mode = "multi-line";
      this.snackbar = true;
      this.text = texto;
      this.timeout = 6000;
      this.x = "right";
      this.y = "bottom";
    },
    addParametersFile(file, xhr, formData) {
      formData.append("idComprobante", this.id_comprobante_pago);
    },
    clearDropzone() {
      this.$refs.myVueDropzone.removeAllFiles();
    }
  },
  computed: {},
  mounted() {
    this.loadOrdenes();
  }
};
</script>

<style scoped>
#form-buy > .row > .col-12 {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.paymentCont {
  display: flex;
  flex-flow: row wrap;
}

.paymentCont > div {
  padding: 0.5rem;
}

.paymentCont input[type="radio"] {
  display: none;
}
.paymentCont input[type="radio"]:not(:disabled) ~ label {
  cursor: pointer;
}

.paymentCont label {
  height: 100%;
  display: block;
  background: white;
  border: 1px solid #e7ebee;
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  box-shadow: 0px 3px 10px -2px rgba(161, 170, 166, 0.5);
  position: relative;
}

.paymentCont input[type="radio"]:checked + label {
  border: 2px solid #20df80;
}

/* agregar en tipo de pago el pago cuenta de fondo */

@media only screen and (max-width: 700px) {
  .paymentCont {
    flex-direction: column;
  }
}
</style>
