<template>
    <div class="cpr-box">
        <h2>Nuevo proyecto</h2>

        <b-row align-h="center">
            <b-col sm="12" md="12" lg="12">
                <label class="error">{{ err_name }} </label>
            </b-col>
            <b-col sm="12" md="3" lg="2">
                Nombre: 
            </b-col>
            <b-col sm="12" md="6" lg="3">
                <b-input :state="nameState" type="text" v-model="name"></b-input>
            </b-col>
        </b-row>

        <b-row align-h="center" class="select-cat">
            <b-col sm="12" md="12" lg="12">
                <label class="error">{{ err_cat }} </label>
            </b-col>
            <b-col sm="12" md="3" lg="2">
                Categoría
            </b-col>
            <b-col sm="12" md="6" lg="3">
                <b-form-select v-model="catSelected" :options="catOptions" class="mb-2" />
            </b-col>
        </b-row>

        <b-row align-h="center">
            <b-col sm="12" md="9" lg="8">
                <label class="error">{{ err_desc }} </label><br />
                Descripcion: 
                <b-form-textarea v-model="desc" :rows="1" :max-rows="2">
                </b-form-textarea>
            </b-col>
        </b-row>

        <b-row align-h="center">
            <b-col sm="12" md="6" lg="2">
                <label class="error">{{ err_priv }} </label><br />
                <label class="container-radio">
                    <input checked="checked" type="radio" v-model="privacy" value="public">Público
                    <span class="checkmark"></span>
                </label>
                <label class="container-radio">
                    <input type="radio" v-model="privacy" value="private">Privado
                    <span class="checkmark"></span>
                </label>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-button class="bt-normal bt-filled" type="submit" v-on:click="saveProject">Guardar</b-button>
        </b-row>

    </div>
</template>

<script>
import firebase from 'firebase'
var db = firebase.firestore();
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
})

export default {
    name: 'NewProject',
    computed: {
        nameState() {
            return this.name.length > 5 ? true : false
        }
    },
    data() {
        return{
            name: '',
            privacy: '',
            err_name: '',
            desc: '',
            err_desc: '',
            err_priv: '',
            catSelected: '',
            err_cat: '',
            catOptions: [
                { value: 'Cortometraje', text: 'Cortometraje'},
                { value: 'Mediometraje', text: 'Mediometraje'},
                { value: 'Largometraje', text: 'Largometraje'},
                { value: 'Spot publicitario', text: 'Spot publicitario'},
                { value: 'Videoclip', text: 'Videoclip'},
                { value: 'Documental', text: 'Documental'},
                { value: 'Reportaje', text: 'Reportaje'},
                { value: 'Video Corporativo', text: 'Video Corporativo'},
                { value: 'Cortometraje animado', text: 'Cortometraje animado'},
                { value: 'Mediometraje animado', text: 'Mediometraje animado'},
                { value: 'Largometraje animado', text: 'Largometraje animado'},
                { value: 'Otro', text: 'Otro'}
            ]
        }
    },
    methods: {
        saveProject: function() {
            if (true) {
                if (this.name != '')
                    this.err_name = ''
                else
                    this.err_name = 'El proyecto no tiene nombre'
                
                if (this.desc != '')
                    this.err_desc = ''
                else
                    this.err_desc = 'El proyecto necesita alguna descripción'
                
                if (this.privacy != '')
                    this.err_priv = ''
                else
                    this.err_priv = 'Tienes que especificar la privacidad del proyecto'

                if (this.catSelected != '')
                    this.err_cat = ''
                else
                    this.err_cat = 'Tienes que seleccionar una categoría para el proyecto'

                if (this.err_name == '' && this.err_desc == '' && this.err_priv == '' && this.err_cat == '') {
                    //db.collection.ref('projects/' + )
                    var number = Math.floor(Math.random()*100)
                    var proj_id = number.toString();
                    proj_id = 'a' + proj_id

                    db.collection("projects").add({
                                        name: this.name,
                                        desc: this.desc,
                                        cat: this.catSelected,
                                        id: proj_id,
                                        privacy: this.privacy,
                                        created: new Date()
                                    })
                    .then ( (docRef) => {
                        var docId = docRef.id;
  
                    db.collection('users').doc(this.$store.state.uid).get().then( (doc) => {
                        if (doc.exists) {
                            var user_name = doc.data().name

                            db.collection('user-projects').add({
                                name: user_name,
                                projid: proj_id,
                                role: true,
                                uid: this.$store.state.uid
                            }).then( (docRef) => {
                                this.$store.commit('addSuccessNot', "Proyecto creado correctamente!")
                                this.$router.replace('/projects')
                            }).catch(function(error) {
                                alert("ERrorrrrr: " + error)
                            })
                        } else {
                            alert("Docuumento no existe")
                        }
                    })
                        
                    })
                    .catch( function(error) {
                        console.log("Error escribiendo el proyecto ", error)
                    })
                } else {
                    console.log("Hubo un  error")
                }
            } else {
                alert("No hay usuario.")
            }
        }
    }
}
</script>

<style lang="scss">
    @import '../main.scss';
    
    label.error {
        color: brown,
    }

    .cpr-box h2 {
        margin-bottom: 50px;
    }

    .select-cat {
        margin-top: 20px;
    }
    .container-radio {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 15pt;
        text-align: center;
    }

    .container-radio input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: none;
        border-radius: 50%;
        border: solid black 0.1rem;
        transition: all 0.2s;
    }

    .container-radio:hover input ~.checkmark {
        background-color: rgb(255, 219, 184);
    }

    .container-radio input:checked ~ .checkmark {
        background-color: $primary-color;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none
    }

    .container-radio input:checked ~ .checkmark:after {
        display: block;
    }


    .container-radio .checkmark:after {
        top: 0.44rem;
        left: 0.46rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }

    .cpr-box {
        color: black;
        padding: 20px;
        margin: 20px;
        width: auto;
        background-color: white;
        border-radius: 3px;
        text-align: left;
        margin-top: 60px;
        margin-bottom: 300px;
        text-align: center;
    }


</style>
