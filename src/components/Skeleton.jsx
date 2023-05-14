import React from "react";

export default function Skeleton(props) {
  const total = props.row;
  const skeletonRows = Array.from({ length: props.rows }).map((_, index) => (
    <div key={index} className="w-full h-5 my-2 bg-slate-100 rounded"></div>
  ));
  return (
    <>
      <div className="w-1/4 h-5 my-2 bg-slate-100 rounded"></div>
      {skeletonRows}
      <div className="w-3/5 h-5 my-2 bg-slate-100 rounded"></div>
    </>
  );
}
