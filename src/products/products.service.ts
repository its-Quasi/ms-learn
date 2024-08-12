import { HttpStatus, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaClient } from "@prisma/client";
import { PaginationDto } from "../common/dto/pagination.dto";
import { RpcException } from "@nestjs/microservices";

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

  findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const take = limit;
    const skip = (page - 1) * limit;
    return this.product.findMany({
      where: { available: true },
      take: take,
      skip: skip
    });
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    });

    if (!product) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Product with ID: ${id} dont found`
      });
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = updateProductDto;
    return this.product.update({
      where: { id },
      data
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
