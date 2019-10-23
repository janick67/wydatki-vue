<template>
    <v-list-item class="blue lighten-4">
        <v-list-item-content>
            <v-list-item-title >{{record.account}}<v-icon>mdi-arrow-right-thick</v-icon>{{record.dest}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text class="text--primary body-1">{{record.amount | money}}</v-list-item-action-text>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
  props: ['record']
}
</script>
