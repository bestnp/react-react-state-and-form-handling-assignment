import "./App.css";
import { useState } from "react";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);

  const handleCreateProduct = (data) => {
    setProducts((prev) => [
      {
        id: crypto.randomUUID(),
        ...data,
        price: Number(data.price),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Create Product</h1>
      </div>

      <ProductForm onCreate={handleCreateProduct} />

      <section className="product-list">
        <h2 className="section-title">Products</h2>

        {products.length === 0 ? (
          <p className="muted">ยังไม่มีสินค้า ลองสร้างสินค้าจากฟอร์มด้านบน</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <article key={p.id} className="card">
                <div className="thumb">
                  {/* ป้องกันภาพว่างด้วย placeholder สีเทา */}
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <div className="placeholder" />
                  )}
                </div>
                <div className="card-body">
                  <h3 className="card-title">{p.name}</h3>
                  <div className="price">฿{p.price.toLocaleString()}</div>
                  <p className="desc">{p.description}</p>
                  <div className="meta">
                    <span className="email">{p.email}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
