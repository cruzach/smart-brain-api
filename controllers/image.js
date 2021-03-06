const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '600552a22d3a4c8e978c579c838ca2bd'
   });

const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to commnicate with API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users_smartbrain').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}