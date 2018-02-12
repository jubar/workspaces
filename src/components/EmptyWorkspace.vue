<template>
  <div class="empty-state">
    <span>YOU DON'T HAVE ANY WORKSPACE YET!</span>
    <p>
      To create a new workspace fill in a new name and hit enter.
      A new workspace with all your current tabs will be created.
    </p>
    <div class="footer">
      <a href="https://github.com/marpo60/workspaces" target="_blank">Github</a>
      <a href="https://chrome.google.com/webstore/detail/save-workspaces/gjimmlbhegkmccampjlimcnaohaoojgb"
        target="_blank">
        Rank this extension
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyWorkspace'
};
</script>

<style lang="css">
.empty-state {
  background: url('../assets/empty-logo.png') no-repeat center right;
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px 20px;
}

.empty-state span {
  font-size: 26px;
  display: block;
  margin-top: 15px;
  text-shadow: 1px 1px 1px #fff;
  flex-grow: 0;
  flex-shrink: 0;
}

.empty-state p {
  text-align: left;
  margin-top: 10px;
  line-height: 1.4;
  font-size: 17px;
  width: 290px;
  color: #777;
  text-shadow: 1px 1px 1px #fff;
  flex: 1;
}

.empty-state .footer a {
  display: inline-block;
  color: #777;
  text-decoration: none;
  margin-right: 10px;
  font-size: 15px;
}

.empty-state .footer a:hover {
  color: #333;
  cursor: pointer;
  text-decoration: underline;
}
</style>
