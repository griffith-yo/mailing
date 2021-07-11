import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HistoryList } from '../components/HistoryList'
import { Loader } from '../components/Loader'
import { IRootState } from '../interfaces/reducer.interface'
import { IMail } from '../interfaces/state.interface'
import { fetchHistory } from '../redux/actions'

export const HistoryPage = () => {
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)
  const loading: boolean = useSelector((state: IRootState) => state.app.loading)
  const history: IMail[] = useSelector(
    (state: IRootState) => state.mailing.fetchedHistory
  )

  const fetch = useCallback(() => {
    dispatch(fetchHistory(token))
  }, [dispatch, token])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <main className="text-center">
      <h3 className="h3 text-start">ИСТОРИЯ</h3>
      <hr />
      <div className="scroll">
        {loading ? <Loader /> : <HistoryList data={history} />}
      </div>
    </main>
  )
}
