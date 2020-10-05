import { useCallback } from "react";

const useFetchBinding = (identifier: string) => {
  const callback = useCallback(async () => {
    try {
      const url = process.env.REACT_APP_ENDPOINT + "/createrequest";
      console.log("url: ", url);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          app_id: process.env.REACT_APP_APP_ID,
          identifier: identifier,
          mac_key: process.env.REACT_APP_MAC_KEY,
        }),
      });
      const data = await res.json();
      return {
        data,
      };
    } catch (err) {
      console.log(err);
      //setError(err);
      return { error: err };
    }
  }, [identifier]);

  return { callback };
};

export default useFetchBinding;
