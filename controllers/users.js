const User = require('../models/User');

// @desc  Get all users
// @route GET /api/v1/users
// @access Public
exports.getUsers = async (req, res, next) => {
  if (req.query.long) {
    const long = req.query.long;
    const lat = req.query.lat;
    User.aggregate(
      [
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [long, lat],
            },
            distanceField: 'dist.calculated',
            maxDistance: 2,
            spherical: true,
            key: 'location',
          },
        },
      ],
      (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.send(data);
      }
    );
  } else if (req.query.page) {
    const customLabels = {
      limit: 'perPage',
      page: 'currentPage',
      pagingCounter: false,
    };
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        customLabels: customLabels,
      };
      const users = await User.paginate({}, options);
      return res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      const users = await User.find();

      return res.status(200).json({
        data: users,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

// @desc  Create an user
// @route POST /api/v1/users
// @access Public
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This user already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  update an user
// @route PATCH /api/v1/users/:id
// @access Public
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await User.findOneAndUpdate(id, req.body, { new: true });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete an user
// @route DELETE /api/v1/users/:id
// @access Public
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const docToBeDeleted = await User.findById(id);
    if (docToBeDeleted) {
      await User.deleteOne({ _id: id });
      res.status(200).send(docToBeDeleted);
    } else {
      res.send('User does not exist');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
