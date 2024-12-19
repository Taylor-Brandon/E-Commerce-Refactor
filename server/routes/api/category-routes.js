const router = require('express').Router();
const {Category, Product} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{model: Product}],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{model: Product}],
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with that id!'});
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const categoryData = await Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with that id'});
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const categoryId = req.params.id; 
  
      
      await Product.destroy({
        where: { category_id: categoryId },
      });
  
      
      const categoryDeletion = await Category.destroy({
        where: { id: categoryId },
      });
  
      if (!categoryDeletion) {
        return res.status(404).json({ message: 'No category found with that id!' });
      }
  
      res.status(200).json({ message: 'Category and associated products deleted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the category.' });
    }
  });
  


module.exports = router;