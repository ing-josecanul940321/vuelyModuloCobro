<template>
  <div>
    <v-autocomplete
      :value="select_val"
      @input="handleInput"
      :items="lista"
      :loading="isLoading"
      :search-input.sync="search"
      clearable
      hide-selected
      hide-no-data
      item-text="nombre"
      item-value="id"
      :filter="getLista"
      :label="tituloBusqueda"
      hint="ESCRIBA MAS DE 3 LETRAS..."
      no-data-text="ESCRIBA MAS DE 3 LETRAS..."
      return-object
      @click="$emit('click-autocomplete')"
      @change="$emit('change-autocomplete')"
    >
      <template v-slot:item="data">
        <template>
          <v-list-item-avatar>
            <img :src="data.item.foto" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="data.item.nombre"></v-list-item-title>
            <v-list-item-subtitle style="font-size:12px;" v-text="data.item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
export default {
  name: "autocomplete",
  props: ["select_val", "lista", "tituloBusqueda", "isLoading"],
  data() {
    return {
      URLIMG: "https://www.rutamayatravel.com/imagenes/",
      search: null
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
    getLista(item, queryText) {
      var search = queryText.split(" ");
      var totalPalabras = search.length;

      var bandera = false;
      var cont = 0;
      var hotel = item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //quitar tildes y ñ
      search.forEach(palabra => {
        var sensitive = palabra.toLowerCase();
        var expresion = new RegExp(`${sensitive}.*`, "i");
        var matchesRegex = expresion.test(hotel.toLowerCase());
        if (matchesRegex) {
          cont = cont + 1;
        }
      });
      if (cont == totalPalabras) {
        bandera = true;
      }

      // return item.nombre.toLowerCase().includes(queryText.toLowerCase());
      return bandera;
    }
  },
  watch: {
    search(val) {
      this.$emit("change-search", val);
    }
  }
};
</script>