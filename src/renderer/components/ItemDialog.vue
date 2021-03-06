<template>
  <v-ons-dialog cancelable
    :visible="dialogVisible"
    @posthide="closeDialog"
  >
    <v-ons-list>
      <v-ons-list-item
        tappable
        @click="moveTweetInput"
      >
        <v-ons-icon icon="fa-reply" class="icon"></v-ons-icon>
        Reply
      </v-ons-list-item>
      <v-ons-list-item
        v-if="me.screen_name === screenName"
        tappable
        @click="deleteOwnTweet"
      >
        <v-ons-icon icon="fa-trash" class="icon"></v-ons-icon>
        Delete tweet
      </v-ons-list-item>
      <v-ons-list-item
        v-else
        tappable
        @click="actionRetweet"
      >
        <v-ons-icon icon="fa-retweet" class="icon"></v-ons-icon>
        {{ retweetLabel }}
      </v-ons-list-item>
      <v-ons-list-item
        tappable
        @click="actionFavorite"
      >
        <v-ons-icon icon="fa-heart" class="icon"></v-ons-icon>
        {{ favoritePrefix }} favorite
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-dialog>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'item-dialog',
    computed: {
      favoritePrefix: function () {
        return this.favorited ? 'Remove' : 'Add'
      },
      retweetLabel: function () {
        return this.retweeted ? 'Unretweet' : 'Retweet'
      },
      ...mapState({
        dialogVisible: state => state.app.tweetItemDialogVisible,
        favorited: state => state.app.favorited,
        retweeted: state => state.app.retweeted,
        idStr: state => state.app.idStr,
        screenName: state => state.app.screenName,
        me: state => state.twitter.me
      })
    },
    methods: {
      closeDialog: function (event) {
        this.closeTweetItemDialog()
        this.removeSelectedItem()
      },
      moveTweetInput: function () {
        this.changeActiveIndex(0)
        this.closeTweetItemDialog()
      },
      deleteOwnTweet: function () {
        this.$ons.notification.confirm({
          message: 'Are you sure?',
          callback: (answer) => {
            if (answer) {
              this.$twitter.deleteTweet(this.idStr)
                .then((res) => {
                  this.deleteTweet(this.idStr)
                  this.closeTweetItemDialog()
                })
                .catch(() => {
                  this.$ons.notification.alert('Delete failed...')
                })
            } else {
              this.closeTweetItemDialog()
            }
          }
        })
      },
      actionFavorite: function () {
        (this.favorited ? this.$twitter.destroyFavorite(this.idStr) : this.$twitter.createFavorite(this.idStr))
          .then((tweet) => {
            this.$ons.notification.toast(this.favoritePrefix + ' favorite', {timeout: 2000})
            this.updateFavorited({
              idStr: this.idStr,
              favorited: tweet.favorited
            })
            this.closeTweetItemDialog()
          })
          .catch(() => {
            this.$ons.notification.alert(this.favoritePrefix + ' favorite failed...')
          })
      },
      actionRetweet: function () {
        (this.retweeted ? this.$twitter.unretweet(this.idStr) : this.$twitter.retweet(this.idStr))
          .then((tweet) => {
            this.$ons.notification.toast(this.retweetLabel, {timeout: 2000})
            this.updateRetweeted({
              idStr: this.idStr,
              retweeted: tweet.retweeted
            })
            this.closeTweetItemDialog()
          })
          .catch(() => {
            this.$ons.notification.alert(this.retweetLabel + ' failed...')
          })
      },
      ...mapActions([
        'changeActiveIndex',
        'closeTweetItemDialog',
        'removeSelectedItem',
        'deleteTweet',
        'updateFavorited',
        'updateRetweeted'
      ])
    }
  }
</script>

<style scoped>
  .icon {
    margin-right: 5px;
  }
</style>