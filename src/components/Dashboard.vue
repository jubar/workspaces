<template>
  <div class="save-workspaces">
    <header>
      <AddWorkspace
        v-on:create="createWorkspace"
        v-on:deleteAll="deleteAllWorkspaces"/>
    </header>
    <main>
      <div class="workspaces-items">
        <WorkspaceItem
          v-for="workspace in workspaces"
          v-bind:key="workspace.id"
          v-bind:workspaceId="workspace.id"
          v-bind:title="workspace.name"
          v-bind:tabs="workspace.items"
          v-on:open="openWorkspace"
          v-on:delete="deleteWorkspace"/>

        <EmptyWorkspace v-if="workspaces.length == 0"/>
      </div>
    </main>
    <footer v-if="workspaces.length > 0">
      <span class="setting-name">Open workspaces in the same window?</span>
      <toggle-button
        :value="openInTheSameWindow"
        :color="{checked: '#6aad54', unchecked: '#b3b3b3'}"
        :labels="{checked: 'ON', unchecked: 'OFF'}"
        :sync="true"
        @change="updateSameWindows" />
    </footer>
  </div>
</template>

<script>
import AddWorkspace from './AddWorkspace';
import WorkspaceItem from './WorkspaceItem';
import EmptyWorkspace from './EmptyWorkspace';
import Extension from '../extension/main';

export default {
  name: 'Dashboard',
  components: {
    AddWorkspace,
    WorkspaceItem,
    EmptyWorkspace
  },

  data() {
    return {
      openInTheSameWindow: false,
      workspaces: []
    };
  },

  created() {
    this.getAllWorkspaces();
    Extension.getSetting('setting_same_window').then((value) => {
      console.log('La setting que me llego', value);
      if (value === null || value === 'undefined') {
        value = false;
      }
      this.openInTheSameWindow = value;
    });
  },

  methods: {
    createWorkspace(name) {
      Extension.createFromCurrentWindow(name).then(this.getAllWorkspaces);
    },

    deleteWorkspace(id) {
      Extension.deleteWorkspace(id).then(this.getAllWorkspaces);
    },

    deleteAllWorkspaces() {
      Extension.deleteAllWorkspaces().then(this.getAllWorkspaces);
    },

    openWorkspace(id) {
      console.log(this.openInTheSameWindow);
      Extension.openWorkspace(id, this.openInTheSameWindow);
    },

    getAllWorkspaces() {
      Extension.getAllWorkspaces().then((data) => {
        this.workspaces = data;
      });
    },

    updateSameWindows(state) {
      Extension.saveSetting('setting_same_window', state.value).then(() => {
        this.openInTheSameWindow = state.value;
      });
    }
  }
};
</script>

<style lang="css">
.save-workspaces {
  color: rgb(51,51,51);
  background-color: rgb(246,246,246);
  font-family: 'Pathway Gothic One', sans-serif;
  font-size: 14px;
  padding: 0;
  margin: 0;
  min-height: 100px;
}

.save-workspaces header {
  padding: 10px 15px;
  border-bottom: 1px solid #d4d4d4;
  box-shadow: 0 1px 0px 1px rgba(255,255,255,.5);
}

.save-workspaces main {
  padding: 5px 10px;
}

.save-workspaces main .workspaces-items {
  display: flex;
  flex-wrap: wrap;
  width: 396px;
}

.save-workspaces footer {
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  border-top: 1px solid #d4d4d4;
  box-shadow: 0 -1px 0px 1px rgba(255,255,255,.5);
}

.save-workspaces footer .setting-name {
  flex: 1;
}
</style>
