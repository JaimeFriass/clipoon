<template>
    <div class="login">
        <b-row align-h="center">
                <b-col class="login-box" sm="12" md="8" lg="5">
                    <h3 class="register-title">Inicia sesión</h3>
                    <b-form v-if="show">
                        <b-form-input type="email" v-model="email" required placeholder="Correo"></b-form-input><br>
                        <b-form-input type="password" v-model="password" required placeholder="Contraseña"></b-form-input><br>
                        <b-button v-on:click="login" class="bt-normal" type="submit">Iniciar sesión</b-button>
                        <span class="login-message">Si no tienes cuenta <router-link to="/register"><b>únete ya</b></router-link></span>
                    </b-form>
                </b-col>
        </b-row>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import db from './firebaseInit'

    export default {
        name: 'Login',
        data: function() {
            return {
                email: '',
                password: '',
                show: true
            }
        },
        methods: {
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        if (user) {
                            console.log(firebase.auth().currentUser.uid)
                            db.collection('users').doc(firebase.auth().currentUser.uid).get().then((doc) => {
                                if (doc.exists) {
                                    this.$store.commit('setName', doc.data().name)
                                    this.$store.commit('setUid', firebase.auth().currentUser.uid)
                                    this.$store.commit('addSuccessNot', "Logueado correctamente")
                                    this.$router.replace('feed')
                                } else {
                                    alert("[ERROR] No se ha encontrado el usuario con id " + firebase.auth().currentUser.uid)
                                }
                            })
                        } else {
                            alert("No se ha encontrado el usuario")
                        }
                        
                    },
                    (err) => {
                        alert('Error:' + err.message)
                    }
                );
            }
        }
    }
</script>

<style scoped>

    @import '../main.scss';

    .register-title {
        margin: 10px;
        margin-bottom: 25px;
        text-align: center;
    }
    .signUp {
        margin-top: 40px;
    }

    .login {
        margin-top: 100px;
        margin-bottom: 180px;
    }
    
    .login-box {
        border: solid black 1px;
        padding: 24px;
        border-radius: 6px;
        background-color: white;
    }

    .conditions {
        font-size: 11pt;
        color: gray;
    }

    form {
        width: 100%;
    }

    input {
        margin: 2px 0;
        width: 100%;
        padding: 10px;
    }

    button {
        margin-top: 6px;
        padding: 11px;
        width: 100%;
        cursor: pointer;
    }
</style>