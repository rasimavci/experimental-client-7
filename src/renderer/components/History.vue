<template>
  <v-ons-page>
    <v-ons-list>
      <tweet-list-item
        v-for="callog in history"
        :key="callog.id_str"
        :callog="callog"
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
      history: function () {
        if (this.mode === 'All') {
          return this.history
        } else if (this.mode === 'Outgoing') {
          return this.history.filter(note => note.direction === 'outgoing')
        } else if (this.mode === 'Incoming') {
          return this.history.filter(note => note.direction === 'incoming')
        } else if (this.mode === 'Missed') {
          return this.history.filter(note => note.direction === 'missed')
        }
      },
      ...mapState({
        messages: state => state.history
      })
    }
  }
</script>