"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



const TicketForm = () => {
    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware problem",
    };

    const handleSubmit = async (e) => {
        // console.log(formData);
        e.preventDefault();
        const res = await fetch("http://localhost:8080/tickets", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
        })

        if(!res.ok) {
            throw new Error("Failed to create ticket");
        }

        router.refresh();
        router.push("/");
        
    };


    const [formData, setFormData] = useState(startingTicketData);

    return (
        <div className='flex justify-center'>
            <form className='flex flex-col gap-3 w-1/2' method='post' onSubmit={handleSubmit}><h3>Create Youy Ticket</h3>
                <label>Title</label>
                <input id="title" type="text" name="title" onChange={handleChange} required={true} value={formData.title} />

                <label>Description</label>
                <textarea id="description" type="text" name="description" onChange={handleChange} required={true} value={formData.description} rows="5" />

                <label>Category</label>
                <select id="category" name="category" onChange={handleChange} value={formData.category} required={true}>
                    <option value="Hardware problem">Hardware problem</option>
                    <option value="Software problem">Software problem</option>
                    <option value="Network problem">Network problem</option>
                    <option value="Other">Other</option>
                </select>

                <label>Priority</label>
                <div>
                    <input id="priority-1" type="radio" name="priority" onChange={handleChange} value={1} checked={formData.priority == 1} />
                    <label>1</label>

                    <input id="priority-2" type="radio" name="priority" onChange={handleChange} value={2} checked={formData.priority == 2} />
                    <label>2</label>

                    <input id="priority-3" type="radio" name="priority" onChange={handleChange} value={3} checked={formData.priority == 3} />
                    <label>3</label>

                    <input id="priority-4" type="radio" name="priority" onChange={handleChange} value={4} checked={formData.priority == 4} />
                    <label>4</label>

                    <input id="priority-5" type="radio" name="priority" onChange={handleChange} value={5} checked={formData.priority == 5} />
                    <label>5</label>
                </div>

                <label>Progress</label>
                <input type='range' id='progress' name='progress' value={formData.progress} min="0" max="100" onChange={handleChange} />

                <label>Status</label>
                <select id="status" name="status" onChange={handleChange} value={formData.status} required={true}>
                    <option value="not started">not started</option>
                    <option value="in progress">in progress</option>
                    <option value="completed">completed</option>
                </select>

                <input type="submit" className='btn' value="Create Ticket" />

            </form>
        </div>
    );

}

export default TicketForm;