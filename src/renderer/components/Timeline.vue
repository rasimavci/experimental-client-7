<template>
  <v-ons-page>
    <v-ons-list>
      <tweet-list-item
        v-for="tweet in tweets"
        :key="tweet.id_str"
        :tweet="tweet"
      >
      </tweet-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import { mapState } from 'vuex'
  import TweetListItem from './TweetListItem'

  export default {
    name: 'timeline',
    props: [ 'mode' ],
    components: { TweetListItem },
    computed: {
      tweets: function () {
        if (this.mode === 'Timeline') {
          return this.timeline
        } else if (this.mode === 'Mentions') {
          return this.mentions
        } else if (this.mode === 'Favorites') {
          return this.favorites
        } else if (this.mode === 'Lists') {
          return this.lists
        }
      },
      ...mapState({
        timeline: state => state.twitter.timeline,
        mentions: state => state.twitter.mentions,
        favorites: state => state.twitter.favorites,
        lists: state => state.twitter.listsStatuses
      })
    }
  }
</script>