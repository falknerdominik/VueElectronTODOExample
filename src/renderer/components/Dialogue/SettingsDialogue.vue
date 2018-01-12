<template >
    <el-dialog title="Settings" :visible.sync="dialogVisible" width="70%" close-on-press-escape>
        <dialogue-content ref="dialogueContent"></dialogue-content>
        <span slot="footer">
            <el-button @click="dialogVisible = false;">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import DialogueContent from './SettingsDialogue/DialogueContent';

export default {
    components: { DialogueContent },

    data() {
        return {
            dialogVisible: false,
        };
    },

    methods: {
      show() {
          this.dialogVisible = true;
      },
      save() {
         // save back to localstorage
         let settings = this.$refs.dialogueContent.getData();
         sessionStorage.setItem('project-settings', JSON.stringify(settings));
         this.dialogVisible = false;

         // this.$store.commit("CHANGE_ENDPOINT", settings.endpoint);
         this.$store.dispatch('changeEndpoint', {endpoint: settings.endpoint});
      }
    }
  };
</script>
