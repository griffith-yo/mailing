import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HistoryList from '../components/HistoryList'
import { Loader } from '../components/Loader'
import { fetchHistory } from '../redux/actions'

const HistoryPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.app.loading)
  const history = useSelector((state) => state.mailing.fetchedHistory)

  const fetch = useCallback(() => {
    dispatch(fetchHistory())
  }, [])

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

export default HistoryPage
