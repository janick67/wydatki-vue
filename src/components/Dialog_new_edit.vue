<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="ma-2" v-on="on">Dodaj</v-btn>
        </template>
        <v-card>
        <v-card-title>
            <span class="headline">Dodaj nowy element</span>
        </v-card-title>

        <v-card-text primary>
            <v-container>
            <v-row :key="rerender">
                <v-col cols="12" sm="6" md="4" v-for="(el,index) in headersRender" :key="index">
                    <v-text-field v-model="el.edit" :label="el.text"></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="clear">Wyczyść</v-btn>
            <v-btn color="blue darken-1" text @click="close">Anuluj</v-btn>
            <v-btn color="blue darken-1" text @click="save">Zapisz</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: [
    'headers'
  ],
  data () {
    return {
      dialog: false,
      rerender: 0,
      editItem: -1
    }
  },
  computed: {
    headersRender () {
      return this.headers.filter(el => el.edit !== '##notEditable##')
    }
  },
  methods: {
    openEdit (row, index) {
      this.dialog = true
      this.editItem = index
      this.headers.forEach(el => {
        el.edit = row[el.value]
      })
      this.rerender += 1
    },
    clear () {
      this.headers.forEach(el => {
        el.edit = ''
      })
      this.rerender += 1
    },
    close () {
      this.dialog = false
      this.clear()
    },
    save () {
      let data = {}
      this.headers.forEach(el => {
        if (el.value.toLowerCase() !== 'action') { data[el.value] = el.edit }
      })

      if (this.editItem >= 0) {
        // this.$store.dispatch('editItem', { item: data, index: this.editItem })
        this.$emit('saveEdit', data, this.editItem)
        this.editItem = -1
      } else {
        this.$store.dispatch('addItem', data)
      }
      this.close()
    }
  }
}
</script>
