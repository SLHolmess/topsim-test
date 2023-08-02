import * as React from 'react'
import ButtonPriceFilter from '../buttons/ButtonPrice'
import { filterPrice } from 'src/constants/config'

const PriceFilter = () => {

  return (
    <>
      <div className='font-semibold'>SIM THEO GIÁ</div>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3 my-4'>
        {filterPrice.map((item: any) => (
          <ButtonPriceFilter key={item.id} title={item?.label} link={item.link} />
        ))}
      </div>
    </>
  )
}

export default PriceFilter