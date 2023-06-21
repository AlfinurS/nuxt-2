export const actions = {
  setProducts({ commit }, products) {
    commit('SET_PRODUCTS', products);
  },
  setFilteredProducts({ commit }, products) {
    commit('SET_FILTERED_PRODUCTS', products);
  },
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = JSON.parse(JSON.stringify(products));
  },
  SET_FILTERED_PRODUCTS(state, search) {
    if (search !== '') {
      const regexp = new RegExp(search, 'i');
      const filtered = state.products.filter(
        (product) => {
          //bypassObject(product, search);
          return regexp.test(product.title) || regexp.test(product.category);
        },
      );
      state.filteredPoducts = JSON.parse(JSON.stringify(filtered));
    } else {
      state.filteredPoducts = JSON.parse(JSON.stringify(state.products));
    }
  },
};

export const getters = {
  products: (state) => state.products,
  filteredPoducts: (state) => state.filteredPoducts,
};

export const state = () => ({
  products: [],
  filteredPoducts: [],
});

const bypassObject = (objOrString, search) => {
  const regexp = new RegExp(search, 'i');
  if (typeof objOrString === 'string') return regexp.test(objOrString);
  console.log(objOrString);
};
