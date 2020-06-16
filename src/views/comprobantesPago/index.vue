<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid>
      <v-row class="mt-0">
        <app-card
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
          customClasses="mb-0 mt-0"
        >
          <h3>Comprobantes de Pago</h3>
          <v-data-table
            :headers="headers_comprobantes"
            :items="array_comprobantes"
            item-key="name"
            class="elevation-1"
            :loading="loader"
            loading-text="Cargando... Espere"
          >
            <template v-slot:item="props">
              <tr>
                <td class="text-right">
                  <a
                    :href="redirectRMT + 'contabilidad/ordenPago/GeneratePdf/idOrden/' + props.item.id_orden_pago + '/formato/' + props.item.tipo_formato"
                    target="_blank"
                  >{{ props.item.id_comprobante_pago }}</a>
                </td>
                <td>{{ props.item.descripcion }}</td>
                <td class="text-right">$ {{ $RMT.formatoPrecio(props.item.importe) }}</td>
                <td class="text-center">{{ formatDate(props.item.log) }}</td>
                <td>{{ props.item.nombre_agencia }}</td>
                <td>{{ props.item.nombre_usuario }}</td>
                <td class="text-right">{{ props.item.comision }}</td>
                <td>{{ tipoFormato(props.item.tipo_formato) }}</td>
                <td>
                  <v-chip
                    :color="getEstatus(props.item.estatus,'color')"
                    dark
                  >{{ getEstatus(props.item.estatus,'estatus') }}</v-chip>
                </td>
                <td class="text-center">
                  <!-- agregar en facturacion y en el metodo crear factura el tipo comprobante -->
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <a
                        v-show="props.item.facturacion == true"
                        v-on="on"
                        :href="baseUrl + 'facturacionCfdi/factura/idrecibo/' + props.item.id_comprobante_pago + '/tipo/comprobante'"
                        target="_blank"
                        style="color:black; padding-right:5px;"
                      >
                        <v-icon>fas fa-file-export</v-icon>
                      </a>
                    </template>
                    <span>Facturar Comprobante</span>
                  </v-tooltip>
                  <div v-show="props.item.facturas.length > 0">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <a
                          v-on="on"
                          :href="baseUrl + 'facturacionCfdi/factura/idrecibo/' + props.item.id_comprobante_pago + '/tipo/comprobante'"
                          target="_blank"
                          style="color:black; padding-right:5px;"
                        >
                          <v-icon>fas fa-file-invoice</v-icon>
                        </a>
                      </template>
                      <span>Facturado</span>
                    </v-tooltip>
                  </div>
                  <div v-show="props.item.facturas.length == 0 && props.item.facturacion==false">
                    <span>No facturable</span>
                  </div>
                </td>
                <td>
                  <!-- <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-show="props.item.estatus !== 'C'"
                        class="ma-2"
                        text
                        icon
                        color="red lighten-2"
                        v-on="on"
                      >
                        <v-icon>mdi-cancel</v-icon>
                      </v-btn>
                    </template>
                    <span>Cancelar Comprobante</span>
                  </v-tooltip>-->
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-on="on"
                        @click="abrirDialogArchivos(props.item)"
                      >
                        <v-icon>fas fa-file</v-icon>
                      </v-btn>
                    </template>
                    <span>Ver Archivos</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </app-card>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog_archivos"
      fullscreen
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="pink">
          <v-toolbar-title>Comprobante de pago #{{ editItemComprobante.id_comprobante_pago }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="
                dialog_archivos = false;
                clearDropzone();
                editItemComprobante = [];
                editedIndex = -1;
              "
              class="pt-0"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <app-card colClasses="col-12 " customClasses="mb-0 mt-0">
            <h3>Archivos Subidos</h3>
            <CoolLightBox :items="files" :index="index" :effect="'fade'" @close="index = null"></CoolLightBox>
            <v-row dense class="images-wrapper">
              <v-col
                v-show="array_files.count > 0"
                v-for="(file,fileIndex) in files"
                :key="fileIndex"
                cols="2"
                class="image"
              >
                <v-card>
                  <v-img
                    v-show="!validaArchivo(file.src)"
                    :src="file.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    @click="index = fileIndex"
                    style="cursor: pointer;"
                  >
                    <!-- <v-card-title v-text="'Pre-fab homes'"></v-card-title> -->
                  </v-img>
                  <v-card v-show="validaArchivo(file.src)" style="text-align:center;">
                    <a
                      :href=" 'https://rutamayatravel.com/images/archivos-comprobantespagos/' + file.title"
                      target="_blank"
                    >
                      <v-img
                        src="https://icons.iconarchive.com/icons/hopstarter/soft-scraps/128/Adobe-PDF-Document-icon.png"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        style="cursor: pointer;"
                      >
                        <!-- <v-card-title v-text="'Pre-fab homes'"></v-card-title> -->
                      </v-img>
                    </a>
                  </v-card>
                  <v-card-actions>
                    <v-btn icon @click="deleteFile(file)">
                      <v-icon>fas fa-trash</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col v-show="array_files.count == 0">
                <v-alert type="info">El comprobante no tiene archivos en el servidor</v-alert>
              </v-col>
            </v-row>
          </app-card>
          <app-card colClasses="col-12 " customClasses="mb-0 mt-0">
            <h3>Subir Comprobante</h3>
            <v-row>
              <v-col cols="6 mx-auto">
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  v-on:vdropzone-sending="addParametersFile"
                  v-on:vdropzone-complete="successUpload"
                ></vue-dropzone>
              </v-col>
            </v-row>
          </app-card>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :right="true"
      :color="color_alerta"
      :timeout="6000"
    >
      {{mensaje_alerta}}
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
      array_comprobantes: [],
      headers_comprobantes: [
        {
          text: "Folio",
          value: "id_comprobante_pago",
          sortable: true
        },
        { text: "Tipo de Pago", value: "descripcion", sortable: true },
        { text: "Importe", value: "importe", sortable: true },
        { text: "Fecha Creación", value: "log", sortable: true },
        { text: "Para", value: "nombre_agencia", sortable: true },
        { text: "Usuario Elaboró", value: "nombre_usuario", sortable: true },
        { text: "% Comisión", value: "comision", sortable: true },
        { text: "Formato", value: "tipo_formato", sortable: true },
        { text: "Estatus", value: "estatus", sortable: true },
        { text: "Facturación", value: "actions", sortable: false },
        { text: "Opciones", value: "actions", sortable: false }
      ],
      dialog_archivos: false,
      editedIndex: -1,
      editItemComprobante: [],
      array_files: [],
      files: [],
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
      index: null,
      snackbar: false,
      color_alerta: "",
      mensaje_alerta: ""
    };
  },
  methods: {
    loadComprobantes() {
      // alert("mounted");
      this.loader = true;
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/comprobantesPago/obtenerComprobantesPago"
        )
        .then(
          function(response) {
            this.array_comprobantes = response.data;
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
    tipoFormato(text) {
      var formato = "";
      switch (text) {
        case "egreso":
          formato = "Póliza de Egreso";
          break;
        case "movimiento":
          formato = "Comp. Movimiento";
          break;
        case "credito":
          formato = "Nota de Crédito";
          break;
        case "recibo":
        default:
          formato = "Recibo";
          break;
      }
      return formato;
    },
    validaArchivo(archivo) {
      var bandera = false;
      if (archivo.indexOf(".pdf") !== -1) {
        bandera = true;
      } else if (archivo.indexOf(".doc") !== -1) {
        bandera = true;
      } else if (archivo.indexOf(".docx") !== -1) {
        bandera = true;
      }

      return bandera;
    },
    getEstatus(estatus, peticion) {
      var valor = "";
      switch (estatus) {
        case "C":
          if (peticion == "estatus") {
            valor = "Cancelado";
          } else {
            valor = "red";
          }
          break;
        case "AP":
          if (peticion == "estatus") {
            valor = "Aplicado";
          } else {
            valor = "orange";
          }
          break;
        case "P":
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
    abrirDialogArchivos(item) {
      this.obtenerItemTablaComprobante(item);
      this.getFiles();
    },
    obtenerItemTablaComprobante(item) {
      this.editedIndex = this.array_comprobantes.indexOf(item);
      this.editItemComprobante = Object.assign({}, item);
    },
    getFiles() {
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/comprobantesPago/getFiles/idPago/" +
            this.editItemComprobante.id_comprobante_pago
        )
        .then(
          response => {
            this.files = [];
            this.dialog_archivos = true;
            this.array_files = response.body;
            this.array_files.files.forEach(file => {
              this.files.push({
                src:
                  "https://rutamayatravel.com/images/archivos-comprobantespagos/" +
                  file.archivo,
                title: file.archivo,
                description: "Comprobante " + file.id_comprobante_pago,
                id: file.id_comprobante,
                comprobante: file.id_comprobante_pago
              });
            });
          },
          error => {
            console.log(error);
          }
        );
    },
    deleteFile(item) {
      this.$http
        .post(
          this.redirectRMTApi + "contabilidad/comprobantesPago/borrarArchivo",
          { id: item.id },
          {
            emulateJSON: true
          }
        )
        .then(
          response => {
            this.color_alerta = "success";
            this.mensaje_alerta = response.body;
            this.snackbar = true;
            this.getFiles();
          },
          error => {
            console.log(error);
            this.color_alerta = "error";
            this.mensaje_alerta =
              "Ocurrió un error en la eliminación de los archivos. " + error;
            this.snackbar = true;
          }
        );
    },
    addParametersFile(file, xhr, formData) {
      formData.append(
        "idComprobante",
        this.editItemComprobante.id_comprobante_pago
      );
    },
    successUpload(response) {
      console.log(response);
      this.getFiles();
    },
    clearDropzone() {
      this.$refs.myVueDropzone.removeAllFiles();
    }
  },
  computed: {},
  mounted() {
    this.loadComprobantes();
  }
};
</script>