<template>
  <div>
    <v-container>
  <v-card>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab
        v-for="item in tabs"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in tabs"
        :key="item"
      >
        <v-card flat >
          <v-card-text>

            <v-list two-line>
              <v-list-item-group
                v-model="selected"
                multiple
              >
                <template v-for="(record,index) in transactions" >
                  <v-list-item :key="record.id" :class="{'red lighten-5':record.type == 1,'green lighten-5':record.type == 2}">
                    <template>
                      <v-list-item-content>
                        <v-list-item-title v-text="record.category"></v-list-item-title>
                        <v-list-item-subtitle  v-text="record.subcategory"></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text class="text--primary body-1">{{record.amount | money}}</v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index + 1 < transactions.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
            <!-- <div :class="{red:record.type == 1,green:record.type == 2}" v-for="record in transactions" :key="record.id ">
              <b >Kwota:</b> {{record.amount}}
              <b >Data:</b> {{record.date | date}}
              {{record.type}}
            </div> -->
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
    </v-container>
  </div>
</template>

<script>
// import DataTable from '../components/DataTable'

export default {
  components: {

    //DataTable
  },
  data (){
    return{
      tabs:['Wszystkie','Wydatki','Przychody'],
      tab:0,
      selected:[1]
    }
  },
   computed: {
    transactions () {
      let tab = this.tab
      console.log(this.$store.getters.transactions)
      return this.$store.getters.transactions.filter(function(el){
       if (tab == 0){
          return true
        }else if(tab == 1){
          return el.type == 1
        }else{
          return el.type == 2
        }
      })
    },
   }

}
</script>
