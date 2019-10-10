<template>
    <v-list-item class="red lighten-5">         
        <v-list-item-content>
            <v-list-item-title ><v-icon>mdi-account-circle</v-icon><v-icon>mdi-arrow-right-thick</v-icon>{{record.person}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text class="text--primary body-1">-{{record.amount | money}}</v-list-item-action-text>
        </v-list-item-action>
    </v-list-item>                
</template>

<script>
    export default {
    props:['record']
    }
</script>

