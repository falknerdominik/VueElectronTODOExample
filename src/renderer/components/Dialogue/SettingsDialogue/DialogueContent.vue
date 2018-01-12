<template>
<div class="settings-dialogue-content">
    <h3>Settings</h3>
    <div class="settings-group">
        <label>Endpoint</label>
        <el-input name="endpoint" v-model.trim="endpoint"></el-input>
    </div>
</div>
</template>

<script>
export default {
    data: function() {
      return {
          endpoint: this.$store.getters.endpoint
      }
    },
    methods: {
        getData() {
            return {
                endpoint: this.endpoint,
            }
        }
    }

}
</script>

<style scoped>
.settings-dialogue-content .settings-group {
}
</style>
