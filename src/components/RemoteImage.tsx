import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setImage(fallback);
      return;
    }

    // const fetchImage = async () => {
    //   setImage(null); // Reset image on each new path load
    //   const { data, error } = await supabase.storage
    //     .from('products-images')
    //     .download(path);

    //   if (error) {
    //     console.error("Error downloading image:", error.message);
    //     setImage(fallback); // Fallback in case of error
    //     return;
    //   }

    //   if (data) {
    //     const fr = new FileReader();
    //     fr.readAsDataURL(data);
    //     fr.onload = () => {
    //       setImage(fr.result as string);
    //     };
    //   }

    //   //console.log("Supabase response:", { data, error });
    // };

    const fetchImage = async () => {
      try {
        // Generate a signed URL for the image
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from('products-images')
          .createSignedUrl(path, 60); // URL valid for 60 seconds
    
        if (signedUrlError || !signedUrlData) {
          console.error("Error creating signed URL:", signedUrlError?.message);
          setImage(fallback); // Use fallback image on error
          return;
        }
    
        // Append transform query parameters to the signed URL
        const transformUrl = `${signedUrlData.signedUrl}&width=50&height=50`;
    
        // Fetch the resized image
        const response = await fetch(transformUrl);
        if (!response.ok) {
          console.error("Error fetching transformed image:", response.statusText);
          setImage(fallback); // Use fallback image on fetch error
          return;
        }
    
        // Convert the fetched image to a Base64 data URL
        const blob = await response.blob();
        const fr = new FileReader();
        fr.readAsDataURL(blob);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      } catch (error) {
        console.error("Unexpected error:", error);
        setImage(fallback); // Use fallback image on unexpected error
      }
    };
    

    fetchImage();

    // console.log("Image path:", path);
    // console.log("Fallback:", fallback);
   
  }, [path, fallback]);

       

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
