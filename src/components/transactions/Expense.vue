<template>
    <v-list-item class="red lighten-4">         
        <v-list-item-content>
            <v-list-item-title v-text="record.category"></v-list-item-title>
            <v-list-item-subtitle  v-text="record.subcategory"></v-list-item-subtitle>
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