<template>
  <div>
    <v-container>
  <v-card>
    <v-tabs v-model="tab" grow>
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
                        <v-list-item :key="record.id" :class="{'red lighten-5':record.type == 1,'green lighten-5':record.type == 2}">
                          <template>
                            <v-list-item-content>
                              <v-list-item-title v-text="record.category"></v-list-item-title>
                              <v-list-item-subtitle  v-text="record.subcategory"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text class="text--primary body-1"><span v-if="record.type == 1">-</span>{{record.amount | money}}</v-list-item-action-text>
                            </v-list-item-action>
                          </template>
                        </v-list-item>
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
  </v-card>
  </v-container>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      tabs: ['Wszystkie', 'Wydatki', 'Przychody'],
      tab: 0,
      selected: []
    }
  },
  computed: {
    transactions () {
      let tab = this.tab
      let trans = this.$store.getters.transactions

      trans = trans.filter(function (el) {
        if (tab === 0) {
          return el.type === 1 || el.type === 2
        } else if (tab === 1) {
          return el.type === 1
        } else {
          return el.type === 2
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
