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
      // 클라이언트에서 전달한 데이터와 데이터베이스 열을 비교하여 일치 여부를 확인합니다.
      action: data.action,
      protocol: data.protocol,
      src_ip: data.src_ip,
      src_port: data.src_port,
      d: data.d,
      dst_ip: data.dst_ip,
      dst_port: data.dst_port,
      option: data.option
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
