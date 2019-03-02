<template>
    <div class="messages-box">
        <h2>Mensajes privados</h2>
        <div class="messages-list">
            <b-row class="message-box">
                <b-col sm="6" md="4" lg="4" class="left-messages">
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuario</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuario</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuario</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuario</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuarios</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuario</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                    <b-row class="user-chat">
                        <b-col sm="4" md="2" lg="4">
                            <b-img center thumbnail rounded="circle" height="100" width="100" 
                                 fluid src="src/assets/user-icon.png" alt="Photo"/>
                        </b-col>
                        <b-col sm="8" md="10" lg="8">
                            <h5>Usuario</h5>
                            <p class="date">Ayer</p>
                            <p>Mensaje</p>
                        </b-col>
                    </b-row>
                </b-col>

                <b-col sm="6" md="8" lg="8" class="current-chat">
                    <p>Mensaje<br>Mensaje<br></p>
                    <b-input type="text"></b-input>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Messages',
    data() {
        return{
            item: ''
        }
    }
}
</script>

<style lang="scss">
    @import '../main.scss';
    .left-messages {

        background-color: rgba(255, 228, 197, 0.692);
        width: auto;
        border-radius: 7px;
        border-right: rgb(0, 0, 0) 1px;
    }

    .current-chat {
        height: 400px;
    }

    .current-chat input {
        margin-top: 480px;
    }

    .messages-box {
        color: black;
        padding: 0px;
        margin: 20px;
        width: auto;
        background-color: white;
        border-radius: 3px;
        text-align: center;
        margin-top: 60px;
        margin-bottom: 300px;
    }

    .message-box {
        border-top: solid rgb(223, 223, 223) 1px;
        padding: 15px;
        text-align: left;
    }
    .message-box:first-child {
        margin-top: 40px;
    }

    .message-box p.date {
        color: gray;
        text-align: right;
        margin-top: -30px;
    }

</style>
