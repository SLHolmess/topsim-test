import * as React from 'react'
import ButtonLevelFilter from '../buttons/ButtonLevel';
import { filterImpressive } from 'src/constants/config';

const ImpressiveFilter = () => {

  return (
    <>
      <div className="font-semibold">SIM DỄ GÂY ẤN TƯỢNG</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 my-4">
        {filterImpressive.map((item: any) => (
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

export default ImpressiveFilter