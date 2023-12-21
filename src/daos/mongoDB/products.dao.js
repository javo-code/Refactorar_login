import { ProductModel } from "./models/products.model.js";

export default class ProductDaoMongoDB {
async getAll(page = 1, limit = 10, category, sortOrder) {
    try {
      // Configurar la consulta según los parámetros proporcionados
      const query = category ? { category } : {};
      const sort = {};

      // Configurar el orden según el parámetro de consulta
      if (sortOrder === 'asc') {
        sort.price = 1;
      } else if (sortOrder === 'desc') {
        sort.price = -1;
      }

      // Realizar la consulta paginada
      const response = await ProductModel.paginate(query, { page, limit, sort });

      // Aplicar lean() a los documentos de la respuesta
      const leanResponse = response.docs.map(doc => doc.toObject());

      // Construir los enlaces directos a las páginas previa y siguiente
      const nextLink = response.hasNextPage ? `/api/products?page=${response.nextPage}` : null;
      const prevLink = response.hasPrevPage ? `/api/products?page=${response.prevPage}` : null;

      // Construir y devolver el objeto de respuesta formateado
      return {
        status: 'success',
        payload: {
          products: leanResponse,
          info: {
            count: response.docs.length,
            pages: response.totalPages,
            page: response.page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            nextLink,
            prevLink,
          },
        },
      };
    } catch (error) {
      console.error('Error en getAll:', error.message);
      throw new Error('Error al recuperar la lista de productos.');
    }
  }

    async getAllProds() {
        try {
            const response = await ProductModel.find({});
            return response;

        } catch (error) {
            console.log(error);
        }
    }
    
    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await ProductModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
//CREAR ARCHIVO CON TODOS LOS PRODUCTOS
    async createProd(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
        
    // AGREGATION-1
    async firstFiveByCategory() {
        try {
            const response = await ProductModel.aggregate([
            {
                $match: { category: "service"}
            },
            {
                $limit: 5 
            }
            ]);
            
            return response;
        } catch (error) {
            console.log(error);
            throw new Error('Error at firstFiveByCategory - products.dao.js');
        }
    }
    
    // AGREGATION-2
    async quantityByCategory() {
        try {
            return await ProductModel.aggregate([
                {
                    $group: {
                        _id: '$category',// Definimos a travez de que atributo nos va a grupar los documentos.
                        count: { $sum: 1 }
                    }
                }
            ])
        } catch (error) {
            console.log(error);
            throw new Error('Error at quantityByCategory - products.dao.js');
        }
    }
    
    // AGREGATION-3
    async getPromotions() {
        try {
            return await ProductModel.aggregate([
                {
                    $match: {onsale: true}
                },
                {
                    $group: {
                        _id: '$onsale',// Definimos a travez de que atributo nos va a grupar los documentos.
                        count: { $sum: 1 }
                    }
                }
            ])
        } catch (error) {
            console.log(error);
            throw new Error('Error at getPromotions - products.dao.js');
        }
    }

    
        // ORDENAR DE FORMA ASCENDENTE
 async sortAsc() {
    try {
        const resultadoOrdenado = await ProductModel.aggregate([
            {
                $sort: { price: 1 }
            }
        ]);
        return resultadoOrdenado;
        } catch (error) {
            console.log(error);
            throw new Error('Error at sortAsc - products.dao.js');
        }
    }

        // ORDENAR DE FORMA DESCENDENTE
    async sortDesc() {
    try {
        const resultadoOrdenado = await ProductModel.aggregate([
            {
                $sort: { price: -1 }
            }
        ]);
        return resultadoOrdenado;
        } catch (error) {
            console.log(error);
            throw new Error('Error at sortDesc - products.dao.js');
        }
    }

    
    // ACTUALIZAR TODOS LOS ARCHIVOS
    async updateManyOnsale() {
        try {
            const products = await this.getAll();
            for (const product of products) {
                product.onsale = true;
                product.save();
        }
            return { msg: "Update products OK" };
        } catch (error) {
            console.log(error);
            throw new Error('Error at updateManyOnsale - products.dao.js');
        }
    }
}