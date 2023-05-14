import React from "react";
import ProductUpload from "./ProductUpload";

export default function ProductDetail(props) {
    function handleSuccessUpload(values) {
        if(values == true) {
            props.onReloadProduct(true)
        }
    }
  return (
    <div>
      <div className="flex">
        <div className="flex-none w-1/3 pr-6">
          <div className="w-28 h-28 m-auto bg-indigo-500 rounded">
          {props.product_selected.image === null ? "" : (<img src={props.product_selected.image.image_url} />)}
          </div>
            <ProductUpload product_selected={props.product_selected} onSuccessUpload={handleSuccessUpload}/>
        </div>
        <div className="flex-initial w-1/2 text-left pl-6 text-slate-600">
          <h2 className="text-lg mb-4">
            <b>{props.product_selected.product_name}</b>
          </h2>
          <div>
            {props.product_selected.discount !== null ? (
              <div>
                <s className="text-red-400">
                  {props.product_selected.display_price}
                </s>
              </div>
            ) : null}
            {props.product_selected.display_sales_price}
          </div>
          <div className="my-4 text-sm">
            Dimension:<br /><b>{props.product_selected.dimension}</b><br />
            Unit: <b>{props.product_selected.unit}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
