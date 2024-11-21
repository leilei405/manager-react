import ReactDom from 'react-dom/client'
import Loading from './Loading'

let count = 0
export const showLoading = () => {
  if (count === 0) {
    const loading = document.createElement('div') as HTMLDivElement
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)
    ReactDom.createRoot(loading).render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--

  if (count === 0) {
    document.body.removeChild(document.getElementById('loading')!) as HTMLDivElement
  }
}
