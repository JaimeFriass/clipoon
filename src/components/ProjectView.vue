<template>
    <div>
        <div class="project-view-box" v-if="loading">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
        </div>
        <div class="project-view-box" v-else>
            <div class="p-header">
                <h1>{{ name }}</h1><h3 v-if="privacy == 'private'">PRIVADO</h3>
                <h5 class="p-view-category">{{ cat }}</h5>
            </div>
            <div class="p-body">
                <b-row>
                    <b-col class="project-desc" sm="12" md="6" lg="6">
                        <p>{{ desc }}</p>
                        <h5><i class="fa fa-hand-paper"></i> Roles demandados</h5>
                        <ul>
                            <li>Operario de cámara</li>
                            <li>Guionista</li>
                            <li>Actor</li>
                        </ul>

                        <h5><i class="fa fa-calendar-alt"> </i> Fecha rodaje</h5>
                        <p>12 feb 2018</p>
                    </b-col>
                    <b-col sm="12" md="6" lg="6" class="users-box">
                        <h2 v-if="users.length >= 1"><i class="fa fa-user bt-right bt-rounded"></i> Participantes 
                        <b-button class="bt-normal bt-secundary bt-right bt-rounded" v-on:click="addMembers"><i class="fa fa-plus"></i></b-button></h2>
                        <b-row class="user-box" v-for="user in users" v-bind:data="users" v-bind:key="user.uid">
                            <b-col sm="6" md="5" lg="3">
                                <b-img center thumbnail height="150" width="150" 
                                    fluid src="src/assets/user-icon.png" alt="Photo"/>
                            </b-col>
                            <b-col sm="6" md="7" lg="9">
                                <h4>{{ user.name }} <b-badge pill v-if="user.role">DIRECTOR</b-badge></h4>
                                <h6>Operario de camara</h6>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-button class="bt-normal bt-secundary" v-on:click="deleteProject"><i class="fa fa-trash"></i> Eliminar proyecto</b-button>
            </div>
        </div>

        <b-modal ref="addMembers" hide-footer title="Añadir personas">
            <div class="d-block text-center">
                <p>Selecciona contactos para unirlos al proyecto actual.</p>
                <b-row class="addContact" align-h="center" v-for="user in addContact" v-bind:key="user.uid">
                    <h5> {{ user.name }} <b-button class="bt-normal bt-secundary bt-rounded" v-on:click="addMember(user.uid, user.name)"><i class="fa fa-plus"></i> </b-button></h5>
                </b-row>
            </div>
            <b-btn class="bt-normal bt-primary" block v-on:click="hideModal">Cerrar</b-btn>
        </b-modal> 
    </div>
</template>


<script>
    import db from './firebaseInit'

    export default {
        name: 'project-view',
        data() {
            return {
                name: '',
                desc: '',
                cat: '',
                privacy: '',
                author: null,
                authorName: null,
                addContact: [],
                users: [],
                loading: true
            }
        },
        created() {
            this.fetchData();
        },
        beforeRouteEnter (to, from, next) {
            db.collection('projects').where('id', '==', to.params.projid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    next(vm => {
                        vm.name = doc.data().name
                        vm.desc = doc.data().desc
                        vm.cat = doc.data().cat
                        vm.loading = false
                    })
                })
                
            }).catch(function(error) {
                alert("Error escribiendo el proyecto ", error)
            })
  
            db.collection('user-projects').where('projid', '==', to.params.projid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    next(vm => {
                        const data = {
                            'name': doc.data().name,
                            'uid': doc.data().uid,
                            'role': doc.data().role
                        }
                        vm.users.push(data)
                        vm.loading = false
                    })
                    if (!doc) {
                        alert("NO DOC")
                    }
                })
                
            }).catch(function(error) {
                alert("ERROR: " + error)
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            // TODO, no dejar aparecer a usuarios que ya estan en el proyecto
            addMembers() {
                this.addContact = []
                db.collection('user-relations').where('uid', '==', this.$store.state.uid).get().then( (querySnapshot) => {
                        querySnapshot.forEach( (doc) => {

                        db.collection('users').where('uid', '==', doc.data().relation).get().then( (querySnapshot) => {
                        querySnapshot.forEach( (user) => {
                                const userData = {
                                    'name': user.data().name,
                                    'uid': user.data().uid
                                }
                                var finded = false;
                                for (var i = 0; i < this.addContact.length; i++)
                                    if (userData.uid == this.addContact[i])
                                        finded = true

                                if (!finded)
                                    this.addContact.push(userData)
                        })
                        this.loading = false

                        }).catch(function(error) {
                            console.log("ERROR:" + error)
                        })
                    })
                }).catch(function(error) {
                    alert("Error al user-relations:" + error)
                })
                this.$refs.addMembers.show()
            },
            addMember(uid, name) {
                db.collection('user-projects').add({
                    name: name,
                    projid: this.$route.params.projid,
                    role: false,
                    uid: uid
                }).then( (docRef) => {
                    this.$store.commit('addSuccessNot', "Usuario añadido correctamente")
                    this.fetchData()
                    this.hideModal()
                }).catch( function(error) {
                    alert("Error al añadir el usuario: " + error)
                })
            },
            hideModal() {
                this.$refs.addMembers.hide()
            },
            fetchData() {
                this.users = []
                this.loading = true
                var user_finded = false;
                // Get proyect info by id
                db.collection('projects').where('id', '==', this.$route.params.projid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                            this.privacy = doc.data().privacy
                            this.name = doc.data().name
                            this.desc = doc.data().desc
                            this.cat = doc.data().cat
                            this.author = doc.data().author
                            
                    })
                }).catch(function(error) {
                    console.log("Error escribiendo el proyecto ", error)
                })

                // Get users of the project
                db.collection('user-projects').where('projid', '==', this.$route.params.projid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = {
                            'name': doc.data().name,
                            'uid': doc.data().uid,
                            'role': doc.data().role
                        }
                        this.users.push(data)

                        if (this.privacy == "private") {
                            if (doc.data().uid == this.$store.state.uid) {
                                user_finded = true
                            }
                        }
                    })

                    if (this.privacy == "private" && !user_finded) {
                        this.loading = true
                        alert("Proyecto privado")
                    } else {
                        this.loading = false
                    }
                })
            },
            deleteProject() {
                console.log("Delete proyect?")

                db.collection('projects').where('id', '==', this.$route.params.projid).get().then( (querySnapshot) => {
                    querySnapshot.forEach((doc)=> {
                        db.collection('projects').doc(doc.id).delete().then( () => {
                            db.collection('user-projects').where('projid', '==', this.$route.params.projid).get().then( (querySnapshot) => {
                                querySnapshot.forEach( (doc) => {
                                    db.collection('user-projects').doc(doc.id).delete().then( () => {
                                        this.$store.commit('addSuccessNot', "Proyecto eliminado con éxito")
                                        this.$router.replace('/projects')
                                    }).catch( (error) => {
                                        alert("Error al eliminar el proyecto!")
                                    })
                                })
                            })


                        }).catch( (error) => {
                            alert("Error al eliminar el proyecto: " + this.$route.params.projid + " => " + error)
                        })
                    })
                }).catch( (error) => {
                    alert("Error al eliminar el proyecto: " + this.$route.params.projid + " => " + error)
                })

            }
        }
    }
</script>

<style lang="scss">
    @import '../main.scss';

    .project-view-box {
        margin-top: 80px;
        margin-bottom: 100px;
        background-color: white;
        padding-bottom: 200px;
        padding-top: 10px;
        border-radius: 7px;
    }

    .project-desc {
        padding: 20px;
    }
    .users-box {
        border-left: solid rgb(224, 224, 224) 1px;
    }

    .user-box {
        margin: 40px;   
    }

    .p-header {
        background-color: $primary-color;
        width: 115%;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-left: -50px;
        margin-top: 20px;
    }

    .p-header h1 {
        display: inline;
    }

    .p-view-category {
        margin-left: 100px;
        margin-top: -5px;
        color: rgba(255, 255, 255, 0.445);
    }

    .p-header h3 {
        color: black;
        font-size: 12pt;
        display: inline;
        padding: 10px 10px 10px 10px;
        margin-left: -55px;
        background-color: orange;
        border-radius: 50px;
    }

    .p-header::before {
        padding: 100px;
        width: 110%;
    }

    .p-header h1 {
        font-size: 30pt;
        margin: 30px;
        padding: 30px;
        color: white;
    }

    .p-body {
        padding: 20px;
    }

    .p-body p {
        font-size: 17pt;
    }

    .addContact {
        margin: 20px;
    }
</style>
