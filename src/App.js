import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/Search/Search';
import Sidebar from './components/Sidebar/Sidebar';
import Table from './components/Table/Table';
import { httpService } from './services/http.service';

function App() {
  const [data, setData] = useState([])

  const [criteria, setCriteria] = useState(null)

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.data.type === 'onLoad') {
        setCriteria({
          userglobalid: e.data.userglobalid,
          "page_number": 25,
          "page_offset": 0,
          "filter_by_open": "all",
          "order_by": 'last_message_date',
          "order_descending": true,
          "search_term": ""
        })
      }
    });


    window.parent.postMessage({ type: 'onLoad' }, '*')
    // setCriteria({
    //   userglobalid: '4cf6b1d5-08c5-412c-8458-4a7dcac72040',
    //   "page_number": 25,
    //   "page_offset": 0,
    //   "filter_by_open": "all",
    //   "order_by": 'last_message_date',
    //   "order_descending": true,
    //   "search_term": ""
    // })
  }, []);

  useEffect(() => {
    if(!criteria) return
    if (criteria.page_offset === 0) {
      httpService.get('GetCompanyChatUsers', criteria).then(data => {
        return data.chatUsers
      }).then(chatUsers => setData(chatUsers));
    } else {
      httpService.get('GetCompanyChatUsers', criteria).then(data => data.chatUsers).then(chatUsers => setData((prevState) => ([
        ...prevState,
        ...chatUsers
      ])));
    }

  }, [criteria]);

  function changeCriteria(criteria) {
    setCriteria((prevState) => ({
      ...prevState,
      ...criteria
    }));
  }

  return (
    <div className="App">
      {criteria && <>
      <header>
        <div>
          {criteria['filter_by_open'] === 'all' && <h2>כל השיחות</h2>}
          {criteria['filter_by_open'] === 'closed' && <h2>שיחות סגורות</h2>}
          {criteria['filter_by_open'] === 'open' && <h2>שיחות פתוחות</h2>}
        </div>
        <SearchBar criteria={criteria} changeCriteria={changeCriteria}></SearchBar>
      </header>
      <main className="flex">
        <Sidebar criteria={criteria} changeCriteria={changeCriteria} />
        <div className="main">
          <div className="table-wrapper">
            <Table data={data} criteria={criteria} changeCriteria={changeCriteria} />
          </div>
        </div>
      </main>
      </>
      }
    </div>
  );
}

export default App;
