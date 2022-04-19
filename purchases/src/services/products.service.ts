import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  findProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlugAlreadyExists =
      await this.prisma.product.findUnique({
        where: {
          slug,
        },
      });

    if (productWithSameSlugAlreadyExists) {
      throw new Error('Slug is already in use');
    }

    const newProduct = await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });

    return newProduct;
  }
}
