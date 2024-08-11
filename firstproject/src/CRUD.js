import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CRUD.css';

function CRUD() {
    const [lists, setList] = useState([]);
    const [updateState, setUpdateState] = useState(-1);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const response = await axios.get('http://localhost:3001/products');
            setList(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function handleEdit(id) {
        setUpdateState(id);
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:3001/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;

        try {
            if (updateState === -1) {
                await axios.post('http://localhost:3001/products', { name, price });
            } else {
                await axios.put(`http://localhost:3001/products/${updateState}`, { name, price });
                setUpdateState(-1);
            }
            fetchProducts();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <div className='crud'>
            <div>
                {/* Display the form to add a new product */}
                <AddList onAdd={fetchProducts} />
                
                {/* Display the form to edit an existing product */}
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map((current) => (
                                updateState === current.id ? 
                                <EditList 
                                    key={current.id}
                                    current={current} 
                                    onUpdate={fetchProducts} 
                                    setUpdateState={setUpdateState} 
                                /> : 
                                <tr key={current.id}>
                                    <td>{current.name}</td>
                                    <td>{current.price}</td>
                                    <td>
                                        <button className='edit' type='button' onClick={() => handleEdit(current.id)}>Edit</button>
                                        <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

function EditList({ current, onUpdate, setUpdateState }) {
    const [name, setName] = useState(current.name);
    const [price, setPrice] = useState(current.price);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/products/${current.id}`, { name, price });
            onUpdate();
            setUpdateState(-1);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <tr>
            <td><input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /></td>
            <td><input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
            <td>
                <button type='button' onClick={handleUpdate}>Update</button>
                <button type='button' onClick={() => setUpdateState(-1)}>Cancel</button>
            </td>
        </tr>
    );
}

function AddList({ onAdd }) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;

        try {
            await axios.post('http://localhost:3001/products', { name, price });
            onAdd();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" required />
            <input type="text" name="price" placeholder="Enter Price" required />
            <button type="submit">Add</button>
        </form>
    );
}

export default CRUD;
