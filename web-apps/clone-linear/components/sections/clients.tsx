import React from 'react';
import { AlanLogo } from "../logos/alan";
import { ArcLogo } from "../logos/arc";
import { CashAppLogo } from "../logos/cashapp";
import { DescriptLogo } from "../logos/descript";
import { LoomLogo } from "../logos/loom";
import { MercuryLogo } from "../logos/mercury";
import { OpenSeaLogo } from "../logos/opensea";
import { PitchLogo } from "../logos/pitch";
import { RampLogo } from "../logos/ramp";
import { RaycastLogo } from "../logos/raycast";
import { RetoolLogo } from "../logos/retool";
import { VercelLogo } from "../logos/vercel";

const Clients = () => {
  return (
    <>
      <p className='mb-12 text-lg text-center md:text-xl'>
        <span className='text-primary-text'>Powering the world’s best product teams.</span>
        <br className='hidden md:block' /> From next-gen startups to established enterprises.
      </p>
      <div className='[&_svg]:max-w-[16rem] grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-8 place-items-center'>
        <RampLogo />
        <LoomLogo className="hidden md:block" />
        <VercelLogo />
        <DescriptLogo className="hidden md:block" />
        <CashAppLogo />
        <RaycastLogo />
        <MercuryLogo />
        <RetoolLogo />
        <AlanLogo className="hidden md:block" />
        <ArcLogo className="hidden md:block" />
        <OpenSeaLogo className="hidden md:block" />
        <PitchLogo className="hidden md:block" />
      </div>
    </>
  );
};

export default Clients;
