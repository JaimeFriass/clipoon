<template>
    <div>
        <b-row>
            <b-col sm="12" md="5" lg="4">
                <div class="sidebar">
                    <div class="sidebar-header">
                        <a href="#" v-on:click="goToProfile">
                            <b-img center thumbnail rounded="circle" height="150" width="150" fluid src="src/assets/user-icon.png" alt="Photo"/>
                            <h4>{{ displayName }}</h4>
                            <h6>{{ mainRole }}</h6>
                        </a>
                    </div>
 
                    <b-button class="bt-normal bt-primary" v-on:click="goToMessages"><i class="fas fa-comment"></i> Mensajes</b-button>
                    <div class="projects">
                        <h5>Tus proyectos</h5>
                        <b-list-group>

                            <router-link class="clickable" v-bind:to="{ name: 'project-view', params: { projid: proj.id }}" 
                                        v-for="proj in projects" v-bind:data="projects" v-bind:key="proj.id">
                                <b-list-group-item  class="project">
                                    <h6>{{ proj.name }} </h6>
                                    <p>{{ proj.desc }}</p>
                                </b-list-group-item>
                            </router-link>

                            <b-button class="bt-normal bt-primary" v-on:click="createProject">Crear proyecto</b-button>
                        </b-list-group>
                    </div>

                </div>
            </b-col>
            <b-col sm="12" md="7" lg="8">
                <div class="notifications">
                    <b-alert :show="showAlert" dismissible variant="warning">
                        <p><i class="fa fa-marker"></i>  Tienes que <a href="#" class="alert-link">actualizar</a> tu ubicación</p>
                    </b-alert>
                </div>
                <div class="feed">
                    <p v-for="feed in history" v-bind:key="feed.created.toString()"> {{feed.created}} - {{ feed.pName }} </p>
                </div>
                <vlogs/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vlog from './Vlog.vue'
import Login from './Login.vue'
import firebase from 'firebase'
import db from './firebaseInit'

var displayN = "Nombre por defecto"


export default {
    name: 'Vlog',
    data() {
        return{
            item: '',
            showAlert: true,
            displayName: this.$store.state.name,
            mainRole: '',
            projects: [],
            history: [],
        }
    },
    created() {
        db.collection('users').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) => {
            console.log("Prueba")
            querySnapshot.forEach( (doc) => {
                this.mainRole = doc.data().main_role;
                console.log("asdDSA",doc.data().main_role)
            })
        }).catch(function(error) {
            console.log("ERROR: " + error)
        })

        db.collection('user-projects').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) => {
                querySnapshot.forEach( (doc) => {
                // projectIds.push(doc.data().projid)
                    db.collection('projects').where('id', '==', doc.data().projid).get().then( (querySnapshot) => {
                    querySnapshot.forEach( (project) => {
                            const projectData = {
                                'id': project.data().id,
                                'desc': project.data().desc,
                                'name': project.data().name,
                            }
                            this.projects.push(projectData)
                    })

                    }).catch(function(error) {
                        console.log("ERROR: " + error)
                    })
                })
        }).catch(function(error) {
            alert("Error al user-projects:" + error)
        })


        db.collection('user-history').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) =>
            querySnapshot.forEach( (doc) => {
                if (doc.data().interaction == "project") {
                    console.log(doc.data().projid)
                    db.collection('projects').where('id', '==', doc.data().projid).get().then( (query) => {
                        query.forEach( (proj) => {
                            const data = {
                                'interaction': 'project',
                                'pName' : proj.data().name,
                                'pId' : proj.data().id,
                                'pCat' : proj.data().cat,
                                'created' : proj.data().created
                            }
                            console.log(data)
                            this.history.push(data)
                        })
                    }).catch( (error) => {
                        alert("ERROR: " + error)
                    })
                }
            })
        ).catch( (error) => {
            alert("ERROR: " + error)
        })
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // asdasdasdasd
        })
    },
    computed: {
      currentUid() {
          return this.$store.state.uid
      }
    },
    components: {
        'logueo': Login,
        'vlogs' : Vlog
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fecthData() {
            console.log("FETCH DATA FEED")
            alert("Hola")
        },
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login')
            })
        },
        goToProfile: function() {
            this.$router.replace('profile')
        },
        goToMessages: function() {
            this.$router.replace('messages')
        },
        createProject: function() {
            this.$router.replace('new')
        }
    }
}
</script>

<style lang="scss">

    .sidebar-header a {
        text-decoration: none;
        color: black;
        display: inline-block;
        cursor: pointer;
        font-weight: 300;
        letter-spacing:0ch;
    }

    .sidebar-header a:hover {
        color: rgb(133, 35, 0);
        letter-spacing:0.02ch;
    }
    .sidebar {
        color: black;
        padding: 20px;
        margin: 10px;
        margin-right: 0px;
        width: auto;
        background-color: white;
        border-radius: 3px;
        text-align: center;
    }
    .projects {
        margin-top: 30px;
        margin-bottom: 40px;
        text-align: left;
        
    }

    .projects h5 {
        color: rgb(77, 77, 77);
    }

    .project {
        color: black;
        width: 100%;
        text-decoration: none;
        display: inline-block;
        background-color: white;
        cursor: pointer;
    }

    .notifications {
        margin: 10px;
    }


    .clickable {
        text-decoration: none;
    }

    .project:hover {
        background-color:rgb(252, 236, 230);
        text-decoration: none;
    }

    .project p {
        font-weight: 100;
    }

    .project h6 {
        font-weight: 600;
    }
</style>
