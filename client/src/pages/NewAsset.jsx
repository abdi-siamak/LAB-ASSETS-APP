import { useState } from 'react';
import { createAsset } from '../api';
import { useNavigate } from 'react-router-dom';
import AssetForm from '../components/AssetForm';

export default function NewAsset() {
    const nav = useNavigate();//A React Router hook that gives a function to programmatically navigate between routes in your app.
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(form) {
        setSubmitting(false);
        try {
            await createAsset(form);
            nav('/');
        } finally {
            setSubmitting(false);
        }
    }

    return ( //fragment: It will render only <h2> and <AssetForm> in the DOM — no extra wrapper <div>
        <> 
          <h2>New Asset</h2>
          <AssetForm onSubmit={handleSubmit} submitting={submitting} />
        </>
    );
}
           
