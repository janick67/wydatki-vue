<template>
  <div class="flexTable">
    <div class="thead">
        <div class="tr head">
            <div class="th col" v-bind:key="name" v-for="(value,name) in rows[0]">
                <span>{{name}}</span>
            </div>
        </div>
    </div>
    <div class="tbody">
        <div class="tr" v-bind:key="row.id" v-for="row in rows">
            <div class="td" v-bind:key="name" v-for="(value,name) in row">
                <span>{{value}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlexTable',
  computed: {
    rows () {
      return this.$store.getters.rows
    }
  }
}
</script>

<style lang="scss" scoped>
$tableMargin: 10px;
$tableCornerRadius: 20px;

.flexTable{
  margin: $tableMargin;
  width: calc(100% - #{$tableMargin*2});
  display: flex;
  flex-direction: column;
  border-radius: $tableCornerRadius;
  box-shadow: rgba(0,0,0,0.8) 0 0 10px;

  .tr{
    display: flex;
    flex: 1;
  }

  .td, .th{
    display: flex;
    align-items: center;
    justify-content: center;
    //border: black solid 1px;
    padding: 5px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .head{
    background-color:black;
    color: white;
    font-weight: bold;
    text-transform: capitalize;
    border-top-left-radius: $tableCornerRadius;
    border-top-right-radius: $tableCornerRadius;
  }

  .tbody{
    .tr:nth-child(even){
      background-color: rgba(1,1,1,.2);
    }

    .tr:nth-child(odd){
      background-color: #e8e8e8;
    }
        .tr:hover{
    background-color: #f9ffb8;
  }
  .tr:last-child{
    border-bottom-left-radius: $tableCornerRadius;
    border-bottom-right-radius: $tableCornerRadius;
  }
  }

  .td:not(:first-child){
    border-left:none;
  }

  .tr:not(:first-child) .td{
    border-top: none;
  }
  // -----------------------
}

@media screen and (max-width: 1200px) {

  .flexTable{
    margin-top:0;

    .thead{
      background-color:white;
      top:0px;
      margin-top:0;
      position: fixed;
      width: calc(100% - #{$tableMargin*2});
    }

    .tr {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0.5em 0;
      border: 1px solid rgba(3,3,3,0.2);
    }
    .head{
      margin-top:0;
    }
    .td, .th {
      flex: 1 1 150px;
      border: .5px solid rgba(3,3,3,0.2);
    }
  }
}
</style>
