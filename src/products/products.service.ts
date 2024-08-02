import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    console.log("DB Connected");
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const x = updateProductDto.name;
    return `This action updates a #${id} #${x} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
