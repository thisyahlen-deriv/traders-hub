import { CTraderList, MT5PlatformsList, OtherCFDPlatformsList } from '@cfd/components';
import { useAuthData } from '@deriv-com/api-hooks';

import { TradingAppCardLoader } from '@/components';
import { useRegulationFlags } from '@/hooks';

export const CFDContent = () => {
  const { isSuccess: isRegulationAccessible, isEU } = useRegulationFlags();
  const { isAuthorized } = useAuthData();

  if (!isRegulationAccessible && isAuthorized)
    return (
      <div className='pt-16 lg:pt-24'>
        <TradingAppCardLoader />
      </div>
    );

  return (
    <div className='pt-16 space-y-16 lg:space-y-24 lg:pt-24'>
      <MT5PlatformsList />
      {!isEU && <CTraderList />}
      {!isEU && <OtherCFDPlatformsList />}
    </div>
  );
};
