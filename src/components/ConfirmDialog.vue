<template>
  <div class="confirm-dialog">
    <button type="button" @click="showConfirm">{{buttonText}}</button>
    <div class="confirm-dialog__message" v-if="show">
      <p>{{confirmMessage}}</p>
      <div class="confirm-dialog__footer">
        <button type="button" @click="confirm">OK</button>
        <button type="button" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: {
    buttonText: {
      type: String,
      required: true
    },
    confirmMessage: {
      type: String,
      default: 'Are you sure?'
    },
    confirmButtonText: {
      type: String,
      default: 'OK'
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    }
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    showConfirm() {
      this.show = true;
    },

    confirm() {
      console.log('Confirm del dialog');
      this.$emit('confirm');
      this.show = false;
    },

    cancel() {
      this.show = false;
    }
  }
}
</script>

<style lang="css">
.confirm-dialog {
  font-size: 15px;
  font-family: Pathway Gothic One,sans-serif;
  position: relative;
}

.confirm-dialog__message {
  position: absolute;
  background-color: rgba(255,255,255,.98);
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  z-index: 100;
  right: 0;
  box-shadow: 0 5px 8px 1px rgba(0,0,0,.2);
}

p {
  padding: 5px 10px;
}

.confirm-dialog__footer {
  padding: 5px 10px;
  border-top: 1px solid #d4d4d4;
  background-color: #f6f6f6;
  box-shadow: 0 0 0 1px #fff inset;
}

.confirm-dialog__footer button {
  font-family: Pathway Gothic One,sans-serif;
  font-size: 15px;
  background: #fff;
  border: 1px solid #d4d4d4;
  box-shadow: none;
  text-shadow: none;
  padding: 3px 10px;
  color: #333;
  background-color: rgba(255,255,255,.9);
  border-radius: 3px;
  transition: all ease-in 200ms;
}

.confirm-dialog__footer button:hover {
  border-color: #9c9c9c;
  color: #d47620;
  cursor: pointer;
  transition: all ease-in 200ms;
}
</style>
