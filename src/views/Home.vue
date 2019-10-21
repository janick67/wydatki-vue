<template>
  <v-card>
    <v-tabs v-model="tab" grow
    show-arrows
    >
      <v-tab v-for="item in tabs" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in tabs"
        :key="item">
        <v-card flat >
          <v-card-text>
            <v-list two-line>
              <v-list-item-group
                v-model="selected"
                multiple>
                <template v-for="dates in transactions" >
                  <v-card :key="dates.title">
                    <v-card-text class="pa-0 grey darken-5">
                      <div class="px-2 white--text">{{dates.title | date}}</div>
                      <template v-for="record in dates.arr" >
                        <Expense v-if="record.type == 1" :key="record.id" :record="record"/>
                        <Income v-else-if="record.type == 2" :key="record.id" :record="record"/>
                        <DebIn v-else-if="record.type == 3" :key="record.id" :record="record"/>
                        <DebOut v-else-if="record.type == 4" :key="record.id" :record="record"/>
                        <Internal v-else :key="record.id" :record="record"/>
                      </template>
                    </v-card-text>
                  </v-card>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
     <ButtonFloat /> 
  </v-card>
</template>

<script>
import Expense from '../components/Transactions/Expense'
import Income from '../components/Transactions/Income'
import DebIn from '../components/Transactions/DebIn'
import DebOut from '../components/Transactions/DebOut'
import Internal from '../components/Transactions/Internal'
import ButtonFloat from '../components/ButtonFloat'

export default {
  components: {
    Expense,
    Income,
    DebIn,
    DebOut,
    Internal,
    ButtonFloat
  },
  data () {
    return {
      tabs: ['Wszystkie', 'Wydatki', 'Przychody','Pożyczki','Długi','Przelewy'],
      tab: 0,
      selected: [],
    }
  },
  computed: {
    transactions () {
      let tab = this.tab
      let trans = this.$store.getters.transactions

      trans = trans.filter(function (el) {
        if (tab === 0) {
          return true
        } else if (tab === 1) {
          return el.type === 1
        } else if (tab === 2) {
          return el.type === 2
        } else if (tab === 3) {
          return el.type === 3
        } else if (tab === 4) {
          return el.type === 4
        } else {
          return el.type === 5
        }
      })
      let arrayByDate = []
      trans.forEach(function (record) {
        let obj = {}
        obj = arrayByDate.find(el => {
          return el.title === record.date
        })
        if (typeof obj === 'undefined') {
          obj = { title: record.date, arr: [record] }
          arrayByDate.push(obj)
        } else {
          obj.arr.push(record)
        }
      })

      return arrayByDate
    }
  }
}
</script>
