<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div>
          <h1>Formulaire de livre</h1>
          <nav>
            <RouterLink to="/">Home</RouterLink>
          </nav>
        </div>
    </header>
    
    <main>
        <button v-on:click="afficherLivres = !afficherLivres" class="listButtons"> {{ montrerListeLivres }}</button>
        <div v-if="afficherLivres && listeLivres.length > 0">
            <p>Nombre de livres : {{ listeLivres.length }}, <br>Id du livre actuel: {{ livreId + 1}}</p>
            <button @click="prochainLivre()">Passer au prochain livre</button>
            <button v-if="livreId > 0" @click="livreId--"> Revenir au précédent livre</button> 

            <p><br>Informations du livre : <button @click="supprimerLivre()">Supprimer ce livre</button> </p> <br>

            <p>Titre : {{ listeLivres[livreId].title }} <button @click="modifierTitre()">Modifier</button> </p>
            <p>Auteur : {{ listeLivres[livreId].author }} <button @click="modifierAutheur()">Modifier</button> </p>

            <p>Année de publication : {{ listeLivres[livreId].year }} <button @click="modifierAnnee()">Modifier</button> </p> 

            <p v-if="modifierTitreEnclanche"> <input type="text" v-model="livreTitre" placeholder="Nouveau Titre"> </p>
            <p v-if="modifierAutheurEnclanche"> <input type="text" v-model="livreAutheur" placeholder="Nouvel Autheur"> </p>
            <p v-if="modifierAnneeEnclanche"> <input type="number" v-model="livreAnnee" placeholder="Nouvelle année"> </p> 
            <button v-if="modifierTitreEnclanche || modifierAutheurEnclanche || modifierAnneeEnclanche" @click="modifierLivre()">Confirmer les modifications</button>
            <br> <br>

        </div>
        <div v-else>
            <p v-if="afficherLivres">Aucun livre à afficher</p>
        </div>

        <button @click="ajouterLivre = !ajouterLivre">Ajouter un livre</button>
        <div v-if="ajouterLivre">
            <input v-model="livreTitre" type="text" placeholder="Titre du livre" />
            <input v-model="livreAutheur" type="text" placeholder="Auteur du livre" />
            <input v-model="livreAnnee" type="number" placeholder="Année de publication" />
            <button @click="ajouterUnLivre()">Ajouter le livre</button>
        </div>

    </main>

    <footer>
        <p>&copy; 2024</p>
    </footer>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

export default {
    el: '#app',
    data() {
        return {
            info: null,
            afficherLivres: false,
            montrerListeLivres: 'Voir la liste des livres',
            ajouterLivre: false,
            livreId: 0,
            livreTitre: '',
            livreAutheur: '',
            livreAnnee: '',
            listeLivres: [],
            modifierTitreEnclanche: false,
            modifierAutheurEnclanche: false,
            modifierAnneeEnclanche: false,
        }
    },
    methods: {
        ajouterUnLivre() {
            if (!this.livreTitre || !this.livreAutheur || !this.livreAnnee) {
                return
            }
            const param = {
                    id: this.listeLivres.length + 1,
                    title: this.livreTitre,
                    author: this.livreAutheur,
                    year: this.livreAnnee
                }
                console.log(param);
                
            axios
               .post('http://localhost:8080/books/', param)
               .then(response => {
                    this.listeLivres = response.data
                    this.livreTitre = ''
                    this.livreAutheur = ''
                    this.livreAnnee = ''
                })
               .catch(error => console.log(error))
        },
        prochainLivre() {
            if (this.livreId < this.listeLivres.length - 1) {
                this.livreId++
            }
        },
        supprimerLivre() {
            axios
                .delete(`http://localhost:8080/books/${this.listeLivres[this.livreId].id}`)
                .then(() => {
                     this.listeLivres.splice(this.livreId, 1)
                     if (this.livreId > 0) {
                         this.livreId--
                     }
                 })
                .catch(error => console.log(error))
        },
        modifierTitre() {
            this.modifierTitreEnclanche = !this.modifierTitreEnclanche
        },
        modifierAutheur() {
            this.modifierAutheurEnclanche = !this.modifierAutheurEnclanche
        },
        modifierAnnee() {
            this.modifierAnneeEnclanche = !this.modifierAnneeEnclanche
        },
        modifierLivre() {
            axios
               .put(`http://localhost:8080/books/${this.listeLivres[this.livreId].id}`, {
                    id: this.listeLivres[this.livreId].id,
                    title: this.modifierTitreEnclanche? this.livreTitre : this.listeLivres[this.livreId].title,
                    author: this.modifierAutheurEnclanche? this.livreAutheur : this.listeLivres[this.livreId].author,
                    year: this.modifierAnneeEnclanche? this.livreAnnee : this.listeLivres[this.livreId].year
                })
               .then(() => {
                    this.listeLivres = response.data
                    this.modifierTitreEnclanche = false
                    this.modifierAutheurEnclanche = false
                    this.modifierAnneeEnclanche = false
                })
               .catch(error => console.log(error))
        }
    
    },
    mounted() {
        axios
            .get('http://localhost:8080/books/')
            .then(response => (this.listeLivres = response.data))
            .catch(error => console.log(error))
    },
}
</script>

<style scoped>

.listButtons {
    display:flex;

}

</style>