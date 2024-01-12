import Product from "@/pages/products/[productId]";

const Accordion = () => {
  return (
    <div className="w-full">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. [...]</p>
      <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
        Expires in days: {product.expiresInDays}
      </div>
      <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
        Important: {product.important ? "yes" : "no"}
      </div>
    </div>
  );
};

export { Accordion };
