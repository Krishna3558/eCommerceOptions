import { useState , useEffect } from 'react'

function App() {
  
  const products = [
    {
      id: 1,
      name: "Continental Instant Coffee",
      price: 646,
      Weight: 400,
      Brand: "Continental",
      image: "src/400-xtra-instant-coffee-pouch-continental-coffee-original-imagfnuhhcscepf8.webp",
    },
    {
      id: 2,
      name: "Toffee Coffee Roasters",
      price: 409,
      Weight: 200,
      Brand: "Toffee Coffee",
      image: "src/100-colombia-brazil-speciality-coffee-buy-1-get-1-100-arabica-original-imah4ehhyewxygjk.webp",
    },
    {
      id: 3,
      name: "Nescafe Classic",
      price: 695,
      Weight: 200,
      Brand: "Nescafe",
      image: "src/-original-imah4b9szujzxejb.webp"
    },
    {
      id: 4,
      name: "Bru Instant Coffee",
      price: 468,
      Weight: 200,
      Brand: "Bru",
      image: "src/200-na-pouch-1-instant-coffee-bru-original-imah4hnnz4e8k4ux.webp",
    },
    {
      id: 5,
      name: "Bevzilla instant coffee",
      price: 239,
      Weight: 100,
      Brand: "Bevzilla",
      image: "src/120-instant-coffee-powder-60-sachets-box-makes-premium-cups-15-original-imahf2gzhfgqdzpu.webp",
    },
    {
      id: 6,
      name: "Nescafe Gold",
      price: 589,
      Weight: 100,
      Brand: "Nescafe",
      image: "src/-original-imagvg55gfhnxhfe.webp",
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    Weight: "",
    Brand: "",
    minPrice: 0,
    maxPrice: 800,
    sortBy: "",
  });

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Function to apply filters and sorting
  useEffect(() => {
    let updatedProducts = products;

    // Apply Weight filter
    if (filters.Weight) {
      updatedProducts = updatedProducts.filter(
        (product) => product.Weight == filters.Weight
      );
    }

    // Apply Brand filter
    if (filters.Brand) {
      updatedProducts = updatedProducts.filter(
        (product) => product.Brand === filters.Brand
      );
    }

    // Apply price range filter
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply sorting
    if (filters.sortBy === "priceAsc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceDesc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [filters]);

  return (
    <div className="flex">

      <div className="w-1/4 p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Weight</h3>
          <select
            name="Weight"
            value={filters.Weight}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Weights</option>
            <option value = "100" >100g</option>
            <option value="200">200g</option>
            <option value="400">400g</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Brand</h3>
          <select
            name="Brand"
            value={filters.Brand}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Brands</option>
            <option value="Nescafe">Nescafe</option>
            <option value="Continental">Continental</option>
            <option value="Toffee Coffee">Toffee Coffee</option>
            <option value="Bru">Bru</option>
            <option value="Bevzilla">Bevzilla</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Price Range</h3>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Sort By</h3>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">No Sorting</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className=" flex justify-between border border-gray-200 p-4 rounded shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500">Weight: {product.Weight}g</p>
                  <p className="text-gray-500">Brand: {product.Brand}</p>
                  <p className="text-gray-900 font-bold">Price: ₹{product.price}</p>
                </div>

                <div>
                  <img src={product.image} alt={`${product.name} image`} className=' w-15 h-20' />
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
