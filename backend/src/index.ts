import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify();
const prisma = new PrismaClient();

// Définir les interfaces pour le corps de la requête et les paramètres
interface CreateProductBody {
  name: string;
  price: string; // Ajustez cela si vous utilisez un nombre
}

interface UpdateProductBody {
  name: string;
  price: string; // Ajustez cela si vous utilisez un nombre
}

interface ProductParams {
  id: string; // Supposons que `id` soit une chaîne dans les paramètres de route
}

// GET tous les produits
fastify.get('/products', async (request, reply) => {
  try {
    const products = await prisma.products.findMany(); // Utiliser le nom du modèle 'products'
    return products;
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Échec de la récupération des produits' });
  }
});

// POST un nouveau produit
fastify.post('/products', async (request, reply) => {
  try {
    const { name, price } = request.body as CreateProductBody;
    const product = await prisma.products.create({ // Utiliser le nom du modèle 'products'
      data: { name, price },
    });
    return product;
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Échec de la création du produit' });
  }
});

// PUT (mise à jour) d'un produit
fastify.put('/products/:id', async (request, reply) => {
  try {
    const params = request.params as ProductParams;
    const id = parseInt(params.id);
    const { name, price } = request.body as UpdateProductBody;
    const product = await prisma.products.update({ // Utiliser le nom du modèle 'products'
      where: { id },
      data: { name, price },
    });
    return product;
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Échec de la mise à jour du produit' });
  }
});

// DELETE un produit
fastify.delete('/products/:id', async (request, reply) => {
  try {
    const params = request.params as ProductParams;
    const id = parseInt(params.id);
    await prisma.products.delete({ // Utiliser le nom du modèle 'products'
      where: { id },
    });
    return { message: 'Produit supprimé' };
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Échec de la suppression du produit' });
  }
});

// Démarrer le serveur avec l'objet d'options
fastify.listen({
  port: 3020, // Port changé à 3020
  host: '127.0.0.1', // Utiliser IPv4
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Serveur à l'écoute sur ${address}`);
});
