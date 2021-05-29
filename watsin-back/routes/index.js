var express = require('express');
var router = express.Router();
const Ingredient = require('../schemas/ingredient');
const User = require('../schemas/user');
const IngredientList = require('../schemas/ingredientList');
const Posts = require('../schemas/postList');

router.use(express.static('images'));
router.use('/images', express.static('images/'));

/* GET home page. */
router.get('/test', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* TEST */
// router.post('/savefilter', function (req, res, next) {
//   res.json({ status: "success", dummy: req.body.filter });
// });

router.get('/translate/:text', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  var request = require('request');
  var options = {
    url: api_url,
    form: { 'source': 'ko', 'target': 'en', 'text': req.params.text },
    headers: { 'X-Naver-Client-Id': "omCYkh439Kfoa56Tpjjm", 'X-Naver-Client-Secret': "TIXxlALgvd" }
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});


// router.post('/inputIngredient', function (req, res) {
//   console.log(req.body.rcp);
//   console.log(req.body.ingredients);
//   Ingredient.create({
//     RCP_NM: req.body.rcp,
//     ingredients: req.body.ingredients,

//   }, function (err) {
//     if (err) {
//       console.log(err)
//       res.status(500).json({ status: "error" });
//     }
//     else {
//       res.json({ status: "success" });
//     }
//   });

// });


router.post('/filterBit', function (req, res) {

  console.log(req.body.filterBit);
  console.log(req.body.uid);

  //uid로 사용자 find 후 filterbit 초기화 
  // User.create({
  //   filterBit: req.body.filterBit,
  //   uid: req.body.uid,
  // }, function (err) {
  //   if (err) {
  //     console.log(err)
  //     res.status(500).json({ status: "error" });
  //   }
  //   else {
  //     res.json({ status: "success" });
  //   }
  // });

});


router.get('/search/:text', (req, res) => {
  console.log(req.params.text)
  var regex = new RegExp(req.params.text)
  Ingredient.find().where('RCP_NM').regex(regex)
    .then((searchList) => {
      res.json({ status: "success", results: searchList });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: "error" })
    })

})


router.get('/ingredientList/:uid', (req, res) => {
  console.log(req.params.uid)
  IngredientList.find()
    .then((IngredientList) => {
      res.json({ status: "success", results: IngredientList });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: "error" })
    })

})

router.get('/postList', (req, res) => {
  Posts.find()
    .then((Posts) => {
      res.json({ status: "success", results: Posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: "error" })
    })

})

router.get('/postDetail/:pid', (req, res) => {
  Posts.find({ _id: req.params.pid })
    .then((Post) => {
      res.json({ status: "success", results: Post[0] });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: "error" })
    })

})


router.post('/postInput', function (req, res) {
  var post = req.body.inputs
  console.log(req.body.inputs);
  console.log(req.body.uid);
  Posts.create({
    title: post.title,
    content: post.content,
    // date:
    // writer:
    // thumbnail:

  }, function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({ status: "error" });
    }
    else {
      res.json({ status: "success" });
    }
  });

});


router.post('/userInput', function (req, res) {

  //uid로 처음 사용하는 user인지 아닌지 판별해서 create 
  User.create({
    uid: req.body.uid,
    email: req.body.email,
    userImg: req.body.userImg
  }, function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({ status: "error" });
    }
    else {
      res.json({ status: "success" });
    }
  });

});


module.exports = router;
