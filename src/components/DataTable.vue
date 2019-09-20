<template>
  <v-card class="ma-2 ma-md-8 mainWydatki" dark>

<div class="d-flex flex-row-reverse crud">
  <Dialog :headers="headers" ref="Dialog" @saveEdit="onSaveEdit"/>
  </div>
    <v-card-title>
      {{title}}
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Szukaj..."
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
      no-data-text="Brak danych... Możesz dodać nowe wpisy"
      no-results-text="Brak pasujących wyników"
      class="elevation-1"
      v-if="!myLoading"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          medium
          light
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          medium
          light
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-data-table v-else item-key="name" class="elevation-1" dark loading loading-text="Trwa ładowanie..."></v-data-table>
  </v-card>
</template>

<script>
import Dialog from './Dialog_new_edit.vue'

export default {
  data () {
    return {
      search: '',
      title: 'Wydatki',
      rerender: 0,
      headersParam: { id: { order: 1, show: -1, edit: '##notEditable##' }, bank: { order: 2 }, kwota: { order: 3 }, data: { order: 4 }, typ: { order: 5 }, typ2: { order: 6, show: -1 }, gdzie: { order: 7 }, kogo: { order: 8 }, osoba: { order: 9, show: -1 }, powiazane: { order: 10, show: -1 }, opis: { order: 11 }, action: { order: 12, edit: '##notEditable##', sortable: false } }
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
      let heads = {}
      if (Object.getOwnPropertyNames(this.headersParam).length > 0) { heads = this.headersParam } else { heads = this.rows[0] }

      for (const el in heads) {
        let obj = { text: el.toUpperCase(), value: el, edit: '', order: 200, align: 'center', show: 1, sortable: true }
        let newObj = Object.assign({}, obj, this.headersParam[el])
        objHeads.push(newObj)
      }
      objHeads = objHeads.filter(el => el.show >= 0)
      return objHeads
    },
    desserts () {
      return this.rows
    },
    myLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    editItem (item) {
      let index = this.rows.indexOf(item)
      this.$refs.Dialog.openEdit(item, index)
    },
    deleteItem (item) {
      let index = this.rows.indexOf(item)
      this.$store.dispatch('deleteItem', { id: this.rows[index].id })
    },
    onSaveEdit (item, index) {
      this.$store.dispatch('editItem', { item, id: this.rows[index].id })
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
