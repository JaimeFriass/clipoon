<template>
    <div>
        <b-row align-h="center">
            <b-col sm="12" md="11" lg="10">
                <div class="profile-box">
                    <div class="profile-background">
                    </div>
                        <div class="profile-header">
                            <b-img center thumbnail rounded="circle" height="230" width="230" fluid src="src/assets/user-icon.png" alt="Photo"/>
                            <h1>{{ displayName }}</h1>
                            <h6>Operario de camara</h6>
                            <h4>
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i> 4.6
                            </h4>
                            <router-link to="feed">Volver</router-link>
                            <h5 class="location"><i class="fas fa-map-marker-alt  "></i> Granada, Andalucía</h5>
                        </div>
                    
                    <b-row class="sub-profile">
                        <b-col class="equipment" sm="12" md="6" lg="6">
                            <h4><i class="fas fa-camera"></i> Equipo técnico</h4>
                            <p>Camara Canon 2300D</p>
                            <p>Camara de video XXXXXX</p>
                            <p>Drone XXXXXXX</p>
                        </b-col>
                        <b-col class="services" sm="12" md="6" lg="6">
                            <h4><i class="fas fa-bullseye "></i> Servicios</h4>
                            <p>Realización audiovisual</p>
                            <p>Operador de cámara</p>
                            <p>Postproducción audiovisual</p>
                        </b-col>
                    </b-row>
                    <div class="projects-profile">
                        <h3><i class="fas fa-certificate"></i> Proyectos</h3>
                        <b-row>
                            <b-col class="project-profile" sm="12" md="6" lg="4">
                                <h5>Corto "Prueba3"</h5>
                                <p>Descripcion del corto en cuestión. No sé que meterle a sí que es de relleno. </p>
                            </b-col>
                            <b-col class="project-profile" sm="12" md="6" lg="4">
                                <h5>Corto "Prueba3"</h5>
                                <p>Descripcion del corto en cuestión. No sé que meterle a sí que es de relleno. </p>
                            </b-col>
                            <b-col class="project-profile" sm="12" md="6" lg="4">
                                <h5>Corto "Prueba3"</h5>
                                <p>Descripcion del corto en cuestión. No sé que meterle a sí que es de relleno. </p>
                            </b-col>
                        </b-row>
                    </div>
                    <b-row class="video-reel">
                        <h3><i class="fas fa-play "></i> Video reel</h3>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ig91dXrcf7M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                    </b-row>
                    <h5>Mensajes</h5>
                    <b-form>
                        <b-row>
                            <b-col sm="12" md="10" lg="10">
                                <b-input type="text" v-model="message.text"/>
                            </b-col>
                            <b-col sm="12" md="2" lg="2">
                                <b-button class="bt-normal" type="submit" v-on:click="addMessage">Enviar</b-button>
                            </b-col>
                            
                        </b-row>
                    </b-form>

                    <b-list-group>
                        <b-list-group-item v-bind:key="msg" class="msg" v-for="msg in messages"> {{ msg.author }}: {{ msg.text }} </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vlog from './Vlog.vue'
import Login from './Login.vue'
import firebase from 'firebase'


export default {
    name: 'Profile',
    data() {
        return{
            prueba: 1,
            messages: this.$root.usuarios,
            displayName: firebase.auth().currentUser.displayName,
            message: {
                text: '',
                author: firebase.auth().currentUser.displayName
            }
        }
    },
    methods: {
        addMessage: function () {
            this.$root.usuarios.push(this.message)
            console.log("Mensaje añadido")
            this.message = ''
            console.log(firebase.auth().currentUser)
        }
    }
}
</script>

<style lang="scss">
    .profile-box {
        width: auto;
        background-color: white;
        border-radius: 5px;
        margin: 10px;
        margin-top: 100px;
        padding: 20px;
        margin-bottom: 300px;
    }
    .profile-background {
        background-position-x: -350px;
        background-position-y: -140px;
        background-size: 1350px;
        background-image: url('https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/33160531_1296090107202205_7376686968890982400_n.jpg?_nc_cat=0&oh=efad064095658f51e8eea63835434710&oe=5BEB84AE');
        filter: opacity(50%);
        z-index: 1;
    }

    .profile-header {
        background: none;
        z-index: 5;
        text-align: center;
        border-bottom: solid rgb(185, 185, 185) 1px;
        padding: 20px;
        
    }

        .profile-header .location{
            text-align: right;
            margin-top: -40px;
            font-style: italic;
            letter-spacing: 0.02rem;
            font-weight: 100;
        }

    .sub-profile {
        margin-top: 40px;
    }

    .equipment p, .services p{
        line-height: 15px;
        font-size: 13pt;
        color: rgb(54, 54, 54);
        margin: 20px;
    }

    .projects-profile {
        margin-top: 40px;
        border-top: solid rgb(219, 219, 219) 1px;
        padding: 10px;
    }

    .projects-profile h3, .video-reel h3 {
        font-weight: 100;
        font-size: 27pt;
        margin-bottom: 20px;
    }

    .project-profile {
        margin-top: 20px;
    }

    .project-profile h5 {
        font-weight: 600;
    }

    .project-profile p {
        font-weight: 100;
    }

    .video-reel {
        margin: 20px;
    }

    .msg {
        margin: 5px;
    }

    .msg:first-child {
        margin-top: 30px;
    }
</style>