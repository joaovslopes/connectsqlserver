const { PrismaClient } = require('@prisma/client')
const cors = require('@fastify/cors')
const port = process.env.PORT || 10000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const prisma = new PrismaClient()


const app = require('fastify')({
  logger: true
});

app.register(cors, {
  origin: '*',
});





//CHECAR TODOS OS USUARIOS
app.get('/users', async (req, res) => {
  const users = await prisma.mEMB_INFO.findMany()
  return users
})

//CHECAR TODOS OS USUARIOS
app.get('/consulta', async (request, reply) => {
  try {
    const termos = await prisma.mEMB_INFO.findMany({
      select: {
        memb___id: true,
        mail_addr: true,
        mail_chek: true,
      },
    });
    reply.send(termos);
  } catch (error) {
    reply.status(500).send(error);
  }
});


//CHECAR TODOS OS USUARIOS
app.get('/ranking', async (req, res) => {
  const rank = await prisma.accountCharacter.findMany()
  return rank
})


//RANKING RESET
app.get('/ranking/reset', async (request, reply) => {
  try {

    const reset = await prisma.character.findMany({
      select: {
        Name: true,
        ResetCount: true,
      },
      orderBy: {
        ResetCount: 'desc', // Substitua 'id' pelo nome da coluna pela qual você deseja ordenar
      },
    });

    reply.send(reset);
  } catch (error) {
    reply.status(500).send(error);
  }
});


//RANKING RESET
app.get('/ranking/resettop', async (request, reply) => {
  try {

    const resetTop = await prisma.character.findMany({
      select: {
        Name: true,
        ResetCount: true,
      },
      orderBy: {
        ResetCount: 'desc', // Substitua 'id' pelo nome da coluna pela qual você deseja ordenar
      },
      take: 15,
    });

    reply.send(resetTop);
  } catch (error) {
    reply.status(500).send(error);
  }
});

app.get('/ranking/reset/day', async (request, reply) => {
  try {
    const resetd = await prisma.character.findMany({
      select: {
        Name: true,
        Class: true,
        cLevel: true,
        ResetsDay: true,
        // Adicione outras colunas que você deseja selecionar
      },
      orderBy: {
        ResetsDay: 'desc', // Substitua 'id' pelo nome da coluna pela qual você deseja ordenar
      },
    });

    reply.send(resetd);
  } catch (error) {
    reply.status(500).send(error);
  }
});

app.get('/ranking/reset/semanal', async (request, reply) => {
  try {
    const resetsem = await prisma.character.findMany({
      select: {
        Name: true,
        Class: true,
        cLevel: true,
        ResetsMonth: true,
        // Adicione outras colunas que você deseja selecionar
      },
      orderBy: {
        ResetsMonth: 'desc', // Substitua 'id' pelo nome da coluna pela qual você deseja ordenar
      },
    });

    reply.send(resetsem);
  } catch (error) {
    reply.status(500).send(error);
  }
});

app.get('/ranking/reset/mensal', async (request, reply) => {
  try {
    const resetm = await prisma.character.findMany({
      select: {
        Name: true,
        Class: true,
        cLevel: true,
        ResetsWeek: true,
        // Adicione outras colunas que você deseja selecionar
      },
      orderBy: {
        ResetsWeek: 'desc', // Substitua 'id' pelo nome da coluna pela qual você deseja ordenar
      },
    });

    reply.send(resetm);
  } catch (error) {
    reply.status(500).send(error);
  }
});



//PARTE DOS TERMOS
app.post('/cad', async (req, res) => {
  const { memb___id, memb_name, mail_addr, memb__pwd, sno__numb, mail_chek, bloc_code, ctl1_code } = req.body;
  const result = await prisma.mEMB_INFO.create({
    data: {
      memb___id,
      memb_name,
      mail_addr,
      memb__pwd,
      sno__numb,
      mail_chek,
      bloc_code,
      ctl1_code
    },
  })
  return result
})


//app.listen(port, '0.0.0.0', (err, address) => {
//  if (err) {
//    console.error(err);
    //process.exit(1);
  //}
  //console.log(`Servidor rodando em: ${address}`);
//});

app.listen({ port: 3000 })