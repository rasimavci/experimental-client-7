<template>
  <v-ons-page>
    <v-ons-list>
      <tweet-list-item
        v-for="contact in contacts"
        :key="contact.id_str"
        :contact="contact"
      >
      </tweet-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import { mapState } from 'vuex'
  import ContactListItem from './ContactListItem'

  export default {
    name: 'timeline',
    props: [ 'mode' ],
    components: { ContactListItem },
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
        timeline: state => state.contact.timeline,
        mentions: state => state.contact.mentions,
        favorites: state => state.contact.favorites
      })
    }
  }
</script>