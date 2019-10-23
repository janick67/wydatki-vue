<template>
        <v-card>
            <v-card-title>
               Nowy wydatek
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    lazy-validation
                >
                <template  v-for="(item, i) in inputs">
                    <v-text-field
                    v-if="item.type=='text-field'&&(more||typeof item.more=='undefined')"
                    v-model="item.model"
                    :type="item.itemType"
                    :label="item.label"
                    :required="item.required"
                    :key="i"
                    ></v-text-field>

                    <DatePicker
                    v-else-if="item.type=='DatePicker'&&(more||typeof item.more=='undefined')"
                    v-model="item.model"
                    :key="i"
                     />

                    <multiselect
                        v-else-if="item.type=='multiselect'&&(more||typeof item.more=='undefined')"
                        :options="item.options"
                        v-model="item.model"
                        :title="item.label"
                        :v-on:input="item.model"
                        :multiselect="item.multiselect"
                        :key="i"
                    />

                    <v-textarea
                        counter
                        auto-grow
                        :rows="2"
                        v-else-if="item.type=='textarea'&&(more||typeof item.more=='undefined')"
                        :label="item.label"
                        v-model="item.model"
                        :key="i"
                    ></v-textarea>

                    <v-btn v-else-if="!more&&item.type=='more'" v-on:click="more=true" text :key="i">Więcej...</v-btn>
                </template>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn class="primary">Anuluj</v-btn>
                <v-btn class="primary" @click="save">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
import Multiselect from '../../components/Shared/Multiselect'
import DatePicker from '../../components/Shared/DatePicker'

export default {
  components: {
    Multiselect,
    DatePicker
  },
  data: () => ({
    inputs: [
      { name: 'amount', type: 'text-field', model: null, inputType: 'number', label: 'Kwota', required: true },
      { name: 'date', type: 'DatePicker', model: null },
      { name: 'account', type: 'multiselect', options: [], label: 'Konto', model: [] },
      { name: 'category', type: 'multiselect', options: [], label: 'Typ', model: [] },
      { name: 'more', type: 'more' },
      { name: 'subcategory', type: 'multiselect', options: [], label: 'Typ2', more: true, model: [] },
      { name: 'persons', type: 'multiselect', options: [], label: 'Osoby', more: true, model: [], multiselect: true },
      { name: 'tags', type: 'multiselect', options: [], label: 'Tagi', more: true, model: [], multiselect: true },
      { name: 'comment', type: 'textarea', model:null, label:'Komentarz', more:true}
    ],
    more: false
  }),
  created () {
      this.$store.dispatch('loadAllOptions')
  },
  computed:{
      allOptions(){
          const allOptions = this.$store.getters.allOptions
          return allOptions
      }
  },
  watch:{
      allOptions(){
        const allOptions = this.$store.getters.allOptions
        const newObj = {account:[],category:[],subcategory:[],persons:[],tags:[]};
        newObj['account'] = allOptions.account.map(el => {return {name: el.name, code: el.name}} )
        newObj['category'] = allOptions.category.filter(el=>el.isSub==0).map(el => {return {name: el.name, code: el.name}} )
        newObj['subcategory'] = allOptions.category.filter(el=>el.isSub==1).map(el => {return {name: el.name, code: el.name}} )
        newObj['persons'] = allOptions.persons.map(el => {return {name: el.short, code: el.short}} )
        newObj['tags'] = allOptions.tags.map(el => {return {name: el.tag, code: el.tag}} )
        
        this.inputs.filter(el => typeof el.options !== 'undefined')
        .forEach(el => {
            el.options = newObj[el.name]
        })
      }
  },
  methods: {
    arrayToObject (array, keyField) {
      return array.reduce((obj, el) => {
        obj[el[keyField]] = el.model
        return obj
      }, {})
    },
    save () {
      console.log(this.arrayToObject(this.inputs, 'name'))
    }
  }
}
</script>
