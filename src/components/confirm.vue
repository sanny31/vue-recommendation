<template>
  <div>
    <form-preview header-value="以下是您的推荐信息" :body-items="form" :footer-buttons="buttons1"></form-preview>
  </div>
</template>

<script>
  import { FormPreview } from 'vux'
  import { mapState } from 'vuex'
  import $ from 'jquery'
  export default {
    name: 'confirm',
    components: {
      FormPreview
    },
    computed: {
      ...mapState({
        dividerText: state => state.zxy.dividerText,
        recommendation: state => state.zxy.recommendation,
        form () {
          let r = this.recommendation
          return [{
            label: '标题',
            value: r.Title
          }, {
            label: '微信号',
            value: r.WxAccount
          }, {
            label: '您的姓名',
            value: r.Nickname
          }, {
            label: '手机号码',
            value: r.Telphone
          }, {
            label: '电子邮箱',
            value: r.Email
          }, {
            label: '推荐内容',
            value: r.Content
          }, {
            label: '上传图片',
            value: r.Pictures === null || r.Pictures.length === 0 ? '无' : r.Pictures.length
          }]
        }
      })
    },
    mounted: function () {
      var validation = this.$store.getters.getRecommendationValidation
      if (validation.success === false) {
        this.$router.push('/')
      }
    },
    data () {
      return {
        title: '确认您的推荐',
        buttons1: [{
          style: 'default',
          text: '清除表单',
          onButtonClick: (name) => {
            this.$store.dispatch('clearRecommendation')
            this.$router.push('/')
          }
        }, {
          style: 'primary',
          text: '提交表单',
          onButtonClick: (name) => {
            this.$vux.loading.show({
              text: '提交中'
            })
            console.log(this.recommendation)
            let vm = this
            $.ajax({
              url: 'http://localhost:75564/api/recommendation/submit',
              type: 'POST',
              cache: false,
              data: this.recommendation,
              success: function (res, tStatus, xhr) {
                console.log(res)
                if (res.success === true) {
                  vm.$vux.toast.show({
                    type: 'success',
                    text: '提交成功'
                  })
                  vm.$store.dispatch('clearRecommendation')
                  vm.$router.push('/')
                } else {
                  vm.$vux.toast.show({
                    type: 'warn',
                    text: res.data.error
                  })
                }
              },
              error: function (xhr, tStatus) {
                vm.$vux.toast.show({
                  type: 'warn',
                  text: '出现异常'
                })
              },
              complete: function () {
                vm.$vux.loading.hide()
              }
            })
          }
        }]
      }
    }
  }
</script>
