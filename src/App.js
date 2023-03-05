import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import Table from './components/Table/Table';
import { httpService } from './services/http.service';
import FunnerLogo from './funnerLogo.svg';
import Select from './components/Select/Select';
import FilterUsers from './components/FilterUsers/FilterUsers';

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
    if (!criteria) return
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

  function onIsOpenChange(id, e) {
    const value = e.target.value;
    const newData = structuredClone(data);
    const index = newData.findIndex(d => d.Id === id);
    newData[index].IsOpen = value;
    const phone = newData[index].UserDisplayPhoneNumber;
    setData(newData);
    httpService.post('SetChatUserOpenStatus', { userglobalid: criteria.userglobalid, chatUserDisplayPhoneNumber: phone, isOpen: JSON.parse(value) })
  }

  function getRandomColor(name) {
    // get first alphabet in upper case
    const firstAlphabet = name.charAt(0).toLowerCase();

    // get the ASCII code of the character
    const asciiCode = firstAlphabet.charCodeAt(0);

    // number that contains 3 times ASCII value of character -- unique for every alphabet
    const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    var num = Math.round(0xffffff * parseInt(colorNum));
    var r = num >> 16 & 255;
    var g = num >> 8 & 255;
    var b = num & 255;

    return {
      color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.3)',
      character: firstAlphabet.toUpperCase()
    };
  }

  return (
    <div className="App">
      {criteria && <>
        <header className='header flex align-items-center'>
          <img src={FunnerLogo} alt="Logo" />שיחות
        </header>

        <main>

          <div className="table-wrapper">
            <div className='top flex'>
              <Navbar criteria={criteria} changeCriteria={changeCriteria} />
              <div className='left'>
                <SearchBar criteria={criteria} changeCriteria={changeCriteria} />
                {/* <Select values={[
                  { value: 1, text: 'כל הסוגים' },
                  { value: 2, text: 'נכנסות' },
                  { value: 3, text: 'יוצאות' },
                ]} />
                <Select values={[
                  { value: 1, text: '24 שעות אחרונות' }
                ]} />
                <FilterUsers /> */}
              </div>
            </div>
            <Table data={data} criteria={criteria} changeCriteria={changeCriteria} getRandomColor={getRandomColor} onIsOpenChange={onIsOpenChange} />
          </div>
        </main>
      </>
      }
    </div>
  );
}

export default App;
