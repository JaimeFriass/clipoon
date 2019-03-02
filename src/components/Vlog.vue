<template>
    <div>
        <VlogItem
            v-for="card in cards"
            :key="card.id"
            :cardname="card.cardname"
            :img="card.img"
        />
    </div>
</template>

<script>
import VlogItem from './VlogItem.vue'
let nextCardId = 1
export default {
    components: {
        VlogItem
    },
    data() {
        return{
            cards: [
                {
                    id: nextCardId++,
                    cardname: 'Como no tratar a tu camara como si fuera una pelota',
                    img: 'src/assets/broken_camera.jpg'
                },
                {
                    id: nextCardId++,
                    cardname: 'Varios consejos de mierda para dirigir un corto',
                    img: 'https://wallpapercave.com/wp/2TrmmSi.jpg'
                },
                {
                    id: nextCardId++,
                    cardname: 'Tutorial 3',
                    img: 'https://wallpapersite.com/images/pages/pic_w/680.jpg'
                }
            ]
        }
    }
}
</script>