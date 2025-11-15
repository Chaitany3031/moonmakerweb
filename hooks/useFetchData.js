const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndpoint) {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint)
        const allData = res.data
        setAllData(allData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };
    if(apiEndpoint){
        fetchAllData()
    }
  }, [initialLoad,apiEndpoint]);

  return {allData,loading}
}
export default useFetchData