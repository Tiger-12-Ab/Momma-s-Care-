import React from 'react';


import PregnancyProgress from './../components/PregnancyProgress';
import PersonalLogs from './../components/PersonalLogs';

function PregnancyTracker () {
  

  return (
    <div className="bg-ivory min-h-screen">
      <PregnancyProgress />
      <PersonalLogs />
      

    </div>
  );
}

export default PregnancyTracker ;