import axios from 'axios';
const herokuUrl = 'https://apimoviies.herokuapp.com'

console.log('App running app.js line 4')


export default function App() {
    return {
        user: {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            movie: ''
        },
        error: '',
        logUser: {
            username: null,
            password: null
        },
        movieList: {
            movie: '',
            poster_image: ''
        },
        logged: [],
        episodes: [],

        registration() {
            console.log(this.user);
            axios
                .post(`${herokuUrl}/api/signup`, this.user)

                .then((result) => {
                    console.log(result.data)
                }).catch(e => {

                    const { error } = e.response.data
                    this.error = error;
                    console.log(e);
                    setTimeout(() => this.error = '', 2500)
                })
            console.log(this.user);
        },

        login() {
            axios
                .post(`${herokuUrl}/api/login`, this.logUser)
                .then((result) => {
                    var accessToken = result.data
                    console.log(result.data);
                    console.log(accessToken);
                    if (accessToken == null) {
                        return false
                    } else {
                        return accessToken
                    }
                }).catch(e => {

                    const { error } = e.response.data
                    this.error = error;
                    console.log(e);
                    setTimeout(() => this.error = '', 2500)
                })
            console.log(this.logUser);
        },
        playList() {
            axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=795d5c5e3b5d1d210177be9dcd0fdc89&query=madea', {

                })

                .then(results => {
                    console.log(results);
                    this.movie = results.data.results
                    console.log(this.movie);
                    console.log(results.data);

                })
        },
        searchMovies() {
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=795d5c5e3b5d1d210177be9dcd0fdc89&query=${this.movieList.movie}`)
                .then((result) => {
                    console.log(result.data.results);
                    this.episodes = result.data.results
                })
        },
        addMovie(userMovie) {
            console.log(this.movieList)
            const url = `${herokuUrl}/api/playlist`
            axios
                .post(`${url}/${userMovie}`)
                .then((result) => {
                    console.log({ inside: result.data })

                }).catch(e => {

                    const { error } = e.response.data
                    this.error = error;
                    console.log(e);
                    setTimeout(() => this.error = '', 2500)
                })
        }
    }

}