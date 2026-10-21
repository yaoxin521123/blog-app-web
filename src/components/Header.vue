<template>
  <div class="m-content">
    <H3>欢迎来到姚鑫的博客</H3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>

    <div class="maction">
      <span>  <el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>


      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"> <el-link type="primary" href="/login">登录</el-link></span>
      <span v-show="hasLogin"> <el-link type="danger" @click="logout">退出</el-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headers",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/776eaf92140f6f8f3c3f39fb51de2cc4~300x300.image',
      },
      hasLogin: false
    }
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  },
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar

      this.hasLogin = true
    }

  }
}
</script>

<style scoped>
.m-content {
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}

.maction {
  margin: 10px 0;
}
</style>