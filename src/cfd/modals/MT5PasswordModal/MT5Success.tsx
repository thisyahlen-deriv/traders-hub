import { SuccessButtonGroup } from '@cfd/components';
import {
    Category,
    companyNamesAndUrls,
    MarketType,
    MarketTypeDetails,
    PlatformDetails,
    TTM5FilterLandingCompany,
} from '@cfd/constants';
import { CFDSuccess } from '@cfd/screens';

import { useActiveDerivTradingAccount, useMT5AccountsList, useRegulationFlags } from '@/hooks';
import { useCFDContext } from '@/providers';

export const MT5Success = () => {
    const { regulationFlags } = useRegulationFlags();
    const { isEU } = regulationFlags;
    const { data: mt5Accounts } = useMT5AccountsList();
    const { data: activeTrading } = useActiveDerivTradingAccount();
    const { cfdState } = useCFDContext();

    const { platform, marketType: marketTypeState, selectedJurisdiction } = cfdState;
    const isDemo = activeTrading?.is_virtual;
    const marketType = marketTypeState ?? MarketType.ALL;

    const isSwapFree = marketType === MarketType.ALL && platform === 'mt5';

    const marketTypeTitle =
        !isSwapFree && marketType === MarketType.ALL && platform
            ? PlatformDetails[platform].title
            : MarketTypeDetails(isEU)[marketType].title;

    const landingCompanyName = `(${companyNamesAndUrls?.[selectedJurisdiction as TTM5FilterLandingCompany]?.shortcode})`;

    const SuccessDescription = isDemo
        ? `Congratulations, you have successfully created your ${Category.DEMO} ${PlatformDetails.mt5.title} ${marketTypeTitle} account.`
        : `Congratulations, you have successfully created your ${Category.REAL} ${PlatformDetails.mt5.title} ${marketTypeTitle} ${selectedJurisdiction?.toUpperCase()} account. To start trading, transfer funds from your Deriv account into this account.`;

    const SuccessTitle = `Your ${marketTypeTitle} ${isDemo ? Category.DEMO : landingCompanyName} account is ready`;

    return (
        <CFDSuccess
            description={SuccessDescription}
            displayBalance={mt5Accounts?.find(account => account.market_type === marketType)?.display_balance ?? '0.00'}
            landingCompany={selectedJurisdiction}
            marketType={marketType}
            platform={PlatformDetails.mt5.platform}
            renderButtons={SuccessButtonGroup}
            title={SuccessTitle}
        />
    );
};
