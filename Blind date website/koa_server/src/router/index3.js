const Router = require("koa-router");
const db = require("../db");
// const sequelize = require("sequelize"); 
// const Op = sequelize.Op;
// const urlencode = require("urlencode");

    // id sex name age interest height departmen cum)_attention

module.exports = () => {
    const router = new Router();
    const models = db.models;


    router.get("/studentsearch2", async (ctx) => {
        const results = await models.student.findAll({
            attributes: {
            ["cum_attention"],
        },
        });

        ctx.body = {
            results,

        };
    });

    router.get("/studentlist", async(ctx) => {
        const results = await models.student
        .findAll()
        .map(({id, name, department, grade}) => {
            return {id, name, department, grade};
            // 어떤 값만 return시킬까를 정할 수 있어
        });
        ctx.body = {
            results,
        };
    });

    router.get("/sololist", async (ctx) => {
        // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
        // 여기서 .boards로 boards로 접근 
        const results = await models.solo
        .findAll()
        // .findAll()
        // findAll: select 구문의 select와 동일.
        // map은 갖고와서 return 시켜라
        .map(({id, sex, name, age, interest, height, department, cum_attention}) => {
            return {id, sex, name, age, interest, height, department, cum_attention};
            // 어떤 값만 return시킬까를 정할 수 있어
        });
        ctx.body = {
            results,
        };
    });
    
    router.get("/list", async (ctx) => {
        // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
        // 여기서 .boards로 boards로 접근 
        const results = await models.student.findAll()
        // .findAll()
        // findAll: select 구문의 select와 동일.
        // map은 갖고와서 return 시켜라
        .map(({id, name, content, created_at}) => {
            return {id, name, content, created_at};
            // 어떤 값만 return시킬까를 정할 수 있어
        });

        ctx.body = {
            results,
        };
    });

    router.get("/" , async (ctx) => {
        ctx.body = "7777 서버 페이지 입니다.";
    });

    router.get("/post", (ctx) => {
        const { id } = ctx.request.query;
        if (id) {
            ctx.body = "포스트 #" + id;
        } else {
            ctx.bod = "포스트 아이디가 없습니다.";
        }
    });

    // id sex name age interest height departmen cum)_attention


    router.post("/add", async (ctx) => {
        const {name, content} = ctx.request.body;
        // json파일에서 name, content를 받아와서 create해주는거
        console.log(name);
        console.log(content);

        await models.boards
            .create({
                name,
                content,
            })
            .catch((e) => {
                console.log(e);
            });

        ctx.status = 204;
    });
    
    router.post("/addList", async (ctx) => {
        await models.boards
            .bulkCreate([
                {
                    name: "blue",
                    content: "hello",
                },
                {
                    name: "red",
                    content: "world",
                },
            ])
            .catch((e) => {
                console.log(e);
            });
        ctx.status = 204;
    });

    router.put("/update", async (ctx) => {
        await models.boards
            .update(
                {
                    content: "hi, world",
                },
                {
                    where: {
                        name: "blue",
                    },
                }
            )
            .catch((e) => {
                console.log(e);
            });
        ctx.status = 204;
    });

    
    return router;
}

