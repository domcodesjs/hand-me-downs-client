import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API_URL } from '../../config';

const SluglessListing = () => {
  let { listingId } = useParams();
  let history = useHistory();

  useEffect(() => {
    const checkListing = async () => {
      try {
        const res = await fetch(`${API_URL}/listings/check/${listingId}`);
        const data = await res.json();

        if (!data.success) {
          return history.push('/404');
        }

        return history.push(`/listing/${data.listing.id}/${data.listing.slug}`);
      } catch (err) {
        return history.push('/404');
      }
    };
    checkListing();
  }, [listingId, history]);

  return null;
};

export default SluglessListing;
