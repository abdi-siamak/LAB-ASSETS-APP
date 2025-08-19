import { useState, useEffect } from 'react';
import { getAsset,  updateAsset} from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import AssetForm from '../components/AssetForm';

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
            nav('/')
        } finally {
            setSubmitting(false);
        }
    }

    if (!initial) return <p>loading...</p>

    return (
        <> 
          <h2>Edit Asset</h2>
          <AssetForm initial={initial} onSubmit={handleSubmit} sunmitting={submitting} />
        </>
    );
}

//<></> = <React.Fragment> </React.Fragment>