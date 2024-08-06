import { Controller, ParseIntPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern("create_product")
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern("get_all_products")
  findAll(@Payload() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  // @Get(":id")
  @MessagePattern("get_product_id")
  findOne(@Payload("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(":id")
  @MessagePattern("update_product")
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(":id")
  @MessagePattern("delete_product")
  remove(@Payload("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
