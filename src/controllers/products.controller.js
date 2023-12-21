import * as service from "../services/products.services.js";

export const createFileCtr = async (req, res, next) => {
  try {
    const newProds = await service.createFileProd();
    if (!newProds) throw new Error("Validation Error!");
    else res.json(newProds);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, category, sortOrder } = req.query;
    const response = await service.getAll(page, limit, category, sortOrder);
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getAllProds= async (req, res, next) => {
  try {
    const response = await service.getAllProds();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) res.status(404).json({ msg: "Product Not found!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    if (!response) res.status(404).json({ msg: "Error create product!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.update(id, req.body);
    if (!response) res.status(404).json({ msg: "Error update product! The ID does not exists..." });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.remove(id);
    if (!response) res.status(404).json({ msg: "Error delete product! The ID does not exists..." });
    else res.status(200).json({ msg: `Product id: ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};

export const addProdToCart = async (req, res, next) => {
  try {
    const { idCart, idProd } = req.params;
    const newProd = await service.addProdToCart(idCart, idProd);
    res.status(200).json(newProd);
  } catch (error) {
    next(error.message);
  }
}

export const firstFiveByCategory = async (req, res, next) => {
  try {
    const response = await service.firstFiveByCategory();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};
// query, el tipo de elemento que quiero buscar en caso de no recibir query, realizar la búsqueda general
export const quantityByCategory = async (req, res, next) => {
  try {
    const response = await service.quantityByCategory();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};
// query, el tipo de elemento que quiero buscar en caso de no recibir query, realizar la búsqueda general

export const updateManyOnsale = async (req, res, next) => {
  try {
    const response = await service.updateManyOnsale();
    res.json(response);
  } catch (error) {
    next(error)
  }
};
// query, el tipo de elemento que quiero buscar en caso de no recibir query, realizar la búsqueda general
export const getPromotions = async (req, res, next) => {
  try {
    const response = await service.getPromotions();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }

};
// ARDENAR POR PRECIO
export const orderByPrice = async (req, res, next) => {
  try {
    const { order } = req.query;
    if (!order) {
      const response = await service.sortAsc('asc');
      res.status(200).json(response);
    } else if (order === 'desc') {
      const response = await service.sortDesc('desc');
      res.status(200).json(response);
    } else {

      res.status(400).json({ msg: "Error in orderByPrice - porducts.controller.js" });
    }
  } catch (error) {
    next(error.message);
  }
};