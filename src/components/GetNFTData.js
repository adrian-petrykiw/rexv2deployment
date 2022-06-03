import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import React, { useState, useEffect } from 'react';
const axios = require('axios');




function GetNFTData(inputAddress) {

  const { nft } = useMoralisSolanaApi();

  // get devnet SPL NFT metadata for a given address
  const options = {
    network: "mainnet",
    address: inputAddress,
  };
  const { fetch, data, isLoading } = useMoralisSolanaCall(
    nft.getNFTMetadata,
    options,
    { autoFetch: true }

  );

  const [theMetaDataUri, setTheMetaDataUri] = useState("");
  const [imageNFT, setImageNFT] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchImage = async () => {
    setLoading(true);
    if (theMetaDataUri !== "Moralis API call failed") {
      try {
        const removed = theMetaDataUri.replaceAll('"', '');

        const data = await axios(removed)
          .then((res) => res.data)
          .catch(console.error)

        const { image: imageUrl } = data

        console.log(data)
        setImageNFT(imageUrl);
        console.log("Your image is " + imageUrl);

        // image data
        const image2 = await axios(imageUrl)
          .then((res) => res.data)
          .catch(console.error)


      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        console.log(theMetaDataUri)

        const data3 = await axios("https://metadata.degods.com/g/8205.json")
          .then((res) => res.data)
          .catch(console.error)

        const { image: imageUrl } = data3

        console.log(data3)
        setImageNFT(imageUrl);
        console.log("Your image is " + imageUrl);

        // image data
        const image2 = await axios(imageUrl)
          .then((res) => res.data)
          .catch(console.error)


      } catch (error) {
        console.log("error", error);
      }
    }

    setLoading(false);
  };

  const fetchData = async () => {
    if (data != null) {
      setTheMetaDataUri(JSON.stringify(data.metaplex.metadataUri, null, 2));
    } else {
      setTheMetaDataUri("Moralis API call failed");
    }
  };

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    fetchImage(theMetaDataUri);
  });



  return imageNFT;
}

export default GetNFTData;