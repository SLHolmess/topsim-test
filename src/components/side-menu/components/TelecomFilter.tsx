import * as React from 'react'
import ButtonPriceFilter from '../buttons/ButtonPrice';
import ButtonTelecomFilter from '../buttons/ButtonTelecom'
import { filterHead, filterTel } from 'src/constants/config';

const TelecomFilter = () => {

  const filterTelecom = filterTel;

  return (
    <>
      <div className='font-semibold'>SIM THEO MẠNG</div>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4'>
        {filterTelecom.map((tel: any) => (
          <ButtonTelecomFilter key={tel.id} icon={tel.icon} link={tel.link} tel={tel.telco} />
        ))}
      </div>
      <div className='grid grid-cols-5 gap-3 mb-4 mt-3'>
        {filterHead.map((head: any) => (
          <ButtonPriceFilter key={head.id} title={head.label} link={head.link} />
        ))}
      </div>
    </>
  )
}

export default TelecomFilter