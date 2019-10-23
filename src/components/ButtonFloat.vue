<template>
<v-speed-dial
            v-model="fab"
            bottom
            right
            fixed
            absolute
            style="bottom:2vh; right:40px;"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
            <v-btn
              fab
              color="cyan accent-2"
            >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
            </template>
            <template v-for="(el,i) in options">
              <v-btn
                dark
                :color="el.color"
                :to="el.link"
                :key="i"
              >
                {{el.display}}
              </v-btn>
            </template>
          </v-speed-dial>
</template>

<script>
export default {
  data () {
    return {
      fab: false,
      options: [
        { display: 'Wydatek', color: 'red', link: '/AddExpense' },
        { display: 'Przychód', color: 'green', link: '/AddIncome' },
        { display: 'Pożyczka', color: 'blue', link: '/AddDebIn' },
        { display: 'Dług', color: 'blue', link: '/AddDebOut' },
        { display: 'Przelew', color: 'blue', link: '/AddInternal' }
      ]
    }
  }
}
</script>
