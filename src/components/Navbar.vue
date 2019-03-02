<template>
    <div class="background">
        <b-navbar id="nav" class="nvar" toggleable="md" type="dark" fixed="top">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#" v-on:click="goToFeed">{{ title }}</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item v-if="logued" href="#" v-on:click="goToFeed"><i class="fa fa-user-astronaut"></i> Inicio</b-nav-item>
                    <b-nav-item v-if="logued" href="#" v-on:click="goToMessages"><i class="fa fa-envelope"></i> Mensajes</b-nav-item>
                    <b-nav-item v-if="logued" href="#" v-on:click="goToProjects"><i class="fa fa-briefcase"></i> Proyectos</b-nav-item>
                    <b-nav-item v-if="logued" href="#" v-on:click="goToPeople"><i class="fa fa-user "></i> Gente</b-nav-item>
                    <b-nav-item v-else href="#"><router-link class="link" to="login">Iniciar sesión</router-link></b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                <b-nav-form class="search-form">
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
                    <b-button size="sm" class="bt-normal bt-secundary my-2 my-sm-0" type="submit"><i class="fa fa-search"></i></b-button>
                </b-nav-form>

                <b-nav-item-dropdown right v-if="logued">
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                    <em>{{displayName}}</em>
                    </template>
                    <b-dropdown-item href="#"><router-link to="/profile">Perfil</router-link></b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="logout">Cerrar sesión</b-dropdown-item>
                </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>

    <!-- navbar-1.vue -->

</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'


var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav").style.padding = "0.55rem 1rem"
    } else {
        document.getElementById("nav").style.padding = "0.15rem 1rem";
    }
    prevScrollpos = currentScrollPos;
}

export default {
    data() {
        return{
            title: 'Clipoon',
            logued: false,
            notlogued: true,
            displayName: this.$store.state.name
        }
    },
    beforeRouteUpdate (to, from, next) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transision = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        next()
    },
    create() {
        this.displayName = this.$store.state.name
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        goToFeed: function() {
            this.$router.replace('/feed')
        },
        goToProjects: function() {
            this.$router.replace('/projects')
        },
        goToMessages: function() {
            this.$router.replace('/messages')
        },
        goToPeople: function() {
            this.$router.replace('/people')
        },
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$store.commit('logout')
                this.$store.commit('addSuccessNot', "Sesión cerrada correctamente!")
                this.$router.replace('login')
            })
        },
        fetchData() {
            console.log("Fetch data navbar")
            this.displayName = this.$store.state.name
            if (firebase.auth().currentUser) {
                this.logued = true
                this.notlogued = false
            } else {
                this.logued = false
                this.notlogued = true
            }
            /*
            if (firebase.auth().currentUser) {
                db.collection('users').doc(this.$root.$data.globalUid).get().then( (doc) => {
                    if (doc) {
                        this.logued = true
                        this.notlogued = false
                        this.displayName = doc.data().name
                    }
                })
            } else {
                this.logued = false
                this.notlogued = true
            }
            */
        }
    }
}
</script>

<style lang="scss">
    @import '../main.scss';

    .navbar-brand {
        color: orange !important;
        font-weight:100 !important;
    }


    .nvar {
        background-color: #1b130ed8;
        //background: linear-gradient(to right, unquote(#ff8742e7), rgba(238, 155, 46, 0.836));
        background: linear-gradient(to right, 
        unquote(#474747e7), 
        rgb(65, 65, 65)) !important;
        -webkit-transition: all 0.5s;
        transition: padding 0.3s ease;
        padding: .55rem 1rem;
    }

    .nav-item, .nav-link {
        text-align: center;
        transition: 0.1s;
    }

    .nav-item:hover, .nav-link:hover {
        color: orange !important;
    }

    .search-form {
        text-align: center;
    }

    .background {
        background-image: url("../assets/camera.jpg");
        background-position: center;  
    }
</style>