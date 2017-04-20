const {Router} = require('express')
const axios = require('axios')

const router = Router()

router.get('/', (req,res) => res.send('subjects~~'))

router.get('/:subjectId', (req, res) => {
	if(req.body.state){
		res.send('can assess')
	}
	else{
		axios.get('http://localhost:4000/cipher')
		.then((response) => {
			res.send(response.data)
		})
	}
})

module.exports = router
