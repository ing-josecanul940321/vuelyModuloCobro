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
      // console.log(item);
      // console.log(queryText);
      // var search = queryText.split(" ");
      // var bandera = false;
      // lista = item.nombre.toLowerCase().includes(queryText.toLowerCase());
      // search.forEach(palabra => {
      //   if (item.nombre.toLowerCase().includes(palabra.toLowerCase())) {
      //       bandera = true;
      //     }
      // });
      return item.nombre.toLowerCase().includes(queryText.toLowerCase());
    }
  },
  watch: {
    search(val) {
      this.$emit("change-search", val);
    }
  }
};
</script>