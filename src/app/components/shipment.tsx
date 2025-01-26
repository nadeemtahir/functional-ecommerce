import React, { useState } from "react";

const ShipEngine = () => {
  const [shippingRates, setShippingRates] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchShippingRates = async () => {
    setLoading(true); // Set loading state to true while fetching
    try {
      const response = await fetch("/api/shipengine/get-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipToAddress: {
            name: "Michael Smith",
            phone: "+1 555 987 6543",
            addressLine1: "456 Oak Avenue",
            addressLine2: "Suite 200",
            cityLocality: "Los Angeles",
            stateProvince: "CA",
            postalCode: "90001",
            countryCode: "US",
            addressResidentialIndicator: "no",
          },
          packages: [
            {
              weight: { value: 5, unit: "ounce" },
              dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
            },
          ],
        }),
      });

      const data = await response.json();
      setShippingRates(data); // Store the returned data
      console.log(data); // Log the response data for debugging
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
    } finally {
      setLoading(false); // Set loading state to false once the request is complete
    }
  };

  return (
    <div>
      <h2>Shipping Rates</h2>
      <button onClick={fetchShippingRates} disabled={loading}>
        {loading ? "Loading..." : "Get Shipping Rates"}
      </button>

      {/* Display the shipping rates if available */}
      {shippingRates && (
        <pre>{JSON.stringify(shippingRates, null, 2)}</pre>
      )}
    </div>
  );
};

export default ShipEngine;