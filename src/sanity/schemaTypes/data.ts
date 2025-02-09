const orderSchema = {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    { name: "customerName", type: "string", title: "Customer Name" },
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule: any) => Rule.email(),
    },
    { name: "phone", type: "string", title: "Phone Number" },
    { name: "address", type: "string", title: "Address" },
    { name: "city", type: "string", title: "City" },
    { name: "zip", type: "string", title: "Zip Code" },
    {
      name: "paymentMethod",
      type: "string",
      title: "Payment Method",
      options: {
        list: [
          { title: "Credit Card", value: "Credit Card" },
          { title: "PayPal", value: "PayPal" },
          { title: "Bank Transfer", value: "Bank Transfer" },
        ],
      },
    },
    {
      name: "orderStatus",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    },
    {
      name: "items",
      type: "array",
      title: "Order Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", type: "string", title: "Product ID" },
            { name: "name", type: "string", title: "Product Name" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" },
          ],
        },
      ],
    },
    { name: "createdAt", type: "datetime", title: "Created At" }, // ✅ Store timestamp
  ],
};

export default orderSchema;
