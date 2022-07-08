const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

module.exports = (app, db) => {
    // learn Promise.all

    function getMovieById(id) {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7e719bfe3cd3786ebf0a05d3b138853d&append_to_response=videos`)
            .then(r => r.data)
            .catch(e => console.log(e))
    }


    // app.post('/api/playlist/:user_id', async (req, res) => {
    //     console.log('adding');
    //     const movieIds = await db.manyOrNone('select * from movies where user_id = $1', [req.params.user_id])

    //     // console.log({movieIds});
    //     const moviesPending = movieIds.map(movie => {
    //         return getMovieById(movie.movie_id)
    //     })

    //     const movies = await Promise.all(moviesPending)

    //     console.log(movies);

    //     res.json({
    //         user: { id: 1 },
    //         movies
    //     })


    // })


    app.get('/api/test', function (req, res) {
        res.json({
            name: 'ongi'
        })
    })

    app.post('/api/signup', async function (req, res) {
        try {
            const { firstname, lastname, username, password } = req.body;
            if (!username) {
                throw Error('enter username!')
            }
            var user = await db.oneOrNone(`select * from users where username = $1`, [username])
            if (user == null) {
                await db.none(`insert into users(firstname, lastname, username, password) values($1, $2, $3, $4)`, [firstname, lastname, username, password])

                console.log('inserted');

                res.json({
                    success: 'Done!'
                })
            } else {
                throw Error('User already exist');

            }

        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    })

    app.post('/api/login', async function (req, res) {
        try {
            const { username, password } = req.body
            if (!username) {
                throw Error('Username is not provided')
            }
            var logUser = await db.oneOrNone(`select * from users where username = $1`, [username])
            if (logUser == null) {
                console.log('no user');
                return res.json({
                    token: null
                })
            } else {
                jwt.sign({ logUser }, 'secret', function (err, token) {
                    return res.json({
                        token: token
                    })
                })
                console.log('in');
                res.json({
                    success: 'Done!'
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message
            })
        }
    })
    app.post('/api/playlist/:username', async function (req, res) {
        try {
            const { movieId } = req.body
            console.log(req.body, req.params)
            const { username } = req.params // userId

            
            // const
          let user= await db.oneOrNone(`select * from users where username = $1`, [username])
          if(user === null) {
              throw Error('User not exist')
          }
            
            await db.none(`insert into movies (movie_id, user_id) values($1,$2)`, [movieId, user.id])
            res.json({
                message: 'Movie added'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: error.message
            })
        }
    })
}