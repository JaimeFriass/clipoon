<template>
    <div class="login">
        <b-row align-h="center">
                <b-col class="login-box" sm="12" md="8" lg="5">
                    <h3 class="register-title">Únete ya y encuentra gente</h3>
                    <b-form v-if="show">
                        <b-form-input type="text" v-model="name" required placeholder="Nombre"></b-form-input><br/>
                        <b-form-input type="email" v-model="email" required placeholder="Correo"></b-form-input><br>
                        <b-form-input type="password" v-model="password" required placeholder="Contraseña"></b-form-input><br>
                        <b-form-input type="password" v-model="password_conf" required placeholder="Confirmar contraseña"></b-form-input><br>
                        <span class="conditions">Al registrarte, aceptas las Condiciones de uso, la Política 
                            de privacidad y la Política de cookies de 'aun sin nombre'.
                        </span>
                        <b-button class="bt-normal" v-on:click="register" type="submit">Registrarse</b-button>
                        <span class="login-message">Si ya tienes cuenta puedes <router-link to="/login"><b>iniciar sesión</b></router-link></span>
                    </b-form>
                </b-col>
        </b-row>
    </div>
</template>

<script>
    import firebase from 'firebase'
    var db = firebase.firestore();

    export default {
        name: 'Login',
        data: function() {
            return {
                name: '',
                email: '',
                password: '',
                password_conf: '',
                show: true
            }
        },
        methods: {
            register: function() {
                if (this.name != '') {
                    if (this.password.length >= 6) {
                        if (this.password == this.password_conf) {
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                                (user) => {
                                    this.$router.replace('feed')
                                    db.collection("users").doc( firebase.auth().currentUser.uid ).set({
                                        name: this.name,
                                        uid:  firebase.auth().currentUser.uid
                                    })
                                    .then ( function() {
                                        console.log("Nombre guardado correctamente!");
                                    })
                                    .catch( function(error) {
                                        console.log("Error escribiendo el nombre ", error)
                                    })
                                    this.$store.commit('setName', this.name)
                                    this.$store.commit('addSuccessNot', "Registrado correctamente!")
                                    firebase.auth().currentUser.updateProfile({displayName: this.name})
                                },
                                (err) => {
                                    alert('Oops. Ha ocurrido algo malo: ' + err.message)
                                }
                            );
                        } else {
                            alert('No has escrito las dos contraseñas igual')
                        }
                    } else {
                        alert('La contraseña debe de ser más larga')
                    }
                } else {
                    alert('No has introducido nombre')
                }
                
            }
        }
    }
</script>

<style lang="scss">

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