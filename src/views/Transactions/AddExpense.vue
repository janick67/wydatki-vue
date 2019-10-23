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
                    v-if="item.type=='text-field'"
                    v-model="item.model"
                    :type="item.itemType"
                    :label="item.label"
                    :required="item.required"
                    :key="i"
                    ></v-text-field>

                    <DatePicker
                    v-else-if="item.type=='DatePicker'"
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

                    <v-btn v-else-if="!more&&item.type=='more'" v-on:click="more=true" text :key="i">Więcej...</v-btn>
                </template>
                    <!-- <v-text-field
                    v-model="form.amount"
                    type="number"
                    label="Kwota"
                    required
                    ></v-text-field>

                    <DatePicker v-model="form.date" />

                        <multiselect
                            :options="options.type"
                            title="Typ"
                            v-on:input="form.type=$event"
                        />
                    <v-btn v-if="!more" v-on:click="more=true" text>Więcej...</v-btn>
                    <div v-else>
                        <multiselect
                            :options="options.type2"
                            title="Typ2"
                            v-model="form.type2"
                        />
                        <multiselect
                            :options="options.where"
                            title="Gdzie"
                            v-on:input="form.where=$event"
                        />
                        <multiselect
                            :options="options.persons"
                            title="Osoby"
                            :multiselect="true"
                            v-on:input="form.persons=$event"
                        />
                        <multiselect
                            :options="options.tags"
                            title="Tagi"
                            :multiselect="true"
                            v-on:input="form.tags=$event"
                        />
                    </div> -->
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
    form: {
      amount: '',
      date: null,
      type: null,
      type2: null,
      where: null,
      persons: null,
      tags: []
    },
    inputs: [
      { name: 'amount', type: 'text-field', model: null, inputType: 'number', label: 'Kwota', required: true },
      { name: 'date', type: 'DatePicker', model: null },
      { name: 'type', type: 'multiselect', options: [], label: 'Typ', model: [] },
      { name: 'more', type: 'more' },
      { name: 'type2', type: 'multiselect', options: [], label: 'Typ2', more: true, model: [] },
      { name: 'where', type: 'multiselect', options: [], label: 'Gdzie', more: true, model: [] },
      { name: 'persons', type: 'multiselect', options: [], label: 'Osoby', more: true, model: [], multiselect: true },
      { name: 'tags', type: 'multiselect', options: [], label: 'Tagi', more: true, model: [], multiselect: true }
    ],
    more: false
  }),
  created () {
    this.inputs.filter(el => typeof el.options !== 'undefined')
      .forEach(el => {
        el.options = this.options[el.name]
      })
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
