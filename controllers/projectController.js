// controllers/companyController.js
const db = require('../models/maria');
const { rules } = db;

// SELECT (조회하기)
const getAllRules = async (req, res) => {
  const ruleLists = await rules.findAll();/*{
      attributes: {
      exclude: ['email', 'password']
    }
  });
  */
  res.send(ruleLists);
};

const getRule = async (req, res) => {
  const { id } = req.params;

  const rule = await rules.findOne({
/*    attributes: {
      exclude: ['email', 'password']
    },
    */
    where: { id }
  });

  if (rule) res.send(rule);
  else res.status(404).send({ message: '존재하지 않는 ID 입니다' });
};

// INSERT (추가하기)
const postRule = async (req, res) => {
  const newRule = req.body;

  const rule = await rules.create(newRule);
  res.send(rule);
};

// UPDATE (갱신하기)
const putRule = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  const result = await rules.update(newInfo, { where: { id } });
  if (result[0]) {
    const rule = await rules.findOne({
/*      attributes: {
        exclude: ['email', 'password']
      },*/
      where: { id }
    });
    res.send(rule);
  } else res.status(404).send({ message: '존재하지 않는 ID 입니다' });
};


module.exports = {
  getAllRules,
  getRule,
  postRule,
  putRule,
};