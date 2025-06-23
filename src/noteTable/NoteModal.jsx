import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, fetchUsersUpdate } from '../redux/slices/Userslice';

const NoteModal = ({ isOpen, onClose, userToEdit }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.users || {});
    const [formData, setFormData] = useState({
        id: Date.now(),
        name: '',
        address: '',
        mobileNo: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    // Populate form when editing
    useEffect(() => {
        if (userToEdit) {
            setFormData({
                _id: userToEdit._id || userToEdit.id || '',
                name: userToEdit.name || '',
                address: userToEdit.address || '',
                mobileNo: userToEdit.mobileNo || '',
                email: userToEdit.email || ''
            });
        } else {
            setFormData({
                id: Date.now(),
                name: '',
                address: '',
                mobileNo: '',
                email: ''
            });
        }
    }, [userToEdit, isOpen]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        
        if (!formData.mobileNo) {
            newErrors.mobileNo = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = 'Invalid mobile number';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (userToEdit) {
                    await dispatch(fetchUsersUpdate(formData)).unwrap();
                } else {
                    const { _id, id, ...newUserData } = formData;
                    await dispatch(saveUser(newUserData)).unwrap();
                }
                setFormData({
                    id: Date.now(),
                    name: '',
                    address: '',
                    mobileNo: '',
                    email: ''
                });
                onClose();
            } catch (error) {
                setErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Failed to save data'
                }));
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 bg-[#2a2e57] flex items-center justify-center">
            <div className="bg-[#113a7d] rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{userToEdit ? 'Edit Note' : 'Add New Note'}</h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-700 text-2xl font-bold"
                    >×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            className={`w-full p-2 border rounded text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Address</label>
                        <input
                            className={`w-full p-2 border rounded text-black ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Mobile Number</label>
                        <input
                            type="number"
                            className={`w-full p-2 border rounded text-black ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.mobileNo}
                            onChange={(e) => setFormData({...formData, mobileNo: e.target.value})}
                        />
                        {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border rounded text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-black bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                        >
                            {userToEdit ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
