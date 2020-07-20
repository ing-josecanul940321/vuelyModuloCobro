<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container>
      <v-card>
        <v-container class="pl-5 pr-5 py-0">
          <v-form id="form-buy" v-model="validForm" ref="form" lazy-validation>
            <v-row>
              <v-col cols="12" style="padding-bottom:0px;">
                <h4 class="py-5 px-5">ORIGEN</h4>
                <span>(Escoge el servicio al que le restaras dinero)</span>
              </v-col>
              <!-- <v-col cols="12">
              <v-radio-group v-model="servicio" row>
                <v-radio label="Grupo" value="Grupo"></v-radio>
                <v-radio label="Boda" value="Boda"></v-radio>
                <v-radio label="Bloqueo" value="Habitacion"></v-radio>
                <v-radio label="Reservación" value="Reservacion"></v-radio>
                <v-radio label="Actividad" value="Actividad"></v-radio>
                <v-radio label="Tour" value="Tour"></v-radio>
              </v-radio-group>
              </v-col>-->
              <v-col cols="3">
                <v-select
                  v-model="Origen.servicio"
                  :items="servicios"
                  item-value="valor"
                  item-text="text"
                  label="Servicio"
                  @change="addPrefix('origen')"
                  :rules="inputRules"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="Origen.id"
                  label="Identificador"
                  required
                  :prefix="prefixOrigen"
                  :placeholder="placeholderIdOrigen"
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="Origen.monto"
                  label="Monto"
                  prefix="$"
                  required
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field v-model="Origen.motivo" label="Motivo" required :rules="inputRules"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" style="padding-bottom:0px; padding-top: 0px">
                <h4 class="py-5 px-5">DESTINO</h4>
                <span>(Escoge el servicio al que le asignaras dinero)</span>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="Destino.servicio"
                  :items="servicios"
                  item-value="valor"
                  item-text="text"
                  label="Servicio"
                  @change="addPrefix('destino')"
                  :rules="inputRules"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="Destino.id"
                  label="Identificador"
                  required
                  :prefix="prefixDestino"
                  :placeholder="placeholderIdDestino"
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col cols="7 text-right">
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="success darken-1"
                  class="ma-2 white--text"
                  @click="transferir(); loading = true;"
                >Transferir</v-btn>
              </v-col>
            </v-row>
          </v-form>

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
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servicio: "Grupo",
      prefixOrigen: "",
      prefixDestino: "",
      placeholderIdDestino: "",
      placeholderIdOrigen: "",
      validForm: true,
      servicios: [
        {
          valor: "Actividad",
          text: "Activity"
        },
        {
          valor: "Boda",
          text: "Boda"
        },
        {
          valor: "Grupo",
          text: "Grupo"
        },
        {
          valor: "Reservacion",
          text: "Reservación"
        },
        {
          valor: "Roominglist",
          text: "Roominglist"
        },
        {
          valor: "Tour",
          text: "Tour"
        }
      ],
      Origen: {
        servicio: "",
        id: "",
        monto: 0.0,
        motivo: ""
      },
      Destino: {
        servicio: "",
        id: ""
      },
      loader: null,
      loading: false,
      inputRules: [v => !!v || "Campo Obligatorio"],
      // atributos mensaje
      color: "",
      mode: "",
      snackbar: false,
      text: "Hello, I'm a snackbar",
      timeout: 6000,
      x: null,
      y: "top"
    };
  },
  methods: {
    transferir() {
      // if (this.$refs.form.validate()) {
      // }
      var data = {
        Origen: this.Origen,
        Destino: this.Destino
      };
      this.$http
        .post(
          this.redirectRMTApi + "contabilidad/ordenPago/transferirMonto",
          data,
          {
            emulateJSON: true
          }
        )
        .then(
          response => {
            var respuesta = response.body;
            this.loading = false;

            if (respuesta.error == false) {
              this.mensaje("Movimientos hechos satisfactoriamente", "green");
              this.reset();
            } else {
              this.mensaje(respuesta.mensaje, "danger");
            }
            console.log(response);
          },
          error => {
            this.loading = false;
            console.log(error);
          }
        );
    },
    addPrefix(servicio) {
      var modulo_servicio =
        servicio == "origen" ? this.Origen.servicio : this.Destino.servicio;
      var prefix = "";
      var placeholder = "";
      switch (modulo_servicio) {
        case "Reservacion":
          prefix = "H";
          break;
        case "Tour":
          prefix = "T";
          break;
        case "Actividad":
          prefix = "A";
          break;
        case "Boda":
          prefix = "W";
          break;
        case "Grupo":
          prefix = "G";
          break;
        case "Roominglist":
          prefix = "R";
          placeholder = "IdBloqueo-#Habitación";
          break;
      }

      if (servicio == "origen") {
        this.prefixOrigen = prefix;
        this.placeholderIdOrigen = placeholder;
      } else {
        this.prefixDestino = prefix;
        this.placeholderIdDestino = placeholder;
      }
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
    reset() {
      this.Origen = {
        id: "",
        monto: 0.0,
        motivo: ""
      };
      this.Destino = {
        id: ""
      };
    }
  }
};
</script>