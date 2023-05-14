import React from "react";

export default function BaseAlert(props) {
  return (
    <div className="bg-red-100 text-red-400 px-4 py-2 text-sm rounded">
      {props.message}
    </div>
  );
}
