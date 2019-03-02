<template>
    <div class="blog">
        <div class="blog-header">
            <h2>{{ blog_title }}</h2>
        </div>
        <div class="blog-body">
            <p>{{ blog_content }}</p>
        </div>
    </div>
</template>


<script>
    import db from './firebaseInit'

    export default {
        name: 'view-blog',
        data() {
            return {
                blog_title: null,
                blog_content: null
            }
        },
        beforeRouterEnter (to, from, next) {
            console.log("BeforeRouterEnterrrrr")
            db.collection('blogs').where('blog_id', '==', to.params.blog_id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    next(vm => {
                        vm.blog_title = doc.data().blog_id
                        vm.blog_content = doc.data().blog_content
                    })
                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                db.collection('blogs').where('blog_id', '==', this.$route.params.blog_id).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        next(vm => {
                            this.blog_title = doc.data().blog_id
                            this.blog_content = doc.data().blog_content
                        })
                    })
                })
            }
        }
    }
</script>