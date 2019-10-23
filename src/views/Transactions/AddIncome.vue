<template>
    <div>
        <multiselect
            :options="options"
            title="Wydatki"
            :multiselect="true"
            v-on:input="change"
         />
    </div>
</template>

<script>
import Multiselect from '../../components/Shared/Multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    }
  },
  methods: {
    change (params) {
      console.log(params, params)
    }
  }
}
</script>
