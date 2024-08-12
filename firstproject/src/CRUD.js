/* import React, { useEffect, useState } from 'react';
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
            const response = await axios.get('http://localhost:3020/products'); // Port changé à 3020
            setList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    }

    async function handleEdit(id) {
        setUpdateState(id);
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:3020/products/${id}`); // Port changé à 3020
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;

        try {
            if (updateState === -1) {
                await axios.post('http://localhost:3020/products', { name, price }); // Port changé à 3020
            } else {
                await axios.put(`http://localhost:3020/products/${updateState}`, { name, price }); // Port changé à 3020
                setUpdateState(-1);
            }
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
        }
    }

    return (
        <div className='crud'>
            <div>
                 <AddList onAdd={fetchProducts} />
                
                 <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prix</th>
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
                                        <button className='edit' type='button' onClick={() => handleEdit(current.id)}>Modifier</button>
                                        <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Supprimer</button>
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
            await axios.put(`http://localhost:3020/products/${current.id}`, { name, price }); // Port changé à 3020
            onUpdate();
            setUpdateState(-1);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
        }
    };

    return (
        <tr>
            <td><input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /></td>
            <td><input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
            <td>
                <button type='button' onClick={handleUpdate}>Mettre à jour</button>
                <button type='button' onClick={() => setUpdateState(-1)}>Annuler</button>
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
            await axios.post('http://localhost:3020/products', { name, price }); // Port changé à 3020
            onAdd();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
        }
    };

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Entrez le nom" required />
            <input type="text" name="price" placeholder="Entrez le prix" required />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default CRUD;
 */


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
            const response = await axios.get('http://localhost:3020/products');
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
            await axios.delete(`http://localhost:3020/products/${id}`);
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
                await axios.post('http://localhost:3020/products', { name, price });
            } else {
                await axios.put(`http://localhost:3020/products/${updateState}`, { name, price });
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
                            {lists.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No products found</td>
                                </tr>
                            ) : (
                                lists.map((current) => (
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
                                ))
                            )}
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
            await axios.put(`http://localhost:3020/products/${current.id}`, { name, price });
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
            await axios.post('http://localhost:3020/products', { name, price });
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
