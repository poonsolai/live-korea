import React from "react";

const Loading = ({val}) => {
  return (

      <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
        <div className="spinner-border text-primary spinner-border-sm" role="status">
        </div>
        <span className="ms-2 text-primary">{val} Loading...</span>
      </div>

  );
};

export default Loading;
