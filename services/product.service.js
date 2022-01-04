const faker = require('faker');
const { Op } =require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Category } = require('../db/models/category.model');


class ProductsService{
  constructor(){
    this.products = [];
    this.generate();

  }
  generate(){
    const limit = 100;
    for (let i = 0; i < limit ; i++){
      this.products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newProducts = await models.Product.create(data);
    return newProducts;
  }

  async find(query){
    const options = {
      include: ['category'],
      where:{}
    }
    const { limit, offset } = query;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
    const product = await models.Product.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes){
    const index = await models.Product.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = await models.Product.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
