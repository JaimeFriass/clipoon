<template>
    <div>
        <div class="contacts-box">
            <h2>Tus contactos</h2>
            <div class="projects-list">
                <b-row align-h="center" v-if="loadingContacts == 0">
                    <h1 class="spinner"><i class="fa fa-asterisk fa-spin"></i></h1>
                </b-row>
                <b-row v-else-if="loadingContacts == 2" align-h="center">
                    <h4 class="spiner"><i class="fa fa-times"></i> Aún no tienes contactos</h4>
                </b-row>
                <b-row v-else class="contact-box" v-for="user in contactList" v-bind:data="contactList" v-bind:key="user.uid">
                    <b-col sm="6" md="4" lg="3">
                        <b-img center thumbnail height="130" width="130" 
                            fluid src="src/assets/user-icon.png" alt="Photo"/>
                    </b-col>
                    <b-col sm="6" md="8" lg="9">
                        <h3>{{ user.name }}</h3>
                        <router-link class="bt-normal" v-bind:to="{ name: 'user-view', params: { userid: user.uid }}">Perfil</router-link>
                        <b-button class="bt-normal bt-secundary"><i class="fa fa-envelope"></i></b-button>
                    </b-col>
                </b-row>

            </div>
        </div>

        <div class="contacts-box">
            <br><h1>Gente cercana</h1><br>
            <div class="projects-list">
                <b-row align-h="center" v-if="loadingUsers == 0">
                    <h1 class="spinner"><i class="fa fa-asterisk fa-spin"></i></h1>
                </b-row>
                <b-row v-else >
                    <b-col class="contact-box" v-for="user in userList" v-bind:data="userList" v-bind:key="user.uid" sm="6" md="6" lg="6">
                        <b-row>
                            <b-col sm="6" md="4" lg="3">
                                <b-img center thumbnail height="150" width="150" 
                                    fluid src="src/assets/user-icon.png" alt="Photo"/>
                            </b-col>
                            <b-col sm="6" md="8" lg="9">
                                <h4>{{ user.name }}</h4>
                                <h6>Operario de cámara</h6>
                                <router-link class="bt-normal" v-bind:to="{ name: 'user-view', params: { userid: user.uid }}">Perfil</router-link>
                                <b-button v-on:click="addContact(user.uid)" class="bt-normal bt-secundary">Añadir a contactos</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>

import db from './firebaseInit'

export default {
    name: 'Projects',
    data() {
        return{
            contactList: [],
            userList: [],
            loadingUsers: 0,
            loadingContacts: 0,
        }
    },
    created() {
        this.userList = []
        this.contactList = []
        this.errorNoContacts = false
        this.getContacts()
        this.getUsers()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        getUsers() {
            this.userList = []
            this.loadingUsers = 0
            db.collection('users').get().then( (querySnapshot) => {
                querySnapshot.forEach( (doc) => {

                    const userData = {
                        'name': doc.data().name,
                        'uid': doc.data().uid
                    }
                    this.userList.push(userData)
                })
                this.loadingUsers = 1
            }).catch( function(error) {
                alert("Error al obtener la lista de usuarios")
            })
        },
        getContacts() {
            this.contactList = []
            this.loadingContacts = 0
            db.collection('user-relations').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) => {
                querySnapshot.forEach( (doc) => {

                    db.collection('users').where('uid', '==', doc.data().relation).get().then( (querySnapshot) => {
                    querySnapshot.forEach( (user) => {
                            const userData = {
                                'name': user.data().name,
                                'uid': user.data().uid
                            }
                            this.contactList.push(userData)
                    })

                    }).catch(function(error) {
                        console.log("ERROR:" + error)
                    })
                })
                if (this.contactList.length == 0)
                    this.loadingContacts = 2
            }).catch(function(error) {
                alert("Error al user-relations:" + error)
            })
        },
        addContact(uid) {
            db.collection('user-relations').add({
                uid: this.$store.state.uid,
                relation: uid,
                pending: true
            }).then( (docRef) => {

            }).catch( function(error) {
                alert()
            })
        },
        fetchData() { 
            this.getContacts()
            this.getUsers()
        }
    }
}
</script>

<style lang="scss">
    @import '../main.scss';

    .contacts-box {
        color: black;
        padding: 10px;
        margin: 20px;
        width: auto;
        background-color: white;
        border-radius: 3px;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 50px;
    }

    .contact-box {
        border-top: solid rgb(223, 223, 223) 1px;
        padding: 15px;
        text-align: left;
        margin-bottom: 5px;
    }

</style>
