<template>
    <div class="notif-container">
        <div v-for="notif in notifications" class="notif" v-bind:key="notif">
            <p><i class="fa" v-bind:class="notif.icon"></i> {{ notif.msg }}</p>
        </div>
    </div>
</template>


<script>
import db from './firebaseInit'

export default {
    data() {
        return{
            notifications: this.$store.state.notifications
        }
    },
    methods: {
        createNotif() {
            this.$store.commit('addNot', "Prueba de notificación")
        },
        deleteNotif() {
            this.$store.commit('removeNot')
        }
    }
}
</script>


<style lang="scss">
    @import '../main.scss';

     @keyframes example {
        0% {left: -420px;}
        25% {left: 0px;}
        50% {left: 0px;}
        75% {left: 0px;}
        100% {left: -420px;}
    }

    .notif-container {
        position: fixed;
        height: 200px;
        top: 100px;
        left: 0px;
        z-index: 10;
    }

    .notif {
        border-radius: 15px;
        box-shadow: rgba(182, 182, 182, 0.219) 2px;
        box-shadow: rgba(136, 136, 136, 0.555) 5px 5px 15px;
        text-align: center;
        position:absolute;
        left: -420px;
        padding: 20px;
        margin: 10px;
        height: 70px;
        width: 400px;
        background-color: rgba(255, 179, 92, 0.6);
        transition: all 0.5s;
        animation-name: example;
        animation-duration: 3s;
    }

    .notif p {
        font-size: 15pt;
    }

</style>
