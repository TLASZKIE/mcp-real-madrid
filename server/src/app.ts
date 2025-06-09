import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// getTags
app.get('/tags', async (_req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
});

// addTag
app.post('/tags', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  try {
    const tag = await prisma.tag.create({ data: { name } });
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: 'could not create tag' });
  }
});

// addPlayer
app.post('/players', async (req, res) => {
  const { name, tagIds } = req.body as { name: string; tagIds?: number[] };
  if (!name) return res.status(400).json({ error: 'name required' });
  try {
    const player = await prisma.player.create({ data: { name } });
    if (Array.isArray(tagIds)) {
      for (const tagId of tagIds) {
        await prisma.playerTag.create({ data: { playerId: player.id, tagId } });
      }
    }
    const result = await prisma.player.findUnique({
      where: { id: player.id },
      include: { tags: { include: { tag: true } } },
    });
    res.status(201).json({
      id: result!.id,
      name: result!.name,
      tags: result!.tags.map(pt => pt.tag),
    });
  } catch (err) {
    res.status(400).json({ error: 'could not create player' });
  }
});

// getPlayer
app.get('/players/:id', async (req, res) => {
  const id = Number(req.params.id);
  const player = await prisma.player.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } } },
  });
  if (!player) return res.sendStatus(404);
  res.json({
    id: player.id,
    name: player.name,
    tags: player.tags.map(pt => pt.tag),
  });
});

// search players by name
app.get('/players/search', async (req, res) => {
  const q = (req.query.q as string) || '';
  const players = await prisma.player.findMany({
    where: { name: { contains: q, mode: 'insensitive' } },
    include: { tags: { include: { tag: true } } },
  });
  res.json(
    players.map(p => ({
      id: p.id,
      name: p.name,
      tags: p.tags.map(pt => pt.tag),
    }))
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
