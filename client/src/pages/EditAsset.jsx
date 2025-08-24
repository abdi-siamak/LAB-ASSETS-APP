import { useState, useEffect } from 'react';
import { getAsset,  updateAsset} from '../api.js';
import { useNavigate, useParams } from 'react-router-dom';
import AssetForm from '../components/AssetForm.jsx';

export default function EditAsset() {
    const { id } = useParams();
    const nav = useNavigate();
    const [initial, setInitial] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getAsset(id).then(setInitial).catch(() => setInitial(null)); // .then((result) => setInitial(result))
    },[id]);

    async function handleSubmit(form) {
        setSubmitting(true);
        try {
            await updateAsset(id, form);
            alert('Asset updated successfully!');
            nav('/')
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    }

    if (!initial) return <p>loading...</p>

    return (
        <> 
          <h2>Edit Asset</h2>
          <AssetForm initial={initial} onSubmit={handleSubmit} submitting={submitting} />
        </>
    );
}

//<></> = <React.Fragment> </React.Fragment>