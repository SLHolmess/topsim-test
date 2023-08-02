import * as React from 'react'
import ButtonLevelFilter from '../buttons/ButtonLevel';
import { FILTER_LUCKY_NUMBER } from 'src/constants/config';

const LuckyNumFilter = () => {
  const filterLuckyNumber = FILTER_LUCKY_NUMBER;

  return (
    <>
      <div className="font-semibold">SIM MAY MẮN</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 my-4">
        {filterLuckyNumber.map((item: any) => (
          <ButtonLevelFilter
            key={item.id}
            title={item?.title}
            label={item.label}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
}

export default LuckyNumFilter