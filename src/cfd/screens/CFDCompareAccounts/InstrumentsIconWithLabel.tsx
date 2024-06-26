import { FC } from 'react';

import { Text } from '@deriv-com/ui';

import InstrumentsIcons from '@/assets/cfd/tradingInstruments';

type TInstrumentsIcon = {
    highlighted: boolean;
    icon: keyof typeof InstrumentsIcons;
    isAsterisk?: boolean;
    text: string;
};

const InstrumentsIconWithLabel: FC<TInstrumentsIcon> = ({ highlighted, icon, isAsterisk, text }) => {
    const InstrumentIcon = InstrumentsIcons[icon];
    return (
        <div
            className={`flex items-center m-2 cursor-not-allowed ${highlighted ? '' : 'opacity-20'}`}
            data-testid='dt_instruments_icon_container'
        >
            <InstrumentIcon className='w-30 h-30' />
            <div className='ml-5'>
                <Text className='text-xs lg:text-sm' weight='bold'>
                    {text}
                </Text>
            </div>
            {isAsterisk && <span className='relative text-lg top-2 text-brand-red-light'>*</span>}
        </div>
    );
};

export default InstrumentsIconWithLabel;
