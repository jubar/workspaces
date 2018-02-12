<template>
  <div class="add-workspace">
    <input type="text"
      placeholder="Add a workspace name and hit `enter`"
      v-model="workspaceName"
      @keyup.enter="create">

    <ConfirmDialog
      buttonText="Delete all workspaces"
      confirmMessage="Are you sure to delete all workspaces? This action can't be undone"
      :show="deleteAllShowConfirm"
      v-on:confirm="deleteAll" />
  </div>
</template>

<script>
import ConfirmDialog from './ConfirmDialog';

export default {
  name: 'AddWorkspace',
  components: {
    ConfirmDialog
  },

  data () {
    return {
      deleteAllShowConfirm: false,
      workspaceName: ''
    };
  },

  methods: {
    create() {
      if (this.workspaceName === '') {
        return;
      }

      this.$emit('create', this.workspaceName);
      this.workspaceName = '';
    },

    deleteAll() {
      this.deleteAllShowConfirm = false;
      this.$emit('deleteAll');
    }
  }
};
</script>

<style lang="css">
.add-workspace {
  text-align: right;
}

.add-workspace input[type="text"] {
  box-sizing: border-box;
  font-family: 'Pathway Gothic One', sans-serif;
  outline: none;
  font-size: 15px;
  display: block;
  width: 100%;
  line-height: 1.2em;
  padding: 5px;
  color: #333;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255,255,255,.5);
}

.add-workspace input[type="text"]:focus {
  border-color: #9c9c9c;
}

.add-workspace span {
  font-size: 15px;
  display: inline-block;
  margin-top: 4px;
  color: #333;
  text-decoration: underline;
  cursor: pointer;
}

.add-workspace span:hover {
  color: #d47620;
}
</style>
