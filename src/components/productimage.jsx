import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductImage = ({ productId="64c7acd854e66c3f554f2933" }) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Fetch the image URL from the server
    axios
      .get(`/api/v1/products/${productId}`)
      .then((response) => {
        console.log(response.data.imageFile);
        setImageURL(response.data.imageFile);
      })
      .catch((error) => {
        console.error('Error fetching the image URL:', error);
      });
  }, [productId]);

  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt="Product" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ProductImage;



