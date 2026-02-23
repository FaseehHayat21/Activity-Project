// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AdminPage.css'; // Import the CSS file

// const AdminPage = () => {
//     const [customers, setCustomers] = useState([]);
//     const [editingCustomer, setEditingCustomer] = useState(null); // Track the customer being edited
//     const [editFormData, setEditFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phoneNumber: '',
//         location: ''
//     });

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         try {
//             const response = await axios.get('http://localhost:1000/api/admin/AllCustomer');
//             setCustomers(response.data.students);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:1000/api/admin/AllCustomer/${id}`);
//             fetchCustomers(); // Refresh the list after deletion
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     };

//     const handleEditClick = (customer) => {
//         setEditingCustomer(customer._id);
//         setEditFormData({
//             firstname: customer.firstname,
//             lastname: customer.lastname,
//             email: customer.email,
//             phoneNumber: customer.phoneNumber,
//             location: customer.location
//         });
//     };

//     const handleEditFormChange = (e) => {
//         const { name, value } = e.target;
//         setEditFormData({
//             ...editFormData,
//             [name]: value
//         });
//     };

//     const handleEditFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:1000/api/admin/user/${editingCustomer}`, editFormData);
//             setEditingCustomer(null); // Exit edit mode
//             fetchCustomers(); // Refresh the list after editing
//         } catch (error) {
//             console.error('Error updating customer:', error);
//         }
//     };

//     return (
//         <div className="admin-page">
//             <h1 className="admin-title">CUSTOMER MANAGEMENT</h1>
//             <table className="customer-table">
//                 <thead>
//                     <tr>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Email</th>
//                         <th>Phone Number</th>
//                         <th>Location</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer._id} className="customer-row">
//                             {editingCustomer === customer._id ? (
//                                 // Edit Form
//                                 <>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="firstname"
//                                             value={editFormData.firstname}
//                                             onChange={handleEditFormChange}
//                                             className="edit-input"
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="lastname"
//                                             value={editFormData.lastname}
//                                             onChange={handleEditFormChange}
//                                             className="edit-input"
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={editFormData.email}
//                                             onChange={handleEditFormChange}
//                                             className="edit-input"
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="phoneNumber"
//                                             value={editFormData.phoneNumber}
//                                             onChange={handleEditFormChange}
//                                             className="edit-input"
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="location"
//                                             value={editFormData.location}
//                                             onChange={handleEditFormChange}
//                                             className="edit-input"
//                                         />
//                                     </td>
//                                     <td>
//                                         <button className="save-button" onClick={handleEditFormSubmit}>Save</button>
//                                         <button className="cancel-button" onClick={() => setEditingCustomer(null)}>Cancel</button>
//                                     </td>
//                                 </>
//                             ) : (
//                                 // Display Data
//                                 <>
//                                     <td>{customer.firstname}</td>
//                                     <td>{customer.lastname}</td>
//                                     <td>{customer.email}</td>
//                                     <td>{customer.phoneNumber}</td>
//                                     <td>{customer.location}</td>
//                                     <td>
//                                         <button className="delete-button" onClick={() => handleDelete(customer._id)}>Delete</button>
//                                         <button className="edit-button" onClick={() => handleEditClick(customer)}>Edit</button>
//                                     </td>
//                                 </>
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminPage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './AdminPage.css';

// const AdminPage = () => {

//     const [reportData, setReportData] = useState({
//         customers: { today: 0, thisWeek: 0, thisMonth: 0 },
//         purchases: { today: 0, thisWeek: 0, thisMonth: 0 },
//     });
    
//     const fetchReportData = async () => {
//         try {
//             const response = await axios.get('http://localhost:1000/api/admin/report');
//             if (response.data) {
//                 setReportData(response.data);
//             } else {
//                 console.error('No report data received');
//             }
//         } catch (error) {
//             console.error('Error fetching report data:', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchReportData();
//     }, []);




//     // State initialization
//     const [customers, setCustomers] = useState([]);
//     const [laptops, setLaptops] = useState([]);
//     const [loading, setLoading] = useState({
//         customers: true,
//         laptops: true
//     });
//     const [editingCustomer, setEditingCustomer] = useState(null);
//     const [editingLaptop, setEditingLaptop] = useState(null);
//     const [editCustomerFormData, setEditCustomerFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phoneNumber: '',
//         location: ''
//     });
//     const [editLaptopFormData, setEditLaptopFormData] = useState({
//         user: '',
//         title: '',
//         description: '',
//         price: '',
//         phoneNumber: '',
//         images: '',
//         date: ''
//     });
//     const [searchTerm, setSearchTerm] = useState({
//         customers: '',
//         laptops: ''
//     });
//     const [activeTab, setActiveTab] = useState('customers');

//     useEffect(() => {
//         fetchCustomers();
//         fetchLaptops();
//     }, []);

//     const fetchCustomers = async () => {
//         try {
//             setLoading(prev => ({ ...prev, customers: true }));
//             const response = await axios.get('http://localhost:1000/api/admin/AllCustomer');
//             setCustomers(response.data.students || []);
//             toast.success('Customers loaded successfully');
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             toast.error('Failed to load customers');
//             setCustomers([]);
//         } finally {
//             setLoading(prev => ({ ...prev, customers: false }));
//         }
//     };

//     const fetchLaptops = async () => {
//         try {
//             setLoading(prev => ({ ...prev, laptops: true }));
//             const response = await axios.get('http://localhost:1000/api/admin/Alllaptops');
//             setLaptops(response.data.laptops || []);
//             toast.success('Laptops loaded successfully');
//         } catch (error) {
//             console.error('Error fetching laptops:', error);
//             toast.error('Failed to load laptops');
//             setLaptops([]);
//         } finally {
//             setLoading(prev => ({ ...prev, laptops: false }));
//         }
//     };

//     // Customer Management Functions
//     const handleDeleteCustomer = async (id) => {
//         if (window.confirm('Are you sure you want to delete this customer?')) {
//             try {
//                 await axios.delete(`http://localhost:1000/api/admin/AllCustomer/${id}`);
//                 fetchCustomers();
//                 toast.success('Customer deleted successfully');
//             } catch (error) {
//                 console.error('Error deleting customer:', error);
//                 toast.error('Failed to delete customer');
//             }
//         }
//     };

//     const handleEditCustomerClick = (customer) => {
//         setEditingCustomer(customer._id);
//         setEditCustomerFormData({
//             firstname: customer.firstname,
//             lastname: customer.lastname,
//             email: customer.email,
//             phoneNumber: customer.phoneNumber,
//             location: customer.location
//         });
//     };

//     const handleEditCustomerFormChange = (e) => {
//         const { name, value } = e.target;
//         setEditCustomerFormData({
//             ...editCustomerFormData,
//             [name]: value
//         });
//     };

//     const handleEditCustomerFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:1000/api/admin/user/${editingCustomer}`, editCustomerFormData);
//             setEditingCustomer(null);
//             fetchCustomers();
//             toast.success('Customer updated successfully');
//         } catch (error) {
//             console.error('Error updating customer:', error);
//             toast.error('Failed to update customer');
//         }
//     };

//     // Laptop Management Functions
//     const handleDeleteLaptop = async (id) => {
//         if (window.confirm('Are you sure you want to delete this laptop?')) {
//             try {
//                 await axios.delete(`http://localhost:1000/api/admin/AllLaptops/${id}`);
//                 fetchLaptops();
//                 toast.success('Laptop deleted successfully');
//             } catch (error) {
//                 console.error('Error deleting laptop:', error);
//                 toast.error('Failed to delete laptop');
//             }
//         }
//     };

//     const handleEditLaptopClick = (laptop) => {
//         setEditingLaptop(laptop._id);
//         setEditLaptopFormData({
//             user: laptop.user?._id || '',
//             title: laptop.title,
//             description: laptop.description,
//             price: laptop.price,
//             phoneNumber: laptop.phoneNumber,
//             images: laptop.images?.join(', ') || '',
//             date: laptop.date ? new Date(laptop.date).toISOString().split('T')[0] : ''
//         });
//     };

//     const handleEditLaptopFormChange = (e) => {
//         const { name, value } = e.target;
//         setEditLaptopFormData({
//             ...editLaptopFormData,
//             [name]: value
//         });
//     };

//     const handleEditLaptopFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedLaptop = {
//                 ...editLaptopFormData,
//                 images: editLaptopFormData.images.split(',').map(image => image.trim()),
//                 price: Number(editLaptopFormData.price)
//             };

//             await axios.put(`http://localhost:1000/api/admin/laptop/${editingLaptop}`, updatedLaptop);
//             setEditingLaptop(null);
//             fetchLaptops();
//             toast.success('Laptop updated successfully');
//         } catch (error) {
//             console.error('Error updating laptop:', error);
//             toast.error('Failed to update laptop');
//         }
//     };

//     // Filter functions
//     const filteredCustomers = (customers || []).filter(customer => {
//         if (!customer) return false;
//         const searchString = `${customer.firstname || ''} ${customer.lastname || ''} ${customer.email || ''} ${customer.phoneNumber || ''} ${customer.location || ''}`.toLowerCase();
//         return searchString.includes(searchTerm.customers.toLowerCase());
//     });

//     const filteredLaptops = (laptops || []).filter(laptop => {
//         if (!laptop) return false;
//         const userString = laptop.user ? `${laptop.user.firstname || ''} ${laptop.user.lastname || ''}` : '';
//         const searchString = `${userString} ${laptop.title || ''} ${laptop.description || ''} ${laptop.price || ''} ${laptop.phoneNumber || ''}`.toLowerCase();
//         return searchString.includes(searchTerm.laptops.toLowerCase());
//     });

//     return (
//         <div className="admin-page">
//             <h1 className="admin-title">Admin Dashboard</h1>

//             <div className="tabs">
//                 <button
//                     className={`tab-button ${activeTab === 'customers' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('customers')}
//                 >
//                     Customers
//                 </button>
//                 <button
//                     className={`tab-button ${activeTab === 'laptops' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('laptops')}
//                 >
//                     Laptops
//                 </button>
//             </div>

//             {activeTab === 'customers' && (
//                 <div className="management-section">
//                     <h2 className="section-title">Customer Management</h2>

//                     <div className="search-container">
//                         <input
//                             type="text"
//                             placeholder="Search customers..."
//                             value={searchTerm.customers}
//                             onChange={(e) => setSearchTerm(prev => ({ ...prev, customers: e.target.value }))}
//                             className="search-input"
//                         />
//                     </div>

//                     {loading.customers ? (
//                         <div className="loading-spinner">Loading customers...</div>
//                     ) : (
//                         <div className="table-container">
//                             <table className="data-table">
//                                 <thead>
//                                     <tr>
//                                         <th>First Name</th>
//                                         <th>Last Name</th>
//                                         <th>Email</th>
//                                         <th>Phone</th>
//                                         <th>Location</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredCustomers.length > 0 ? (
//                                         filteredCustomers.map(customer => (
//                                             <tr key={customer?._id || Math.random()}>
//                                                 {editingCustomer === customer?._id ? (
//                                                     <>
//                                                         <td>
//                                                             <input
//                                                                 type="text"
//                                                                 name="firstname"
//                                                                 value={editCustomerFormData.firstname}
//                                                                 onChange={handleEditCustomerFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="text"
//                                                                 name="lastname"
//                                                                 value={editCustomerFormData.lastname}
//                                                                 onChange={handleEditCustomerFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="email"
//                                                                 name="email"
//                                                                 value={editCustomerFormData.email}
//                                                                 onChange={handleEditCustomerFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="text"
//                                                                 name="phoneNumber"
//                                                                 value={editCustomerFormData.phoneNumber}
//                                                                 onChange={handleEditCustomerFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="text"
//                                                                 name="location"
//                                                                 value={editCustomerFormData.location}
//                                                                 onChange={handleEditCustomerFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td className="action-buttons">
//                                                             <button
//                                                                 onClick={handleEditCustomerFormSubmit}
//                                                                 className="save-button"
//                                                             >
//                                                                 Save
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => setEditingCustomer(null)}
//                                                                 className="cancel-button"
//                                                             >
//                                                                 Cancel
//                                                             </button>
//                                                         </td>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <td>{customer?.firstname || 'N/A'}</td>
//                                                         <td>{customer?.lastname || 'N/A'}</td>
//                                                         <td>{customer?.email || 'N/A'}</td>
//                                                         <td>{customer?.phoneNumber || 'N/A'}</td>
//                                                         <td>{customer?.location || 'N/A'}</td>
//                                                         <td className="action-buttons">
//                                                             <button
//                                                                 onClick={() => customer?._id && handleDeleteCustomer(customer._id)}
//                                                                 className="delete-button"
//                                                                 disabled={!customer?._id}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => customer && handleEditCustomerClick(customer)}
//                                                                 className="edit-button"
//                                                                 disabled={!customer}
//                                                             >
//                                                                 Edit
//                                                             </button>
//                                                         </td>
//                                                     </>
//                                                 )}
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="6" className="no-data">
//                                                 {customers.length === 0 ? 'No customers available' : 'No matching customers found'}
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {activeTab === 'laptops' && (
//                 <div className="management-section">
//                     <h2 className="section-title">Laptop Management</h2>

//                     <div className="search-container">
//                         <input
//                             type="text"
//                             placeholder="Search laptops..."
//                             value={searchTerm.laptops}
//                             onChange={(e) => setSearchTerm(prev => ({ ...prev, laptops: e.target.value }))}
//                             className="search-input"
//                         />
//                     </div>

//                     {loading.laptops ? (
//                         <div className="loading-spinner">Loading laptops...</div>
//                     ) : (
//                         <div className="table-container">
//                             <table className="data-table">
//                                 <thead>
//                                     <tr>
//                                         <th>User</th>
//                                         <th>Title</th>
//                                         <th>Description</th>
//                                         <th>Price</th>
//                                         <th>Phone</th>
//                                         <th>Images</th>
//                                         <th>Date</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredLaptops.length > 0 ? (
//                                         filteredLaptops.map(laptop => (
//                                             <tr key={laptop?._id || Math.random()}>
//                                                 {editingLaptop === laptop?._id ? (
//                                                     <>
//                                                         <td>
//                                                             <select
//                                                                 name="user"
//                                                                 value={editLaptopFormData.user}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-select"
//                                                             >
//                                                                 <option value="">Select User</option>
//                                                                 {customers.map(customer => (
//                                                                     <option key={customer._id} value={customer._id}>
//                                                                         {customer.firstname} {customer.lastname}
//                                                                     </option>
//                                                                 ))}
//                                                             </select>
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="text"
//                                                                 name="title"
//                                                                 value={editLaptopFormData.title}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <textarea
//                                                                 name="description"
//                                                                 value={editLaptopFormData.description}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-textarea"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="number"
//                                                                 name="price"
//                                                                 value={editLaptopFormData.price}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="text"
//                                                                 name="phoneNumber"
//                                                                 value={editLaptopFormData.phoneNumber}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <textarea
//                                                                 name="images"
//                                                                 value={editLaptopFormData.images}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-textarea"
//                                                                 placeholder="Enter image URLs separated by commas"
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <input
//                                                                 type="date"
//                                                                 name="date"
//                                                                 value={editLaptopFormData.date}
//                                                                 onChange={handleEditLaptopFormChange}
//                                                                 className="edit-input"
//                                                             />
//                                                         </td>
//                                                         <td className="action-buttons">
//                                                             <button
//                                                                 onClick={handleEditLaptopFormSubmit}
//                                                                 className="save-button"
//                                                             >
//                                                                 Save
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => setEditingLaptop(null)}
//                                                                 className="cancel-button"
//                                                             >
//                                                                 Cancel
//                                                             </button>
//                                                         </td>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <td>
//                                                             {laptop?.user ? `${laptop.user.firstname || ''} ${laptop.user.lastname || ''}` : 'N/A'}
//                                                         </td>
//                                                         <td>{laptop?.title || 'N/A'}</td>
//                                                         <td className="description-cell">{laptop?.description || 'N/A'}</td>
//                                                         <td>${laptop?.price || 'N/A'}</td>
//                                                         <td>{laptop?.phoneNumber || 'N/A'}</td>
//                                                         <td className="images-cell">
//                                                             {laptop?.images?.length > 0 ? (
//                                                                 <>
//                                                                     {laptop.images.slice(0, 2).map((img, i) => (
//                                                                         <a key={i} href={`http://localhost:1000/${img}`} target="_blank" rel="noopener noreferrer">
//                                                                             Image {i + 1}
//                                                                         </a>
//                                                                     ))}
//                                                                     {laptop.images.length > 2 && ` +${laptop.images.length - 2} more`}
//                                                                 </>
//                                                             ) : 'No images'}
//                                                         </td>
//                                                         <td>
//                                                             {laptop?.date ? new Date(laptop.date).toLocaleDateString() : 'N/A'}
//                                                         </td>
//                                                         <td className="action-buttons">
//                                                             <button
//                                                                 onClick={() => laptop?._id && handleDeleteLaptop(laptop._id)}
//                                                                 className="delete-button"
//                                                                 disabled={!laptop?._id}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => laptop && handleEditLaptopClick(laptop)}
//                                                                 className="edit-button"
//                                                                 disabled={!laptop}
//                                                             >
//                                                                 Edit
//                                                             </button>
//                                                         </td>
//                                                     </>
//                                                 )}
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="8" className="no-data">
//                                                 {laptops.length === 0 ? 'No laptops available' : 'No matching laptops found'}
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             )}


//             {reportData && (
//           <div>
//           <h3>Customer Registration</h3>
//           <p>Today: {reportData.customers ? reportData.customers.today : 'Loading...'}</p>
//           <p>This Week: {reportData.customers ? reportData.customers.thisWeek : 'Loading...'}</p>
//           <p>This Month: {reportData.customers ? reportData.customers.thisMonth : 'Loading...'}</p>
      
//           <h3>Purchases</h3>
//           <p>Today: {reportData.purchases ? reportData.purchases.today : 'Loading...'}</p>
//           <p>This Week: {reportData.purchases ? reportData.purchases.thisWeek : 'Loading...'}</p>
//           <p>This Month: {reportData.purchases ? reportData.purchases.thisMonth : 'Loading...'}</p>
//       </div>
      
//             )}
//         </div>
//     );
// };

// export default AdminPage;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPage.css';

const AdminPage = () => {
    // State initialization
    const [customers, setCustomers] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState({
        customers: true,
        laptops: true,
        report: true
    });
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editingLaptop, setEditingLaptop] = useState(null);
    const [editCustomerFormData, setEditCustomerFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        location: ''
    });
    const [editLaptopFormData, setEditLaptopFormData] = useState({
        user: '',
        title: '',
        description: '',
        price: '',
        phoneNumber: '',
        images: '',
        date: ''
    });
    const [searchTerm, setSearchTerm] = useState({
        customers: '',
        laptops: ''
    });
    const [activeTab, setActiveTab] = useState('dashboard');
    const [reportData, setReportData] = useState({
        customers: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 },
        purchases: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 }
    });

    useEffect(() => {
        fetchCustomers();
        fetchLaptops();
        fetchReportData();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(prev => ({ ...prev, customers: true }));
            const response = await axios.get('http://localhost:1000/api/admin/AllCustomer');
            setCustomers(response.data.students || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
            toast.error('Failed to load customers');
            setCustomers([]);
        } finally {
            setLoading(prev => ({ ...prev, customers: false }));
        }
    };

    const fetchLaptops = async () => {
        try {
            setLoading(prev => ({ ...prev, laptops: true }));
            const response = await axios.get('http://localhost:1000/api/admin/Alllaptops');
            setLaptops(response.data.laptops || []);
        } catch (error) {
            console.error('Error fetching laptops:', error);
            toast.error('Failed to load laptops');
            setLaptops([]);
        } finally {
            setLoading(prev => ({ ...prev, laptops: false }));
        }
    };

    const fetchReportData = async () => {
        try {
            setLoading(prev => ({ ...prev, report: true }));
            const response = await axios.get('http://localhost:1000/api/admin/report');
            setReportData(response.data || {
                customers: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 },
                purchases: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 }
            });
        } catch (error) {
            console.error('Error fetching report:', error);
            toast.error('Failed to load report data');
        } finally {
            setLoading(prev => ({ ...prev, report: false }));
        }
    };

    // Customer Management Functions
    const handleDeleteCustomer = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:1000/api/admin/AllCustomer/${id}`);
                fetchCustomers();
                fetchReportData(); // Refresh report after deletion
                toast.success('Customer deleted successfully');
            } catch (error) {
                console.error('Error deleting customer:', error);
                toast.error('Failed to delete customer');
            }
        }
    };

    const handleEditCustomerClick = (customer) => {
        setEditingCustomer(customer._id);
        setEditCustomerFormData({
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            location: customer.location
        });
    };

    const handleEditCustomerFormChange = (e) => {
        const { name, value } = e.target;
        setEditCustomerFormData({
            ...editCustomerFormData,
            [name]: value
        });
    };

    const handleEditCustomerFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1000/api/admin/user/${editingCustomer}`, editCustomerFormData);
            setEditingCustomer(null);
            fetchCustomers();
            toast.success('Customer updated successfully');
        } catch (error) {
            console.error('Error updating customer:', error);
            toast.error('Failed to update customer');
        }
    };

    // Laptop Management Functions
    const handleDeleteLaptop = async (id) => {
        if (window.confirm('Are you sure you want to delete this laptop?')) {
            try {
                await axios.delete(`http://localhost:1000/api/admin/AllLaptops/${id}`);
                fetchLaptops();
                fetchReportData(); // Refresh report after deletion
                toast.success('Laptop deleted successfully');
            } catch (error) {
                console.error('Error deleting laptop:', error);
                toast.error('Failed to delete laptop');
            }
        }
    };

    const handleEditLaptopClick = (laptop) => {
        setEditingLaptop(laptop._id);
        setEditLaptopFormData({
            user: laptop.user?._id || '',
            title: laptop.title,
            description: laptop.description,
            price: laptop.price,
            phoneNumber: laptop.phoneNumber,
            images: laptop.images?.join(', ') || '',
            date: laptop.date ? new Date(laptop.date).toISOString().split('T')[0] : ''
        });
    };

    const handleEditLaptopFormChange = (e) => {
        const { name, value } = e.target;
        setEditLaptopFormData({
            ...editLaptopFormData,
            [name]: value
        });
    };

    const handleEditLaptopFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedLaptop = {
                ...editLaptopFormData,
                images: editLaptopFormData.images.split(',').map(image => image.trim()),
                price: Number(editLaptopFormData.price)
            };
            await axios.put(`http://localhost:1000/api/admin/laptop/${editingLaptop}`, updatedLaptop);
            setEditingLaptop(null);
            fetchLaptops();
            toast.success('Laptop updated successfully');
        } catch (error) {
            console.error('Error updating laptop:', error);
            toast.error('Failed to update laptop');
        }
    };

    // Filter functions
    const filteredCustomers = (customers || []).filter(customer => {
        if (!customer) return false;
        const searchString = `${customer.firstname || ''} ${customer.lastname || ''} ${customer.email || ''} ${customer.phoneNumber || ''} ${customer.location || ''}`.toLowerCase();
        return searchString.includes(searchTerm.customers.toLowerCase());
    });

    const filteredLaptops = (laptops || []).filter(laptop => {
        if (!laptop) return false;
        const userString = laptop.user ? `${laptop.user.firstname || ''} ${laptop.user.lastname || ''}` : '';
        const searchString = `${userString} ${laptop.title || ''} ${laptop.description || ''} ${laptop.price || ''} ${laptop.phoneNumber || ''}`.toLowerCase();
        return searchString.includes(searchTerm.laptops.toLowerCase());
    });

    return (
        <div className="admin-page">
            <h1 className="admin-title">Admin Dashboard</h1>
            
            <div className="tabs">
                <button 
                    className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={`tab-button ${activeTab === 'customers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('customers')}
                >
                    Customers
                </button>
                <button 
                    className={`tab-button ${activeTab === 'laptops' ? 'active' : ''}`}
                    onClick={() => setActiveTab('laptops')}
                >
                    Laptops
                </button>
            </div>

            {activeTab === 'dashboard' && (
                <div className="dashboard-section">
                    <h2 className="section-title">Statistics Overview</h2>
                    
                    {loading.report ? (
                        <div className="loading-spinner">Loading report data...</div>
                    ) : (
                        <div className="stats-container">
                            <div className="stat-card">
                                <h3>Customer Registrations</h3>
                                <div className="stat-grid">
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.customers.today}</span>
                                        <span className="stat-label">Today</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.customers.thisWeek}</span>
                                        <span className="stat-label">This Week</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.customers.thisMonth}</span>
                                        <span className="stat-label">This Month</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.customers.total}</span>
                                        <span className="stat-label">Total</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="stat-card">
                                <h3>Laptop Purchases</h3>
                                <div className="stat-grid">
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.purchases.today}</span>
                                        <span className="stat-label">Today</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.purchases.thisWeek}</span>
                                        <span className="stat-label">This Week</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.purchases.thisMonth}</span>
                                        <span className="stat-label">This Month</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">{reportData.purchases.total}</span>
                                        <span className="stat-label">Total</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'customers' && (
                <div className="management-section">
                    <h2 className="section-title">Customer Management</h2>
                    
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm.customers}
                            onChange={(e) => setSearchTerm(prev => ({ ...prev, customers: e.target.value }))}
                            className="search-input"
                        />
                    </div>
                    
                    {loading.customers ? (
                        <div className="loading-spinner">Loading customers...</div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Location</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map(customer => (
                                            <tr key={customer?._id || Math.random()}>
                                                {editingCustomer === customer?._id ? (
                                                    <>
                                                        <td>
                                                            <input 
                                                                type="text" 
                                                                name="firstname" 
                                                                value={editCustomerFormData.firstname} 
                                                                onChange={handleEditCustomerFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="text" 
                                                                name="lastname" 
                                                                value={editCustomerFormData.lastname} 
                                                                onChange={handleEditCustomerFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="email" 
                                                                name="email" 
                                                                value={editCustomerFormData.email} 
                                                                onChange={handleEditCustomerFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="text" 
                                                                name="phoneNumber" 
                                                                value={editCustomerFormData.phoneNumber} 
                                                                onChange={handleEditCustomerFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="text" 
                                                                name="location" 
                                                                value={editCustomerFormData.location} 
                                                                onChange={handleEditCustomerFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td className="action-buttons">
                                                            <button 
                                                                onClick={handleEditCustomerFormSubmit}
                                                                className="save-button"
                                                            >
                                                                Save
                                                            </button>
                                                            <button 
                                                                onClick={() => setEditingCustomer(null)}
                                                                className="cancel-button"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{customer?.firstname || 'N/A'}</td>
                                                        <td>{customer?.lastname || 'N/A'}</td>
                                                        <td>{customer?.email || 'N/A'}</td>
                                                        <td>{customer?.phoneNumber || 'N/A'}</td>
                                                        <td>{customer?.location || 'N/A'}</td>
                                                        <td className="action-buttons">
                                                            <button 
                                                                onClick={() => customer?._id && handleDeleteCustomer(customer._id)}
                                                                className="delete-button"
                                                                disabled={!customer?._id}
                                                            >
                                                                Delete
                                                            </button>
                                                            <button 
                                                                onClick={() => customer && handleEditCustomerClick(customer)}
                                                                className="edit-button"
                                                                disabled={!customer}
                                                            >
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="no-data">
                                                {customers.length === 0 ? 'No customers available' : 'No matching customers found'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'laptops' && (
                <div className="management-section">
                    <h2 className="section-title">Laptop Management</h2>
                    
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search laptops..."
                            value={searchTerm.laptops}
                            onChange={(e) => setSearchTerm(prev => ({ ...prev, laptops: e.target.value }))}
                            className="search-input"
                        />
                    </div>
                    
                    {loading.laptops ? (
                        <div className="loading-spinner">Loading laptops...</div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Phone</th>
                                        <th>Images</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLaptops.length > 0 ? (
                                        filteredLaptops.map(laptop => (
                                            <tr key={laptop?._id || Math.random()}>
                                                {editingLaptop === laptop?._id ? (
                                                    <>
                                                        <td>
                                                            <select
                                                                name="user"
                                                                value={editLaptopFormData.user}
                                                                onChange={handleEditLaptopFormChange}
                                                                className="edit-select"
                                                            >
                                                                <option value="">Select User</option>
                                                                {customers.map(customer => (
                                                                    <option key={customer._id} value={customer._id}>
                                                                        {customer.firstname} {customer.lastname}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="text" 
                                                                name="title" 
                                                                value={editLaptopFormData.title} 
                                                                onChange={handleEditLaptopFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <textarea 
                                                                name="description" 
                                                                value={editLaptopFormData.description} 
                                                                onChange={handleEditLaptopFormChange} 
                                                                className="edit-textarea"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="number" 
                                                                name="price" 
                                                                value={editLaptopFormData.price} 
                                                                onChange={handleEditLaptopFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="text" 
                                                                name="phoneNumber" 
                                                                value={editLaptopFormData.phoneNumber} 
                                                                onChange={handleEditLaptopFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td>
                                                            <textarea 
                                                                name="images" 
                                                                value={editLaptopFormData.images} 
                                                                onChange={handleEditLaptopFormChange} 
                                                                className="edit-textarea"
                                                                placeholder="Enter image URLs separated by commas"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                type="date" 
                                                                name="date" 
                                                                value={editLaptopFormData.date} 
                                                                onChange={handleEditLaptopFormChange} 
                                                                className="edit-input"
                                                            />
                                                        </td>
                                                        <td className="action-buttons">
                                                            <button 
                                                                onClick={handleEditLaptopFormSubmit}
                                                                className="save-button"
                                                            >
                                                                Save
                                                            </button>
                                                            <button 
                                                                onClick={() => setEditingLaptop(null)}
                                                                className="cancel-button"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>
                                                            {laptop?.user ? `${laptop.user.firstname || ''} ${laptop.user.lastname || ''}` : 'N/A'}
                                                        </td>
                                                        <td>{laptop?.title || 'N/A'}</td>
                                                        <td className="description-cell">{laptop?.description || 'N/A'}</td>
                                                        <td>${laptop?.price || 'N/A'}</td>
                                                        <td>{laptop?.phoneNumber || 'N/A'}</td>
                                                        <td className="images-cell">
                                                            {laptop?.images?.length > 0 ? (
                                                                <>
                                                                    {laptop.images.slice(0, 2).map((img, i) => (
                                                                        <a key={i} href={`http://localhost:1000/${img}`} target="_blank" rel="noopener noreferrer">
                                                                            Image {i+1}
                                                                        </a>
                                                                    ))}
                                                                    {laptop.images.length > 2 && ` +${laptop.images.length - 2} more`}
                                                                </>
                                                            ) : 'No images'}
                                                        </td>
                                                        <td>
                                                            {laptop?.date ? new Date(laptop.date).toLocaleDateString() : 'N/A'}
                                                        </td>
                                                        <td className="action-buttons">
                                                            <button 
                                                                onClick={() => laptop?._id && handleDeleteLaptop(laptop._id)}
                                                                className="delete-button"
                                                                disabled={!laptop?._id}
                                                            >
                                                                Delete
                                                            </button>
                                                            <button 
                                                                onClick={() => laptop && handleEditLaptopClick(laptop)}
                                                                className="edit-button"
                                                                disabled={!laptop}
                                                            >
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="no-data">
                                                {laptops.length === 0 ? 'No laptops available' : 'No matching laptops found'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;