<template>
    <div class="projects-box">
        <h2>Gestión de proyectos</h2>
        <div class="projects-list">
            <b-row align-h="center" v-if="loading">
                <h1 class="spinner"><i class="fa fa-asterisk fa-spin"></i></h1>
            </b-row>
            <b-row v-else class="project-box" v-for="proje in projects" v-bind:data="projects" v-bind:key="proje.id">
                <b-col sm="6" md="5" lg="3">
                    <b-img center thumbnail height="200" width="500" 
                        fluid src="src/assets/proj-thumbnail.jpg" alt="Photo"/>
                </b-col>
                <b-col sm="6" md="7" lg="9">
                    <h3>{{ proje.name }} <b-badge pill></b-badge></h3>
                    <p class="date"> {{ proje.date}}</p>
                    <h5 class="p-cat">{{ proje.cat }}</h5>
                    <p class="p-desc">
                        {{ proje.desc }}
                    </p>
                    <router-link class="bt-normal" v-bind:to="{ name: 'project-view', params: { projid: proje.id }}">Ver</router-link>
                    <b-button href="#" class="bt-normal bt-secundary">Añadir personas</b-button>
                </b-col>
            </b-row>
      
            <b-row align-h="center">
                <b-col sm="12" md="3" lg="4">
                    <b-button class="bt-normal bt-filled" v-on:click="createProject"><i class="fas fa-plus"></i> Crear proyecto</b-button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

import db from './firebaseInit'

export default {
    name: 'Projects',
    data() {
        return{
            projects: [],
            loading: true
        }
    },
    created() {
        this.projects = []
        this.loading = true
        // Get proyect ids
        db.collection('user-projects').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
               // projectIds.push(doc.data().projid)
                db.collection('projects').where('id', '==', doc.data().projid).get().then( (querySnapshot) => {
                   querySnapshot.forEach( (project) => {
                        const projectData = {
                            'id': project.data().id,
                            'desc': project.data().desc,
                            'cat': project.data().cat,
                            'privacy': project.data().privacy,
                            'name': project.data().name,
                            'date': project.data().created.toDate().toDateString()
                        }
                        this.projects.push(projectData)
                   })
                   this.loading = false

                }).catch(function(error) {
                    console.log("ERROR:::" + error)
                })
            })
        }).catch(function(error) {
            alert("Error al user-projects:" + error)
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            this.projects = []
            db.collection('user-projects').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) => {
                querySnapshot.forEach( (doc) => {
                // projectIds.push(doc.data().projid)
                    db.collection('projects').where('id', '==', doc.data().projid).get().then( (querySnapshot) => {
                    querySnapshot.forEach( (project) => {
                            const projectData = {
                                'id': project.data().id,
                                'desc': project.data().desc,
                                'privacy': project.data().privacy,
                                'name': project.data().name,
                                'date': project.data().created
                            }
                            this.projects.push(projectData)
                    })

                    }).catch(function(error) {
                        console.log("ERROR:::" + error)
                    })
                })
            }).catch(function(error) {
                alert("Error al user-projects:" + error)
            })
        },
        createProject: function() {
            this.$router.replace('new')
            console.log("Pulsado")
        }
    }
}
</script>

<style lang="scss">
    @import '../main.scss';

    .projects-box {
        color: black;
        padding: 20px;
        margin: 20px;
        width: auto;
        background-color: white;
        border-radius: 3px;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 250px;
    }

    .project-box {
        border-top: solid rgb(223, 223, 223) 1px;
        padding: 25px;
        text-align: left;
        margin-bottom: 20px;
    }
    .project-box:first-child {
        margin-top: 40px;
    }

    .p-cat {
        color: gray;
        margin-top: -32px;
    }

    .p-desc {
        margin-top: 10px;
    }

    .project-box p.date {
        color: gray;
        text-align: right;
        margin-top: -20px;
    }

</style>
