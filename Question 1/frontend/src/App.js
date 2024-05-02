import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [comp, setComp] = useState("")
  const [cat, setCat] = useState("")
  const [top, setTop] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const [product, setProduct] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get(`http://localhost:7000/getProducts/${comp}/${cat}/?top=${top}&minPrice=${min}&maxPrice=${max}`).then(res => setProduct(res.data)).catch(err => console.log(err))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Company Name</h3>
        <input type='text' value={comp} onChange={(e) => { setComp(e.target.value) }} />
        <h3>Category Name</h3>
        <input type='text' value={cat} onChange={(e) => { setCat(e.target.value) }} />
        <h3>Top</h3>
        <input type='text' value={top} onChange={(e) => { setTop(e.target.value) }} />
        <h3>Min Price</h3>
        <input type='text' value={min} onChange={(e) => { setMin(e.target.value) }} />
        <h3>Max Price</h3>
        <input type='text' value={max} onChange={(e) => { setMax(e.target.value) }} /><br />
        <button type='submit'>Submit</button>
      </form>
      <div className='user-container'>
        {product.map(x => (
          <div className='single-user'>
            <h4>productName:{x.productName}</h4>
            <h4>price:RS {x.price}</h4>
            <h4>rating:{x.rating}</h4>
            <h4>discount:{x.discount}</h4>
            <h4>availability:{x.availability}</h4>
          </div>))}
      </div>
    </div>
  );
}

export default App;
