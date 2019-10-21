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
                    <v-text-field
                    v-model="form.amount"
                    type="number"
                    label="Kwota"
                    required
                    ></v-text-field>

                    <v-menu
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            v-model="form.dateFormatted"
                            readonly
                            label="Data"
                            required
                            @blur="date = parseDate(form.dateFormatted)"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>

                        <multiselect 
                            :options="options"
                            title="Typ"
                            v-on:input="form.type=$event"
                        />
                    <v-btn v-if="!more" v-on:click="more=true" text>Więcej...</v-btn>
                    <div v-else>
                        <multiselect 
                            :options="options"
                            title="Typ2"
                            v-on:input="form.type2=$event"
                        />
                        <multiselect 
                            :options="options"
                            title="Gdzie"
                            v-on:input="form.where=$event"
                        />
                        <multiselect 
                            :options="options"
                            title="Osoby"
                            :multiselect="true"
                            v-on:input="form.persons=$event"
                        />
                        <multiselect 
                            :options="options"
                            title="Tagi"
                            :multiselect="true"
                            v-on:input="form.tags=$event"
                        />
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn class="primary">Anuluj</v-btn>
                <v-btn class="primary">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
</template>


<script>
    import Multiselect from '../../components/Shared/Multiselect'

  export default {
    components: {
        Multiselect
    },
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      form:{
        amount: '',
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        type: null,
        type2: null,
        where: null,
        persons: null,
        tags:[]
      },
    options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
      more:false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date (val) {
        this.form.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}.${month}.${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [day, month, year] = date.split('.')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
    },
  }
</script>