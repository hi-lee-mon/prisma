const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();

app.use(express.json());

// 全件
app.get('/', async (req, res) => {
  const posts = await prisma.posts.findMany();
  return res.json(posts);
});

// 1件
app.get('/:id', async (req, res) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(post);
});

// 追加
app.post('/', async (req, res) => {
  const {title, body} = req.body;
  const posts = await prisma.posts.create({
    data: {
      title,
      body,
    },
  });

  return res.json(posts);
})

// 更新
app.put('/:id', async (req, res) => {
  const {body, title} = req.body;
  const updatedPost = await prisma.posts.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      title,
      body,
    },
  });

  return res.json(updatedPost);
})

// 削除
app.delete('/:id', async (req, res) => {
  const deletedPost = await prisma.posts.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json(deletedPost);
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


