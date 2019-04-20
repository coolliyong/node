var express = require("express");
const Sequelize = require("sequelize");
const rq = require("request");

var router = express.Router();

function initDb() {
  const sequelize = new Sequelize("test_orm", "root", "root", {
    host: "localhost",
    port: "3306",
    dialect: "mysql"
  });
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      author_id: {
        type: Sequelize.INTEGER(15),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      }
    },
    {
      tableName: "article"
    }
  );

  const Author = sequelize.define(
    "author",
    {
      id: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      }
    },
    {
      tableName: "author"
    }
  );

  //每一篇 文章对应 作者  article 主键 id  author_id

  // 关系型数据库 需要定义orm 关系
  // 一对一

  // 作者关联到文章  通过作者查文章
  // Author.hasOne(Article, { foreignKey: 'author_id' })
  // 文章关联到文章 ，通过文章查作者
  // Article.belongsTo(Author, { foreignKey: 'author_id' })

  // 一对多 每一个作者有多个文章
  Author.hasMany(Article, { foreignKey: "author_id" });
  // 一对一 每一个文章对应一个作者
  Article.belongsTo(Author, { foreignKey: "author_id" });

  return { db: sequelize, Article, Author };
}

function closeDb() {}

router.get("/", (req, res) => {
  res.render("index");
});

// 单表

//  查询所有
router.get("/author", function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let { db, Article, Author } = initDb();
  Author.findAll()
    .then(result => {
      console.log(result);
      // res.send("查询成功");
      res.type("json");
      res.json(result);
    })
    .catch(err => {
      res.status(500).end(`查询出错::${err.message}`);
    });
});
//  查询一条
router.get("/author/select/:id", function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let { db, Article, Author } = initDb();
  const id = req.params.id;
  // Author.findById(id)
  //   .then(result => {
  //     console.log(result);
  //     // res.send("查询成功");
  //     res.type("json");
  //     res.json(result);
  //   })
  //   .catch(err => {
  //     res.status(500).end(`查询出错::${err.message}`);
  //   });
  //条件查询
  Author.findOne({
    where: {
      id
    }
  })
    .then(result => {
      console.log(result);
      // res.send("查询成功");
      res.type("json");
      res.json(result);
    })
    .catch(err => {
      res.status(500).end(`查询出错::${err.message}`);
    });
});

// 添加一条 无接收参数
router.get("/author/add", function(req, res, next) {
  let { db, Article, Author } = initDb();
  res.type("json");
  Author.create({ name: "name_add", age: 20 })
    .then(result => {
      console.log(result);
      res.json({ status: "ok" });
    })
    .catch(e => {
      res.json({ status: "error", message: e.message });
    }); //异常捕获
});

// 删除一条
router.get("/author/del/:id", (req, res) => {
  let { db, Article, Author } = initDb();
  res.type("json");
  const id = req.params.id;
  Author.destroy({
    where: { id } //where是指定查询条件
  })
    .then(result => {
      res.type("json");
      res.json({ status: "ok" });
    }) //删除成功的回调
    .catch(err => {
      res.json({ message: "删除错误" });
    });
});

// 更新 一条
router.get("/author/update/:id", (req, res) => {
  let { db, Article, Author } = initDb();
  res.type("json");
  const id = req.params.id;
  Author.update(
    {
      name: "update_fdsafsdafdasfdsa"
    },
    {
      where: { id } //where是指定查询条件
    }
  )
    .then(result => {
      res.type("json");
      res.json({ status: "ok" });
    }) //删除成功的回调
    .catch(err => {
      res.json({ message: "更新错误" });
    });
});

// 连表查询 查询文章 并查询作者 (一对一)
router.get("/article/1", (req, res) => {
  let { db, Article, Author } = initDb();
  res.type("json");
  Article.findAll({
    // where:{id:12},
    include: [Author]
  })
    .then(result => {
      res.type("json");
      res.json({ status: "ok", result });
    }) //删除成功的回调
    .catch(err => {
      res.json({ message: err.message });
    });
});

// 连表查询 通过作者 查询文章 (一对多)
router.get("/article/2", (req, res) => {
  let { db, Article, Author } = initDb();
  res.type("json");
  Author.find({
    where: { id: 12 },
    include: [Article]
  })
    .then(result => {
      res.type("json");
      res.json({ status: "ok", result });
    }) //删除成功的回调
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// 文章新建 批量写入
router.get("/article/add", (req, res) => {
  let { db, Article, Author } = initDb();
  res.type("json");
  rq.post(
    "https://api.apiopen.top/getWangYiNews",
    { form: { page: parseInt((Math.random(1)*100)), count: 20 } },
    (err, response, body) => {
      const resultList = JSON.parse(body).result;
      const itemsList = [];
      resultList.forEach(item => {
        itemsList.push({
          title: item.title,
          author_id: 12,
          content: "content:" + item.title
        });
      });
      Article.bulkCreate(itemsList)
        .then(result => {
          res.json({ message: "插入成功",result:itemsList });
        })
        .catch(err => {
          res.status(500).json({ message: "插入失败", errMsg: err.message });
        });
    }
  );
});


module.exports = router;
