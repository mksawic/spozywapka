const useDistance = () => {
  const R = 6371;
  const calculateDistance = (geo1, geo2) => {
    const dLat = deg2rad(geo2.latitude - geo1.latitude);
    const dLon = deg2rad(geo2.longitude - geo1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(geo1.latitude)) *
        Math.cos(deg2rad(geo2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  return calculateDistance;
};

const deg2rad = (deg) => deg * (Math.PI / 180);
export default useDistance;
