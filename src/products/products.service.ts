import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  logger = new Logger("PRODUCTS-MS SERVICE");
  onModuleInit() {
    this.$connect();
    this.logger.log("DATABASE CONNECTED");
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  findAll() {
    return this.product.findMany({ where: { available: true } });
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    });

    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} dont found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.product.update({
      where: {
        id
      },
      data: updateProductDto
    });
  }

  remove(id: number) {
    return this.product.update({
      where: { id },
      data: {
        available: false
      }
    });
  }
}
