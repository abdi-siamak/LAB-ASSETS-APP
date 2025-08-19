import { useState, useEffect } from 'react';

export default function AssetForm({ initial=null, onSubmit, submitting }) {
    const [form, setForm] = useState({
        name: '',
        type: 'equipment',
        location: '',
        status: 'available',
        notes: ''
    });

    useEffect(() => {
        // code runs after render
        if (initial) setForm(prev => ({ ...prev, ...initial })) //form gets pre-filled
    }), [initial] //tells React when to re-run it.

    function handleChange(e) { // e: event object passed to the handler whenever the user types in an input or textarea.
        const { name, value } = e.target; // e.target: is the element that triggered the event (the specific input).
        setForm(f => ({ ...f, [name]:value})); //updates only the field that changed.|... denotes an object
    }

    function handleSubmit(e) {
        e.preventDefault;
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="available">available</option>
              <option value="checked-out">checked-out</option>
              <option value="maintenance">maintenance</option>
            </select>
            <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
            <button disabled={submitting}>{submitting ? "Saving..." : "Save"}</button>
        </form>
    );
    //disabled={submitting} → prevents multiple submissions while waiting for server response
}