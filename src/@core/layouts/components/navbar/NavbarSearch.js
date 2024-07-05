// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { CloseButton, NavItem, NavLink } from 'reactstrap'


// ** Custom Components
import Autocomplete from '@components/autocomplete'
import { searchData } from '../../../../@fake-db/pages/search-data'
import { useNavigate } from 'react-router-dom'

const NavbarSearch = ({ setSearchInput, searchInput }) => {
  const navigate = useNavigate()

  // ** States
  const [userInput, setUserInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [navbarSearch, setNavbarSearch] = useState(true)

  // ** Set searchData
  useEffect(() => {
    if (searchData) {
      setSuggestions(searchData.suggestions)
    }
  }, [])

  // ** Removes query in store
  // const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      // setUserInput('')
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!navbarSearch) {
      // setUserInput('')
    }
  }

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setNavbarSearch(false)
        // setUserInput('')
      }, 1)
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false)
    // setUserInput('')
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e)
    setTimeout(() => {
      setNavbarSearch(false)
    }, 1)
    // setUserInput('')
  }

  return (
    <NavItem className='nav-search w-100' onClick={() => setNavbarSearch(true)}>
      {searchInput === true && (
        <div
          onClick={() => setSearchInput(!searchInput)}
          style={{
            position: "absolute",
            right: "10px",
            top: "-10px",
            zIndex: "100",
            backgroundColor: "#00000081",
            borderRadius: "20px",
            padding: "2px 10px"
          }}>
          X
          {/* <CloseButton variant='black' /> */}
        </div>
      )}
      <div
        className={classnames('search-input', {
          open: navbarSearch === true
        })}
      >
        <div className='theme-button dark-theme-button'>
          <div className='search-input-icon'>
            <Icon.Search />
          </div>
          {navbarSearch ? (
            <Autocomplete
              className='form-control w-100'
              suggestions={suggestions}
              filterKey='title'
              filterName='name'
              filterHeaderKey='groupTitle'
              grouped={true}
              placeholder='Search...'
              // autoFocus={true}
              onSuggestionItemClick={handleSuggestionItemClick}
              externalClick={handleExternalClick}
              clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
              onKeyDown={onKeyDown}
              onChange={e => setUserInput(e.target.value)}
              customRender={(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
                return (
                  <li
                    className={classnames('suggestion-item', {
                      active: filteredData.indexOf(item) === activeSuggestion
                    })}
                    key={i}
                    onClick={e => handleListItemClick(onSuggestionItemClick, item.path, e)}
                    onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
                  >
                    <div
                      className={classnames({
                        'd-flex justify-content-between align-items-center': item.file || item.img
                      })}
                    >
                      <div className='item-container d-flex'>
                        <div className='item-info ms-1'>
                          <p className='align-middle mb-0'>{item.title}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }}
            />
          ) : null}
        </div>
      </div>
    </NavItem >
  )
}

export default NavbarSearch
