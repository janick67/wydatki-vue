<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="ma-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
        <v-card-title>
            <span class="headline">New Element</span>
        </v-card-title>

        <v-card-text primary>
            <v-container>
            <v-row :key="rerender">
                <v-col cols="12" sm="6" md="4" v-for="(el,index) in headers" :key="index">
                    <v-text-field v-model="el.edit" :label="el.text"></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="clear">Clear</v-btn>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
      rerender: 0
    }
  },
  methods: {
    clear (){
        this.headers.forEach(el =>{
            el.edit = '';
        })
        this.rerender += 1
    },
    close () {
      this.dialog = false
      this.clear()
    },
    save () {
        let data = {};
        this.headers.forEach(el => {
            data[el.value] = el.edit
        })
      console.log('data: ', data)
      this.close()
    }
  }
}
</script>
