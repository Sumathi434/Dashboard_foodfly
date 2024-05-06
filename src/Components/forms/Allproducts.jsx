import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

function Allproducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/get-products/${firmId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            alert('Failed to fetch products. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        productsHandler();
    }, []);

    const deleteProductById = async (productId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this product?');
            if (confirmed) {
                const response = await fetch(`${API_URL}/product/${productId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                setProducts(products.filter(product => product._id !== productId));
                alert('Product deleted successfully');
            }
        } catch (error) {
            console.error('Product deletion failed:', error);
            alert('Product deletion failed. Please try again.');
        }
    };

    return (
        <div>
            {loading ? (
                <p className='para1'>
                    <img src='public/images/loading.gif' alt="Loading"/>
                </p>
            ) : products.length === 0 ? (
                <p className='para2'>No products added 🍔</p>
            ) : (
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>ProductName</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => (
                            <tr key={item._id}>
                                <td style={{fontWeight:'600', fontSize:'1em', fontFamily:'arial'}}>{item.productName}</td>
                                <td style={{fontWeight:'600', fontSize:'1em', fontFamily:'arial'}} >{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: '180px', height: '100px', borderRadius: '0.5em' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteProductById(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Allproducts;
