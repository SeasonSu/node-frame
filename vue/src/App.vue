

<template>
<div>

  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>

</template>

<script>

import 'assets/common/reset.scss'
import 'assets/common/app.scss'
import axios from 'axios'

const ERR_OK = 0

export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    // axios.get('static/data.json').then((res) => {
    //   this.seller = res.data.seller
    // })
  }
}

</script>
