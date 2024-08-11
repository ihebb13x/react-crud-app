import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify();
const prisma = new PrismaClient();

// Define interfaces for request body and params
interface CreateProductBody {
  name: string;
  price: string; // Adjust this if you use number
}

interface UpdateProductBody {
  name: string;
  price: string; // Adjust this if you use number
}

interface ProductParams {
  id: string; // Assuming `id` is a string in the route parameters
}

// GET all products
fastify.get('/products', async (request, reply) => {
  try {
    const products = await prisma.products.findMany(); // Use model name 'products'
    return products;
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Failed to fetch products' });
  }
});

// POST a new product
fastify.post('/products', async (request, reply) => {
  try {
    const { name, price } = request.body as CreateProductBody;
    const product = await prisma.products.create({ // Use model name 'products'
      data: { name, price },
    });
    return product;
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Failed to create product' });
  }
});

// PUT (update) a product
fastify.put('/products/:id', async (request, reply) => {
  try {
    const params = request.params as ProductParams;
    const id = parseInt(params.id);
    const { name, price } = request.body as UpdateProductBody;
    const product = await prisma.products.update({ // Use model name 'products'
      where: { id },
      data: { name, price },
    });
    return product;
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Failed to update product' });
  }
});

// DELETE a product
fastify.delete('/products/:id', async (request, reply) => {
  try {
    const params = request.params as ProductParams;
    const id = parseInt(params.id);
    await prisma.products.delete({ // Use model name 'products'
      where: { id },
    });
    return { message: 'Product deleted' };
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Failed to delete product' });
  }
});

// Start the server using the options object
fastify.listen({
  port: 3000,
  host: '127.0.0.1', // Utilise IPv4
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

