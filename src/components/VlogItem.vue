<template>
    <b-card :title="cardname"
            v-bind:img-src="img"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 100%;"
            class="card-feed mb-2">
        <p class="card-text">
        {{cardname}} te enseña muchas cosas que no voy a explicar aqui porque esto solo es de relleno.
        </p>
        <b-button class="bt-normal bt-primary" href="#" variant="primary">Ver más</b-button>
    </b-card>
</template>

<script>
    export default {
        props:
            ['cardname', 'img'],

    }
</script>

<style lang="scss">
    .card-feed {
        margin: 10px;
    }
</style>
