<template>
  <div class="ws-item" @click="openWorkspace">
    <img :src="favIconUrl" alt="Favicon" class="ws-item__favicon">
    <span class="ws-item__title">{{title}}</span>
    <span class="ws-item__tab-count">[{{tabsCount}} tabs]</span>
    <button type="button" @click.stop="deleteWorkspace" class="ws-item__remove">x</button>
  </div>
</template>

<script>
import defaultIcon from '../assets/icon.png';

export default {
  name: 'WorkspaceItem',

  props: {
    workspaceId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: 'N/A'
    },
    tabs: {
      type: Array,
      default: function() { return []; }
    }
  },

  methods: {
    deleteWorkspace() {
      this.$emit('delete', this.workspaceId);
    },

    openWorkspace() {
      this.$emit('open', this.workspaceId);
    }
  },

  computed: {
    favIconUrl: function() {
      let active = this.tabs.filter((tab) => tab.active === true);

      if (active.length) {
        return active[0].favIconUrl || defaultIcon;
      }

      return defaultIcon;
    },

    tabsCount: function() {
      return this.tabs.length || 0;
    }
  }
};
</script>

<style lang="css">
.ws-item {
  width: 120px;
  min-height: 120px;
  margin: 5px;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  list-style-type: none;
  cursor: pointer;
  transition: all ease-in 200ms;
  box-shadow: 0 0 0 1px #fff;
}

.ws-item:hover {
  border-color: #9c9c9c;
}

.ws-item:hover .ws-item__remove {
  opacity: 1;
  cursor: pointer;
  transition: opacity .3s;
}

.ws-item .ws-item__title {
  display: block;
  font-size: 20px;
  line-height: 1.2;
  margin-top: 8px;
  color: #333;
  word-wrap: break-word;
  flex: 1;
  padding: 0 5px;
  text-shadow: 0px 0px 5px rgba(255,255,255,.8), 0 0 1px #fff;
}

.ws-item .ws-item__tab-count {
  display: block;
  font-size: 10px;
  margin-bottom: 8px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-top: 12px;
  font-family: sans-serif;
}

.ws-item:hover > .ws-item__tab-count {
  color: #d47620;
}

.ws-item .ws-item__favicon {
  width: 30px;
  height: 30px;
  margin-top: 8px;
  align-self: center;
}

.ws-item .ws-item__remove {
  opacity: 0;
  position: absolute;
  right: 3px;
  top: 3px;
  background-color: transparent;
  border: solid 1px #9c9c9c;
  color: #9c9c9c;
  font-size: 8px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 2px;
  transition: opacity .3s;
}
</style>
