import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import Slider from "./components/Slider/Slider";
import { getUpdatedDataList, getDirectorList, getCertificationList } from "./utility/getDataList";
import { filterSetting, certificationOptionTemplate, certificationItemTemplate, directorItemTemplate } from "./utility/dropdown";
import "./App.scss";


function App() {
  const [data, setData] = useState(null);
  const [first, setFirst] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [directors, setDirectors] = useState([])
  const [certifications, setCertifications] = useState([])
  const [filters, setFilters] = useState(filterSetting);

  useEffect(() => {
    axios.get("https://skyit-coding-challenge.herokuapp.com/movies")
      .then((res) => {
        //convert data rating
        let updatedData = getUpdatedDataList(res.data)
        setData(updatedData);

        //get certification
        let results = getCertificationList(updatedData)
        setCertifications(results)

        // get all directors
        results = getDirectorList(updatedData)
        setDirectors(results)
      })
      .catch(e => console.log(e))
  }, [])

  //certification dropdown
  const certificateFilter = (options) => {
    return <Dropdown value={options.value} options={certifications} itemTemplate={certificationOptionTemplate} showClear
      onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a status" />;
  }

  //director dropdown
  const directorFilter = (options) => {
    return <MultiSelect value={options.value} options={directors} itemTemplate={directorItemTemplate} showClear className="table__director"
      onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" optionValue="name" placeholder="All" maxSelectedLabels={1} />
  }

  return (
    <div className="move">
      <h1 className="move__title">Favorite Movie List</h1>
      <DataTable className="table" value={data} rows={10} responsiveLayout="scroll" emptyMessage="No data found."
        //paginator
        paginator first={first} onPage={(e) => setFirst(e.first)} currentPageReportTemplate=""
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        //dropdown box filter
        filters={filters} filterDisplay="row"
        // row selection
        selection={selectedRow} onSelectionChange={e => { setSelectedRow(e.value); setDisplayModal(true) }}>

        <Column selectionMode="single"></Column>
        <Column headerClassName="table__header " filterHeaderClassName="table__filter" bodyClassName="table__body" className="table__text"
          field="title" header="Title" filter filterPlaceholder="Search by title" showFilterMenu={false} style={{ minWidth: '12rem' }}></Column >
        <Column headerClassName="table__header " filterHeaderClassName="table__filter" bodyClassName="table__body" className="table__text"
          field="releaseDate" header="Year" filter filterPlaceholder="Search by year" showFilterMenu={false} style={{ minWidth: '12rem' }} ></Column>
        <Column headerClassName="table__header " filterHeaderClassName="table__filter" bodyClassName="table__body" className="table__text"
          field="length" header="Running time" filter filterPlaceholder="Search by time" showFilterMenu={false} style={{ minWidth: '12rem' }} ></Column>
        <Column headerClassName="table__header " filterHeaderClassName="table__filter" bodyClassName="table__body" className="table__text"
          field="director" header="Director" filter filterElement={directorFilter} showFilterMenu={false} style={{ minWidth: '12rem' }} ></Column>
        <Column headerClassName="table__header " filterHeaderClassName="table__filter" bodyClassName="table__body" className="table__text"
          field="certification" header="Certification" filter filterElement={certificateFilter} showFilterMenu={false} style={{ minWidth: '12rem' }} body={certificationItemTemplate} ></Column>
        <Column headerClassName="table__header " filterHeaderClassName="table__filter" bodyClassName="table__body" className="table__text"
          field="rating" header="Rating" filter filterPlaceholder="Search by rating" showFilterMenu={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable >
      {selectedRow && <Slider data={selectedRow} displayStatus={displayModal} displayFuc={setDisplayModal} />}

    </div >
  );
}

export default App;
