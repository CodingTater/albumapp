var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  Albums().select('genre', 'artist', 'name', 'id').then(function(data) {
    console.log(data);
  res.render('albums/index', {
    albums: data
  })
  });
});

router.get('/new', function(req, res, next) {
  res.render('albums/new');
});

router.get('/:id', function(req, res, next) {
  Albums().where({id: req.params.id}).first().then(function (record) {
    res.render('albums/show', {theAlbum: record});
  });
});


router.get('/:id/edit', function(req, res, next) {
  Albums().where({id: req.params.id}).first().then(function(record){
  res.render('albums/edit', {theAlbum: record});
  });
});

router.post('/', function(req, res, next) {
  Albums().insert({ artist: req.body.artist_name, name: req.body.album_name, genre: req.body.genre, stars: Number.parseInt(req.body.stars), explicit: req.body.explicit_lyrics}).then(function() {
    res.redirect('/albums');
  });
});

router.put('/:id/update', function(req, res, next) {
  Albums().where({id: req.params.id}).update({ artist: req.body.artist_name, name: req.body.album_name, genre: req.body.genre, stars: Number.parseInt(req.body.stars), explicit: req.body.explicit_lyrics || false }).then(function() {
    res.redirect('/albums/' + req.params.id);
  });
});

router.delete('/:id/delete', function(req, res, next) {
  Albums().where({id: req.params.id}).del().then(function () {
    res.redirect('/albums');
  });
});

function Albums() {
  return knex('albums');
}

module.exports = router;
