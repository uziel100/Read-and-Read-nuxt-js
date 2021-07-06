export const actions = {
  getCartProuct() {
    const cart = localStorage.getItem("cart");

    if (!cart) return [];

    return JSON.parse(cart);
  },

  async addProductToCart({ dispatch }, productId) {
    const cart = await dispatch("getCartProuct");
    if (!cart.length) {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const isProductAdded = cart.includes(productId);
      if (!isProductAdded) {
        cart.unshift(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        return true;
      }
      return false;
    }
    return true;
  },

  async deleteProductCart({ dispatch }, idBook) {
    try {
      const cart = await dispatch("getCartProuct");
      const cartFilter = cart.filter(product => product !== idBook);
      localStorage.setItem("cart", JSON.stringify(cartFilter));
      return true;
    } catch (error) {
      return false;
    }
  },

  clearCart(){
    try {
      localStorage.removeItem("cart");
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

};
