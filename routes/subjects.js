const {Router} = require('express')

const router = Router()

router.get('/', (req,res) => res.send('subjects~~'))

router.get('/:subjectId', (req, res) => {
	if(req.body.state){
		res.send('can assess')
	}
	else{
		res.send('cannot assess')
	}
})

module.exports = router
