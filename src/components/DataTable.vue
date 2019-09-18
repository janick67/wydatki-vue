<template>
  <v-card class="ma-2 ma-md-8 mainWydatki" dark>


<div class="d-flex flex-row-reverse crud">
  <Dialog :headers="headers" />
  </div>     
    <v-card-title>
      Wydatki
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
      v-if="!myLoading"
    >
    </v-data-table>
    <v-data-table v-else item-key="name" class="elevation-1" dark loading loading-text="Loading... Please wait"></v-data-table>
  </v-card>
</template>

<script>
import Dialog from './Dialog_new_edit.vue'

export default {
  data () {
    return {
      search:''
    }
  },
  components:{
    Dialog
  },
  computed: {
    rows () {
      return this.$store.getters.rows
    },
    headers () {
      let objHeads = []
      for (const el in this.rows[0]) {
        let obj = { text: el.toUpperCase(), value: el, edit:'' }
        objHeads.push(obj)
      }
      return objHeads
    },
    desserts () {
      return this.rows
    },
    myLoading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" >
.v-card.mainWydatki{
  .crud{
    border-bottom: solid var(--v-accent-darken1) 2px;
  }


  > div{
    background-color: var(--v-accent-base);
  }

  .v-data-table{

    thead{
      background-color: var(--v-accent-lighten1);
    }

    tbody{
      tr{
        background-color: var(--v-accent-lighten4);
        color: black;       
      }

      tr:not(:last-child){
        td.v-data-table__mobile-row:last-child{
          border-bottom: solid var(--v-accent-darken1) 2px !important;
        }
      }

      tr:hover{
        background-color: var(--v-accent-lighten3) !important;
      }
  }
    div.v-data-footer{
      background-color: var(--v-accent-lighten1);
      font-weight: bold;
      font-size: .8rem;
    }
  }
}
</style>