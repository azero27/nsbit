// controllers/projectController.js
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
  const { data } = req.body; // 클라이언트에서 전달된 데이터를 요청에서 추출합니다.

  const rule = await rules.findOne({
    where: {
      // 여기서 'column1', 'column2', 'column3', 'column4', 'column5', 'column6' 등은 실제 데이터베이스의 열 이름으로 수정해야 합니다.
      column1: data.column1, // 클라이언트에서 전달한 데이터와 데이터베이스 열 값 비교
      column2: data.column2,
      column3: data.column3,
      column4: data.column4,
      column5: data.column5,
      column6: data.column6
    }
  });

  if (rule) {
    res.send(rule); // 일치하는 규칙을 클라이언트에게 반환
  } else {
    res.status(404).send({ message: '일치하는 데이터를 찾을 수 없습니다' });
  }
};


/*const getRule = async (req, res) => {
  const { id } = req.params;

  const rule = await rules.findOne({
      attributes: {
      exclude: ['email', 'password']
    },
    
    where: { id }
  });

  if (rule) res.send(rule);
  else res.status(404).send({ message: '존재하지 않는 ID 입니다' });
};
*/

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