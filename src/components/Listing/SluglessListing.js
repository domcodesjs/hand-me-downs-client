import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const SluglessListing = () => {
  let { listingId } = useParams();
  let history = useHistory();

  useEffect(() => {
    const checkListing = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/listings/check/${listingId}`
        );
        const data = await res.json();

        if (!data.success) {
          return history.push('/404');
        }

        return history.push(
          `/listing/${data.listing.uid}/${data.listing.slug}`
        );
      } catch (err) {
        return history.push('/404');
      }
    };
    checkListing();
  }, [listingId, history]);

  return null;
};

export default SluglessListing;
