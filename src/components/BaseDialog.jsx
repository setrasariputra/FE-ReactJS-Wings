import React from "react";

export default function BaseDialog(props) {
  const { children, title } = props;

  function handleCloseDialog() {
    const close = true;
    props.onCloseDialog(close);
  }

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen fixed inset-0 z-50 overflow-auto 
    transition ease-in-out duration-700 bg-blue-950/50"
      >
        <div className="block w-1/3 xs:w-full sm:w-full md:w-1/2 lg:w-1/3 bg-white border border-inherit rounded p-6">
          <div className="flex">
            <div className="flex-none w-1/2">
              <h2 className="text-xl mb-6">{title}</h2>
            </div>
            <div className="flex-initial w-1/2 text-right">
              <a href="#" onClick={handleCloseDialog}>
                X
              </a>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
