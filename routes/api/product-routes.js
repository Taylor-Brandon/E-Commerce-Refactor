const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const productData = await Product.findAll({
        include: [{model: Category}, {model: Tag}],
      });
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err)
    }
  });
  router.get('/:id', async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id, {
            include: [{model: Category}, {model: Tag}],
        });
        if (!productData) {
            res.status(404).json({ message: 'No product found with that id!'});
            return;
        }
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
      const productData = await Product.update(req.body, {
          where: {
              id: req.params.id,
          },
      });
      if (!productData) {
          res.status(404).json({ message: 'No product found with that id'});
          return;
      }
      res.status(200).json(productData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const productData = await Product.destroy({
          where: {
              id: req.params.id,
          },
      });
      if (!productData) {
          res.status(404).json({ message: 'No product found with that id!'});
          return;
      }
      req.status(200).json(productData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
