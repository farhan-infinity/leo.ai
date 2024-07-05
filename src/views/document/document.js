import React, { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../../@core/components/breadcrumbs'
import { Container, Input, Spinner, Table } from "reactstrap";
import { Domain } from "../../utility/Domain";
import DocumentSvg from "./svg/DocumentSvg";
import EditSvg from "./svg/EditSvg";
import { v4 as uuidv4 } from 'uuid';
import PaginationWrapper from "./Pagination";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";
import { debounce } from "lodash";
import { Search } from "react-feather";
import ViewSvg from "./svg/ViewSvg";

const document = () => {
  const navigate = useNavigate();

  const [data, setData, dataRef] = useState([])
  const [totalPages, setTotalPages] = useState(null)
  const [perPageItem, setPerPageItem] = useState(10)
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [APIError, setAPIError] = useState(false)
  const [searchEmpty, setSearchEmpty] = useState(false)
  const [keyword, setKeyword] = useState("")

  async function getData() {

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      if (keyword === "") {
        setLoader(true)
        let response = await axios.get(`${Domain}/document?page=${page}&limit=${perPageItem}`, axiosConfig)
        setSearchEmpty(false)
        setTotalPages((Math.ceil(response.data.totalRecords / perPageItem)));
        setData(response.data.data);
        setLoader(false)
      } else {

        setLoader(true)
        let response = await axios.get(`${Domain}/document?page=${page}&limit=${perPageItem}&keyword=${keyword}`, axiosConfig)
        setTotalPages((Math.ceil(response.data.totalRecords / perPageItem)));
        if (response.data.data.length === 0) {
          setSearchEmpty(true)
          setData([{ message: "No data is available for this keyword" }]);
        } else {
          setSearchEmpty(false)
          setData(response.data.data);
        }
        setLoader(false)
      }

    } catch (error) {
      setLoader(false)
      setAPIError(true)
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  const debouncedFetchData = debounce(getData, 300);

  const handleSearch = () => {
    if (keyword !== "") {
      debouncedFetchData(keyword);
    } else {
      debouncedFetchData()
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    if (event.key === 'Click') {
      handleSearch();
    }
  };

  async function sendData(id) {
    navigate("/edit_document", {
      state: {
        id: id,
      },
    });
  }

  const handleKeyword = (e) => {
    e.preventDefault()
    let inputValue = e.target.value
    if (inputValue) {
      setKeyword(inputValue)
    } else {
      setKeyword("")
    }
  }


  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <DocumentSvg />
        <BreadCrumbs title="Document" data={[{ title: "Document" }]} />
      </div>
      <div className="w-100 p-0 p-md-3">
        {data.length > 0 ? (
          <div className="custom-table dark-custom-table">
            <div className="custom-table-head dark-custom-table-head">
              <div className="d-flex justify-content-end align-content-end mb-2">
                <div className="doc-search theme-button dark-theme-button position-relative">
                  <Input
                    className="form-control"
                    type="text"
                    name="keyword"
                    id="keyword"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => handleKeyword(e)}
                    placeholder="Search document"
                    autoFocus={true}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace') {
                        if (keyword === "") {
                          debouncedFetchData();
                        } // Clear search results when Backspace is pressed
                      }
                    }}
                  />
                  <div onClick={() => handleSearch()} className="position-absolute cursor-pointer" style={{ top: "28px", right: "28px", zIndex: "100" }}>
                    <Search />
                  </div>

                </div>
              </div>
              {searchEmpty ? (
                (
                  <div>
                    {data[0].message}
                  </div>
                )
              ) : (
                <div className="custom-table-row dark-custom-table-row">
                  <div className="custom-table-header">
                    No
                  </div>
                  <div className="custom-table-header">
                    Prompt
                  </div>
                  <div className="custom-table-header">
                    Created Date
                  </div>
                  <div className="custom-table-header">
                    Opt
                  </div>
                </div>
              )}
            </div>
            <>
              {searchEmpty ? null : (
                <div className="custom-table-container dark-custom-table-container">
                  {dataRef.current
                    ? dataRef.current.map((el, inx) => {
                      return (
                        <div key={uuidv4()} className="custom-table-body dark-custom-table-body">
                          <div className="custom-table-row dark-custom-table-row" onClick={() => sendData(el._id)}>
                            <div className="custom-table-header">{el.index}</div>
                            <div className="custom-table-header">{el.prompt}</div>
                            <div className="custom-table-header">{moment(el.created_at).format("MMMM DD YYYY - hh:mm A")}</div>
                            <div className="custom-table-header"><ViewSvg /></div>
                          </div>
                        </div>
                      );
                    })
                    : null}
                </div>
              )}
            </>
            {searchEmpty ? null : (
              <>
                {data?.length !== 0 && (
                  <PaginationWrapper
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <div className="text-center h1 d-flex justify-content-center align-content-center h-100 w-100">
            {loader === true && APIError === false ? (
              <ComponentSpinner style={{ width: "2rem", height: "2rem" }} />
            ) : (
              <div>
                No Document is created or updated at the moment.
              </div>
            )}
          </div>
        )}
      </div>
    </Container >
  );
}

export default document