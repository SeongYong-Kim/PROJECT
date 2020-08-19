const Router = require("koa-router");
const db = require("../db");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const urlencode = require("urlencode");
//npm install urlencode

module.exports = () => {
  const router = new Router();
  const models = db.models;

  router.post("/soloadd", async (ctx) => {
    const {id, sex, name, age, interest, height, department, cum_attention, address} = ctx.request.body;

    try {
      const result = await models.solo.create({
        id,
        sex,
        name,
        age,
        interest,
        height,
        department,
        cum_attention,
        address
      });
      ctx.body = { result };
    } catch (e) {
      ctx.throw(e, 500);
    }
  });

  router.get("/sololist", async (ctx) => {
    // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
    // 여기서 .boards로 boards로 접근 
    const results = await models.solo
    .findAll()
    // .findAll()
    // findAll: select 구문의 select와 동일.
    // map은 갖고와서 return 시켜라
    .map(({id, sex, name, age, interest, height, department, cum_attention, address}) => {
        return {id, sex, name, age, interest, height, department, cum_attention, address};
        // 어떤 값만 return시킬까를 정할 수 있어
    });
    ctx.body = {
        results,
    };
  });



  router.get("/ticketlist", async (ctx) => {
    // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
    // 여기서 .boards로 boards로 접근 
    const results = await models.ticket
    .findAll({
      where: {
        sold_out: {[sequelize.Op.is]: null},
      }
    }
    )
    // .findAll()
    // findAll: select 구문의 select와 동일.
    // map은 갖고와서 return 시켜라
    .map(({num, price, time, place}) => {
        return {num, price, time, place};
        // 어떤 값만 return시킬까를 정할 수 있어
    });
    ctx.body = {
        results,
    };
  });

  router.get("/ticketsold", async (ctx) => {
    // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
    // 여기서 .boards로 boards로 접근 
    const results = await models.ticket
    .findAll({
      where: {
        sold_out: "sold",
      }
    }
    )
    // .findAll()
    // findAll: select 구문의 select와 동일.
    // map은 갖고와서 return 시켜라
    .map(({num, price, time, place, partner_id}) => {
        return {num, price, time, place, partner_id};
        // 어떤 값만 return시킬까를 정할 수 있어
    });
    ctx.body = {
        results,
    };
  });

  router.get("/searchview", async (ctx) => {
    // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
    // 여기서 .boards로 boards로 접근 
    const results = await models.solo
    .findAll({
      where: {
        view: "view",
      }
    }
    )
    // .findAll()
    // findAll: select 구문의 select와 동일.
    // map은 갖고와서 return 시켜라
    .map(({id, sex, name, age, interest, height, department, cum_attention, address}) => {
        return {id, sex, name, age, interest, height, department, cum_attention, address};
        // 어떤 값만 return시킬까를 정할 수 있어
    });
    ctx.body = {
        results,
    };
  });

  router.get("/ratio", async (ctx) => {
    const result1 = await db.sequelize.query(
      "SELECT * FROM solo WHERE sex = :userid",
      {
        replacements: { userid: "남" },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const result2 = await db.sequelize.query(
      "SELECT * FROM solo WHERE sex = :userid",
      {
        replacements: { userid: "여" },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    results = "남:여 비율은 "  + result1.length + ":" + result2.length + "입니다";
    ctx.body = {
      results
    };
  });




  router.post("/ticketaddList", async (ctx) => {
    await models.ticket
        .bulkCreate([{"num":166,"price":100000,"time":6.28,"place":"murmur de gusto","sold_out":null,"partner_id":null},
        {"num":167,"price":100000,"time":6.29,"place":"murmur de gusto","sold_out":null,"partner_id":null},
        {"num":168,"price":100000,"time":6.3,"place":"murmur de gusto","sold_out":null,"partner_id":null},
        {"num":169,"price":100000,"time":7.01,"place":"murmur de gusto","sold_out":null,"partner_id":null},
        {"num":170,"price":100000,"time":7.02,"place":"murmur de gusto","sold_out":null,"partner_id":null},
        {"num":171,"price":100000,"time":7.03,"place":"murmur de gusto","sold_out":null,"partner_id":null},
        {"num":172,"price":50000,"time":7.04,"place":"young-cheol burger","sold_out":null,"partner_id":null},
        {"num":173,"price":50000,"time":7.05,"place":"young-cheol burger","sold_out":null,"partner_id":null},
        {"num":174,"price":50000,"time":7.06,"place":"young-cheol burger","sold_out":null,"partner_id":null},
        {"num":175,"price":50000,"time":7.07,"place":"young-cheol burger","sold_out":null,"partner_id":null},
        {"num":176,"price":50000,"time":7.08,"place":"young-cheol burger","sold_out":null,"partner_id":null},
        {"num":177,"price":10000,"time":7.09,"place":"gimbap heaven","sold_out":null,"partner_id":null},
        {"num":178,"price":10000,"time":7.1,"place":"gimbap heaven","sold_out":null,"partner_id":null},
        {"num":179,"price":10000,"time":7.11,"place":"gimbap heaven","sold_out":null,"partner_id":null},
        {"num":180,"price":10000,"time":7.12,"place":"gimbap heaven","sold_out":null,"partner_id":null}])
        .catch((e) => {
            console.log(e);
        });
    ctx.status = 204;
});

router.post("/memberaddList", async (ctx) => {
  await models.solo
      .bulkCreate([{"id":2016171015,"sex":"남","name":"김성용","age":24,"interest":"축구","height":180,"department":"산업경영공학부","cum_attention":9,"address":"안암동","view":null},
      {"id":2016171016,"sex":"남","name":"이승현","age":22,"interest":"농구","height":170,"department":"산업경영공학부","cum_attention":1,"address":"성북동","view":null},
      {"id":2016171017,"sex":"남","name":"박준영","age":28,"interest":"배구","height":176,"department":"기계공학부","cum_attention":1,"address":"신촌","view":null},
      {"id":2016171018,"sex":"남","name":"최준혁","age":27,"interest":"수영","height":178,"department":"전기전자공학부","cum_attention":2,"address":"잠실","view":null},
      {"id":2016171019,"sex":"남","name":"이민수","age":25,"interest":"게임","height":189,"department":"간호학과","cum_attention":3,"address":"강남","view":null},
      {"id":2016171020,"sex":"남","name":"김민석","age":25,"interest":"달리기","height":178,"department":"경영학과","cum_attention":5,"address":"강남","view":null},
      {"id":2016171021,"sex":"남","name":"이준호","age":20,"interest":"먹방","height":173,"department":"미디어학부","cum_attention":6,"address":"봉화산","view":null},
      {"id":2016171022,"sex":"남","name":"김현우","age":20,"interest":"헬스","height":176,"department":"물리학과","cum_attention":2,"address":"안암동","view":null},
      {"id":2016171023,"sex":"남","name":"왕성민","age":23,"interest":"연기","height":170,"department":"기계공학부","cum_attention":1,"address":"강남","view":null},
      {"id":2016171024,"sex":"여","name":"홍순자","age":32,"interest":"낚시","height":169,"department":"전기전자공학부","cum_attention":3,"address":"잠실","view":null},
      {"id":2016171025,"sex":"여","name":"명영자","age":25,"interest":"축구","height":172,"department":"영어영문학과","cum_attention":1,"address":"잠실","view":null},
      {"id":2016171026,"sex":"여","name":"김정순","age":21,"interest":"게임","height":154,"department":"노어노문학과","cum_attention":7,"address":"신촌","view":null},
      {"id":2016171027,"sex":"여","name":"이정숙","age":21,"interest":"카페가기","height":163,"department":"경제학과","cum_attention":7,"address":"홍대","view":null},
      {"id":2016171028,"sex":"여","name":"최영숙","age":29,"interest":"산책","height":169,"department":"심리학과","cum_attention":5,"address":"성수","view":null},
      {"id":2016171029,"sex":"여","name":"박영순","age":24,"interest":"산책","height":163,"department":"경영학과","cum_attention":4,"address":"안암동","view":null},
      {"id":2016171030,"sex":"여","name":"방정자","age":24,"interest":"먹방","height":160,"department":"경영학과","cum_attention":4,"address":"잠실","view":null},
      {"id":2016171031,"sex":"여","name":"황영희","age":23,"interest":"헬스","height":159,"department":"기계공학부","cum_attention":5,"address":"인천","view":null},
      {"id":2016171032,"sex":"여","name":"김정희","age":27,"interest":"수영","height":150,"department":"물리학과","cum_attention":7,"address":"인천","view":null},
      {"id":2016171033,"sex":"여","name":"김옥순","age":27,"interest":"헬스","height":164,"department":"컴퓨터학과","cum_attention":8,"address":"성북동","view":null}])
      .catch((e) => {
          console.log(e);
      });
  ctx.status = 204;
});



  router.post("/ticketbuy", async (ctx) => {
    const {num} = ctx.request.body;
    await models.ticket
      .update(
        {
          sold_out: "sold",
        },
        {
          where: {
            num: num,
          },
        }
      )
      ctx.body = {num}
  });

  router.post("/removeticket", async (ctx) => {
    const {num, price, reason} = ctx.request.body;
    await models.ticket
      .update(
        {
          sold_out: null,
        },
        {
          where: {
            num: num,
          },
        }
      )
  });



  router.post("/getrefund", async (ctx) => {
    const {num, price, reason} = ctx.request.body;

    try {
      const result = await models.refund.create({
        num,
        price,
        reason,
      });
      ctx.body = { result };
    } catch (e) {
      ctx.throw(e, 500);
    }
  });

  // router.get("/refundlist", async (ctx) => {
  //   const {num} = ctx.request.;
  //   await models.ticket
  //     .update(
  //       {
  //         sold_out: "sold",
  //       },
  //       {
  //         where: {
  //           num: num,
  //           partner_id: {[Op.not]: null},
  //         },
  //       }
  //     )
  //     ctx.body = {num}
  // });
  router.get("/refundedlist", async (ctx) => {
    // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
    // 여기서 .boards로 boards로 접근 
    const results = await models.refund
    .findAll(
    )
    // .findAll()
    // findAll: select 구문의 select와 동일.
    // map은 갖고와서 return 시켜라
    .map(({num, price, reason}) => {
        return {num, price, reason};
        // 어떤 값만 return시킬까를 정할 수 있어
    });
    ctx.body = {
        results,
    };
  });

  router.get("/refundlist", async (ctx) => {
    // models: db와 연결되는 부분. SQL상에선 world까지 접근한것.
    // 여기서 .boards로 boards로 접근 
    const results = await models.ticket
    .findAll({
      where: {
        partner_id : {[Op.not] : null},
      }
    }
    )
    // .findAll()
    // findAll: select 구문의 select와 동일.
    // map은 갖고와서 return 시켜라
    .map(({num, price, time, place, partner_id}) => {
        return {num, price, time, place, partner_id};
        // 어떤 값만 return시킬까를 정할 수 있어
    });
    ctx.body = {
        results,
    };
  });

  

  router.post("/matchpt", async (ctx) => {
    const {id, num} = ctx.request.body;
    await models.ticket
      .update(
        {
          partner_id: id,
        },
        {
          where: {
            num: num,
          },
        }
      )
      ctx.body = {num}
  });

  router.post("/solosearch", async (ctx) => {
    const {sex, age_gte, age_lte, interest, height_gte, height_lte, department, cum_attention_gte, address} = ctx.request.body;
    await models.solo
      .update(
        {
          view: "view",
        },
        {
          where: {
              sex: sex,
              age: {[Op.between]: [age_gte, age_lte]},
              interest: interest,
              height: {[Op.between]: [height_gte, height_lte]},
              department: department,
              cum_attention: {[Op.gte]: cum_attention_gte},
              address: address,
          },
        }
      )
      ctx.body = {sex}
  });

  // router.post("/solosearch2", async (ctx) => {
  //   const {sex, age_gte, age_lte, interest, height_gte, height_lte, department, cum_attention_gte, address} = ctx.request.body;
  //   await models.solo
  //     .update(
  //       {
  //         view: "view",
  //       },
  //       {
  //         where: {
  //             deparment: department,
  //         },
  //       }
  //     )
  //     ctx.body = {sex}
  // });
  // router.post("/solosearch3", async (ctx) => {
  //   const {sex, age_gte, age_lte, interest, height_gte, height_lte, department, cum_attention_gte, address} = ctx.request.body;
  //   await models.solo
  //     .update(
  //       {
  //         view: "view",
  //       },
  //       {
  //         where: {
  //             interest: interest,
  //             height: {[Op.between]: [height_gte, height_lte]},
          
  //         },
  //       }
  //     )
  //     ctx.body = {sex}
  // });

  // router.post("/solosearch4", async (ctx) => {
  //   const {sex, age_gte, age_lte, interest, height_gte, height_lte, department, cum_attention_gte, address} = ctx.request.body;
  //   await models.solo
  //     .update(
  //       {
  //         view: "view",
  //       },
  //       {
  //         where: {
  //             cum_attention_gte: {[Op.gte]: cum_attention_gte},

  //         },
  //       }
  //     )
  //     ctx.body = {sex}
  // });



  router.get("/clear", async (ctx) => {
    await models.solo
      .update(
        {
          view: null,
        },
        {
          where: {
            view: "view",
          },
        }
      )
  });


  // router.post("/solosearch", async (ctx) => {

  //   const {sex, age_gte, age_lte, interest, height_gte, height_lte, department, cum_attention_gte, address} = ctx.request.body;
  //   if (sex2 == "") { sex2 = null;}
  //   if (height_gte == "") { height_gte = 0;}
  //   if (height_lte == "") { height_lte = 100000;}
  //   if (age_gte == "") { age_gte = 0;}
  //   if (age_lte == "") { age_lte = 100000;}
  //   if (interest2 == "") { interest2 = null;}
  //   if (department2 == "") { department2 = null;}
  //   if (cum_attention_gte == "") { cum_attention_gte = 0;}
  //   if (address2 == "") { address2 = null;}

  //   await models.solo
  //   .update(
  //     {
  //       view: "view",
  //     },
  //     {
  //       where: {
  //                 sex: sex,
  //               sex: {[Op.or]: {[sequelize.Op.not]: null, [sequelize.Op.eq]: sex2}},
  //               age: {[Op.in]: [age_gte, age_lte]},
  //               interest: {[Op.or]: {[Op.not]: null, [Op.like]: interest2}},
  //               height: {[Op.in]: [height_gte, height_lte]},
  //               department: {[Op.or]: {[Op.not]: null, [Op.like]: department2}},
  //               cum_attention_gte: {[Op.gte]: cum_attention_gte},
  //               address: {[Op.or]: {[Op.not]: null, [Op.like]: address2}},
  //             },
  //     }
  //   )
  //   ctx.body = {num}

    //   const results = await models.solo.findAll(
    //     {
    //     where: {
    //       sex: {[Op.or]: {[sequelize.Op.not]: null, [sequelize.Op.eq]: sex2}},
    //       age: {[Op.in]: [age_gte, age_lte]},
    //       interest: {[Op.or]: {[Op.not]: null, [Op.like]: interest2}},
    //       height: {[Op.in]: [height_gte, height_lte]},
    //       department: {[Op.or]: {[Op.not]: null, [Op.like]: department2}},
    //       cum_attention_gte: {[Op.gte]: cum_attention_gte},
    //       address: {[Op.or]: {[Op.not]: null, [Op.like]: address2}},
    //     }
    //   }
    //   ).map(({id, sex, name, age, interest, height, department, cum_attention, address}) => {
    //     return {id, sex, name, age, interest, height, department, cum_attention, address};
    //     // 어떤 값만 return시킬까를 정할 수 있어
    // });
    //   ctx.body = { results, };



      // await models.solo_search
      // .bulkCreate({result})

  // });
  
 





  // models.student.association = function (models) {
  //   models.student.belongTo(models.sing_up, {
  //     target: "id",
  //     foreign: "student_id",
  //   });
  // };
  // models.subject.association = function (models) {
  //   models.subject.belongTo(models.sing_up, {
  //     target: "id",
  //     foreign: "subject_id",
  //   });
  // };

  router.post("/postTest", async (ctx) => {
    ctx.body = { title: "postTest 페이지 입니다." };
  });

  router.get("/", async (ctx) => {
    ctx.body = "7777 서버 페이지 입니다.";
  });

  router.get("/post", (ctx) => {
    const { id } = ctx.request.query;
    if (id) {
      ctx.body = "포스트 #" + id;
    } else {
      ctx.body = "포스트 아이디가 없습니다.";
    }
  });

  router.get("/studentsearch", async (ctx) => {
    const { name } = ctx.request.query;
    const name2 = urlencode.decode(name);
    console.log(name2);
    const results = await models.student.findAll({
      where: {
        name: name2,
      },
    });

    ctx.body = {
      results,
    };
  });



  // router.get("/sololist", async (ctx) => {
  //   const results = await models.solo.findAll();

  //   ctx.body = {
  //     results,
  //   };
  // });









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
};
