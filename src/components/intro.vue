<template>
  <div>
    <group>
      <box gap="10px 10px">
        <div v-html='rules'>{{rules}}</div> 
      </box>
    </group>
    <box gap="10px 10px">
      <x-button type="default" action-type="button" v-on:click.native="routerBack">返 回</x-button>
    </box>
    <divider>{{dividerText}}</divider>
  </div>
</template>
<script>
  import { Group, Box, Divider, XButton } from 'vux'
  import { mapState } from 'vuex'
  
  export default {
    name: 'intro',
    components: {
      Box,
      Group,
      Divider,
      XButton
    },
    computed: {
      ...mapState({
        dividerText: state => state.zxy.dividerText,
        rules: state => state.zxy.rules
      })
    },
    methods: {
      routerBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
