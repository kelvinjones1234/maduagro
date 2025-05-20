export const fetchCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/categories/");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  };
  
  export const fetchProducts = async (params) => {
    const res = await fetch(`http://127.0.0.1:8000/api/products/?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };