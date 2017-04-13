var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/scientists', function(req, res, next) {
	fs.readFile('public/json/scientists.json', 'utf8', function (err, data) {
		if (err) throw err;
		var scientists = JSON.parse(data);
		res.render('scientists', scientists);
	});
});

router.get('/scientists/:name', function(req, res, next) {
	if(req.params.name !== "suggest"){
		fs.readFile('public/json/scientists.json', 'utf8', function (err, data) {
			if (err) throw err;
			var scientists = JSON.parse(data);
			var scientist;
			for (var i = 0 in scientists){
				for(var j = 0 in scientists[i]){
					if(scientists[i][j].name === req.params.name){
						
						var scientist = scientists[i][j];
						console.log(scientist);
						res.render('scientist', {person: scientist});
					}
				}				
			}		
		});
	}else{
		res.render('suggestion');
	}
});

router.post('/scientists/suggest', function(req, res, next) {
	var name = req.body.name;
	var bio = req.body.bio;
	var dates = req.body.dates;
	var imagePath = req.body.imagePath;
	
	fs.readFile('public/json/scientists.json', 'utf8', function (err, data){
		if (err){
			console.log(err);
		}else {
			obj = JSON.parse(data); //now it an object
			obj.scientists.push({name: name, bio: bio, dates: dates, imagePath: imagePath}); //add some data
			json = JSON.stringify(obj); //convert it back to json
			fs.writeFile('public/json/scientists.json', json, 'utf8', function (err, data){
					// write it back 
			}); 
		}
	});

	res.render('confirmation', {record: { name: name, bio: bio }});
});

module.exports = router;
