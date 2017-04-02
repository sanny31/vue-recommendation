<template>
  <div>
    <group>
      <cell title="推荐平台规则" is-link link="/intro">
      	<icon type="safe-warn"></icon>
      </cell>
    </group>
    <form @submit.prevent="submit">
      <group title="您的推荐">
        <x-input required placeholder="标题" name='Title' v-model='recommendation.Title'></x-input>
        <x-input required placeholder="微信号" name='WxAccount' v-model='recommendation.WxAccount'></x-input>
        <x-input is-type="china-name" required placeholder="姓名" name='nickname' v-model='recommendation.Nickname'></x-input>
        <x-input keyboard="number" is-type="china-mobile" required placeholder="手机号" name='Telphone' v-model='recommendation.Telphone'></x-input>
        <x-input is-type="email" required placeholder="邮箱" name='Email' v-model='recommendation.Email'></x-input>
        <x-textarea :max="500" :rows="8" required placeholder="正文" name='Content' v-model='recommendation.Content'></x-textarea>
      </group>
      <group title="图片上传">
        <cell-box>
          <div class="weui-uploader">
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li v-for="(pic, index) in recommendation.Pictures" class="weui-uploader__file" :style="{backgroundImage: 'url(' + pic + ')'}" @click="removePic(index)"></li>
              </ul>
              <div class="weui-uploader__input-box">
                <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" @change="onFileChange">
              </div>
            </div>
          </div>
        </cell-box>
      </group>
      <box gap="10px 10px">
        <x-button type="primary" action-type="submit">提 交</x-button>
      </box>
    </form>
    <divider>{{dividerText}}</divider>
  </div>
</template>
<script>
  import { Group, Cell, CellBox, Divider, XTextarea, XInput, XButton, Icon, Box } from 'vux'
  import { mapState } from 'vuex'
  import $ from 'jquery'

  export default {
    name: 'recommend',
    data () {
      return {

      }
    },
    components: {
      Group,
      Cell,
      CellBox,
      XTextarea,
      XInput,
      XButton,
      Divider,
      Icon,
      Box
    },
    computed: {
      ...mapState({
        dividerText: state => state.zxy.dividerText,
        recommendation: state => state.zxy.recommendation
      })
    },
    mounted: function () {
    },
    methods: {
      submit (event) {
        var validation = this.$store.getters.getRecommendationValidation
        console.log(validation)
        if (validation.success === false) {
          this.$vux.toast.show({
            type: 'warn',
            text: validation.error
          })
          return
        }
        this.$vux.loading.show({
          text: '提交中'
        })
        console.log(this.recommendation)
        let vm = this
        $.ajax({
          url: 'http://localhost:48971/api/recommendation/submit',
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
      },
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        var tmp = this
        var reader = null
        for (var i = 0; i < files.length; i++) {
          reader = new window.FileReader()
          reader.readAsDataURL(files[i])
          reader.onload = function (e) {
            tmp.recommendation.Pictures.push(e.target.result)
          }
        }
      },
      removePic (index) {
        console.log(index)
        this.recommendation.Pictures.splice(index, 1)
      }
    }
  }
</script>
