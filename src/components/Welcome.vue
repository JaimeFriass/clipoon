<template>
    <b-jumbotron>
        <template slot="header">
            {{ networkname }}
        </template>
        <template slot="lead">
            Bienvenido a {{ networkname }}, puedes comenzar registrandote o logueándote si ya tienes
            cuenta en la red social.
        </template>
        <hr class="my-4">
        <p>
            Únete a la mayor comunidad blablablabla de Espagna rapido corre ostia los he visto más rapidos
            joder ostia puta.
        </p>
        <b-btn variant="primary" href="#">Iniciar sesión</b-btn>
        <b-btn variant="success" href="#">Registrarse</b-btn>
    </b-jumbotron>

    <!-- jumbotron-2.vue -->
</template>

<script>
    export default {
        data() {
            return {
                networkname: 'SSAV',
            }
        }
    }
</script>