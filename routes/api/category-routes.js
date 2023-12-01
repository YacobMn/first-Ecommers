const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include: [Product] }) //2
  .then(function(data){
    res.json(data)
  })
  .catch(function(err){
    res.json(err)
  })
});

router.get('/:id',  async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!data) {
      res.status(404).json({massage: req.params.id })
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
        where: { id: req.params.id }
    });
    // Return an error if data not found
    if(data[0] === 0) {
        res.status(400).json({ message:  + req.params.id });
        return;
    }
    res.status(200).json({ message: 'Record ' + req.params.id + ' updated.' , updated_to: req.body  });
} catch (err) {
    res.status(500).json(err);
}
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const data =  await Category.destroy({
        where: { id: req.params.id }
    });
    if (!data) {
        res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
        return;
    }
    res.status(200).json({ message: 'Record ' + req.params.id + ' is deleted.' });
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
