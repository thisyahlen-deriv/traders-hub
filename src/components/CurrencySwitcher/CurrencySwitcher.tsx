import { useNavigate } from 'react-router-dom';

import { StandaloneChevronDownBoldIcon } from '@deriv/quill-icons';
import { Button } from '@deriv-com/ui';

import { CurrencySwitcherLoader } from '@/components';
import { IconToCurrencyMapper } from '@/constants';
import { useActiveDerivTradingAccount, useQueryParams, useRegulationFlags } from '@/hooks';

import { DemoCurrencySwitcherAccountInfo, RealCurrencySwitcherAccountInfo } from './CurrencySwitcherAccountInfo';

type AccountActionButtonProps = {
    balance: number;
    isDemo: boolean;
};

const AccountActionButton = ({ balance, isDemo }: AccountActionButtonProps) => {
    const navigate = useNavigate();
    let buttonText = 'Deposit';
    if (isDemo && balance !== 10000) {
        buttonText = 'Reset Balance';
    } else if (isDemo) {
        return null;
    }

    return (
        <Button
            color='black'
            onClick={() => {
                if (isDemo) {
                    // resetVirtualBalance();
                    // TODO: Implement resetVirtualBalance
                } else {
                    navigate('/cashier/deposit');
                }
            }}
            variant='outlined'
            size='sm'
        >
            {buttonText}
        </Button>
    );
};

export const CurrencySwitcher = () => {
    const { data: activeAccount, isSuccess } = useActiveDerivTradingAccount();
    const isDemo = activeAccount?.is_virtual;
    const { openModal } = useQueryParams();

    const { noRealCRNonEUAccount, noRealMFEUAccount } = useRegulationFlags();

    const iconCurrency = isDemo ? 'virtual' : activeAccount?.currency ?? 'virtual';

    if (noRealCRNonEUAccount || noRealMFEUAccount) return null;

    if (!isSuccess) return <CurrencySwitcherLoader />;

    const { icon, text } = IconToCurrencyMapper[iconCurrency];

    return (
        <div className='flex items-center justify-between w-full gap-16 p-16 border-solid rounded-default border-1 border-system-light-active-background lg:w-auto lg:shrink-0'>
            <div className='flex-none '>{icon}</div>
            <div className='grow'>
                {isDemo ? (
                    <DemoCurrencySwitcherAccountInfo displayBalance={0.0} />
                ) : (
                    <RealCurrencySwitcherAccountInfo currencyText={text} displayBalance={0} />
                )}
            </div>
            <div className='flex-none'>
                <AccountActionButton balance={0} isDemo={!!isDemo} />
            </div>
            {!isDemo && (
                <StandaloneChevronDownBoldIcon
                    className='flex-none cursor-pointer'
                    onClick={() => {
                        openModal('AccountSelector');
                    }}
                />
            )}
        </div>
    );
};