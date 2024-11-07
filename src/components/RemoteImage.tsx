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

    const fetchImage = async () => {
      setImage(null); // Reset image on each new path load
      const { data, error } = await supabase.storage
        .from('products-images')
        .download(path);

      if (error) {
        console.error("Error downloading image:", error.message);
        setImage(fallback); // Fallback in case of error
        return;
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    };

    fetchImage();
  }, [path, fallback]);

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
