import React from "react";

const Unauthorized = () => {
  return (
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
  <h1>401 Unauthorized</h1>
  <p>You do not have the necessary permissions to view this page.</p>
</div>
  );
};

export default Unauthorized;
