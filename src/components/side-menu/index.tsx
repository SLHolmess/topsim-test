import * as React from 'react'
import HighLevelFilter from './components/HighLevelFilter'
import ImpressiveFilter from './components/ImpressiveFilter'
import LuckyNumFilter from './components/LuckyNumFilter'
import PhongThuyFilter from './components/PhongThuyFilter'
import PopularKeyword from './components/PopularKeyword'
import PriceFilter from './components/PriceFilter'
import TelecomFilter from './components/TelecomFilter'

const SideFilter = () => {
  return (
    <div>
      <TelecomFilter />
      <PriceFilter />
      <PhongThuyFilter />
      <HighLevelFilter />
      <ImpressiveFilter />
      <LuckyNumFilter />
      <PopularKeyword />
    </div>
  )
}

export default SideFilter