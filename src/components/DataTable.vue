<template>
  <v-card class="ma-2 ma-md-8 mainWydatki" dark>

<div class="d-flex flex-row-reverse crud">
  <Dialog :headers="headers" />
  </div>
    <v-card-title>
      {{title}}
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
    
    calculate-widths
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
      v-if="!myLoading"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-data-table v-else item-key="name" class="elevation-1" dark loading loading-text="Loading... Please wait"></v-data-table>
  </v-card>
</template>

<script>
import Dialog from './Dialog_new_edit.vue'

export default {
  data () {
    return {
      search: '',
      title: 'Wydatki',
      headersParam: { id: { order: 1, show:-1 }, bank: { order: 2 }, kwota: { order: 3 }, data: { order: 4 }, typ: { order: 5 }, typ2: { order: 6, show:-1  }, gdzie: { order: 7 }, kogo: { order: 8 }, osoba: { order: 9, show:-1 }, powiazane: { order: 10, show:-1 }, opis: { order: 11 }, action: {order:12} },    
    }
  },
  components: {
    Dialog
  },
  computed: {
    rows () {
      return this.$store.getters.rows
    },
    headers () {
      let objHeads = []
      for (const el in this.rows[0]) {
        let order = '';
        if (typeof this.headersParam !== 'undefined' && typeof this.headersParam[el] !== 'undefined') {
          if (this.headersParam[el].show == -1) continue 
          if (typeof this.headersParam[el].order !== 'undefined')
            order = this.headersParam[el].order 
          else
          order = 1000
        } else { 
          order = 1000 } // będzie gdzieś na końcu

        let obj = { text: el.toUpperCase(), value: el, edit: '', order, align: 'center' }
        objHeads.push(obj)
      }
      if (this.headersParam['action'].show != -1) objHeads.push({ text: 'Actions', value: 'action', sortable: false, order: this.headersParam['action'].order });
      objHeads.sort((a,b) => a.order - b.order)
      return objHeads
    },
    desserts () {
      return this.rows
    },
    myLoading () {
      return this.$store.getters.loading
    }
  },
  methods:{
    editItem(item){
      console.log('edit ',item)
    },
    deleteItem(item){
      this.$store.dispatch('deleteRow',item)
      console.log('delete ',item)
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
      i{
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
