const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', (req, res) => {
  console.log("Find all");
  Category.findAll({
    attributes: [
      'id',
      'category_name',
    ],
    include: [
      {
          model: Product,
          attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
        }
    ]
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
      where: {
        id: req.params.id
    },
    attributes: [
      'id',
      'category_name',
    ],
    include: [
      {
          model: Product,
          attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
        }
    ]
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
       category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
