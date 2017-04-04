var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/*GET Userlist  pg*/
router.get('/userlist', function(req, res) {
	var db = req.db; 
	var collection = db.get('usercollection');
	collection.find({},{}, function(e,docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	}); 
}); 

/*GET Add user page*/ 
router.get('/newuser', function(req,res) {
	res.render('newuser', {title: 'Add New User'});
});

/*POST - Add User Service */
router.post('/adduser', function(req,res) {
	// Set internal databse variable
	var db = req.db; 
    
    //Get form values (Rely on "name" attributes)
    var userName = req.body.username;
    var userEmail = req.body.useremail; 

    //Set up collection 
    var collection = db.get('usercollection'); 

    //Submit to DB
    collection.insert({ 
   		"username": userName, 
   		"email" : userEmail 
    }, function (err, doc) {
    	if (err) {
    		//Failure, so return error 
    		res.send("A problem occurred adding the information to database."); 
    	} else {
    		//Forward to success page 
    		res.redirect("userlist"); 
    	}
    });
});

module.exports = router;
