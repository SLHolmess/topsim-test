import { parserHtmlToReact } from '../../constants/shared';

const StaticPage = (props: any) => {

  const { data } = props

  const pageRender = data?.content
  const title = data?.title

  //* handler

  return (
    <div>
      <div className='uppercase font-semibold text-lg mb-1'>{title}</div>
      <div className="static-page">{parserHtmlToReact(pageRender)}</div>
    </div>
  )
}

export default StaticPage