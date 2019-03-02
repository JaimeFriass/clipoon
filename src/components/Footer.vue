<template>
    <div class="footer">
        <b-row>
            <b-col class="col-footer" sm="12" md="6" lg="6">
                Condiciones de uso <br />
                Política de privacidad <br />
                Política de cookies <br />
            </b-col>

            <b-col class="col-footer" sm="12" md="6" lg="6">
                Navegación <br />
                Inicio <br />
                Perfil <br />
                Idioma <br />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data: function() {
            return {
            }
        }
    }
</script>

<style lang="scss">

    .footer {
        background-color: rgba(184, 83, 0, 0.829);
        box-shadow: 0 50vh 0 50vh rgba(184, 83, 0, 1);
        padding: 25px;
        color: white;
        font-size: 10pt;
        width: auto;
    }

    .col-footer {
        padding-left: 10px;
        padding-right: 20px;
        margin-bottom: 20px;
    }
</style>