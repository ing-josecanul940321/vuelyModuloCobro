<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid>
      <v-card-title>
        Pólizas
        <v-spacer></v-spacer>
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
        dense
        :headers="headers"
        :items="polizas"
        sort-by="id_poliza"
        class="elevation-1"
        :loading="loader"
        loading-text="Cargando... Espere"
        :search="search"
      >
      <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Nueva Cuenta</v-btn>
              </template>-->
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedPoliza.id_poliza" label="Póliza" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedPoliza.fecha_gasto" label="Fecha Gasto"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedPoliza.observaciones" label="Observaciones"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedPoliza.concepto" label="Concepto"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :items="estatusSelect"
                          item-text="valor"
                          item-value="tipo"
                          label="Estatus"
                          v-model="editedPoliza.estatus"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn
                    v-if="editedPoliza.id_cuenta"
                    color="blue darken-1"
                    text
                    @click="save(editedPoliza.id_cuenta)"
                  >{{ formTitle }}</v-btn>
                  <v-btn v-else color="blue darken-1" text @click="save(0)">{{ formTitle }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item="props">
          <tr>
            <td class="text-right">{{ props.item.num_poliza }}</td>
            <td>{{ tipoPoliza(props.item.tipo) }}</td>
            <td>{{ $formatDate(props.item.fecha) }}</td>
            <td>$ {{$RMT.formatoPrecio(props.item.importe)}}</td>
            <td class="text-right">{{ props.item.referencia }}</td>
            <td>{{ tipoRef(props.item.tipo_ref) }}</td>
            <td>{{ props.item.concepto }}</td>
            <td>{{ estatusPoliza(props.item.estatus) }}</td>
            <td>{{ props.item.observaciones }}</td>
            <td>{{ props.item.elaboro }}</td>
            <td>
              <v-btn class="ma-2" outlined fab small color="success" @click="editItem(props.item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-snackbar
        v-model="snackbar"
        :color="'green'"
        :multi-line="'multi-line'"
        :timeout="3000"
        :right="true"
        :bottom="true"
      >
        {{text_snackbar}}
        <v-btn dark text @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    loader: false,
    snackbar: false,
    search: "",
    text_snackbar: "",
    headers: [
      {
        text: "Núm. Póliza",
        value: "num_poliza"
      },
      { text: "Tipo", value: "tipo" },
      { text: "Fecha", value: "fecha" },
      { text: "Importe", value: "importe" },
      { text: "Referencia", value: "referencia" },
      { text: "Tipo Referencia", value: "tipo_ref" },
      { text: "Concepto", value: "concepto" },
      { text: "Estatus", value: "estatus" },
      { text: "Observaciones", value: "observaciones" },
      { text: "Elaboró", value: "elaboro" },
      { text: "Opciones", value: "actions" }
    ],
    polizas: [],
    editedIndex: -1,
    editedPoliza: {
      id_poliza: "",
      fecha_gasto: "",
      concepto: "",
      observaciones:"",
      estatus: "",
    },
    defaultPoliza: {
      fecha_gasto: "",
      concepto: "",
      observaciones:"",
      estatus: "",
    },
    estatusSelect: [
      { valor: "Pagado", tipo: "P" },
      { valor: "Pendiente", tipo: "Pd" },
      { valor: "Cancelado", tipo: "C" },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Cuenta" : "Editar";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.loader = true;
      this.$http
        .get(
          this.redirectRMTApi +
            "contabilidad/contPoliza/obtenerPolizas"
        )
        .then(
          function(response) {
            this.polizas = response.data;
            this.loader = false;
          },
          function() {
            console.log("Error");
          }
        );
    },

    editItem(item) {
      this.editedIndex = this.polizas.indexOf(item);
      this.editedPoliza = Object.assign({}, item);
      // console.log(this.editedPoliza);
      // this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedPoliza = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(id_item) {
      console.log(id_item);
      
      // if (this.editedIndex > -1) {
      //   var editedIndex = this.editedIndex;
      //   this.$http
      //     .post(
      //       this.redirectRMTApi +
      //         "contabilidad/contCatalogoCtas/update/id/" +
      //         id_item,
      //       {
      //         CatalogoCtas: this.editedPoliza
      //       },
      //       { emulateJSON: true }
      //     )
      //     .then(function(response) {
      //       this.editedPoliza = response.body;
      //       Object.assign(this.cuentas[editedIndex], this.editedPoliza);
      //       this.close();
      //       this.text_snackbar = "Datos actualizados.";
      //       this.snackbar = true;
      //     });
      // } else {
      //   this.cuentas.push(this.editedPoliza);
      //   this.close();
      // }
    },

    tipoPoliza(tipo) {
      var tipoPoliza = "";
      switch (tipo) {
        case "D":
          tipoPoliza = "Diario";
          break;
        case "E":
          tipoPoliza = "Egreso";
          break;
        case "I":
          tipoPoliza = "Ingreso";
          break;
        default:
          tipoPoliza = "Indefinido";
          break;
      }

      return tipoPoliza;
    },
    tipoRef(referencia) {
      var tipoRef = "";
      switch (referencia) {
        case "0":
          tipoRef = "Cheque";
          break;
        case "1":
          tipoRef = "Transferencia";
          break;
        default:
          tipoRef = "Indefinido";
          break;
      }

      return tipoRef;
    },
    estatusPoliza(estatus) {
      var estatusPoliza = "";
      switch (estatus) {
        case "Pd":
          estatusPoliza = "Pendiente";
          break;
        case "P":
          estatusPoliza = "Pagado";
          break;
        case "C":
          estatusPoliza = "Cancelado";
          break;
        default:
          estatusPoliza = "Indefinido";
          break;
      }

      return estatusPoliza;
    }
  }
};
</script>

<style scoped>
  /* .v-data-table table tbody tr td{
    white-space: initial;
  } */
</style>