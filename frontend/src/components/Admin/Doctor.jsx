import React from "react";
import HomeContainer from "../HomeContainer";

function Doctor() {
  return (
    <HomeContainer>
      <h3>Add A Doctor</h3>
      <form>
        <input type={"name"} name="doctorName" />
      </form>
    </HomeContainer>
  );
}

export default Doctor;
