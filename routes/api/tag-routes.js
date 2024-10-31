const router = require('express').Router();
const { Tag, Product } = require('../../models');


router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: {model: Product},
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err)
    }
  });

  router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{model: Product}],
        });
        if (!tagData) {
            res.status(404).json({ message: 'No tag found with that id!'});
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

  module.exports = router;