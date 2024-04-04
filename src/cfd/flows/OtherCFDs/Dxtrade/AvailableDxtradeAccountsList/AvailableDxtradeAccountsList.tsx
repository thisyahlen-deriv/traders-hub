import { PlatformDetails } from '@cfd/constants';
import { URLUtils } from '@deriv-com/utils';

import {
  IconComponent,
  TradingAccountCard,
  TradingAccountCardContent,
  TradingAccountCardLightButton,
} from '@/components';
import { getCfdsAccountTitle } from '@/helpers/cfdsAccountHelpers';
import { useActiveDerivTradingAccount, useQueryParams, useRegulationFlags } from '@/hooks';
import { useCFDContext } from '@/providers';

const { getDerivStaticURL } = URLUtils;

const LeadingIcon = () => (
  <div>
    <IconComponent
      icon='DerivX'
      onClick={() => {
        window.open(getDerivStaticURL('/derivx'));
      }}
    />
  </div>
);

export const AvailableDxtradeAccountsList = () => {
  const { hasActiveDerivAccount } = useRegulationFlags();
  const { openModal } = useQueryParams();
  const { setCfdState } = useCFDContext();
  const { data: activeTradingAccount } = useActiveDerivTradingAccount();

  const TrailingButton = () => <TradingAccountCardLightButton onSubmit={trailingButtonClick} />;

  const title = getCfdsAccountTitle(PlatformDetails.dxtrade.title, activeTradingAccount?.isVirtual);

  const trailingButtonClick = () => {
    if (!hasActiveDerivAccount) {
      // TODO: Add GetDerivAccountDialog here
    } else {
      setCfdState({ platform: PlatformDetails.dxtrade.platform });
      openModal('DxtradePasswordModal');
    }
  };
  return (
    <TradingAccountCard leading={LeadingIcon} trailing={TrailingButton}>
      <TradingAccountCardContent title={title}>
        This account offers CFDs on a highly customisable CFD trading platform.
      </TradingAccountCardContent>
    </TradingAccountCard>
  );
};
