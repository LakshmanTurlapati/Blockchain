import React from "react";
import { AssignProvider } from "./assign";
import { DoctorProvider } from "./doctor";
import { HealthProvider } from "./health";
import { MonitorProvider } from "./monitor";
import { PatientProvider } from "./patient";

function Index({ children }) {
  return (
    <HealthProvider>
      <MonitorProvider>
        <AssignProvider>
          <DoctorProvider>
            <PatientProvider>{children}</PatientProvider>
          </DoctorProvider>
        </AssignProvider>
      </MonitorProvider>
    </HealthProvider>
  );
}

export default Index;
